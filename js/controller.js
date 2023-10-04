'use strict';
import * as model from './model.js';
import view from './view/view.js';

/**
 * Get Input data and set to application state
 * @param {Object} data taskdata
 */
const controlInputData = function(data){
    //Take data
    model.setInputData(data);
    
    //Render single last input data
    if(model.state.task.length == 1){
        view.render(model.state.task[0],'first');
    }
    else{
        view.render(model.state.task[model.state.task.length-1]);
    }
}


/**
 * Get task ID and task or history view and delete task
 * @param {string} id 
 * @param {string} views 
 */
const controlDeleteData = function(id,views){
    model.deleteTask(id,views);

    if(model.state.task.length == 0 && views === 'task'){
        view.render(model.state.task,"Ops! No task.");
    }
    else if(model.state.history.length == 0 && views === 'history'){
        view.render(model.state.task,"Ops! No task.");
    }
    
}


/**
 * Render data in taskview section
 */
const controlTaskviwData = function(){
    if(model.state.task.length != 0){
        model.state.task.forEach(task => {
            view.render(task);
        });
    }else{
        view.render(model.state.task,"Ops! No task.");
    }
    
}


/**
 * Render data in historyview section
 */
const controlHistoryviwData = function(){
    if(model.state.history.length != 0){
        model.state.history.forEach(task => {
            view.render(task);
        });
    }else{
        view.render(model.state.history,"Ops! No task.");
    }
    
}


/**
 * Get data from localstorage
 * Render data in taskview
 */
const controlTaskStartup = function(){ 
    model.getlocalStorageData();

    controlTaskviwData();
}


/**
 * Initiate All Event and Application
 */
const init = function(){
    view.addHandlerStartup(controlTaskStartup);
    view.addHandlerInputData(controlInputData);
    view.addHandlerDeleteData(controlDeleteData);
    view.addHandlerTaskview(controlTaskviwData);
    view.addHandlerHistoryview(controlHistoryviwData);
}

init();