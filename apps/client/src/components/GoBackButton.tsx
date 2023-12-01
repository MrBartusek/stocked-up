import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from './IconButton';

export interface GoBackButtonProps {
	to?: string;
}

function GoBackButton({ to = '..' }: GoBackButtonProps) {
	return (
		<Link to={to}>
			<IconButton icon={BsChevronLeft}>Go back</IconButton>
		</Link>
	);
}
export default GoBackButton;
