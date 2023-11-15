type ImgProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

export interface TableImageProps extends ImgProps {}

function TableImage(props: TableImageProps) {
	return (
		<div className="m-auto h-12 w-12 ">
			<img
				{...props}
				className="rounded-md"
				width={50}
				height={50}
			/>
		</div>
	);
}
export default TableImage;
