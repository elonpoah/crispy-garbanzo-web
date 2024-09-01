const prefix = 'app_'

export default{
    setItem(key: string, val: any){
        localStorage.setItem(prefix+key,JSON.stringify(val))
    },
    getItem(key: string){
        const value = localStorage.getItem(prefix+key)
        return value && JSON.parse(value)
    },
    clearItem(key: string){
        localStorage.removeItem(prefix+key)
    },
    clearAll(){
        window.localStorage.clear()
    }
}