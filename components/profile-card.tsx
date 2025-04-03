"use client"

import type { Profile } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, User } from "lucide-react"
import Image from "next/image"
import { useProfileContext } from "./profile-context"
import Link from "next/link"

export default function ProfileCard({ profile }: { profile: Profile }) {
  const { setSelectedProfile } = useProfileContext()

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/2] relative">
        {profile.photo ? (
          <Image src={profile.photo || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{profile.name}</h3>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{profile.address}</span>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{profile.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="secondary" size="sm" onClick={() => setSelectedProfile(profile)}>
          Show on Map
        </Button>
        <Link href={`/profile/${profile.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

