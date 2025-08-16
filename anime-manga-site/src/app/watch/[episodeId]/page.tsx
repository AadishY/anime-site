'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { StreamingLink } from '@/types';

const WatchPage = ({ params }: { params: { episodeId: string } }) => {
  const { episodeId } = params;
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchStreamingLink = async () => {
      const response = await fetch(`https://api-consumet-org-prdk.vercel.app/anime/gogoanime/watch/${episodeId}`);
      const data = await response.json();
      // Choose the 'default' quality if available, otherwise the first one
      const defaultQuality = data.sources.find((source: StreamingLink) => source.quality === 'default');
      setVideoUrl(defaultQuality ? defaultQuality.url : data.sources[0]?.url);
    };

    fetchStreamingLink();
  }, [episodeId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Watching Episode</h1>
      <div className="player-wrapper">
        {videoUrl ? (
          <ReactPlayer
            className="react-player"
            url={videoUrl}
            width="100%"
            height="100%"
            controls
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
