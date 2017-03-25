/*global Matrix, Vector, Node, Randomizer, CatTail,
CatBody, CatFoot, CatHead, Cloud, CatWhiskers*/
var Cat = (function () {
    function Cat(pPosition, pScale, pRotation) {
        this.setPosition(pPosition);
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.setTranslateDirection(true);
        this.setCounter(1);
        this.setCounterSwitch(Randomizer.randomIntegerInRange(75, 250));
        this.setCatHeadRotation(0);
        this.setCatHeadRotationCounter(1);
        this.initialiseSceneGraph();
    }

    //getters and setters
    Cat.prototype.getSceneGraph = function () {
        return this.mSceneGraph;
    };
    Cat.prototype.setSceneGraph = function (pSceneGraph) {
        this.mSceneGraph = pSceneGraph;
    };
    Cat.prototype.getPosition = function () {
        return this.mPosition;
    };
    Cat.prototype.setPosition = function (pPosition) {
        this.mPosition = pPosition;
    };
    Cat.prototype.getScale = function () {
        return this.mScale;
    };
    Cat.prototype.setScale = function (pScale) {
        this.mScale = pScale;
    };
    Cat.prototype.getRotation = function () {
        return this.mRotation;
    };
    Cat.prototype.setRotation = function (pRotation) {
        this.mRotation = pRotation;
    };
    Cat.prototype.getCatHeadRotation = function () {
        return this.mCatHeadRotation;
    };
    Cat.prototype.setCatHeadRotation = function (pCatHeadRotation) {
        this.mCatHeadRotation = pCatHeadRotation;
    };
    Cat.prototype.getCatHeadRotationNode = function () {
        return this.mCatHeadRotationNode;
    };
    Cat.prototype.setCatHeadRotationNode = function (pCatHeadRotationNode) {
        this.mCatHeadRotationNode = pCatHeadRotationNode;
    };
    Cat.prototype.getCatHeadRotationCounter = function () {
        return this.mCatHeadRotationCounter;
    };
    Cat.prototype.setCatHeadRotationCounter = function (pCatHeadRotationCounter) {
        this.mCatHeadRotationCounter = pCatHeadRotationCounter;
    };
    Cat.prototype.getTranslateDirection = function () {
        return this.mTranslateDirection;
    };
    Cat.prototype.setTranslateDirection = function (pTranslateDirection) {
        this.mTranslateDirection = pTranslateDirection;
    };
    Cat.prototype.getCounter = function () {
        return this.mCounter;
    };
    Cat.prototype.setCounter = function (pCounter) {
        this.mCounter = pCounter;
    };
    Cat.prototype.getCounterSwitch = function () {
        return this.mCounterSwitch;
    };
    Cat.prototype.setCounterSwitch = function (pCounterSwitch) {
        this.mCounterSwitch = pCounterSwitch;
    };

    //scene graph constructed during object initialisation
    Cat.prototype.initialiseSceneGraph = function () {
        var catTranslationMatrix, catRotationMatrix, catScaleMatrix,
            catTranslationNode, catRotationNode, catScaleNode,
            catBodyNode, catTailNode,
            catFeetNode, catRightFootTranslationNode,
            catLeftFootTranslationNode, catFeetDistance,
            catHeadNode, catHeadRotationNode,
            catWhiskersNode, catReversedWhiskersNode,
            catBodyColour, catBodyPatchColour, catFeetColour,
            catHeadColour, catTailColour, catWhiskersColour,
            cloudNode, cloud;

        catTranslationMatrix = Matrix.createTranslation(this.mPosition);
        catRotationMatrix = Matrix.createRotation(this.mRotation);
        catScaleMatrix = Matrix.createScale(this.mScale);

        catBodyColour = Randomizer.randomColourInRangeGreyscale(1, 240);
        catBodyPatchColour = Randomizer.randomColourInRangeGreyscale(1, 240);
        catHeadColour = Randomizer.randomColourInRangeGreyscale(1, 240);
        catTailColour = Randomizer.randomColourInRangeGreyscale(1, 240);
        catFeetColour = Randomizer.randomColourInRangeGreyscale(1, 240);

        catTranslationNode = new Node(catTranslationMatrix);
        catRotationNode = new Node(catRotationMatrix);
        catScaleNode = new Node(catScaleMatrix);

        catBodyNode = new Node(Matrix.createIdentity());

        catFeetNode = new Node(Matrix.createTranslation(
            new Vector(0, 48, 1)
        ));

        catFeetDistance = 4;
        catRightFootTranslationNode = new Node(Matrix.createTranslation(
            new Vector(catFeetDistance, 0, 1)
        ));
        catLeftFootTranslationNode = new Node(Matrix.createTranslation(
            new Vector(-catFeetDistance, 0, 1)
        ));

        catHeadNode = new Node(Matrix.createIdentity());
        catHeadRotationNode = new Node(
            Matrix.createRotation(this.getCatHeadRotation())
        );
        catTailNode = new Node(Matrix.createTranslation(
            new Vector(0, 48, 1)
        ));

        //whole cat transform nodes
        catTranslationNode.addChild(catRotationNode);
        catRotationNode.addChild(catScaleNode);

        //adding body parts
        catScaleNode.addChild(catBodyNode);
        catScaleNode.addChild(catFeetNode);
        catScaleNode.addChild(catHeadRotationNode);

        //body
        catBodyNode.addChild(catTailNode);
        catTailNode.addChild(new CatTail(
            catTailColour,
            Randomizer.randomIntegerInRange(2, 4)
        ));
        catBodyNode.addChild(new CatBody(catBodyColour, catBodyPatchColour));

        //feet and cloud
        catFeetNode.addChild(catLeftFootTranslationNode);
        catFeetNode.addChild(catRightFootTranslationNode);

        catLeftFootTranslationNode.addChild(new CatFoot(catFeetColour));
        catRightFootTranslationNode.addChild(new CatFoot(catFeetColour));

        cloudNode = new Node(Matrix.createTranslation(new Vector(0, 12, 1)));
        cloud = new Cloud(new Vector(0, 0, 1), new Vector(1, 1, 1), 0);
        cloudNode.addChild(cloud);
        catFeetNode.addChild(cloudNode);

        //head
        catHeadRotationNode.addChild(catHeadNode);
        catHeadNode.addChild(new CatHead(catHeadColour));

        //whiskers
        catWhiskersNode = new Node(
            Matrix.createTranslation(new Vector(5, 0, 1))
        );
        catReversedWhiskersNode = new Node(
            Matrix.createTransform(new Vector(-5, 0, 1), new Vector(-1, 1, 1), 0)
        );
        catHeadRotationNode.addChild(catWhiskersNode);
        catHeadRotationNode.addChild(catReversedWhiskersNode);

        catWhiskersColour =
            Randomizer.randomColourInRangeWithRandomTransparencyGreyscale(20, 100);
        catWhiskersNode.addChild(new CatWhiskers(catWhiskersColour));
        catReversedWhiskersNode.addChild(new CatWhiskers(catWhiskersColour));

        //sets a handle to the CatHeadRotationNode so that it can update it
        this.setCatHeadRotationNode(catHeadRotationNode);
        //sets the scene graph to the beginning of the local cat object transforms
        this.mSceneGraph = catTranslationNode;
    };

    //draws a Cat on the canvas with mTransformMatrix as the anchor point 
    Cat.prototype.draw = function (pContext, pWorldTransformMatrix) {
        this.mSceneGraph.draw(pContext, pWorldTransformMatrix);
    };

    Cat.prototype.update = function (deltaTime) {
        //moving cat and cloud
        var newPosition, newRotation;
        if (this.mCounter < this.mCounterSwitch) {
            this.mCounter += 1;
            if (this.mTranslateDirection) {
                newPosition = this.getPosition().add(
                    new Vector(
                        -1 * Randomizer.randomIntegerInRange(10, 40) * deltaTime, //X-axis
                        -1 * Randomizer.randomIntegerInRange(1, 5) * deltaTime, //Y-axis
                        1
                    )
                );
            } else {
                newPosition = this.getPosition().add(
                    new Vector(
                        Randomizer.randomIntegerInRange(10, 40) * deltaTime, //X-axis
                        Randomizer.randomIntegerInRange(1, 5) * deltaTime, //Y-axis
                        1
                    )
                );
            }
        } else {
            this.setCounter(0);
            this.setCounterSwitch(Randomizer.randomIntegerInRange(75, 250));
            this.setTranslateDirection(!this.getTranslateDirection());
            newPosition = this.getPosition();
        }

        //so that we work with updated position next time
        this.setPosition(newPosition);

        this.mSceneGraph.setLocalTransformMatrix(
            Matrix.createTranslation(newPosition)
        );

        //rotating cat's head
        if (this.mCatHeadRotationCounter < 100) {
            newRotation = this.getCatHeadRotation() + 0.5 * deltaTime;
            if (this.mCatHeadRotationCounter === 99) {
                this.mCatHeadRotationCounter = 200;
            }
            this.mCatHeadRotationCounter += 1;
        } else {
            newRotation = this.getCatHeadRotation() - 0.5 * deltaTime;
            if (this.mCatHeadRotationCounter === 100) {
                this.mCatHeadRotationCounter = 1;
            }
            this.mCatHeadRotationCounter -= 1;
        }

        //so that we work with updated position next time
        this.setCatHeadRotation(newRotation);

        this.mCatHeadRotationNode.setLocalTransformMatrix(
            Matrix.createRotation(newRotation)
        );

        //call update on children nodes of cat's scenegraph
        this.mSceneGraph.update(deltaTime);
    };

    return Cat;
}());