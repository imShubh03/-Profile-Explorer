import type { Profile } from "./types"

// This would normally be a database call
// For this example, we'll use a mock data array
const profiles: Profile[] = [
  {
    id: "1",
    name: "John Smith",
    photo: "/placeholder.svg?height=400&width=400",
    description:
      "Software engineer with 5 years of experience in web development. Passionate about creating user-friendly interfaces and solving complex problems.",
    address: "123 Tech Lane, San Francisco, CA",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    interests: ["Coding", "Hiking", "Photography"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    photo: "/placeholder.svg?height=400&width=400",
    description:
      "Marketing specialist with expertise in digital campaigns and brand strategy. Helped multiple startups establish their market presence.",
    address: "456 Market St, New York, NY",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    interests: ["Marketing", "Travel", "Yoga"],
  },
  {
    id: "3",
    name: "Michael Chen",
    photo: "/placeholder.svg?height=400&width=400",
    description:
      "Product designer focused on creating intuitive user experiences. Previously worked at major tech companies designing mobile and web applications.",
    address: "789 Design Blvd, Austin, TX",
    coordinates: {
      lat: 30.2672,
      lng: -97.7431,
    },
    email: "michael@example.com",
    phone: "+1 (555) 456-7890",
    interests: ["Design", "Music", "Cooking"],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    photo: "/placeholder.svg?height=400&width=400",
    description:
      "Data scientist specializing in machine learning and AI. Passionate about using data to solve real-world problems and improve decision-making.",
    address: "101 Data Drive, Seattle, WA",
    coordinates: {
      lat: 47.6062,
      lng: -122.3321,
    },
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    interests: ["Data Science", "Reading", "Running"],
  },
  {
    id: "5",
    name: "David Kim",
    photo: "/placeholder.svg?height=400&width=400",
    description:
      "Project manager with a track record of delivering complex projects on time and within budget. Skilled in agile methodologies and team leadership.",
    address: "202 Project Ave, Chicago, IL",
    coordinates: {
      lat: 41.8781,
      lng: -87.6298,
    },
    email: "david@example.com",
    phone: "+1 (555) 876-5432",
    interests: ["Project Management", "Basketball", "Gardening"],
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProfiles(): Promise<Profile[]> {
  // Simulate API delay
  await delay(500)
  return [...profiles]
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  // Simulate API delay
  await delay(300)
  return profiles.find((profile) => profile.id === id)
}

