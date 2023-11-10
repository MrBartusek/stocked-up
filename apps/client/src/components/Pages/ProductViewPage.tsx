import { useParams } from 'react-router-dom';

function ProductViewPage() {
	const { id } = useParams();

	return <div>{id}</div>;
}

export default ProductViewPage;
