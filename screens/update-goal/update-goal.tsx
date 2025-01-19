import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Button, Text } from '@/common/components';
import Store from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';
import { getRandomString } from '@/common/utils';
import { GoalsPropTypes } from '@/types';

import styles from './update-goal.styles';

function UpdateGoal() {
	const { goalId }: { goalId: string } = useLocalSearchParams();
	const goals = Store.useGoals();
	const goal = goals.find((goal: GoalsPropTypes) => goal.id === goalId) || {amount: 0, title: ''};
	const isAdd = !goalId;

	const [amount, setAmount] = useState(goal.amount?.toString() || '');
	const [title, setTitle] = useState(goal.title || '');

	const isButtonDisabled = !Number(amount) || !title;

	const handleOnUpdate = () => {
		if (isAdd) {
			Store.setGoals([
				...goals,
				{
					id: getRandomString(),
					amount: amount,
					title
				}
			]);
		} else {
			const updatedGoal = goals.map((goal: GoalsPropTypes) =>
				goal.id === goalId
					? {
							...goal,
							amount,
							title
					  }
					: goal
			);

			Store.setGoals(updatedGoal);
		}
		router.back();
	};

	const removeGoal = () => {
		const updatedGoal = goals.filter((goal: GoalsPropTypes) => goal.id !== goalId);
		Store.setGoals(updatedGoal);
		router.back();
	};

	const handleOnRemove = () =>
		Alert.alert('Remove goal', 'Are you sure you want to remove this goal?', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Remove',
				style: 'destructive',
				onPress: removeGoal
			}
		]);

	return (
		<ScreenLayout canGoBack title={isAdd ? 'Add goal' : 'Update goal'}>
			<View style={styles.wrapper}>
				<View style={styles.content}>
					<View style={styles.section}>
						<Text isBold>Monthly amount</Text>
						<TextInput value={amount} style={styles.textInput} placeholder='E.g. 5' onChangeText={setAmount} />
					</View>
					<View style={styles.section}>
						<Text isBold>Spend on</Text>
						<TextInput value={title} style={styles.textInput} placeholder='A good book' onChangeText={setTitle} />
					</View>
				</View>
				<View style={styles.buttonsWrapper}>
					{!isAdd && <Button label='Remove goal' onPress={handleOnRemove} variant="danger" />}
					<Button
						label={isAdd ? 'Add goal' : 'Save goal'}
						onPress={handleOnUpdate}
						isDisabled={isButtonDisabled}
						variant="primary"
					/>
				</View>
			</View>
		</ScreenLayout>
	);
}

export default UpdateGoal;
