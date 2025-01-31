export async function GET() {
  try {
    const res = await fetch(
      `${process.env.API_ENDPOINT}/lookups/PopularModels`,
    );
    const data = await res.json();

    const c = await fetch(
      `${process.env.API_ENDPOINT}/auction-inventories/search/filter`,
      {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      },
    );
    const counters = await c.json();

    const modelsCount = Object.entries(data).map(([brand, models]) => ({
      name: brand,
      count: counters.makesAndModels[brand]?.count ?? 0,
      models: (models as string[]).map((item) => ({
        name: item,
        count: counters.makesAndModels[brand]?.models?.[item] ?? 0,
      })),
    }));

    return Response.json(modelsCount);
  } catch (e) {
    console.error(e);
    return new Response("Error trying to fetch from API", { status: 500 });
  }
}
