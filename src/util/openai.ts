import OpenAI from "openai"; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

async function askChatGPT() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "Você é um assistente útil." },
      { role: "user", content: "Qual é a capital da França?" },
    ],
  });

  console.log(response.choices[0].message.content);
}

askChatGPT();
