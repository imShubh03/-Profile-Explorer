import { getProfileById, getProfiles } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import ProfileMap from "@/components/profile-map"

export async function generateStaticParams() {
  const profiles = await getProfiles()

  return profiles.map((profile) => ({
    id: profile.id,
  }))
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const profile = await getProfileById(params.id)

  if (!profile) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profiles
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg overflow-hidden shadow">
            <div className="aspect-square relative">
              <Image src={profile.photo || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.address}</span>
              </div>
              <p className="mt-4">{profile.description}</p>

              <div className="mt-6 pt-6 border-t">
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <div className="grid gap-2">
                  <div>
                    <span className="font-medium">Email:</span> {profile.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {profile.phone}
                  </div>
                </div>
              </div>

              {profile.interests && (
                <div className="mt-6 pt-6 border-t">
                  <h2 className="text-lg font-semibold mb-2">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg overflow-hidden shadow h-[500px]">
            <ProfileMap profile={profile} />
          </div>
        </div>
      </div>
    </main>
  )
}

