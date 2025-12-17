import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../state/Auth/Action";
import { useEffect } from "react";

export default function Register({ switchToLogin }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    } 
  }, [jwt, auth.jwt]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="lasttName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given name"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="Password"
            />
          </Grid>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-medium 
               py-2 px-0 rounded transition-colors duration-300 cursor-pointer"
              style={{ padding: "0.5rem 0" }}
            >
              Register
            </button>
          </div>
        </Grid>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-blue-600 font-medium cursor-pointer">
          Login
        </button>
      </p>
    </div>
  );
}
