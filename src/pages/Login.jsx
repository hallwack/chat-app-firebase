import { useLayoutEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase.lib";

export default function Login() {
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const { value: email } = event.target.email;
    const { value: password } = event.target.password;

    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        window.alert(err.message);
      }
    }
  }

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="max-w-md w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <span className="text-2xl font-bold">Chat App</span>
        </div>
        <label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Password"
          />
        </label>
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
        <div className="text-center">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </form>
    </div>
  )
}

