/**
 * Application data state
 */
export let state = {
    task:[],
    history:[],
}

/**
 * Set input data to application state and localsotorage
 * @param {Object} data 
 */
export const setInputData = function(data){
    state.task.push(data);
    setlocalStorageData(state);
}


/**
 * Get task ID and task or history view and delete task
 * Set deleted task into history task
 * @param {string} id 
 * @param {string} views 
 */
export const deleteTask = function(id,view){
    if(view === 'task'){
        const [deletedTask] = state.task.filter(function(task){
            return task.id === id;
        });

        state.task = state.task.filter(function(task){
            return task.id !== id;
        });

        deletedTask.view = 'history';
        state.history.push(deletedTask);
    }
    else if(view === 'history'){
        state.history = state.history.filter(function(task){
            return task.id !== id;
        });
    }
    
    setlocalStorageData(state);

}

/**
 * Set data into localstorage
 * @param {Object} taskdata 
 */
const setlocalStorageData = function(taskdata){
    const data = JSON.stringify(taskdata);

    localStorage.setItem('taskdata',data);    
}

/**
 * Get data from localstorage and set to application state
 * @returns {boolean} return true if get data else false
 */
export const getlocalStorageData = function(){
    let taskdata = JSON.parse(localStorage.getItem('taskdata'));
    if(!taskdata){
        return false;
    }
    state = taskdata;

    return true;
}