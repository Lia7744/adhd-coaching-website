import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, resultType } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey) {
      // If no API key is set yet, we just log and pretend it worked so the testing isn't blocked.
      console.warn("MailerLite API key missing from .env.local. Logging lead in test mode.");
      console.log("Lead captured:", email, "Result:", resultType);
      return NextResponse.json({ success: true, message: "Test mode (Key missing)" });
    }

    // New MailerLite API endpoint
    const endpoint = `https://connect.mailerlite.com/api/subscribers`;

    // Send payload combining the email, custom field, and the specific group to assign
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name ? name : undefined,
          adhd_quiz_result: resultType.toLowerCase().replace(/ /g, '_'),
        },
        groups: groupId ? [groupId] : []
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MailerLite Error:", errorText);
      return NextResponse.json({ error: "Failed to save subscriber" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
