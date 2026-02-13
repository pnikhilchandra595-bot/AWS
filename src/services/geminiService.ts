import { GoogleGenAI, Type, Schema, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION_LEARN, getRefactorInstruction } from "../constants";
import { QuizData, RefactorType, QuizDifficulty } from "../types";

const apiKey = import.meta.env.VITE_API_KEY || '';

if (!apiKey) {
  console.error('VITE_API_KEY is not set in environment variables');
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Chat Stream
 */
export const streamChatResponse = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_LEARN,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Chat Error:", error);
    onChunk("\n\n*Error: Connection to Neural Core failed. Check API Key.*");
  }
};

/**
 * Text to Speech using Gemini
 */
export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    // We trim the text to avoid generating too much audio for long explanations
    const speechPrompt = `Read this out loud clearly and professionally: "${text.substring(0, 400)}..."`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: { parts: [{ text: speechPrompt }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

/**
 * Advanced Code Refactoring
 */
export const refactorCode = async (code: string, type: RefactorType): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Refactor this code:\n\n\`\`\`\n${code}\n\`\`\``,
      config: {
        systemInstruction: getRefactorInstruction(type),
        thinkingConfig: { thinkingBudget: 2048 } // Higher thinking budget for better quality
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Refactor Error:", error);
    return "Error generating refactor.";
  }
};

/**
 * Adaptive Quiz Generation
 */
export const generateQuiz = async (topic: string, difficulty: QuizDifficulty): Promise<QuizData | null> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      topic: { type: Type.STRING },
      difficulty: { type: Type.STRING },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    },
    required: ["topic", "difficulty", "questions"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 3-question multiple choice quiz about: ${topic}. Difficulty: ${difficulty}. Ensure questions are technical and accurate.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizData;
    }
    return null;
  } catch (error) {
    console.error("Quiz Error:", error);
    return null;
  }
};
