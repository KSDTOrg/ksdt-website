'use client'

import * as THREE from 'three'

interface AlbumProps {
  coverUrl?: string;     // Path to album cover image (relative to /public/albums) - optional if using Spotify
  title?: string;        // Album title for accessibility
  artist?: string;       // Artist name
  link?: string;         // Optional link to open when clicked
  position: { x: number; y: number; z: number };
  scale?: number;        // Optional scale factor
  spotifyData?: {        // NEW: Spotify data option
    artist: string;
    album: string;
  };
}

// NEW: Spotify API functions
async function getSpotifyToken(): Promise<string> {
  const response = await fetch('/api/spotify/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get Spotify token');
  }
  
  const data = await response.json();
  return data.access_token;
}

async function searchSpotifyAlbum(artist: string, album: string, token: string): Promise<{
  coverUrl: string;
  spotifyUrl: string;
} | null> {
  const query = encodeURIComponent(`artist:${artist} album:${album}`);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to search Spotify');
  }
  
  const data = await response.json();
  
  if (data.albums.items.length > 0) {
    const album = data.albums.items[0];
    return {
      coverUrl: album.images[0]?.url || '',
      spotifyUrl: album.external_urls.spotify,
    };
  }
  
  return null;
}

// Album component now just returns the Three.js mesh, doesn't manage its own scene
export function createAlbumMesh({
  coverUrl,
  position,
  scale = 1,
  spotifyData
}: AlbumProps): Promise<THREE.Mesh> {
  return new Promise(async (resolve, reject) => {
    try {
      let finalCoverUrl = coverUrl;
      
      // If Spotify data is provided, fetch from Spotify API
      if (spotifyData && !coverUrl) {
        try {
          const token = await getSpotifyToken();
          const spotifyResult = await searchSpotifyAlbum(
            spotifyData.artist, 
            spotifyData.album, 
            token
          );
          
          if (spotifyResult) {
            finalCoverUrl = spotifyResult.coverUrl;
          } else {
            // Fallback to local placeholder if Spotify search fails
            finalCoverUrl = 'conradave.png'; // Use existing image as fallback
          }
        } catch (error) {
          console.warn('Spotify API failed, using fallback:', error);
          finalCoverUrl = 'conradave.png'; // Use existing image as fallback
        }
      }
      
      // Default fallback if no cover URL provided
      if (!finalCoverUrl) {
        finalCoverUrl = 'conradave.png';
      }
      
      const textureLoader = new THREE.TextureLoader();
      
      // Handle both local files and external URLs
      const textureUrl = finalCoverUrl?.startsWith('http') 
        ? finalCoverUrl 
        : `/albums/${finalCoverUrl}`;
    
    textureLoader.load(
      textureUrl,
      (texture) => {
        // OPTIMIZATION 4: Texture optimizations
        texture.generateMipmaps = false
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        
        // Create album geometry
        const albumWidth = 1.8 * scale
        const albumHeight = 1.8 * scale
        const albumDepth = 0.05 * scale
        
        const geometry = new THREE.BoxGeometry(albumWidth, albumHeight, albumDepth)
        
        // Create materials for each side of the album
        const materials = [
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Right side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Left side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Top
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Bottom
          new THREE.MeshStandardMaterial({ map: texture }), // Front (album cover)
          new THREE.MeshStandardMaterial({ color: 0x222222 }) // Back
        ]
        
        // Create album mesh
        const album = new THREE.Mesh(geometry, materials)
        album.position.set(position.x, position.y, position.z)
        
        resolve(album)
      },
      undefined,
      (error) => {
        console.error('Error loading album cover:', error)
        reject(error)
      }
    )
    } catch (error) {
      reject(error)
    }
  })
}

// Simple Album component that just holds metadata
export default function Album({
  coverUrl,
  title,
  artist,
  link,
  position,
  scale = 1,
  spotifyData
}: AlbumProps) {
  return null // This component doesn't render anything itself
}

export type { AlbumProps }
