import React from 'react';
import UserInfo from './UserInfo';

export interface DashboardContentProps {
    header: string;
    children: React.ReactNode;
}

function DashboardContent({ children, header }: DashboardContentProps) {
	return (
		<div className='flex-1 p-8'>
			<div className='flex justify-between items-center pb-8'>
				<h2 className='block text-3xl'>
					{header}
				</h2>
				<UserInfo />
			</div>
			<div className='mt-2'>
				{children}
			</div>
		</div>
	);
}

export default DashboardContent;
