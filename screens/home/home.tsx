import React, { useState } from 'react';

import { getOverall } from '@/common/utils';
import { ScreenLayout } from '@/common/layouts';
import Store from '@/config/store/slices/user-data';

import HomeInfoBottomSheet from './components/home-info-bottom-sheet/home-info-bottom-sheet';
import { HomeInfoSections } from '@/types';
import Spacer from '@/common/layouts/spacer/spacer';
import GoalAchievementSection from './components/goal-achievement-section/goal-achievement-section';
import PortfolioInvestmentCard from './components/portfolio-investment-card/portfolio-investment-card';
import PortfolioDividendCard from './components/portfolio-dividend-card/portfolio-dividend-card';

function Home() {
	const userData = Store.useUserData();
	const overall = getOverall(userData);
	const currency = Store.useCurrency();

	const [infoSection, setInfoSection] = useState<HomeInfoSections>();
	const hideModal = () => setInfoSection(undefined);
	const showModal = (section: HomeInfoSections) => () => setInfoSection(section);

	return (
		<ScreenLayout title='Home' isEmpty={!Boolean(Object.values(userData).length)}>
			<Spacer direction='horizontal' size='s16' gap='s16'>
				<GoalAchievementSection />
				<PortfolioInvestmentCard
					currency={currency}
					overall={overall}
					onInfoPress={showModal(HomeInfoSections.PORTFOLIO)}
				/>
				<PortfolioDividendCard
					currency={currency}
					overall={overall}
					onInfoPress={showModal(HomeInfoSections.DIVIDENDS)}
				/>
			</Spacer>

			<HomeInfoBottomSheet infoSection={infoSection} hideModal={hideModal} />
		</ScreenLayout>
	);
}

export default Home;
