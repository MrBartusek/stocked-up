import { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';
import { UserContext } from '../../context/UserContext';
import StockedUpLogo from '../StockedUpLogo';
import UserInfo from '../UserInfo';
import NavbarNavigation from './NavbarNavigation';

function Navbar() {
	const { isAuthenticated } = useContext(UserContext);
	return (
		<header className="border-b border-gray-200 bg-gray-150 p-4">
			<Container className="flex items-center justify-between">
				<StockedUpLogo
					variant="black"
					className="h-16 w-auto"
				/>
				<div className="flex flex-row items-center gap-8">
					<div>{!isAuthenticated ? <NavbarNavigation /> : <UserInfo />}</div>
					<div className="flex items-center gap-4">
						{!isAuthenticated && (
							<Link to="/register/demo">
								<Button variant="primary-outline">Try demo account</Button>
							</Link>
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
				</div>
			</Container>
		</header>
	);
}
export default Navbar;
