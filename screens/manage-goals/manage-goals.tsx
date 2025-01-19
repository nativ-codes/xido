import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import colors from '@/common/colors';
import { Button, Text } from '@/common/components';
import Store from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';
import { sortByNumbers } from '@/common/utils';
import { GoalsPropTypes } from '@/types';

import styles from './manage-goals.styles'

function ManageGoals() {
    const insets = useSafeAreaInsets();
    const goals = Store.useGoals();
    const parsedGoals = sortByNumbers(goals, item => item.amount);

    const handleOnPress = (goal: GoalsPropTypes) => () => {
        router.navigate(`/update-goal?goalId=${goal.id}`);
    }

    const handleOnAddGoal = () => {
        router.navigate('/update-goal');
    }

    return (
        <>
            <ScreenLayout canGoBack title="Manage goals">
                <View style={styles.wrapper}>
                    {parsedGoals.map((goal) => (
                        <TouchableOpacity key={goal.id} onPress={handleOnPress(goal)} activeOpacity={0.7} style={styles.cardWrapper}>
                            <View style={styles.leftCard}>
                                <Text isBold>${goal.amount} / month</Text>
                                <Text>{goal.title}</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-right" size={24} color={colors.primaryText} />
                            </View>
                        </TouchableOpacity>
                    ))}
            </View>
            </ScreenLayout>
            <View style={StyleSheet.compose(styles.floatingButton, {
                bottom: insets.bottom
            })}>
                <Button
                    label="Add new goal"
                    onPress={handleOnAddGoal}
                    isDisabled={false}
                    variant="primary"
                />                
            </View>
        </>
    )
}

export default ManageGoals;