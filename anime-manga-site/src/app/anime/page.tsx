import { Anime } from '@/types';
import AnimeCard from '@/components/AnimeCard';

const fetchAnimeData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch anime data from ${url}:`, error);
    return [];
  }
};

const AnimePage = async () => {
  const [trendingAnimes, popularAnimes, recentAnimes]: [Anime[], Anime[], Anime[]] = await Promise.all([
    fetchAnimeData('https://api-consumet-org-prdk.vercel.app/meta/anilist/trending'),
    fetchAnimeData('https://api-consumet-org-prdk.vercel.app/anime/gogoanime/top-airing'),
    fetchAnimeData('https://api-consumet-org-prdk.vercel.app/anime/gogoanime/recent-episodes'),
  ]);

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Trending Anime</h2>
        {trendingAnimes.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 pb-4">
            {trendingAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <p>Could not load trending anime.</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Anime</h2>
        {popularAnimes.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <p>Could not load popular anime.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Recent Episodes</h2>
        {recentAnimes.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 pb-4">
            {recentAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <p>Could not load recent episodes.</p>
        )}
      </section>
    </div>
  );
};

export default AnimePage;
