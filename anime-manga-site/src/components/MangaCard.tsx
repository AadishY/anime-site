import Link from 'next/link';
import Image from 'next/image';
import { Manga } from '@/types';

const MangaCard = ({ manga }: { manga: Manga }) => {
  return (
    <Link href={`/manga/${manga.id}`} className="group w-64 flex-shrink-0">
      <div className="relative rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
        <Image src={manga.image} alt={manga.title.romaji} width={300} height={450} className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <p className="text-white text-center font-bold">{manga.title.romaji}</p>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;
