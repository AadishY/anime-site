'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { StreamingLink } from '@/types';

const WatchPage = ({ params }: { params: { episodeId: string } }) => {
  const { episodeId } = params;
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreamingLink = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api-consumet-org-prdk.vercel.app/anime/gogoanime/watch/${episodeId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const defaultQuality = data.sources.find((source: StreamingLink) => source.quality === 'default');
        setVideoUrl(defaultQuality ? defaultQuality.url : data.sources[0]?.url);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStreamingLink();
  }, [episodeId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Watching Episode</h1>
      <div className="player-wrapper">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && videoUrl && (
          <ReactPlayer
            className="react-player"
            url={videoUrl}
            width="100%"
            height="100%"
            controls
          />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
