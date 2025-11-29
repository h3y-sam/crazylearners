import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey });

export const askAiTutor = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are 'Crazy Bot', an expert AI tutor for JEE and NEET aspirants. You specialize in Physics, Chemistry, Biology, and Mathematics. Explain concepts clearly, concisely, and use bullet points where necessary. Keep the tone encouraging and futuristic. If a student asks about something unrelated to studies or exams, politely steer them back to the topic.",
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
      }
    });

    return response.text || "I couldn't generate an answer at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while connecting to the AI Tutor.";
  }
};
