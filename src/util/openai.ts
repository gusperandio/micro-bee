import OpenAI from "openai"; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

export async function askChatGPT(text: string) {
  const response = await openai.moderations.create({
    input: text,
  });

  const result = response.results[0];
  console.log(result);
  return response;
}

// askChatGPT("I hate you");
