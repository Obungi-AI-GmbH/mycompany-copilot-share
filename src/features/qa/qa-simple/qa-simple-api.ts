import { userHashedId } from "@/features/auth/helpers";
import { LangChainStream, StreamingTextResponse } from "ai";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { QAPromptGPTProps } from "@/features/chat/chat-services/models";
import { transformConversationStyleToTemperature } from "@/features/chat/chat-services/utils";

export const QASimple = async (props: QAPromptGPTProps) => {
  const { prompt, model, chatType, conversationStyle, task, language } = props;

  const { stream, handlers } = LangChainStream();

  const userId = await userHashedId();

  const llm = new ChatOpenAI({
    temperature: transformConversationStyleToTemperature(
      conversationStyle
    ),
    streaming: true,
  });

  let translationSystemMessage = `- You are an intelligent translator. \
  - You will provide clear and concise queries. \
  - Just respond with the ${language} translation. \
  `

  let codeExplanationSystemMessage = `- You are an intelligent source code reviewer. \
  - You will be provided with ${language} source code, and you will respond by explaining the source code. \
  - If the prompt is not source code, respond that your task is only to explain source code. \
  - Example: <Input> Hello, i am Martin.</Input> <Answer>This does not seem to be source code. Unfortunately I can't help you with the input.</Answer>`

  let systemMessage = task === "translation" ? translationSystemMessage : codeExplanationSystemMessage;


  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(systemMessage),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm: llm
  });

  chain.call({ input: prompt }, [handlers]);

  return new StreamingTextResponse(stream);
};