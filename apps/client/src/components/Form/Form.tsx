import { createContext } from 'react';

type HTMLFormProps = React.DetailedHTMLProps<
	React.FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>;
export interface FormProps extends HTMLFormProps {
	loading?: boolean;
}

export const FormContext = createContext<{
	formLoading: boolean;
}>(null!);

function Form({ loading, ...props }: FormProps) {
	return (
		<FormContext.Provider value={{ formLoading: loading || false }}>
			<form {...props} />
		</FormContext.Provider>
	);
}
export default Form;
