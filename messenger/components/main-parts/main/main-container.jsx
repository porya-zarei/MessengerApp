const MainContainer = ({children}) => {
    return (
        <div className="w-100 m-0 p-0 h-auto">
            <div className="w-100 h-auto m-0 p-0 row justify-content-evenly align-items-center">
                {children}
            </div>
        </div>
    );
};

export default MainContainer;