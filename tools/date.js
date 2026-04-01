

export function changeDate(dateStr) {
    const date = new Date(dateStr);

    // Format français
    const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Africa/Kinshasa', // ou 'Europe/Paris'
    timeZoneName: 'short'
    };
    return date.toLocaleString('fr-FR', options)
}