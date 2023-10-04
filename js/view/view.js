import taskicon from './../../img/task.png';
import deleteicon from './../../img/delete.png';


class View{
    #parentElementTask = document.querySelector('.task-list-section');
    #parentElementForm = document.querySelector('.form-section');
    #optionBar = document.querySelector('.option-bar');
    #loader = document.querySelector('.loader');
    #notification = document.querySelector('.notification');
    #closebtn = document.querySelector('.close-btn');
    #data;

    constructor(){
        this._closebtn();
    }


    /**
     * Received task and error message and render it in browser
     * @param {Object} tasks 
     * @param {String} errorMsg 
     */
    render(tasks,errorMsg=''){
        this.#data = tasks;

        let markup;
        if(errorMsg === 'first'){
            this._clear();
            markup = this._generateMarkup();
        }else if(errorMsg){
            markup = errorMsg;
        }
        else{
            markup = this._generateMarkup();
        }
        this.#parentElementTask.insertAdjacentHTML('afterbegin',markup);
    }



    /*================================*/
    /*    Event for controller          
    /*===============================*/

    /**
     * Get Input from form
     * @param {callback} handler controllerIntpuData
     */
    addHandlerInputData(handler){
        ['submit','click'].forEach(event=>{
            this.#parentElementForm.addEventListener(event,this._generateClickEventInputData.bind(this,handler));
        }); 
    }


    /**
     * Delete task when click on delete button
     * @param {callback} handler controlDeleteData
     */
    addHandlerDeleteData(handler){

        this.#parentElementTask.addEventListener('click',function(e){
            e.preventDefault();

            if(!e.target.classList.contains('delete-btn')){
                return;
            }
            const ID = e.target.closest('.task').dataset.id;
            const view = e.target.closest('.task').dataset.view;
            
            e.target.closest('.task').remove();
            
            handler(ID,view);

        });
    }


    /**
     * Render data when click on task button
     * @param {callback} handler controlTaskviwData
     */
    addHandlerTaskview(handler){
        this.#optionBar.addEventListener('click',this._displayTask.bind(handler,this));
    }


     /**
     * Render data when click on history button
     * @param {callback} handler controlHistoryviwData
     */
    addHandlerHistoryview(handler){
        this.#optionBar.addEventListener('click',this._displayHistory.bind(handler,this));
    }


    /**
     * Render data when load the page
     * @param {callback} handler controlTaskStartup
     */
    addHandlerStartup(handler){
        let viewobj = this;
        
        window.addEventListener('load',function(){
            viewobj.#loader.style.display = 'none';
        });
        handler();
    }

    /*================================*/
    /*    Private method         
    /*===============================*/
    
    /**
     * Generate Random Unique ID
     * @returns string
     */
    _generateId(){
        let id = new Date();
        id = id.toISOString().split('-')[2].split(':')[2].replace('.','');
        return id;
    }


    /**
     * Callback funtion for get input value
     * @param {callback} handler controllerIntpuData
     * @param {Object} event click or submit
     * @returns null
     */
    _generateClickEventInputData(handler,event){

        event.preventDefault();
        if(event.target.classList.contains('submit-btn') || event.type === 'submit'){
            const inputDataEl = event.currentTarget.querySelector('.input-data');
            const inputData = inputDataEl.value.trim();
            const id = this._generateId();

            if(!inputData){
                this.#notification.style.visibility = 'visible';
                return;
            }

            const data = {
                id,
                data:inputData,
                view:'task' 
            }

            handler(data);

            //Clear Input field
            inputDataEl.value = ' ';
            
        }
    }


    /**
     * Generate HTML Markup
     * @returns string
     */
    _generateMarkup(){
        return `
        <div class="task" data-id ="${this.#data.id}" data-view = "${this.#data.view}">
            <div>
                <img src="${taskicon}" alt="">
            </div>
            <div class="task-content">${this.#data.data.replace(/<[^>]+>/g,'')} </div>
            <div class="delete-wrapper">
                <img src="${deleteicon}" class="delete-btn" alt="">
            </div>
        </div>
        
        `;
    }


    /**
     * Callback funtion for taskview button
     * @param {object} viewobj 
     * @param {object} e 
     * @returns null if no target element found
     */
    _displayTask = function(viewobj,e){
        e.preventDefault();
        const handler = this;
        const historyBtn = e.target.closest('.option-bar').querySelector('.history-btn');

        if(!e.target.closest('.task-btn')){
            return;
        }

        viewobj._clear();
        handler();

        //Add active status
        e.target.closest('.task-btn').classList.add('active-btn');
        historyBtn.classList.remove('active-btn');

        //Enable Input Field
        viewobj.#parentElementForm.querySelector('.input-data').disabled=false;
        viewobj.#parentElementForm.querySelector('.submit-btn').style.visibility='visible';
        
    }


    /**
     * Callback funtion for historyview button
     * @param {object} viewobj 
     * @param {object} e 
     * @returns null if no target element found
     */
    _displayHistory = function(viewobj,e){
        e.preventDefault();
        const handler = this;
        const taskBtn = e.target.closest('.option-bar').querySelector('.task-btn');

        if(!e.target.closest('.history-btn')){
            return;
        }

        viewobj._clear();
        handler();

        //Active status of history btn
        e.target.closest('.history-btn').classList.add('active-btn');
        taskBtn.classList.remove('active-btn');

        //disabled input field
        viewobj.#parentElementForm.querySelector('.input-data').disabled=true;
        viewobj.#parentElementForm.querySelector('.submit-btn').style.visibility='hidden';
    }

    
    /**
     * Clear parent element html
     */
    _clear(){
        this.#parentElementTask.innerHTML = ' ';
    }


    /**
     * Close notification panel
     */
    _closebtn(){
        let notification = this.#notification;
        this.#closebtn.addEventListener('click',function(e){
            e.preventDefault();
            notification.style.visibility='hidden';
        })
    }
}

export default new View();