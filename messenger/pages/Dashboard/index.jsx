import DashBoardLayout from "../../components/dashboard/layout/dashboard-layout";
import DashboardHome from '../../components/dashboard/routes/home/dashboard-home';
const DashboardPage = () => {
    return <DashboardHome />;
};
DashboardPage.getLayout = function getLayout(page) {
    return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default DashboardPage;
