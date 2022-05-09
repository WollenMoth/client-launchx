import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ExplorerForm.css";
import { createExplorer } from "../services/explorerService";

function ExplorerForm(props) {
  const [created, setCreated] = useState(false);
  const [explorer, setExplorer] = useState({
    name: "",
    username: "",
    mission: "",
  });

  const { id } = useParams();

  const handleChange = (e, field) => {
    setExplorer({ ...explorer, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExplorer(explorer);
      setCreated(true);
      setExplorer({
        name: "",
        username: "",
        mission: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data.detail);
    }
  };

  if (created)
    return (
      <Fragment>
        <h4>Explorer creado exitosamente</h4>
        <Button variant="primary" onClick={() => setCreated(false)}>
          Agregar
        </Button>
      </Fragment>
    );

  return (
    <Fragment>
      {id === "new" && <h4>Nuevo Explorer</h4>}
      <Form className="mx-auto">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Woopa"
            value={explorer.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="ajolonauta"
            value={explorer.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mission">
          <Form.Label>Mission</Form.Label>
          <Form.Control
            placeholder="Node"
            value={explorer.mission}
            onChange={(e) => handleChange(e, "mission")}
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

export default ExplorerForm;
