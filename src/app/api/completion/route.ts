import { QAPromptGPT } from "@/features/chat/chat-services/qa-api";

export async function POST(req: Request) {
  const body = await req.json();
  let qaPromptGPT = await QAPromptGPT(body);
  return qaPromptGPT; 
}
