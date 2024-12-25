import { ReactNode } from "react";

export default function FilterOptionsCheckContainer({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="filter-options-check mt-2 w-100 position-sitcky top-0 px-2">
      {children}
    </div>
  );
}
