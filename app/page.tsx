import Header from './components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8">
        <p className="text-lg mb-4">
          Hello world!
        </p>
        <ul className="list-disc pl-5">
          <li>coffee</li>
        </ul>
      </main>
    </div>
  );
}