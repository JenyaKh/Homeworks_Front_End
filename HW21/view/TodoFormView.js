class FormListView{
    static FORM_TEMPLATE = `<form id="addTaskForm">
    <div class="row">
        <div class="ten columns">
            <input
                type="text"
                name="title"
                id="taskNameInput"
                class="u-full-width"
            />
            <span id="errorContainer" class="error hidden"></span>
        </div>
        <div class="two columns">
            <button type="submit" id="addBtn" class="u-full-width">
                Add
            </button>
        </div>
    </div>
</form> `

    static IMPUT_ELEMENT = '#taskNameInput'
        
    constructor(config = {}){
            
        this.$el = $(FormListView.FORM_TEMPLATE)
            .on( 'submit', (e) => {
                e.preventDefault(); 
                config.onAddTodo && config.onAddTodo({'title': $(FormListView.IMPUT_ELEMENT).val()});
                $(FormListView.IMPUT_ELEMENT).val('');
                }
            );             
        }         
    }