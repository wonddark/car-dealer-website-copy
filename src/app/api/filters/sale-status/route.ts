export async function GET() {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/lookups/SALE_STATUS`);
    if (res.status === 200) {
      const data = await res.json();
      return Response.json(data);
    }
    return Response.json([]);
  } catch (e) {
    console.error(e);
    return new Response("Error trying to fetch from API", { status: 500 });
  }
}
