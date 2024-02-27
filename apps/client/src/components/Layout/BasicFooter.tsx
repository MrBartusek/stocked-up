import { BsCupHot, BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Container from '../Container';

const PORTFOLIO_LINK =
	'https://dokurno.dev/?utm_source=stockedup&utm_medium=footer&utm_campaign=stockedup_footer';

function BasicFooter() {
	return (
		<footer className="border-t border-gray-200 bg-gray-50 px-4 py-8">
			<Container className="flex items-center justify-between text-sm text-muted">
				<div className="flex flex-col gap-2">
					<div>StockedUp &copy; {new Date().getFullYear()}</div>
					<div className="flex items-center gap-1">
						Made with <BsHeart /> & <BsCupHot /> by{' '}
						<a
							href={PORTFOLIO_LINK}
							className="link-muted underline"
						>
							MrBartusek
						</a>
					</div>
				</div>
				<div className="link-muted flex flex-col gap-1 text-right underline">
					<Link to="login">Login</Link>
					<Link to="register/demo">Demo account</Link>
					<Link to="https://github.com/MrBartusek/stocked-up">GitHub</Link>
				</div>
			</Container>
		</footer>
	);
}

export default BasicFooter;
