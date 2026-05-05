'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { getAllVideos } from '@/services/videoService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function VideoFeed() {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: getAllVideos,        // ← your existing function, just needs updating (next step)
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });

  // When sentinel div enters viewport, load next page
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 animate-pulse">Loading videos...</p>
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">Failed to load videos. Is your backend running?</p>
    </div>
  );

  // Flatten all pages into one array
  const allVideos = data.pages.flatMap(page => page.videos);

  if (allVideos.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500">No videos yet. Be the first to upload!</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      {allVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}

      {/* Invisible sentinel — triggers next page when scrolled into view */}
      <div ref={targetRef} style={{ height: '1px' }} />

      {isFetchingNextPage && (
        <div className="flex justify-center items-center h-16">
          <p className="text-gray-500 animate-pulse">Loading more...</p>
        </div>
      )}

      {!hasNextPage && allVideos.length > 0 && (
        <div className="flex justify-center items-center h-16">
          <p className="text-gray-500">You've seen all videos!</p>
        </div>
      )}
    </div>
  );
}