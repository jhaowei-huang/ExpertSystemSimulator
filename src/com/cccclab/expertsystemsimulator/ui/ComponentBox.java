package com.cccclab.expertsystemsimulator.ui;

import com.cccclab.expertsystemsimulator.design.ComponentBoxDesign;
import com.vaadin.server.ExternalResource;
import com.vaadin.server.Page;
import com.vaadin.ui.Button;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.Button.ClickListener;
import com.vaadin.ui.DragAndDropWrapper;
import com.vaadin.ui.DragAndDropWrapper.DragStartMode;
import com.vaadin.ui.JavaScript;
import com.vaadin.ui.JavaScriptFunction;
import com.vaadin.ui.Link;
import com.vaadin.ui.Notification;

import elemental.json.JsonArray;

public class ComponentBox extends ComponentBoxDesign {
	public ComponentBox() {
		super();
		
	}
	
	public Button getComponentButton(String name) {
		if(name.equals("chair"))
			return this.componentChair;
		else if(name.equals("table"))
			return this.componentTable;
		else if(name.equals("tv"))
			return this.componentTV;
		else
			return null;
	}
}
