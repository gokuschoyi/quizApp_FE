import { useEffect, useRef } from 'react'
import { Box, Button, Typography, Skeleton } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizzesForLesson } from '../../api'
import { setQuizzesForLesson } from './quizSlice'
import { useDispatch, useSelector } from 'react-redux';


const Quiz = () => {
    const { lesson_name, user_id, lesson_id } = useParams<{ lesson_name: string, user_id: string, lesson_id: string }>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const load_quiz_ref = useRef(false)

    const quizzesForLesson = useSelector((state: any) => state.quiz.quizzesForLesson)

    useEffect(() => {
        if (!load_quiz_ref.current) {
            load_quiz_ref.current = true
            if (user_id && lesson_id) {
                getQuizzesForLesson(user_id, lesson_id)
                    .then((res) => {
                        // console.log(res)
                        dispatch(setQuizzesForLesson({ quizzes: res.data }))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log("user_id or lesson_id is undefined")
            }
        }

    }, [user_id, lesson_id, dispatch])

    const loadQuizQuestions = (quiz_id: string) => {
        console.log("loading quiz", quiz_id)
        navigate(`/dashboard/quiz/${quiz_id}`)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={'start'} pt={2}>
            <Typography variant='h4'>Quizzes for {lesson_name}</Typography>
            <Box display={"flex"} flexDirection={"column"} gap={2} pt={2} width={"100%"}>
                {quizzesForLesson.length === 0 && <Skeleton variant="rectangular" width={"100%"} height={100} />}
                {quizzesForLesson.map((quiz: any) => {
                    return (
                        <Box key={quiz.id} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} gap={1} bgcolor="#ffe4c4" borderRadius={10} pl={2} pr={2} pt={1} pb={1}>
                            <Box display={"flex"} flexDirection={"row"} gap={1}>
                                <Typography variant='h6'>{quiz.id}</Typography>
                                <Typography variant='h6'>{quiz.title}</Typography>
                            </Box>
                            {quiz.completed
                                ?
                                <Box display={"flex"} flexDirection={"row"} gap={2}>
                                    <Typography variant='h6'>Completed,</Typography>
                                    <Typography variant='h6'>Score : {quiz.score}/{quiz.total}</Typography>
                                </Box>
                                : <Button sx={{ backgroundColor: "black" }} size={"small"} variant='contained' onClick={(e) => loadQuizQuestions(quiz.id)}>Start</Button>}
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Quiz