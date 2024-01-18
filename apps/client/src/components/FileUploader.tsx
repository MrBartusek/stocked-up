import { BsCloudUploadFill, BsTrashFill } from 'react-icons/bs';
import { IImageDto } from 'shared-types';

export interface FileUploaderProps {
	value: IImageDto;
	isDragActive?: boolean;
	onChange: (file: IImageDto) => void;
}

function FileUploader({ value, isDragActive, onChange }: FileUploaderProps) {
	const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onChange({ hasImage: false });
	};

	if (isDragActive) {
		return (
			<div className="flex h-20 flex-1 items-center justify-center">
				<span className="link-primary flex items-center gap-3 text-xl">
					<BsCloudUploadFill /> <span>Drop to upload</span>
				</span>
			</div>
		);
	}
	return (
		<div className="flex h-20 items-center gap-6">
			<div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
				<div
					style={{ backgroundImage: `url('${value.url || '/api/images/default'}')` }}
					className="h-full w-auto bg-cover bg-center"
				/>
			</div>
			<div className="flex flex-col">
				<button
					className="link-primary flex items-center gap-2"
					onClick={(e) => e.preventDefault()}
				>
					<BsCloudUploadFill /> <span>{value.hasImage ? 'Change image' : 'Upload image'}</span>
				</button>
				{value.hasImage && (
					<button
						className="link-primary flex items-center gap-2"
						onClick={handleRemove}
					>
						<BsTrashFill /> <span>Remove image</span>
					</button>
				)}
			</div>
		</div>
	);
}
export default FileUploader;
