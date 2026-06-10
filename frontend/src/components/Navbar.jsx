function Navbar({ onOpenAvisos, onOpenPedidos, onOpenReferencias }) {
  return (
    <div className="botones">

      {/* AVISOS */}
      <div className="avisos">
        <button onClick={onOpenAvisos}>
          ⚠️ AVISOS ⚠️
        </button>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <a className="nav-link" href="#inicio">Inicio</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#productos">Productos</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#paquetes">Paquetes</a>
              </li>

              {/* REFERENCIAS (MODAL) */}
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={onOpenReferencias}
                >
                  Referencias
                </button>
              </li>

              {/* PEDIDOS */}
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={onOpenPedidos}
                >
                  Pedidos
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;