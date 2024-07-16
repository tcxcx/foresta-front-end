import React from "react";

interface Video {
  name: string;
  url: string;
}

interface VideoLinksProps {
  title: string;
  videos: Video[];
  onVideoClick: (videoUrl: string) => void;
}

export const VideoLinks: React.FC<VideoLinksProps> = ({ title, videos, onVideoClick }) => {
  const handleVideoClick = (videoUrl: string) => {
    onVideoClick(videoUrl);
  };

  return (
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <ul className="list-disc pl-5 text-sm space-y-2">
        {videos.map((video, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleVideoClick(video.url);
              }}
            >
              {video.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};