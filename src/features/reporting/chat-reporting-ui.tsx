import ChatRow from "@/components/chat/chat-row";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { FindAllChatsInThread, FindChatThreadByID } from "./reporting-service";
import { getBlob, getLogoData } from "@/features/common/blob";


interface Props {
  chatId: string;
}

export const ChatReportingUI: FC<Props> = async (props) => {
  const chatThreads = await FindChatThreadByID(props.chatId);
  const chats = await FindAllChatsInThread(props.chatId);
  const chatThread = chatThreads[0];

  const nameResult = await getBlob('customization.json');
  const copilotName = JSON.parse(new TextDecoder("utf-8").decode(nameResult)).name;
  const logoData = await getLogoData('logo.jpg');

  return (
    <Card className="h-full relative">
      <div className="h-full rounded-md overflow-y-auto">
        <div className="flex justify-center p-4">
          <Tabs defaultValue={chatThread.model}>
            <TabsList className="grid w-full grid-cols-2 h-12 items-stretch">
              <TabsTrigger disabled={true} value="GPT-3.5">
                ⚡ GPT-3.5
              </TabsTrigger>
              <TabsTrigger disabled={true} value="GPT-4">
                ✨ GPT-4
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className=" pb-[80px] ">
          {chats.map((message, index) => (
            <ChatRow
              name={
                message.role === "user" ? chatThread.useName : copilotName
              }
              profilePicture={message.role === "user" ? "" : `data:image/jpg;base64,${logoData}`}
              message={message.content}
              type={message.role}
              key={index}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
