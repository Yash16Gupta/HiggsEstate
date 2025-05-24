import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" className="relative py-20 md:py-32 min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/5 dark:via-background dark:to-accent/5">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
         {/* Optional subtle background image or pattern */}
         {/* <Image src="https://placehold.co/1920x1080.png?text=Abstract+Pattern" alt="Background Pattern" layout="fill" objectFit="cover" data-ai-hint="abstract pattern" /> */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Discover Your <span className="text-primary">Perfect Property</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
          Higgs Estate offers an exclusive selection of residential, commercial and prerented properties.
          Let us help you find the space that defines your future.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#residential">View Residential Properties</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#commercial">Explore Commercial Spaces</Link>
          </Button>
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#prerented">View PreRented Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
