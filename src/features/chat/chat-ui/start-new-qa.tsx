"use client"

import Typography from "@/components/typography";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { QA } from "../chat-menu/new-qa";
import { fetchAIName, fetchLogoData } from "@/features/theme/customize";

interface Prop {}

export const StartNewQA: FC<Prop> = (props) => {

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

  return (
    <div className="grid grid-cols-5 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <div className="col-span-2 gap-5 flex flex-col flex-1">
        <Image width={180} height={180} alt="" src={`data:image/jpg;base64,${logoData}`}/>
      </div>
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-brand">
          {copilotName}
        </Typography>
        <div className="flex flex-col gap-2">
          <p className="">
            Welcome to {copilotName}. You should interact in a friendly manner
            with the AI assistant and refrain from participating in any harmful
            activities.
          </p>
          <p>You can start a new chat with me by clicking the button below.</p>
        </div>
        <div className="-mx-5 -mb-5 p-5 flex flex-col border-t bg-muted">
          <QA />
        </div>
      </Card>
    </div>
  );
};
