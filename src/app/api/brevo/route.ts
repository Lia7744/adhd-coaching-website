import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, resultType } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey) {
      // If no API key is set yet, we just log and pretend it worked so the testing isn't blocked.
      console.warn("Brevo API key missing from .env.local. Logging lead in test mode.");
      console.log("Lead captured:", email, "Result:", resultType);
      return NextResponse.json({ success: true, message: "Test mode (Key missing)" });
    }

    const endpoint = `https://api.brevo.com/v3/contacts`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name ? name : undefined,
          ADHD_QUIZ_RESULT: resultType.toLowerCase().replace(/ /g, '_'),
        },
        listIds: listId ? [parseInt(listId)] : [],
        updateEnabled: true
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo Error:", errorText);
      return NextResponse.json({ error: "Failed to save subscriber to Brevo" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
