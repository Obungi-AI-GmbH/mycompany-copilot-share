import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/features/providers";
import { AI_NAME } from "@/features/theme/customize";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: AI_NAME,
  description: AI_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body
        className={cn(inter.className, "flex w-full h-full bg-page-background")}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div
              className={cn(
                inter.className,
                "flex w-full p-2 h-full gap-2 bg-page-background"
              )}
            >
              {children}
            </div>

            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
