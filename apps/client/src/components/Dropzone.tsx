import PromiseFileReader from 'promise-file-reader';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { IImageDto } from 'shared-types';

export interface DropzoneProps {
	onChange: (file: IImageDto) => void;
	render: (isDragActive: boolean) => React.ReactNode;
}

function Dropzone({ onChange, render }: DropzoneProps) {
	const onDrop = async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];

		const oneMb = 1000000;
		const fileToLarge = file.size > 5 * oneMb;
		if (fileToLarge) {
			toast.error('Uploaded file is to large! Max file size is: 5MB');
			return;
		}

		const url = await PromiseFileReader.readAsDataURL(file);

		onChange({ hasImage: true, url, data: url });
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
	});
	const children = useMemo(() => render(isDragActive), [isDragActive, render]);

	return (
		<div
			{...getRootProps()}
			className="flex-1"
		>
			<input {...getInputProps()} />
			{children}
		</div>
	);
}
export default Dropzone;
