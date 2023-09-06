"use client";

import QAInput from "@/components/qa/qa-input";
import QARow from "@/components/chat/qa-row";
import { Card } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useCompletion } from "ai/react";
import { useSession } from "next-auth/react";
import { FC, FormEvent, useRef, useState, useEffect } from "react";
import {
  QAPromptGPTBody,
} from "../chat-services/models";
import QALoading from "@/components/qa/qa-loading";
import { QASelector } from "./qa-selector";
import { fetchAIName, fetchLogoData } from "@/features/theme/customize";

interface Prop {
}

export const QAUI: FC<Prop> = (props) => {
  const { data: session } = useSession();

  const [task, setTask] = useState('translation');
  const [language, setLanguage] = useState('German');
  
  const [chatBody, setBody] = useState<QAPromptGPTBody>({
    model: "gpt-3.5",
    chatType: "simple",
    conversationStyle: 'precise',
    task: task,
    language: language
  });

  const { toast } = useToast();
  const {
    input,
    completion,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    id: 'undefined',
    onError,
    body: chatBody,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  function onError(error: Error) {
    toast({
      variant: "destructive",
      description: error.message,
      action: (
        <ToastAction
          altText="Try again"
          onClick={() => {
            console.log("Todo Error Handling")
          }}
        >
          Try again
        </ToastAction>
      ),
    });
  }

  const onTaskValueChange = (value: string) => {
    setBody({
      model: chatBody.model,
      chatType: chatBody.chatType,
      conversationStyle: chatBody.conversationStyle,
      task: value,
      language: task === 'translation' ? 'German' : 'Python'
    });
  };

  const onLanguageValueChange = (value: string) => {
    setBody({
      model: chatBody.model,
      chatType: chatBody.chatType,
      conversationStyle: chatBody.conversationStyle,
      task: chatBody.task,
      language: value
    });
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  

  const [copilotName, setCopilotName] = useState("");
  const [logoData, setLogoData] = useState("");

  useEffect(() => {
    fetchAIName().then(res => {
      setCopilotName(res)
    }).catch(error => {
      console.error('error')
    })
    
    fetchLogoData().then(res => {
      setLogoData(res);
    }).catch(error => {
      console.error('error')
    })
  }, [])


  const ChatWindow = (
    <div className="rounded-md overflow-y-auto w-full container mx-auto gap-9" ref={scrollRef}>
      <div className="relative pb-[80px] ">
          <QARow
            name={
              copilotName
            }
            profilePicture={
              `data:image/jpg;base64,${logoData}`
            }
            message={completion}
            type={"user"}
            key={0}
          />
        {isLoading && <QALoading />}
      </div>
    </div>
  );
  
  let languageSelection = <QASelector
  task={task}
  language={language}
  onTaskChange={onTaskValueChange}
  onLanguageChange={onLanguageValueChange}
  handleInputChange={handleInputChange}
  />

  return (
    <Card className="h-full relative overflow-hidden grid grid-rows-4 gap-3">
      <div className="row-span-1">
      <form
          onSubmit={onHandleSubmit}
          className="absolute top-3 w-full flex items-center grid"
        >
        <div className="row-span-1">
          {languageSelection}
        </div>
        <div className="row-span-2">
          { <QAInput
            isLoading={isLoading}
            value={input}
            handleInputChange={handleInputChange}
            handleSubmit={onHandleSubmit}
          /> }
        </div>
      </form>
      </div>
      <div className="border-b"></div>
      <div className='row-span-3'>
      {completion == "" ? null :
      ChatWindow
      }</div>
    </Card>
  );
};
