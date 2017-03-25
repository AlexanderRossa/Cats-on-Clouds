/*global Matrix, Vector, Node, CatEye, CatNose, Randomizer*/

var CatHead = (function () {
    function CatHead(pColour) {
        this.setColour(pColour);
        this.initialiseSceneGraph();
    }
    //getters and setters
    CatHead.prototype.getColour = function () {
        return this.mColour;
    };
    CatHead.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    CatHead.prototype.getRotation = function () {
        return this.mRotation;
    };
    CatHead.prototype.setRotation = function (pRotation) {
        this.mRotation = pRotation;
    };

    CatHead.prototype.initialiseSceneGraph = function () {
        var eyePositionX, eyePositionY, eyeColour,
            noseRotationNode, leftEyeNode, rightEyeNode, headRootNode;

        eyeColour = Randomizer.randomColour();
        eyePositionX = 4;
        eyePositionY = -4;

        headRootNode = new Node(Matrix.createIdentity());
        leftEyeNode = new Node(
            Matrix.createTranslation(new Vector(-eyePositionX, eyePositionY))
        );
        rightEyeNode = new Node(
            Matrix.createTranslation(new Vector(eyePositionX, eyePositionY))
        );
        noseRotationNode = new Node(
            Matrix.createRotation(Matrix.degreesToRadians(30))
        );

        headRootNode.addChild(leftEyeNode);
        headRootNode.addChild(rightEyeNode);
        headRootNode.addChild(noseRotationNode);

        leftEyeNode.addChild(new CatEye(eyeColour));
        rightEyeNode.addChild(new CatEye(eyeColour));
        noseRotationNode.addChild(new CatNose(Randomizer.randomColour()));

        this.mSceneGraph = headRootNode;
    };

    CatHead.prototype.draw = function (pContext, pWorldTransform) {
        //head
        pContext.beginPath();
        pContext.fillStyle = this.mColour;
        pContext.moveTo(-10, 0);
        pContext.lineTo(-8, -20);
        pContext.lineTo(-4, -10);
        pContext.lineTo(4, -10);
        pContext.lineTo(8, -20);
        pContext.lineTo(10, 0);
        pContext.lineTo(0, 5);
        pContext.closePath();
        pContext.fill();
        //eyes and nose
        this.mSceneGraph.draw(pContext, pWorldTransform);
    };

    return CatHead;
}());