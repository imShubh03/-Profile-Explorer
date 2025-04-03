import AdminProfileList from "@/components/admin-profile-list"
import ProfileForm from "@/components/profile-form"
import { getProfiles } from "@/lib/data"
import { Suspense } from "react"
import { ProfileSkeleton } from "@/components/loading-skeletons"

export default async function AdminPage() {
  const profiles = await getProfiles()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Profile</h2>
            <ProfileForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Profiles</h2>
            <Suspense fallback={<ProfileSkeleton count={5} />}>
              <AdminProfileList initialProfiles={profiles} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

