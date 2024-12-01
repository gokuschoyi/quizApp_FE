import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
const QuizBase = () => {
    return (
        <Box className='content-box'>
            <Outlet />
        </Box>
    )
}

export default QuizBase