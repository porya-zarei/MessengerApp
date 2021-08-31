import Cookies from "cookies";
import {useRouter} from "next/router";
import {useEffect} from "react";
import DashboardContextProvider from "../../components/dashboard/context/dashboard-context";
import DashBoardLayout from "../../components/dashboard/layout/dashboard-layout";
import DashboardHome from "../../components/dashboard/routes/home/dashboard-home";
import {api_url} from "../../configs/configs";
import {fetcher} from "../../hooks/fetcher";
const DashboardPage = ({isError, adminData, allData}) => {
    const router = useRouter();
    useEffect(() => {
        if (isError) {
            router.replace("/");
        }
    }, []);
    if (isError) {
        return <div> access denied</div>;
    }
    return (
        <DashboardContextProvider data={allData} adminData={adminData}>
            <DashboardHome adminData={adminData} data={allData} />
        </DashboardContextProvider>
    );
};
DashboardPage.getLayout = function getLayout(page) {
    return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default DashboardPage;

export async function getServerSideProps({req, res}) {
    try {
        let cookies = new Cookies(req, res);
        const token = cookies.get("Token");
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        console.log(`token in serverside => `, token);

        if (token === null) {
            return {
                props: {isError: true},
            };
        }
        // const {result: allData, isError} = await fetcher(
        //     "GET",
        //     "Dashboard/GetAllDataForAdmin",
        //     null,
        //     token,
        // );
        // const {result: adminData, isError: isError2} = await fetcher(
        //     "GET",
        //     "Dashboard/GetUserDataForAdmin",
        //     null,
        //     token,
        // );
        // console.log("data in serverside dashboard => ", allData, adminData);
        // if (
        //     allData === null ||
        //     allData === undefined ||
        //     adminData === null ||
        //     adminData === undefined ||
        //     isError ||
        //     isError2
        // ) {
        //     return {
        //         props: {
        //             isError: true,
        //         },
        //     };
        // } else {
        //     return {
        //         props: {
        //             allData,
        //             adminData,
        //         },
        //     };
        // }

        const resp1 = await fetch(`${api_url}/Dashboard/GetAllDataForAdmin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        });

        const resp2 = await fetch(`${api_url}/Dashboard/GetUserDataForAdmin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        });

        if (!resp1.ok || !resp2.ok || !resp1.json || !resp2.json) {
            return {
                props: {isError: true},
            };
        } else {
            return {
                props: {
                    allData: await resp1.json(),
                    adminData: await resp2.json(),
                },
            };
        }
    } catch (err) {
        console.log("error in dashboard serverside", err);
        return {
            props: {
                isError: true,
            },
        };
    }
}
