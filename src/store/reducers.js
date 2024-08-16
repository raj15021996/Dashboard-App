import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgetData: {
    categories: [] 
  },
}

export const widgetsReducer = createSlice({
  name: 'widgetsReducer',
  initialState,
  reducers: {
    getWidgets: (state, action) => {
      state.widgetData = action.payload;
    },
    toggleWidgetStatus: (state, action) => {
      const { categoryId, widgetId, newStatus } = action.payload;
      const category = state.widgetData.categories.find(c => c.id === categoryId);
      if (category) {
        const widget = category.widgets.find(w => w.id === widgetId);
        if (widget) {
          widget.status = newStatus;
        }
      }
    },
  },
});

export const { getWidgets, toggleWidgetStatus } = widgetsReducer.actions;
export default widgetsReducer.reducer;
