export type Section = "home" | "about" | "skills" | "projects" | "experience" | "fun";

type Props = {
  active: Section;
  onChange: (section: Section) => void;
};

export default function Navigation({ active, onChange }: Props) {
  const sections: Section[] = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "fun",
  ];

  return (
    <nav>
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          aria-pressed={active === s}
        >
          {s}
        </button>
      ))}
    </nav>
  );
}
