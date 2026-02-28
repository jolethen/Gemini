import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Replace with the NEW key you generate after deleting the old one!
const API_KEY = "AIzaSyBaDPRwKVR0dRY9DBKO5AhalkvqMLHhy7E"; 

window.sendMessage = async function() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const prompt = userInput.value;

    if (!prompt) return;

    // 1. Show User Message
    chatBox.innerHTML += `<div style="margin-bottom:10px;"><b>You:</b> ${prompt}</div>`;
    userInput.value = "";

    try {
        // 2. Initialize Gemini
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 3. Get Response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // 4. Show AI Message
        chatBox.innerHTML += `<div style="margin-bottom:10px; color: blue;"><b>AI:</b> ${text}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        // This will tell us EXACTLY what Google says is wrong
        chatBox.innerHTML += `<p style="color:red"><b>System Error:</b> ${error.message}</p>`;
        console.error("Full Error Context:", error);
    }
}
