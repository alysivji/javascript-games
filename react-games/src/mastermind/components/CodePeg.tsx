type Props = {
  value: string;
};

const Peg = ({ value }: Props) => {
  return <div className={value}>{value}</div>
};

export default Peg;
