'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
    let text = null;
    let color = "text-gray-600";

    if (loading) text = "Loading products...";
    else if (error) {
        text = `Error: ${error}`;
        color = "text-red-600";
    } else if (isEmpty) text = "No products match your filters.";

    if (!text) return null;

    return (
        <div className={`text-center py-4 ${color}`}>
            {text}
        </div>
    );
}

