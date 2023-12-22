import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../context/CurrentAppContext.js';

function OrganizationSelect() {
	const appContext = useContext(CurrentAppContext);

	return (
		<div className="flex gap-1 pb-2">
			<span>Org:</span>{' '}
			<span className="flex-1 truncate font-semibold">{appContext.organization.name}</span>
			<Link
				className="link-primary"
				to="/dashboard/select"
			>
				change
			</Link>
		</div>
	);
}
export default OrganizationSelect;
