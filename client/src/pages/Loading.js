import { CircularProgress, Box } from '@mui/material';

export default function Loading() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
            <CircularProgress></CircularProgress>
        </Box>);
}