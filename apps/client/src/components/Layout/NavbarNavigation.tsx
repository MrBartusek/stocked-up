import { Link } from 'react-router-dom';

function NavbarNavigation() {
	return (
		<nav className="flex-1">
			<ul className="flex items-center gap-6">
				<li>
					<Link
						to="About"
						className="link-muted"
					>
						About
					</Link>
				</li>
				<li>
					<Link
						to="pricing"
						className="link-muted"
					>
						Pricing
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
