const lang = import.meta.env.PUBLIC_LANG;
import es from './es'
import en from './en'
const keys = {
    es, en
}
export default (key) => {
    try {
        return keys[lang][key]
    } catch (e) {
        console.error(`Missing key: ${lang}-${key}`);
    }  
}