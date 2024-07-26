const Selector = props => {
    const { data, selectorValue, handleSelectChange } = props
    return (
        <select
            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
            value={selectorValue}
            onChange={handleSelectChange}
        >
            <option value='all'>All</option>
            {data &&
                data?.length > 0 &&
                data?.map((item, key) => {
                    const { name, value } = item
                    return (
                        <option key={key} value={name}>
                            {name.charAt(0).toUpperCase() + name.slice(1)} ({value})
                        </option>
                    )
                })}
        </select>
    )
}

export default Selector
