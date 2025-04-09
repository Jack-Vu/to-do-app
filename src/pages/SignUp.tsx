import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    // console.log(formData);

    await axios
      .post("http://localhost:4000/signup", formData)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-5xl text-red-500">Hello</div>
      <input
        className="border p-1 outline-none"
        type="text"
        name="firstName"
        onChange={handleFormDataChange}
        placeholder="First Name"
      />
      <input
        className="border p-1 outline-none"
        type="text"
        name="lastName"
        onChange={handleFormDataChange}
        placeholder="Last Name"
      />
      <input
        className="border p-1 outline-none"
        type="text"
        name="username"
        onChange={handleFormDataChange}
        placeholder="Username"
      />
      <input
        className="border p-1 outline-none"
        type="email"
        name="email"
        onChange={handleFormDataChange}
        placeholder="Email"
      />
      <div className="flex gap-2 border items-center p-1">
        <input
          className="outline-none"
          type={show ? "text" : "password"}
          name="password"
          onChange={handleFormDataChange}
          placeholder="Password"
        />
        <button className="btn btn-xs " onClick={showHidePassword}>
          Show Password
        </button>
      </div>
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export { SignUp };
