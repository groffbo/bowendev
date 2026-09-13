import amd1 from "../assets/amd1.jpg";
import amd2 from "../assets/amd2.jpg";
import amd3 from "../assets/amd3.jpg";
import kh1 from "../assets/kh1.jpg";
import l3h2023 from "../assets/l3h2023.jpg";
import l3h2024 from "../assets/l3h2024.jpg";
import l3h2025 from "../assets/l3h2025.jpg";

export const positions = [
  {
    title: "AMD Undergrad Research Fellow",
    summary: "Incoming in UCF's iCAT lab to optimize GPU kernels and GPU-CPU systems for agentic AI and HPC workloads.",
    company: "UCF Department of Electrical and Computer Engineering",
    date: "Sep 2026 - Present",
    location: "Orlando, FL",
    description: "Incoming in UCF's iCAT lab to optimize GPU kernels and GPU-CPU systems for agentic AI and HPC workloads.",
    tags: ["GPU Kernels", "GPU-CPU Systems", "Agentic AI", "HPC"],
    photos: []
  },
  {
    title: "GPU Software Engineer Intern",
    summary: "Ported 10+ HIP kernels into ROCm testbenches for AMD Instinct GPUs. C++20 optimizations improved performance by up to 73% in targeted cases.",
    company: "AMD",
    date: "Jan 2026 - May 2026",
    location: "Orlando, FL",
    description: "At AMD, I ported 10+ HIP-based GPU kernels into the COMPETEs testbench suite within the ROCm stack for AMD Instinct GPUs. I implemented and benchmarked async load/store, atomic, launch latency, and throughput-unrolling tests, using C++20 compile-time optimization and templated lambdas to improve performance by up to 73% in targeted cases. I also implemented concurrent kernel execution across streams, achieving n-fold performance increases depending on stream count, and maintained HPC server infrastructure, including hardware replacement and NVIDIA H100 validation.",
    tags: ["C++20", "HIP", "ROCm", "GPU Architecture", "Metaprogramming", "Design Patterns", "Kernel Development"],
    photos: [amd1, amd2, amd3]
  },
  {
    title: "Design Director",
    summary: "Leading 18 designers and developing the KHIX brand, artwork, and 15+ merchandise designs. First-week applicants increased 3x over the previous year.",
    company: "Knight Hacks",
    date: "Feb 2026 - Present",
    location: "Orlando, FL",
    description: "I lead 18 designers across UI/UX, illustration, and graphic design, delegating work and providing creative direction. I developed the KHIX visual identity, including the brand system, logo, hero artwork, and 15+ merchandise designs, driving a 3x increase in first-week applicants compared with the previous year. Our team has delivered dozens of illustrations and graphics for social media, general body meetings, campaigns, and events, reaching 5,000+ Discord members and 3,000+ Instagram followers. Earlier work included 15+ flyers, club shirt designs, and the club website design in Figma.",
    tags: ["Figma", "UI/UX", "Leadership", "Adobe Fresco", "Adobe Illustrator", "Clip Studio Paint"],
    photos: [kh1]
  },
  {
    title: "Project Lead",
    summary: "Led 5+ students building a dashboard for 300+ IEEE UCF members, teaching web development workshops, and overseeing 10+ production pull requests.",
    company: "IEEE UCF",
    date: "Oct 2025 - May 2026",
    location: "Orlando, FL",
    description: "Led a team of 5+ students at UCF to create a member dashboard for 300+ IEEE UCF members. Held workshops to teach team members about git, React.js, and web development as a whole. Oversaw 10+ pull requests to a production branch. Website entered in 2026 IEEE Southeast Convention Competition.",
    tags: ["Project Management", "React", "Node.js", "System Design"],
    photos: []
  },
  {
    title: "Development Team Member",
    summary: "Built judging infrastructure for a roughly 1,000-participant hackathon with zero runtime failures and automated alumni roles to cut manual overhead by about 99%.",
    company: "Knight Hacks",
    date: "Sep 2025 - Jan 2026",
    location: "Orlando, FL",
    description: "I contributed to Knight Hacks' Forge monorepo alongside 16+ developers. I designed and deployed a Node.js judging backend with tRPC and Zod validation, dynamically assigning judges to rooms at a roughly 1,000-participant hackathon with zero runtime failures and over 100 projects judged. I built a cron-based PostgreSQL and Discord API role synchronization pipeline that reduced manual alumni role management by approximately 99% while enforcing consistent permissions. I also engineered a self-hosted form homepage with CSV export and per-form QR code generation.",
    tags: ["React", "Next.js", "TypeScript", "Monorepo", "Discord.js", "TRPC", "Drizzle", "Shadcn", "Tailwind CSS"],
    photos: []
  },
  {
    title: "Hackathon Organizer",
    summary: "Hackathon Organizer at Knight Hacks, between development and design leadership roles.",
    company: "Knight Hacks",
    date: "Jan 2026 - Feb 2026",
    location: "Orlando, FL",
    description: "Served as a Hackathon Organizer at Knight Hacks from January to February 2026, following my development team role and before becoming Design Director.",
    tags: ["Hackathon Organization"],
    photos: []
  },
  {
    title: "Software Engineer Intern",
    company: "L3Harris Technologies",
    date: "May 2024 - Nov 2025",
    summary: "Built a Linux kernel driver for FPGA message transport, handling over 810 concurrent buffers across 8 tables, plus device-tree memory mapping and interrupt delivery.",
    location: "Palm Bay, FL",
    description: "I developed a platform Linux kernel driver in C for bidirectional Ethernet and Fibre Channel message transport between an FPGA and userspace over UDP, handling over 810 concurrent message buffers across 8 tables and approximately 27 unique message types. I mapped reserved memory blocks in a custom device tree with a C++ application for low-latency message handling, received FPGA interrupts, and wrote custom ioctl macros to post interrupt details directly to userspace. Earlier in this role, I converted a CLI into a React webpage for deep space telescope operators generating .FITS files.",
    tags: ["C++", "C", "Kernel Driver", "Linux", "Low-level programming"],
    photos: [l3h2024, l3h2025]
  },
  {
    title: "Software Engineer Intern",
    company: "L3Harris Technologies",
    date: "May 2023 - Aug 2023",
    summary: "Trained three predictive models and earned the L3Harris RISE Award for F-35 ICP diagnostics about 99.5% faster, with estimated operational savings of $4M.",
    location: "Palm Bay, FL",
    description: "Working with four other interns, I designed and trained three predictive neural network models, including multi-layer perceptrons, using PyTorch and TensorFlow for the Predictive Analysis Tool (PAT). Word-frequency features from fewer than 1,000 samples achieved approximately 68% prediction accuracy. I also created a Jenkins pipeline to retrain the model nightly on new data. After presenting to key stakeholders, I received the L3Harris RISE Award for enabling F-35 ICP failure mode diagnosis approximately 99.5% faster, resulting in an estimated $4M in operational savings and thousands of engineering hours saved overall.",
    tags: ["Python", "Jenkins", "Pytorch", "Pandas", "Tensorflow", "Keras", "Machine Learning"],
    photos: [l3h2023]
  },
];
