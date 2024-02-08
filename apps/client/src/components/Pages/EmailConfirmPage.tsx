import { useParams } from 'react-router-dom';
import UndrawEmailConfirm from '../../assets/undraw_email_confirm.svg';
import FullFocusContainer from '../FullFocusContainer';
import SideBySideImage from '../SideBySideImage';
import EmailConfirmForm from '../EmailConfirmForm';

function EmailConfirmPage() {
	const { token } = useParams();

	return (
		<FullFocusContainer>
			<SideBySideImage
				imageSrc={UndrawEmailConfirm}
				className="flex-1"
			>
				<h2 className="mb-2 text-center text-4xl">Confirm Your Email</h2>
				<EmailConfirmForm token={token} />
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default EmailConfirmPage;
