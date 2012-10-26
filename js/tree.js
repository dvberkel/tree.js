(function($, Tree){
    var root = new Tree.Node();
    var child = new Tree.Node();
    child.addChild(new Tree.Node());
    child.addChild(new Tree.Node());
    root.addChild(child);
    root.addChild(new Tree.Node());

    $(function(){
	new Tree.NodeView({ model : root, el : $("body")})
    });
})(jQuery, Tree);