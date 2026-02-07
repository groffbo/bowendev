export type Project = {
    id: string;
    title: string;
    description: string;
    tech: string[];
    link?: string;
};

export const projects: Project[] = [
    {
        id: "yo mama",
        title: "titel of yo mama",
        description: "desc of yo mama",
        tech: ["bla", "bla", "blaaa"],
        link: "https://yomama.org",
    },
];