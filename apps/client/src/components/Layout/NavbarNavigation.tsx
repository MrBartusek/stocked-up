import classNames from 'classnames';
import { Link } from 'react-router-dom';

export type NavigationLinks = 'features' | 'login' | 'register' | 'demo' | 'github';

export interface NavbarNavigationProps {
	orientation?: 'row' | 'col';
	className?: string;
	extendedOptions?: boolean;
}

function NavbarNavigation({
	orientation = 'row',
	className,
	extendedOptions = false,
}: NavbarNavigationProps) {
	const orientationClasses = {
		row: 'flex-row items-center gap-6',
		col: 'flex-col gap-4',
	};

	return (
		<nav className={classNames('flex-1', className)}>
			<ul className={classNames('flex', orientationClasses[orientation])}>
				<li>
					<Link
						to="#features"
						className="link-muted"
					>
						Features
					</Link>
				</li>
				<li>
					<Link
						to="/login"
						className="link-muted"
					>
						Login
					</Link>
				</li>
				{extendedOptions && (
					<>
						<li>
							<Link
								to="/register/demo"
								className="link-muted"
							>
								Try demo
							</Link>
						</li>
						<li>
							<Link
								to="/register"
								className="link-muted"
							>
								Get started
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
export default NavbarNavigation;
