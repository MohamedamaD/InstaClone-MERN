# Instagram Clone 📸

## Description

Welcome to the Instagram Clone project!
I would like to share with you This application mimics the core features of Instagram using modern web technologies. It’s built with React for the front-end, Node.js for the back-end, and PostgreSQL for the database. Sequelize is used for database management.

## Features 🚀

- **User Authentication:** Secure sign-up, login, and profile management.
- **Post Management:** Create, edit, and delete posts with images and captions.
- **Feed:** Display a dynamic feed of posts from all users.
- **Interactions:** Like and comment on posts.
- **Search:** Find users and posts with ease.
- **Reset Password:** Users can reset their passwords securely.
- **Save Posts:** Users can save their favorite posts for quick access.
- **Follow Users:** Users can follow other users to see their posts in their feed.
- **Dark Mode / Light Mode:** Switch between dark and light themes for a personalized experience.
- **OTP Verification:** Secure user registration and password reset using One-Time Password (OTP) for email verification.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## User Registration ✨

The registration process allows users to create a new account with the following steps:

1. **Enter Details:** Users provide their name, a unique username, a unique email address, and a strong password.
   - We use **Formik** for handling form state and submission.
   - **Yup** is used for validation, ensuring that all fields are correctly filled and meet the specified criteria.

2. **Email Verification:**
   - Upon submitting the registration form, an OTP (One-Time Password) is sent to the provided email address.
   - Users are redirected to the **Confirm Email** page to enter the OTP and verify their email address.

3. **OTP Validation:**
   - The entered OTP is compared against the one generated and sent to the email.
   - If the OTP is correct, it is destroyed, and the email is marked as verified in the database.

4. **Successful Registration:**
   - Once the email is verified, users are successfully registered and redirected to the main site.

Here’s a visual demonstration of the registration process:

![User Registration](/GIF/Register.gif)

## User Login 🔑

The login process allows users to access their account with the following steps:

1. **Enter Credentials:** Users provide their email address and password.
   - **Formik** manages form state and submission.
   - **Yup** is used for validation, ensuring that the provided information is valid.

2. **Authentication:**
   - Upon submitting the login form, the provided credentials are verified.
   - If the email and password match the records in the database, the user is granted access.

3. **Successful Login:**
   - Users are redirected to the main site upon successful authentication.

Here’s a visual demonstration of the login process:

![User Login](/GIF/Login.gif)

## Password Reset 🔄

The password reset process allows users to recover their account access with the following steps:

1. **Request Password Reset:**
   - Users enter their email address to initiate the password reset process.
   - **Formik** handles the form state and submission.
   - **Yup** is used for validation, ensuring that the provided email is correctly formatted.

2. **Email Verification:**
   - The backend checks if the email exists in the system.
   - If the email does not exist, a toast notification informs the user that the email is not found.
   - If the email exists, a password reset link is sent to the user's email address.

3. **Password Reset Link:**
   - Users click on the link in the email, which contains a token for verification.
   - They are directed to the password reset page where they can enter a new password.

4. **Token Validation:**
   - The system verifies the token's validity (the token is valid for 15 minutes).
   - If the token is valid and the new password meets the criteria, the password is updated successfully.

5. **Successful Reset:**
   - Users can now log in using their new password.

Here’s a visual demonstration of the password reset process:

![Password Reset](/GIF/ResetPassword.gif)

## Responsive Design 📱

This application is designed to be fully responsive, ensuring a seamless user experience across various devices. The login and registration pages are optimized for both desktop and mobile views.

- **Desktop View:** The pages are designed to take advantage of larger screen sizes with a layout that is intuitive and easy to navigate.
- **Mobile View:** The pages adjust to smaller screens, providing a user-friendly experience on smartphones and tablets.

Here’s a visual demonstration of how the login and registration pages respond to different screen sizes:

![Responsive Design](/GIF/LoginRegisterResponsive.gif)

## Light and Dark Mode 🌗

Our application supports both light and dark modes, allowing users to choose their preferred theme for a more personalized experience. 

- **Light Mode:** Provides a bright and clean interface suitable for well-lit environments.
- **Dark Mode:** Offers a darker interface that is easier on the eyes in low-light conditions and can help save battery life on OLED screens.

Users can switch between light and dark modes easily, and their preference is saved for future visits.

Here’s a visual demonstration of how the application supports light and dark modes:

