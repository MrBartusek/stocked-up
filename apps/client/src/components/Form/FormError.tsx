export interface FormErrorProps {
	children?: React.ReactNode;
}

function FormError({ children }: FormErrorProps) {
	if (!children) return <></>;
	return <div className="ital mb-4 font-semibold text-red-700">Error: {children}</div>;
}
export default FormError;
