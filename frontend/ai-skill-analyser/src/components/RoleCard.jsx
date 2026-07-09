import React from "react";
import styles from "./Rolecard.module.css";

const RoleCard = ({ role, isSelected, onClick }) => {
  return (
    <div
      onClick={() => {
        console.log("clicked hua hai");
        onClick(role);
      }}
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
    >
      <div className={styles.icon}>{role.icon}</div>

      <h4 className={styles.title}>{role.title}</h4>
    </div>
  );
};

export default RoleCard;
