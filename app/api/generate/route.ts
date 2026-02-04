import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json(
        { error: "Lærernotater mangler." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY mangler");
      return NextResponse.json(
        { error: "Serverkonfigurasjon mangler API-nøkkel." },
        { status: 500 }
      );
    }

    const prompt = `Lag et strukturert undervisningsopplegg basert på disse lærernotatene:
      
      "${notes}"
      
      Opplegget SKAL inneholde følgende seksjoner formatert i Markdown:
      # [Tittel]
      
      ## 🎯 Kompetansemål (Læreplan)
      ## 📝 Læringsmål
      ## 🕒 Gjennomføring (steg-for-steg med tidsestimat)
      ## 🛠️ Oppgaver (inkludert differensiering)
      ## 📊 Vurderingskriterier
      
      Bruk profesjonelt og inspirerende språk.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://lektoren.ai", // Oppdatert for produksjon/referanse
        "X-Title": "Lektorens Høyre Hånd",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "system",
            content: "Du er en ekspert i pedagogikk og undervisningsplanlegging for den norske skolen. Svar alltid på profesjonelt bokmål."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `OpenRouter API feilrespons. Status: ${response.status} ${response.statusText}. Detaljer: ${errorText}`
      );
      return NextResponse.json(
        { error: "Kommunikasjonsfeil med AI-tjenesten. Vennligst prøv igjen senere." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Feil ved generering av opplegg:", error);
    return NextResponse.json(
      { error: "Kunne ikke generere undervisningsopplegg." },
      { status: 500 }
    );
  }
}