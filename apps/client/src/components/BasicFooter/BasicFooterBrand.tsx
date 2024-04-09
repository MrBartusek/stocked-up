import classNames from 'classnames';
import { Link } from 'react-router-dom';
import StockedUpLogo from '../StockedUpLogo';

function BasicFooterBrand() {
	return (
		<Link
			to="/"
			className={classNames('flex flex-col items-center pb-8', 'text-xs text-muted')}
		>
			<StockedUpLogo
				variant="black"
				className="w-44"
			/>
			Inventory Management System
		</Link>
	);
}

export default BasicFooterBrand;
