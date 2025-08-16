import Link from 'next/link';
import Image from 'next/image';
import { Manga, Chapter } from '@/types';

const MangaDetailPage = async ({ params }: { params: { mangaId: string } }) => {
  const { mangaId } = params;

  try {
    const response = await fetch(`https://api-consumet-org-prdk.vercel.app/meta/anilist-manga/info/${mangaId}?provider=mangadex`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const manga: Manga = await response.json();

    return (
      <div className="p-4 sm:p-6 md:p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row gap-8">
          <Image src={manga.image} alt={manga.title.romaji} width={500} height={750} className="w-full md:w-1/3 rounded-lg" />
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{manga.title.romaji}</h1>
            <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: manga.description }}></p>
            <div className="flex flex-wrap gap-2">
              {manga.genres.map((genre: string) => (
                <span key={genre} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {manga.chapters?.map((chapter: Chapter) => (
              <Link href={`/read/${chapter.id}`} key={chapter.id} className="bg-black bg-opacity-20 backdrop-blur-lg rounded-lg p-4 text-center border border-gray-700 transition-transform transform hover:scale-105">
                Chapter {chapter.chapterNumber}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch manga details for ${mangaId}:`, error);
    return <div className="text-center text-red-500">Could not load manga details. Please try again later.</div>;
  }
};

export default MangaDetailPage;
