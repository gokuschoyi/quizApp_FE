import React, { useState } from 'react'
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { register } from '../api'
import BGNew from '../assets/bgNew.jpg'

interface RegisterField {
    value: string;
    error: boolean;
    helperText: string;
}

interface RegisterData {
    email: RegisterField;
    first_name: RegisterField;
    last_name: RegisterField;
    password: RegisterField;
    re_password: RegisterField;
}

const Register = () => {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState<RegisterData>({
        email: {
            value: "",
            error: false,
            helperText: ""
        },
        first_name: {
            value: "",
            error: false,
            helperText: ""
        },
        last_name: {
            value: "",
            error: false,
            helperText: ""
        },
        password: {
            value: "",
            error: false,
            helperText: ""
        },
        re_password: {
            value: "",
            error: false,
            helperText: ""
        }
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [registerDisabled, setRegisterDisabled] = useState(true)

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // console.log(name, value)
        if (name === "re_password") {
            if (value !== registerData.password.value) {
                setRegisterData({
                    ...registerData,
                    [name]: {
                        value: value,
                        error: true,
                        helperText: "Passwords do not match"
                    }
                })
                setRegisterDisabled(true)
                return
            }
        }
        setRegisterData({
            ...registerData,
            [name]: {
                value: value,
                error: false,
                helperText: ""
            }
        })
        const allFieldsValid = Object.keys(registerData).every(
            (key) => registerData[key as keyof RegisterData].value !== ""
        );
        setRegisterDisabled(!allFieldsValid)
    }


    const handleRegister = () => {
        // console.log("Register")
        setError("")

        const registrationData = registerData
        const registerDataKeys = Object.keys(registrationData)
        registerDataKeys.forEach((key) => {
            if (registerData[key as keyof RegisterData].value === "") {
                registrationData[key as keyof RegisterData].error = true
                registrationData[key as keyof RegisterData].helperText = `${key} is required`
            } else {
                registrationData[key as keyof RegisterData].error = false
                registrationData[key as keyof RegisterData].helperText = ""
            }
        })
        setRegisterData((prev) => ({
            ...prev,
            ...registrationData
        }));

        // console.log(registrationData)
        const registration_payload = {
            email: registrationData.email.value,
            first_name: registrationData.first_name.value,
            last_name: registrationData.last_name.value,
            password: registrationData.password.value
        }
        // console.log(registration_payload)

        setLoading(true)
        register(registration_payload.email, registration_payload.first_name, registration_payload.last_name, registration_payload.password)
            .then((response) => {
                // console.log(response)
                setLoading(false)
                if (response.status === 201) {
                    navigate('/')
                }
            })
            .catch((error) => {
                // console.log(error)
                setLoading(false)
                setError(error.response.data.message)
            })
    }


    return (
        <Box
            style={{ backgroundImage: `url(${BGNew})`, backgroundSize: 'cover' }}
            display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"} gap={2}>
            {error && <Alert severity="error">{
                Object.keys(error).map((key) => {
                    return (
                        <div key={key}>{error[key as any]}</div>
                    )
                })
            }</Alert>}
            <Box display={"flex"} flexDirection={"column"} gap={2} bgcolor={"#ffffff"} p={2} borderRadius={5} border={"1px solid black"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <Typography variant={"h3"}>Register</Typography>
                    {loading && <CircularProgress size={30} />}
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
                    <TextField
                        name="email"
                        size={"small"}
                        error={registerData.email.error}
                        value={registerData.email.value}
                        onChange={handleChanges}
                        helperText={registerData.email.helperText}
                        type='email'
                        id="user_email" label="Email" variant="outlined" />
                    <TextField
                        name="first_name"
                        size={"small"}
                        error={registerData.first_name.error}
                        value={registerData.first_name.value}
                        onChange={handleChanges}
                        helperText={registerData.first_name.helperText}
                        type='text'
                        id="first_name" label="First Name" variant="outlined" />
                    <TextField
                        name="last_name"
                        size={"small"}
                        error={registerData.last_name.error}
                        value={registerData.last_name.value}
                        onChange={handleChanges}
                        helperText={registerData.last_name.helperText}
                        type='text'
                        id="last_name" label="Last Name" variant="outlined" />
                    <TextField
                        name="password"
                        size={"small"}
                        error={registerData.password.error}
                        value={registerData.password.value}
                        helperText={registerData.password.helperText}
                        onChange={handleChanges}
                        type='password'
                        id="user_password" label="Password" variant="outlined" />
                    <TextField
                        name="re_password"
                        size={"small"}
                        error={registerData.re_password.error}
                        value={registerData.re_password.value}
                        helperText={registerData.re_password.helperText}
                        onChange={handleChanges}
                        type='password'
                        id="re_password" label="Re-enter Password" variant="outlined" />
                </Box>
                <Button variant={"contained"} onClick={handleRegister} disabled={registerDisabled}>Register</Button>
                <Box>
                    <Typography variant={"body2"}>Already have an account? <Button onClick={() => navigate('/')}>Login</Button></Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Register