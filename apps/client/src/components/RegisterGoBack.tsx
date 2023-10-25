import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function RegisterGoBack() {
	return (
		<div className="flex justify-center">
			<Link
				to="/register"
				className="custom-button-simple  flex flex-row items-center gap-1 text-center"
			>
				<BsArrowLeft /> Go back to selection
			</Link>
		</div>
	);
}
export default RegisterGoBack;
