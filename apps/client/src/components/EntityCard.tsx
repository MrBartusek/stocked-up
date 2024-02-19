import { IImageDto } from 'shared-types';

export interface EntityCardProps {
	image?: IImageDto;
	entityName: string;
	identifier: string;
}

function EntityCard({ image, entityName, identifier }: EntityCardProps) {
	return (
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
	);
}
export default EntityCard;
