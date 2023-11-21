import classNames from 'classnames';

export type DivProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export interface EntityContainerProps extends DivProps {}

function EntityContainer(props: EntityContainerProps) {
	return (
		<div
			{...props}
			className={classNames(
				props.className,
				'flex flex-row-reverse items-start justify-between gap-28',
			)}
		/>
	);
}
export default EntityContainer;
