import { LoginForm } from "../../components/authentication/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen ">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                Welcome Back 👋
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Please sign in to your account
              </p>
            </div>

            {/* ✅ Login Form */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
