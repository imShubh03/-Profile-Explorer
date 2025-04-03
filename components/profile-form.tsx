"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Profile } from "@/lib/types"
import { createProfile, updateProfile } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  photo: z.string().url({ message: "Please enter a valid URL for the photo." }).optional(),
  interests: z.string().optional(),
})

export default function ProfileForm({
  existingProfile,
  onSuccess,
}: {
  existingProfile?: Profile
  onSuccess?: () => void
}) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: existingProfile
      ? {
          name: existingProfile.name,
          email: existingProfile.email || "",
          phone: existingProfile.phone || "",
          address: existingProfile.address,
          description: existingProfile.description,
          photo: existingProfile.photo || "",
          interests: existingProfile.interests?.join(", ") || "",
        }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
          description: "",
          photo: "",
          interests: "",
        },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsSubmitting(true)

      // Convert comma-separated interests to array
      const interestsArray = values.interests
        ? values.interests
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : []

      // Geocode the address to get coordinates (in a real app)
      // For this example, we'll use mock coordinates
      const coordinates = {
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.006 + (Math.random() - 0.5) * 0.1,
      }

      const profileData = {
        ...values,
        interests: interestsArray,
        coordinates,
      }

      if (existingProfile) {
        await updateProfile(existingProfile.id, profileData)
        toast({
          title: "Profile updated",
          description: "The profile has been updated successfully.",
        })
      } else {
        await createProfile(profileData)
        form.reset()
        toast({
          title: "Profile created",
          description: "The new profile has been created successfully.",
        })
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, New York, NY 10001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description about this person..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormDescription>Enter a URL for the profile photo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input placeholder="Reading, Hiking, Photography" {...field} />
              </FormControl>
              <FormDescription>Enter interests separated by commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : existingProfile ? "Update Profile" : "Create Profile"}
        </Button>
      </form>
    </Form>
  )
}

