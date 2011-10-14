    $(function () {

        var Todo = function (containerElement) {
            var parentElement = containerElement;
        };
        
        Todo.prototype = function () {
            
            TodoModel = Backbone.Model.extend({
                initialize: function() {
                    this.bind("change", this.onChange);
                }
                , onChange: function() {
                }
            }),
            TodoStore = Backbone.Collection.extend({
                initialize: function() { alert('store'); },
                model: this.TodoModel,
                url: '/todo'
            }),

            TodoEntry = Backbone.View.extend({
                initialize: function () {
                    var me = this;
                    $.get("Assets/Todo/Item.html", function(content) {
                        $(me.el).append(content);
                        $(me.options.container).append(me.el);

                        Backbone.ModelBinding.bind(me);
                    });
                }

                ,onChange: function() { 
                }
            }),

            TodoList = Backbone.View.extend({
                initialize: function () { this.collection.bind("all", this.render); },
                render: function () {
                    var table = $(".todo-table", this.parentElement);
                    table.empty();
                    if (this.models == null) return;
                    this.models.forEach(function (todo) {
                        var zoneEntry = new TodoEntry({ model: todo, container: table });

                    });
                    return this;
                }
            }),

            TodoRouter = Backbone.Router.extend({
                initialize: function() { this.todoList = new TodoStore(); }
                ,routes: {
                    "": "list",
                    "new": "newtodo"
                }
                ,list: function () {
                    var view = new TodoList({ collection: this.todoList });
                    this.todoList.fetch();
                }
                ,newtodo: function() {
                    var view = new TodoEdit({model: this.todoList.create() });
                }
            });

            return { start: function() {new TodoRouter()} };
        } ();

        $(".todo-list").each( function(index, element) {
            var todo = new Todo(element);
            todo.start();
            });

        Backbone.history.start();
    });
    
