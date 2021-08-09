const Emoji = ({emoji, setText}) => {
    return (
        <button onClick={() => setText((p) => `${p + emoji}`)} className="">
            {emoji}
        </button>
    );
};

export default Emoji;
