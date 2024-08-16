import React, { useEffect, useState } from "react";
import "./style.css";
import { Form, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidgetStatus } from "../../store/reducers";

function AddWidgets({ setShowAddWidgets, selectedId, setSelectedId}) {
  const { widgetData } = useSelector((state) => state.widgets);
  const [localWidgetData, setLocalWidgetData] = useState(widgetData);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalWidgetData(widgetData);
  }, [widgetData]);

  const handleCheckboxChange = (categoryId, widgetId) => {
    const updatedCategories = localWidgetData.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.map((widget) => {
            if (widget.id === widgetId) {
              return { ...widget, status: !widget.status };
            }
            return widget;
          }),
        };
      }
      return category;
    });

    setLocalWidgetData({ ...localWidgetData, categories: updatedCategories });
  };
  const handleCancel = () => {
    setLocalWidgetData(widgetData);
    setShowAddWidgets(false);
    setSelectedId(widgetData.categories[0].id)
  };

  const handleSubmit = () => {
    localWidgetData.categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        dispatch(
          toggleWidgetStatus({
            categoryId: category.id,
            widgetId: widget.id,
            newStatus: widget.status,
          })
        );
      });
    });
    setShowAddWidgets(false);
  };

  return (
    <div>
      <div className="add_widgets_sidebar">
        <div className="addwidget-head ">
          <div className="px-4 py-2">
            <h6>Add Widgets</h6>
          </div>
          <div
            className="text-white px-3 py-2 cross-btn"
            onClick={handleCancel}
          >
            X
          </div>
        </div>
        <div className="tc_sidebar_main">
          <div className="container">
            <div className="row">
              <Tabs
                defaultActiveKey={selectedId}
                id="uncontrolled-tab-example"
                className="catagory_detailstab"
              >
                {localWidgetData?.categories?.map((category, index) => (
                  <Tab eventKey={category?.id} title={category?.tab}>
                    {category?.widgets?.map((widget, idx) => (
                      <Form>
                        <Form.Check
                          type="checkbox"
                          id={widget.id}
                          label={widget.name}
                          checked={widget.status}
                          onChange={() =>
                            handleCheckboxChange(category.id, widget.id)
                          }
                        />
                      </Form>
                    ))}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </div>
          <div className="mx-4 text-end">
            <button className="mx-2 sidebar_btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="sidebar_btn" onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWidgets;
