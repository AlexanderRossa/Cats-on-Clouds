var Vector = (function () {
    function Vector(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }
    Vector.prototype.getX = function () {
        return this.mX;
    };
    Vector.prototype.setX = function (pX) {
        this.mX = pX;
    };
    Vector.prototype.getY = function () {
        return this.mY;
    };
    Vector.prototype.setY = function (pY) {
        this.mY = pY;
    };
    Vector.prototype.getZ = function () {
        return this.mZ;
    };
    Vector.prototype.setZ = function (pZ) {
        this.mZ = pZ;
    };

    Vector.prototype.add = function (vectorToAdd) {
        return new Vector(this.getX() + vectorToAdd.getX(),
            this.getY() + vectorToAdd.getY(), 1);
    };
    Vector.prototype.subtract = function (vectorToSubtract) {
        return new Vector(this.getX() - vectorToSubtract.getX(),
            this.getY() - vectorToSubtract.getY(), 1);
    };
    Vector.prototype.multiply = function (scalar) {
        return new Vector(this.getX() * scalar, this.getY() * scalar, 1);
    };
    Vector.prototype.divide = function (scalar) {
        return new Vector(this.getX() / scalar, this.getY() / scalar, 1);
    };
    Vector.prototype.magnitude = function () {
        var magnitude;
        magnitude = Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY());
        return magnitude; //scalar with length of the vector
    };
    Vector.prototype.normalise = function () {
        return new Vector(this.getX() / this.magnitude(),
            this.getY() / this.magnitude(), 1);
        // normalised vector - keeps direction, looses length
    };
    Vector.prototype.limitTo = function (scalarToLimitWith) {
        var vectorToReturn, vectorToLimit;
        if (this.magnitude() > scalarToLimitWith) {
            vectorToLimit = this.normalise();
            vectorToReturn = new Vector(vectorToLimit.getX() * scalarToLimitWith,
                vectorToLimit.getY() * scalarToLimitWith, 1);
        } else {
            vectorToReturn = new Vector(this.getX(), this.getY(), 1);
        }
        return vectorToReturn; //vector with the same direction, but limited if needed
    };
    Vector.prototype.dotProduct = function (vectorToDotProduct) {
        return this.getX() * vectorToDotProduct.getX() +
            this.getY() * vectorToDotProduct.getY(); //scalar - result of dot product
    };
    Vector.prototype.interpolate = function (secondVector, alphaValue) {
        if (alphaValue > 1 || alphaValue < 0) {
            return -1;
        }//check if alpha is a possible value
        var modifiedThisVector, modifiedSecondVector, resultVector;
        //the formula is ((1 - alpha) * A) + (alpha * B)
        modifiedThisVector = new Vector((1 - alphaValue) * this.getX(),
            (1 - alphaValue) * this.getY(), 1);
        modifiedSecondVector = new Vector(secondVector.getX() * alphaValue,
            secondVector.getY() * alphaValue, 1);
        resultVector = modifiedThisVector.add(modifiedSecondVector);
        return resultVector; //vector - result of interpolation
    };
    Vector.prototype.rotate = function (scalarToRotateBy) {
        var newX, newY;
        newX = this.getX() * Math.cos(scalarToRotateBy) -
            this.getY() * Math.sin(scalarToRotateBy);
        newY = this.getX() * Math.sin(scalarToRotateBy) +
            this.getY() * Math.cos(scalarToRotateBy);
        return new Vector(newX, newY, 1); //rotated Vector
    };
    Vector.prototype.angleBetween = function (vectorToFindOutAngle) {
        var dotProduct, multipliedMagnitudes;
        dotProduct = this.dotProduct(vectorToFindOutAngle);
        multipliedMagnitudes = this.magnitude() + vectorToFindOutAngle.magnitude();
        return Math.acos(dotProduct / multipliedMagnitudes);
        //scalar with angle (in radians) between two vectors
    };

    return Vector;
}());