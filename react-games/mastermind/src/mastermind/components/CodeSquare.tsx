import { useState } from "react";

import { CODE_PEGS } from "../constants";
import PegSelector from "./PegSelector";

type Props = {
  index: number;
  enableInteraction: boolean;
  selectedColor: string;
  onColorSection: Function
};

const CodeSquare = ({ index, enableInteraction, selectedColor, onColorSection }: Props) => {
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  const handleColorSelection = (color: string) => {
    onColorSection(index, color)
  }

  return (
    <div
      className="code-square"
      onClick={() => {
        if (!enableInteraction) return;
        setShowSelectorBox(!showSelectorBox);
      }}
      onMouseEnter={() => {
        if (!enableInteraction) return;
        setShowSelectorBox(true);
      }}
      onMouseLeave={() => {
        if (!enableInteraction) return;
        setShowSelectorBox(false);
      }}
    >
      {selectedColor === "" ? (
        <div className="empty-box"></div>
      ) : (
        <img src={CODE_PEGS.get(selectedColor)} alt={selectedColor} width="100%" height="100%" />
      )}
      <PegSelector
        visible={showSelectorBox}
        onColorSelection={handleColorSelection}
      />
    </div>
  );
};

export default CodeSquare;
