import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY // Get from https://console.groq.com/keys
});
async function main(prompt) {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Fast, powerful, and free
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });
        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content in response");
        }
        return content;
    }
    catch (error) {
        console.error("AI generation error:", error);
        throw new Error(error.message || "Failed to generate content");
    }
}
export default main;
