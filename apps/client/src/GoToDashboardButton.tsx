import { Link } from 'react-router-dom';
import Button from './components/Button';
import { BsArrowRight } from 'react-icons/bs';

export interface GoToDashboardButton {
	isAuthenticated: boolean;
}

function GoToDashboardButton({ isAuthenticated }: GoToDashboardButton) {
	return (
		<Link to={isAuthenticated ? 'dashboard' : 'register'}>
			<Button>
				<div className="flex items-center justify-center gap-2">
					{isAuthenticated ? 'Open dashboard' : 'Get started for free'}
					<BsArrowRight size={20} />
				</div>
			</Button>
		</Link>
	);
}
export default GoToDashboardButton;
