import "../index.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../service/api";

import { Loading } from "./Loading";

const Home = () => {
  const [user, Setuser] = useState();
  const { token, logout } = useAuth();
  const [isloading, SetLoading] = useState(false);

  if (!token) {
    return (
    <Loading/>
    );
  }

  useEffect(() => {
    const fetchuserdetails = async () => {
      const response = await getUser();
      Setuser(response.data);
      SetLoading(false);
    };

    SetLoading(true);
    fetchuserdetails();
  }, []);

  return (
    <div>
      <>
        {isloading ? (
         <Loading/>
        ) : (
          <>
            {user && <h2>Welcome {user.email}</h2>}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </>
    </div>
  );
};

export default Home;
