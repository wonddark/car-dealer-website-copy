export default function CategoryPage({
  params,
}: Readonly<{
  params: Record<string, string>;
}>) {
  const { slug } = params;
  return (
    <>
      This will be the category page for {slug} with the list of items related
      to it.
    </>
  );
}
