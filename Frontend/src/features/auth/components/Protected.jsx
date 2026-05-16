import {useAuth} from '../hooks/useAuth';
import { Navigate } from 'react-router';
const Protected = ({ children }) => {
    const {user,loading} = useAuth();
    
    if (loading) {
        return <div className="loading"><h1>Loading...</h1></div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected
