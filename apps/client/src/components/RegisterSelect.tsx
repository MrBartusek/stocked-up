import { BsGearFill, BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import RegisterSelectCard from './RegisterSelectCard';

function RegisterSelect() {
	return (
		<div className="my-3 mt-8 flex flex-col gap-5">
			<Link to="new">
				<RegisterSelectCard
					icon={BsPersonFill}
					title="Create account"
				>
					Create a new, permanent user account and organization with e-mail address and password.
					Use this option for using StockedUp in regular way.
				</RegisterSelectCard>
			</Link>
			<Link to="demo">
				<RegisterSelectCard
					icon={BsGearFill}
					title="Try out StockedUp Demo"
				>
					Create a temporary demonstration account to test StockedUp features before you decide to
					use it. No signup needed. This account will be deleted after 24 hours
				</RegisterSelectCard>
			</Link>
		</div>
	);
}
export default RegisterSelect;
