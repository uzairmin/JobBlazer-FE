import React, { useState, useEffect } from 'react'
import Select, { components } from 'react-select'

import './styles.css'
import { ResetFilters } from '@svgs'

const VALUE_LIMIT = 2

const chipStyles = {
    fontSize: '14px',
    color: '#048C8C',
    boxShadow: '0 0 0 1px #048C8C',
    fontWeight: 'bold',
    background: '#EDFFFB',
    borderRadius: '2px',
    padding: '4px 8px',
    margin: '2px',
}

export default function CustomSelector({ options, handleChange, selectorValue, isMulti, placeholder }) {
    const [selectedOptions, setSelectedOptions] = useState(selectorValue)

    const MultiValue = props => {
        const { index, getValue } = props
        const hiddenLength = getValue().length - VALUE_LIMIT
        return index < VALUE_LIMIT ? (
            <components.MultiValue {...props} />
        ) : index === VALUE_LIMIT ? (
            <div style={chipStyles}>{`+${hiddenLength}`}</div>
        ) : null
    }

    const ClearIndicator = props => (
        <div {...props.innerProps}>
            <ResetFilters />
        </div>
    )

    const styles = {
        control: (base, state) => ({
            ...base,
            borderRadius: 8,
            fontSize: 18,
            color: '#048C8C',
            borderColor: state.isFocused ? '#048C8C' : '#048C8C ',
            boxShadow: state.isFocused ? '0 0 0 0px #048C8C' : '',
            '&:hover': {
                borderColor: '#048C8C',
            },
        }),
        placeholder: base => ({
            ...base,
            color: '#048C8C',
            opacity: 0.8,
            fontSize: 14,
        }),
        option: (provided, state) => ({
            ...provided,
            marginBottom: 2.1,
            fontWeight: 'bold',
            borderRadius: 5,
            marginLeft: 2.5,
            width: '98%',
            color: state.isDisabled ? '#838080' : '#048C8C',
            borderColor: '#006366',
            boxShadow: state.isSelected ? '0 0 0 1px #0EB3AD' : '0 0 0 0.1px #006366',
            backgroundColor: state.isSelected ? '#EDFFFB' : 'white',
            textDecoration: state.isDisabled ? 'line-through' : 'none',
            '::after': {
                content: state.isSelected ? '"\u2713"' : '""',
                float: 'right',
                backgroundColor: 'transparent',
            },
        }),
        multiValue: (base, state) => ({
            ...base,
            fontSize: '16px',
            color: '#048C8C',
            boxShadow: '0 0 0 1px #048C8C',
            background: '#EDFFFB',
            borderRadius: '2px',
            padding: '1px 5px',
        }),
    }

    function handleSelect(data) {
        if (!isMulti) {
            setSelectedOptions(data)
            handleChange(data)
            return
        }
        const selectedValues = data.map(option => option.value)
        if (selectedValues.includes('__SELECT_ALL__')) {
            const filteredOpts = options?.filter(opt => opt.isDisabled !== true)
            setSelectedOptions(filteredOpts)
            handleChange(filteredOpts)
        } else {
            setSelectedOptions(data)
            handleChange(data)
        }
    }

    useEffect(() => {
        setSelectedOptions(selectorValue)
    }, [selectorValue])

    const extendedOptions =
        options?.length > 0
            ? [
                  {
                      label: 'Select All',
                      value: '__SELECT_ALL__',
                  },
                  ...options,
              ]
            : []

    return (
        <div className='dropdown-container'>
            <Select
                components={{ ClearIndicator, MultiValue }}
                options={isMulti ? extendedOptions : options}
                maxMenuHeight={200}
                placeholder={placeholder}
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable
                isMulti={isMulti}
                hideSelectedOptions={false}
                styles={styles}
                backgroundColor='transparent'
                className='single-select'
                classNamePrefix='react-select'
                menuPlacement='bottom'
            />
        </div>
    )
}
