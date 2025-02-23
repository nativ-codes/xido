import { mixpanelInstance } from './mixpanel';

enum EventTypeEnum {
	uploaded_companies = 'uploaded_companies',
	selected_companies = 'selected_companies',
	error_fetch = 'error_fetch',
	error_daily_fetch = 'error_daily_fetch',
	remove_goal = 'remove_goal',
	edit_goal = 'edit_goal',
	add_goal = 'add_goal',
	remove_data = 'remove_data',
	import_portfolio = 'import_portfolio',
	fetch_companies = 'fetch_companies'
}

type DataType = Record<string, any> | string;

const sendEvent = (eventType: EventTypeEnum, data: DataType = '') => {
	const stringifiedData = JSON.stringify(data);

	console.log('Event', eventType, stringifiedData);
	mixpanelInstance.track(eventType, { data: stringifiedData });
};

export default {
	events: EventTypeEnum,
	sendEvent
};
