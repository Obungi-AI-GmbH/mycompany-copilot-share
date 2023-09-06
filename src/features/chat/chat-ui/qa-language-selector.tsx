import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger, SelectGroup, SelectLabel, SelectPortal, SelectIcon } from "@radix-ui/react-select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

interface Prop {
  disable: boolean;
  options: string[];
  selectedOption: string;
  onSelectedChanged: (value: string) => void;
}

export const QALanguageSelector: FC<Prop> = (props) => {

  //let length = props.options.length;
  //let tabsClasses = `grid w-full grid-cols-${length} h-12 items-stretch`;

  return (
    <Tabs
      defaultValue={props.selectedOption}
      onValueChange={(value) =>
        props.onSelectedChanged
          ? props.onSelectedChanged(value as string)
          : null
      }
    >
      <TabsList className="grid w-full grid-cols-4 h-12 items-stretch">
      {props.options.map((value) => (
          <TabsTrigger key={value} value={value} disabled={props.disable}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
