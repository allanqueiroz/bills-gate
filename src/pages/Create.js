import React from "react";
import { useHistory } from "react-router";
import moment from "moment";

const Create = () => {
  React.useEffect(() => {
    if (localStorage.getItem("id")) {
      const d = JSON.parse(localStorage.getItem("id"));
      setDataFromLocal(d);
    }
  }, []);

  const history = useHistory();
  const [dataFromLocal, setDataFromLocal] = React.useState([]);
  const [tag, setTag] = React.useState("");
  const [data, setData] = React.useState([
    { description: "", spended: "", date: "" },
  ]);
  const [totalValue, setTotalValue] = React.useState(0);
  const [creationDate, setCreationDate] = React.useState("");

  const handleClick = () => {
    history.push("/");
  };
  const handleDataChange = (event, index) => {
    const val = [...data];
    let { value, name } = event.target;
    val[index][name] = value;
    setData(val);
    setCreationDate(moment().format("DD/MM/YYYY"));
  };
  const handleTotal = (event) => {
    let { value, name } = event.target;
    if (name === "spended") {
      if (value === "") {
        value = 0;
      }
      setTotalValue((prev) => prev + parseInt(value));
    }
  };
  const handleAddItems = (event) => {
    event.preventDefault();
    setData([...data, { description: "", spended: "", date: "" }]);
  };
  const handleRemoveItem = (event, index) => {
    event.preventDefault();
    const newValue = [...data];
    const SubValue = newValue[index]["spended"];
    setTotalValue((prev) => prev - parseInt(SubValue));
    newValue.splice(index, 1);
    setData(newValue);
  };
  const handleSubmit = () => {
    localStorage.setItem(
      "id",
      JSON.stringify([
        ...dataFromLocal,
        { tag, ...data, creationDate, totalValue },
      ])
    );
    history.push("/");
  };

  return (
    <>
      <h1>Create Page</h1>
      <button onClick={handleClick}>Voltar p main page</button>
      <form>
        <input
          type="text"
          name="name"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Nome da lista"
          required
        />
        <button onClick={(e) => handleAddItems(e)}>+</button>
        {data.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleDataChange(e, index)}
              placeholder="Descrição"
              required
            />
            <input
              type="number"
              name="spended"
              value={item.spended}
              onChange={(e) => handleDataChange(e, index)}
              onBlur={(e) => handleTotal(e)}
              placeholder="Valor (R$)"
              required
            />
            <input
              type="date"
              name="date"
              value={item.date}
              onChange={(e) => handleDataChange(e, index)}
              max={moment().format("YYYY-MM-DD")}
              required
            />
            {data.length !== 1 ? (
              <button onClick={(e) => handleRemoveItem(e, index)}>-</button>
            ) : null}
            {/* {data.length - 1 === index ? (
              <button onClick={(e) => handleAddItems(e)}>+</button>
            ) : null} */}
          </div>
        ))}
        <button disabled>R$</button>
        <input type="text" value={totalValue} disabled />
      </form>
      <button onClick={() => handleSubmit()}>Salvar</button>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};
export default Create;
