'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MangaPage as MangaPageType } from '@/types';

const ReadPage = ({ params }: { params: { chapterId: string } }) => {
  const { chapterId } = params;
  const [pages, setPages] = useState<MangaPageType[]>([]);

  useEffect(() => {
    const fetchChapterPages = async () => {
      const response = await fetch(`https://api-consumet-org-prdk.vercel.app/manga/mangadex/read?chapterId=${chapterId}`);
      const data = await response.json();
      setPages(data);
    };

    fetchChapterPages();
  }, [chapterId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Reading Chapter</h1>
      <div className="flex flex-col items-center">
        {pages.map((page: MangaPageType, index: number) => (
          <Image key={index} src={page.img} alt={`Page ${index + 1}`} width={1200} height={1600} className="w-full h-auto" />
        ))}
      </div>
    </div>
  );
};

export default ReadPage;
