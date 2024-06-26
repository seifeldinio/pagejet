import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/context/designer-context";
import NextTopLoader from "nextjs-toploader";
import { PageDesignerContextProvider } from "@/context/page-designer-context";
import { CoverImageProvider } from "@/context/cover-image-context";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/providers/modal-provider";
import { SearchProvider } from "@/context/form-search-context";
import { PagesSearchProvider } from "@/context/page-search-context";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PageJet",
  description: "Forms and Page Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className="sf-pro-font"
          // className={inter.className}
        >
          <NextTopLoader color="#CFC9F3" showSpinner={false} />
          <DesignerContextProvider>
            <PageDesignerContextProvider>
              <CoverImageProvider>
                <SearchProvider>
                  <PagesSearchProvider>
                    <EdgeStoreProvider>
                      <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                      >
                        {children}
                        <Toaster />
                        <ModalProvider />
                      </ThemeProvider>
                    </EdgeStoreProvider>
                  </PagesSearchProvider>
                </SearchProvider>
              </CoverImageProvider>
            </PageDesignerContextProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
