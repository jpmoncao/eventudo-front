import './globals.css';

export default function RootNotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 font-sans text-foreground">
            <h1 className="text-8xl font-bold font-heading text-center text-primary-foreground dark:text-primary drop-shadow-[0_0_40px] drop-shadow-foreground/60 dark:drop-shadow-primary/60">
                404
            </h1>
            <h1 className="text-4xl font-bold font-heading text-center drop-shadow-[0_0_40px] drop-shadow-foreground/60 dark:drop-shadow-primary/60">
                Página não encontrada
            </h1>
            <p className="mt-2 text-lg text-center text-foreground/80 drop-shadow-[0_0_40px] drop-shadow-foreground/60 dark:drop-shadow-primary/60">
                Desculpe, a página que você está procurando não existe.
            </p>
        </main>
    );
}