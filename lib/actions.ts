"use server"

import { revalidatePath } from "next/cache"
import type { Profile } from "./types"
import { getProfiles } from "./data"

// In a real application, these would interact with a database
// For this example, we'll use in-memory operations

let profiles: Profile[] = []

// Initialize with data from data.ts
getProfiles().then((data) => {
  profiles = data
})

export async function createProfile(profileData: Omit<Profile, "id">) {
  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 9)

  const newProfile: Profile = {
    id,
    ...profileData,
  } as Profile

  profiles.push(newProfile)

  // Revalidate the profiles page
  revalidatePath("/")
  revalidatePath("/admin")

  return newProfile
}

export async function updateProfile(id: string, profileData: Partial<Profile>) {
  const index = profiles.findIndex((profile) => profile.id === id)

  if (index === -1) {
    throw new Error(`Profile with ID ${id} not found`)
  }

  profiles[index] = {
    ...profiles[index],
    ...profileData,
  }

  // Revalidate the profiles page
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath(`/profile/${id}`)

  return profiles[index]
}

export async function deleteProfile(id: string) {
  const index = profiles.findIndex((profile) => profile.id === id)

  if (index === -1) {
    throw new Error(`Profile with ID ${id} not found`)
  }

  profiles.splice(index, 1)

  // Revalidate the profiles page
  revalidatePath("/")
  revalidatePath("/admin")

  return true
}

