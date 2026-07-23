import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
  e.preventDefault();

  const result = await login(email, password);

  if (!result.success) {
    alert(result.message);
    return;
  }

  navigate("/");
}

  return (
    <div className="bg-[#eaeded] min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8">
          Sign In
        </h1>

        <label className="font-semibold">
          Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mt-2 mb-6"
          placeholder="Enter your email"
        />

        <label className="font-semibold">
          Password
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mt-2 mb-6"
          placeholder="Enter your password"
        />

        <button
  type="submit"
  className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold"
>
  Sign In
</button>

        <p className="mt-6 text-center">
          New customer?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;