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
      padding: '1rem',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div className="concave" style={{ padding: '1.5rem', backgroundColor: '#fff' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#000' }}>{title}</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #c0c0c0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#000' }}>{company}</span>
          <span style={{ fontSize: '1.1rem', color: '#333' }}>{date}</span>
        </div>
        
        {location && <p style={{ fontStyle: 'italic', margin: '0 0 1rem 0', color: '#666' }}>{location}</p>}
        
        {description && (
          <div style={{ lineHeight: '1.6', color: '#000', fontSize: '1.05rem' }}>
            <p>{description}</p>
          </div>
        )}
      </div>

      {tags && (
        <div className="concave" style={{ padding: '1rem', backgroundColor: '#fff', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.5rem', alignSelf: 'center' }}>Skills:</span>
          {tags.map((tag, index) => (
            <div key={index} className="convex" style={{ background: tag.starred ? '#ffffe1' : '#e0e0e0', padding: '0.25rem 0.5rem', fontSize: '0.9rem', border: '1px solid #808080', color: '#000' }}>
              {tag.starred ? `⭐ ${tag.name}` : tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Position;
