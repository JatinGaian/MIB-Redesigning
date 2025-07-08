import React from "react";
import PropTypes from "prop-types";

const AVATAR_SIZE = 1.4 ; // vw
const OVERLAP = 0.4;   // vw

const PeopleAvatar = ({ people }) => {
  const visible_avatar = people.slice(0, 3);
  const extra_users = people.length - visible_avatar.length;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {visible_avatar.map((person, idx) => (
        <img
          key={idx}
          src={person.image}
          alt={person.name}
          style={{
            width: `${AVATAR_SIZE}vw`,
            height: `${AVATAR_SIZE}vw`,
            borderRadius: "50%",
            objectFit: "cover",
            border: "0.13vw solid white",
            marginLeft: idx === 0 ? 0 : `-${OVERLAP}vw`,
            boxShadow: "0 0.2vw 0.8vw rgba(0,0,0,0.06)",
            backgroundColor: "#eee",
          }}
        />
      ))}

      {extra_users > 0 && (
        <div
          style={{
            width: `${AVATAR_SIZE}vw`,
            height: `${AVATAR_SIZE}vw`,
            borderRadius: "50%",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: extra_users > 10 ? "0.7vw" : "0.8vw",
            color: "#333",
            marginLeft: `-${OVERLAP}vw`,
            border: "0.13vw solid white",
            boxShadow: "0 0.2vw 0.8vw rgba(0,0,0,0.06)",
          }}
        >
          +{extra_users}
        </div>
      )}
    </div>
  );
};

PeopleAvatar.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default PeopleAvatar;
