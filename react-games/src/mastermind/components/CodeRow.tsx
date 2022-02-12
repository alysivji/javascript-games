import { useState } from "react";

import CodeSquare from "./CodeSquare";

type Props = {};

const CodeRow = ({}: Props) => {
  const [colorSelected, setColorSelected] = useState("");
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  return (
    <div>
      <CodeSquare />
      <CodeSquare />
      <CodeSquare />
      <CodeSquare />
    </div>
  );
};

export default CodeRow;
