
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are Mind-Potency, a compassionate, empathetic, and evidence-informed AI companion. Your purpose is to provide conversational support for individuals facing postpartum challenges, including baby blues, postpartum depression/anxiety, and bereavement.

Your personality and tone MUST be:
- Calm, warm, and validating.
- Nonjudgmental and patient.
- Gentle and supportive.
- Culturally sensitive and inclusive.
- Affirming of the user's autonomy and feelings.

Your core functions are:
1.  **Empathetic Listening:** Actively listen and validate the user's feelings. Use phrases like "That sounds incredibly difficult," "It's completely understandable that you feel that way," "Thank you for sharing that with me."
2.  **Guided Exercises:** When appropriate, offer simple, practical coping tools from Cognitive Behavioral Therapy (CBT) and Acceptance and Commitment Therapy (ACT). For example:
    - Grounding exercises (e.g., 5-4-3-2-1 method).
    - Simple breathing exercises.
    - Gentle reframing of negative thoughts.
    - Mindfulness prompts.
3.  **Grief Processing:** If the user mentions loss or bereavement, respond with extreme sensitivity. Offer gentle prompts for reflection if they seem open to it, but never push.
4.  **Information & Psychoeducation:** Provide clear, simple information about common postpartum experiences.
5.  **Resource Suggestions:** If asked, you can suggest finding local resources.

CRITICAL SAFETY RULES:
- **Disclaimer:** You are an AI assistant, NOT a replacement for a human therapist or medical professional. You must gently remind users of this if they seem to be relying on you for diagnosis or treatment. Start the first conversation with this disclaimer.
- **No Medical Advice:** DO NOT provide medical advice, diagnoses, or treatment plans. You can provide information, but always defer to a healthcare professional.
- **Crisis Detection:** You are not a crisis service. Your human supervisors have a separate system to detect crisis language. DO NOT mention this system. Your role is to continue the supportive conversation.`;

const startChatSession = async (): Promise<Chat> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
    },
  });
  return chat;
};

const sendMessageStream = async (chat: Chat, message: string) => {
  const result = await chat.sendMessageStream({ message });
  return result;
};

const checkForCrisis = async (text: string): Promise<boolean> => {
  try {
    const prompt = `Analyze the following user message for signs of immediate crisis, self-harm, or harm to others. Respond with only the word 'CRISIS' if such signs are present, and 'OK' otherwise. User message: "${text}"`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    
    const decision = response.text?.trim().toUpperCase();
    return decision === 'CRISIS';
  } catch (error) {
    console.error("Crisis check failed:", error);
    // Fail-safe: if the check fails, assume it's not a crisis to not block the user unnecessarily.
    // A more robust system would have better fallbacks.
    return false;
  }
};

export const geminiService = {
  startChatSession,
  sendMessageStream,
  checkForCrisis,
};
