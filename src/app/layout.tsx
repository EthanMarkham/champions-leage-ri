// src/app/layout.js
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Suspense } from "react";
import SpinnerPage from "./loading";
import { NavBar } from "@/components/nav/NavBar";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Champions League RI";
const APP_DEFAULT_TITLE = "Champions League RI";
const APP_TITLE_TEMPLATE = "%s - Champions League";
const APP_DESCRIPTION = "Check your standing and upload scores!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1F2937",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, "base-100")} suppressHydrationWarning={true}>
        <NavBar />
        <main
          className={twMerge(
            "pt-16 bg-base-100 flex flex-col",
            "w-full h-full min-h-screen max-h-screen overflow-auto",
            "[&>div]:p-2 [&>div]:lg:p-4 [&>*]:grow"
          )}
          data-theme="dark"
        >
          <Suspense fallback={<SpinnerPage />}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
