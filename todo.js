$(function () {
	var Todo = function (containerElement) {
		this.parentElement = containerElement;
	};

	Todo.prototype = function () {
			
		TodoModel = Backbone.Model.extend({}),
			
		TodoEntry = Backbone.View.extend({
					initialize: function () {
							var me = this;
							$.get(".\item.htm", function(content) {
									$(me.el).append(content);
									$(me.options.container).append(me.el);

									Backbone.ModelBinding.bind(me);
							});
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
			routes: {
				"": "list",
			}
			,list: function () {
				var todos = new Backbone.Collection([ {Title: "Brush Teeth"}, 
					{Title: "Sweep"}, 
					{Title: "Wash Face"}] );
				var view = new TodoList({ collection: todos });
				view.render();
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

