import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BsClipboard2, BsEye, BsEyeSlash } from 'react-icons/bs';
import { UserContext } from '../../context/UserContext';
import useApiKey from '../../hooks/useApiKey';
import ActionButton from '../ActionButton';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import Alert from '../Helpers/Alert';
import RegenerateApiKeyButton from '../RegenerateApiKeyButton';

function UserApiKeyForm() {
	const { apiKey, error } = useApiKey();
	const { user } = useContext(UserContext);
	const [showKey, setShowKey] = useState(false);

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
			{user.isDemo ? (
				<Alert>
					Demo account are restricted from using Public API. Please use regular user account.
				</Alert>
			) : (
				<Form>
					<FormField
						label="Your API key"
						hint="Use this API key for each request"
					>
						<FormInput
							value={error ? 'Failed to get API key' : apiKey || 'Loading...'}
							type={showKey || !apiKey ? 'text' : 'password'}
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
			)}

			<RegenerateApiKeyButton />
		</div>
	);
}

export default UserApiKeyForm;
