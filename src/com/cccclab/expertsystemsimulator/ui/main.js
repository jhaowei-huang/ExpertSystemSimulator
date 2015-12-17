/*
 * 
 * 
 */

window.com_cccclab_expertsystemsimulator_ui_Simulator = function() {
  simulator = new Simulator(this.getElement());
  simulator.init();

  this.onStateChange = function() {
    var mode = this.getState().drawingMode;
    if(mode == "chair")
    	mode = "circle";
    else
    	mode = "rect";
    
    simulator.setValue(mode);
  };
}
