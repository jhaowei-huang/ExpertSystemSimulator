package com.cccclab.expertsystemsimulator.ui;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.google.gwt.event.dom.client.DropEvent;
import com.google.gwt.event.dom.client.DropHandler;
import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;

import elemental.json.JsonArray;
import elemental.json.JsonException;

@JavaScript({
	"https://d3js.org/d3.v3.min.js",
	"event.js",
	"simulator.js",
	"main.js"
})
/*
@JavaScript({
	"https://d3js.org/d3.v3.min.js",
	"simulator_connector.js",
})*/
public class Simulator extends AbstractJavaScriptComponent {
	public Simulator() {
		
	}
	
	public void setDrawingMode(final String mode) {
        getState().setDrawingMode(mode);
    }
 
    @Override
    public SimulatorState getState() {
        return (SimulatorState) super.getState();
    }
}
