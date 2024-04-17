import React from "react";

interface Document {
  name: string;
  url: string;
}

interface DocumentLinksProps {
  title: string;
  documents: Document[];
}

export const DocumentLinks: React.FC<DocumentLinksProps> = ({ title, documents }) => {
  return (
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <ul className="list-disc pl-5 text-sm space-y-2">
        {documents.map((doc, index) => (
          <li key={index}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};