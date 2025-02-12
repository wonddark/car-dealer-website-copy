import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/system-fees/list`);
    if (res.status === 200) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json({}, { status: res.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e, { status: 500 });
  }
}
