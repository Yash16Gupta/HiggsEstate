
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Us</CardTitle>
          <CardDescription className="mt-4 text-lg text-muted-foreground">
            We&apos;d love to hear from you! Reach out with any questions or inquiries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Contact us illustration" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="office building"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  <MapPin className="h-6 w-6 mr-3 text-primary" />
                  Our Office
                </h3>
                <p className="text-muted-foreground">
                  123 Property Lane<br />
                  Real Estate City, RE 54321<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  <Mail className="h-6 w-6 mr-3 text-primary" />
                  Email Us
                </h3>
                <Button variant="outline" asChild>
                  <a href="mailto:info@higgsestate.com">info@higgsestate.com</a>
                </Button>
                <p className="text-xs text-muted-foreground mt-1">For general inquiries.</p>
                 <Button variant="outline" asChild className="mt-2">
                  <a href="mailto:sales@higgsestate.com">sales@higgsestate.com</a>
                </Button>
                <p className="text-xs text-muted-foreground mt-1">For sales and listings.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  <Phone className="h-6 w-6 mr-3 text-primary" />
                  Call Us
                </h3>
                <Button variant="outline" asChild>
                  <a href="tel:+15551234567">(555) 123-4567</a>
                </Button>
                <p className="text-xs text-muted-foreground mt-1">Mon - Fri, 9am - 5pm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
