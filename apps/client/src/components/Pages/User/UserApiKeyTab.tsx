import { BsExclamationTriangleFill } from 'react-icons/bs';
import Alert from '../../Helpers/Alert';
import UserApiKeyForm from '../../User/UserApiKeyForm';

function UserApiKeysTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">API Key</h2>
			<p className="mb-6 text-muted">Your API key for StockedUp Public API.</p>

			<Alert variant="warning">
				<BsExclamationTriangleFill className="text-3xl" />
				<div>
					<span className="font-bold">Keep Your API Key Safe:</span> Your API key is like a password
					for your StockedUp account. Do not share it with others. Keep it secure to protect your
					account&apos;s data.
				</div>
			</Alert>

			<UserApiKeyForm />
		</div>
	);
}
export default UserApiKeysTab;
