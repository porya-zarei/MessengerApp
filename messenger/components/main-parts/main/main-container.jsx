const MainContainer = ({children}) => {
    return (
        <div className="w-100 m-0 p-0 mt-4 m4-inmdlg">
            <div className="w-100 m-0 p-0 row justify-content-evenly align-items-center">
                {children}
            </div>
        </div>
    );
};

export default MainContainer;