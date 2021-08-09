export const roomsReducer = (state = {}, action) => {
    switch (action.type) {
        case "Initial": {
            return [...action.payload];
        }
        case "addRoom": {
            let rooms = [...state];
            rooms.push(action.payload.Room);
            return [...rooms];
        }
        case "updateRoom": {
            let rooms = [...state];
            let newRooms = rooms.filter(
                (g) => g.RoomID !== action.payload.Room.RoomID,
            );
            newRooms.push(action.payload.Room);
            console.log("group updated after join new person => ", newRooms);
            return [...newRooms];
        }
        case "addRoomChat": {
            let rooms = [...state];
            console.log("in add room chat => ", rooms, action.payload);
            let room = {
                ...rooms.find((r) => r.RoomID === action.payload.Chat.RoomID),
            };
            if (
                room.Chats[room.Chats?.length - 1].ChatID !==
                action.payload.Chat?.ChatID
            ) {
                room.Chats.push(action.payload.Chat);
            }
            let newRooms = rooms.filter((r) => r.RoomID !== room.RoomID);
            newRooms.push(room);
            return [...newRooms];
        }
        case "updateRoomChat": {
            console.log(
                "in update channel chat reducer => ",
                action.payload,
                state,
            );
            let rooms = [...state];
            let room = {
                ...rooms?.find(
                    (room) => room.RoomID === action.payload.Chat.RoomID,
                ),
            };
            let chatIndex = room?.Chats?.findIndex(
                (chat) => chat.ChatID === action.payload.Chat.ChatID,
            );
            room.Chats.splice(chatIndex, 1, action.payload.Chat);
            console.log("updated room chat => ", room);
            let newRooms = [...rooms.filter((ro) => ro.RoomID !== room.RoomID)];
            newRooms.push(room);
            return [...newRooms];
        }
        case "deleteRoomChat": {
            let rooms = [...state];
            let room = {
                ...rooms.find((room) => room.RoomID === action.payload.RoomID),
            };
            let newRooms = [...rooms.filter((ro) => ro.RoomID !== room.RoomID)];
            let chatIndex = room.Chats.findIndex(
                (ch) => ch.ChatID === action.payload.ChatID,
            );
            room.Chats.splice(chatIndex, 1);
            newRooms.push(room);
            return [...newRooms];
        }
        case "addRoomsChats": {
            let rooms = [...state];
            let updatedRooms = [];
            let roomsIdSet = new Set();

            action.payload.Chats.forEach((chat) => roomsIdSet.add(chat.RoomID));
            roomsIdSet.forEach((roomId) => {
                let roomChats = action.payload.Chats.filter(
                    (ch) => ch.RoomID === roomId,
                );
                let room = {
                    ...rooms.find((r) => r.RoomID === roomId),
                };
                for (let chat in roomChats) {
                    if (
                        !room.Chats.includes(
                            (ch) => ch.ChatID === action.payload.Chat.ChatID,
                        )
                    ) {
                        room.Chats.push(chat);
                    }
                }
                updatedRooms.push(room);
            });
            let outRooms = rooms.filter((ro) => !roomsIdSet.has(ro.RoomID));
            outRooms.push(updatedRooms);
            return [...outRooms];
        }
        default:
            return state;
    }
};
