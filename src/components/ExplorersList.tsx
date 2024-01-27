import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { getExplorers } from '../services/explorerService';
import logger from '../services/logService';
import { Explorer } from '../types/explorer';

function ExplorersList() {
  const [explorers, setExplorers] = useState<Explorer[]>([]);
  const [currentExplorer, setCurrentExplorer] = useState<Explorer>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getExplorers();
        setExplorers(result.data);
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
        <h4>Explorers Inscritos</h4>
        <ListGroup>
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
          <>
            <h4>Explorer</h4>
            <div>
              <div>
                <strong>Nombre:</strong> {currentExplorer.name}
              </div>
              <div>
                <strong>Username:</strong> {currentExplorer.username}
              </div>
              <div>
                <strong>Mission:</strong> {currentExplorer.mission}
              </div>
              <LinkContainer
                to={`/explorers/${currentExplorer.id}`}
                className="mt-2"
              >
                <Button variant="primary">Editar</Button>
              </LinkContainer>
            </div>
          </>
        ) : (
          <h4>Selecciona un explorer</h4>
        )}
      </Col>
    </Row>
  );
}

export default ExplorersList;
