import { useContext, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { BsList } from 'react-icons/bs';
import GoToDashboardButton from '../../GoToDashboardButton';
import { UserContext } from '../../context/UserContext';
import ActionButton from '../ActionButton';
import Container from '../Container';
import StockedUpLogo from '../StockedUpLogo';
import TryDemoButton from '../TryDemoButton';
import UserInfo from '../UserInfo';
import NavbarNavigation from './NavbarNavigation';

function Navbar() {
	const { isAuthenticated } = useContext(UserContext);

	const [showHamburger, setShowHamburger] = useState(false);

	return (
		<header className="border-b border-gray-200 bg-gray-100 p-4">
			<Container className="flex items-center justify-between">
				<StockedUpLogo
					variant="black"
					className="h-12 w-auto lg:h-16"
				/>
				<div className="hidden flex-row items-center gap-8 lg:flex">
					{!isAuthenticated ? <NavbarNavigation /> : <UserInfo />}
					<div className="flex items-center gap-4">
						{!isAuthenticated && <TryDemoButton />}
						<GoToDashboardButton isAuthenticated={isAuthenticated} />
					</div>
				</div>
				<ActionButton
					icon={BsList}
					onClick={() => setShowHamburger((show) => !show)}
					className="border border-gray-300 text-2xl text-muted lg:hidden"
				/>
			</Container>
			<Container className="lg:hidden">
				<AnimateHeight
					duration={200}
					height={showHamburger ? 'auto' : 0}
				>
					<NavbarNavigation
						orientation="col"
						className="px-3 py-4"
						extendedOptions
					/>
				</AnimateHeight>
			</Container>
		</header>
	);
}
export default Navbar;
