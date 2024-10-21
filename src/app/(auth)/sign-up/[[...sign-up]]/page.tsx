import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return <SignUp redirectUrl="/dashboard" />;
};

export default SignUpPage;
