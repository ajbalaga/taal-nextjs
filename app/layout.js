import "./globals.css";
import { Spectral, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LightboxProvider } from "@/components/Lightbox";

const spectral = Spectral({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-serif", display: "swap" });
const sans = Source_Sans_3({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: { default: "Municipality of Taal", template: "%s · Municipality of Taal" },
  description: "Official website of the Municipality of Taal, Batangas — services, permits, announcements, and heritage tourism.",
  metadataBase: new URL("https://taal.gov.ph")
};

const styles = {
  shell: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  main: { flex: 1 }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spectral.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to main content</a>
        <LightboxProvider>
          <div style={styles.shell}>
            <Header />
            <main id="main" style={styles.main}>{children}</main>
            <Footer />
          </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
