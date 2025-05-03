import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/config/analytics';
import { useFetchCompaniesOnceADay } from '@/common/hooks';
// import 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useFetchCompaniesOnceADay();

	const [loaded] = useFonts({
		Urbanist: require('@/assets/fonts/Urbanist-Regular.ttf'),
		UrbanistBold: require('@/assets/fonts/Urbanist-Bold.ttf')
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='(onboarding)' options={{ headerShown: false }} />
				<Stack.Screen name='company' options={{ headerShown: false }} />
				<Stack.Screen name='legal' options={{ headerShown: false }} />
				<Stack.Screen name='manage-goals' options={{ headerShown: false }} />
				<Stack.Screen name='update-goal' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' />
			</Stack>
		</SafeAreaProvider>
	);
}
