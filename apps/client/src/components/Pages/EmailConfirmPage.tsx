import { useSearchParams } from 'react-router-dom';
import UndrawEmailConfirm from '../../assets/undraw_email_confirm.svg';
import EmailConfirmForm from '../EmailConfirmForm';
import FullFocusContainer from '../FullFocusContainer';
import SideBySideImage from '../SideBySideImage';

function EmailConfirmPage() {
	const [searchParams] = useSearchParams();

	return (
		<FullFocusContainer>
			<SideBySideImage
				imageSrc={UndrawEmailConfirm}
				className="flex-1"
			>
				<h2 className="mb-2 text-center text-4xl">Confirm Your Email</h2>
				<EmailConfirmForm
					token={searchParams.get('token')!}
					user={searchParams.get('user')!}
				/>
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default EmailConfirmPage;
