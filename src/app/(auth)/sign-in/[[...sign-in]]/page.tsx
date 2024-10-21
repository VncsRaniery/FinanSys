import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return <SignIn redirectUrl="/dashboard" />;
};

export default SignInPage;