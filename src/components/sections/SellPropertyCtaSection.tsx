
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const SellPropertyCtaSection = () => {
  return (
    <section id="sell-cta" className="py-16 md:py-24 bg-secondary/10 dark:bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto text-center shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 pt-8 pb-6">
            <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Thinking of Selling Your Property?
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Let our experts guide you through a seamless selling process and achieve the best market value for your home or commercial space.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8">
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
              <Link href="/sell">
                Learn More About Selling <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SellPropertyCtaSection;
