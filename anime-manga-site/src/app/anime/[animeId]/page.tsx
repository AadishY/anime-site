import Link from 'next/link';
import Image from 'next/image';
import { Anime, Episode } from '@/types';

const AnimeDetailPage = async ({ params }: { params: { animeId: string } }) => {
  const { animeId } = params;

  try {
    const response = await fetch(`https://api-consumet-org-prdk.vercel.app/anime/gogoanime/info/${animeId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const anime: Anime = await response.json();

    return (
      <div className="p-4 sm:p-6 md:p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row gap-8">
          <Image src={anime.image} alt={anime.title} width={500} height={750} className="w-full md:w-1/3 rounded-lg" />
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            <p className="text-gray-400 mb-4">{anime.description}</p>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre: string) => (
                <span key={genre} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {anime.episodes.map((episode: Episode) => (
              <Link href={`/watch/${episode.id}`} key={episode.id} className="bg-black bg-opacity-20 backdrop-blur-lg rounded-lg p-4 text-center border border-gray-700 transition-transform transform hover:scale-105">
                Episode {episode.number}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch anime details for ${animeId}:`, error);
    return <div className="text-center text-red-500">Could not load anime details. Please try again later.</div>;
  }
};

export default AnimeDetailPage;
