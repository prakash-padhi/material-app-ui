import React from 'react';

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const getAuthStatus = () => {
            fetch(`${apiUrl}/api/auth-status`, {
              method: 'GET',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' }
            }).then(data => data.json()).then((res) => {
                if (res?.isAuthenticated) {
                    setUser(res?.user);
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
        getAuthStatus();
    }, [apiUrl]);

    const signin = ({ username, password }, callback) => {
        fetch(`${apiUrl}/api/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            credentials: "include",
            headers: { 'Content-type': 'application/json' }
        }).then((response) => response.json()).then((response) => {
            if (response?.success) {
                setUser(response?.user);
            }
            callback(response);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const signup = ({ username, password }, callback) => {
        fetch(`${apiUrl}/api/register`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' }
        }).then((response) => response.json()).then((response) => {
            callback(response);
        });
    };

    const signout = () => {
        setIsLoading(true);
        fetch(`${apiUrl}/api/logout`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-type': 'application/json' }
        }).then((response) => response.json()).then((response) => {
            if (response?.success) {
                setUser(null);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const updateUserColor = (color) => {
        fetch(`${apiUrl}/api/update-color`, {
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify({ color }),
            headers: { 'Content-type': 'application/json' }
        }).then((response) => response.json()).then((response) => {
            if (response?.success) {
                setUser(prev => ({ ...prev, primaryColor: response.primaryColor }));
            }
        });
    };

    return (
        <AuthContext.Provider value={{ isLoading, user, signin, signup, signout, updateUserColor }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within a AuthContextProvider');
    }
    return context;
};

