import { useState } from "react";

import PegSelector from "./PegSelector";

type Props = {};

const CodeSquare = ({}: Props) => {
  const [colorSelected, setColorSelected] = useState("");
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  return (
    <div>
      <PegSelector
        visible={showSelectorBox}
        passColorSelectedData={setColorSelected}
      />
      <div onClick={() => setShowSelectorBox(!showSelectorBox)}>value</div>
      <div>Selected Color: {colorSelected}</div>
    </div>
  );
};

export default CodeSquare;
