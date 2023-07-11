import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";
import { RatingProvider } from "@/context/RatingContext";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <RatingProvider>
          <SearchProvider>
            <body className={montserrat.className}>{children}</body>
          </SearchProvider>
        </RatingProvider>
      </AuthProvider>
    </html>
  );
}
