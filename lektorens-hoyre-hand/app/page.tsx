import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center sm:text-4xl">
          Lektorens Høyre Hånd
        </h1>
        
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="notes" className="text-lg font-medium">
            Lærernotater
          </label>
          <textarea
            id="notes"
            className="w-full h-48 p-4 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Skriv inn notater her..."
          />
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-base h-12 sm:h-14 px-8 font-semibold w-full sm:w-auto self-center sm:self-end"
          >
            Generer opplegg
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <p>© 2026 Lektorens Høyre Hånd</p>
      </footer>
    </div>
  );
}