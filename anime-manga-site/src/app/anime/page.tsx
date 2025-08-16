import { Anime } from '@/types';
import AnimeCard from '@/components/AnimeCard';

const AnimePage = async () => {
  const [trendingRes, popularRes, recentRes] = await Promise.all([
    fetch('https://api-consumet-org-prdk.vercel.app/meta/anilist/trending'),
    fetch('https://api-consumet-org-prdk.vercel.app/anime/gogoanime/top-airing'),
    fetch('https://api-consumet-org-prdk.vercel.app/anime/gogoanime/recent-episodes'),
  ]);

  const trendingData = await trendingRes.json();
  const popularData = await popularRes.json();
  const recentData = await recentRes.json();

  const trendingAnimes: Anime[] = trendingData.results;
  const popularAnimes: Anime[] = popularData.results;
  const recentAnimes: Anime[] = recentData.results;

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Trending Anime</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {trendingAnimes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Anime</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {popularAnimes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Recent Episodes</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {recentAnimes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimePage;
