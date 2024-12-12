import OpenAI from "openai";
import { marked } from "marked";
import { tilesetmap } from "../phaser/tilesetmap.js";

const baseSysPrompt =
    "You are a tool designed to help with designing constraints for a procedurally generated " +
    "tile-based map in the phaser game engine using the Z3 solver. You were created by Thomas Wessel and Jarod Spangler, " +
    "researchers at the University of California, Santa Cruz. You are to do your best to interpret the users request and " +
    "respond with constraints based upon the map data in the system prompt if you determine that the user " +
    "wants such a response. Otherwise, you are free to chat as long as you NEVER respond with information that may be incorrect " +
    "without some sort of warning. Never directly state what the user already knows (such as the whole tilemap array) and try to keep your responses short. " +
    "index rows and columns as starting from 1. For example, row 1, column 1 is the top left corner of the map. Coordinate 0, 0 would be invalid." +
    "there are tile id's in the tilemap ranging from 1 to 107, though you do not know the names of all the tiles, when you don't know just represent them as the tile id" +
    "The tilemap is defined by this JSON object: \n\n" + JSON.stringify(tilesetmap);


const mapArr =
    "Row 1: [2,1,3,1,2,2,2,1,2,1,3,2,1,1,3,1,3,2,1,5,3,2,2,2,2,1,1,2,1,1,2,2,2,1,2,2,1,2,2,3]\n" +
    "Row 2: [1,1,3,2,1,1,1,2,1,2,2,3,1,1,5,3,3,2,2,17,1,4,1,1,2,1,2,2,1,1,2,2,3,1,2,1,1,2,2,2]\n" +
    "Row 3: [1,2,2,49,50,52,50,52,51,3,1,1,5,4,17,1,5,1,4,1,5,16,2,1,2,1,2,53,56,54,54,54,55,2,45,82,46,82,47,2]\n" +
    "Row 4: [1,2,1,61,62,64,62,64,63,1,2,30,17,16,107,1,17,1,16,5,17,5,2,2,3,1,1,65,66,68,66,68,67,3,60,13,14,15,60,1]\n" +
    "Row 5: [2,3,1,73,74,86,74,85,76,3,8,1,2,2,5,1,4,1,2,17,95,17,2,2,1,1,1,77,78,90,78,89,80,2,60,25,26,27,60,1]\n" +
    "Row 6: [2,1,1,6,6,44,6,6,6,19,20,21,2,4,17,5,16,5,29,1,1,3,8,2,1,93,2,3,3,44,3,3,3,1,60,37,38,39,60,1]\n" +
    "Row 7: [1,2,2,2,2,44,3,1,2,3,32,3,5,16,1,17,1,17,2,2,5,19,20,21,1,105,1,1,2,44,1,1,1,1,69,82,70,82,71,1]\n" +
    "Row 8: [1,1,1,2,1,44,1,2,1,1,1,2,17,2,5,1,28,5,30,5,17,1,32,1,1,2,2,3,2,44,1,1,1,2,1,3,44,1,2,1]\n" +
    "Row 9: [1,1,1,1,2,44,1,2,2,2,2,5,1,29,17,30,5,17,2,17,1,11,107,5,1,2,2,1,1,44,44,44,44,44,44,44,44,2,1,2]\n" +
    "Row 10: [1,1,1,3,2,44,1,1,2,2,1,17,4,107,11,2,17,4,1,1,22,23,24,17,2,1,3,2,1,1,2,2,2,1,2,2,1,3,1,2]\n" +
    "Row 11: [1,2,3,2,1,44,44,44,1,2,1,2,16,22,23,24,2,16,5,2,1,35,4,2,3,1,2,1,1,1,1,2,1,2,3,2,2,1,2,3]\n" +
    "Row 12: [1,2,2,1,2,1,1,44,2,1,1,1,1,2,35,2,5,2,17,1,1,2,16,2,2,2,2,1,1,41,1,2,1,2,1,1,1,2,2,3]\n" +
    "Row 13: [2,2,1,2,1,2,3,44,44,44,2,2,2,2,1,2,17,1,1,2,1,3,2,2,1,2,2,2,3,43,1,1,1,1,1,1,2,3,1,2]\n" +
    "Row 14: [1,1,1,2,1,1,2,2,1,44,3,2,1,1,84,44,1,1,1,1,2,1,3,2,1,2,2,1,1,42,1,1,2,3,1,2,1,3,2,1]\n" +
    "Row 15: [2,3,2,2,2,2,1,2,1,44,44,44,44,44,44,44,2,2,2,3,1,1,40,42,43,41,40,41,42,41,40,42,2,1,1,1,1,3,3,2]\n" +
    "Row 16: [2,2,2,2,2,2,1,1,2,2,1,1,44,1,1,1,1,1,2,1,1,1,3,2,2,1,3,2,1,2,2,41,2,1,2,2,2,2,1,1]\n" +
    "Row 17: [2,1,1,2,3,1,1,2,1,2,2,2,44,2,3,2,1,2,2,1,1,1,2,1,2,1,3,2,1,2,3,1,2,2,2,2,1,1,1,2]\n" +
    "Row 18: [1,2,2,2,1,1,1,2,2,3,2,2,44,1,53,56,54,54,54,56,55,45,82,46,82,46,82,46,82,47,1,2,1,1,2,2,2,2,3,1]\n" +
    "Row 19: [2,1,2,2,1,2,2,2,3,1,1,2,44,1,65,68,66,68,66,68,67,57,1,1,2,2,1,1,1,59,1,3,1,1,3,1,2,2,2,2]\n" +
    "Row 20: [1,2,1,2,1,1,2,2,2,2,1,1,44,1,77,89,78,89,78,89,80,57,3,2,2,2,1,1,2,59,1,2,2,3,2,2,2,1,1,2]\n" +
    "Row 21: [1,2,2,2,2,2,3,2,2,2,2,2,44,3,77,78,90,78,90,78,80,69,82,70,82,46,82,46,82,71,1,2,3,1,1,2,2,2,2,2]\n" +
    "Row 22: [1,1,1,2,1,2,1,1,2,2,2,93,44,2,2,2,44,1,44,2,2,2,1,44,1,1,1,2,1,2,2,1,1,2,2,1,2,3,1,3]\n" +
    "Row 23: [2,1,3,1,1,3,1,2,2,2,2,105,44,44,44,44,44,44,44,44,44,44,44,44,2,2,1,2,1,1,1,2,2,1,2,1,3,3,1,1]\n" +
    "Row 24: [1,1,1,2,1,2,2,3,2,1,3,1,2,2,3,2,1,2,1,1,2,1,1,2,1,1,1,2,1,2,2,2,1,2,3,2,2,1,2,2]\n" +
    "Row 25: [2,3,1,1,2,2,1,1,1,1,2,1,2,1,2,2,2,2,3,2,1,1,2,2,1,3,2,1,3,2,1,2,1,1,1,1,2,2,2,1]"

