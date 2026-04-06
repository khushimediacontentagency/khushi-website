import Header from '../../components/header';
import Gallery from '../../components/cloudinary/gallery';
import { fetchMediaFromFolder } from '../../utils/cloudinary';

export const revalidate = 3600;

export default async function VideosPage() {
  const folders = ['Videos']; 
  const mediaGroups: Record<string, any[]> = {};
  const results = await Promise.all(folders.map(f => fetchMediaFromFolder(f, 'video')));
  
  folders.forEach((folder, index) => {
    mediaGroups[folder] = results[index];
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <Gallery mediaGroups={mediaGroups} title="Videography" />
      </main>
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}