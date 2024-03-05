type Props = {
  title: string[];
  RowsDisplay: JSX.Element[];
};
export default function Table(props: Props) {
  return (
    <div className="overflow-auto bg-white m-6">
      <table className="table">
        <thead>
          <tr>
            {props.title.map((item: string) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.RowsDisplay}</tbody>
      </table>
    </div>
  );
}
