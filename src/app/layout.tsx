import ClientRoot from "./ClientRoot";
import { getServerApiUrl } from "@/lib/apiConfig.server";

// Read NEXT_PUBLIC_API_URL at request time (Cloud Run runtime env), not only at build time
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const apiUrl = getServerApiUrl();
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="api-base-url" content={apiUrl} />
        <meta
          name="keywords"
          content="Triptrixvoyages - Tour & Travel Booking React Next js Template"
        />
        <meta
          name="description"
          content="Triptrixvoyages is a Modern Tour & Travel Booking React Next js Template."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Outfit:wght@100..900&display=swap"
        />
        {/* Written at container start from Cloud Run env (see scripts/write-runtime-config.mjs) */}
        <script src="/runtime-config.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__NEXT_PUBLIC_API_URL__=${JSON.stringify(apiUrl)};`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
