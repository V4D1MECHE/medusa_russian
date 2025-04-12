import { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"
import { getBaseURL } from "@lib/util/env"

import "../styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const inter = Inter({
  preload: true,
  subsets: ["latin", "cyrillic"],
  style: ["normal"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-mode="light" className="antialiased">
      <body className={`${inter.className}`}>
        <main className="relative">{props.children}</main>
        <SpeedInsights />
      </body>
    </html>
  )
}