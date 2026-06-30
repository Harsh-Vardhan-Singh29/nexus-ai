import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-950">

            <div className="rounded-2xl bg-slate-900 p-10">

                <h1 className="mb-6 text-3xl font-bold text-white">

                    Welcome to NEXUS AI

                </h1>

                <GoogleLoginButton />

            </div>

        </div>

    );

}