"use client"

import { Card } from "@/components/ui/card";
import { LogoForm } from "./logo-form";
import { NameForm } from "./name-form";

export function CustomizationForm() {


  return (
    <Card className="h-full flex pt-8 overflow-y-auto">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Copilot Settings</h2>
          <p className="text-muted-foreground">Customize your copilot</p>
        </div>
        <NameForm/> 
        <LogoForm/>
      </div>
    </Card>
  )
}
