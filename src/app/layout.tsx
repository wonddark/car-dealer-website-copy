"use client";

import "../styles/style.css";
import "../styles/style.scss";
import store from "@/redux/store";
import { Provider } from "react-redux";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("bootstrap/dist/js/bootstrap.min");
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" theme-color="dark">
      <head>
        <title>La Subasta Cubana</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
