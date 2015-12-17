package com.cccclab.expertsystemsimulator.ui;

import com.cccclab.expertsystemsimulator.design.ComponentBoxDesign;
import com.cccclab.expertsystemsimulator.design.MainWindowDesign;
import com.vaadin.ui.Accordion;
import com.vaadin.ui.Button;
import com.vaadin.ui.Label;
import com.vaadin.ui.MenuBar;
import com.vaadin.ui.MenuBar.MenuItem;
import com.vaadin.ui.VerticalLayout;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.Button.ClickListener;

public class MainWindow extends MainWindowDesign {
	public MainWindow() {
		super();
		menubar.setImmediate(false);
		menubar.setWidth("100.0%");
		menubar.setHeight("-1px");
		
		MenuItem mi_file = menubar.addItem("File", null);
		mi_file.addItem("New", null, null);
		mi_file.addItem("Open", null, null);
		mi_file.addItem("Save", null, null);
		MenuItem mi_edit = menubar.addItem("Edit", null);
		mi_edit.addItem("add object", null, null);
		mi_edit.addItem("add event", null, null);
		mi_edit.addItem("add sensor", null, null);
		mi_edit.addItem("undo", null, null);
		mi_edit.addItem("redo", null, null);
		MenuItem mi_simu  = menubar.addItem("simulator", null);
		
		MenuBar.Command cmd = new MenuBar.Command() {
		    public void menuSelected(MenuItem selectedItem) {
		    	// do something...
		    }  
		};
		
		ComponentButtonClickListener handler = new ComponentButtonClickListener();
		
        for (int i = 1; i <= 3; i++) {
        	ComponentBox cb = new ComponentBox();
            leftBar.addTab(cb, "Tab " + i);
            
            cb.getComponentButton("chair").addClickListener(handler);
            cb.getComponentButton("table").addClickListener(handler);
            cb.getComponentButton("tv").addClickListener(handler);
        }
	}
	
	class ComponentButtonClickListener implements ClickListener {
		@Override
		public void buttonClick(ClickEvent event) {
			Button btn = event.getButton();
			if(btn != null)
				simulator.setDrawingMode(btn.getCaption());
			else
				System.out.println("not button");
		}
	}
}
