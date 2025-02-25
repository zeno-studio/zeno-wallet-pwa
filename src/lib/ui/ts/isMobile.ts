export const isIOS = (target) => {
    let userAgent = navigator.userAgent 
    const iOs = /iPad|iPhone|iPod/.test(userAgent) 
    if (target === 'iOS') {
        return iOs;
    }
    return iOs;
};

export const isAndroid = (target) => {
    let userAgent = navigator.userAgent 
    const android = /android/i.test(userAgent);
    return  android
};