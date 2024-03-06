import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { To, useNavigate } from 'react-router-dom';
import { IImageDto } from 'shared-types';
import { Utils } from '../../utils/utils';
import Button from '../Button';
import EntityCard from '../EntityCard';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import IconButton from '../IconButton';
import Alert from '../Helpers/Alert';

export interface EntityDeleteDialogProps {
	entityName: string;
	entityId: string;
	resourceName: string;
	identifier: string;
	deletedItems?: string[];
	confirmBeforeDelete?: boolean;
	image?: IImageDto;
	navigateTo?: To;
}

function EntityDeleteDialog({
	entityName,
	entityId,
	resourceName,
	identifier,
	deletedItems = [],
	confirmBeforeDelete = false,
	navigateTo = '..',
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
			.then(() => {
				navigate(navigateTo);
				toast.success(`Successfully deleted ${identifier}`);
				queryClient.invalidateQueries([resourceName]);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<div className="flex flex-col">
			{error && <Alert className="mb-8">{error}</Alert>}

			<h1 className="mb-2 text-3xl">Confirm the action</h1>
			<p className="text-muted">Do you really want to delete this entity:</p>

			<EntityCard
				image={image}
				identifier={identifier}
				entityName={entityName}
			/>

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
					onSubmit={(e) => e.preventDefault()}
				>
					<FormField label={`Confirm ${identifier} name to delete`}>
						<FormInput
							autoComplete="off"
							{...register('name')}
							placeholder={`Type exact ${identifier} name`}
						/>
					</FormField>
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
