
export function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
}