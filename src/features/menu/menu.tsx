"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BarChartHorizontalBig, Settings } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "../user-profile";
import { useEffect, useState } from "react";
import { fetchAIName, fetchLogoData } from "../theme/customize";

export const MainMenu = () => {

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
    <div className="flex gap-2 flex-col justify-between">
      <div className="flex gap-2 flex-col justify-between">
        <Link
          href="/"
          className="w-10 h-10 items-center justify-center flex"
          title="Home"
        >
          <Avatar className="">
            <AvatarImage src={`data:image/jpg;base64,${logoData}`} />
          </Avatar>
        </Link>
        <Link
          href="/reporting"
          className="w-10 h-10 items-center justify-center flex rounded-full hover:bg-secondary"
          title="Reporting"
        >
          <BarChartHorizontalBig size={20} />
        </Link>
        <Link
          href="/customization"
          className="w-10 h-10 items-center justify-center flex rounded-full hover:bg-secondary"
          title="Customization"
        >
          <Settings size={20} />
        </Link>
      </div>
      <UserProfile />
    </div>
  );
};
