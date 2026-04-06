import Header from '../../components/header';
import Gallery from '../../components/cloudinary/gallery';
import { fetchMediaFromFolder } from '../../utils/cloudinary';

export const revalidate = 3600;

export default async function PhotosPage() {
  const folders = [
    { name: 'Event Photography', path: 'Photos/Event Photography' }, 
    { name: 'Headshots', path: 'Photos/Headshots' }, 
    { name: 'Live shows', path: 'Photos/Live shows' },
    { name: 'Salon Content', path: 'Photos/Salon Content' }, 
    { name: 'Wedding Content', path: 'Photos/Wedding Content' }
  ];
  
  const mediaGroups: Record<string, any[]> = {};
  const results = await Promise.all(
    folders.map(f => fetchMediaFromFolder(f.path, 'image'))
  );
  
  folders.forEach((folder, index) => {
    mediaGroups[folder.name] = results[index];
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <Gallery mediaGroups={mediaGroups} title="Photography" />
      </main>
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}