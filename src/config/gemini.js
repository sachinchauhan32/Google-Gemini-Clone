// AIzaSyB4amwHmRkBXAccgXJPfnsbmULekRNfEZs

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY; // Use environment variable
// const genAI = new GoogleGenerativeAI(apiKey); // Use the correct API key from env

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash", // Ensure this model name is correct
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   try {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     console.log(await result.response.text()); // Await the response text
//   } catch (error) {
//     console.error('Error while running model:', error); // Log error
//   }
// }

// export default run;

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyB4amwHmRkBXAccgXJPfnsbmULekRNfEZs";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
