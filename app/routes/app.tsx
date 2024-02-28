import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";
import { useState } from "react";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  const [filters, setFilters] = useState<any[]>([]);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
        <ui-nav-menu>
          <Link to="/app/">Home</Link>
          <Link to="/app/report">Data Report</Link>
          {/* <Link to="/app/tracking">Tracking Orders</Link> */}
        </ui-nav-menu>
        <Outlet context={{ filters, setFilters }} />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
// export function ErrorBoundary() {
//   return boundary.error(useRouteError());
// }s

// export const headers: HeadersFunction = (headersArgs) => {
//   return boundary.headers(headersArgs);
// };
