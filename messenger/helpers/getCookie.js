export const getcookie = (req, key) => {
    try {
        let stringCookie = req.headers.cookie||req.cookies;
        console.log("string cookie => ",stringCookie);
        if (stringCookie?.length === 0) {
            return null;
        }
        let sp1 = stringCookie.split("; ");
        let cookies = sp1.map((co) => {
            let arrCo = co.split("=");
            let result = {};
            result[`${arrCo[0]}`] = `${arrCo[1]}`;
            return result;
        });
        if (!key || key === null || key === "") {
            return cookies;
        } else {
            let cook = cookies.find((co) => co[key] !== null);
            return cook[key];
        }
    } catch (error) {
        return null;
    }
};
