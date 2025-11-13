import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const initPage = "home";

function AppNavbar({ products, carts, setToken }) {
  const homeRef = useRef();
  const calculatorRef = useRef();
  const animationRef = useRef();
  const componentRef = useRef();
  const todosRef = useRef();
  const productsRef = useRef();
  const cartsRef = useRef();

  const [menu, setMenu] = useState("");
  const [tab, setTab] = useState("");

  useEffect(() => {
    setMenu(initPage);
  }, []);

  useEffect(() => {
    if (menu === "calculator") calculatorRef.current.click();
    else if (menu === "animation") animationRef.current.click();
    else if (menu === "component") componentRef.current.click();
    else if (menu === "todos") todosRef.current.click();
    else if (menu === "products") productsRef.current.click();
    else if (menu === "carts") cartsRef.current.click();
    else homeRef.current.click();
  }, [menu]);

  return (
   <div className="d-flex justify-content-center gap-2">
      <Link to={"/home"}>
        <Button
          variant={menu === "home" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("home")}
          ref={homeRef}
        >
          Home
        </Button>
      </Link>

      <Link to={"/calculator"}>
        <Button
          variant={menu === "calculator" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("calculator")}
          ref={calculatorRef}
        >
          Calculator
        </Button>
      </Link>

      <Link to={"/animation"}>
        <Button
          variant={menu === "animation" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("animation")}
          ref={animationRef}
        >
          Animation
        </Button>
      </Link>

      <Link to={"/components"}>
        <Button
          variant={menu === "component" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("component")}
          ref={componentRef}
        >
          Components
        </Button>
      </Link>

      <Link to={"/todos"}>
        <Button
          variant={menu === "todos" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("todos")}
          ref={todosRef}
        >
          Todos
        </Button>
      </Link>

      <Link to={"/products"}>
        <Button
          variant={menu === "products" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("products")}
          ref={productsRef}
        >
          Products ({products.length})
        </Button>
      </Link>
      <Link to={"/carts"}>
        <Button
          className="position-relative"
          variant={menu === "carts" ? "secondary" : "outline-secondary"}
          onClick={() => setMenu("carts")}
          ref={cartsRef}
        >
          Carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : "9+"}
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </Button>
      </Link>
      <Button
        variant="danger"
        style={{ marginLeft: "1rem" }}
        onClick={() => {
          setToken("");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default AppNavbar;
