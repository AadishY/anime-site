import { Manga } from '@/types';
import MangaCard from '@/components/MangaCard';

const MangaPage = async () => {
  const response = await fetch('https://api-consumet-org-prdk.vercel.app/meta/anilist-manga/action');
  const data = await response.json();
  const mangas: Manga[] = data.results;

  return (
    <div>
      <section>
        <h2 className="text-3xl font-bold mb-4">Popular Manga</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MangaPage;
