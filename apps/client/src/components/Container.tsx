import classNames from 'classnames';
import React, { forwardRef } from 'react';

type DIVProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface ContainerProps extends DIVProps {
	children?: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
	const { children, ...rest } = props;
	return (
		<div
			{...rest}
			ref={ref}
			className={classNames(rest.className, 'container mx-auto px-6')}
		>
			{children}
		</div>
	);
});

Container.displayName = 'Container';

export default Container;
