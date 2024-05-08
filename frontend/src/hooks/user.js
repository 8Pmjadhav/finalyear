import axios from "axios";
import { clearAccessToken, setAccessToken } from "../store/authSlice";




  
export async function isAuthenticated(dispatch) {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log(accessToken,'\n',refreshToken);
        if(!accessToken && refreshToken ){
            //console.log('hi');
            await axios.post('/api/user/refreshToken')
                .then((response) =>{
                    console.log(response.data);
                    if(response.status === 200){
                        localStorage.setItem('refreshToken',response.data.refreshToken);
                        localStorage.setItem('accessToken',response.data.accessToken);
                    }
                })
                .catch(err =>{
                    if(err.response && err.response.status === 401) {
                        console.log("Unauthorized ,",err.response.data);
                    }
                        else console.log("An error occured")
                })
        }
        if(!accessToken)    return;
        
        await axios.get('/api/user/getCurrentUser') 
         .then((res) => {
            //console.log(res);
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
                //console.log(error.response)
                if(error.response && error.response.status === 401) console.log("Unauthorized")
                    else console.log("An error occured")
                // console.log(error.request.response);
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    } catch (error) {
        console.error("Error while logout : ", error);
    }
}