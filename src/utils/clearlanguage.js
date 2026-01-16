export const clearlanguage=()=>{
    Object.keys(localStorage).forEach(keys=>{
        if(keys.startsWith('lang-'))localStorage.removeItem(keys);
    })
}