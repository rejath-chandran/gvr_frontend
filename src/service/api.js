import axios from "axios";

// const API_URL = "http://localhost:8000/api";
const API_URL= "http://50.16.50.105:3000/api";


export const api = axios.create({
  baseURL: API_URL,
});

export const signup = (email, password) =>
  api.post("/auth/signup", { email, password });
export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const getUser = () => api.get("/auth/user");
