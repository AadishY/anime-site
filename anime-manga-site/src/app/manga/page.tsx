import { Manga } from '@/types';
import MangaCard from '@/components/MangaCard';

const MangaPage = async () => {
  try {
    const response = await fetch('https://api-consumet-org-prdk.vercel.app/meta/anilist-manga/action');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const mangas: Manga[] = data.results;

    return (
      <div>
        <section>
          <h2 className="text-3xl font-bold mb-4">Popular Manga</h2>
          {mangas.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 pb-4">
              {mangas.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          ) : (
            <p>Could not load popular manga.</p>
          )}
        </section>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch popular manga:', error);
    return <div className="text-center text-red-500">Could not load popular manga. Please try again later.</div>;
  }
};

export default MangaPage;
