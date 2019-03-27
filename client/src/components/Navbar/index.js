import React from "react";

function Nav() {
  return (
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            Ivy
          </a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Page 1</a>
          </li>
          <li>
            <a href="#">Page 2</a>
          </li>
          <li>
            <a href="#">Page 3</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
