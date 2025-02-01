export default {

	// App Specific
	API_ERROR_TOAST_THRESHOLD: 3000, // milliseconds

	// Platform Specific
	APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,

	// Server Specific
	API_URL: process.env.NEXT_PUBLIC_API_URL as string,

	// Sentry Specific
	SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};
