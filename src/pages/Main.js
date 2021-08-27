import React from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import { makeStyles, styled } from "@material-ui/core/styles";
import moment from "moment";
import uniqid from "uniqid";

//hook api
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
  card: {
    margin: "8px",
    padding: "0 10px",
  },
});
//styled component api
const MyTitleH2 = styled(Button)({
  background: "linear-gradient(45deg, #FF8E53 40%, #FE6B8B 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  display: "block",
});

const Main = () => {
  const classes = styles();
  const history = useHistory();
  const [dataFromLocal, setDataFromLocal] = React.useState([]);

  const handleClick = () => {
    history.push("/Create");
  };
  const handleDeleteItem = (i) => {
    const newValue = [...dataFromLocal];
    newValue.splice(i, 1);

    setDataFromLocal(newValue);
    localStorage.setItem("id", JSON.stringify(newValue));
  };

  React.useEffect(() => {
    setDataFromLocal(JSON.parse(localStorage.getItem("id")));
  }, []);

  return (
    <Container maxWidth="md" className={classes.raiz}>
      <h1>Main Page </h1>
      <h3>E então, que tal adicionar suas dívidas? 🤭</h3>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        size="large"
        onClick={handleClick}
      >
        Novo Item
      </Button>
      {dataFromLocal ? (
        dataFromLocal.map((item, index) => (
          <Card className={classes.card} key={item.idItem}>
            <div className="div-item">
              <h3>
                {item.tag} - {item.creationDate}
              </h3>
              <Button onClick={() => handleDeleteItem(index)} className="div-">
                <DeleteForeverSharpIcon />
              </Button>
            </div>

            <hr />
            <ul className="list-items">
              {item.data.map((list) => (
                <li key={uniqid()}>
                  {moment(list.date).format("DD/MM/YYYY")} • {list.description}{" "}
                  = R$ {list.spended}
                </li>
              ))}
            </ul>
            <hr />
            <h4>
              Total gasto R$ {item.totalValue.toFixed(2).replace(".", ",")}
            </h4>
          </Card>
        ))
      ) : (
        <h3>Vazio KK</h3>
      )}
    </Container>
  );
};

export default Main;
