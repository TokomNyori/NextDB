import MainLayout from '@/components/mainLayout/MainLayout'
import { getData } from './libs/getData';

export default async function Movies() {
  const page_name: string = 'movies';
  return (
    <main className="mt-4 pb-16">
      <MainLayout page_name={page_name} />
    </main>
  )
}
