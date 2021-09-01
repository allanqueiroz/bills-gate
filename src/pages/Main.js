import React from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
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
    margin: "15px",
    padding: "0 10px",
  },
});

const Main = () => {
  const classes = styles();
  const history = useHistory();
  const [dataFromLocal, setDataFromLocal] = React.useState([]);
  const [triggerValue, setTriggerValue] = React.useState(false);

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
    setTriggerValue(true);
  }, []);

  return (
    <Container maxWidth="lg" className={classes.raiz}>
      <span className="big-size-h1">BILLS GATES </span>
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
          <Zoom in={triggerValue} timeout={1000} key={item.idItem}>
            <Card className={classes.card}>
              <div className="div-item">
                <h3>
                  {item.tag} - {item.creationDate}
                </h3>
                <Button onClick={() => handleDeleteItem(index)}>
                  <DeleteForeverSharpIcon />
                </Button>
              </div>

              <hr />
              <ul className="list-items">
                {item.data.map((list) => (
                  <li key={uniqid()}>
                    {moment(list.date).format("DD/MM/YYYY")} •{" "}
                    {list.description} = R$ {list.spended}
                  </li>
                ))}
              </ul>
              <hr />
              <h4>
                Total gasto R$ {item.totalValue.toFixed(2).replace(".", ",")}
              </h4>
            </Card>
          </Zoom>
        ))
      ) : (
        <h3>Vazio KK</h3>
      )}
    </Container>
  );
};

export default Main;
