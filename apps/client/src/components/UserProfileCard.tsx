import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import UserAvatar from './UserAvatar';

function UserProfileCard() {
	const { user } = useContext(UserContext);

	console.log(user);

	return (
		<div className="my-4 flex flex-col overflow-hidden rounded-md border">
			<div className="flex gap-5 bg-gray-150 p-6">
				<UserAvatar
					user={user}
					variant="circle"
					size={22}
				/>
				<div className="flex flex-col justify-center">
					<div className="text-lg font-semibold">{user.username}</div>
					<div className="text-muted">{user.email}</div>
					{user.isDemo && <div className="text-danger">(Temporary demonstration account)</div>}
				</div>
			</div>
			<div className="flex flex-col gap-4 px-8 py-6">
				<div>
					<div className="font-medium">Username</div>
					<div className="text-muted">{user.username}</div>
				</div>
				<div>
					<div className="flex gap-1">
						<span className="font-medium">E-mail</span>
						{!user.isConfirmed && <button className="link-primary">[Confirm]</button>}
					</div>
					<div className="text-muted">{user.email}</div>
				</div>
				<div>
					<div className="font-medium">Internal ID</div>
					<code>{user.id}</code>
				</div>
			</div>
		</div>
	);
}
export default UserProfileCard;
