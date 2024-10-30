import { useData } from "./dataContext";

function DisplayData() {
  const { data } = useData();

  return (
    <div>
      <h2>Selected Data</h2>
      <p>District: {data.district}</p>
      <p>Blood Group: {data.blood}</p>
    </div>
  );
}

export default DisplayData;
