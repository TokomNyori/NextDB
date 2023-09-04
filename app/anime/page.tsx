import MainLayout from '@/components/mainLayout/MainLayout';
import MainLayoutTwo from '@/components/mainLayout/MainLayoutTwo';

export default function Anime() {
  const page_name: string = 'anime';
  return (
    <main className="mt-4 pb-16">
      <MainLayoutTwo page_name={page_name} />
    </main>
  )
}
