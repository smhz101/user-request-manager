# User Request Manager (URM)

User Request Manager (URM) is a WordPress plugin designed to streamline the process of receiving, managing, and responding to user queries. With URM, businesses can ensure timely and effective communication with their users, enhancing the overall user experience.

## 🌟 Features

- **User Queries Management**: Easily view and manage incoming user requests from a dedicated dashboard.
- **Email Notifications**: Receive email notifications for every new user request, ensuring timely responses.
- **Role-Based Query Viewing**: View queries based on user roles such as guest, registered user, or WooCommerce customer.
- **Custom Post Type Integration**: User requests are stored as a custom post type, allowing for easy management within the WordPress dashboard.
- **Response Functionality**: Send responses directly to users from the dashboard.
- **RESTful API Endpoints**: Leverage built-in API endpoints to fetch or post user requests.

## 🛠 Installation

1. Download the User Request Manager plugin ZIP file.
2. Go to the WordPress admin dashboard.
3. Navigate to `Plugins > Add New > Upload Plugin`.
4. Choose the ZIP file and click `Install Now`.
5. Activate the plugin after installation.

## 🔍 Usage

1. After installation, navigate to the `User Requests` tab on the WordPress admin dashboard.
2. Here, you can view all incoming user queries, categorized based on their status.
3. To respond to a query, simply click on it and type in your response. Once sent, the user will receive it via email.
4. To view user queries based on roles, use the filter option at the top.
5. Developers can leverage the provided API endpoints to integrate this functionality into other applications or services.

## 🌐 API Endpoints

- `GET /wp-json/urm/v1/user-requests`: Fetch all user requests.
- `POST /wp-json/urm/v1/user-requests`: Post a new user request.
- `GET /wp-json/urm/v1/settings`: Retrieve plugin settings.
- `POST /wp-json/urm/v1/settings`: Update plugin settings.
- `GET /wp-json/urm/v1/requests-by-user?identifier={email_or_id}`: Fetch user requests by email or user ID.

### Upcoming Features:

- **User Dashboard Integration**:

  - Allow users to log in and view their own request status and history.
  - Enable users to update or delete their requests from the dashboard.

- **Advanced Search and Filters for Admin**:

  - Implement advanced search capabilities for administrators to quickly find user requests based on keywords, dates, or user details.
  - Provide filter options to narrow down requests by their status, type, or other metadata.

- **Notifications System**:

  - Integrate real-time notifications to inform administrators of new requests or updates.
  - Option for users to receive email notifications regarding the status of their requests.

- **Analytics and Reporting**:

  - Introduce an analytics dashboard for administrators to track and visualize request patterns, peak times, and other essential metrics.
  - Generate reports for periodic review or audits.

- **Bulk Actions**:

  - Allow administrators to perform bulk actions like marking multiple requests as read, deleting, or archiving.

- **Customizable Email Templates**:

  - Provide an interface for administrators to customize the email templates used for notifications and communications.

- **Integration with Other CRM Tools**:

  - Enable integration with popular Customer Relationship Management (CRM) tools to streamline user data management and communications.

- **Automated Responses**:

  - Implement a system for automatic responses based on specific triggers or keywords in user requests.

- **Improved Security Features**:

  - Enhanced security measures, such as two-factor authentication, to ensure the safety of user data.

- **Mobile Responsive Admin Dashboard**:

  - Ensure the admin dashboard and user interface is fully responsive for mobile and tablet devices.

- **Localization and Internationalization**:
  - Offer multi-language support to cater to a global audience.

## ❓ FAQs

- **Q: Can I customize the email templates used by URM?**
  A: Currently, the plugin uses default templates. However, future versions might include customization options.

- **Q: Is there a limit to the number of user requests the plugin can handle?**
  A: No, the plugin uses custom post types to store user requests, so it can handle as many queries as your WordPress installation can store.

## 📜 Changelog

### 1.0.0

- Initial release with core features.

## 💬 Support

If you encounter any issues or have suggestions for the plugin, please open an issue in the GitHub repository or contact the plugin's maintainer at [hi@muzammil.dev](mailto:hi@muzammil.dev).

## 📄 License

GNU General Public License v2.0.
