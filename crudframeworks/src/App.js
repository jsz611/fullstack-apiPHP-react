import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl = "http://localhost/apiFrameworks/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: '',
    nome: '',
    lancamento: '',
    desenvolvedor: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFrameworkSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(frameworkSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nome);
    f.append("lancamento", frameworkSeleccionado.lancamento);
    f.append("desenvolvedor", frameworkSeleccionado.desenvolvedor);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      });
  }

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nome);
    f.append("lancamento", frameworkSeleccionado.lancamento);
    f.append("desenvolvedor", frameworkSeleccionado.desenvolvedor);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
      .then(response => {
        var dataNueva = data.map(framework => {
          if (framework.id === frameworkSeleccionado.id) {
            framework.nome = frameworkSeleccionado.nome;
            framework.lancamento = frameworkSeleccionado.lancamento;
            framework.desenvolvedor = frameworkSeleccionado.desenvolvedor;
          }
          return framework;
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      });
  }

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
      .then(response => {
        setData(data.filter(framework => framework.id !== frameworkSeleccionado.id));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      });
  }

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar();
  }

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" onClick={abrirCerrarModalInsertar}>Inserir</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Lançamento</th>
            <th>Desenvolvedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(framework => (
            <tr key={framework.id}>
              <td>{framework.id}</td>
              <td>{framework.nome}</td>
              <td>{framework.lancamento}</td>
              <td>{framework.desenvolvedor}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarFramework(framework, "Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={() => seleccionarFramework(framework, "Eliminar")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Inserir Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input type="text" className="form-control" name="nome" onChange={handleChange} />
            <br />
            <label>Lançamento: </label>
            <br />
            <input type="text" className="form-control" name="lancamento" onChange={handleChange} />
            <br />
            <label>Desenvolvedor: </label>
            <br />
            <input type="text" className="form-control" name="desenvolvedor" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={peticionPost}>Inserir</button>{" "}
          <button className="btn btn-danger" onClick={abrirCerrarModalInsertar}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input type="text" className="form-control" name="nome" onChange={handleChange} value={frameworkSeleccionado.nome} />
            <br />
            <label>Lançamento: </label>
            <br />
            <input type="text" className="form-control" name="lancamento" onChange={handleChange} value={frameworkSeleccionado.lancamento} />
            <br />
            <label>Desenvolvedor: </label>
            <br />
            <input type="text" className="form-control" name="desenvolvedor" onChange={handleChange} value={frameworkSeleccionado.desenvolvedor} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={peticionPut}>Editar</button>{" "}
          <button className="btn btn-danger" onClick={abrirCerrarModalEditar}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Tem certeza de que deseja excluir o Framework {frameworkSeleccionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={peticionDelete}>Sim</button>
          <button className="btn btn-secondary" onClick={abrirCerrarModalEliminar}>Não</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
