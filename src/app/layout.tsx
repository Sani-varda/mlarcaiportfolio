import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#cbdbe6",
};

export const metadata: Metadata = {
  title: "Sani Varada — AI/ML Architect & Founder of ML Arc Software Agency",
  description: "Portfolio of Sani Varada, AI/ML Architect and Founder of ML Arc — a custom software agency delivering advanced generative systems, custom RAG pipelines, and systematic volatility trading strategies.",
  keywords: ["Sani Varada", "AI/ML Architect", "Quant Analyst", "ML Arc", "Software Agency", "AI Software Agency", "Machine Learning Portfolio", "RAG Pipeline", "Quantitative Trading", "FastAPI", "Next.js", "Generative Engine Optimization", "GEO", "LLM Agent Pipelines"],
  authors: [{ name: "Sani Varada", url: "https://www.portfolio.mlarcai.com" }],
  creator: "Sani Varada",
  metadataBase: new URL("https://www.portfolio.mlarcai.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-token",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "bing-site-verification-token",
    },
  },
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sani Varada — AI/ML Architect & Founder of ML Arc Software Agency",
    description: "Portfolio of Sani Varada, AI/ML Architect and Founder of ML Arc — a custom software agency delivering advanced generative systems, custom RAG pipelines, and systematic volatility trading strategies.",
    url: "https://www.portfolio.mlarcai.com",
    siteName: "Sani Varada Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sani Varada — AI/ML Architect & Founder of ML Arc Software Agency",
    description: "Portfolio of Sani Varada, AI/ML Architect and Founder of ML Arc — a custom software agency delivering advanced generative systems, custom RAG pipelines, and systematic volatility trading strategies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <link href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11" rel="stylesheet" type="text/css"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.portfolio.mlarcai.com/#person",
                  "name": "Sani Varada",
                  "url": "https://www.portfolio.mlarcai.com",
                  "jobTitle": "AI/ML Architect & Quant Analyst",
                  "sameAs": [
                    "https://github.com/Sani-varda",
                    "https://www.linkedin.com/company/mlarc/",
                    "https://x.com/mlarc_ai",
                    "https://www.instagram.com/mlarc.ai/",
                    "https://www.facebook.com/MLArc"
                  ],
                  "worksFor": {
                    "@id": "https://www.portfolio.mlarcai.com/#organization"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.portfolio.mlarcai.com/#organization",
                  "name": "ML Arc",
                  "url": "https://www.portfolio.mlarcai.com",
                  "logo": "https://www.portfolio.mlarcai.com/logo.svg",
                  "sameAs": [
                    "https://www.linkedin.com/company/mlarc/",
                    "https://x.com/mlarc_ai",
                    "https://www.instagram.com/mlarc.ai/",
                    "https://www.facebook.com/MLArc"
                  ],
                  "description": "ML Arc is a custom software agency delivering advanced generative AI systems, custom RAG pipelines, and systematic volatility trading strategies.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hyderabad",
                    "addressCountry": "IN"
                  }
                }
              ]
            })
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5C2MW8J');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KMCSN3ZP90" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KMCSN3ZP90');
            `,
          }}
        />
        {/* End Google tag */}
      </head>
      <body className="min-h-screen bg-[#cbdbe6] text-[#0f172a]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5C2MW8J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="cinematic-vignette" />
        <div className="noise-overlay" />
        
        {children}
      </body>
    </html>
  );
}
