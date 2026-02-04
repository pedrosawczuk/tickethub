import { Route, Routes } from "react-router-dom"
import { About } from "./pages/About.tsx"
import { Events } from "./pages/Events.tsx"
import { Home } from "./pages/Home.tsx"
export function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/events" element={<Events />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}
