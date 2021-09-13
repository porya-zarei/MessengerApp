import {memo, useContext, useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import UserDataContextProvider from "../../context/data-context/data-context";
import UserContextProvider from "../../context/user-context/user-context";
import ViewContextProvider, {
    ViewContext,
} from "../../context/view-context/view-context";
import ContextMenu from "../context-menu/context-menu";
import Dialogs from "../dialogs/dialogs";
import HeaderLayout from "../Layout/header/header-layout";
import MainLayout from "../Layout/main/main-layout";
import ChatLists from "../main-parts/chat-lists/chat-lists";
import ChatView from "../main-parts/chat-view/chat-view";

const Container = () => {
    console.log("in container");
    const {isMobile, isInChat} = useContext(ViewContext);
    
    return (
        <>
            <HeaderLayout />
            <MainLayout>
                <div className="w-100 row m-0 p-0" style={{height: "100vh"}}>
                    <div
                        className={`col-md-4 col-lg-4 col-sm-12 h-100 bg-transparent p-0 ${
                            isInChat && isMobile && "hidden-sm"
                        } m-0`}>
                        <ChatLists />
                    </div>
                    <div
                        className={`col-md-8 col-lg-8 col-sm-12 h-100 bg-transparent ${
                            !isInChat && isMobile && "hidden-sm"
                        } p-0 m-0`}>
                        <ChatView />
                    </div>
                </div>
            </MainLayout>
            <Dialogs />
            <ContextMenu />
        </>
    );
};

export default Container;
