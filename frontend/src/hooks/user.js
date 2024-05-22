import { useSelector } from "react-redux";
import { clearAccessToken, setAccessToken } from "../store/authSlice";
import { serverDown, serverUp } from "../store/serverStatus";
import client from "./client";

export async function isAuthenticated(dispatch) {
    try {

        await client.get('/api/status')
            .then((res) => {
                console.log(res.data.msg);
                dispatch(serverDown())
            })
            .catch((err) => {
                console.log('Server Down');
                if (err.response && err.response.status === 500) {
                    // console.error(err.response)
                    dispatch(serverUp());
                    return;
                }
            })
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.log("Don't have Access token, Login with password");
            return;
        }
        await client.get('/api/user/getCurrentUser', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                // console.log(res);
                if (res.status === 200 && res.data.accessToken) {
                    const { accessToken, username, avatar, id } = res.data;
                    const user = { username, avatar, id };
                    // console.log(accessToken);
                    dispatch(setAccessToken({ accessToken, user }));

                }
            }).catch(function (error) {
                //console.log(error.response)
                dispatch(clearAccessToken());
                localStorage.removeItem('accessToken');
                if (error.response && error.response.status === 401) console.log("Unauthorized")
                else {

                    console.log("Login Again ", error.response.data);
                    return;

                }
                // console.log(error.request.response);
            }).finally(() => {
                // console.log('finally');
            });
    } catch (err) {
        console.error("Error while checking isAuthenticated:", err);
    }
}

export async function logout(dispatch) {
    try {

        await client.post('/api/user/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => {
                console.log(res.msg);
                localStorage.removeItem('accessToken');
                dispatch(clearAccessToken());
            })
        // console.log(localStorage.getItem('accessToken'));
    } catch (error) {

        console.error("Error while logout : ", error);
    }
}
