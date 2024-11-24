'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
    title: string;
    count: number;
    children: React.ReactNode;
}

export const CollapsibleSection = ({
    title,
    count,
    children,
}: CollapsibleSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg"
            >
                <h2 className="text-xl font-bold">
                    {title}{' '}
                    <span className="text-sm text-gray-400">
                        ({count})
                    </span>
                </h2>
                <ChevronDown
                    className={`transform transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
