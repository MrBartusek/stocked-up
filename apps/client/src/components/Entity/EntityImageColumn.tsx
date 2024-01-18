import classNames from 'classnames';
import { IImageDto } from 'shared-types';

type ImgProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export interface EntityImageColumnProps extends ImgProps {
	image: IImageDto;
}

function EntityImageColumn({ image, ...props }: EntityImageColumnProps) {
	return (
		<div className="hidden w-48 flex-shrink-0 xl:flex">
			<img
				{...props}
				src={image.url}
				className={classNames(props.className, 'm-auto h-auto w-full rounded-md')}
				width={50}
				height={50}
			/>
		</div>
	);
}
export default EntityImageColumn;
