import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './Components/auth/protectedRoute';
import Dashboard from './Pages/dashboard';
import Lessons from './Components/quiz/lessons';
import Register from './Pages/register';
import Auth from './Pages/auth';
import QuizBase from './Components/quiz/quizBase';
import Quiz from './Components/quiz/quizzes';
import QuizQuestion from './Components/quiz/quizQuestion';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route index element={
                <Auth />
              } />

              <Route path="register" element={
                <Register />
              } />

              <Route path="dashboard" element={
                <ProtectedRoute >
                  <Dashboard />
                </ProtectedRoute>
              } >
                <Route key="lessons" index element={<Lessons />} />
                <Route key="quiz" path="quiz" element={<QuizBase />} >
                  <Route key="question" path=":quiz_id?" element={<QuizQuestion />} />
                  <Route key="quiz" path=":lesson_name?/:user_id?/:lesson_id?" element={<Quiz />} />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
