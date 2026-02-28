import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// 1. ADD YOUR KEY HERE (Inside the quotes)
const API_KEY = "gen-lang-client-0061833200"; 

window.sendMessage = async function() {
    const prompt = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (!prompt) return;

    // Display user message
    chatBox.innerHTML += `<div class="user-msg"><b>You:</b> ${prompt}</div>`;
    document.getElementById('user-input').value = "";

    try {
        // 2. INITIALIZE THE AI WITH YOUR KEY
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Display AI response
        chatBox.innerHTML += `<div class="ai-msg"><b>AI:</b> ${text}</div>`;
        
        // Auto-scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p style="color:red">Error: ${error.message}</p>`;
        console.error(error);
    }
}
  
