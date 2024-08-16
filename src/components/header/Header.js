import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./style.css";
import searchIcon from  '../../assets/search.svg'
function Header({setSearchTerm}) {
  return (
    <div className="main_header_content d-flex justify-content-between p-2 align-items-center">
      <div className="header_breadcrumb ">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="search mx-5">
        <img src={searchIcon} alt="search" className="search_img mx-2"/>
        <input
          type='text'
          placeholder="Search anything..."
          className="search_input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Header;
