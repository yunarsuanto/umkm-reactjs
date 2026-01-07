import { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectOptionProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SelectOption = ({
    options,
    value = '',
    onChange,
    placeholder = 'Pilih Opsi',
    className = ''
}: SelectOptionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        setSelectedValue(optionValue);
        setIsOpen(false);
        onChange?.(optionValue);
    };

    return (
        <div ref={dropdownRef} className={`relative w-full ${className}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="block w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-lg shadow-sm 
                   bg-white cursor-pointer flex items-center justify-between hover:border-blue-400 
                   transition-colors duration-200"
            >
                <span className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150
                         ${selectedValue === option.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-900'}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectOption;
