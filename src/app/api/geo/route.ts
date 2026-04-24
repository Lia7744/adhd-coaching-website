import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Try to get it from Vercel headers (most reliable in production, zero latency)
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return NextResponse.json({ country: vercelCountry });
  }

  // 2. Fallback for local development or if Vercel header is missing
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/country.json");
    const data = await res.json();
    return NextResponse.json({ country: data.country || 'US' });
  } catch (error) {
    return NextResponse.json({ country: 'US' });
  }
}
