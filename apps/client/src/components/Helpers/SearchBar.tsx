import { useForm } from 'react-hook-form';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';

type Inputs = {
	search: string;
};

export interface SearchBarProps {
	value?: string;
	onSearch?: (search: string) => void;
}

function SearchBar({ onSearch, value }: SearchBarProps) {
	const { register, getValues } = useForm<Inputs>({ defaultValues: { search: value } });

	let debounceTimeout: NodeJS.Timeout;

	function onChange() {
		async function callHandler() {
			if (!onSearch) return;
			const search = getValues('search');
			onSearch(search);
		}
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => callHandler(), 800);
	}

	return (
		<Form
			onChange={onChange}
			onSubmit={(e) => e.preventDefault()}
		>
			<FormField>
				<FormInput
					placeholder="Search for products"
					{...register('search')}
				/>
			</FormField>
		</Form>
	);
}
export default SearchBar;
