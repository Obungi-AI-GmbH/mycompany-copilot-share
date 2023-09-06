import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { FC, useState } from "react";
import { isPropertySignature } from "typescript";

interface Prop {
  disable: boolean;
  task: string;
  onTaskChange: (value: string) => void;
  handleInputChange: (e: any) => void;
}

export const QATaskSelector: FC<Prop> = (props) => {

  const onTaskChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onChange")
    props.handleInputChange(event)
    props.onTaskChange(event.target.value)
  }

  return (
    <Tabs
      defaultValue={props.task}
      onValueChange={(value) =>
        props.onTaskChange
          ? props.onTaskChange(value as string)
          : null
      }
      onChange={onTaskChange2}
    >
      <TabsList className="grid w-full grid-cols-2 h-12 items-stretch">
        <TabsTrigger value="translation" disabled={props.disable}>
          Translation
        </TabsTrigger>
        <TabsTrigger value="code_explanation" disabled={props.disable}>
          Code Explanation
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
