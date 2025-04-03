import ProfileList from "@/components/profile-list"
import MapComponent from "@/components/map-component"
import SearchFilters from "@/components/search-filters"
import { getProfiles } from "@/lib/data"
import { Suspense } from "react"
import { ProfileSkeleton } from "@/components/loading-skeletons"

export default async function Home() {
  const profiles = await getProfiles()

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Profile Explorer</h1>

        <SearchFilters />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <Suspense fallback={<ProfileSkeleton count={5} />}>
              <ProfileList initialProfiles={profiles} />
            </Suspense>
          </div>
          <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden sticky top-4">
            <MapComponent />
          </div>
        </div>
      </div>
    </main>
  )
}

