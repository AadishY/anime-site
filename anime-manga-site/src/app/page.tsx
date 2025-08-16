import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to AnimeMangaSite</h1>
        <p className="text-xl mb-8">Your one-stop shop for all things anime and manga.</p>
        <div className="flex justify-center gap-4">
          <Link href="/anime" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Watch Anime
          </Link>
          <Link href="/manga" className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
            Read Manga
          </Link>
        </div>
      </div>
    </main>
  );
}
