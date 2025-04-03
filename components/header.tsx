"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Profile Explorer
        </Link>
        <div className="flex items-center gap-4">
          <Link href={isAdmin ? "/" : "/admin"}>
            <Button variant="outline">{isAdmin ? "View Profiles" : "Admin Dashboard"}</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

