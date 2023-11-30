import React from 'react';
import Card from './Card';

export interface CardWithTitleProps {
	title: string;
	children: React.ReactNode;
}

function CardWithTitle({ title, children }: CardWithTitleProps) {
	return (
		<Card className="flex flex-col items-center justify-center gap-5 text-center">
			<h2 className="mb-1 text-xl text-muted">{title}</h2>
			<div className="w-full">{children}</div>
		</Card>
	);
}
export default CardWithTitle;
