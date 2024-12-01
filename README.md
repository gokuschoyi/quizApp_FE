
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project Features

- **User Authentication**: Users can register and login.
- **Protected Routes**: Certain routes are protected and require authentication.
- **Quizzes**: Users can view lessons, take quizzes, and view their scores.
- **State Management**: The application state is managed using Redux and persisted using redux-persist.

## File Descriptions

- `src/api.tsx`: Contains API calls for login, registration, fetching lessons, quizzes, and evaluating quizzes.
- `src/Components/auth/protectedRoute.tsx`: A component that protects routes from unauthorized access.
- `src/Components/quiz/lessons.tsx`: Displays the list of lessons.
- `src/Components/quiz/quizQuestion.tsx`: Displays quiz questions and handles quiz submission.
- `src/Components/quiz/quizSlice.tsx`: Redux slice for managing quiz-related state.
- `src/Components/quiz/quizzes.tsx`: Displays the list of quizzes for a lesson.
- `src/Pages/auth.tsx`: Login page.
- `src/Pages/dashboard.tsx`: Dashboard page.
- `src/Pages/register.tsx`: Registration page.
- `src/store.tsx`: Configures the Redux store and sets up state persistence.

## Backend URL

The backend URL is configured in `src/constants.tsx`:

```ts
export const BackendUrl = 'https://4a92-149-167-138-210.ngrok-free.app';