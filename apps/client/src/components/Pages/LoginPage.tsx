import { BsBoxSeam } from 'react-icons/bs';
import FullFocusContainer from '../FullFocusContainer';

function LoginPage() {
	return (
		<FullFocusContainer className="flex flex-col items-center">
			<BsBoxSeam
				className="mb-8 text-primary"
				size={64}
			/>
			<h2 className="text-3xl">Login to StockedUp</h2>
		</FullFocusContainer>
	);
}
export default LoginPage;
