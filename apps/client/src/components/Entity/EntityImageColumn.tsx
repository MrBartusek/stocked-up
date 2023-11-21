import classNames from 'classnames';
import placeholderImage from '../assets/placeholder.png';

type ImgProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export interface EntityImageColumnProps extends ImgProps {}

function EntityImageColumn({ ...props }: EntityImageColumnProps) {
	return (
		<div className="hidden w-48 flex-shrink-0 xl:flex">
			<img
				src={placeholderImage}
				{...props}
				className={classNames(props.className, 'm-auto h-auto w-full rounded-md')}
				width={50}
				height={50}
			/>
		</div>
	);
}
export default EntityImageColumn;
