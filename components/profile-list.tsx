"use client"

import type { Profile } from "@/lib/types"
import { useProfileContext } from "./profile-context"
import { useEffect, useState } from "react"
import ProfileCard from "./profile-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ProfileList({ initialProfiles }: { initialProfiles: Profile[] }) {
  const { searchTerm, locationFilter, setSearchTerm } = useProfileContext()
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)

  useEffect(() => {
    let filtered = initialProfiles

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (locationFilter) {
      filtered = filtered.filter((profile) => profile.address.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    setProfiles(filtered)
  }, [initialProfiles, searchTerm, locationFilter])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search profiles..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
        {profiles.length > 0 ? (
          profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">No profiles found matching your search criteria.</div>
        )}
      </div>
    </div>
  )
}

