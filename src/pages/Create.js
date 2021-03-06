import React from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from "@material-ui/icons/Payment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import moment from "moment";
import uniqid from "uniqid";

const styles = makeStyles({
  raiz: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "10px 30px",
    minHeight: "100vh",
  },
  forIcon: {
    fontSize: 50,
    marginRight: 100,
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
  inputWidth: {
    width: "60%",
  },
});

const Create = () => {
  React.useEffect(() => {
    if (localStorage.getItem("id")) {
      const d = JSON.parse(localStorage.getItem("id"));
      setDataFromLocal(d);
    }
  }, []);
  const classesOnCreate = styles();
  const history = useHistory();
  const [dataFromLocal, setDataFromLocal] = React.useState([]);
  const [tag, setTag] = React.useState("");
  const [data, setData] = React.useState([
    { description: "", spended: "", date: "" },
  ]);
  const [totalValue, setTotalValue] = React.useState(0);
  const [creationDate, setCreationDate] = React.useState("");
  const [disable, setDisable] = React.useState(true);

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
      setTotalValue((prev) => prev + parseFloat(value));
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
    if (totalValue) {
      localStorage.setItem(
        "id",
        JSON.stringify([
          ...dataFromLocal,
          { tag, data: [...data], creationDate, totalValue, idItem: uniqid() },
        ])
      );
      history.push("/");
    }
  };

  return (
    <Container className={classesOnCreate.raiz}>
      <AccountBalanceIcon className={classesOnCreate.forIcon} />
      <MonetizationOnIcon className={classesOnCreate.forIcon} />
      <PaymentIcon className={classesOnCreate.forIcon} />
      <AccountBalanceIcon className={classesOnCreate.forIcon} />
      <MonetizationOnIcon className={classesOnCreate.forIcon} />
      <PaymentIcon className={classesOnCreate.forIcon} />
      <AccountBalanceIcon className={classesOnCreate.forIcon} />
      <MonetizationOnIcon className={classesOnCreate.forIcon} />
      <h2 style={{ letterSpacing: 1.4 }}>
        Vai l??, vamos ver quanto voc?? gastou ????????
      </h2>
      <form>
        <div className="tag-and-btn">
          <TextField
            type="text"
            name="name"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            label="Nome da lista"
            variant="filled"
            onBlur={() => (tag ? setDisable(false) : setDisable(true))}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleAddItems(e)}
          >
            <AddCircleOutlineSharpIcon />
            Nova linha
          </Button>
        </div>

        {data.map((item, index) => (
          <div key={index} className={classesOnCreate.inputs}>
            <TextField
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleDataChange(e, index)}
              placeholder="Descri????o"
              variant="filled"
              disabled={disable}
              className={classesOnCreate.inputWidth}
            />
            <TextField
              type="number"
              name="spended"
              value={item.spended}
              onChange={(e) => handleDataChange(e, index)}
              onBlur={(e) => handleTotal(e)}
              placeholder="Valor (R$)"
              variant="filled"
              disabled={disable}
            />
            <TextField
              type="date"
              name="date"
              value={item.date}
              onChange={(e) => handleDataChange(e, index)}
              max={moment().format("YYYY-MM-DD")}
              variant="filled"
              disabled={disable}
            />
            {data.length !== 1 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => handleRemoveItem(e, index)}
              >
                <RemoveSharpIcon />
              </Button>
            ) : null}
          </div>
        ))}
      </form>
      <hr />
      <TextField disabled value="TOTAL R$" />
      <TextField type="text" value={totalValue} disabled />
      <div className={classesOnCreate.inputs}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSubmit()}
          disabled={disable}
        >
          Salvar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Cancelar
        </Button>
      </div>
    </Container>
  );
};
export default Create;
