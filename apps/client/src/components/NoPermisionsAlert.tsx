import { BsShieldLock } from 'react-icons/bs';
import Alert from './Helpers/Alert';

function NoPermissionsAlert() {
	return (
		<Alert className="my-12 flex-col !items-start p-10">
			<div className="flex items-center gap-2 text-xl">
				<BsShieldLock /> You do not have permissions to do that.
			</div>
			<ul className="ms-7 mt-4 list-disc">
				<li>Please ensure you are using correct account.</li>
				<li>Ask your organization administrator for permissions.</li>
			</ul>
		</Alert>
	);
}
export default NoPermissionsAlert;
