import DeviceInfo from 'react-native-device-info';
import { Mixpanel } from 'mixpanel-react-native';

import { EnvType } from '@/types';

const trackAutomaticEvents = false;

const mixpanelInstance = new Mixpanel((process.env as EnvType).EXPO_PUBLIC_MIXPANEL_PROJECT_KEY, trackAutomaticEvents);
mixpanelInstance.init();
mixpanelInstance.setServerURL('https://api-eu.mixpanel.com');
mixpanelInstance.identify(DeviceInfo.getDeviceId());

export { mixpanelInstance };
