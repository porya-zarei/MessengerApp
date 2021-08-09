export const groupsReducer = (state = [], action) => {
    switch (action.type) {
        case "Initial": {
            return [...action.payload];
        }
        case "addGroup": {
            let groups = [...state];
            groups.push(action.payload.Group);
            console.log("in add new Group => ", groups, action.payload.Group);
            return [...groups];
        }
        case "updateGroup": {
            let groups = [...state];
            let newGroups = groups.filter(
                (g) => g.GroupID !== action.payload.Group.GroupID,
            );
            newGroups.push(action.payload.Group);
            console.log("group updated after join new person => ", newGroups);
            return [...newGroups];
        }
        case "removeGroup": {
            let groups = [...state];
            let newGroups = groups.filter(
                (c) => c.GroupID !== action.payload.GroupID,
            );
            return [...newGroups];
        }
        case "addGroupChat": {
            let groups = [...state];
            let group = {
                ...groups.find(
                    (g) => g.GroupID === action.payload.Chat.GroupID,
                ),
            };
            if (
                !group.Chats.includes(
                    (ch) => ch.ChatID === action.payload.Chat.ChatID,
                )
            ) {
                group.Chats.push(action.payload.Chat);
            }
            let newGroups = groups.filter((g) => g.GroupID !== group.GroupID);
            newGroups.push(group);
            return [...newGroups];
        }
        case "updateGroupChat": {
            let groups = [...state];
            let group = {
                ...groups.find(
                    (group) => group.GroupID === action.payload.Chat.GroupID,
                ),
            };
            let chatIndex = group.Chats.findIndex(
                (chat) => chat.ChatID === action.payload.Chat.ChatID,
            );
            group.Chats.splice(chatIndex, 1, action.payload.Chat);
            let newGroups = [
                ...groups.filter((gr) => gr.GroupID !== group.GroupID),
            ];
            newGroups.push(group);
            return [...newGroups];
        }
        case "deleteGroupChat": {
            let groups = [...state];
            let group = {
                ...groups.find(
                    (group) => group.GroupID === action.payload.GroupID,
                ),
            };
            let newGroups = [
                ...groups.filter((ro) => ro.GroupID !== group.GroupID),
            ];
            let chatIndex = group.Chats.findIndex(
                (ch) => ch.ChatID === action.payload.ChatID,
            );
            group.Chats.splice(chatIndex, 1);
            newGroups.push(group);
            return [...newGroups];
        }
        case "addGroupsChats": {
            let groups = [...state];
            let updatedGroups = [];
            let groupsIdSet = new Set();

            action.payload.Chats.forEach((chat) =>
                groupsIdSet.add(chat.GroupID),
            );

            groupsIdSet.forEach((groupId) => {
                let groupChats = action.payload.Chats.filter(
                    (ch) => ch.GroupID === groupId,
                );
                let group = {
                    ...groups.find((g) => g.GroupID === groupId),
                };
                for (let chat in groupChats) {
                    if (
                        !group.Chats.includes(
                            (ch) => ch.ChatID === action.payload.Chat.ChatID,
                        )
                    ) {
                        group.Chats.push(chat);
                    }
                }

                updatedGroups.push(group);
            });
            let outGroups = groups.filter((gr) => !groupsIdSet.has(gr.GroupID));
            outGroups.push(updatedGroups);
            return [...outGroups];
        }
        default:
            return state;
    }
};
