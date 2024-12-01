import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Typography, Alert, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getLessons } from '../../api'
import { set_lessons, clear_quizzes } from './quizSlice'

type lesson = {
    id: string;
    title: string;
    content: string;
}

const Lessons = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user_id = useSelector((state: any) => state.auth.user_id)
    const lessons_redux = useSelector((state: any) => state.quiz.lessons)
    const [lessons, setLessons] = useState<lesson[]>([])
    const loadRef = useRef(false)

    useEffect(() => {
        if (!loadRef.current) {
            loadRef.current = true
            if (lessons_redux.length === 0) {
                console.log("fetching lessons")
                getLessons()
                    .then((res) => {
                        console.log(res.status)
                        dispatch(set_lessons({ lessons: res.data }))
                        setLessons(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log("setting lessons redux")
                setLessons(lessons_redux)
            }
        }
    }, [lessons_redux, dispatch])

    useEffect(() => {
        return () => {
            dispatch(clear_quizzes())
        }
    }, [dispatch])

    const [lessonAlert, setLessonAlert] = useState(false)
    const startLessons = () => {
        setLessonAlert(true)
        setTimeout(() => {
            setLessonAlert(false)
        }, 3000)
    }

    const handleLoadQuiz = (lesson_name: string, lesson_id: string) => {
        console.log("loading quiz", lesson_id)
        navigate(`/dashboard/quiz/${lesson_name}/${user_id}/${lesson_id}`)
    }

    return (
        <Box pt={4} display={'flex'} flexDirection={"column"} justifyContent={'flex-start'} alignItems={"start"}>
            {lessonAlert && <Alert severity="error">Lesson un-available</Alert>}
            <Typography variant='h4'>Lessons</Typography>
            <Box pt={2}>
                {lessons.map((lesson: lesson) => (
                    <Box pt={2} key={lesson.id}>
                        <Box display={"flex"} flexDirection={'column'} alignItems={'flex-start'} pb={1}>
                            <Typography variant='h4'>{lesson.title}</Typography>
                            <Typography variant='body1' textAlign={'justify'}>{lesson.content}</Typography>
                        </Box>

                        <Box display={"flex"} justifyContent={'flex-start'} alignItems={"center"} gap={2}>
                            <Button sx={{ backgroundColor: "black" }} variant='contained' onClick={startLessons}>Start Lesson</Button>
                            <Button sx={{ backgroundColor: "black" }} variant='contained' onClick={(e) => handleLoadQuiz(lesson.title, lesson.id)}>View Quiz</Button>
                        </Box>

                        <Box pt={2}>
                            <Divider />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Lessons