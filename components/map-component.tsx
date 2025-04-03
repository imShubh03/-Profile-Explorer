"use client"

import { useProfileContext } from "./profile-context"
import { useEffect, useState } from "react"
import { Map, Marker, NavigationControl, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { getProfiles } from "@/lib/data"

// Mapbox access token would normally be from an environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapComponent() {
  const { selectedProfile } = useProfileContext()
  const [viewState, setViewState] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 3,
  })
  const [profiles, setProfiles] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true)
        const data = await getProfiles()
        setProfiles(data)
        setError(null)
      } catch (err) {
        setError("Failed to load profile locations")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProfiles()
  }, [])

  useEffect(() => {
    if (selectedProfile && selectedProfile.coordinates) {
      setViewState({
        longitude: selectedProfile.coordinates.lng,
        latitude: selectedProfile.coordinates.lat,
        zoom: 12,
      })
    }
  }, [selectedProfile])

  if (error) {
    return (
      <Alert variant="destructive" className="h-full flex flex-col justify-center">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-muted">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />

      {profiles.map((profile) => (
        <Marker
          key={profile.id}
          longitude={profile.coordinates.lng}
          latitude={profile.coordinates.lat}
          color={selectedProfile?.id === profile.id ? "#ff0000" : "#3b82f6"}
          onClick={(e) => {
            // Prevent click from propagating to the map
            e.originalEvent.stopPropagation()
          }}
        >
          {selectedProfile?.id === profile.id && (
            <Popup
              longitude={profile.coordinates.lng}
              latitude={profile.coordinates.lat}
              anchor="bottom"
              closeButton={false}
              closeOnClick={false}
            >
              <div className="p-2">
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">{profile.address}</p>
                <Link href={`/profile/${profile.id}`} className="block mt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </Map>
  )
}

