import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import {Text} from '@/common/components'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>This screen doesn't exist</Text>
    </>
  );
}

