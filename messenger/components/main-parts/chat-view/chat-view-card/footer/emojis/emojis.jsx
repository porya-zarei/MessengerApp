import Emoji from "./emoji";
import classes from "./emojis.module.scss";

const Emojis = ({setText}) => {
    const allEmojis = `😀🤣😅😊😍😗☺🤩😐🙄😥😯😁😃😆😋😘😙🙂😑😏😪😂😄🥰😚🤗🤨😶😣🤐😫🥱😛🤤😔🤑🙁😟😭😨🥵🤪😴😜😲😖😤😦😩😰🥶😵😌😝😓🙃☹😞😢😧🤯😱😳🥴😠😷🤢😇🤓👹☠👾😻😡🤒🤮🤡🤭😈👺👻🤖😼🤬🤕🤧🥺🤥👿💀💩😹😽🙋‍♂️🙋‍♀️🤦‍♀️🤦‍♂️🏃‍♂️🏃‍♀️🤏👈👆☝👉👇✌🤞🖖🤘🤙👌✋🖐👍👎✊🤜👊🤛👋🤚🤟🙏👐👏✍🙌🤲🤝`;

    const a =
        "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁 👅 👄 💋 🩸";
    const emojis = a.split(" ");
    return (
        <div className={`${classes.emojisContainer}`}>
            <div className={`${classes.emojis}`}>
                {emojis.map((emoji) => {
                    let key = `${Math.random() * 1000}-${emoji}`;
                    return (
                        <Emoji
                            key={key}
                            onClick={() => setText((p) => `${p + emoji}`)}
                            emoji={emoji}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Emojis;
