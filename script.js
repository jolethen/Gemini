import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ DELETE YOUR OLD KEY AND PUT THE NEW ONE HERE
const API_KEY = "AIzaSyBaDPRwKVR0dRY9DBKO5AhalkvqMLHhy7E"; 

window.sendMessage = async function() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const prompt = userInput.value;

    if (!prompt) return;

    // 1. Add User Message to UI
    chatBox.innerHTML += `<div style="background:#DCF8C6; padding:10px; margin:5px; border-radius:10px; align-self: flex-end; max-width: 80%;"><b>You:</b> ${prompt}</div>`;
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 2. Setup Gemini 2.0
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Using the newer 2.0-flash model to avoid the 404 error
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // 3. Fetch Response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // 4. Add AI Message to UI
        chatBox.innerHTML += `<div style="background:#FFF; padding:10px; margin:5px; border-radius:10px; border: 1px solid #ddd; max-width: 80%;"><b>AI:</b> ${text}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        // Detailed error reporting
        chatBox.innerHTML += `<div style="color:red; background:#FFDADA; padding:10px; margin:5px; border-radius:5px;">
            <b>System Error:</b> ${error.message} <br>
            <small>Tip: Check if your API key is active in AI Studio.</small>
        </div>`;
        console.error("Full Error Info:", error);
    }
}
