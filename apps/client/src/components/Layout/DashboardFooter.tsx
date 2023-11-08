import { Link } from 'react-router-dom';
import Container from '../Container';

function DashboardFooter() {
	const stockedUpLink = (
		<Link
			to="/"
			className="link-muted"
		>
			StockedUp
		</Link>
	);

	return (
		<footer className="mt-10 border-t border-gray-200  p-4">
			<Container className="flex justify-between text-sm text-muted">
				<div>{stockedUpLink}</div>
				<div>
					{stockedUpLink} &copy; {new Date().getFullYear()}
				</div>
			</Container>
		</footer>
	);
}

export default DashboardFooter;
