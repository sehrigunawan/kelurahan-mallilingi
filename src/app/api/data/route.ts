import { NextResponse } from "next/server";
import { getMallilingiDataAsync, saveMallilingiDataAsync } from "../../../lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getMallilingiDataAsync();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch database data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveMallilingiDataAsync(body);
    return NextResponse.json({ success: true, message: "Data updated successfully in Supabase Database!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update database data" }, { status: 500 });
  }
}
