export const toCapitalize = (str: string|undefined) => {
    if(str === undefined){
        return '';
    }
    if (str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};