import { Stack } from "expo-router";

function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="landing" />
      <Stack.Screen name="upload-csv" />
      <Stack.Screen name="select-companies" />
      <Stack.Screen name="all-set" />
    </Stack>
  );
}

export default OnboardingLayout;
