import React from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles, styled } from "@material-ui/core/styles";

//hook api
const styles = makeStyles({
  raiz: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "10px 30px",
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

  React.useEffect(() => {
    setDataFromLocal(JSON.parse(localStorage.getItem("id")));
  }, []);

  return (
    <Container maxWidth="md" className={classes.raiz}>
      <h1>Main Page </h1>
      <h2>Cline no btn abaixo para adicionar um novo item</h2>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        size="large"
        onClick={handleClick}
      >
        Novo Item
      </Button>
      <MyTitleH2>UmNovoBTN</MyTitleH2>
      <p>{JSON.stringify(dataFromLocal)}</p>
    </Container>
  );
};

export default Main;
