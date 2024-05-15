export function getTime(timestamp) {
    const postCreatedAt = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now - postCreatedAt;
    
    const timeUnits = [
        { unit: 'min', factor: 1000 * 60 },
        { unit: 'h', factor: 1000 * 60 * 60 },
        { unit: 'd', factor: 1000 * 60 * 60 * 24 },
        { unit: 'm', factor: 1000 * 60 * 60 * 24 * 30 }, 
        { unit: 'y', factor: 1000 * 60 * 60 * 24 * 30 * 12 },
    ];
    
    for (const { unit, factor } of timeUnits) {
        const t = Math.floor(diffInMilliseconds / factor);
        if (t < 60) {
            return `${t}${unit}`;
        }
    }

    return 'just now';
}
