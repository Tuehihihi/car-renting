
'use client'
import React from 'react';
import Select from 'react-select'

export type ProvinceSelectValue = {
    value: string,
}

type ProvinceSelectProps = {
    value?: ProvinceSelectValue;
    onChange: (value: ProvinceSelectValue | null) => void;
}

const vietnamProvinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    
];

const options = vietnamProvinces.map((province) => ({
    label: province,
    value: province,
}));

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({ value, onChange }) => {
    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            onChange(selectedOption as ProvinceSelectValue);
        } else {
            onChange(null);
        }
    };

    return (
        <Select
            options={options}
            value={value}
            isClearable
            onChange={handleChange}
            placeholder="Cơ sở"
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#22c55e'
                }
            })}
            
        />
    );
}

export default ProvinceSelect;
