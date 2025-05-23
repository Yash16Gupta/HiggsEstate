
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SellPage() {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary mb-4" />,
      title: 'Maximize Your Reach',
      description: 'List your property with us to connect with a vast network of motivated buyers and investors.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary mb-4" />,
      title: 'Expert Guidance',
      description: 'Our experienced agents provide personalized support and market insights every step of the way.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary mb-4" />,
      title: 'Seamless Process',
      description: 'We leverage cutting-edge technology and streamlined processes for a hassle-free selling experience.',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-16rem)]"> {/* Adjust min-height based on header/footer */}
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/5 dark:via-background dark:to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Sell Your Property with <span className="text-primary">Higgs Estate</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Ready to take the next step? Partner with us to achieve the best possible outcome for your property sale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="#why-sell-with-us-section">Why Sell With Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="#list-property-contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-sell-with-us-section" className="py-16 md:py-24 bg-background scroll-mt-20"> {/* Added id and scroll-mt */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Why Sell With Us?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover the advantages of choosing Higgs Estate as your trusted selling partner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center items-center">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for a simplified listing form or detailed CTA */}
      <section id="list-property-contact" className="py-16 md:py-24 bg-secondary/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
            Ready to List Your Property?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-md text-muted-foreground mb-8">
            Our team is eager to assist you. Provide some basic information, and we'll get in touch to discuss your property and how we can help you achieve your selling goals.
          </p>
          <Card className="max-w-lg mx-auto text-left p-6 sm:p-8 shadow-xl">
            <CardTitle className="text-center mb-6 text-xl">Contact Us About Selling</CardTitle>
            {/* In a real application, this would be a form. For now, a placeholder. */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To initiate the selling process, please reach out to our dedicated seller support team. 
                We will guide you through the necessary steps, including property valuation, marketing strategy, and listing preparation.
              </p>
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden my-4">
                <Image src="https://placehold.co/600x300.png" alt="Real estate agent discussion" layout="responsive" width={600} height={300} data-ai-hint="meeting discussion"/>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="mailto:sell@higgsestate.com?subject=Property%20Listing%20Inquiry">
                  Email Our Seller Team
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Or call us at (555) 123-4567
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
