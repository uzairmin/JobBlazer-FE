import { memo } from 'react'
import Select from 'react-select'

const customStyles = {
    control: provided => ({
        ...provided,
        border: '0.5px solid #048C8C',
        borderRadius: '0.5rem',
        padding: '0.20rem',
        boxShadow: '0 0 0 0px #048C8C',
        '&:hover': {
            border: '0.5px solid #048C8C',
        },
    }),
}

const SelectBox = memo(({ options, selected = '', handleChange, classes = null }) => (
    <Select
        className={classes}
        options={options}
        styles={customStyles}
        value={selected}
        // onChange={handleChange}
        onChange={value => handleChange(value)}
    />
))

export default SelectBox
