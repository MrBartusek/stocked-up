import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export interface SpecialRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: SpecialRouteProps) {
	const { isAuthenticated, isLoading } = useContext(UserContext);

	if (!isLoading && !isAuthenticated) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
}

export function PublicRoute({ children }: SpecialRouteProps) {
	const { isAuthenticated, isLoading } = useContext(UserContext);

	if (!isLoading && isAuthenticated) {
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

	return children;
}
