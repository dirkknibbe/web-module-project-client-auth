import React, { useState } from "react";

// {
//   id: 1
//   name: 'Joe',
//   age: 24,
//   email: 'joe@lambdaschool.com',
// }

const initialFormValues = { id: 1, name: "", age: "", email: "" };

export default function AddFriend(props) {
  const [values, setValues] = useState(initialFormValues);
  const { postFriend } = props;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postFriend(values);
    setValues(initialFormValues);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Add Friend</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.name}
        placeholder="Enter name"
        id="name"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={values.age}
        placeholder="Enter age"
        id="age"
      />
      <button id="submitFriend">Submit</button>
    </form>
  );
}
