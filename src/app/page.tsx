import { getResidentialProperties, getCommercialProperties, getPreRentedProperties } from '@/data/mockProperties';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const residential = await getResidentialProperties();
  const commercial = await getCommercialProperties();
  const preRented = await getPreRentedProperties();

  return (
    <HomePageClient
      residentialProperties={residential}
      commercialProperties={commercial}
      preRentedProperties={preRented}
    />
  );
}
