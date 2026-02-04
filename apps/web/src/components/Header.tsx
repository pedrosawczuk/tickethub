import { Calendar, Home, Info } from "lucide-react"
import { Link } from "react-router-dom"
export function Header() {
	return (
		<div>
			<header className="flex bg-orange-500 p-2 text-zinc-100 justify-center gap-3">
				<h1 className="font-bold">TicketHub</h1>|
				<nav className="flex gap-6">
					<Link to="/" className="flex gap-1 hover:">
						<Home className="w-4" />
						<span>Home</span>
					</Link>
					<Link to="/events" className="flex gap-1">
						<Calendar className="w-4" />
						<span>Events</span>
					</Link>
					<Link to="/about" className="flex gap-1">
						<Info className="w-4" />
						<span>About</span>
					</Link>
				</nav>
			</header>
		</div>
	)
}
