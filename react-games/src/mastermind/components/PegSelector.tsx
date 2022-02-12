import "./styles.css";
import { CODE_PEGS } from "../constants";

type Props = {
  visible: boolean;
  passColorSelectedData: Function;
};

const PegSelector = ({ visible, passColorSelectedData }: Props) => {
  const pegs = Object.entries(CODE_PEGS).map(([pegColor, pegSvg]) => {
    return (
      <img
        src={pegSvg}
        key={pegColor}
        width="30"
        height="30"
        onClick={() => passColorSelectedData(pegColor)}
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