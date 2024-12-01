import { createSlice } from "@reduxjs/toolkit";
import { getQuizzesForLesson } from "../../api";

const initialState = {
    lessons: [],
    quizzesForLesson: []

}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        set_lessons: (state, action) => {
            state.lessons = action.payload.lessons;
        },
        setQuizzesForLesson: (state, action) => {
            state.quizzesForLesson = action.payload.quizzes;
        },
        clear_lessons: (state) => {
            state.lessons = [];
        },
        clear_quizzes: (state) => {
            state.quizzesForLesson = [];
        }
    }
})

const { reducer, actions } = quizSlice;

export const {
    set_lessons,
    clear_lessons,
    setQuizzesForLesson,
    clear_quizzes
} = actions;
export default reducer; 