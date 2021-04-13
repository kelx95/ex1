import React from "react";
import { Loader } from "./styles";
import GridLoader from "react-spinners/GridLoader";

export default function Loading({ color }) {
  return (
    <Loader>
      <GridLoader color={color} />
    </Loader>
  );
}
