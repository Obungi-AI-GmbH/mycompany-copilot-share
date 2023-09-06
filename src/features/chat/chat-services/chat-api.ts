import { PiggyBank } from "lucide-react";
import { ChatData } from "../chat-data/chat-data-api";
import { ChatSimple } from "../chat-simple/chat-simple-api";
import { PromptGPTProps } from "./models";

export const PromptGPT = async (props: PromptGPTProps) => {
  if (props.chatType === "simple") {
    let chat_simple = await ChatSimple(props);
    return chat_simple;
  } else if (props.chatType === "data") {
    return await ChatData(props);
  } else if (props.chatType === "mssql") {
    return await ChatData(props);
  } else {
    return await ChatSimple(props);
  }
};
