const TermsAndConditions = {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated: 28 October 2024",
    sections: [{
        title: "Acceptance of Terms",
        content: "By downloading and using this application('App'), you agree to comply with these Terms and Conditions. Please review them carefully before using the App."
    }, {
        title: "Purpose of the App",
        sections: [{
            content: 'User-Provided Data: The App accesses data from CSV files that you choose to import. The data is only used to generate portfolio statistics and charts on your device.'
        }, {
            content: 'Third-Party Data: The App may fetch current market data (e.g., company values, stock prices) from third-party providers to supplement your portfolio analysis. This data is used solely for the purpose of enhancing your experience with the App.'
        }, {
            content: 'Mixpanel Tracking: The App uses Mixpanel to collect anonymous data about how the App is used. This helps us understand user behavior to improve the app\'s functionality and user experience. No personally identifiable information is collected, and all information collected is solely for enhancing the app experience.'
        }]
    }, {
        title: "Data Storage",
        content: "All data processed by the App is stored exclusively on your device. The App does not utilize any form of cloud storage or server - based backend, meaning that we have no access to your personal data."
    }, {
        title: "User Responsibilities",
        content: "You are responsible for maintaining the confidentiality of your data and for any actions taken using the App on your device.We are not liable for any unauthorized access to your data resulting from your failure to secure your device."
    }, {
        title: "Third - Party Services",
        content: "The App may integrate or interact with third - party data providers, including financial data APIs for up - to - date information on companies. While we strive to ensure the accuracy of the data, we cannot guarantee its reliability and assume no responsibility for any inaccuracies or inconsistencies in third - party data."
    }, {
        title: "Disclaimer of Warranties",
        content: "The App is provided 'as-is' without any warranties of any kind, either express or implied. We do not warrant that the App will be error - free, or that any information provided within the App will be completely accurate or up to date."
    }, {
        title: "Limitation of Liability",
        content: "To the fullest extent permitted by applicable law, we shall not be liable for any damages arising from your use of the App, including but not limited to direct, indirect, incidental, or consequential damages."
    }, {
        title: "Changes to Terms and Conditions",
        content: "We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be effective immediately upon posting the revised terms in the App."
    }, {
        title: "Contact Information",
        content: "If you have any questions or concerns about these Terms and Conditions, please contact us at hello@nativ.codes"
    }]
}

const PrivacyPolicy = {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: 28 October 2024",
    sections: [{
        title: "Introduction",
        content: "This Privacy Policy describes how the App('we,' 'us,' or 'our') collects, uses, and shares information when you use our mobile application for tracking Dividend Growth Investing(DGI) portfolios based on CSV data exported from the XTB broker platform.We respect your privacy and are committed to protecting it."
    }, {
        title: "Data Collection",
        sections: [{
            content: "User-Provided Data: The App requires you to upload CSV transaction files exported from the XTB broker platform.This data is only used locally on your device to analyze and generate portfolio statistics."
        }, {
            content: "Third-Party Data: To enhance the App's functionality, we retrieve additional data, such as real-time market information on companies and stock prices, from a third-party provider. This information is used solely for in-app calculations and analysis."
        }, {
            content: "Analytics Data: The App uses Mixpanel for user analytics, collecting anonymous information about App usage(e.g., features accessed, time spent in the App). This data does not include personally identifiable information and is used solely to help us improve the App's user experience."
        }]
    }, {
        title: "Data Storage",
        content: "All user-provided and generated data(such as analytics, CSV data, and third-party data) is stored solely on your device. The App does not store, transfer, or back up data to any cloud or external server, nor do we have any access to the data stored on your device."
    }, {
        title: "Third-Party Services",
        content: "We use third-party services to enhance your experience, including:",
        sections: [{
            content: "Third-Party Data Providers: The App retrieves financial and market data from third-party providers to supplement the CSV transactions you import. While we strive to use reliable sources, we cannot guarantee the accuracy or completeness of third-party data."
        }, {
            content: "Mixpanel Analytics: Mixpanel anonymously tracks App usage to help us improve the App. This data does not identify individual users, and Mixpanel's Privacy Policy applies to their handling of analytics data."
        }]
    }, {
        title: "Data Security",
        content: "We implement standard security practices to help keep your data safe on your device. However, we cannot guarantee the absolute security of your information due to the inherent nature of digital networks."
    }, {
        title: "User Rights",
        content: "Since all user data is stored on your device, you have full control over it. You may delete the App to permanently remove all associated data from your device."
    }, {
        title: "Children's Privacy",
        content: "The App is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have inadvertently collected such information, we will take steps to delete it."
    }, {
        title: "Changes to This Privacy Policy",
        content: "We may update this Privacy Policy periodically.Any changes will be posted in the App, and continued use of the App will constitute acceptance of any changes."
    }, {
        title: "Contact Us",
        content: "If you have questions about this Privacy Policy or your privacy rights, please contact us at hello@nativ.codes."
    }]
}

const Legal = {
    TermsAndConditions,
    PrivacyPolicy
}

export {
    Legal
};
