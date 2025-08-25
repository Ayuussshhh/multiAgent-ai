import Providers from "./Providers";
import GradientPalette from "./GradientPalette"; // client component
import "./globals.css"; // add this at the top
export const metadata = {
  title: "My App",
  description: "Auth with NextAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Palette Button + Sidebar */}
          <GradientPalette />

          {/* Main App */}
          {children}
        </Providers>
      </body>
    </html>
  );
}

/*import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Multiagent Platform - AI Product Requirements",
  description:
    "Advanced multiagent platform for processing product requirements with AI agents",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
}
        `}</style>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}*/