![Light and Dark Mode](/GIF/Modes.gif)

## Home Page 🏠

The Home page displays posts from users that a logged-in user is following. This feature ensures that users see relevant content from their followers, creating a dynamic and engaging feed.

- **Feed Display:** The page shows posts from all users that the logged-in user follows. This includes the latest posts from these users.
- **Efficient Data Retrieval:** We use **Sequelize** ORM with **PostgreSQL** to manage and query the database efficiently. This setup ensures optimal performance and accurate retrieval of posts and user relationships.

Here’s a visual demonstration of the Home page showing posts from followed users:

![Home Page](/GIF/Home.gif)

## Explore Page 🔍

The Explore page allows users to discover and search through all posts in the database with advanced features:

- **Infinite Scroll:** Users can endlessly scroll through posts as they load more content automatically. This is achieved using **React Query** for efficient data fetching and state management.
- **Search Functionality:** Users can search for posts based on various criteria such as caption, tags, or location. This feature enables users to find specific content quickly and easily.
- **Efficient Data Handling:** The application uses efficient database queries to handle large volumes of posts and ensure smooth performance during scrolling and searching.

Here’s a visual demonstration of the Explore page with infinite scroll and search capabilities:

![Explore Page](/GIF/Explore.gif)

## People Page 👥

The People page allows users to search for other users and view their profiles:

- **User Search:** Users can search for other users by their username. This makes it easy to find specific people within the app.
- **Profile Viewing:** Clicking on a user from the search results takes you to that user's profile page. Here, you can view their posts, bio, and other profile details.

Here’s a visual demonstration of the People page, including the user search and profile viewing features:

![People Page](/GIF/People.gif)

## Profile Page 🖼️

The Profile page provides users with a comprehensive view and management of their profile:

- **Profile Information:** Displays the user's posts, bio, and other personal details.
- **Followers and Followees:** Shows the number of followers and the number of users the profile owner is following.
- **Follow/Unfollow:** Users can follow or unfollow other users directly from their profile.
- **Edit Profile:** Users can update their bio and other non-sensitive information.
- **Change Password:** Users can securely change their password from the profile page.

Here’s a visual demonstration of the Profile page, including viewing posts, editing profile details, and managing followers:

![Profile Page](/GIF/ProfileEdit.gif)

## Create and Save Posts 📝

The Create and Save Posts feature allows users to manage their content effectively:

- **Create Post:** Users can create new posts by uploading images or videos. They can also provide additional details such as captions, tags, and location information.
- **Save Posts:** Users can save posts to access them easily later. This feature allows users to keep track of their favorite content.

Here’s a visual demonstration of creating a post and saving it:

![Create and Save Posts](/GIF/CreatePostAndSaves.gif)

## Post Details 📄

The Post Details page provides users with comprehensive information and interaction options for individual posts:

- **Post Information:** Displays detailed information about the post, including the image or video, caption, tags, and location.
- **Comments:** Users can view and interact with comments on the post. Clicking on a comment shows the user's profile who made the comment.
- **Like/Unlike:** Users can like or unlike the post.
- **Comment:** Users can add their own comments to the post.
- **Save/Unsave:** Users can save or unsave the post for later access.
- **Follow/Unfollow:** Users can follow or unfollow the user who created the post.
- **User Profile:** Clicking on the username of the post creator or commenters directs to their profile page.

Here’s a visual demonstration of the Post Details page, showcasing comments, interactions, and user profiles:

![Post Details](/GIF/PostDetails.gif)


## Tech Stack 🛠️

- **Front-End:**
  - React
  - Redux Toolkit
  - React Query
  - Axios
  - Bootstrap
  - Formik
  - React-Bootstrap
  - React Hot Toast
  - React Icons
  - React Intersection Observer
  - React Router DOM
  - React Spinners
  - Yup

- **Back-End:**
  - Node.js
  - Express
  - Sequelize
  - PostgreSQL
  - Bcrypt
  - Bcryptjs
  - Body-Parser
  - Cookie-Parser
  - CORS
  - Dotenv
  - Joi
  - Jsonwebtoken
  - Morgan
  - Nodemailer
  - OTP-Generator
  - Pg
  - Pg-Hstore

## Contributing 🤝

We welcome contributions! Feel free to fork the repository, submit pull requests, and open issues if you encounter any problems or have suggestions.

## License 📜

This project is licensed under the MIT License.

