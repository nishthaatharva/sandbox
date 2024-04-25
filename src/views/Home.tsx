import useAuth from "@/utils/hooks/useAuth";
import useAuthority from "@/utils/hooks/useAuthority";

const Home = () => {
    const { decodedToken } = useAuth();
    const isAdmin = useAuthority(decodedToken?.roles, ['Administrator']);
    
    if (isAdmin) {
        return <div>Home</div>; // Render Home component if user is admin
    } else {
        return <div>No Access</div>; // Render nothing if user is not admin
    }
}

export default Home
