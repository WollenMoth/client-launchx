import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createCommander,
  deleteCommander,
  getCommander,
  updateCommander,
} from '../services/commanderService';
import logger from '../services/logService';
import { CreateCommander, UpdateCommander } from '../types/commander';
import { FormControlElement } from '../types/elements';

function CommanderForm() {
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [commander, setCommander] = useState({
    name: '',
    username: '',
    mainStack: '',
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCommander(parseInt(id!));
        setCommander(result.data);
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
    field: keyof (CreateCommander | UpdateCommander)
  ) => {
    setCommander({ ...commander, [field]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (id === 'new') {
        await createCommander(commander as CreateCommander);
        setCreated(true);
        setCommander({
          name: '',
          username: '',
          mainStack: '',
        });
      } else {
        await updateCommander({ ...commander, id: parseInt(id!) });
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
      await deleteCommander(parseInt(id!));
      window.location.href = '/commanders';
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
        <h4>Commander creado exitosamente</h4>
        <Button variant="primary" onClick={() => setCreated(false)}>
          Agregar
        </Button>
      </>
    );

  return (
    <>
      {id === 'new' ? <h4>Nuevo Commander</h4> : <h4>Commander</h4>}
      <Form className="mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Carlo Gilmar"
            value={commander.name}
            onChange={(e) => handleChange(e, 'name')}
            disabled={id !== 'new'}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="carlogilmar"
            value={commander.username}
            onChange={(e) => handleChange(e, 'username')}
            disabled={id !== 'new'}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mainStack">
          <Form.Label>Main Stack</Form.Label>
          <Form.Control
            placeholder="Elixir"
            value={commander.mainStack}
            onChange={(e) => handleChange(e, 'mainStack')}
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
            <Form.Text>Mission Commander actualizado</Form.Text>
          </>
        )}
      </Form>
    </>
  );
}

export default CommanderForm;
