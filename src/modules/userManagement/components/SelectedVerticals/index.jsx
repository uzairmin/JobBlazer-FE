import { memo } from 'react'

const SelectedVerticals = ({ verticals = [], set = null }) => {
    const removeVertical = id => set(verticals.filter(item => item.value !== id))

    return verticals?.length > 0 ? (
        <div>
            <h1 className='my-2 font-medium'>Selected Verticals</h1>
            {verticals?.map(vert => (
                <span
                    key={vert.value}
                    className='inline-block my-2 px-2.5 py-1.5 text-sm font-semibold bg-green-100 rounded-full items-center mx-1'
                >
                    <span>{vert.label}</span>
                    <button
                        type='button'
                        onClick={() => removeVertical(vert.value)}
                        className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                    >
                        x
                    </button>
                </span>
            ))}
        </div>
    ) : (
        <small>No verticals selected yet</small>
    )
}

export default memo(SelectedVerticals)
