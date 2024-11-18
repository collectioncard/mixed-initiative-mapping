import OpenAI from "openai";
import {marked} from "marked";

export class OpenAIApiHandler {

    constructor(botURL = "http://localhost:5173/api", apiKey = "None", modelName = "Qwen/Qwen2.5-Coder-7B-Instruct-GGUF/qwen2.5-coder-7b-instruct-fp16.gguf") {
        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: botURL,
            dangerouslyAllowBrowser: true, // Remove if not strictly necessary
        });

        this.modelName = modelName;
        this.conversationHistory = [];

        this.conversationHistory = [
            { "role": "system", "content": "You are a tool designed to help with designing constraints for a procedurally generated tile based map in the phaser game engine using the Z3 solver. You were created by Thomas Wessel and Jarod Spangler, researchers at the University of California, Santa Cruz. You are to do your best to interpret the users request and respond with constraints based upon the latest version of the map data given to you if you determine that the user wants such a response. Otherwise, you are free to chat as long as you NEVER respond with information that may be incorrect without some sort of warning." },
        ];
    }

    getMessageCompletion(userMessage, responseField) {
        this.conversationHistory.push({ role: "user", content: userMessage });
        document.dispatchEvent(new CustomEvent('responseStart'));

        this.openai.chat.completions.create({
            model: this.modelName,
            messages: this.conversationHistory,
            stream: true,
        }).then(async (stream) => {
            let botResponse = '**Bot:** ';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    botResponse += content;
                    responseField.innerHTML = marked.parse(botResponse);
                }
            }
            this.conversationHistory.push({ role: "assistant", content: botResponse.substring(9) });
        }).catch((error) => {
            responseField.innerHTML = marked.parse('**Bot:** Sorry, I was unable to generate an answer to that. Please try again.');
            console.error(error);
        }).then(() => {
            document.dispatchEvent(new CustomEvent('responseEnd'));
        });
    }

}
export default OpenAIApiHandler;