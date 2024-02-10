import { useSearchParams } from 'react-router-dom';
import UndrawPasswordReset from '../../assets/undraw_password_reset.svg';
import FullFocusContainer from '../FullFocusContainer';
import ResetPasswordForm from '../ResetPasswordForm';
import SendPasswordResetEmailForm from '../SendPasswordResetEmailForm';
import SideBySideImage from '../SideBySideImage';

function PasswordResetPage() {
	const [searchParams] = useSearchParams();
	const user = searchParams.get('user');
	const token = searchParams.get('token');

	return (
		<FullFocusContainer>
			<SideBySideImage
				imageSrc={UndrawPasswordReset}
				className="flex-1"
			>
				<h2 className="mb-6 text-center text-4xl">Reset password</h2>
				{user && token ? (
					<ResetPasswordForm
						user={user}
						token={token}
					/>
				) : (
					<SendPasswordResetEmailForm />
				)}
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default PasswordResetPage;
