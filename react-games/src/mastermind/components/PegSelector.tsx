// lay across the pegs

import { CODE_PEGS } from "../constants";

type Props = {
  text: string;
};

function PegSelector({ text }: Props) {
  return <div>{text}</div>;
}

// why default?
// it's the only thing exported from this module
export default PegSelector;
