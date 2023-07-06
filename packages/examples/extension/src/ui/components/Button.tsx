import type { FC, ReactNode } from 'react';
import React from 'react';

export const Button: FC<{ children: NonNullable<ReactNode>; onClick: () => void }> = ({ children, onClick }) => (
    <button
        className="cursor-pointer rounded-md border border-solid border-transparent bg-none px-2 py-1 text-xs uppercase tracking-wide hover:border-neutral-950"
        onClick={onClick}
        type="button"
    >
        {children}
    </button>
);
