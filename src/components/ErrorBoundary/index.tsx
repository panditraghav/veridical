import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function VeridicalErrorBoundary({
    children,
    onError,
}: {
    children: React.ReactNode;
    onError: (error: Error) => void;
}) {
    return (
        <ErrorBoundary
            fallback={
                <div
                    style={{
                        border: '1px solid #f00',
                        color: '#f00',
                        padding: '8px',
                    }}
                >
                    An error was thrown.
                </div>
            }
            onError={onError}
        >
            {children}
        </ErrorBoundary>
    );
}
