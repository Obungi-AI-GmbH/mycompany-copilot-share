"use client";
import { signIn } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { fetchAIName, fetchLogoData } from "@/features/theme/customize";
import { useEffect, useState } from "react";

export const LogIn = () => {

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
    <Card className="flex gap-2 flex-col min-w-[300px]">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`data:image/jpg;base64,${logoData}`} />
          </Avatar>
          <span>
            {copilotName}<span className="text-muted-foreground">Copilot</span>
          </span>
        </CardTitle>
        <CardDescription>
          Login in with your Azure Active Directory account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={() => signIn("azure-ad")}>Azure Active Directory Authentication</Button>
      </CardContent>
    </Card>
  );
};
