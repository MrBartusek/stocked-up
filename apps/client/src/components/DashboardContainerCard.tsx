import classNames from 'classnames';
import Card, { CardProps } from './Card';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from './Loader';

export interface DashboardContainerCard extends CardProps {}

function DashboardContainerCard({ ...props }: DashboardContainerCard) {
	return (
		<Card
			{...props}
			className={classNames(props.className, 'flex justify-center')}
		>
			<ErrorBoundary
				fallback={
					<Loader
						isLoading={false}
						isError
					/>
				}
			>
				<div className="w-full max-w-[100rem]">{props.children}</div>
			</ErrorBoundary>
		</Card>
	);
}
export default DashboardContainerCard;
