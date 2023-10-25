import SideBySideImage from '../SideBySideImage';
import UndrawNotFound from '../../assets/undraw_not_found.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

function NotFound() {
	const navigate = useNavigate();

	return (
		<SideBySideImage imageSrc={UndrawNotFound}>
			<h1 className="text-3xl">Page not found!</h1>
			<p className="my-12">The page that you were looking for was not found</p>
			<Button onClick={() => navigate(-1)}>Go back</Button>
		</SideBySideImage>
	);
}
export default NotFound;
