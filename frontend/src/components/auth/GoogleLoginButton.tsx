import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                    console.log("API URL:", import.meta.env.VITE_API_URL);
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/auth/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token: credentialResponse.credential,
                            }),
                        }
                    );

                    const data = await response.json();
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    window.location.href = "/";


                    // We'll save the JWT here in the next step
                    // localStorage.setItem("token", data.access_token);

                    // We'll redirect after JWT is implemented
                    // window.location.href = "/";
                } catch (err) {
                    console.error("Google Login Error:", err);
                }
            }}
            onError={() => {
            }}
        />
    );
}