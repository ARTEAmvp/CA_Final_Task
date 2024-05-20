export function capitalizeName(value) {
    if (typeof value !== 'string') return false;
    if (!/^[a-z]/.test(value)) return false;
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function validatePassword(value) {
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value);
}