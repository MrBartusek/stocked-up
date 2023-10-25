import { useRouteError } from 'react-router-dom';
import FullFocusContainer from '../FullFocusContainer';
import NotFound from './NotFound';
import Default from './Default';

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
