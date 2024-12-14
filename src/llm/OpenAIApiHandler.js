import OpenAI from "openai";
import {marked} from "marked";
import {tools, getFirstTileIndex, getTilesFromCategory, getTileIndexes, getSimplifiedMap} from "../phaser/helperFunctions.js";
import {addChatMessage} from "./AiChat.js";
import {tilesetmap} from "../phaser/tilesetmap.js";

const baseSysPrompt =
    "You are a helpful assistant designed to help create z3 constraints for a procedurally generated tile-based map in" +
    " the phaser game engine. Use the tools provided to assist the user in whatever they ask. ALWAYS try to keep your responses brief and to the point." +
    "NEVER provide the user with code as you should always feed it to the program. If you are unsure of what to do, ask the user for more information." +
    "The map of tiles to their IDs is as follows: \n" + JSON.stringify(tilesetmap);

let messageHistory = [
    {role: "system", content: baseSysPrompt}
];

const modelURL = "Not In Repo";
const apiKey = "LM-Studio";
const modelName = "qwen2.5-7b-instruct";

export class OpenAIApiHandler {

    constructor() {
        this.client = new OpenAI({
            apiKey: apiKey,
            baseURL: modelURL,
            dangerouslyAllowBrowser: true,
        });
    }

    //Tools should be disabled if calling this from a tool execution. Dont want to loop over and over.
    async getMessageCompletion(userMessage, responseField, toolsEnabled = true) {
        this.updateMessageHistory(userMessage);

        document.dispatchEvent(new CustomEvent("responseStart"));

        let toolCalls = [];
        let botResponse = "**Bot:** ";

        try {
            const stream = await this.client.chat.completions.create({
                model: modelName,
                messages: messageHistory,
                tools: toolsEnabled ? tools : [],
                stream: true,
            });

            for await (const chunk of stream) {
                let delta = chunk.choices[0]?.delta;

                if (delta?.content) {
                    botResponse += delta.content;
                    responseField.innerHTML = marked.parse(botResponse);
                }

                if (delta?.tool_calls) {
                    for (let tc of delta.tool_calls) {
                        if (toolCalls.length <= tc.index) {
                            toolCalls.push({
                                id: "", type: "function",
                                function: { name: "", arguments: "" }
                            });
                        }
                        toolCalls[tc.index] = {
                            id: (toolCalls[tc.index].id + (tc.id || "")),
                            type: "function",
                            function: {
                                name: (toolCalls[tc.index].function.name + (tc.function.name || "")),
                                arguments: (toolCalls[tc.index].function.arguments + (tc.function.arguments || ""))
                            }
                        };
                    }
                }
            }

            if (botResponse.substring(9) !== "") {
                messageHistory.push({role: "assistant", content: botResponse.substring(9)});
            }

            console.log(toolCalls);

        } catch (error) {
            responseField.innerHTML = marked.parse("**Bot:** Sorry, I was unable to generate an answer to that. Please try again. inner");
            console.error(error);
        } finally {
            document.dispatchEvent(new CustomEvent("responseEnd"));
        }

        // Access toolCalls here
        if (toolCalls.length > 0) {
            //Create a new reponse field for the tool call if the bot has already responded
            console.log(responseField.innerHTML);
            let response2 = responseField;
            if (responseField.innerHTML.length >= 23) {
                response2 = addChatMessage("", "");
            }

            response2.innerHTML = marked.parse("`Crunching some numbers...`");

            this.handleToolCalls(toolCalls, response2);
        }
        console.log("Final toolCalls:", toolCalls);
    }

    updateMessageHistory(userMessage) {
        if (!userMessage) return;

        if (messageHistory[0].role !== "system") {
            messageHistory.unshift({role: "system", content: baseSysPrompt});
        }

        if (userMessage) {
            messageHistory.push({role: "user", content: userMessage});
        }

        if (messageHistory.length > 50) {
            messageHistory = [
                messageHistory[0],
                ...messageHistory.slice(-49)
            ];
        }
    }

    handleToolCalls(toolCalls, responseField) {
        //TODO: handle more than one call. For now, just handle the first one.
        //TODO: Don't hard code these calls. There has to be a better way, but I've never done this
        let toolCall = toolCalls[0];
        console.log(toolCall);

        try {
            const args = JSON.parse(toolCall.function.arguments);
            let response;

            switch (toolCall.function.name) {
                case "getFirstTileIndex":
                    let tileIdex = args.tile_id;
                    response = getFirstTileIndex(tileIdex);
                    break;
                case "getTileIndexes":
                    let tileIdx = args.tile_id;
                    response = getTileIndexes(tileIdx);
                    break;
                case "getTilesFromCategory":
                    let tileCat = args.tileCategory;
                    response = getTilesFromCategory(tileCat);
                    break;
                case "getSimplifiedMap":
                    let result = JSON.stringify(getSimplifiedMap())
                    response = result;
                    break;
                default:
                    responseField.innerHTML = marked.parse("**Bot:** Sorry, I was unable to generate an answer to that. Please try again.outer");
            }

            //push the tool to message history and then call the bot again to make something out of it
            messageHistory.push({
                role: "tool",
                content: String(response),
                tool_call_id: toolCall.id
            });

            this.getMessageCompletion(null, responseField, false);

        } catch (error) {
            responseField.innerHTML = marked.parse("**Bot:** Sorry, I was unable to generate an answer to that. Please try again.outer2");
        }

    }
}

export default OpenAIApiHandler;