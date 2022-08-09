import UserContext from "../context/UserContext";
import { useState, useContext } from "react";

export default function Timeline() {
  const { token } = useContext(UserContext);
  console.log(token);
  return <></>;
}
