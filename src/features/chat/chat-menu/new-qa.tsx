"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const QA = () => {
  const router = useRouter();
  const startNewQA = async () => {
    try {
        router.push("/qa");
        router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      className="gap-2"
      variant={"outline"}
      size={"sm"}
      onClick={() => startNewQA()}
    >
      <PlusCircle size={16} /> New QA
    </Button>
  );
};
