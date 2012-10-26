describe("Tree", function(){
    it("should exist", function(){
	expect(Tree.Node).toBeDefined();
    });

    it("should be instantiable", function(){
	expect(new Tree.Node()).toBeDefined();
    });

    it("should be possible to add a child", function(){
	var root = new Tree.Node();

	root.addChild(new Tree.Node());

	expect(root.size()).toBe(2);
    });

    it("should be possible to add multiple children", function(){
	var root = new Tree.Node();

	root.addChild(new Tree.Node());
	root.addChild(new Tree.Node());

	expect(root.size()).toBe(3);
    });

    it("should be possible to add trees", function(){
	var child = new Tree.Node()
	child.addChild(new Tree.Node());
	child.addChild(new Tree.Node());

	var root = new Tree.Node();
	root.addChild(child);
	root.addChild(new Tree.Node());

	expect(root.size()).toBe(5);
    });

    it("should know its depth", function(){
	var child = new Tree.Node()
	child.addChild(new Tree.Node());
	child.addChild(new Tree.Node());

	var root = new Tree.Node();
	root.addChild(child);
	root.addChild(new Tree.Node());

	expect(root.depth()).toBe(2);
    });

    it("should know its parent", function(){
	var root = new Tree.Node({ name : "root" });
	var child = new Tree.Node()
	root.addChild(child);

	expect(child.parent().get("name")).toBe("root");
    })

    it("should be able to remove a child", function(){
	var root = new Tree.Node({ name : "root" });
	var child = new Tree.Node()
	child.addChild(new Tree.Node({ }));
	child.addChild(new Tree.Node({ }));
	root.addChild(child);
	root.addChild(new Tree.Node({}));
	
	child.removeFromParent();

	expect(root.size()).toBe(2);
    })
});