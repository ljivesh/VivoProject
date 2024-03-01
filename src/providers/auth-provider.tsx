import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from '@uidotdev/usehooks';


export type UserData = {
    id: string,
    type: 'salesperson' | 'retailer'
};

type ContextType = {
    user: UserData
    login: (user: UserData)=> void
    logout: ()=> void,
}

const defaultValues: ContextType = {
    user: {
        id: "",
        type: 'salesperson',
    },
    login: ()=> null,
    logout: ()=> null,
};

const AuthContext = createContext(defaultValues);
export const useAuth = ()=> useContext(AuthContext);

type Props = {
    children: ReactNode 
};

const AuthProvider = ({children}: Props)=> {

    const [user, setUser] = useLocalStorage<UserData>('id', {id: "", type: 'salesperson'});

    const login = (user: UserData)=> {

        setUser(user);

    };

    const logout = ()=> {
        setUser({id: "", type: 'salesperson'});
    }


    return <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider;