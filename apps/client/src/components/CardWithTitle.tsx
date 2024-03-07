import classNames from 'classnames';
import React from 'react';
import Card, { CardProps } from './Card';

export interface CardWithTitleProps extends CardProps {
	title: string;
	children: React.ReactNode;
}

function CardWithTitle({ title, children, ...props }: CardWithTitleProps) {
	return (
		<Card
			{...props}
			className={classNames('t flex flex-col items-center gap-5', props.className)}
		>
			<h2 className="mb-1 text-center text-xl text-muted">{title}</h2>
			<div className="w-full">{children}</div>
		</Card>
	);
}
export default CardWithTitle;
