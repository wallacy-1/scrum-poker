const Card = ({ value, onClick }: any) => {
  return (
    <div className="px-2" onClick={onClick}>
      {value}
    </div>
  );
};

export default Card;
