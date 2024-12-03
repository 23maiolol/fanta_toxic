import { BarChart } from '@mui/x-charts';


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
                    color
                },
            ]}
            xAxis={[{
                min: 0,
                max: 10
            }]}
            height={300}
            layout='horizontal'
            margin={{ left: 100 }}
        >
        </BarChart>
    )

}