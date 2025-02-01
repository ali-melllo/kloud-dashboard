// import { Linking } from 'react-native';
// import { match } from 'path-to-regexp';

type URLParamKey = string;
type URLParamValue = string | number | boolean;
type URLParams = Record<URLParamKey, URLParamValue>;

const UrlUtils = {

	/**
		Convert param object into query string
		eg.
			{foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
			->
			foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
	*/
	serialize(params: URLParams, prefix?: string) {
		const str: string[] = [];
		Object.keys(params)
			.forEach(p => {
				const k = prefix ? `${prefix}[${p}]` : p;
				const v = params[p];

				if (encodeURIComponent(v) !== null && encodeURIComponent(v) !== '') {
					str.push((v !== null && typeof v === 'object')
						? this.serialize(v, k)
						: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
				}
			});

		return str.join('&');
	},

	/*
		Convert query string into param object
		eg.
			"foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3"
			->
			{foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
	*/
	deserialize(string: string) {
		const pairs = string.slice(1)
			.split('&');

		const result: URLParams = {};
		pairs.forEach(pair => {
			const [first, ...rest] = pair.split('=');
			result[first] = decodeURIComponent(rest ? rest.join('=') : '');
		});

		return JSON.parse(JSON.stringify(result));
	},

	/*
		Replace matching params in URL
		eg.
		url: /recipes/:key/foo params: { key: '123' }
		->
		/recipes/123/foo
	*/
	makeUrlWithParams(url: string, params?: URLParams) {
		if (!params) return url;

		const finalParams = { ...params };
		let finalUrl = url;
		let urlParams = '';

		Object.keys(finalParams).forEach(key => {
			const value: URLParamValue = finalParams[key];
			finalUrl = finalUrl.replace(`:${key}`, `${value}`);
			delete finalParams[key];
		});

		// Add the rest of the params as a query string if any exist
		if (Object.keys(finalParams).length) {
			urlParams = `?${UrlUtils.serialize(finalParams)}`;
		}

		return finalUrl + urlParams;
	},

	parseUrl(url: string) {
		const m = url.match(/^(([^:/?#]+:)?(?:\/\/((?:([^/?#:]*):([^/?#:]*)@)?([^/?#:]*)(?::([^/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/);
		if (!m) return '';

		const r = {
			hash: m[10] || '', // #asd
			host: m[3] || '', // localhost:257
			hostname: m[6] || '', // localhost
			href: m[0] || '', // http://username:password@localhost:257/deploy/?asd=asd#asd
			origin: m[1] || '', // http://username:password@localhost:257
			pathname: m[8] || (m[1] ? '/' : ''), // /deploy/
			port: m[7] || '', // 257
			protocol: m[2] || '', // http:
			queryString: m[9] || '', // ?asd=asd
			username: m[4] || '', // username
			password: m[5] || '', // password
			queryObject: {},
		};

		if (r.queryString) {
			r.queryObject = UrlUtils.deserialize(m[9]);
		}

		if (r.protocol) {
			r.protocol = r.protocol.replace(':', '');
		}

		if (r.protocol.length === 2) {
			r.protocol = `file:///${r.protocol.toUpperCase()}`;
			r.origin = `${r.protocol}//${r.host}`;
		}

		r.href = r.origin + r.pathname + r.queryString + r.hash;
		return r;
	},

	// handleDeepLink(link, props) {
	// 	if (!link) return;

	// 	const newLink = link.replace('bookapo://bookapo.com', 'https://bookapo.com');

	// 	const urlObject = Util.parseUrl(newLink);
	// 	let {
	// 		host, queryObject, protocol, pathname,
	// 	} = urlObject;

	// 	let params = {
	// 		...props,
	// 		...queryObject,
	// 	};

	// 	// from Branch
	// 	if (host === APP_CONSTANTS.BRANCH_HOST_NAME) {
	// 		if (!params.$deeplink_path) return;

	// 		const branchDeeplinkPath = Util.parseUrl(params.$deeplink_path);
	// 		pathname = branchDeeplinkPath.pathname;
	// 		params = { ...params, ...branchDeeplinkPath.queryObject };
	// 	}

	// 	// From player
	// 	if (protocol === 'trackplayer' && host === 'notification.click') {
	// 		if (props.book) {
	// 			NavigationManager.navigate('bookPage', { ...params, initialScreen: 'listen' });
	// 		}
	// 		return;
	// 	}

	// 	// should open in browser
	// 	// TODO: REMOVE THIS CONDITION LATER
	// 	if (host.includes('bookapo.com')) {
	// 		Util.handleWebsiteLink(newLink, false, props.t);
	// 		return;
	// 	}

	// 	// match routes
	// 	for (const r in APP_ROUTES) {
	// 		const route = APP_ROUTES[r];
	// 		const matcher = match(route.link);
	// 		const matched = matcher(pathname);

	// 		if (matched) {
	// 			NavigationManager.push(r, { ...matched.params, ...params });
	// 			break;
	// 		}
	// 	}
	// },

	// handleWebsiteLink(link, isWebview, accessToken) {
	// 	let finalLink;
	// 	if (!link.includes('https://')) {
	// 		finalLink = `https://${link}`;
	// 	}
	// 	else {
	// 		finalLink = link;
	// 	}
	// 	const urlObject = UrlUtils.parseUrl(finalLink);
	// 	const { host, origin } = urlObject;

	// 	if (host.includes('bookapo.com')) {
	// 		finalLink = Util.makeUrlWithParams(`${origin}/auto-login`, {
	// 			webview: isWebview,
	// 			t: accessToken,
	// 			redirect: finalLink,
	// 			vendor: APP_CONSTANTS.APP_VENDOR,
	// 			appVersion: APP_CONSTANTS.APP_VERSION,
	// 		});
	// 	}
	// 	if (!isWebview) {
	// 		Linking.canOpenURL(finalLink).then(supported => {
	// 			if (supported) Linking.openURL(finalLink);
	// 		});
	// 	}
	// 	return finalLink;
	// },
};

export default UrlUtils;
