import { Link } from 'react-router-dom';
import UndrawPressPlay from '../../assets/undraw_press_play.svg';
import DemoCreator from '../DemoCreator';
import FullFocusContainer from '../FullFocusContainer';
import SideBySideImage from '../SideBySideImage';

function DemoPage() {
	return (
		<FullFocusContainer>
			<SideBySideImage imageSrc={UndrawPressPlay}>
				<h2 className="mb-2 text-center text-4xl">Create demo account</h2>
				<div className="flex flex-row justify-center gap-1">
					<span>Already have an account?</span>{' '}
					<Link
						to="/login"
						className="link-primary"
					>
						Login instead
					</Link>
				</div>
				<DemoCreator />
			</SideBySideImage>
		</FullFocusContainer>
	);
}
export default DemoPage;
