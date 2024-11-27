import { GoogleLogin } from "react-google-login";

function Login(){
    const cleintID="307917576076-d92jmjbpmg7fq86etam3u8j9kep74qnp.apps.googleusercontent.com"

    const onSuccess = (res) => {
        console.log("Succesful login, current user: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("Login failed, res: ", res);
    }
    
    return (
        <div>
            <GoogleLogin
                clientId={cleintID}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}/>
        </div>
    )
}

export default Login;