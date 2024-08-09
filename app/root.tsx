import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import "./tailwind.css";
import { Nav, ErrorComponent } from "./components/index";
import { Exception } from "./utils/exception";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-white">
        <Nav />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorComponent status={error.status} statusText={error.statusText} />;
  } else if (error instanceof Exception) {
    return <ErrorComponent status={Number(error.status)} statusText={error.message} />;
  } else {
    return <ErrorComponent status={500} statusText={"Internal server error"} />;
  }
}

export default function App() {
  return <Outlet />;
}
