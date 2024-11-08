import React, {useState} from "react";
import { View } from 'react-native';
import { router } from "expo-router";

import { Text, Button, Card, ListItem, Progress, Divider } from '@/common/components';
import { formatPercentValue, formatValue } from "@/common/utils";
import { ScreenLayout } from "@/common/layouts";
import colors from "@/common/colors";

import HomeInfoBottomSheet from "./components/home-info-bottom-sheet/home-info-bottom-sheet";
import styles from './home.styles'
import { HomeInfoSections } from "@/types";

function Home() {
    const [infoSection, setInfoSection] = useState<HomeInfoSections>();
    const hideModal = () => setInfoSection(undefined);
    const showModal = (section: HomeInfoSections) => () => setInfoSection(section);

    const isPortfolioAdded = true;
    const profitOrLoss = 200;
    const profitOrLossPercentage = 20;
    const currency = 'USD';
    const handleOnAddPortfolio = () => {
        router.navigate('/landing');
    }

    return (
        <ScreenLayout title="Home">
            <View style={styles.wrapper}>

            {isPortfolioAdded ? (
                <Card>
                    <Card.Title title="Overall" onPress={showModal(HomeInfoSections.OVERALL)}/>
                    <ListItem
                        leftText="Invested"
                        rightText={formatValue(200, currency)}
                    />
                    <ListItem
                        leftText="Market value"
                        rightText={formatValue(200, currency)}
                    />       
                    <ListItem
                        leftText="Profit/Loss"
                        rightText={`${formatValue(profitOrLoss, currency)} (${formatPercentValue(profitOrLossPercentage)})`}
                        variant={Number(profitOrLoss) > 0 ? ListItem.variants.PROFIT : ListItem.variants.LOSS}
                    />      
                    <ListItem
                        leftText="Dividends last 12 months"
                        rightText={formatValue(200, currency)}
                    />            
                    <Divider />
                    <Card.Title title="Goals" onPress={showModal(HomeInfoSections.GOALS)} />
                    <ListItem
                        leftText="Latest goal achieved"
                        rightText={`${formatValue(200, currency)} / month`}
                    />
                    <ListItem
                        leftText="Next goal"
                        rightText={`${formatValue(400, currency)} / month`}
                    />
                    <View style={styles.goalProgressWrapper}>
                        <View style={styles.goalHeader}>
                            <Text color={colors.secondaryText} variant={Text.variants.H6}>200$</Text>
                            <Text color={colors.primaryText} variant={Text.variants.H5} isBold>86%</Text>
                            <Text color={colors.secondaryText} variant={Text.variants.H6}>400$</Text>
                        </View>
                        <Progress value={86} />                                                     
                    </View>
                </Card>
            ) : (
                <View style={styles.noPortfolio}>
                    <Text>You haven't added a portfolio yet.</Text>
                    <Button label="Add portfolio" onPress={handleOnAddPortfolio}/>
                </View>
            )}
            </View>
            <HomeInfoBottomSheet 
                infoSection={infoSection}
                hideModal={hideModal}
            />
        </ScreenLayout>
    );
}

export default Home;