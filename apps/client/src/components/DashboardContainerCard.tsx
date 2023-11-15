import classNames from 'classnames';
import { ErrorBoundary } from 'react-error-boundary';
import Card, { CardProps } from './Card';

export interface DashboardContainerCard extends CardProps {}

function DashboardContainerCard({ ...props }: DashboardContainerCard) {
	return (
		<Card
			{...props}
			className={classNames(props.className, 'flex justify-center')}
		>
			<ErrorBoundary
				fallback={
					<span className="font-bold text-red-600">
						StockedUp encountered and error when loading this element
					</span>
				}
			>
				<div className="w-full max-w-[100rem]">{props.children}</div>
			</ErrorBoundary>
		</Card>
	);
}
export default DashboardContainerCard;
