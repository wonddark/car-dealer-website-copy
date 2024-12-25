import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { vin } }: { params: { vin: string } },
) {
  try {
    const response = await fetch(
      `${process.env.API_ENDPOINT}/auction-inventories?vin=${vin}`,
    );
    if (response.status === 200) {
      const data = await response.json();
      return Response.json({ ...data }, { status: 200 });
    }
    const text = await response.text();
    return Response.json(
      { data: {}, message: text },
      { status: response.status, statusText: response.statusText },
    );
  } catch (e) {
    console.error(e);
    return Response.json(JSON.stringify(e), { status: 500 });
  }
}
