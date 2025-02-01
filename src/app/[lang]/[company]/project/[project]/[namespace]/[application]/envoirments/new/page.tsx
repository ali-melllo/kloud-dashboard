import ConfigmapForm from '../Form';

type PropTypes = {
	params : {
		company: string,
		project: string,
		namespace: string,
		application:string
	}
}

export default function EnvironmentsNew({ params }: PropTypes) {
	return <ConfigmapForm params={params} />;
}
