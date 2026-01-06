import Header from '../components/header';
import ContactForms from '../components/contactforms';

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8 pt-32 pb-16 flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
            Let's <span className="text-[#ff1267]">Create</span> Together
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Ready to book a shoot or join our creative network? Select your path below and fill in the details.
          </p>
        </div>

        <ContactForms />

      </main>
      <footer className="py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}