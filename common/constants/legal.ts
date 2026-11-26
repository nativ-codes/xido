const TermsAndConditions = {
	title: 'Terms and Conditions',
	lastUpdated: 'Last Updated: 26 November 2026',
	sections: [
		{
			title: 'Acceptance of Terms',
			content:
				"By downloading and using this application ('Xido'), you agree to comply with these Terms and Conditions. Please review them carefully before using Xido."
		},
		{
			title: 'Purpose of Xido',
			sections: [
				{
					content:
						'User-Provided Data: Xido reads the transaction report files (XLSX or CSV) that you choose to import from your broker. The transaction data is only used to generate portfolio statistics and charts on your device.'
				},
				{
					content:
						'Third-Party Data: Xido fetches current market data (e.g., company information, stock prices, dividends) from third-party providers to supplement your portfolio analysis. This data is used solely for the purpose of enhancing your experience with Xido.'
				},
				{
					content:
						"Analytics: Xido uses Mixpanel to collect data about how Xido is used. This helps us understand user behavior to improve Xido's functionality and user experience. See the Privacy Policy for details."
				}
			]
		},
		{
			title: 'Not Investment Advice',
			content:
				'Xido is a tool for tracking and visualizing your own portfolio. Nothing in Xido is financial, investment, tax, or legal advice, or a recommendation to buy, sell, or hold any security. Market data may be delayed, incomplete, or inaccurate. Always verify information with your broker and consult a qualified professional before making investment decisions.'
		},
		{
			title: 'No Affiliation',
			content:
				'Xido is an independent app and is not affiliated with, endorsed by, or sponsored by XTB S.A. or any other broker or data provider. All trademarks belong to their respective owners and are used only to describe which report formats Xido can import.'
		},
		{
			title: 'Data Storage',
			content:
				'Your imported transactions and the portfolio statistics generated from them are stored exclusively on your device. Xido has no user accounts and does not upload your transaction files. To retrieve market data, Xido sends the ticker symbols of your holdings through our server to a third-party data provider, as described in the Privacy Policy.'
		},
		{
			title: 'User Responsibilities',
			content:
				'You are responsible for maintaining the confidentiality of your data and for any actions taken using Xido on your device. We are not liable for any unauthorized access to your data resulting from your failure to secure your device.'
		},
		{
			title: 'Third-Party Services',
			content:
				'Xido integrates with third-party data providers, including financial data APIs, for up-to-date information on companies. While we strive to ensure the accuracy of the data, we cannot guarantee its availability or reliability and assume no responsibility for any inaccuracies, delays, or inconsistencies in third-party data.'
		},
		{
			title: 'Disclaimer of Warranties',
			content:
				"Xido is provided 'as-is' without any warranties of any kind, either express or implied. We do not warrant that Xido will be error-free, or that any information provided within Xido will be complete, accurate, or up to date."
		},
		{
			title: 'Limitation of Liability',
			content:
				'To the fullest extent permitted by applicable law, we shall not be liable for any damages arising from your use of Xido, including but not limited to direct, indirect, incidental, or consequential damages, or any losses resulting from investment decisions made based on information shown in Xido.'
		},
		{
			title: 'Changes to Terms and Conditions',
			content:
				'We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be effective immediately upon posting the revised terms in Xido.'
		},
		{
			title: 'Contact Information',
			content:
				'If you have any questions or concerns about these Terms and Conditions, please contact us at hello@nativ.codes'
		}
	]
};

const PrivacyPolicy = {
	title: 'Privacy Policy',
	lastUpdated: 'Last Updated: 26 November 2026',
	sections: [
		{
			title: 'Introduction',
			content:
				"This Privacy Policy describes how Xido ('we,' 'us,' or 'our') collects, uses, and shares information when you use our mobile application for tracking Dividend Growth Investing (DGI) portfolios based on transaction reports exported from the XTB broker platform. Xido is not affiliated with XTB S.A. We respect your privacy and are committed to protecting it."
		},
		{
			title: 'Data Collection',
			sections: [
				{
					content:
						'User-Provided Data: Xido reads the transaction report files (XLSX or CSV) that you export from the XTB broker platform and choose to import. Your transactions are processed only on your device and are never uploaded.'
				},
				{
					content:
						'Market Data Requests: To show current prices and company information, Xido sends the ticker symbols of your holdings (for example, "AAPL") to our server, which forwards them to a third-party market data provider. No transaction amounts, quantities, or other portfolio details are sent. Our server processes your IP address to prevent abuse (rate limiting) and may keep short-lived technical logs; it does not store your portfolio.'
				},
				{
					content:
						'Analytics Data: Xido uses Mixpanel to understand how the app is used. We send in-app events (such as features used and errors encountered), your device model, the ticker symbols you import and select, and the titles and amounts of savings goals you create. We do not collect your name, email address, or account credentials, and we do not use this data for advertising or tracking across other apps.'
				}
			]
		},
		{
			title: 'Data Storage',
			content:
				'Your imported transactions, generated statistics, and settings are stored solely on your device. The only data that leaves your device is the market data requests and analytics data described above. Analytics data is stored by Mixpanel on servers in the European Union.'
		},
		{
			title: 'Third-Party Services',
			content: 'We use the following third-party services:',
			sections: [
				{
					content:
						'Cloudflare: hosts the server that forwards market data requests. Cloudflare processes request data, including your IP address, under its own Privacy Policy.'
				},
				{
					content:
						'Market Data Providers: supply financial and market data based on the ticker symbols requested. While we strive to use reliable sources, we cannot guarantee the accuracy or completeness of third-party data.'
				},
				{
					content:
						"Mixpanel: processes the analytics data described above. Mixpanel's Privacy Policy applies to its handling of analytics data."
				}
			]
		},
		{
			title: 'Data Security',
			content:
				'We implement standard security practices, including encrypted (HTTPS) connections for all data sent from Xido. However, we cannot guarantee the absolute security of your information due to the inherent nature of digital networks.'
		},
		{
			title: 'User Rights',
			content:
				'You have full control over the data stored on your device: use "Remove data" in Settings or delete Xido to permanently remove it. To request access to or deletion of analytics data associated with your device, contact us at hello@nativ.codes.'
		},
		{
			title: "Children's Privacy",
			content:
				'Xido is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have inadvertently collected such information, we will take steps to delete it.'
		},
		{
			title: 'Changes to This Privacy Policy',
			content:
				'We may update this Privacy Policy periodically. Any changes will be posted in Xido, and continued use of the app will constitute acceptance of any changes.'
		},
		{
			title: 'Contact Us',
			content:
				'If you have questions about this Privacy Policy or your privacy rights, please contact us at hello@nativ.codes.'
		}
	]
};

const Legal = {
	TermsAndConditions,
	PrivacyPolicy
};

export { Legal };
