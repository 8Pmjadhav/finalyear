export function GetTime({timestamp}) {
    const postCreatedAt = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now - postCreatedAt;

    const units = [
        { label: 'year', milliseconds: 1000 * 60 * 60 * 24 * 30 * 12 },
        { label: 'month', milliseconds: 1000 * 60 * 60 * 24 * 30 },
        { label: 'day', milliseconds: 1000 * 60 * 60 * 24 },
        { label: 'hour', milliseconds: 1000 * 60 * 60 },
        { label: 'minute', milliseconds: 1000 * 60 }
    ];

    for (const { label, milliseconds } of units) {
        const amount = Math.floor(diffInMilliseconds / milliseconds);
        if (amount >= 1) {
            return (
                <div className="flex items-center justify-between  dark:text-gray-200">
                    <div >{`${amount} ${label}${amount > 1 ? 's' : ''}`} &middot; ago</div>
                </div>
            );
        }
    }

    return (
        <div className="flex items-center justify-between mt-4 dark:text-gray-200">
            <div >just now</div>
        </div>
    );
}


