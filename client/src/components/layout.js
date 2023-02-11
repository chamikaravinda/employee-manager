import { Container } from "@mui/system";
import Navbar from "./navbar";

const Layout = ({children}) => {
    return ( 
        <div>
            <Navbar/>
            <div className="content">
                {children}
            </div>
        </div>
     );
}
 
export default Layout;