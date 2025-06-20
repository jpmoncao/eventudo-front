import Header from "./_components/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container min-h-screen px-4 pt-4 bg-background text-foreground overflow-x-hidden max-w-[1000px] mx-auto">
        {children}
      </main>
    </>
  );
}
