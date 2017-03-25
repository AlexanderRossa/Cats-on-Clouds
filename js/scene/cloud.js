/*global Matrix, Vector, Node, Randomizer, Circle*/
/*jslint maxlen: 200*/

var Cloud = (function () {
    function Cloud(pPosition, pScale, pRotation) {
        this.setPosition(pPosition);
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.initialiseSceneGraph();
    }

    //getters and setters
    Cloud.prototype.getSceneGraph = function () {
        return this.mSceneGraph;
    };
    Cloud.prototype.setSceneGraph = function (pSceneGraph) {
        this.mSceneGraph = pSceneGraph;
    };
    Cloud.prototype.getPosition = function () {
        return this.mPosition;
    };
    Cloud.prototype.setPosition = function (pPosition) {
        this.mPosition = pPosition;
    };
    Cloud.prototype.getScale = function () {
        return this.mScale;
    };
    Cloud.prototype.setScale = function (pScale) {
        this.mScale = pScale;
    };
    Cloud.prototype.getRotation = function () {
        return this.mRotation;
    };
    Cloud.prototype.setRotation = function (pRotation) {
        this.mRotation = pRotation;
    };

    //scene graph of object initialisation
    Cloud.prototype.initialiseSceneGraph = function () {
        var i, translationMatrix, rotationMatrix, scaleMatrix,
            translationNode, rotationNode, scaleNode,
            circlesNode, circleTranslationNode, circleScaleNode,
            randomTranslationVector, randomScaleVector, randomColour,
            randomFloat;

        translationMatrix = Matrix.createTranslation(this.mPosition);
        rotationMatrix = Matrix.createRotation(this.mRotation);
        scaleMatrix = Matrix.createScale(this.mScale);

        translationNode = new Node(translationMatrix);
        rotationNode = new Node(rotationMatrix);
        scaleNode = new Node(scaleMatrix);
        circlesNode = new Node(Matrix.createIdentity());

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(circlesNode);
        for (i = 0; i < Randomizer.randomIntegerInRange(10, 15); i += 1) {
            //random variables
            randomTranslationVector = Randomizer.randomVectorInRange(-10 * i, 10 * i, -1 * i, i);
            randomFloat = Randomizer.randomFloatInRange(1.5, 2.5);
            randomScaleVector = Randomizer.randomVectorInRange(
                randomFloat,
                randomFloat,
                randomFloat,
                randomFloat
            );
            randomColour = Randomizer.randomColourInRangeWithTransparencySetGreyscale(180, 230, 0.8);
            //node instantiation
            circleTranslationNode = new Node(Matrix.createTranslation(randomTranslationVector));
            circleScaleNode = new Node(Matrix.createScale(randomScaleVector));
            //node stacking
            circlesNode.addChild(circleTranslationNode);
            circleTranslationNode.addChild(circleScaleNode);
            circleScaleNode.addChild(new Circle(randomColour));
        }

        this.mSceneGraph = translationNode;
    };

    //draws a Cloud on the canvas with mTransformMatrix as the anchor point 
    Cloud.prototype.draw = function (pContext, pWorldTransformMatrix) {
        this.mSceneGraph.draw(pContext, pWorldTransformMatrix);
    };

    return Cloud;
}());