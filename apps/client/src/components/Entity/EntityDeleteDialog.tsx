import { BsTrash } from 'react-icons/bs';
import placeholderImage from '../../assets/placeholder.png';
import Button from '../Button';
import IconButton from '../IconButton';
import FormError from '../Form/FormError';
import { useNavigate } from 'react-router-dom';

export interface EntityDeleteDialogProps {
	entityName: string;
	identifier: string;
	deletedItems?: string[];
	error?: string | null;
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function EntityDeleteDialog({
	entityName,
	identifier,
	deletedItems = [],
	error,
	loading,
	onClick,
}: EntityDeleteDialogProps) {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col">
			<h1 className="mb-2 text-3xl">Confirm the action</h1>
			<p className="text-muted">Do you really want to delete this entity:</p>

			<div className="my-6 flex w-96 gap-4 rounded-md border border-gray-300 p-4">
				<div>
					<img
						src={placeholderImage}
						className="w-16 rounded-md"
						width={50}
						height={50}
					/>
				</div>
				<div className="flex flex-col justify-center">
					<div className="text-lg">{entityName}</div>
					<div className="text-sm text-muted">{identifier}</div>
				</div>
			</div>

			<p className="mb-2">This action is going to delete:</p>
			<ul className="mb-9 list-disc ps-6">
				{[`This ${identifier}`, ...deletedItems].map((item, key) => (
					<li key={key}>{item}</li>
				))}
			</ul>

			<FormError>{error}</FormError>
			<div className="flex gap-3 ">
				<Button
					variant="secondary"
					onClick={() => navigate(-1)}
					loading={loading}
				>
					Cancel
				</Button>
				<IconButton
					icon={BsTrash}
					variant="danger"
					onClick={onClick}
					loading={loading}
				>
					Delete {identifier}
				</IconButton>
			</div>
		</div>
	);
}
export default EntityDeleteDialog;
