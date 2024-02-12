import classNames from 'classnames';
import { UserDto } from 'shared-types';

export interface UserAvatarProps {
	user?: UserDto;
	variant?: 'square' | 'circle';
	size?: number;
}

function UserAvatar({ user, variant = 'square', size = 6 }: UserAvatarProps) {
	return (
		<div style={{ width: `${size / 4}rem` }}>
			<img
				height={size * 4}
				width={size * 4}
				className={classNames(
					'w-100',
					{
						'rounded-full': variant == 'circle',
						'rounded-md': variant == 'square',
					},
					'bg-gray-300',
				)}
				src={user?.image.url}
			/>
		</div>
	);
}
export default UserAvatar;
