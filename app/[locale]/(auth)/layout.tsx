import Header from "../(public)/_components/header";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full h-dvh">
            <ScrollArea className="h-dvh">
                <Header />

                <main className="container min-h-screen px-4 pt-4 bg-background text-foreground overflow-x-hidden max-w-[1000px] mx-auto">
                    {children}
                </main>

                <ScrollBar />
            </ScrollArea>
        </div>
    );
}
