import classNames from 'classnames';
import React from 'react';

export interface SideBySideImageProps {
	imageSrc: string;
	children?: React.ReactNode;
	className?: string;
}

function SideBySideImage({ imageSrc, children, className }: SideBySideImageProps) {
	return (
		<div className={classNames(className, 'flex flex-row items-center lg:gap-16')}>
			<img
				className="hidden w-full max-w-[45%] lg:block"
				width={150}
				height={50}
				src={imageSrc}
			></img>
			<div className="flex flex-1 flex-col">{children}</div>
		</div>
	);
}
export default SideBySideImage;
