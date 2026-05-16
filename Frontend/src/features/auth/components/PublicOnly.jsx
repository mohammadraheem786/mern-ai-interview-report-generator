import { Navigate }
from "react-router-dom";

import { useAuth }
from "../hooks/useAuth";

const PublicOnly = ({

    children

}) => {

    const {

        user,
        loading

    } = useAuth();

    // Optional Loading State

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

                Loading...

            </div>

        );

    }

    // Already Logged In

    if (user) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }

    // Not Logged In

    return children;

};

export default PublicOnly;