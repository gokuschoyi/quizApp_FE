import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizQuestions } from '../../api'
import { Box, Typography, Divider, Button, Skeleton, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useSelector } from 'react-redux';
import { evaluateQuiz } from '../../api'

type QuizQuestionProps = {
    question_id: string;
    question_text: string;
    question_type: string;
    choices: { id: string, text: string, selected: boolean }[]
}

const QuizQuestion = () => {
    const navigate = useNavigate()
    const user_id = useSelector((state: any) => state.auth.user_id)
    const [questions, setQuestions] = useState<QuizQuestionProps[]>([])
    const { quiz_id } = useParams<{ quiz_id: string }>()
    const [submissionError, setSubmissionError] = useState(false)
    const [results, setResults] = useState<{ score: number, total_questions: number, evaluated: false }>({ score: 0, total_questions: 0, evaluated: false })

    const loadRef = useRef(false)
    useEffect(() => {
        if (quiz_id) {
            if (!loadRef.current) {
                loadRef.current = true
                getQuizQuestions(quiz_id)
                    .then((res) => {
                        setQuestions(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }, [quiz_id])

    const handleSelection = (question_id: string, choice_id: string) => {
        let updatedQuestions = questions.map((question: any) => {
            if (question.id === question_id) {
                let updatedChoices = question.choices.map((choice: any) => {
                    if (choice.id === choice_id) {
                        return {
                            ...choice,
                            selected: !choice.selected
                        }
                    }
                    if (question.question_type === "single") {
                        return {
                            ...choice,
                            selected: false
                        }
                    }
                    return choice
                })
                return {
                    ...question,
                    choices: updatedChoices
                }
            }
            return question
        })
        // console.log(updatedQuestions)
        setQuestions(updatedQuestions)
    }

    const handleSubmit = () => {
        // console.log('Submit clicked')
        let hasEmptyAnswers = false;
        const answers: { question_id: string; selected_answers: string[] }[] = []
        questions.forEach((question: any) => {
            let selected = question.choices
                .filter((choice: any) => choice.selected)
                .map((choice: any) => choice.text)

            if (selected.length === 0) {
                hasEmptyAnswers = true;
            }

            answers.push({ question_id: question.id, selected_answers: selected })
        })

        if (hasEmptyAnswers) {
            // console.log("Please answer all questions");
            setSubmissionError(true);
            return;
        }

        setSubmissionError(false);
        // console.log(answers)
        if (quiz_id) {
            evaluateQuiz(user_id, quiz_id, answers)
                .then((res) => {
                    // console.log(res)
                    setResults({ score: res.data.score, total_questions: res.data.total_questions, evaluated: res.data.evaluated })
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            // console.error("Quiz ID is undefined");
        }
    }

    const handleClose = () => {
        setSubmissionError(false);
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={'flex-start'}>
            <Box display={"flex"} flexDirection={"row"} width={"100%"} justifyContent={"space-between"}>
                <Typography variant='h4'>Questions</Typography>
                <Button sx={{ backgroundColor: "black" }} size={"small"} variant='contained' onClick={() => navigate(-1)}>Back to Quizzes</Button>
            </Box>

            {!results.evaluated
                ?
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                    <Box pt={1}>
                        {questions.length === 0
                            ?
                            <Skeleton variant="rectangular" width={"100%"} height={100} />
                            :
                            <Box display={"flex"} flexDirection={"column"} gap={1}>
                                {/* <Box pt={2} display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                                    <Button sx={{ backgroundColor: "black" }} variant='contained' onClick={handleSubmit}>Submit</Button>
                                </Box> */}
                                {questions.map((question: any, i: number) => {
                                    return (
                                        <Card key={question.id} sx={{ padding: '8px 8px 8px 8px', backgroundColor: '#ebebeb' }}>
                                            <Box display={"flex"} bgcolor={"#ffe4c4"} p={1} borderRadius={2} justifyContent={"space-between"}>
                                                <Typography variant='body1' fontWeight={"bold"}>{i + 1} : {question.text}</Typography>
                                                <Typography variant='body1' fontWeight={"bold"}>{question.question_type === "single" ? "Single Response" : "Multiple Response"}</Typography>
                                            </Box>

                                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} pl={1} pr={1}>
                                                {question.choices.map((answer: any) => {
                                                    return (
                                                        <Box
                                                            sx={{ cursor: "pointer" }}
                                                            key={answer.id}
                                                            display={"flex"}
                                                            flexDirection={"row"}
                                                            justifyContent={"start"}
                                                            p={1}
                                                            borderRadius={2}
                                                            bgcolor={answer.selected ? "#deb887" : "#b3b3b3"}
                                                            width={answer.selected ? "95%" : "100%"}
                                                            mt={1}
                                                            onClick={(e) => handleSelection(question.id, answer.id)}
                                                        >
                                                            <Typography variant='body1'>{answer.text}</Typography>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                            <Box pt={1} >
                                                <Divider style={{ borderColor: "ffffff" }} />
                                            </Box>
                                        </Card>
                                    )
                                })}
                                <Box pt={2} display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                                    <Button sx={{ backgroundColor: "black" }} variant='contained' onClick={handleSubmit}>Submit</Button>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Box>
                :
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Typography variant='h4'>Results</Typography>
                    <Typography variant='h6'>Score : {results.score} / {results.total_questions}</Typography>

                    <Button sx={{ backgroundColor: "black" }} variant='contained' onClick={() => navigate(-1)}>Back to Quizzes</Button>
                </Box>
            }

            <Dialog
                open={submissionError}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Submission Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please select an answer for all questions
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default QuizQuestion