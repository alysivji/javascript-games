type Props = {
  value: string;
};

const Peg = ({ value }: Props) => {
  return <div className={`${value} peg`}></div>
};

export default Peg;
