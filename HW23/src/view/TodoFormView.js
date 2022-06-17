class TodoFormView {
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
    </form>`;

    static TASK_NAME_SELECTOR = '#taskNameInput';

    constructor(config) {
        this._config = config;

        this.$el = $(TodoFormView.FORM_TEMPLATE).on('submit', (e) =>
            this.onFormSubmit(e),
        );
    }

    onFormSubmit(e) {
        e.preventDefault();

        const taskName = this.$el.find(TodoFormView.TASK_NAME_SELECTOR).val();

        this._config.onSave && this._config.onSave({ title: taskName });

        this.$el.trigger('reset');
    }
}