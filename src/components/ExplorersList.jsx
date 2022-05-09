import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { getExplorers } from "../services/explorerService";

function ExplorersList(props) {
  const [explorers, setExplorers] = useState([]);
  const [currentExplorer, setCurrentExplorer] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getExplorers();
        setExplorers(result.data);
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
        <h4>Explorers Inscritos</h4>
        <ListGroup role="list">
          {explorers.map((explorer) => (
            <ListGroup.Item
              action
              active={explorer === currentExplorer}
              key={explorer.id}
              onClick={() => setCurrentExplorer(explorer)}
            >
              {explorer.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        {currentExplorer ? (
          <Fragment>
            <h4>Explorer</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentExplorer.name}
              <br />
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentExplorer.username}
              <br />
              <label>
                <strong>Mission:</strong>
              </label>{" "}
              {currentExplorer.mission}
            </div>
          </Fragment>
        ) : (
          <h4>Selecciona un explorer</h4>
        )}
      </Col>
    </Row>
  );
}

export default ExplorersList;
