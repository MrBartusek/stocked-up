import classNames from 'classnames';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface HeaderWithHintProps extends DivProps {
	hint?: string;
}

function HeaderWithHint({ children, className, hint, ...props }: HeaderWithHintProps) {
	return (
		<div
			{...props}
			className={classNames(className, 'mb-12 flex items-center gap-2')}
		>
			<h2 className="text-3xl">{children}</h2>
			{hint && <span className="text-md text-muted">({hint})</span>}
		</div>
	);
}
export default HeaderWithHint;
