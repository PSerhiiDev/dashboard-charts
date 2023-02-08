interface Props {
  styles?: string;
}

const NoDataMessage = ({ styles }: Props) => {
  return (
    <h2
      className={`text-center text-[12px] text-[#C4C4C4] w-full mt-[113px] ${styles}`}
    >
      There are no search results yet
    </h2>
  );
};

export default NoDataMessage;
