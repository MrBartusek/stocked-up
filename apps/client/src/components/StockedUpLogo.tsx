import React from 'react';
import LogoBlack from '../assets/stockedup-logo-black.png';
import LogoWhite from '../assets/stockedup-logo-white.png';

type LogoVariant = 'black' | 'white';

interface StockedUpLogoProps
	extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
	variant: LogoVariant;
}

function StockedUpLogo(props: StockedUpLogoProps) {
	const variant = props.variant;

	function getSrc(variant: LogoVariant): string {
		if (variant == 'white') {
			return LogoWhite;
		} else if (variant == 'black') {
			return LogoBlack;
		}
		return '';
	}

	return (
		<img
			{...props}
			src={getSrc(variant)}
			alt="StockedUp logo"
			width={340}
			height={115}
		/>
	);
}

export default StockedUpLogo;
