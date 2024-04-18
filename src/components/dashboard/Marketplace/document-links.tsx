import React from "react";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  url: string;
}

interface DocumentLinksProps {
  title: string;
  documents: Document[];
}

export const DocumentLinks: React.FC<DocumentLinksProps> = ({
  title,
  documents,
}) => {
  const handleDownload = (url: string, name: string) => {
    if (url.endsWith(".pdf")) {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <ul className="list-disc pl-5 text-sm space-y-2">
        {documents.map((doc, index) => (
          <li key={index}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
            {doc.url.endsWith(".pdf") && (
              <Button
                variant="link"
                className="ml-2"
                onClick={() => handleDownload(doc.url, doc.name)}
              >
                Download
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};