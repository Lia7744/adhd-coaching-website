import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, resultType, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    let listId = process.env.BREVO_LIST_ID;
    
    // If this is the 7 commandments funnel, use its specific list ID if it exists
    if (source === '7_commandments' && process.env.BREVO_LIST_ID_7_COMMANDMENTS) {
      listId = process.env.BREVO_LIST_ID_7_COMMANDMENTS;
    }

    // If this is the INCUP worksheet funnel
    if (source === 'incup_worksheet' && process.env.BREVO_LIST_ID_INCUP) {
      listId = process.env.BREVO_LIST_ID_INCUP;
    }

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
          ...(resultType ? { ADHD_QUIZ_RESULT: resultType.toLowerCase().replace(/ /g, '_') } : {})
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
