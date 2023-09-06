"use client"

import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { uploadLogo } from "../common/blob";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FormDescription, FormLabel } from "@/components/ui/form";

interface Prop {
  }

export const LogoForm: FC<Prop> = (props) => {

    const [isUploadingFile, setIsUploadingFile] = useState(false);

    const onFileChange = async (formData: FormData) => {
        //console.log(formData.get('file'))
        try {
        const fileName = await uploadLogo(formData);
        toast({
            title: "File upload",
            description: `${fileName} uploaded successfully.`,
        });
        } catch (error) {
        toast({
            variant: "destructive",
            description: "" + error,
        });
        } finally {
        setIsUploadingFile(false);
        }
    };

    const onUploadFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
            onFileChange(formData);
    };

return (
    <form onSubmit={onUploadFileSubmit}>
        <div className="grid grid-cols-8 gap-2">
            <div className="col-span-7 space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Logo</label>
                <Input
                    name="file"
                    type="file"
                    required
                    disabled={isUploadingFile}
                    placeholder="Upload your Logo"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                <p className="text-sm text-muted-foreground">Upload your own company logo. Currently only JPG or PNG files are supported.</p>
            </div>
            <div className="col-span-1 flex justify-center items-center h-full">
            <Button
                type="submit"
                value="Upload"
                disabled={isUploadingFile}
                className="w-full"
                >
                {isUploadingFile ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <ArrowUpCircle size={20} />
                )}
                Upload
                </Button>
            </div>
        </div>
    </form>
    )
}