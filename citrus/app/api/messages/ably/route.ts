import Ably from "ably/promises";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    if (!clientId) return NextResponse.json({ error: "clientId is required" }, { status: 400 })

    console.log("clientId", clientId)

    const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId});
    return NextResponse.json(tokenRequestData);
};