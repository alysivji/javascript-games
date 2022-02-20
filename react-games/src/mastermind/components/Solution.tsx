import { useState } from "react";

import CodeSquare from "./CodeSquare";

type Props = {
  code: string[];
};

const Solution = ({ code }: Props) => {

  const solutionRow = code.map((value, index) => {
    return (
      <CodeSquare
        enableInteraction={false}
        key={index}
        index={index}
        selectedColor={value}
        onColorSection={() => { }}
      />
    );
  });

  return (
    <div className="solution-row">
      <div className="guess-code">{solutionRow}</div>
    </div>
  );
};

export default Solution;
