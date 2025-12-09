
export  interface User {
name?:string;
tenantName:string;
TenantId:string  
IsAdmin?:boolean;

}


export interface AppContextType {
    user:User | null;
    setUser: (user:User | null)=> void; 
}
