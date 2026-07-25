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
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "NeSyCat — A monad-based categorical framework for neurosymbolic AI";
// Full description: used for Open Graph/Twitter/JSON-LD, where there's no
// truncation penalty and the extra benchmark detail is worth keeping.
const description =
  "NeSyCat unifies classical, fuzzy, probabilistic and neural reasoning under one categorical, monad-parametric definition of truth. NeSyCat Torch is its differentiable, neural implementation — matching or beating LTN, DeepProbLog and DeepStochLog on MNIST addition across Haskell, JAX and PyTorch.";
// Short description: used for <meta name="description">, which Google
// truncates in the search snippet at roughly 155-160 characters.
const shortDescription =
  "A monad-based categorical framework unifying classical, fuzzy, probabilistic and neural reasoning — differentiable via NeSyCat Torch.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nesycat.org"),
  title,
  description: shortDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://nesycat.org",
    siteName: "NeSyCat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NeSyCat",
  url: "https://nesycat.org",
  description,
  // Ties this domain, the GitHub org, and the Semiotics editor together as
  // the same project — helps Google's entity resolution connect them.
  sameAs: ["https://github.com/NeSyCat", "https://semiotics.nesycat.org"],
  publisher: {
    "@type": "Organization",
    name: "NeSyCat",
    url: "https://nesycat.org",
    logo: {
      "@type": "ImageObject",
      url: "https://nesycat.org/opengraph-image",
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
