import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CommanderForm.css";
import { createCommander } from "../services/commanderService";

function CommanderForm(props) {
  const [created, setCreated] = useState(false);
  const [commander, setCommander] = useState({
    name: "",
    username: "",
    mainStack: "",
  });

  const { id } = useParams();

  const handleChange = (e, field) => {
    setCommander({ ...commander, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createCommander(commander);
      setCreated(true);
      setCommander({
        name: "",
        username: "",
        mainStack: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data.detail);
    }
  };

  if (created)
    return (
      <Fragment>
        <h4>Commander creado exitosamente</h4>
        <Button variant="primary" onClick={() => setCreated(false)}>
          Agregar
        </Button>
      </Fragment>
    );

  return (
    <Fragment>
      {id === "new" && <h4>Nuevo Commander</h4>}
      <Form className="mx-auto">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Carlo Gilmar"
            value={commander.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="carlogilmar"
            value={commander.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mainStack">
          <Form.Label>Main Stack</Form.Label>
          <Form.Control
            placeholder="Elixir"
            value={commander.mainStack}
            onChange={(e) => handleChange(e, "mainStack")}
          />
        </Form.Group>
        {id === "new" && (
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Agregar
          </Button>
        )}
      </Form>
    </Fragment>
  );
}

export default CommanderForm;
