import classNames from 'classnames';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Dropzone from '../Dropzone';
import FileUploader from '../FileUploader';
import { REGULAR_INPUT_CLASSNAMES } from './regularInputClassnames';

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export interface FormImageInputProps extends InputProps {
	name: string;
	control: Control<any, any>;
}

function FormImageInput({ name, control }: FormImageInputProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<Dropzone
					onChange={onChange}
					render={(isDragActive) => (
						<div
							className={classNames(REGULAR_INPUT_CLASSNAMES, {
								'border-dashed border-primary': isDragActive,
							})}
						>
							<FileUploader
								onChange={onChange}
								value={value}
								isDragActive={isDragActive}
							/>
						</div>
					)}
				/>
			)}
		/>
	);
}

export default FormImageInput;
