import React from 'react';
import CardWithTitle, { CardWithTitleProps } from './CardWithTitle';

export interface BigNumberCardProps extends CardWithTitleProps {
	children: React.ReactNode;
}

function BigNumberCard({ title, children }: BigNumberCardProps) {
	return (
		<CardWithTitle title={title}>
			<span className="flex justify-center text-center text-3xl font-bold">{children}</span>
		</CardWithTitle>
	);
}
export default BigNumberCard;
