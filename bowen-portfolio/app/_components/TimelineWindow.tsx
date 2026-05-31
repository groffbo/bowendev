/**
 * File: TimelineWindow.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: This file contains the timeline of positions and a tabbed interface.
 */

import React, { useState } from 'react';
import Position from './Position';

export const positions = [
  {
    title: "GPU Intern",
    company: "AMD",
    date: "Jan 2026 - Present",
    location: "Orlando, FL",
    description: "While interning at AMD, I have had the chance to work with something that I genuinely wish to spend the rest of my career involved in. GPUs! Under the DCGPU team in Orlando, FL, I have ported/written around 4 different major kernels into a testbench suite called COMPETEs. Those specific kernels being async load/store, unroll optimization, atomic, and launch latency. I have gotten my hands dirty with advanced C++ metaprogramming, including writing a nested lambda with templates to unroll all combinations of a kernel at compile-time!",
    tags: [
      { name: "C++", starred: true },
      { name: "HIP", starred: false },
      { name: "ROCm", starred: false },
      { name: "GPU Architecture", starred: true },
      { name: "Metaprogramming", starred: false },
      { name: "Design Patterns", starred: false },
      { name: "Kernel Development", starred: true},
    ],
  },
  {
    title: "Design Director",
    company: "Knight Hacks",
    date: "Feb 2026 - Present",
    location: "Orlando, FL",
    description: "I am currently leading a team of 15+ designers with individual expertise in fields such as UI/UX, Figma, graphic design, illustration, animation, etc. Leveraging each of their strengths, our team has shipped 15+ flyers seen by hundreds of students, created club shirt designs, and crafted a club website figma all within the first month of my time as director.",
    tags: [
      { name: "Figma", starred: false },
      { name: "UI/UX", starred: false },
      { name: "Leadership", starred: true },
      { name: "Adobe Fresco", starred: false },
      { name: "Adobe Illustrator", starred: false },
      { name: "Clip Studio Paint", starred: true },
    ],
  },
  {
    title: "Project Lead",
    company: "IEEE UCF",
    date: "Oct 2025 - Present",
    location: "Orlando, FL",
    description: "Leading a team of 5+ students at UCF to create a member dashboard for 300+ IEEE UCF members. Held workshops to teach team members about git, React.js, and web development as a whole. Oversaw 10+ pull requests to a production branch. Website entered in 2026 IEEE Southeast Convention Competition.",
    tags: [
      { name: "Project Management", starred: true },
      { name: "React", starred: false },
      { name: "Node.js", starred: false },
      { name: "System Design", starred: true },
    ],
  },
  {
    title: "Development Team Member",
    company: "Knight Hacks",
    date: "Sep 2025 - Present",
    location: "Orlando, FL",
    description: "Currently contributing to Knight Hacks' monorepo, Forge, alongside a team of 16+ developers. Developed the backend for a judging system used in KHVIII and beyond with 0% downtime and over 100 projects judged. Created a cron job to automatically role assign members a club alumni discord role depending on their graduation date in our database. Engineered a self-hosted form homepage with csv export option and qr code generation per form. ",
    tags: [
      { name: "React", starred: true },
      { name: "Next.js", starred: true },
      { name: "TypeScript", starred: true },
      { name: "Monorepo", starred: false },
      { name: "Discord.js", starred: false },
      { name: "TRPC", starred: false },
      { name: "Drizzle", starred: false },
      { name: "Shadcn", starred: false },
      { name: "Tailwind CSS", starred: false},
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "L3Harris",
    date: "May 2024 - Nov 2025",
    location: "Colorado Springs, CO, Remote",
    description: "In the first part of the year, I overhauled a CLI to a React.js webpage for deep space telescope operators to utilize when generating .FITS files. During the following summer, I developed a kernel driver in C and C++ to send critical avionic messages bidirectionally from fibre channel to ethernet. The kernel driver mapped memory blocks directly to userspace and generated tables to sort messages into. Tables contained information down to bit-widths, and around 27 unique message types were utilized. From these 27, over 800+ message buffers existed inside of these tables.",
    tags: [
      { name: "C++", starred: false },
      { name: "C", starred: true },
      { name: "Kernel Driver", starred: false },
      { name: "Linux", starred: true },
      { name: "Low-level programming", starred: false },
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "L3Harris",
    date: "May 2023 - Aug 2023",
    location: "Melbourne, FL",
    description: "During my first summer at L3Harris, I worked with a team of 4 other interns to create a predictive analysis tool, lovingly called PAT. PAT was trained on an extremely small dataset of <1000 failure modes, with an overall accuracy of ~68%. This was accomplished by using 3 separate ML models to analyze the data in 3 different ways. My particular model was a word frequency model, which took note of any patterns between the amount of times a word showed up in an entry and its final failure mode. Additionally, I created a Jenkins pipeline to retrain the model nightly on any new data in the database.",
    tags: [
        { name: "Python", starred: true },
        { name: "Jenkins", starred: true },
        { name: "Pytorch", starred: false },
        { name: "Pandas", starred: false },
        { name: "Tensorflow", starred: false },
        { name: "Keras", starred: false },
        { name: "Machine Learning", starred: true },
    ],
  },
];

const timelineGroups = [
  {
    label: "2023",
    items: [
      { pos: positions[5], index: 5 } // Summer 2023
    ]
  },
  {
    label: "2024",
    items: [
      { pos: positions[4], index: 4 } // May 2024
    ]
  },
  {
    label: "2025",
    items: [
      { pos: positions[3], index: 3 }, // Sep 2025
      { pos: positions[2], index: 2 }  // Oct 2025
    ]
  },
  {
    label: "2026",
    items: [
      { pos: positions[0], index: 0 }, // Jan 2026
      { pos: positions[1], index: 1 }  // Feb 2026
    ]
  }
];

const getLogoContent = (company: string) => {
  if (company.includes('AMD')) return <img src="https://cdn.simpleicons.org/amd/000000" alt="AMD" style={{ width: '32px', height: '32px' }} />;
  if (company.includes('IEEE')) return <img src="https://cdn.simpleicons.org/ieee/000000" alt="IEEE" style={{ width: '32px', height: '32px' }} />;
  if (company.includes('Knight Hacks')) return <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>KH</span>;
  if (company.includes('L3Harris')) return <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>L3H</span>;
  return <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{company.substring(0, 3).toUpperCase()}</span>;
};

const TimelineNode = ({ item, onClick }: { item: { pos: any, index: number }, onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="timeline-node-container" 
      style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        animation: 'float 3s ease-in-out infinite',
        animationDelay: `${item.index * 0.3}s`
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button 
        onClick={onClick}
        style={{
          width: '60px',
          height: '60px',
          padding: 0,
          border: 'none',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #fff 0%, #c0c0c0 40%, #808080 100%)',
          color: '#000',
          boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8)'
        }}
      >
        {getLogoContent(item.pos.company)}
      </button>
      
      {hovered && (
        <div className="convex" style={{
          position: 'absolute',
          top: '70px',
          backgroundColor: '#ffffe1',
          border: '1px solid #000',
          padding: '4px 8px',
          zIndex: 10,
          width: 'max-content',
          maxWidth: '200px',
          textAlign: 'center',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          color: '#000'
        }}>
          <strong>{item.pos.company}</strong>
          <br />
          <span style={{ fontSize: '0.8rem' }}>{item.pos.title}</span>
        </div>
      )}
    </div>
  );
};

const TimelineWindow = () => {
  const [tabs, setTabs] = useState<{ id: string, title: string }[]>([
    { id: 'overview', title: 'Overview' }
  ]);
  const [activeTab, setActiveTab] = useState('overview');

  const openNode = (index: number) => {
    const pos = positions[index];
    const tabId = `exp-${index}`;
    if (!tabs.find(t => t.id === tabId)) {
      setTabs([...tabs, { id: tabId, title: pos.company }]);
    }
    setActiveTab(tabId);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab('overview');
    }
  };

  return (
    <div style={{
      backgroundColor: '#c0c0c0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '4px'
    }}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .win95-tab {
            padding: 4px 12px;
            background-color: #c0c0c0;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            border-top: 2px solid #dfdfdf;
            border-left: 2px solid #dfdfdf;
            border-right: 2px solid #808080;
            cursor: pointer;
            margin-bottom: -2px;
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
          }
          .win95-tab.active {
            border-bottom: 2px solid #c0c0c0;
            z-index: 2;
            padding-top: 6px;
            margin-top: -2px;
            font-weight: bold;
          }
          .win95-tab.inactive {
            border-bottom: 2px solid #808080;
            z-index: 1;
            margin-top: 2px;
          }
        `}
      </style>

      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '2px', paddingLeft: '4px' }}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`win95-tab ${activeTab === tab.id ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {tab.id !== 'overview' && (
              <button 
                onClick={(e) => closeTab(tab.id, e)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '0',
                  marginLeft: '4px',
                  color: '#000'
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="convex" style={{
        flex: 1,
        borderTop: '2px solid #dfdfdf',
        borderLeft: '2px solid #dfdfdf',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        backgroundColor: '#c0c0c0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTab === 'overview' ? (
          <div className="concave" style={{
            flex: 1,
            margin: '4px',
            overflowX: 'auto',
            overflowY: 'auto',
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IiNGQkZBRjAiIC8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0FDQTg5OSIgLz48L3N2Zz4=')",
            backgroundRepeat: 'repeat',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: 'max-content', padding: '4rem 2rem 2rem 2rem', gap: '8rem', position: 'relative' }}>
              
              {/* Background horizontal connection line */}
              <div style={{
                position: 'absolute',
                left: '2rem',
                right: '2rem',
                top: 'calc(4rem + 30px)', // Centers exactly on the first row of 60px nodes
                height: '4px',
                backgroundColor: '#808080',
                borderTop: '2px solid #dfdfdf',
                borderBottom: '2px solid #dfdfdf',
                zIndex: 0
              }} />

              {timelineGroups.map((group, groupIndex) => (
                <div key={groupIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  
                  {/* Year Label */}
                  <div style={{ position: 'absolute', top: '-3rem', fontWeight: 'bold', fontSize: '1.2rem', color: '#000', whiteSpace: 'nowrap' }}>
                    {group.label}
                  </div>
                  
                  {/* Branching vertical line for overlapping events */}
                  {group.items.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: '30px',
                      bottom: '30px',
                      width: '4px',
                      backgroundColor: '#808080',
                      borderLeft: '2px solid #dfdfdf',
                      borderRight: '2px solid #dfdfdf',
                      transform: 'translateX(-50%)',
                      zIndex: -1
                    }} />
                  )}
                  
                  {/* Group nodes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
                    {group.items.map((item, itemIndex) => (
                      <TimelineNode 
                        key={itemIndex} 
                        item={item} 
                        onClick={() => openNode(item.index)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, margin: '4px', overflowY: 'auto' }}>
            <Position {...positions[parseInt(activeTab.split('-')[1])]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineWindow;
