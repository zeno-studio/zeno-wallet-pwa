


export const checkPasswordStrength=(password: string)=> {
    const isLongEnough = password.length > 7;
    const isStrongLength = password.length > 9;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const charTypesMet = [
        hasSpecialChar,
        hasUpperCase,
        hasLowerCase,
        hasNumber
    ].filter(Boolean).length;

    let strength;
    if (!isLongEnough || charTypesMet < 4) {
        strength = "weak";
    } else if (isStrongLength && charTypesMet === 4) {
        strength = "strong";
    } else {
        strength = "medium";
    }

    return {
        checks: {
            specialChar: hasSpecialChar,
            upperCase: hasUpperCase,
            lowerCase: hasLowerCase,
            number: hasNumber,
            lengthGreaterThan9: isLongEnough,
            lengthGreaterThan11: isStrongLength
        },
        strength: strength
    };
}
