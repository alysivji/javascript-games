import { useState } from "react";

import CodeSquare from "./CodeSquare";

type Props = {
  index: number;
};

const CodeRow = ({ index: key }: Props) => {
  const [colorSelected, setColorSelected] = useState("");
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  return (
    <div>
      <h3>{key}</h3>
      <div className="codeRow">
        <CodeSquare />
        <CodeSquare />
        <CodeSquare />
        <CodeSquare />
      </div>
    </div>
  );
};

export default CodeRow;
