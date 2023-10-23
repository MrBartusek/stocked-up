import { Link } from 'react-router-dom';
import UndrawTwoFactor from '../../assets/undraw_two_factor.svg';
import FullFocusContainer from '../FullFocusContainer';

function LoginPage() {
	return (
		<FullFocusContainer className="flex flex-row items-center gap-20">
			<div className="w-[50%]">
				<img
					className="w-96"
					src={UndrawTwoFactor}
				></img>
			</div>
			<div className="flex w-[50%] flex-col">
				<h2 className="mb-2 text-4xl">Login to your account</h2>
				<div className="flex flex-row justify-center gap-1">
					<span>Don&apos;t have an account?</span> <Link to="singup">Signup for free</Link>
				</div>

				<form></form>
			</div>
		</FullFocusContainer>
	);
}
export default LoginPage;
