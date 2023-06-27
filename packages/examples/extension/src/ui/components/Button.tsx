import type { FC, ReactNode } from 'react';
import React from 'react';

export const Button: FC<{ children: NonNullable<ReactNode>; onClick: () => void }> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        type="button"
        style={{
            background: 'none',
            border: '1px solid #131313',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '11px',
            letterSpacing: '0.3px',
            padding: '4px 8px',
            textTransform: 'uppercase',
        }}
    >
        {children}
    </button>
);
