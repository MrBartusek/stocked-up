import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';
import StockedUpLogo from '../StockedUpLogo';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function Navbar() {
	const { isAuthenticated, user } = useContext(UserContext);
	return (
		<nav className="border-b border-gray-200 bg-gray-150 p-4">
			<Container className="flex items-center justify-between">
				<StockedUpLogo
					variant="black"
					className="h-16 w-auto"
				/>
				<div className="flex flex-row gap-8">
					{!isAuthenticated ? (
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
					) : (
						<span>{user.email}</span>
					)}

					<Link to={isAuthenticated ? 'dashboard' : 'register'}>
						<Button>
							<div className="flex items-center justify-center gap-2">
								{isAuthenticated ? 'Open dashboard' : 'Get started for free'}
								<BsArrowRight size={20} />
							</div>
						</Button>
					</Link>
				</div>
			</Container>
		</nav>
	);
}
export default Navbar;
