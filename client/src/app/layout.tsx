import "../../globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/app.header";
import Footer from "@/components/app.footer";
import { ThemeProvider  }  from "next-themes"
import HeaderWrapper from "@/components/header-wrapper";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Maid Rental",
  description: "Book a maid service",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <HeaderWrapper />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
