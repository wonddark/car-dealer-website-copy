import { NextRequest } from "next/server";
import { initialState } from "@/redux/features/vehicles.slice";

export const dynamic = "force-dynamic";

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
    if (response.status === 204) {
      return Response.json({ ...initialState.response });
    }
    const text = await response.text();
    return Response.json(
      { ...initialState.response, message: text },
      { status: response.status, statusText: response.statusText },
    );
  } catch (e) {
    console.error(e);
    return Response.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
