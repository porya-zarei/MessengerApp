const Emoji = ({emoji,onClick}) => {
    return (
        <div
            role="img"
            onClick={onClick}
            className="curser-pointer">
            {emoji}
        </div>
    );
};

export default Emoji;
{
    /*
<span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
*/
}