import React, { Fragment, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { getCommanders } from "../services/commanderService";

function CommandersList(props) {
  const [commanders, setCommanders] = useState([]);
  const [currentCommander, setCurrentCommander] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCommanders();
        setCommanders(result.data);
      } catch (error) {
        if (error.response && error.response.status === 400)
          toast.error(error.response.data.detail);
      }
    }
    fetchData();
  }, []);

  return (
    <Row>
      <Col>
        <h4>Commanders</h4>
        <ListGroup role="list">
          {commanders.map((commander) => (
            <ListGroup.Item
              action
              active={commander === currentCommander}
              key={commander.id}
              onClick={() => setCurrentCommander(commander)}
            >
              {commander.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        {currentCommander ? (
          <Fragment>
            <h4>Commander</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentCommander.name}
              <br />
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentCommander.username}
              <br />
              <label>
                <strong>Main Stack:</strong>
              </label>{" "}
              {currentCommander.mainStack}
              <br />
              <LinkContainer
                to={`/commanders/${currentCommander.id}`}
                className="mt-2"
              >
                <Button variant="primary">Editar</Button>
              </LinkContainer>
            </div>
          </Fragment>
        ) : (
          <h4>Selecciona un commander</h4>
        )}
      </Col>
    </Row>
  );
}

export default CommandersList;
