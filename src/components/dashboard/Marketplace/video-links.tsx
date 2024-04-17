import React from "react";

interface Video {
  name: string;
  url: string;
}

interface VideoLinksProps {
  title: string;
  videos: Video[];
}

export const VideoLinks: React.FC<VideoLinksProps> = ({ title, videos }) => {
  return (
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <ul className="list-disc pl-5 text-sm space-y-2">
        {videos.map((video, index) => (
          <li key={index}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};