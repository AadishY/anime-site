'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime, Manga } from '@/types';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [animeResults, setAnimeResults] = useState<Anime[]>([]);
  const [mangaResults, setMangaResults] = useState<Manga[]>([]);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        // Fetch anime results
        const animeResponse = await fetch(`https://api-consumet-org-prdk.vercel.app/anime/gogoanime/${query}`);
        const animeData = await animeResponse.json();
        setAnimeResults(animeData.results);

        // Fetch manga results
        const mangaResponse = await fetch(`https://api-consumet-org-prdk.vercel.app/meta/anilist-manga/${query}`);
        const mangaData = await mangaResponse.json();
        setMangaResults(mangaData.results);
      };

      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Anime</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {animeResults.map((anime) => (
            <Link href={`/anime/${anime.id}`} key={anime.id} className="group bg-black bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden border border-gray-700 transition-transform transform hover:scale-105">
              <Image src={anime.image} alt={anime.title} width={500} height={500} className="w-full h-64 object-cover" />
              <div className="p-2">
                <h2 className="text-lg font-bold">{anime.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Manga</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mangaResults.map((manga) => (
            <Link href={`/manga/${manga.id}`} key={manga.id} className="group bg-black bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden border border-gray-700 transition-transform transform hover:scale-105">
              <Image src={manga.image} alt={manga.title.romaji} width={500} height={500} className="w-full h-64 object-cover" />
              <div className="p-2">
                <h2 className="text-lg font-bold">{manga.title.romaji}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
