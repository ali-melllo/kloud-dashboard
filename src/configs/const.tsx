import {
	CheckCircle, CircleNotch,
	PauseCircle, RocketLaunch, XCircle,
} from '@phosphor-icons/react';

export default {
	dynamicFormMap: {
		string: 'text',
		dropdown: 'select',
		number: 'number',
		tag: 'multiselect',
		password: 'password',
	},
	pipelinesColorMap: {
		Failed: 'destructive',
		Pending: 'warning',
		Succeeded: 'success',
		Started: 'info',
		Break: 'destructive',
		Pause: 'info',
		Timeout: 'destructive',
	},
	pipelinesIconMap: {
		Failed: XCircle,
		Pending: CircleNotch,
		Succeeded: CheckCircle,
		Started: RocketLaunch,
		Break: XCircle,
		Pause: PauseCircle,
		Timeout: XCircle,
	},
	servicesColorMap: {
		Ready: 'success',
		Installing: 'info',
		Pending: 'warning',
	},
	applicationsColorMap: {
		Available: 'success',
		Progressing: 'warning',
	},
	projectsColorMap: {
		active: 'success',
	},
	gatewaysColorMap: {
		True: 'success',
		False: 'destructive',
	},
	projectNavbarItems: [
		{ label: 'Overview', key: 'overview' },
		{ label: 'Pipelines', key: 'pipeline' },
		{ label: 'Container', key: 'container' },
		{ label: 'Environments', key: 'envoirments' },
		{ label: 'Settings', key: 'settings' },
	],
	applicationNavbarItems: [
		{ label: 'Overview', key: 'overview' },
		{ label: 'Gateways', key: 'gateways' },
		{ label: 'Settings', key: 'setting' },
		// { label: 'New Application', key: 'new' },
	],

	CompanyNavBarItems: [
		{ label: 'Billing', key: 'billing' },
		{ label: 'Projects', key: 'project' },
		{ label: 'Home', key: 'home' },
		{ label: 'Profile', key: 'profile' },
		{ label: 'Tickets', key: 'tickets' },
	],
	ProfileNavBarItems: [
		{ label: 'Profile Detail', key: 'detail' },
	],
	TerminalNavBarItems: [
		{ label: 'Files', key: 'files' },
		{ label: 'Containers List', key: 'list' },
		{ label: 'Logs', key: 'logs' },
		{ label: 'Terminal', key: 'terminal' },
	],
	settingNavbarItems: [
		{ label: 'General', key: 'general' },
		{ label: 'Namespace', key: 'namespace' },
		{ label: 'Kube Ctl', key: 'kubectl' },
		{ label: 'Volume', key: 'volume' },
	],
	applicationSettingItems: [
		{ label: 'General', key: 'list' },
		{ label: 'Build Environments', key: 'build_env' },
		{ label: 'Installation', key: 'installation' },
		{ label: 'Kube Ctl', key: 'kubectl' },
		{ label: 'Volume', key: 'volume' },
	],

} as const;
