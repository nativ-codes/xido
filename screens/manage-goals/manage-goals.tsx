import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '@/common/colors';
import { Button, Text } from '@/common/components';
import { getGoals } from '@/config/store/slices/user-data';
import { ScreenLayout } from '@/common/layouts';

import styles from './manage-goals.styles'
import { router } from 'expo-router';
import { useMMKVString } from 'react-native-mmkv';
import { sortByNumbers } from '@/common/utils';

function ManageGoals() {
    const insets = useSafeAreaInsets();
    const [goals] = useMMKVString('goals');
    const parsedGoals = sortByNumbers(JSON.parse(goals), item => item.amount);

    const handleOnPress = goal => () => {
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
                <View style={{
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: insets.bottom
                }}>
                    <Button
                        label="Add new goal"
                        onPress={handleOnAddGoal}
                        isDisabled={false}
                        variant={Button.variants.PRIMARY}
                    />                
                </View>
            </>
    )
}

export default ManageGoals;