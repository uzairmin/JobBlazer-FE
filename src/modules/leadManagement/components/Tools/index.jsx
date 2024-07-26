import { memo } from 'react'

const Tools = ({ data }) => (
    <div className='text-[#006366] '>
        <div className='flex flex-col md:flex-row md:justify-center'>
            <div className='border border-1 p-2 md:p-3 md:m-2 text-center h-fit bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-md font-semibold uppercase'>Tools</p>
                </div>
            </div>
            <div className='flex flex-col w-full px-3 md:px-8 bg-slate-100 border py-4 md:py-8 rounded-3xl md:-ml-8'>
                {data?.candidates?.tools?.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-flow-col md:mb-4 mb-2 justify-items-end bg-[#EDFDFB] shadow-xl p-2 md:p-4 rounded-xl items-center hover:transform hover:scale-[102%]'>
                            <div className='flex flex-col justify-self-start'>
                                <div className='text-md uppercase font-bold'>{item?.tool}</div>
                                <div className='text-sm'>{item?.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
export default memo(Tools)
