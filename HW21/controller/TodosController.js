class TodosController {
    constructor($container) {
        this._todosListView = new TodosListView({
            onToggle: (id) => this.toggleTodo(id),
            onDelete: (id) => this.removeTodo(id),
        });

        $container.append(this._todosListView.$el);

        this._todosList = new TodosCollection();
        this._todosList
            .fetchList()
            .then(() => this._todosListView.renderList(this._todosList.list));

         this._todoFormView = new TodoFormView({
            onAddTodo: (todo) => this.addTodo(todo),
         });

         $container.append(this._formListView.$el);
       
    }

    toggleTodo(id) {
        this._todosList.toggleTodo(id);
        this._todosListView.renderList(this._todosList.list);
    }

    removeTodo(id) {
        this._todosList.removeTodo(id);
        this._todosListView.renderList(this._todosList.list);
    }

    addTodo(todo){
     this._todosList.addTodo(todo);
     this._todosListView.renderList(this._todosList.list);
    }
}