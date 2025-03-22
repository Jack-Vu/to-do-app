import axios from "axios";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";

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
    console.log(formData);

    await axios
      .post("http://localhost:4000/login", formData)
      .then((response) => {
        console.log(response.data);

        const token = response.data;
        localStorage.setItem("token", token);
        navigate(`/profile/${formData.username}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="flex text-5xl text-red-500">Hello</div>
      <input
        className="border"
        type="text"
        name="username"
        onChange={handleFormDataChange}
        placeholder="username"
      />
      <input
        className="border"
        type={show ? "text" : "password"}
        name="password"
        onChange={handleFormDataChange}
        placeholder="password"
      />
      <button className="btn btn-xs" onClick={showHidePassword}>
        Show Password
      </button>
      <button className="btn btn-circle" onClick={handleSubmit}>
        Push me
      </button>
    </>
  );
};

export { Login };
