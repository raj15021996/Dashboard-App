import React, { useEffect, useState } from "react";
import "./style.css";
import data from "../../utils/dashboardData.json";
import Header from "../header/Header";
import Widget from "../widgets";
import refreshIcon from "../../assets/refresh.svg";
import upIcon from "../../assets/up-arrow.svg";
import downIcon from "../../assets/down-arrow.svg";
import clockIcon from "../../assets/clock.svg";
import menuIcon from "../../assets/menu-vertical-24.png";
import AddWidgets from "../addwidgets";
import { useDispatch, useSelector } from "react-redux";
import { getWidgets } from "../../store/reducers";
import { options } from "../../utils/constant";

function Dashboard() {
  const [showAddWidgets, setShowAddWidgets] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState('Last 2 days');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId]= useState("")
  
  const {widgetData} =useSelector((state)=>state.widgets);
  const dispatch = useDispatch()

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getWidgets(data));
  }, []);

  useEffect(() => {
    setFilteredData(widgetData);
    setSelectedId(widgetData?.categories[0]?.id)
  }, [widgetData]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(widgetData);
    } else {
      const newFilteredData = {
        ...widgetData,
        categories: widgetData.categories.map(category => ({
          ...category,
          widgets: category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(category => category.widgets.length > 0)
      };
      setFilteredData(newFilteredData);
    }
  }, [searchTerm, widgetData]);

  return (
    <div className="main_content">
      {showAddWidgets && (
        <div>
          <div
            className="notify_overlay"
            onClick={() => setShowAddWidgets(false)}
          ></div>
          <div className="notification_sidebar_holder">
            <AddWidgets 
            setShowAddWidgets = {setShowAddWidgets} 
            selectedId = {selectedId}
            setSelectedId = {setSelectedId}
             />
          </div>
        </div>
      )}
      <div className="header_content">
        <Header setSearchTerm={setSearchTerm}/>
      </div>
      <div className="widgets_contents">
        <div className="widgets_header d-flex justify-content-between my-3">
          <div className="widgets_title">CNAPP Dashboard</div>
          <div className="group_buttons">
            <button
              className="btn btn-light border add_widget"
              onClick={() => setShowAddWidgets(true)}
            >
              +Add Widget
            </button>
            <button className="btn btn-light border menu_btn">
              <img src={refreshIcon} alt="refresh" />
            </button>
            <button className="btn btn-light border menu_btn">
              <img src={menuIcon} alt="menu" height="20px" width='20px' />
            </button>
            <div className="dropdown_container">
              <div className="dropdown_header" onClick={toggleDropdown}>
                <div className="clock_icon">
                  <img src={clockIcon} alt="clock" height="25px" width='25px' />
                </div>
                <span>{selectedOption}</span>
                <img src={isOpen ? upIcon:downIcon} alt="clock" height="18px" width='18px' />
              </div>
              {isOpen && (
                <div className="dropdown_options">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="dropdown_option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div> 
          </div>
        </div>
        {filteredData?.categories?.map((category, index) => (
          <div key={index} className="px-4">
            <h6>{category?.name}</h6>
            <div className="row">
              {category?.widgets?.map((widget, idx) => (
                <Widget
                  key = {idx}
                  widget = {widget}
                  setShowAddWidgets = {setShowAddWidgets}
                  setSelectedId = {setSelectedId}
                  catagoryId = {category?.id}
                />
              ))}
            </div>
          </div>
        ))}
        {!filteredData?.categories?.length && <p className="text-center my-5 p-3 bg-light"> No Widget Found!</p>}
      </div>
    </div>
  );
}

export default Dashboard;
