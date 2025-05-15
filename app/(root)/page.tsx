import Hero from "../components/Hero";
import StartUp from "../components/StartUp";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = (await searchParams)?.query || '';
  
  return (
    
    
    <main className="min-h-screen bg-black">
      <Hero searchParams={searchParams} />
      <StartUp query={query} />
    </main>
  
    
  );
}
