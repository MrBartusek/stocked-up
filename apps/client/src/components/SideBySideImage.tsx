import classNames from 'classnames';
import React from 'react';

export interface SideBySideImageProps {
	imageSrc: string;
	children?: React.ReactNode;
	className?: string;
}

function SideBySideImage({ imageSrc, children, className }: SideBySideImageProps) {
	return (
		<div className={classNames(className, 'flex flex-1 flex-row items-center lg:gap-24')}>
			<img
				className="hidden max-h-96 w-full max-w-[43%] lg:block"
				width={150}
				height={50}
				src={imageSrc}
			/>
			<div className="flex flex-1 flex-col">{children}</div>
		</div>
	);
}
export default SideBySideImage;
