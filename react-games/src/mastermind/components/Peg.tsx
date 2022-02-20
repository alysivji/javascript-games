type Props = {
  value: string;
};

const Peg = ({ value }: Props) => {
  return <div className={`${value} peg`}>{value}</div>
};

export default Peg;
