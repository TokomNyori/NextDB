import MainLayoutTwo from '@/components/mainLayout/MainLayoutTwo';

export default function People() {
  const page_name: string = 'people';
  return (
    <main className="mt-4 pb-16">
      <MainLayoutTwo page_name={page_name} />
    </main>
  )
}
