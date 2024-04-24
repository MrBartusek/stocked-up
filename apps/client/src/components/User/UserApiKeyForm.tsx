import { BsArrowRepeat, BsClipboard2, BsEye, BsEyeSlash } from 'react-icons/bs';
import ActionButton from '../ActionButton';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import IconButton from '../IconButton';
import { useState } from 'react';

function UserApiKeyForm() {
	const [showKey, setShowKey] = useState(false);

	function handleEyeClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		setShowKey((show) => !show);
	}

	function handleCopy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
	}

	return (
		<div className="my-8">
			<Form>
				<FormField
					label="Your API key"
					hint="Use this API key for each request"
				>
					<FormInput
						value="0f5b995f-0483-4cfb-aa29-aa81d9b9987f"
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
