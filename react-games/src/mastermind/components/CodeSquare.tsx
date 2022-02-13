import { useState } from "react";

import PegSelector from "./PegSelector";

type Props = {
  enableInteraction: boolean;
};

const CodeSquare = ({ enableInteraction }: Props) => {
  const [colorSelected, setColorSelected] = useState("");
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  return (
    <div
      className="codeSquare"
      onClick={() => {
        if (!enableInteraction) return
        setShowSelectorBox(!showSelectorBox)
      }}
    >
      <div>placeholder</div>
      {/* todo make this a box we cann show and then make it visible onclick */}
      <div>Selected Color: {colorSelected}</div>
      <PegSelector
        visible={showSelectorBox}
        passColorSelectedData={setColorSelected}
      />
    </div>
  );
};

export default CodeSquare;
