import React from 'react';

function PropertyTypeBadge({ propertyType }) {
    const typeColors = {
        APARTMENT: 'bg-blue-600',
        LODGE: 'bg-red-600',
        RENTAL: 'bg-orange-600',
        HOSTEL: 'bg-green-600',
        HOTEL: 'bg-purple-600',
    };

    const normalizedType = propertyType?.toUpperCase();
    const colorClass = typeColors[normalizedType] || 'bg-gray-600';

    const displayText = normalizedType
        ? normalizedType.slice(0, 1).toUpperCase() + normalizedType.slice(1).toLowerCase()
        : 'Unknown';

    return (
        <div className="flex items-center gap-2 py-2">
            <p className={`w-2 h-2 ${colorClass} rounded-full`} />
            <p className="text-[.8rem]">{displayText}</p>
        </div>
    );
}

export default PropertyTypeBadge;