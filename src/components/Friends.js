import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Friends(props) {
  const { friends, getFriends } = props;

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="friends">
      <h2>Friends</h2>
      {friends.map((fr) => {
        return (
          <div className="friends" key={fr.id}>
            <div>
              <h3>{fr.name}</h3>
              <p>{fr.age}</p>
              <p>{fr.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
