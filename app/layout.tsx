import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { ProfileProvider } from "@/components/profile-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Profile Explorer",
  description: "Explore profiles and their locations on a map",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProfileProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              {children}
            </div>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'