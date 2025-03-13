import { BarChart } from '@mui/x-charts';

import React from 'react';

export default function BChart({ avList, playerList, color }) {

    return (
        <BarChart
        yAxis={[{
            scaleType: 'band',
            data: playerList,
        }]}
        series={[
            {
                data: avList,
                color: color,
            },
        ]}
        xAxis={[{
            min: 0,
            max: 10
        }]}
        height={300}
        layout='horizontal'
        margin={{ left: 100 }}
        barLabel={'value'}
        sx={{
            '& .MuiBarLabel-root': {
              fontWeight: '800',
            },
        }}
        >
        </BarChart>

    )

}