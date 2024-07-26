import React from 'react'
import { CSVLink } from 'react-csv'

const GenerateCSV = data => {
    // const [csvData, setCsvData] = useState(data)
    const csvLink = (
        <CSVLink
            data={data}
            filename='jobs.csv'
            className='bg-[#10868a] hover:bg-[#209fa3] text-[#ffffff]  py-2 px-3 rounded inline-flex items-center'
            target='_blank'
        >
            Download CSV
        </CSVLink>
    )

    return <div>{csvLink}</div>
}

export default GenerateCSV
