import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  weight: ["200","300","400","500","600","700","800","900"],
});

export const metadata = {
  title: "Bodhi Prakashan",
  description: "Creative Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${monaSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}