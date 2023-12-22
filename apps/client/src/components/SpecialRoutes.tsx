import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

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
