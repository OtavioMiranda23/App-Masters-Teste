"use client";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";
import { RatingProvider } from "@/context/RatingContext";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/header/header";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
});
 const metadata = {
  title: "App Masters | Teste",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <html lang="en">
        <Head>
          <title>App Masters | Jogos</title>
        </Head>
        <AuthProvider>
          <RatingProvider>
            <SearchProvider>
              <body className={montserrat.className}>
                <>
                  <Header />
                  {children}
                </>
              </body>
            </SearchProvider>
          </RatingProvider>
        </AuthProvider>
      </html>

  );
}
