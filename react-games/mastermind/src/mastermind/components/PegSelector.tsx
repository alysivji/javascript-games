import "./styles.css";
import { CODE_PEGS } from "../constants";

type Props = {
  visible: boolean;
  onColorSelection: Function;
};

const PegSelector = ({ visible, onColorSelection }: Props) => {
  const pegs = Array.from(CODE_PEGS.entries()).map(([pegColor, pegSvg]) => {
    return (
      <img
        src={pegSvg}
        alt={pegColor}
        key={pegColor}
        width="30"
        height="30"
        onClick={() => onColorSelection(pegColor)}
      />
    );
  });

  return (
    <div className={`colorSelector ${visible ? "visible" : "hidden"}`}>
      {pegs}
    </div>
  );
};

export default PegSelector;
