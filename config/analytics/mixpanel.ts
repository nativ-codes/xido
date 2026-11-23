import DeviceInfo from 'react-native-device-info';
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = false;

// Keep plain `process.env.X`: babel-preset-expo only inlines that exact shape in release builds (a cast left it undefined → native crash).
const mixpanelInstance = new Mixpanel(process.env.EXPO_PUBLIC_MIXPANEL_PROJECT_KEY, trackAutomaticEvents);
mixpanelInstance.init();
mixpanelInstance.setServerURL('https://api-eu.mixpanel.com');
mixpanelInstance.identify(DeviceInfo.getDeviceId());

export { mixpanelInstance };
