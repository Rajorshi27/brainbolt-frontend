import React from 'react';

const TextInput = ({ label, value, onChange, type = "text", className }) => {
    const handleChange = (e) => {
        const newValue = type === "number" ? Number(e.target.value) : e.target.value;
        onChange(newValue);
    };

    return (
        <div className="mb-4">
            <label className="block text-lg text-white mb-2">{label}</label>
            {type === "textarea" ? (
                <textarea
                    value={value}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400 ${className}`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400 ${className}`}
                />
            )}
        </div>
    );
};

export default TextInput;
