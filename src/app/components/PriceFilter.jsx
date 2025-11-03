'use client';

export default function PriceFilter({ value, onChange }) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            Max Price:
            <input 
                type="number"
                min={0}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="No limit"
                className="ml-2 border rounded p-1 w-28"
            />
        </label>
    );
}