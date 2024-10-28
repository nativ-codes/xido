import react from "react";
import { View } from 'react-native';

import { Button } from '@/common/components';
import { ScreenLayout } from "@/common/layouts";
import { router } from "expo-router";

function Overview() {

    const handleOnAddPortfolio = () => {
        router.navigate('/landing');
    }

    return (
        <ScreenLayout title="Overview">
            <Button label="Add a portfolio" onPress={handleOnAddPortfolio} />
        </ScreenLayout>
    );
}

export default Overview;