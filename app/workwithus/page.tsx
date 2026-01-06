import Header from '../components/header';
import WorkWithUs from '../components/workwithus';

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8 pt-24">
        <WorkWithUs />
      </main>
    </div>
  );
}