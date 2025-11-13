import { Form, Table, Badge, Button, Modal } from "react-bootstrap";

import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  const newIdRef = useRef();
  const newTitleRef = useRef();

  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [numPages, SetNumPages] = useState(3);
  const [curPage, setCurpages] = useState(1);

  //load
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); //fetch todos on loaded

  useEffect(() => {
    if (onlyWaiting) setTodos(todosRaw.filter((todo) => !todo.completed));
    else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    SetNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurpages(0);
    else if (curPage > numPages) setCurpages(numPages);
    else if (curPage <= 0) setCurpages(1);
  }, [numPages]);

  const waitingClicked = (id) => {
    console.log(id);
    const foundTodo = todos.find((todo) => {
      return todo.id === id;
    });
    foundTodo.completed = true;

    setTodosRaw([...todosRaw]);
  };

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));

    setTodosRaw(remainTodosRaw);
  };

  //handle
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClicked = (id, title) => {
    console.log(id, title);
    if (title.trim() !== "") {
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false,
      };

      setTodosRaw([...todosRaw, newTodo])

    }
    newIdRef.current.value =""
    newTitleRef.current.value =""

    handleClose();
  };

  return (
    <>
      {/* modal ---------------------------------------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce(
                    (prev, todo) => (todo.id > prev ? todo.id : prev),
                    -1
                  ) + 1
                }
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="email"
                placeholder="New todo"
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(Number (newIdRef.current.value),newTitleRef.current.value)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal end */}

      {/* filters */}
      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="custom-switch"
              //label="Show only waiting"
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            Show only&nbsp;
            <Button variant="warning">
              Waiting&nbsp;<i class="bi bi-clock"></i>
            </Button>
          </div>
          <Form.Select
            aria-label="Default select example"
            className="w-25"
            onChange={(e) => setItemPerPage(e.target.value)}
          >
            <option value={5}>5 items per pages</option>
            <option value={10}>10 items per pages</option>
            <option value={50}>50 items per pages</option>
            <option value={100}>100 items per pages</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div>
        <Table striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button onClick={() => handleShow()}>
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                return (
                  index >= (curPage - 1) * itemsPerPage &&
                  index <= curPage * itemsPerPage - 1
                );
              })

              .map((todo) => {
                return (
                  <tr>
                    <td className="text-center">
                      <h5>
                        {" "}
                        <Badge bg="secondary">{todo.id}</Badge>
                      </h5>
                    </td>
                    <td>{todo.title}</td>
                    <td className="text-end">
                      {todo.completed ? (
                        <Button variant ="success" className="fs-6">
                          done <i class="bi bi-check"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={() => waitingClicked(todo.id)}
                        >
                          Waiting <i class="bi bi-clock"></i>
                        </Button>
                      )}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => deleteClicked(todo.id)}
                      >
                        <i class="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      {/* page control */}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurpages(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurpages((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>{" "}
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurpages((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurpages(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
        &nbsp;
      </div>
    </>
  );
};

export default Todos;
