import { Link } from 'react-router-dom';
import Button from './Button';

function TryDemoButton() {
	return (
		<Link to="/register/demo">
			<Button variant="primary-outline">Try demo account</Button>
		</Link>
	);
}
export default TryDemoButton;
