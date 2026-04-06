import Header from '../../components/header';
import Gallery from '../../components/cloudinary/gallery';
import { fetchMediaFromFolder } from '../../utils/cloudinary';

export const revalidate = 3600;

export default async function UGCPage() {
  const folders = [
    { name: 'UGC Content', path: 'UGC' } 
  ];
  
  const mediaGroups: Record<string, any[]> = {};
  const results = await Promise.all(
    folders.map(f => fetchMediaFromFolder(f.path, 'all'))
  );
  
  folders.forEach((folder, index) => {
    mediaGroups[folder.name] = results[index] || [];
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 pt-32 pb-12">
        <Gallery 
          mediaGroups={mediaGroups} 
          title="UGC & Content Creation" 
          backLink="/portfolio" 
          backLabel="Back to Portfolio"
          defaultFolder="UGC Content" 
        />
      </main>
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}