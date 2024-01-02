import { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';
import { UserContext } from '../../context/UserContext';
import StockedUpLogo from '../StockedUpLogo';
import UserInfo from '../UserInfo';
import NavbarNavigation from './NavbarNavigation';
import GoToDashboardButton from '../../GoToDashboardButton';
import TryDemoButton from '../TryDemoButton';

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
					{!isAuthenticated ? <NavbarNavigation /> : <UserInfo />}
					<div className="flex items-center gap-4">
						{!isAuthenticated && <TryDemoButton />}
						<GoToDashboardButton isAuthenticated={isAuthenticated} />
					</div>
				</div>
			</Container>
		</header>
	);
}
export default Navbar;
