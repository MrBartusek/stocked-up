import { useContext } from 'react';
import GoToDashboardButton from '../../GoToDashboardButton';
import { UserContext } from '../../context/UserContext';
import Container from '../Container';
import StockedUpLogo from '../StockedUpLogo';
import TryDemoButton from '../TryDemoButton';
import UserInfo from '../UserInfo';
import NavbarNavigation from './NavbarNavigation';

function Navbar() {
	const { isAuthenticated } = useContext(UserContext);
	return (
		<header className="border-b border-gray-200 bg-gray-100 p-4">
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
