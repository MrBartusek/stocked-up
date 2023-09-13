import classNames from 'classnames';
import React from 'react';

type DIVProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface CardProps extends DIVProps {
    children: React.ReactNode;
}

function Card(props: CardProps) {
	return (
		<div
			{...props}
			className={
				classNames(
					'bg-gray-50 px-8 py-10 rounded-md border border-gray-300 flex-1',
					props.className
				)}
		/>
	);
}
export default Card;
