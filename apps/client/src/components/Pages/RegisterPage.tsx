import { Link, Outlet } from 'react-router-dom';
import UndrawAircraft from '../../assets/undraw_aircraft.svg';
import FullFocusContainer from '../FullFocusContainer';
import SideBySideImage from '../SideBySideImage';

function RegisterPage() {
	return (
		<FullFocusContainer>
			<SideBySideImage imageSrc={UndrawAircraft}>
				<h2 className="mb-2 text-center text-4xl">Create new account</h2>
				<div className="flex flex-row justify-center gap-1">
					<span>Already have an account?</span>{' '}
					<Link
						to="/login"
						className="link-primary"
					>
						Login instead
					</Link>
				</div>
				<Outlet />
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default RegisterPage;
