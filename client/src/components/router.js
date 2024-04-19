import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import M from "materialize-css";
const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handledisabledAllTask = () => {
    M.toast({ html: "please login", classes: "#c62828 red darken-3" });
  };

  const handleAllTask = () => {
    navigate("/");
  };

  const handleAssignedTask = () => {
    navigate("/assignedtask");
  };

  const handleMyTask = () => {
    navigate("/mytask");
  };

  const createtask = () => {
    navigate("/createtask");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <>
          <button
            disabled
            className="navigator-btn"
            onClick={handledisabledAllTask}
          >
            All TASK
          </button>
          <button
            disabled
            className="navigator-btn"
            onClick={handleAssignedTask}
          >
            ASSIGNED TASK
          </button>
          <button disabled className="navigator-btn" onClick={handleMyTask}>
            MY TASK
          </button>
          <button disabled onClick={createtask} className="navigator-btn">
            CREATE TASK
          </button>
        </>
      ) : (
        <>
          <button className="navigator-btn" onClick={handleAllTask}>
            All TASK
          </button>

          <button className="navigator-btn" onClick={handleAssignedTask}>
            ASSIGNED TASK
          </button>

          <button className="navigator-btn" onClick={handleMyTask}>
            MY TASK
          </button>

          <button onClick={createtask} className="navigator-btn">
            CREATE TASK
          </button>
        </>
      )}
    </div>
  );
};

export default Routers;
