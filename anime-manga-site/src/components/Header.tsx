'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query.trim()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 text-white p-4 bg-black bg-opacity-25 backdrop-blur-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AnimeMangaSite
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/anime">Anime</Link>
            </li>
            <li>
              <Link href="/manga">Manga</Link>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-2xl" />
              </a>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 rounded bg-black bg-opacity-20 border border-gray-700 text-white"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
