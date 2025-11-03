'use client';

export default function CategoryFilter({ categories = [], value, onChange }) {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <label 
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Category
            </label>

            <select
                id="category-filter"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="">All</option>
                {categories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
}
