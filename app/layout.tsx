import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import ContextProvider from "./providers/ContextProvider";
import {ClerkProvider, RedirectToSignIn} from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server";

const poppins = Poppins({subsets: ["latin"], weight: "400"});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {userId} = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            src="https://kit.fontawesome.com/5df6411027.js"
            crossOrigin="anonymous"></script>
        </head>
        <body className={poppins.className}>
          <ContextProvider>
            <GlobalStylesProvider>
              {userId ? <Sidebar /> : <RedirectToSignIn />}
              <div className="w-full"> {children}</div>
            </GlobalStylesProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
