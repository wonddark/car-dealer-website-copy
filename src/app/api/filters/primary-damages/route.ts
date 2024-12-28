export async function GET() {
  try {
    const res = await fetch(
      `${process.env.API_ENDPOINT}/lookups/PrimaryDamages`,
    );
    const data = await res.json();
    return Response.json(
      data.filter(
        (item: string) => !item.includes("/") && !item.includes(" - "),
      ),
    );
  } catch (e) {
    console.error(e);
    return new Response("Error trying to fetch from API", { status: 500 });
  }
}
