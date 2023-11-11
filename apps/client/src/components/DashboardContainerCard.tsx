import classNames from 'classnames';
import Card, { CardProps } from './Card';

export interface DashboardContainerCard extends CardProps {}

function DashboardContainerCard({ ...props }: DashboardContainerCard) {
	return (
		<Card
			{...props}
			className={classNames(props.className, 'flex justify-center')}
		>
			<div className="w-full max-w-[100rem]">{props.children}</div>
		</Card>
	);
}
export default DashboardContainerCard;
