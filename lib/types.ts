export type Profile = {
  id: string
  name: string
  photo: string
  description: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  email?: string
  phone?: string
  interests?: string[]
}

