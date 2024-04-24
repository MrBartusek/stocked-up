import { BsArrowRepeat, BsClipboard2, BsEye, BsEyeSlash } from 'react-icons/bs';
import ActionButton from '../ActionButton';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import IconButton from '../IconButton';
import { useState } from 'react';
import useApiKey from '../../hooks/useApiKey';
import toast from 'react-hot-toast';

function UserApiKeyForm() {
	const [showKey, setShowKey] = useState(false);
	const { apiKey } = useApiKey();

	function handleEyeClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		setShowKey((show) => !show);
	}

	async function handleCopy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		if (!apiKey) return;
		toast.success('Copied API Key to clipboard', { id: 'api-key-clipboard' });
		await navigator.clipboard.writeText(apiKey);
	}

	return (
		<div className="my-8">
			<Form>
				<FormField
					label="Your API key"
					hint="Use this API key for each request"
				>
					<FormInput
						value={apiKey || '...'}
						type={showKey ? 'text' : 'password'}
						readOnly
					/>
					<div className="flex">
						<ActionButton
							icon={showKey ? BsEyeSlash : BsEye}
							onClick={handleEyeClick}
						/>
						<ActionButton
							icon={BsClipboard2}
							onClick={handleCopy}
						/>
					</div>
				</FormField>
			</Form>

			<IconButton icon={BsArrowRepeat}>Generate new API Key</IconButton>
		</div>
	);
}

export default UserApiKeyForm;
