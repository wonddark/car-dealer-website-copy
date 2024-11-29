import Category from "@/components/Catagory";

export default function CategoryPage({
  params,
}: Readonly<{
  params: Record<string, string>;
}>) {
  const { slug } = params;
  return <Category title={slug} />;
}
