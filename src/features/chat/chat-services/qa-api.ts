import { QASimple } from "@/features/qa/qa-simple/qa-simple-api";
import { QAPromptGPTProps } from "./models";

export const QAPromptGPT = async (props: QAPromptGPTProps) => {
  let qaSimple = await QASimple(props);
  return qaSimple;
};
