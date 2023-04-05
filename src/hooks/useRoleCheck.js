import { useEffect, useState } from "react";

const useRoleCheck = () => {
  const [roleCheck, setRoleCheck] = useState("student");

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const { user } = JSON.parse(localAuth);

      console.log(user);

      if (user?.role === "student") {
        setRoleCheck(user?.role);
      } else {
        setRoleCheck(user?.role);
      }
    }
  }, []);

  return roleCheck;
};

export default useRoleCheck;
