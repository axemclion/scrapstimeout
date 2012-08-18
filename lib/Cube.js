/**
 * The cube library, that converts a markup into a cube - the needed structure is
 * <containerDiv>
 * 		<placeholder>
 * 			<side1></side1> ..... <side6></side6>
 * 		</placeholder>
 * </container>
 * requires jquery and Modernizr
 * @param {Object} elem - the containerDiv
 */
var Cube = function(elem){
	this.cubeContainer = elem;
	this.cubeHandle = this.cubeContainer.children();
	
	this.isTransformEnabled = $("html").hasClass("csstransforms3d");
	
	if (this.isTransformEnabled) {
		// Adding 3d Cube transforms
		var w = this.cubeContainer.width();
		var h = this.cubeContainer.height();
		this.cubeContainer.css(this.cssV("perspective", "1200px"));
		this.cubeHandle.css(this.cssV("transform", "translateZ(-" + (w / 2) + "px)"));
		this.cubeHandle.css(this.cssV("transform-style", "preserve-3d"));
		this.cubeHandle.css(this.cssV("transition", "1s ease-in-out"));
	}
	
	this.initializeSides();
	var me = this;
	$(window).on("resize", function(){
		me.initializeSides();
	});
	this.showFace(1);
};

Cube.prototype.initializeSides = function(){
	if (this.isTransformEnabled) {
		var w = this.cubeContainer.width();
		var h = this.cubeContainer.height();
		
		var sides = [["Y", 0, w / 2], ["Y", 90, w / 2], ["Y", -180, w / 2], ["Y", -90, w / 2], ["X", 90, h / 2 - (h - w) / 2], ["X", -90, (h - w) / 2 + h / 2]];
		var axis, deg, dist, prop;
		this.cubeHandle.children().css("z-index", 0).css(this.cssV("backface-visibility", "hidden"));
		for (var i = 0; i < sides.length; i++) {
			axis = sides[i][0], deg = sides[i][1], dist = sides[i][2];
			prop = ["rotate", axis, "(", deg, "deg) translateZ(", parseInt(dist, 10), "px)"].join("");
			this.cubeHandle.children(":eq(" + i + ")").css(this.cssV("transform", prop));
		}
		this.cubeHandle.children(":eq(4)").height(w);
		this.cubeHandle.children(":eq(5)").height(w);
	} else {
		this.cubeHandle.children().hide();
		this.cubeHandle.children(":eq(" + (this.shownFace - 1) + ")").show().css("z-index", 1);
	}
}

Cube.prototype.cssV = function(key, val){
	var prefix = ["-webkit-", "-moz-", "-o-", "ms-", ""];
	var result = {};
	for (var i = 0; i < prefix.length; i++) {
		result[prefix[i] + key] = val;
	}
	return result;
}

Cube.prototype.showFace = function(faceNum){
	this.shownFace = faceNum;
	if (this.isTransformEnabled) {
		var face = ["rotateY(0deg)", "rotateY(-90deg)", "rotateY(-180deg)", "rotateY(-270deg)", "rotateX(-90deg)", "rotateX(90deg)"];
		var prop = ["translateZ(-", this.cubeContainer.width() / ((faceNum == 5 || faceNum === 6) ? 1 : 2), "px) "];
		prop.push(face[faceNum - 1]);
		this.cubeHandle.css(this.cssV("transform", prop.join("")));
		this.cubeHandle.children().css("z-index", 0);
		this.cubeHandle.children(":eq(" + (faceNum - 1) + ")").css("z-index", 1);
	} else {
		this.cubeHandle.children().hide();
		this.cubeHandle.children(":eq(" + (faceNum - 1) + ")").show().css("z-index", 1);
	}
};
