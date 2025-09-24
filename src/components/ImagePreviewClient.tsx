"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImagePreviewClient() {
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    const urlInput = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
    
    if (!urlInput) return;
    
    const handleInput = () => {
      setImageUrl(urlInput.value);
    };
    
    urlInput.addEventListener('input', handleInput);
    return () => urlInput.removeEventListener('input', handleInput);
  }, []);
  
  if (!imageUrl) return null;
  
  return (
    <div className="mt-2">
      <p className="text-xs text-gray-500 mb-1">Image preview:</p>
      <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt="Recipe preview"
          fill
          className="object-cover"
          onError={(e) => {
            // Show placeholder if image fails to load
            (e.target as HTMLImageElement).src = 
              "https://via.placeholder.com/300?text=Invalid+URL";
          }}
        />
      </div>
    </div>
  );
}