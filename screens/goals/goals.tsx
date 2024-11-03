import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { useMMKVString } from 'react-native-mmkv';

import { ScreenLayout } from '@/common/layouts';
import { Text } from '@/common/components';
import colors from '@/common/colors';
import { parseGoals, sortByNumbers } from '@/common/utils';
import { getLast12MonthsDividend } from '@/config/store/slices/user-data';

import styles from './goals.styles';

function Goals() {
    const [storeGoals] = useMMKVString('goals');
    const parsedGoals = JSON.parse(storeGoals || '[]');
    const value = getLast12MonthsDividend();

    const goals = parseGoals({
        goals: sortByNumbers(parsedGoals, item => item.amount),
        value
    });

    const renderChecked = (
        <View style={styles.checked}>
            <Ionicons name="check" size={24} color={colors.background} />
        </View>        
    )

    const renderNotChecked = (
        <View style={styles.notChecked} />
    )

    return (
        <ScreenLayout title="Goals">
            <View style={styles.wrapper}>
                {goals.map((goal, key) => (
                    <View key={`${goal.title}-${goal.amount}`} style={styles.cardWrapper}>
                        <View style={StyleSheet.compose(styles.line, 
                            key === 0 
                                ? styles.lineStart 
                                : key === parsedGoals.length - 1 
                                    ? styles.lineEnd 
                                    : styles.lineMiddle
                        )} />
                        {goal.isGoalAchieved ? renderChecked : renderNotChecked}
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <Text variant={Text.variants.H5} color={colors.secondaryText}>
                                    {`${goal.isGoalAchieved ? '100%' : goal.progress} progress`}
                                </Text>
                                <Text isBold>${goal.amount} / month</Text>
                            </View>
                            <Text>{goal.title}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScreenLayout>
    )
};

export default Goals;