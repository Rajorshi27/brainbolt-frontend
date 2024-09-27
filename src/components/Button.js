import React from 'react';

const Button = ({ onClick, label, type = "button", className }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} px-4 py-2 text-white rounded hover:bg-lime-500 transition`}
            aria-label={label}
        >
            {label}
        </button>
    );
};

export default Button;
