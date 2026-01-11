import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../Loader";
import AllLayout from "../Layout/AllLayout";


function AllPages(){
    const isAuthenticated=true;
    const loader=false;
    // const navigate=useNavigate();
   if(loader){
    return(
      <div className='loader_container'>
        <Loader />
      </div>
    )
   }
    
    return isAuthenticated ? (
           <AllLayout>
           <Outlet/>
           </AllLayout>
    ):(<Navigate to="/login" replace/>)
};
export default AllPages;