import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { getCommanders } from '../services/commanderService';
import logger from '../services/logService';
import { Commander } from '../types/commander';

function CommandersList() {
  const [commanders, setCommanders] = useState<Commander[]>([]);
  const [currentCommander, setCurrentCommander] = useState<Commander>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCommanders();
        setCommanders(result.data);
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.status === 400
        )
          toast.error(error.response.data.detail);
        else logger.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Row>
      <Col>
        <h4>Commanders</h4>
        <ListGroup>
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
          <>
            <h4>Commander</h4>
            <div>
              <div>
                <strong>Nombre:</strong> {currentCommander.name}
              </div>
              <div>
                <strong>Username:</strong> {currentCommander.username}
              </div>
              <div>
                <strong>Main Stack:</strong> {currentCommander.mainStack}
              </div>
              <LinkContainer
                to={`/commanders/${currentCommander.id}`}
                className="mt-2"
              >
                <Button variant="primary">Editar</Button>
              </LinkContainer>
            </div>
          </>
        ) : (
          <h4>Selecciona un commander</h4>
        )}
      </Col>
    </Row>
  );
}

export default CommandersList;
