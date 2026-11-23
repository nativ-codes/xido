export type EnvType = {
	EXPO_PUBLIC_API_URL: string;
	EXPO_PUBLIC_MIXPANEL_PROJECT_KEY: string;
};

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
