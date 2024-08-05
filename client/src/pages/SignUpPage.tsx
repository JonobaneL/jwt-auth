import SignUpForm from "@/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-[25rem] border rounded-md px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
