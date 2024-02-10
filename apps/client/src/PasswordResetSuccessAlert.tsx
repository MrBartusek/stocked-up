import { BsCheckCircle } from 'react-icons/bs';

function PasswordResetSuccessAlert() {
	return (
		<div className="flex flex-col items-center gap-6 rounded-xl border border-gray-300 px-8 py-12">
			<div className="flex flex-col items-center justify-center gap-6 text-center text-muted">
				<BsCheckCircle className="text-5xl text-success" /> We&apos;ve sent password reset
				instructions to the e-mail address you have provided. If you haven&apos;t received this
				email in few minutes, please check your spam folder.
			</div>
		</div>
	);
}
export default PasswordResetSuccessAlert;
