/**
 * File: Position.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: This file contains a single position in the timeline.
 */

import React, { useState } from 'react';

interface PositionProps {
  title: string;
  company: string;
  date: string;
  location?: string;
  photos?: string[];
  tags?: { name: string; starred: boolean }[];
}

const Position: React.FC<PositionProps> = ({ title, company, date, location, photos, tags }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    if (photos) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (photos) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <div className="convex" style={{
      backgroundColor: '#f0f0f0',
      padding: '1rem',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 3
    }}>
      <style>
        {`
          .image-slider {
            display: flex;
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
      {photos && photos.length > 0 && (
        <div style={{ marginBottom: '1rem', position: 'relative', overflow: 'hidden', borderRadius: '5px' }}>
          <div className="image-slider" style={{ transform: `translateX(-${currentPhotoIndex * 100}%)`}}>
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`${title} photo ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover', flexShrink: 0 }} />
            ))}
          </div>
          {photos.length > 1 && (
            <>
              <button onClick={prevPhoto} className="convex" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'silver', color: 'black', border: 'none', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {'◄'}
              </button>
              <button onClick={nextPhoto} className="convex" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'silver', color: 'black', border: 'none', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {'►'}
              </button>
            </>
          )}
        </div>
      )}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</h2>
      <p style={{ fontStyle: 'italic' }}>{company}</p>
      <p>{date}</p>
      {location && <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>{location}</p>}
      {tags && (
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tags.map((tag, index) => (
            <div key={index} style={{ background: tag.starred ? 'gold' : '#ddd', padding: '0.25rem 0.5rem', borderRadius: '5px', fontSize: '0.8rem' }}>
              {tag.starred ? `⭐ ${tag.name}` : tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Position;

