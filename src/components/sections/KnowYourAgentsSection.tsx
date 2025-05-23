
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  email: string;
  phone: string;
  imageHint: string;
}

const agents: Agent[] = [
  {
    id: 'agent1',
    name: 'Alice Wonderland',
    title: 'Lead Residential Specialist',
    bio: 'Alice has over 10 years of experience helping families find their dream homes. She specializes in the Sunnyvale and surrounding areas.',
    imageUrl: 'https://placehold.co/300x300.png',
    email: 'alice.wonderland@higgsestate.com',
    phone: '(555) 111-2222',
    imageHint: 'professional woman portrait'
  },
  {
    id: 'agent2',
    name: 'Bob The Builder',
    title: 'Commercial Property Guru',
    bio: 'Bob is an expert in commercial real estate, with a focus on retail and office spaces. He provides strategic advice to businesses of all sizes.',
    imageUrl: 'https://placehold.co/300x300.png',
    email: 'bob.builder@higgsestate.com',
    phone: '(555) 333-4444',
    imageHint: 'professional man portrait'
  },
  {
    id: 'agent3',
    name: 'Carol Danvers',
    title: 'Luxury Investment Advisor',
    bio: 'Carol excels in high-value property investments, offering bespoke services to discerning clients looking for exclusive opportunities.',
    imageUrl: 'https://placehold.co/300x300.png',
    email: 'carol.danvers@higgsestate.com',
    phone: '(555) 555-6666',
    imageHint: 'confident woman portrait'
  },
];

const KnowYourAgentsSection = () => {
  return (
    <section id="agents" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Meet Our Expert Agents
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our dedicated team is here to guide you through every step of your real estate journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <Card key={agent.id} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <CardHeader className="items-center p-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/50 shadow-md">
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={agent.imageHint}
                  />
                </div>
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <CardDescription className="text-primary min-h-[2.5em]">{agent.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <p className="text-sm text-muted-foreground mb-6 min-h-[4.5em] line-clamp-3">{agent.bio}</p>
                <div className="space-y-3">
                   <Button variant="outline" size="sm" className="w-full" asChild>
                     <a href={`mailto:${agent.email}`}>
                       <Mail className="mr-2 h-4 w-4" /> Email {agent.name.split(' ')[0]}
                     </a>
                   </Button>
                   <Button variant="ghost" size="sm" className="w-full" asChild>
                     <a href={`tel:${agent.phone}`}>
                       <Phone className="mr-2 h-4 w-4" /> Call {agent.name.split(' ')[0]}
                     </a>
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowYourAgentsSection;
