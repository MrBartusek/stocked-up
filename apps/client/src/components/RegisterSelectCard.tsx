import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';

export interface RegisterSelectCardProps {
	children: React.ReactNode;
	icon: IconType;
	title: string;
}

function RegisterSelectCard({ children, icon, title }: RegisterSelectCardProps) {
	const iconElement = React.createElement(icon, {
		size: 50,
		className: classNames('text-muted'),
	});

	return (
		<div
			className={classNames(
				'flex flex-row items-center gap-8 rounded-md border border-gray-400',
				'cursor-pointer p-6 no-underline hover:bg-gray-200',
			)}
		>
			{iconElement}
			<div className="flex-1">
				<h2 className="mb-1 text-xl">{title}</h2>
				<span className="text-sm text-muted">{children}</span>
			</div>
		</div>
	);
}
export default RegisterSelectCard;
