"use client";

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import computerIcon from "../assets/computer.ico";
import github from "../assets/github.ico";
import linkedin from "../assets/linkedin.ico";
import photo from "../assets/me.jpg";
import textFileIcon from "../assets/textfile.ico";

import amd1 from "../assets/amd1.jpg";
import amd2 from "../assets/amd2.jpg";
import amd3 from "../assets/amd3.jpg";
import kh1 from "../assets/kh1.jpg";
import l3h2023 from "../assets/l3h2023.jpg";
import l3h2024 from "../assets/l3h2024.jpg";
import l3h2025 from "../assets/l3h2025.jpg";

const positions = [
  {
    title: "GPU Intern",
    company: "AMD",
    date: "Jan 2026 - Present",
    location: "Orlando, FL",
    description: "While interning at AMD, I have had the chance to work with something that I genuinely wish to spend the rest of my career involved in. GPUs! Under the DCGPU team in Orlando, FL, I have ported/written around 4 different major kernels into a testbench suite called COMPETEs. Those specific kernels being async load/store, unroll optimization, atomic, and launch latency. I have gotten my hands dirty with advanced C++ metaprogramming, including writing a nested lambda with templates to unroll all combinations of a kernel at compile-time!",
    tags: ["C++", "HIP", "ROCm", "GPU Architecture", "Metaprogramming", "Design Patterns", "Kernel Development"],
    photos: [amd1, amd2, amd3]
  },
  {
    title: "Design Director",
    company: "Knight Hacks",
    date: "Feb 2026 - Present",
    location: "Orlando, FL",
    description: "I am currently leading a team of 15+ designers with individual expertise in fields such as UI/UX, Figma, graphic design, illustration, animation, etc. Leveraging each of their strengths, our team has shipped 15+ flyers seen by hundreds of students, created club shirt designs, and crafted a club website figma all within the first month of my time as director.",
    tags: ["Figma", "UI/UX", "Leadership", "Adobe Fresco", "Adobe Illustrator", "Clip Studio Paint"],
    photos: [kh1]
  },
  {
    title: "Project Lead",
    company: "IEEE UCF",
    date: "Oct 2025 - Present",
    location: "Orlando, FL",
    description: "Leading a team of 5+ students at UCF to create a member dashboard for 300+ IEEE UCF members. Held workshops to teach team members about git, React.js, and web development as a whole. Oversaw 10+ pull requests to a production branch. Website entered in 2026 IEEE Southeast Convention Competition.",
    tags: ["Project Management", "React", "Node.js", "System Design"],
    photos: []
  },
  {
    title: "Development Team Member",
    company: "Knight Hacks",
    date: "Sep 2025 - Present",
    location: "Orlando, FL",
    description: "Currently contributing to Knight Hacks' monorepo, Forge, alongside a team of 16+ developers. Developed the backend for a judging system used in KHVIII and beyond with 0% downtime and over 100 projects judged. Created a cron job to automatically role assign members a club alumni discord role depending on their graduation date in our database. Engineered a self-hosted form homepage with csv export option and qr code generation per form. ",
    tags: ["React", "Next.js", "TypeScript", "Monorepo", "Discord.js", "TRPC", "Drizzle", "Shadcn", "Tailwind CSS"],
    photos: []
  },
  {
    title: "Software Engineering Intern",
    company: "L3Harris",
    date: "May 2024 - Nov 2025",
    location: "Colorado Springs, CO, Remote",
    description: "In the first part of the year, I overhauled a CLI to a React.js webpage for deep space telescope operators to utilize when generating .FITS files. During the following summer, I developed a kernel driver in C and C++ to send critical avionic messages bidirectionally from fibre channel to ethernet. The kernel driver mapped memory blocks directly to userspace and generated tables to sort messages into. Tables contained information down to bit-widths, and around 27 unique message types were utilized. From these 27, over 800+ message buffers existed inside of these tables.",
    tags: ["C++", "C", "Kernel Driver", "Linux", "Low-level programming"],
    photos: [l3h2024, l3h2025]
  },
  {
    title: "Software Engineering Intern",
    company: "L3Harris",
    date: "May 2023 - Aug 2023",
    location: "Melbourne, FL",
    description: "During my first summer at L3Harris, I worked with a team of 4 other interns to create a predictive analysis tool, lovingly called PAT. PAT was trained on an extremely small dataset of <1000 failure modes, with an overall accuracy of ~68%. This was accomplished by using 3 separate ML models to analyze the data in 3 different ways. My particular model was a word frequency model, which took note of any patterns between the amount of times a word showed up in an entry and its final failure mode. Additionally, I created a Jenkins pipeline to retrain the model nightly on any new data in the database.",
    tags: ["Python", "Jenkins", "Pytorch", "Pandas", "Tensorflow", "Keras", "Machine Learning"],
    photos: [l3h2023]
  },
];

