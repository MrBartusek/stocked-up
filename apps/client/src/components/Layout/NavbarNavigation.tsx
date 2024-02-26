import { Link } from 'react-router-dom';

function NavbarNavigation() {
	return (
		<nav className="flex-1">
			<ul className="flex items-center gap-6">
				<li>
					<Link
						to="#features"
						className="link-muted"
					>
						Features
					</Link>
				</li>
				<li>
					<Link
						to="login"
						className="link-muted"
					>
						Login
					</Link>
				</li>
			</ul>
		</nav>
	);
}
export default NavbarNavigation;
