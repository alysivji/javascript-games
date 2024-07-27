import black_peg from './images/black_dot.svg';
import blue_peg from './images/blue_dot.svg';
import green_peg from './images/green_dot.svg';
import red_peg from './images/red_dot.svg';
import white_peg from './images/white_dot.svg';
import yellow_peg from './images/yellow_dot.svg';


const CODE_PEGS: Map<string, string> = new Map([
  ["black", black_peg],
  ["blue", blue_peg],
  ["green", green_peg],
  ["red", red_peg],
  ["white", white_peg],
  ["yellow", yellow_peg],
]);

const KEY_PEGS = {
  "black": "black",
  "white": "white",
}


export { CODE_PEGS, KEY_PEGS }
