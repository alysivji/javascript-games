import { useState } from "react";

import CodeSquare from "./CodeSquare";

type Props = {
  guessNumber: number;
  enableInteraction: boolean
};

const CodeRow = ({ guessNumber, enableInteraction }: Props) => {
  return (
    <div>
      <h3>{guessNumber}</h3>
      <div className="codeRow">
        <CodeSquare enableInteraction={enableInteraction} />
        <CodeSquare enableInteraction={enableInteraction} />
        <CodeSquare enableInteraction={enableInteraction} />
        <CodeSquare enableInteraction={enableInteraction}/>
      </div>
    </div>
  );
};

export default CodeRow;
