import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '../Container';
import BasicFooterBrand from './BasicFooterBrand';
import BasicFooterContact from './BasicFooterContact';
import BasicFooterNavigation from './BasicFooterNavigation';

const PORTFOLIO_LINK =
	'https://dokurno.dev/?utm_source=stockedup&utm_medium=footer&utm_campaign=stockedup_footer';

function BasicFooter() {
	return (
		<footer className="border-t border-gray-200 bg-gray-100 px-4 py-8">
			<Container>
				<div className="flex flex-col gap-8 pb-8 lg:flex-row lg:gap-24 xl:gap-48">
					<BasicFooterBrand />
					<div
						className={classNames(
							'flex flex-1 flex-col  justify-between gap-12',
							'items-center sm:flex-row sm:items-start',
						)}
					>
						<BasicFooterNavigation />
						<BasicFooterContact />
					</div>
				</div>

				<div
					className={classNames(
						'border-t border-gray-300 pt-8 text-sm text-muted',
						'flex items-center justify-between gap-4',
					)}
				>
					<div>&copy; StockedUp {new Date().getFullYear()} - All rights reserved</div>
					<div>
						Made by:{' '}
						<Link
							to={PORTFOLIO_LINK}
							className="link-muted"
						>
							MrBartusek
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
}

export default BasicFooter;
