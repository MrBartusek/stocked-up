export interface AlertProps {
	children: React.ReactNode;
}

function Alert({ children }: AlertProps) {
	return <div className="rounded-sm border border-red-300 bg-red-200 p-4">{children}</div>;
}
export default Alert;
