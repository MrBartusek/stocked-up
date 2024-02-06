import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IImageDto } from 'shared-types';
import { Utils } from '../../utils';
import Button from '../Button';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import IconButton from '../IconButton';

export interface EntityDeleteDialogProps {
	entityName: string;
	entityId: string;
	resourceName: string;
	identifier: string;
	deletedItems?: string[];
	confirmBeforeDelete?: boolean;
	image?: IImageDto;
}

function EntityDeleteDialog({
	entityName,
	entityId,
	resourceName,
	identifier,
	deletedItems = [],
	confirmBeforeDelete = false,
	image,
}: EntityDeleteDialogProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { register, watch } = useForm<{ name: string }>();

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const inputContainsValidName = watch('name') == entityName;

	function onClick() {
		setLoading(true);

		axios
			.delete(`/api/${resourceName}/${entityId}`)
			.then(() => navigate(`..`))
			.then(() => queryClient.invalidateQueries([resourceName]))
			.then(() => toast.success(`Successfully deleted ${identifier}`))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<div className="flex flex-col">
			<h1 className="mb-2 text-3xl">Confirm the action</h1>
			<p className="text-muted">Do you really want to delete this entity:</p>

			<div className="my-6 flex w-96 gap-4 rounded-md border border-gray-300 p-4">
				<div>
					<img
						src={image?.url || '/api/images/default'}
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
			<ul className="list-disc ps-6">
				{[`This ${identifier}`, ...deletedItems].map((item, key) => (
					<li key={key}>{item}</li>
				))}
			</ul>

			{confirmBeforeDelete && (
				<Form
					loading={loading}
					className="mt-8"
				>
					<FormField label={`Confirm ${identifier} name to delete`}>
						<FormInput
							autoComplete="off"
							{...register('name')}
							placeholder={`Type exact ${identifier} name`}
						/>
					</FormField>

					<FormError>{error}</FormError>
				</Form>
			)}

			<div className="mt-6 flex gap-3">
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
					disabled={confirmBeforeDelete && !inputContainsValidName}
					loading={loading}
				>
					Delete {identifier}
				</IconButton>
			</div>
		</div>
	);
}
export default EntityDeleteDialog;
