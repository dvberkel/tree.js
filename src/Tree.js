(function($, _, Backbone, undefined){
    var Tree = {};

    Tree.Node = Backbone.Model.extend({
	initialize : function(){
	    this.set("children", new Nodes());
	},

	addChild : function(child){
	    child.setParent(this);
	    this.get("children").add(child);
	},

	removeFromParent : function(){
	    var parent = this.parent();
	    parent.get("children").remove(this);
	    parent.triggerEvent("change:tree");
	},

	triggerEvent : function(event){
	    if (this.has("parent")) {
		this.parent().triggerEvent(event);
	    } else {
		this.trigger(event);
	    }
	},

	setParent : function(parent) {
	    this.set("parent", parent);
	},

	parent : function(){
	    return this.get("parent");
	},

	eachAncestor : function(callback){
	    callback.call(this);
	    if (this.has("parent")) {
		this.get("parent").eachAncestor(callback);
	    }
	},

	size : function(){
	    var size = 1;
	    this.get("children").each(function(child){
		size += child.size();
	    });
	    return size;
	},
	
	depth : function(){
	    var depth = 0;
	    this.get("children").each(function(child){
		depth = Math.max(depth, child.depth() + 1);
	    });
	    return depth;
	}
    });

    var Nodes = Backbone.Collection.extend({
	model : Tree.Node
    });

    Tree.NodeView = Backbone.View.extend({
	initialize : function(){
	    this.model.on("change:tree", this.render, this);
	    this.render();
	},

	render : function(){
	    var model = this.model;
	    this.$el.empty();
	    var ul = $("<ul/>");
	    ul.appendTo(this.$el);
	    new NodeDataView({ model : this.model, el : ul });
	    this.model.get("children").each(function(child){
		var li = $("<li/>");
		li.appendTo(ul);
		new Tree.NodeView({ model : child, el : li });
	    });
	}
    });

    var NodeDataView = Backbone.View.extend({
	template : _.template("<span><%= depth %></span>"),

	initialize : function(){
	    this.model.on("change:highlight", this.render, this);
	    this.render();
	},

	render : function(){
	    var span = this.span();
	    if (this.model.get("highlight")) {
		span.addClass("highlighted");
	    } else {
		span.removeClass("highlighted");
	    }
	},

	span : function(){
	    if (! this._span) {
		var model = this.model;
		var span = $(this.template({ depth : model.depth() }));
		span.mouseenter(function(){
		    model.eachAncestor(function(){
			this.set("highlight", true);
		    });
		});
		span.mouseout(function(){
		    model.eachAncestor(function(){
			this.set("highlight", false);
		    });
		});
		span.click(function(){
		    model.removeFromParent();
		})
		span.appendTo(this.$el);
		this._span = span;
	    }
	    return this._span;
	}
    });
    
    window.Tree = Tree;
})($, _, Backbone);