"use client"

import type { Profile } from "@/lib/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, AlertCircle } from "lucide-react"
import ProfileForm from "./profile-form"
import { deleteProfile } from "@/lib/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function AdminProfileList({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null)
  const { toast } = useToast()

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!profileToDelete) return

    try {
      await deleteProfile(profileToDelete.id)
      setProfiles(profiles.filter((p) => p.id !== profileToDelete.id))
      toast({
        title: "Profile deleted",
        description: `${profileToDelete.name} has been removed.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProfileToDelete(null)
    }
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search profiles..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {editingProfile ? (
        <div className="bg-muted p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Edit Profile</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditingProfile(null)}>
              Cancel
            </Button>
          </div>
          <ProfileForm
            existingProfile={editingProfile}
            onSuccess={() => {
              setEditingProfile(null)
              // Refresh profiles after edit
              setProfiles((prevProfiles) =>
                prevProfiles.map((p) => (p.id === editingProfile.id ? { ...p, ...editingProfile } : p)),
              )
            }}
          />
        </div>
      ) : null}

      <div className="space-y-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingProfile(profile)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setProfileToDelete(profile)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">No profiles found matching your search criteria.</div>
        )}
      </div>

      <AlertDialog open={!!profileToDelete} onOpenChange={(open) => !open && setProfileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Profile
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {profileToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

