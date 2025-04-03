"use client"

import type { Profile } from "@/lib/types"
import { useState } from "react"
import { Map, Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Mapbox access token would normally be in an environment variable
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhbXBsZXRva2VuIn0.123456789012"

export default function ProfileMap({ profile }: { profile: Profile }) {
  const [viewState, setViewState] = useState({
    longitude: profile.coordinates?.lng || -74.006,
    latitude: profile.coordinates?.lat || 40.7128,
    zoom: 12,
  })
  const [error, setError] = useState<string | null>(null)

  if (!profile.coordinates) {
    return (
      <Alert variant="destructive" className="h-full flex flex-col justify-center">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>No coordinates available for this profile.</AlertDescription>
      </Alert>
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

      <Marker longitude={profile.coordinates.lng} latitude={profile.coordinates.lat} color="#ff0000" />
    </Map>
  )
}

