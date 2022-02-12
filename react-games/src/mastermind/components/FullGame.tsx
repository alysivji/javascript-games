import CodeRow from "./CodeRow";

type Props = {
  numGuessesAllowed: number;
};

function FullGame({ numGuessesAllowed }: Props) {
  const gameBoard = Array(numGuessesAllowed)
    .fill("")
    .map((_, index) => {
      return <CodeRow key={index} />;
    });

  return (
    <div>
      <h1>MasterMind</h1>
      <div className="gameBoard">{gameBoard}</div>
    </div>
  );
}

export default FullGame;
