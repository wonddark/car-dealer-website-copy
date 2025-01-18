import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(
      process.env.API_ENDPOINT + "/auction-inventories/search/filter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    ).then((res) => res.json());

    return Response.json(res, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: (e as { message?: string }).message ?? "Error interno" },
      { status: (e as { status?: number }).status ?? 500 },
    );
  }
}
