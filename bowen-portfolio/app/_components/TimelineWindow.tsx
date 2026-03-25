/**
 * File: TimelineWindow.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: This file contains the timeline of positions.
 */

import React from 'react';
import Position from './Position';
import meJpg from '../assets/me.jpg';
import bear from '../assets/bear.gif';

import l3h2023 from '../assets/l3h2023.jpg';
import l3h2024 from '../assets/l3h2024.jpg';
import l3h2025 from '../assets/l3h2025.jpg';
import kh1 from "../assets/kh1.jpg";

import amd1 from "../assets/amd1.jpg";
import amd2 from "../assets/amd2.jpg";
import amd3 from "../assets/amd3.jpg";

import ieeesite from "../assets/ieeesite.png";

import khdesign from "../assets/DSC01152.jpeg";


const positions = [
  {
    title: "GPU Intern",
    company: "AMD",
    date: "Jan 2026 - Present",
    location: "Orlando, FL",
    description: "While interning at AMD, I have had the chance to work with something that I genuinely wish to spend the rest of my career involved in. GPUs! Under the DCGPU team in Orlando, FL, I have ported/written around 4 different major kernels into a testbench suite called COMPETEs. Those specific kernels being async load/store, unroll optimization, atomic, and launch latency. I have gotten my hands dirty with advanced C++ metaprogramming, including writing a nested lambda with templates to unroll all combinations of a kernel at compile-time!",
    photos: [amd1.src, amd2.src, amd3.src],
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
    photos: [khdesign.src],
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
    photos: [ieeesite.src],
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
    photos: [kh1.src],
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
    photos: [l3h2024.src],
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
    photos: [l3h2023.src],
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

const DescriptionCard = ({ description, isEven }: { description: string, isEven: boolean }) => {
    const darkGrey = '#e0e0e0';
    const offset = '40px';

    return (
        <div className="description-card convex" style={{
            width: '45%', // Adjusted width
            padding: '1rem',
            backgroundColor: darkGrey,
            borderRadius: '5px',
            position: 'relative',
            minHeight: '100px',
            maxHeight: '600px',
            overflowY: 'auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 2, // Changed z-index
            transform: isEven ? `translateX(${offset})` : `translateX(-${offset})`,
        }}>
            {/* Desktop Arrow */}
            <div className="timeline-arrow timeline-arrow-desktop" style={{
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                ...(isEven ? { right: '-20px', borderLeft: `20px solid ${darkGrey}` } : { left: '-20px', borderRight: `20px solid ${darkGrey}` })
            }}></div>
            {/* Mobile Arrow */}
            <div className="timeline-arrow timeline-arrow-mobile" style={{
                content: '""',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
            }}></div>
            <p>{description}</p>
        </div>
    );
};

const TimelineWindow = () => {
  return (
    <div className="concave" style={{
      padding: '1rem',
      height: '100%',
      overflowY: 'auto',
      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGZpbGw9IiNGQkZBRjAiIC8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0FDQTg5OSIgLz48L3N2Zz4=')",
      backgroundRepeat: 'repeat'
    }}>
      <style>
        {`
            .timeline-arrow-mobile {
                display: none;
            }

            @media (max-width: 768px) {
                .timeline-item {
                    flex-direction: column !important;
                    align-items: center !important;
                }
                .position-card-wrapper {
                    width: 90% !important;
                }
                .description-card {
                    width: 85% !important;
                    margin-top: -20px; /* Pulls description up */
                    transform: none !important; /* Reset transform on mobile */
                    z-index: 2 !important; 
                }
                .timeline-line {
                    left: 50% !important;
                    z-index: 1;
                }
                .timeline-arrow-desktop {
                    display: none;
                }
                .timeline-arrow-mobile {
                    display: block;
                    top: -20px; /* Position arrow at the top */
                    border-bottom: 20px solid #e0e0e0;
                }
            }
        `}
      </style>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Experience</h1>
      <div style={{ position: 'relative', overflowX: 'hidden' }}>
        <div className="timeline-line" style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: '#a0a0a0',
          transform: 'translateX(-50%)',
          zIndex: 1, // Changed z-index
        }}></div>
        {positions.map((position, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className="timeline-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              position: 'relative',
              alignItems: 'center',
              flexDirection: isEven ? 'row' : 'row-reverse',
            }}>
              <div className="position-card-wrapper" style={{ width: '45%', position: 'relative', zIndex: 3 }}>
                <Position {...position} />
              </div>
              <DescriptionCard description={position.description} isEven={!isEven} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineWindow;

