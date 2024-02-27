import { useContext } from 'react';
import { BsGeoAltFill, BsPersonPlusFill, BsSliders, BsTagFill } from 'react-icons/bs';
import { CurrentAppContext } from '../context/CurrentAppContext';
import { UserContext } from '../context/UserContext';
import CardWithTitle from './CardWithTitle';
import WelcomeActionLink from './WelcomeActionLink';

function WelcomeCard() {
	const { user } = useContext(UserContext);
	const { organization } = useContext(CurrentAppContext);

	return (
		<CardWithTitle title="Welcome to StockedUp!">
			<p className="text-gray-800">
				Welcome to your new organization {user.username}! To get you started, there are some things
				you can do with StockedUp:
			</p>
			<div className="mt-4 flex flex-col divide-y text-lg">
				<WelcomeActionLink
					to="warehouses/create"
					icon={<BsGeoAltFill />}
				>
					Create new warehouse
				</WelcomeActionLink>
				<WelcomeActionLink
					to="products/create"
					icon={<BsTagFill />}
				>
					Create new product
				</WelcomeActionLink>
				<WelcomeActionLink
					to={`../settings/${organization?.id}/members/invite`}
					icon={<BsPersonPlusFill />}
				>
					Invite organization member
				</WelcomeActionLink>
				<WelcomeActionLink
					to={`../settings/${organization?.id}`}
					icon={<BsSliders />}
				>
					Modify organization settings
				</WelcomeActionLink>
			</div>
		</CardWithTitle>
	);
}
export default WelcomeCard;
