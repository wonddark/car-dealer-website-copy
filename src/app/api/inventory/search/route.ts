import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const response = await fetch(
      `${process.env.API_ENDPOINT}/auction-inventories/search?${sp.toString()}`,
    );
    if (response.status === 200) {
      const data = await response.json();
      return Response.json({ ...data }, { status: 200 });
    }
    return Response.json({ data: [] }, { status: 200 });
  } catch (e) {
    return Response.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
