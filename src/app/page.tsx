import HomePageClient from '@/components/HomePageClient';
import { getResidentialProperties, getCommercialProperties } from '@/data/mockProperties';

export default async function Home() {
  // Fetch properties on the server
  const residentialProperties = await getResidentialProperties();
  const commercialProperties = await getCommercialProperties();

  return (
    <HomePageClient 
      residentialProperties={residentialProperties} 
      commercialProperties={commercialProperties} 
    />
  );
}
