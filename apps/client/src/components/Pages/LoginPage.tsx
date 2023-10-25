import { Link } from 'react-router-dom';
import UndrawTwoFactor from '../../assets/undraw_two_factor.svg';
import FullFocusContainer from '../FullFocusContainer';
import LoginForm from '../LoginForm';
import SideBySideImage from '../SideBySideImage';

function LoginPage() {
	return (
		<FullFocusContainer>
			<SideBySideImage
				imageSrc={UndrawTwoFactor}
				className="flex-1"
			>
				<h2 className="mb-2 text-center text-4xl">Login to your account</h2>
				<div className="flex flex-row justify-center gap-1">
					<span>Don&apos;t have an account?</span>{' '}
					<Link
						to="/register"
						className="link-primary"
					>
						Signup for free
					</Link>
				</div>
				<LoginForm />
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default LoginPage;
