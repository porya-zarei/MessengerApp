import CreateChannelDialog from "./create-channel/create-channel-dialog";
import CreateGroupDialog from "./create-group/create-group-dialog";
import CreateRoomDialog from "./create-room/create-room-dialog";

const Dialogs = () => {
    return (
        <div>
            <CreateGroupDialog />
            <CreateChannelDialog/>
            <CreateRoomDialog/>
        </div>
    );
};

export default Dialogs;
