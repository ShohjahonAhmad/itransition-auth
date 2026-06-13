import { useNavigate } from "react-router";

export default function RegisterSuccess() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Registration successful
        </h2>

        <p className="mt-5 text-center text-sm/6 text-gray-400">
          Please check your email and click the verification link.
        </p>
        <p className="mt-1 text-center text-sm/6 text-gray-400">
          Once your account is verified, you can sign in.
        </p>
        <div className="mt-10 flex w-full py-2 px-4 bg-gray-800 border border-gray-700 rounded-md">
          <p className="text-center text-sm/6 text-gray-400">
            Didn't receive an email? Check your spam folder or wait a few
            minutes. The link expires in 15 minutes.
          </p>
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => navigate("/login")}
        >
          Go to Sign in
        </button>
      </div>
    </div>
  );
}
