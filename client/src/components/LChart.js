import { LineChart } from '@mui/x-charts';

export default function LChart({ votes, dates }) {

    return (
        <LineChart
            xAxis={[{
                scaleType: 'band',
                data: dates
            }]}
            series={[
                {
                    data: votes,
                },
            ]}
            yAxis={[{
                min: 0,
                max: 10
            }]}
            height={400}
        >

        </LineChart>
    )

}