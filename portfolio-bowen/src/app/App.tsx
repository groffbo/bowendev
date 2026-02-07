import { useState } from "react";
import type { Section } from "./Navigation"
import Navigation from "./Navigation";
import Projects from "../components/Projects"
import FunSquare from "../scenes/base_scene"

export default function App() {
	const [activeSection, setActiveSection] = useState<Section>("home");

	return (
		<>
			<Navigation active={activeSection} onChange={setActiveSection}/>
      		{activeSection === "projects" && <Projects />}
			{activeSection === "fun" && <FunSquare></FunSquare>}
		
		</>
	);
}

