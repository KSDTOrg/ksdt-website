'use client'

import * as THREE from 'three'

interface AlbumProps {
  coverUrl: string;      // Path to album cover image (relative to /public/albums)
  title?: string;        // Album title for accessibility
  artist?: string;       // Artist name
  link?: string;         // Optional link to open when clicked
  position: { x: number; y: number; z: number };
  scale?: number;        // Optional scale factor
}

// Album component now just returns the Three.js mesh, doesn't manage its own scene
export function createAlbumMesh({
  coverUrl,
  position,
  scale = 1
}: AlbumProps): Promise<THREE.Mesh> {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader()
    const fullCoverUrl = `/albums/${coverUrl}`
    
    textureLoader.load(
      fullCoverUrl,
      (texture) => {
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
  })
}

// Simple Album component that just holds metadata
export default function Album({
  coverUrl,
  title,
  artist,
  link,
  position,
  scale = 1
}: AlbumProps) {
  return null // This component doesn't render anything itself
}

export type { AlbumProps }
