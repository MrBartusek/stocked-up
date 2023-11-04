import Container from '../Container';
import StockedUpLogo from '../StockedUpLogo';
import UserInfo from '../UserInfo';

function DashboardNavbar() {
	return (
		<nav className="border-b-4 border-primary bg-gray-150 p-4">
			<Container className="flex items-center justify-between">
				<StockedUpLogo
					variant="black"
					className="h-11 w-auto"
				/>
				<div className="flex flex-row gap-8">
					<UserInfo />
				</div>
			</Container>
		</nav>
	);
}
export default DashboardNavbar;
