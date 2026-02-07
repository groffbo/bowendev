import { projects } from "../data/projects";

export default function Projects() {
    return (
        <section>
            <h2>Projects</h2>
            <ul>
                {projects.map((p) => (
                    <li key={p.id}>
                        <h3>{p.title}</h3>
                    </li>
                ))}
            </ul>
        </section>
    )
}