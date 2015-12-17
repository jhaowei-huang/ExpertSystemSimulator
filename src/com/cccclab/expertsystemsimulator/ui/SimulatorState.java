package com.cccclab.expertsystemsimulator.ui;

import java.util.List;

import com.vaadin.shared.ui.JavaScriptComponentState;

public class SimulatorState extends JavaScriptComponentState {
	private String drawingMode = "table";
	
	public void setDrawingMode(String mode) {
		this.drawingMode = mode;
	}
	
	public String getDrawingMode() {
        return drawingMode;
    }
}
