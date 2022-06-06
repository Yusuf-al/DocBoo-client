import { useEffect, useState } from "react";
const useAuth = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5080/api/v1/auth", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("acc-token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUser(result);
        setLoading(false);
      });
  }, []);

  return [user, loading];
};

export default useAuth;
