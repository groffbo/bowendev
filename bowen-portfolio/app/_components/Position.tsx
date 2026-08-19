/**
 * File: Position.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: This file contains a single position in the timeline.
 */

import React from 'react';

interface PositionProps {
  title: string;
  company: string;
  date: string;
  location?: string;
  tags?: { name: string; starred: boolean }[];
  description?: string;
}

const Position: React.FC<PositionProps> = ({ title, company, date, location, tags, description }) => {
  return (
    <div className="convex" style={{
      backgroundColor: '#c0c0c0',
      padding: '0.5rem',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      <div className="concave" style={{ padding: '0.875rem', backgroundColor: '#fff' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#000', wordBreak: 'break-word' }}>{title}</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '2px solid #c0c0c0', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#000' }}>{company}</span>
          <span style={{ fontSize: '0.85rem', color: '#333', backgroundColor: '#f0f0f0', padding: '1px 6px', border: '1px solid #ccc' }}>{date}</span>
        </div>
        
        {location && <p style={{ fontStyle: 'italic', margin: '0 0 0.75rem 0', color: '#666', fontSize: '0.85rem' }}>📍 {location}</p>}
        
        {description && (
          <div style={{ lineHeight: '1.5', color: '#000', fontSize: '0.95rem' }}>
            <p>{description}</p>
          </div>
        )}
      </div>

      {tags && (
        <div className="concave" style={{ padding: '0.75rem', backgroundColor: '#fff', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.25rem', alignSelf: 'center', fontSize: '0.85rem' }}>Skills:</span>
          {tags.map((tag, index) => (
            <div key={index} className="convex" style={{ background: tag.starred ? '#ffffe1' : '#e0e0e0', padding: '0.2rem 0.4rem', fontSize: '0.8rem', border: '1px solid #808080', color: '#000' }}>
              {tag.starred ? `⭐ ${tag.name}` : tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Position;
