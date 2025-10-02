import { Tabs } from "expo-router";

import { screenOptions } from "@/common/constants";

import TabBar from "@/common/containers/tab-bar/tab-bar";

function TabLayout() {
  return (
    <Tabs
      screenOptions={screenOptions}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="companies" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="goals" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

export default TabLayout;
