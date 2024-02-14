import UserEmailReconfirmForm from '../../User/UserEmailReconfirmForm';

function UserConfirmEmailTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Confirm email</h2>
			<p className="mb-6 text-muted">
				Confirm your e-mail account to enhance security of your account and unlock some features.
			</p>
			<UserEmailReconfirmForm />
		</div>
	);
}
export default UserConfirmEmailTab;
