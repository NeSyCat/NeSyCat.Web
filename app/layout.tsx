import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Live design system — the REAL Admination DS files, referenced through
// the `admination-design-system` file: dependency (a node_modules symlink
// to the sibling repo). Imported here so Turbopack inlines the DS's nested
// @import url(…) chain. Must come before globals.css so Tailwind/local
// rules can layer on top. Edit/delete the DS → this site changes/breaks.
import "admination-design-system/components/index.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title =
  "NeSyCat Torch — A differentiable tensor implementation of categorical semantics for neurosymbolic learning";
const description =
  "NeSyCat Torch is the neural implementation of NeSyCat: classical, fuzzy, probabilistic and neural semantics under one inductive definition of truth, parametric in a strong monad. A lazy log-tensor monad makes it differentiable; on MNIST addition the HaskTorch, JAX and PyTorch backends match or beat LTN, DeepProbLog and DeepStochLog.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nesycat.org"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://nesycat.org",
    siteName: "NeSyCat Torch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
