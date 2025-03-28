import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const showHidePassword = () => {
    setShow((prev) => !prev);
  };

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:4000/login", formData)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        // currently using a useEffect on profile to set user
        // setUser(user);
        navigate(`/${formData.username}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-5xl text-red-500">Hello</div>
      <input
        className="border p-1 rounded-md outline-none"
        type="text"
        name="username"
        onChange={handleFormDataChange}
        placeholder="username"
      />
      <div className="flex gap-2 border items-center p-1 rounded-md">
        <input
        className="outline-none"
          type={show ? "text" : "password"}
          name="password"
          onChange={handleFormDataChange}
          placeholder="password"
        />
        <button className="btn btn-xs" onClick={showHidePassword}>
          Show Password
        </button>
      </div>
      <button className="btn" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export { Login };
