import LogInForm from "@/components/LogInForm";

const LogInPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-[25rem] border rounded-md px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h1>
        <LogInForm />
      </div>
    </div>
  );
};

export default LogInPage;