const projects = [
  { title: "Forge Monorepo", description: "A comprehensive monorepo containing all of Knight Hacks' internal and external applications.", tags: ["Next.js", "TypeScript", "TRPC"], link: "https://github.com/KnightHacks/forge" },
  { title: "Judging System", description: "Robust backend system for Hackathon project judging with 0% downtime.", tags: ["Node.js", "PostgreSQL", "Express"], link: "#" },
  { title: "Member Dashboard", description: "Portal for 300+ IEEE UCF members to track involvement, RSVP to events, and connect.", tags: ["React", "Firebase"], link: "#" },
  { title: "COMPETEs Port", description: "Ported major GPU kernels into an automated AMD testbench suite.", tags: ["C++", "HIP", "ROCm"], link: "#" },
  { title: "Avionics Driver", description: "Linux kernel driver in C mapping fibre channel messages to ethernet.", tags: ["C", "Linux Kernel"], link: "#" },
  { title: "PAT (Predictive Analysis)", description: "Machine learning tool trained on telescope failure modes.", tags: ["Python", "PyTorch", "Pandas"], link: "#" },
];

const ExperienceItem = ({ pos }: { pos: typeof positions[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="win95-panel" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
      <div className="win95-titlebar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'normal' }}>{pos.company} - {pos.title}</span>
      </div>
      <div className="win95-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{pos.company}</h3>
            <div style={{ fontSize: '1.1rem', color: '#333' }}>{pos.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ backgroundColor: '#008080', color: 'white', padding: '2px 8px', display: 'inline-block' }}>{pos.date}</div>
            <div style={{ color: '#666', marginTop: '4px' }}>{pos.location}</div>
          </div>
        </div>

        {pos.photos.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            overflowX: 'auto', 
            paddingBottom: '0.5rem',
            border: '2px solid #808080',
            borderRightColor: '#fff',
            borderBottomColor: '#fff',
            backgroundColor: '#c0c0c0',
            padding: '4px'
          }}>
            {pos.photos.map((photo, i) => (
              <div key={i} style={{ flexShrink: 0, border: '2px solid #fff', borderRightColor: '#808080', borderBottomColor: '#808080', height: '300px' }}>
                <Image src={photo} alt={`${pos.company} photo ${i + 1}`} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        )}

        <div>
          <button 
            className="win95-btn" 
            onClick={() => setExpanded(!expanded)}
            style={{ marginBottom: '0.5rem', fontSize: '0.9rem', padding: '4px 8px' }}
          >
            {expanded ? "Collapse Details [-]" : "Expand Details [+]"}
          </button>
          
          {expanded && (
            <p style={{ lineHeight: '1.6', color: '#000', backgroundColor: '#fff', padding: '1rem', border: '1px solid #808080', borderRightColor: '#fff', borderBottomColor: '#fff' }}>
              {pos.description}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {pos.tags.map((tag, tIndex) => (
            <span key={tIndex} style={{ 
              backgroundColor: '#008080', 
              color: 'white', 
              padding: '4px 8px', 
              fontSize: '0.85rem',
              borderTop: '1px solid #fff',
              borderLeft: '1px solid #fff',
              borderRight: '1px solid #000',
              borderBottom: '1px solid #000',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModernPortfolio = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'projects'>('about');

  return (
    <div style={{ 
      fontFamily: 'var(--font-windows95), Tahoma, sans-serif', 
      backgroundColor: '#008080', 
      height: '100vh', 
      width: '100vw',
      overflowX: 'hidden',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      color: '#000'
    }}>
      <style>
        {`
          .win95-panel {
            background-color: #c0c0c0;
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
            box-shadow: inset -1px -1px #808080, inset 1px 1px #dfdfdf;
            padding: 2px;
          }
          
          .win95-titlebar {
            background-color: navy;
            color: white;
            padding: 2px 4px;
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .win95-content {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IiNGQkZBRjAiIC8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0FDQTg5OSIgLz48L3N2Zz4=');
            background-repeat: repeat;
            border-top: 2px solid #808080;
            border-left: 2px solid #808080;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            margin-top: 2px;
          }

          .win95-btn {
            background-color: #c0c0c0;
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
            box-shadow: inset -1px -1px #808080, inset 1px 1px #dfdfdf;
            padding: 4px 10px;
            font-family: inherit;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            color: black;
          }
          
          .win95-btn:active, .win95-btn.active {
            border-top: 2px solid #000;
            border-left: 2px solid #000;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            box-shadow: inset 1px 1px #808080, inset -1px -1px #dfdfdf;
            padding: 5px 9px 3px 11px;
          }
          
          .win95-btn.active {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IiNGQkZBRjAiIC8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0FDQTg5OSIgLz48L3N2Zz4=');
          }

          .modern-header {
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            background-color: #c0c0c0;
            border-bottom: 2px solid #000;
            border-top: 2px solid #fff;
            box-shadow: inset 0 -1px #808080;
          }

          @media (max-width: 768px) {
            .modern-header {
              flex-direction: column;
              gap: 0.5rem;
            }
          }
        `}
      </style>

      {/* Header Navigation */}
      <div className="modern-header">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className={`win95-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
          <button className={`win95-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
          <button className={`win95-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href="https://github.com/groffbo" target="_blank" className="win95-btn" style={{ padding: '4px' }}>
            <Image src={github} alt="GitHub" width={20} height={20} />
          </a>
          <a href="https://www.linkedin.com/in/bowengroff/" target="_blank" className="win95-btn" style={{ padding: '4px' }}>
            <Image src={linkedin} alt="LinkedIn" width={20} height={20} />
          </a>
          <a href="/bowen-groff-resume.pdf" target="_blank" className="win95-btn" style={{ padding: '4px' }}>
            <Image src={textFileIcon} alt="Resume" width={20} height={20} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        
        {activeTab === 'about' && (
          <div className="win95-panel">
            <div className="win95-titlebar">
              <span style={{ fontWeight: 'normal' }}>Welcome.exe</span>
              <button className="win95-btn" style={{ padding: '0', width: '16px', height: '16px', minHeight: '16px', fontWeight: 'bold' }}>X</button>
            </div>
            <div className="win95-content" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', padding: '1.5rem' }}>
              <div style={{ 
                borderTop: '2px solid #808080', 
                borderLeft: '2px solid #808080', 
                borderRight: '2px solid #fff', 
                borderBottom: '2px solid #fff', 
                padding: '4px',
                backgroundColor: '#000',
                display: 'flex'
              }}>
                <Image src={photo} alt="Bowen Groff" width={220} height={220} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <pre style={{ 
                  fontFamily: 'monospace', 
                  fontSize: 'clamp(0.6rem, 1.2vw, 1rem)', 
                  color: '#000',
                  marginBottom: '1rem',
                  lineHeight: '1.2'
                }}>
{`██████╗  ██████╗ ██╗    ██╗███████╗███╗   ██╗
██╔══██╗██╔═══██╗██║    ██║██╔════╝████╗  ██║
██████╔╝██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║
██╔══██╗██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║
██████╔╝╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║
╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝`}
                </pre>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'normal' }}>Bowen Groff</h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#000' }}>
                  Software Engineer & GPU Intern. I build fast, robust systems from deep space telemetry to compiled kernel metaprogramming. Let's make things go vroom.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="/bowen-groff-resume.pdf" target="_blank" className="win95-btn">
                    <Image src={textFileIcon} alt="Resume" width={20} height={20} />
                    Resume.pdf
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            {positions.map((pos, idx) => (
              <ExperienceItem key={idx} pos={pos} />
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="win95-panel">
            <div className="win95-titlebar">
              <span style={{ fontWeight: 'normal' }}>Projects.exe</span>
              <button className="win95-btn" style={{ padding: '0', width: '16px', height: '16px', minHeight: '16px', fontWeight: 'bold' }}>X</button>
            </div>
            <div className="win95-content" style={{ padding: '1.5rem' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {projects.map((proj, index) => (
                  <div key={index} className="win95-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="win95-titlebar" style={{ backgroundColor: '#808080' }}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'normal' }}>{proj.title}</span>
                    </div>
                    <div className="win95-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                      <p style={{ flex: 1, marginBottom: '1rem', lineHeight: '1.5' }}>{proj.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {proj.tags.map((tag, tIndex) => (
                          <span key={tIndex} style={{ 
                            backgroundColor: '#c0c0c0', 
                            borderTop: '1px solid #fff',
                            borderLeft: '1px solid #fff',
                            borderRight: '1px solid #808080',
                            borderBottom: '1px solid #808080',
                            padding: '2px 6px',
                            fontSize: '0.8rem'
                          }}>{tag}</span>
                        ))}
                      </div>
                      <a href={proj.link} target="_blank" className="win95-btn" style={{ justifyContent: 'center' }}>
                        View Project
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ModernPortfolio;