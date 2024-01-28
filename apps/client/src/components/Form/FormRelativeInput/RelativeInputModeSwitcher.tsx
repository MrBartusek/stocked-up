import { MouseEventHandler } from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';

export interface RelativeInputModeSwitcherProps {
	switchMode: MouseEventHandler<HTMLButtonElement>;
	isRelativeMode: boolean;
}

function RelativeInputModeSwitcher({ switchMode, isRelativeMode }: RelativeInputModeSwitcherProps) {
	return (
		<button
			className="flex items-center gap-2 text-primary hover:underline"
			onClick={switchMode}
		>
			<BsArrowLeftRight /> Change to {isRelativeMode ? 'manual' : 'relative'} mode
		</button>
	);
}
export default RelativeInputModeSwitcher;
