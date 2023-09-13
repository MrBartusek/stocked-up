import React from 'react';
import Card from './Card';

export interface BigNumberCardProps {
    title: string;
	children: React.ReactNode;
}

function BigNumberCard({ title, children }: BigNumberCardProps) {
	return (
		<Card className='flex flex-col gap-5 justify-center items-center text-center'>
			<h2 className='text-xl text-muted'>
				{title}
			</h2>
			<p className='text-3xl font-bold'>
				{children}
			</p>
		</Card>
	);
}
export default BigNumberCard;
