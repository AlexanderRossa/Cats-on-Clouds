/*global Vector, Matrix*/
var Node = (function () {
    function Node(pLocalTransformMatrix) {
        this.setLocalTransformMatrix(pLocalTransformMatrix);
        this.mArrayOfChildren = [];
    }

    Node.prototype.getLocalTransformMatrix = function () {
        return this.mLocalTransformMatrix;
    };
    Node.prototype.setLocalTransformMatrix = function (pLocalTransformMatrix) {
        this.mLocalTransformMatrix = pLocalTransformMatrix;
    };
    Node.prototype.getArrayOfChildren = function () {
        return this.mArrayOfChildren;
    };
    Node.prototype.setArrayOfChildren = function (pArrayOfChildren) {
        this.mArrayOfChildren = pArrayOfChildren;
    };

    //children operations
    Node.prototype.addChild = function (childToAdd) {
        this.mArrayOfChildren.push(childToAdd);
    };
    Node.prototype.getNumberOfChildren = function () {
        return this.mArrayOfChildren.length;
    };
    Node.prototype.getChildAt = function (arrayIndex) {
        if (arrayIndex < this.mArrayOfChildren.length) {
            return this.mArrayOfChildren[arrayIndex];
        }
        return -1;
    };

    Node.prototype.draw = function (pContext, pWorldTransformMatrix) {
        var multipliedMatrix, i;

        multipliedMatrix =
            pWorldTransformMatrix.multiply(this.getLocalTransformMatrix());
        multipliedMatrix.setTransform(pContext);

        for (i = 0; i < this.getNumberOfChildren(); i += 1) {
            this.getChildAt(i).draw(pContext, multipliedMatrix);
        }
        pWorldTransformMatrix.setTransform(pContext);
    };

    Node.prototype.update = function (deltaTime) {
        var i, child;
        for (i = 0; i < this.getNumberOfChildren(); i += 1) {
            child = this.getChildAt(i);
            if (typeof child.update === 'function') {
                child.update(deltaTime);
            }
        }
    };

    return Node;
}());