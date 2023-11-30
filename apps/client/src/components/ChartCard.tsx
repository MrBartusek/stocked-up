import React from 'react';
import CardWithTitle, { CardWithTitleProps } from './CardWithTitle';

export interface ChartCardProps extends CardWithTitleProps {
	children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
	return (
		<CardWithTitle title={title}>
			<div className="h-80 w-full">{children}</div>
		</CardWithTitle>
	);
}
export default ChartCard;
