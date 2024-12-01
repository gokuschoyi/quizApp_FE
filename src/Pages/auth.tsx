import React, { useState } from 'react'
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { login } from '../api'
import { useDispatch } from 'react-redux'
import { setUser } from '../Components/auth/authSlice'
import BGNew from '../assets/bgNew.jpg'

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: {
            value: "",
            error: false,
            helperText: ""
        },
        password: {
            value: "",
            error: false,
            helperText: ""
        }
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // console.log(name, value)
        setLoginData({
            ...loginData,
            [name]: {
                value: value,
                error: false,
                helperText: ""
            }
        })
    }

    const handleSubmit = () => {
        setError("")
        let emailError = { ...loginData.email }
        let passwordError = { ...loginData.password }
        if (loginData.email.value === "") {
            // console.log("email is required")
            emailError.error = true
            emailError.helperText = "Email is required"
        }

        if (loginData.password.value === "") {
            // console.log("password is required")
            passwordError.error = true
            passwordError.helperText = "Password is required"
        }


        if (emailError.error || passwordError.error) {
            setLoginData({
                email: emailError,
                password: passwordError
            })
        } else {
            setLoading(true)
            login(loginData.email.value, loginData.password.value)
                .then((response) => {
                    // console.log(response)
                    const { user_id, email, first_name } = response.data
                    dispatch(setUser({ user_id, user_email: email, first_name }))
                    setLoading(false)
                    navigate('/dashboard')
                })
                .catch((error) => {
                    // console.log(error)
                    setLoading(false)
                    setError(error.response.data.message)
                })
        }
    }


    return (
        <Box
            style={{ backgroundImage: `url(${BGNew})`, backgroundSize: 'cover' }}
            display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"96vh"} gap={2}
            padding={2} borderRadius={2}
        >
            {error && <Alert severity="error">{error}</Alert>}
            <Box display={"flex"} flexDirection={"column"} gap={2} bgcolor={"#ffffff"} p={2} borderRadius={5} border={"1px solid black"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <Typography variant={"h3"}>Login</Typography>
                    {loading && <CircularProgress size={30} />}
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
                    <TextField
                        name="email"
                        size={"small"}
                        error={loginData.email.error}
                        value={loginData.email.value}
                        onChange={handleChanges}
                        helperText={loginData.email.helperText}
                        type='email'
                        id="user_email" label="Email" variant="outlined" />
                    <TextField
                        name="password"
                        size={"small"}
                        error={loginData.password.error}
                        value={loginData.password.value}
                        helperText={loginData.password.helperText}
                        onChange={handleChanges}
                        type='password'
                        autoComplete="true"
                        id="user_password" label="Password" variant="outlined" />
                </Box>
                <Button variant={"contained"} onClick={handleSubmit}>Login</Button>
                <Box>
                    <Typography variant={"body2"}>Don't have an account? <Button sx={{ color: 'black', textDecoration: 'underline' }} onClick={() => navigate('/register')}>Register</Button></Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Auth