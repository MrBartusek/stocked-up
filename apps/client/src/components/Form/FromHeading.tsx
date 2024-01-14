export interface FromHeadingProps {}

export interface FromHeadingProps {
	children: React.ReactNode;
	description?: string;
}

function FromHeading({ children, description }: FromHeadingProps) {
	return (
		<div className="mb-6 border-b border-gray-300 pb-3 pt-8">
			<h2 className="text-xl">{children}</h2>
			{description ? <div className="text-muted">{description}</div> : null}
		</div>
	);
}
export default FromHeading;
