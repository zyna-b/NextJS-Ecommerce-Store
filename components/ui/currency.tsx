"use client";

import React, { useEffect, useState } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

interface CurrencyProps {
    value: number | string;
}

const Currency = ({ value }: CurrencyProps) => {

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null; // Prevents server-side rendering issues
    }
    
    return (
        <span className="font-semibold">
            {formatter.format(Number(value))}
        </span>
    )
}

export default Currency;