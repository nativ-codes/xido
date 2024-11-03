import React from 'react';
import { View, TouchableOpacity, Linking, Alert } from 'react-native';

import { Text, Card, ListItem } from '@/common/components';
import { ScreenLayout } from '@/common/layouts';
import { LegalTypes } from '@/types';
import { router } from 'expo-router';
import colors from '@/common/colors';

import styles from './settings.styles'

function Settings() {
    const handleOnManageGoals = () => router.push('/manage-goals');
    const handleOnImportNewPortfolio = () => {};
    const handleOnRemoveData = () => Alert.alert('Remove data', 'This will permanently remove all data stored in the app, including imported transactions and generated insights.\nThis action cannot be undone.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive' }
    ]);

    const handleOnTermsAndConditions = () => 
        router.push(`/legal?type=${LegalTypes.TERMS_AND_CONDITIONS}`);

    const handleOnPrivacyPolicy = () =>
        router.push(`/legal?type=${LegalTypes.PRIVACY_POLICY}`);

    // TODO: Update link
    const handleOnFeedback = () =>
        Linking.openURL('https://nativ.codes#contact');

    return (
        <ScreenLayout title="Settings">
            <View style={styles.cardsWrapper}>
                <Card>
                    <TouchableOpacity onPress={handleOnManageGoals}>
                        <ListItem leftText="Manage goals" rightIcon="chevron-right" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnImportNewPortfolio}>
                        <ListItem leftText="Import new portfolio" rightIcon="chevron-right" />
                    </TouchableOpacity>                                     
                </Card>
                <Card>
                    <TouchableOpacity onPress={handleOnTermsAndConditions}>
                        <ListItem leftText="Terms and Conditions" rightIcon="chevron-right" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnPrivacyPolicy}>
                        <ListItem leftText="Privacy Policy" rightIcon="chevron-right" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnFeedback}>
                        <ListItem leftText="Send us your feedback" rightIcon="chevron-right" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity onPress={handleOnRemoveData}>
                        <ListItem leftText="Remove data" rightIcon="chevron-right" />
                    </TouchableOpacity>
                </Card>
                <View style={styles.footer}>
                    <Text color={colors.secondaryText} variant={Text.variants.H5}>Xido v1.0.0</Text>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default Settings;