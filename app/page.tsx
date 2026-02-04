"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [notes, setNotes] = useState("");

  const mutation = useMutation({
    mutationFn: async (notes: string) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Feil ved generering");
      }

      return response.json();
    },
  });

  const handleGenerate = () => {
    if (notes.trim()) {
      mutation.mutate(notes);
      setTimeout(() => {
        const resultSection = document.getElementById("result-section");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={mutation.isPending}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-base h-12 sm:h-14 px-8 font-semibold w-full sm:w-auto self-center sm:self-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Genererer..." : "Generer opplegg"}
          </button>
        </div>

        {mutation.isError && (
          <div className="w-full p-4 text-red-500 bg-red-100 rounded-lg">
            Noe gikk galt. Prøv igjen senere.
          </div>
        )}

        {mutation.data && (
          <div id="result-section" className="w-full p-6 mt-8 border rounded-lg border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black/[.2]">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{mutation.data.result}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <p>© 2026 Lektorens Høyre Hånd</p>
      </footer>
    </div>
  );
}
