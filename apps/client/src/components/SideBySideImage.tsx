import React from 'react';

export interface SideBySideImageProps {
	imageSrc: string;
	children?: React.ReactNode;
}

function SideBySideImage({ imageSrc, children }: SideBySideImageProps) {
	return (
		<div className="flex flex-row items-center lg:gap-24">
			<div className="lg:w-[45%]">
				<img
					className="hidden w-96 lg:block"
					src={imageSrc}
				></img>
			</div>
			<div className="flex flex-col lg:w-[55%]">{children}</div>
		</div>
	);
}
export default SideBySideImage;
