import { useRouteError } from 'react-router-dom';
import FullFocusContainer from '../FullFocusContainer';
import Default from './Default';
import NotFound from './NotFound';

function ApplicationError() {
	const error = useRouteError() as any;

	function getErrorElement() {
		if (error?.status == 404) {
			return <NotFound />;
		} else {
			return <Default />;
		}
	}

	return <FullFocusContainer>{getErrorElement()}</FullFocusContainer>;
}
export default ApplicationError;
