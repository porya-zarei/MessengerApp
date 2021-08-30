import DashboardFooter from "./footer/dashboard-footer";
import DashboardHeader from "./header/dashboard-header";
import DashboardMain from "./main/dashboard-main";

const DashBoardLayout = ({children}) => {
    return ( 
        <div>
            <DashboardHeader/>
            <DashboardMain>
                {children}
            </DashboardMain>
            <DashboardFooter/>
        </div>
     );
}
 
export default DashBoardLayout;