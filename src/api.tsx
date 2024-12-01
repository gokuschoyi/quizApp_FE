import axios from "axios";
import { BackendUrl } from "./constants";

export const login = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/authorization/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
}

export const register = async (email: string, first_name: string, last_name: string, password: string) => {
    const data = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/authorization/signup`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
}

export const getLessons = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/quiz/get_lessons`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await axios.request(config)
}

export const getQuizzesForLesson = async (user_id: string, lesson_id: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/quiz/get_quiz/${user_id}/${lesson_id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await axios.request(config)
}

export const getQuizQuestions = async (quiz_id: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/quiz/get_questions/${quiz_id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await axios.request(config)
}

export const evaluateQuiz = async (
    user_id: string,
    quiz_id: string,
    answers: { question_id: string, selected_answers: string[] }[]
) => {
    const data = {
        user_id: user_id,
        quiz_id: quiz_id,
        answers: answers
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BackendUrl}/quiz/evaluate_quiz`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
}