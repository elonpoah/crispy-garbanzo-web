const prefix = 'app_'

export default{
    setItem(key: string, val: any){
        localStorage.setItem(prefix+key,JSON.stringify(val))
    },
    getItem(key: string){
        return localStorage.getItem(prefix+key)
    },
    clearItem(key: string){
        localStorage.removeItem(prefix+key)
    },
    clearAll(){
        window.localStorage.clear()
    }
}