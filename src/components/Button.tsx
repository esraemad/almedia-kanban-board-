
// The Button component accepts an onClick handler, optional className for styling, and children to display inside the button.
import React from 'react';
interface Props {
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
}

// This file defines a reusable Button component for the Kanban board app.  
const Button: React.FC<Props> = ({ onClick, className, children }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`
            ${className}
            cursor-pointer 
            hover:transition delay-150 duration-300 ease-in-out
            hover:-translate-y-1 hover:scale-102  hover:bg-opacity-10
            flex gap-2`}>
            {children}
        </button>
    )
}

export default Button