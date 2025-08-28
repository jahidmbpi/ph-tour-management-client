import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return <div>this is otp verify page </div>;
}
