"use client";

import React, { useEffect, useRef, useState } from 'react';
import Position from './Position';
import { positions as portfolioPositions } from './portfolio-data';

export const positions = portfolioPositions.map(position => ({
  ...position,
  tags: position.tags.map(name => ({ name, starred: ['C++20', 'GPU Architecture', 'Kernel Development', 'Leadership', 'Clip Studio Paint', 'Project Management', 'System Design', 'React', 'Next.js', 'TypeScript', 'C', 'Linux', 'Python', 'Jenkins', 'Machine Learning'].includes(name) })),
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthIndex = (date: string) => {
  const [month, year] = date.split(' ');
  return Number(year) * 12 + months.indexOf(month);
};
const firstMonth = Math.floor(Math.min(...positions.map(pos => monthIndex(pos.date.split(' - ')[0]))) / 12) * 12;
const lastStart = Math.max(...positions.map(pos => monthIndex(pos.date.split(' - ')[0])));
const companyLabel = (company: string) => company.startsWith('UCF Department') ? 'UCF · iCAT Lab' : company;
const barColor = (company: string) => company.startsWith('UCF') ? '#663399' : company === 'AMD' ? '#94351e' : company.includes('Knight') ? '#000080' : company.includes('IEEE') ? '#00665f' : '#405577';

export default function TimelineWindow() {
  const [activePosition, setActivePosition] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(lastStart);
  const monthWidth = 44;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const now = new Date();
    const month = Math.max(lastStart, now.getFullYear() * 12 + now.getMonth());
    setCurrentMonth(month);
    if (scroller.current) scroller.current.scrollLeft = (Math.floor(month / 12) * 12 - firstMonth) * 44;
  }, []);

  const finalMonth = Math.floor(currentMonth / 12) * 12 + 11;
  const monthCount = finalMonth - firstMonth + 1;
  const years = Array.from({ length: monthCount / 12 }, (_, i) => firstMonth / 12 + i);
  const groups = Array.from(new Set(positions.map(pos => pos.company))).map(company => ({
    company,
    roles: positions.map((pos, index) => ({ pos, index })).filter(item => item.pos.company === company)
      .sort((a, b) => monthIndex(a.pos.date.split(' - ')[0]) - monthIndex(b.pos.date.split(' - ')[0])),
  })).sort((a, b) => Math.max(...b.roles.map(item => monthIndex(item.pos.date.split(' - ')[0]))) - Math.max(...a.roles.map(item => monthIndex(item.pos.date.split(' - ')[0]))));
  const jumpTo = (month: number) => scroller.current?.scrollTo({ left: (month - firstMonth) * monthWidth, behavior: 'smooth' });

  return (
    <div className="experience-timeline">
      <style>{`
        .experience-timeline { height:100%; min-height:0; display:flex; flex-direction:column; color:#000; background:#c0c0c0; padding:4px; }
        .experience-timeline button { font-family:inherit; cursor:pointer; }
        .experience-timeline button:focus-visible, .experience-chart:focus-visible { outline:3px solid #d17300; outline-offset:-3px; }
        .timeline-toolbar { display:flex; flex-wrap:wrap; align-items:center; gap:6px; padding:8px; flex-shrink:0; }
        .timeline-toolbar button { padding:4px 10px; color:#000; font-size:0.875rem; background:#c0c0c0; }
        .timeline-hint { margin:0; padding:0 8px 8px; font-size:0.875rem; color:#333; }
        .experience-chart { --label-width:210px; overflow:auto; flex:1; min-height:0; border:2px inset #eee; background:#fff; position:relative; }
        .chart-content { width:calc(var(--label-width) + var(--chart-width)); min-height:100%; }
        .chart-header { display:flex; position:sticky; top:0; z-index:5; height:64px; background:#c0c0c0; }
        .chart-corner { position:sticky; left:0; z-index:6; width:var(--label-width); flex-shrink:0; display:flex; align-items:center; padding:12px; background:#c0c0c0; border-right:2px solid #666; border-bottom:2px solid #666; font-size:1rem; }
        .chart-years { display:flex; }
        .chart-year { box-shadow:inset 2px 0 #666; box-sizing:border-box; }
        .chart-year strong { display:block; height:32px; padding:4px 8px; color:#fff; background:#000080; font-size:1rem; }
        .chart-year:nth-child(even) strong { background:#005b5b; }
        .chart-months { display:flex; height:32px; }
        .chart-months span { flex-shrink:0; text-align:center; padding-top:5px; font-size:0.875rem; border-right:1px solid #aaa; }
        .chart-row { display:flex; min-height:78px; }
        .chart-group { display:flex; height:30px; background:#ddd; border-top:2px solid #808080; }
        .chart-group strong { position:sticky; left:0; width:var(--label-width); padding:4px 10px; background:#ddd; font-size:0.875rem; border-right:2px solid #666; }
        .chart-label { position:sticky; left:0; z-index:3; flex-shrink:0; width:var(--label-width); padding:10px; background:#eee; color:#000; border:0; border-bottom:1px solid #aaa; border-right:2px solid #666; text-align:left; display:flex; flex-direction:column; gap:4px; }
        .chart-label strong { font-size:0.875rem; color:#000080; }
        .chart-label span { font-size:0.875rem; line-height:1.3; }
        .chart-label small { font-size:0.75rem; color:#444; }
        .chart-label:hover { background:#ffffe1; }
        .chart-track { position:relative; flex-shrink:0; border-bottom:1px solid #ccc; background-color:#fafaf3; background-image:linear-gradient(to right,#808080 2px,transparent 2px),linear-gradient(to right,#ddd 1px,transparent 1px); background-size:calc(var(--month-width) * 12) 100%,var(--month-width) 100%; }
        .chart-row:nth-child(even) .chart-track { background-color:#f0f0e8; }
        .experience-bar { position:absolute; top:17px; height:44px; border:2px outset #ddd; color:#fff; text-align:left; padding:6px; white-space:nowrap; overflow:hidden; font-size:0.875rem; }
        .experience-bar:hover { filter:brightness(1.2); box-shadow:0 0 0 2px #000; z-index:2; }
        .experience-bar span { position:sticky; left:calc(var(--label-width) + 8px); }
        .current-month-line { position:absolute; top:0; bottom:0; border-left:2px dashed #b34700; pointer-events:none; z-index:1; }
        .timeline-details { flex:1; min-height:0; display:flex; flex-direction:column; }
        @media(max-width:600px) { .experience-chart { --label-width:155px; } .chart-label { padding:8px; } .chart-row { min-height:90px; } .experience-bar { top:23px; } }
      `}</style>
      <div style={{ display: activePosition === null ? 'flex' : 'none', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <nav className="timeline-toolbar" aria-label="Timeline navigation">
          <strong style={{ fontSize: '0.875rem' }}>Jump to</strong>
          {years.map(year => <button key={year} className="convex" onClick={() => jumpTo(year * 12)}>{year}</button>)}
          <button className="convex" onClick={() => jumpTo(currentMonth - 3)}>Present</button>

        </nav>
        <p className="timeline-hint">Select a role for details · Dashed line: current month</p>
        <div className="experience-chart" ref={scroller} tabIndex={0} role="region" aria-label="Experience timeline by month. Each row is a role; aligned bars show overlapping work.">
          <div className="chart-content" style={{ '--chart-width': `${monthCount * monthWidth}px`, '--month-width': `${monthWidth}px` } as React.CSSProperties}>
            <div className="chart-header">
              <div className="chart-corner">Experience</div>
              <div className="chart-years">
                {years.map(year => <div key={year} className="chart-year" style={{ width: monthWidth * 12 }}>
                  <strong>{year}</strong>
                  <div className="chart-months">{months.map(month => <span key={month} style={{ width: monthWidth }}>{month}</span>)}</div>
                </div>)}
              </div>
            </div>
            {groups.map(group => <React.Fragment key={group.company}>
              <div className="chart-group"><strong>{companyLabel(group.company)}</strong></div>
              {group.roles.map(({ pos, index }) => {
              const [start, end] = pos.date.split(' - ');
              const startMonth = monthIndex(start);
              const ongoing = end === 'Present';
              const endMonth = ongoing ? currentMonth : monthIndex(end);
              const label = `${pos.title} at ${pos.company}, ${pos.date}. View full experience`;
              return <div className="chart-row" key={index}>
                <button className="chart-label" onClick={() => setActivePosition(index)} aria-label={label}>
                  <span>{pos.title}</span>
                  <small>{pos.date}</small>
                </button>
                <div className="chart-track" style={{ width: monthCount * monthWidth }}>
                  <div className="current-month-line" style={{ left: (currentMonth - firstMonth) * monthWidth }} />
                  <button className="experience-bar" title={label} aria-label={label} onClick={() => setActivePosition(index)} style={{ left: (startMonth - firstMonth) * monthWidth, width: (endMonth - startMonth + 1) * monthWidth, backgroundColor: barColor(pos.company), borderRightStyle: ongoing ? 'dashed' : 'outset' }}>
                    <span>{pos.title === "Development Team Member" ? "Developer" : pos.title}{ongoing ? ' →' : ''}</span>
                  </button>
                </div>
              </div>;
              })}
            </React.Fragment>)}
          </div>
        </div>
      </div>
      {activePosition !== null && <div className="timeline-details">
        <div className="timeline-toolbar"><button className="convex" onClick={() => setActivePosition(null)}>◀ Back to timeline</button></div>
        <div style={{ flex: 1, minHeight: 0 }}><Position {...positions[activePosition]} /></div>
      </div>}
    </div>
  );
}
