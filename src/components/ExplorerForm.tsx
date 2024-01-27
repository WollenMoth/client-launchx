import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createExplorer,
  deleteExplorer,
  getExplorer,
  updateExplorer,
} from '../services/explorerService';
import logger from '../services/logService';
import { FormControlElement } from '../types/elements';
import { CreateExplorer, UpdateExplorer } from '../types/explorer';

function ExplorerForm() {
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [explorer, setExplorer] = useState({
    name: '',
    username: '',
    mission: '',
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getExplorer(parseInt(id!));
        setExplorer(result.data);
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
    if (id !== 'new') fetchData();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<FormControlElement>,
    field: keyof (CreateExplorer | UpdateExplorer)
  ) => {
    setExplorer({ ...explorer, [field]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (id === 'new') {
        await createExplorer(explorer);
        setCreated(true);
        setExplorer({
          name: '',
          username: '',
          mission: '',
        });
      } else {
        await updateExplorer({ ...explorer, id: parseInt(id!) });
        setUpdated(true);
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 400
      )
        toast.error(error.response.data.detail);
      else logger.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExplorer(parseInt(id!));
      window.location.href = '/explorers';
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 400
      )
        toast.error(error.response.data.detail);
      else logger.log(error);
    }
  };

  if (created)
    return (
      <>
        <h4>Explorer creado exitosamente</h4>
        <Button variant="primary" onClick={() => setCreated(false)}>
          Agregar
        </Button>
      </>
    );

  return (
    <>
      {id === 'new' ? <h4>Nuevo Explorer</h4> : <h4>Explorer</h4>}
      <Form className="mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Woopa"
            value={explorer.name}
            onChange={(e) => handleChange(e, 'name')}
            disabled={id !== 'new'}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="ajolonauta"
            value={explorer.username}
            onChange={(e) => handleChange(e, 'username')}
            disabled={id !== 'new'}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mission">
          <Form.Label>Mission</Form.Label>
          <Form.Control
            placeholder="Node"
            value={explorer.mission}
            onChange={(e) => handleChange(e, 'mission')}
          />
        </Form.Group>
        {id === 'new' ? (
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        ) : (
          <>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>{' '}
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </>
        )}
        {updated && (
          <>
            <br />
            <Form.Text>Explorer actualizado</Form.Text>
          </>
        )}
      </Form>
    </>
  );
}

export default ExplorerForm;
