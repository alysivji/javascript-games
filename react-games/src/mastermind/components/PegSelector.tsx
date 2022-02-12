import { useState } from "react";

import { CODE_PEGS } from "../constants";

type Props = {};

const PegSelector = ({ }: Props) => {
  const [colorSelected, setColorSelected] = useState("");

  const pegs = Object.entries(CODE_PEGS).map(([pegColor, pegSvg]) => {
    return (
      <img
        src={pegSvg}
        key={pegColor}
        width="30"
        height="30"
        onClick={() => {
          console.log(colorSelected);
          setColorSelected(pegColor);
        }}
      ></img>
    );
  });

  return <div>{pegs}</div>;
};

export default PegSelector;
