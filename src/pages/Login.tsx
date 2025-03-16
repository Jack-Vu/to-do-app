import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("hello");

    await axios
      .post("http://localhost:4000/auth/register", { name: "test", email: "12345" })
      .then(async (response) => {
        console.log(await response.data);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="flex text-5xl text-red-500">Hello</div>
      <input
        className="border"
        type="text"
        onChange={onNameChange}
        placeholder="name"
      ></input>
      <input
        className="border"
        type="text"
        onChange={onEmailChange}
        placeholder="email"
      ></input>
      <button className="btn btn-circle" onClick={handleSubmit}>
        Push me
      </button>
    </>
  );
};

export { Login };
