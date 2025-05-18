import React from "react";
//buttons icons
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";

const Card = ({ item, handleDelete, handleUpdate }) => {
  return (
    <div className="card">
      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => handleUpdate(item)}>
          <GrEdit />
        </button>
        <button onClick={() => handleDelete(item.id)}>
          <RiDeleteBin7Fill />
        </button>
      </div>
      {/* Details */}
      <h1>
        {item.name[0]} {item.surname[0]}
      </h1>
      <h3>
        <span>{item.name}</span>
        <span> {item.surname}</span>
      </h3>
      <p>{item.position}</p>
      <p>{item.company}</p>

      {/* bottom */}
      <div className="bottom">
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{item.phone}</span>
        </div>
        <div>
          <span>
            <IoMailOpen />
          </span>
          <span>{item.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
