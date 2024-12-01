import { Box, Button, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Components/auth/authSlice'
import { clear_lessons } from '../Components/quiz/quizSlice'

const Dashboard_ = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(clearUser())
        dispatch(clear_lessons())
    }
    return (
        <Box >
            <Box display={"flex"} justifyContent={'space-between'} p={2} bgcolor={"#afafaf"}>
                <Typography variant='h5'>Welcome, {useSelector((state: any) => state.auth.first_name)}</Typography>
                <Button
                    sx={{ backgroundColor: "black" }}
                    variant='contained'
                    onClick={handleLogout}>Logout</Button>
            </Box>

            <Box className='content-box' p={2}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Dashboard_