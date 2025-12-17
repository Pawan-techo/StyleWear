import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action";
import { useNavigate } from "react-router-dom";

export default function Login({ switchToRegister }) {

  const dispatch = useDispatch();
  const { auth,error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData,navigate));
  };
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      {error && (
        <p className="text-red-500 text-center font-medium mb-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Grid container spacing={3}>
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
              autoComplete="current-password"
            />
          </Grid>

          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-medium 
               py-2 px-0 rounded transition-colors duration-300 cursor-pointer"
            >
              Login
            </button>
          </div>
        </Grid>
      </form>

      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <button onClick={switchToRegister} className="text-blue-600 font-medium cursor-pointer">
          Register
        </button>
      </p>
    </div>
  );
}
