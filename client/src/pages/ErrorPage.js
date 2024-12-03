import { Box } from "@mui/material"

export default function ErrorPage() {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', marginTop: {
                xs: '60%',
                s: '60%',
                md: '20%',
                xl: '20%'
            },
            color: 'primary.500',
            fontSize: {
                xs: 20,
                s: 40,
                md: 50,
                xl: 50
            }, flexWrap: {
                xs: 'wrap',
            }, marginLeft: '5%', marginRight: '5%'
        }}>
            <Box>
                Impossibile connettersi al sito...
            </Box>
            <Box >
                Riprova più tardi
            </Box>
        </Box>
    )
}