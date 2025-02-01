import LoadingCart from '../../../../components/LoadingCart';

export default function OverviewLoadingLayout() {
	return (
		<>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
				<LoadingCart className="w-full flex-auto h-48" />
				<LoadingCart className="w-full flex-auto h-48" />
				<LoadingCart className="w-full flex-auto h-48" />
				<LoadingCart className="w-full flex-auto h-48" />
				<LoadingCart className="w-full flex-auto h-48" />
				<LoadingCart className="w-full flex-auto h-48" />
			</div>
			{/* <div className="w-full flex flex-row gap-3 mt-5 flex-wrap" /> */}
		</>
	);
}
