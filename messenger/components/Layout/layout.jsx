import UserDataContextProvider from "../../context/data-context/data-context";
import UserContextProvider from "../../context/user-context/user-context";
import ViewContextProvider, { ViewContext } from "../../context/view-context/view-context";
import Dialogs from "../dialogs/dialogs";
import ContextMenu from "../context-menu/context-menu";
import MainContainer from "../main-parts/main/main-container";
import FooterLayout from "./footer/footer-layout";
import HeaderLayout from "./header/header-layout";
import MainLayout from "./main/main-layout";
import MetaLayout from "./meta-layout";
import { useContext } from "react";

const Layout = ({children}) => {
    
    return (
        <MainContainer>
            <ViewContextProvider>
                <UserDataContextProvider>
                    <UserContextProvider>
                        <div className="h-100 m-0 p-0 w-100 position-relative">
                            <MetaLayout />
                            <HeaderLayout />
                            <MainLayout>{children}</MainLayout>
                            <Dialogs />
                            <ContextMenu/>
                            <FooterLayout />
                        </div>
                    </UserContextProvider>
                </UserDataContextProvider>
            </ViewContextProvider>
        </MainContainer>
    );
};

export default Layout;
