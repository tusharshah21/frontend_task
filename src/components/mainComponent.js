import React, { useEffect } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
function MainComponent(props) {
  const { getUsers, userState, addUser,deleteUser,editUser} = props;

  const handleSubmit = ({ name, email }) => {
    addUser({ name, email });
  };
  const handleDelete=(userId)=>{
    deleteUser(userId)
  }
  const handleEdit=(editingUser)=>{
    editUser(editingUser)
  }
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit}  />
      <SimpleTable dataSource={userState.users} onDeleteRecord={handleDelete} onEditRecord={handleEdit} />
    </div>
  );
}

export default MainComponent;
