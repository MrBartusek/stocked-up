import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from './IconButton';

export interface GoBackButtonProps {
	to?: string;
	replace?: boolean;
}

function GoBackButton({ to = '..', replace = false }: GoBackButtonProps) {
	return (
		<Link
			to={to}
			replace={replace}
		>
			<IconButton icon={BsChevronLeft}>Go back</IconButton>
		</Link>
	);
}
export default GoBackButton;
