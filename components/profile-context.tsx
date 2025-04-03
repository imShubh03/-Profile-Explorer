"use client"

import type React from "react"

import type { Profile } from "@/lib/types"
import { createContext, useContext, useState } from "react"

type ProfileContextType = {
  selectedProfile: Profile | null
  setSelectedProfile: (profile: Profile | null) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  locationFilter: string
  setLocationFilter: (location: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  return (
    <ProfileContext.Provider
      value={{
        selectedProfile,
        setSelectedProfile,
        searchTerm,
        setSearchTerm,
        locationFilter,
        setLocationFilter,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfileContext() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider")
  }
  return context
}

