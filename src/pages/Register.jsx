import { useLayoutEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"
import { auth, firestore } from "../lib/firebase.lib";

export default function Register() {
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const { value: fullName } = event.target.fullName;
    const { value: email } = event.target.email;
    const { value: password } = event.target.password;

    if (email && password) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const { uid } = userCredentials.user;
        const docRef = doc(firestore, "users", uid);
        await setDoc(docRef, {
          fullName,
        });
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
            type="text"
            name="fullName"
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
        </label>
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
      </form>
    </div>
  )
}

