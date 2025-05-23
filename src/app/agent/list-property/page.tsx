
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
// Removed useAuth import as layout handles auth guard
// import { useAuth } from "@/contexts/AuthContext"; 

const propertyListingSchema = z.object({
  name: z.string().min(5, { message: "Property name must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  location: z.string().min(3, { message: "Location is required." }),
  type: z.enum(["residential", "commercial"], { required_error: "Property type is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  sqft: z.coerce.number().int().positive({ message: "Square footage must be a positive integer." }),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  amenities: z.string().optional(), // Comma-separated
  contactInfo: z.string().min(10, { message: "Contact information is required (email or phone)." }),
});

type PropertyListingFormValues = z.infer<typeof propertyListingSchema>;

export default function ListPropertyPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { user } = useAuth(); // User object can be used for displaying user info or role-based UI

  const form = useForm<PropertyListingFormValues>({
    resolver: zodResolver(propertyListingSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      location: "",
      type: undefined,
      imageUrl: "",
      sqft: 0,
      bedrooms: 0,
      bathrooms: 0,
      amenities: "",
      contactInfo: "",
    },
  });

  const propertyType = form.watch("type");

  async function onSubmit(data: PropertyListingFormValues) {
    setIsSubmitting(true);
    console.log("Property Listing Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Property Submitted!",
      description: "Your property listing has been successfully submitted for review.",
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">List a New Property</CardTitle>
          <CardDescription>Fill in the details below to list a new property on Higgs Estate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sunnyvale Family Home" {...field} />
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
                      <Textarea
                        placeholder="Detailed description of the property..."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1200000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sunnyvale, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sqft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Footage (sqft)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {propertyType === "residential" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 4" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 3" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.png" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to the main image of the property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amenities (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Large Backyard, Modern Kitchen, Gym Access" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of amenities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., agent@example.com or (555) 123-4567" {...field} />
                    </FormControl>
                    <FormDescription>
                      Email address or phone number for inquiries.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "List Property"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
