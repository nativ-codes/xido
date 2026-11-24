import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

import { Colors, MEDIUM_ANIMATION_DURATION } from '@/common/constants';
import { Button, Text } from '@/common/components';
import Store from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';
import { sortByNumbers } from '@/common/utils';
import { GoalsPropTypes } from '@/types';

import styles from './manage-goals.styles';
import Animated, { FadeInDown } from 'react-native-reanimated';

function ManageGoals() {
	const goals = Store.useGoals();
	const parsedGoals = sortByNumbers(goals, (item) => item.amount);

	const handleOnPress = (goal: GoalsPropTypes) => () => {
		router.navigate(`/update-goal?goalId=${goal.id}`);
	};

	const handleOnAddGoal = () => {
		router.navigate('/update-goal');
	};

	return (
		<ScreenLayout
			canGoBack
			footer={<Button label='Add new goal' onPress={handleOnAddGoal} isDisabled={false} variant='primary' />}>
			<View style={styles.wrapper}>
				<Text variant='h2' isBold>
					Manage goals
				</Text>
				{parsedGoals.map((goal, key) => (
					<Animated.View key={goal.id} entering={FadeInDown.duration(MEDIUM_ANIMATION_DURATION).delay(100 * key)}>
						<TouchableOpacity
							onPress={handleOnPress(goal)}
							activeOpacity={0.7}
							style={styles.cardWrapper}>
							<View style={styles.leftCard}>
								<Text isBold>${goal.amount} / month</Text>
								<Text>{goal.title}</Text>
							</View>
							<View>
								<Ionicons name='chevron-right' size={24} color={Colors.primaryText} />
							</View>
						</TouchableOpacity>
					</Animated.View>
				))}
			</View>
		</ScreenLayout>
	);
}

export default ManageGoals;
