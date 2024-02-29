import React from 'react';
import UserInfo from './UserInfo';

export interface DashboardContentProps {
	header: string;
	children: React.ReactNode;
}

function DashboardContent({ children, header }: DashboardContentProps) {
	return (
		<div className="flex-1 p-8">
			<div className="flex items-center justify-between pb-8">
				<h2 className="block text-3xl">{header}</h2>
				<UserInfo />
			</div>
			<div className="mt-2">{children}</div>
			<div className="mt-8 text-center text-sm text-muted">
				StockedUp &copy; {new Date().getFullYear()}
			</div>
		</div>
	);
}

export default DashboardContent;