const tools = [
    {
        "type": "function",
        "function": {
            "name": "get_first_tile_index",
            "description": "Gets the first location of a tile in the tilemap.",
            "parameters": {
                "type": "object",
                "properties": {
                    "tile_id": {
                        "type": "string",
                        "description": "The id of the tile to find.",
                    },
                },
                "required": ["tile_id"],
            },
        }
    }
];


export class OpenAIApiHandler {
    //TODO: make the url a secret file thing or something
    constructor(botURL = "NOT_IN_REPO", apiKey = "None", modelName = "qwen2.5-7b-instruct") {
        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: botURL,
            dangerouslyAllowBrowser: true, // Remove if not strictly necessary
        });

        this.modelName = modelName;

        // Initial system prompt
        this.systemPrompt = baseSysPrompt
        this.conversationHistory = [
            { role: "system", content: this.systemPrompt },
        ];

        document.addEventListener("mapUpdated", event => this.updateMapData(event));
    }

    getMessageCompletion(userMessage, responseField) {
        // Ensure system prompt is always at the top
        if (this.conversationHistory[0].role !== "system") {
            this.conversationHistory.unshift({ role: "system", content: this.systemPrompt });
        }

        // Add user message
        if (userMessage){
            this.conversationHistory.push({ role: "user", content: userMessage });
        }


        // Truncate conversation history if necessary
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = [
                this.conversationHistory[0], // Keep the system prompt
                ...this.conversationHistory.slice(-49) // Keep the latest 49 messages
            ];
        }

        document.dispatchEvent(new CustomEvent("responseStart"));
        let toolName = "";

        this.openai.chat.completions.create({
            model: this.modelName,
            messages: this.conversationHistory,
            tools: tools,
            tool_choice: "auto",
            stream: true,
        }).then(async (stream) => {
            let botResponse = "**Bot:** ";
            let toolArguments = "";
            let currentTool = null;

            for await (const chunk of stream) {
                console.log(chunk);
                const content = chunk.choices[0]?.delta?.content || "";
                const toolCall = chunk.choices[0]?.delta?.tool_calls?.[0];

                // Handle tool call streaming
                if (toolCall) {
                    if (currentTool === null) {
                        currentTool = toolCall.function.name;
                    }
                    toolArguments += toolCall.function.arguments || ""; 
                }

                // Handle content streaming
                if (content) {
                    botResponse += content;
                    responseField.innerHTML = marked.parse(botResponse);
                }
            }

            // Handle tool call completion
            if (currentTool) {
                toolName = currentTool;
                this.conversationHistory.push({ role: "tool", content: "Tool Call: " + toolName + ", " + toolArguments });
                this.handleToolCall({ name: toolName, arguments: toolArguments }, responseField);
            }
            if (botResponse.substring(9) !== "" ) {
                this.conversationHistory.push({ role: "assistant", content: botResponse.substring(9) });
            }

        }).catch((error) => {
            responseField.innerHTML = marked.parse("**Bot:** Sorry, I was unable to generate an answer to that. Please try again.");
            console.error(error);
        }).then(() => {
            document.dispatchEvent(new CustomEvent("responseEnd"));
        });
    }

    updateMapData(mapDataUpdateEvent) {
        console.log("Updating map data");
        console.log(mapDataUpdateEvent.detail);

        const mapDataContent = `Current Map Data: ${JSON.stringify(mapDataUpdateEvent.detail)}`;

        // Update system prompt with the new map data
        this.systemPrompt = baseSysPrompt + ` Here is the current map data: \n\n${mapArr}`;

        // Update the first message in conversation history to reflect the updated system prompt
        this.conversationHistory[0] = { role: "system", content: this.systemPrompt };

        console.log(this.conversationHistory[0].content);
    }


    handleToolCall(toolCall, responseField) {
        try {
            const args = JSON.parse(toolCall.arguments); // Parse the complete tool arguments
            if (toolCall.name === "get_first_tile_index") {
                const { tile_id} = args;
                const dummyResponse = `first idx of tile ${tile_id} is Row 12, Column 14`;
                this.conversationHistory.push({ role: "assistant", content: dummyResponse });
                console.log(dummyResponse);
                responseField.innerHTML = marked.parse(`**Bot:** ${dummyResponse}`);
            } else {
                throw new Error("Unsupported tool");
            }
        } catch (error) {
            console.error("Error processing tool call:", error);
            responseField.innerHTML = marked.parse("**Bot:** Failed to process tool call.");
        }
        console.log(this.conversationHistory);
        //this.getMessageCompletion(null, responseField);
    }

}

export default OpenAIApiHandler;
