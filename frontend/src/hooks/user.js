import axios from "axios";
import { clearAccessToken, setAccessToken } from "../store/authSlice";

export async function isAuthenticated(dispatch) {
    try {
        await axios.get('/api/user/getCurrentUser') 
         .then((res) => {
            console.log(res);
                if (res.status === 200 && res.data.accessToken) {
                    const { accessToken, username } = res.data;
                    dispatch(setAccessToken({ accessToken, username }));
                } else {
                    console.log(res);
                    dispatch(clearAccessToken());
                }
                if(res.status === 401){
                    console.log('error ** 500');
                }
            }).catch(function (error) {
                console.log(error.request.response);
                dispatch(clearAccessToken());
            }) .finally(() => {
                console.log('finally');
            });
    } catch (err) {
        console.error("Error while checking isAuthenticated:", err);
    }
}

export async function logout(dispatch) {
    try {
        await axios.post('/api/user/logout')
            .then((res) => console.log(res))
        dispatch(clearAccessToken());
    } catch (error) {
        console.error("Error while logout : ", error);
    }
}
