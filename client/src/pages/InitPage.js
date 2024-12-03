import '../style/InitPage.css'
import { Box, Button, Typography } from "@mui/material"

export default function InitPage() {
    return <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '250px' }}>
            <Box
                component='img'
                sx={{
                    height: {
                        xs: 50,
                        s: 60,
                        md: 90,
                        xl: 110
                    },
                    width: {
                        xs: 50,
                        s: 60,
                        md: 90,
                        xl: 110
                    },
                    maxHeight: {
                        xs: 50,
                        s: 60,
                        md: 90,
                        xl: 110
                    },
                    maxWidth: {
                        xs: 50,
                        s: 60,
                        md: 90,
                        xl: 110
                    },
                }}
                src={require("../images/2.png")}
            >
            </Box>
            <Typography
                noWrap
                component="a"
                color='primary'
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    letterSpacing: '10%',
                    textDecoration: 'none',
                    fontSize: {
                        xs: 40,
                        s: 50,
                        md: 75,
                        xl: 100
                    }
                }}
            >
                FantaToxic
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
            <Button variant="contained" color="primary" href="/players_menu">Entra</Button>
        </Box>


    </div>
}