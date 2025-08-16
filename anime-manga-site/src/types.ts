export interface Anime {
  id: string;
  title: string;
  image: string;
  description: string;
  genres: string[];
  episodes: Episode[];
}

export interface Manga {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  image: string;
  description: string;
  genres: string[];
  chapters: Chapter[];
}

export interface Episode {
  id: string;
  number: number;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
}

export interface StreamingLink {
  quality: string;
  url: string;
}

export interface MangaPage {
  img: string;
  page: number;
}
