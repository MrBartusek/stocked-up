import { BsArrowRight } from 'react-icons/bs';
import ActionButton from './ActionButton';
import Button from './Button';
import Container from './Container';
import StockedUpLogo from './StockedUpLogo';

function Navbar() {
	return (
		<nav className="border-b border-gray-200 bg-gray-150 p-4">
			<Container className="flex items-center justify-between">
				<StockedUpLogo
					variant="black"
					className="h-16 w-auto"
				/>
				<Button>
					<div className="flex items-center justify-center gap-2">
						Get started for free
						<BsArrowRight size={20} />
					</div>
				</Button>
			</Container>
		</nav>
	);
}
export default Navbar;
