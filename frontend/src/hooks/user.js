import axios from "axios";
import { clearAccessToken, setAccessToken } from "../store/authSlice";
import { serverDown, serverUp } from "../store/serverStatus";


export async function isAuthenticated(dispatch) {
    try {

        const accessToken = localStorage.getItem('accessToken');

        await axios.get('/api/status')
            .then((res) => {
                console.log(res.data.msg);
                dispatch(serverDown())
            })
            .catch((err) => {
                //console.log(err);
                if (err.response && err.response.status === 500) {
                    console.error(err.response)
                    dispatch(serverUp());
                    //return
                }
            })


        if (!accessToken) {
            console.log("Don't have Access token, Login with password");
            return;
        }
        await axios.get('/api/user/getCurrentUser', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
            })
            .then((res) => {
                //console.log(res);
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
        await axios.post('/api/user/logout')
            .then((res) => console.log(res))
        localStorage.removeItem('accessToken');
        dispatch(clearAccessToken());
    } catch (error) {
        console.error("Error while logout : ", error);
    }
}
