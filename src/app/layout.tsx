import type { Metadata } from "next";
import { ThemeProvider } from "~/components/provider/theme-provider"
import AuthProvider from "~/components/provider/auth-provider"
import SessionProvider from "~/components/provider/session-provider"
import { Toaster } from "~/components/ui/toaster"
import ReactQueryProvider from "../components/provider/react-query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rekber",
  description: "Rekber adalah layanan rekening bersama untuk menjamin keamanan dalam transaksi jual beli anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <div
              className="w-full h-screen flex justify-center items-center"
              >
                <AuthProvider>
                  <ReactQueryProvider>
                    {children}
                  </ReactQueryProvider>
                  <Toaster />
                </AuthProvider>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
