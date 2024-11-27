import { GoogleLogout } from "react-google-login";

const cleintID="307917576076-d92jmjbpmg7fq86etam3u8j9kep74qnp.apps.googleusercontent.com"

function Logout(){

    const onSuccess = () => {
        console.log("Logout made successfully");
        alert("Logout made successfully ✌");
    }
    return (
        <div>
            <GoogleLogout
                clientId={cleintID}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}/>
        </div>
    )
}
export default Logout;