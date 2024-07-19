import React, { useState } from "react";
import './commonInput.css'
import { Button,Input } from "antd";
const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const validateMail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    if(validateMail(email)){
      onSubmit({ name, email });
      console.log(name)
      setEmail("");
      setName("");
    }
    else{
      alert("Enter valid Email")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        value={name}
        placeholder="Name"
        required
        onChange={(e) => 
          setName(e.target.value)
        }
      />
      <Input
        value={email}
        placeholder="Email"
        required
        onChange={(e) => 
          setEmail(e.target.value)
        }
      />
      <Button type="primary" htmlType="submit">
        {!!editMode ? "Edit user" : "Add user"}
      </Button>
    </form>
  );
};

export default InputHandler;