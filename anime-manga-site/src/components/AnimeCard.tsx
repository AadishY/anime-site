import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/types';

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Link href={`/anime/${anime.id}`} className="group w-64 flex-shrink-0">
      <div className="relative rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
        <Image src={anime.image} alt={anime.title} width={300} height={450} className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <p className="text-white text-center font-bold">{anime.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
