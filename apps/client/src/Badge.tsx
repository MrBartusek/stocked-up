import classNames from 'classnames';
import React from 'react';

export interface BadgeProps {
	children: React.ReactNode;
}

function Badge({ children }: BadgeProps) {
	return (
		<span
			className={classNames(
				'me-2 inline-flex items-center gap-1 rounded px-2.5 py-0.5 text-xs font-medium',
				'border border-primary bg-accent text-primary',
			)}
		>
			{children}
		</span>
	);
}
export default Badge;
