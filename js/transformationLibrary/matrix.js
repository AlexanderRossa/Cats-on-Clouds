/*global Vector, alert*/
var Matrix = (function () {
    function Matrix(p00, p01, p02, p10, p11, p12, p20, p21, p22) {
        this.setMatrixArray(p00, p01, p02, p10, p11, p12, p20, p21, p22);
    }
    Matrix.prototype.setMatrixArray =
        function (p00, p01, p02, p10, p11, p12, p20, p21, p22) {
            this.mMatrixArray = [
                [p00, p01, p02],
                [p10, p11, p12],
                [p20, p21, p22]
            ];
        };
    Matrix.prototype.getMatrixArray = function () {
        return this.mMatrixArray;
    };

    Matrix.createIdentity = function () {
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    };
    Matrix.createTranslation = function (vector) {
        return new Matrix(1, 0, vector.getX(), 0, 1, vector.getY(), 0, 0, 1);
    };
    Matrix.createScale = function (vector) {
        return new Matrix(vector.getX(), 0, 0, 0, vector.getY(), 0, 0, 0, 1);
    };
    Matrix.degreesToRadians = function (degrees) {
        return degrees * 0.0174532925; //number is PI/180
    };
    Matrix.createRotation = function (rotationInRadians) {
        return new Matrix(Math.cos(rotationInRadians), -Math.sin(rotationInRadians),
            0, Math.sin(rotationInRadians), Math.cos(rotationInRadians), 0, 0, 0, 1);
    };
    Matrix.createTransform = function (pPosition, pScale, pRotation) {
        var transform, translate, scale, rotate;
        translate = Matrix.createTranslation(pPosition);
        scale = Matrix.createScale(pScale);
        rotate = Matrix.createRotation(pRotation);
        transform = translate.multiply(rotate.multiply(scale));
        return transform;
    };

    Matrix.prototype.getElement = function (row, column) {
        return this.getMatrixArray()[row][column];
    };

    Matrix.prototype.multiply = function (matrixToMultiply) {
        var i, j, k, thisMatrix, resultArray,
            thisMatrixColumnCount,
            thisMatrixRowCount,
            matrixToMultiplyColumnCount,
            matrixToMultiplyRowCount,
            matrixToReturn;

        thisMatrix = this.getMatrixArray();
        matrixToMultiply = matrixToMultiply.getMatrixArray();
        thisMatrixRowCount = thisMatrix.length;
        thisMatrixColumnCount = thisMatrix[0].length;
        matrixToMultiplyRowCount = matrixToMultiply.length;
        matrixToMultiplyColumnCount = matrixToMultiply[0].length;

        resultArray = [];

        //check for validity of operation - m1-COL-count == m2-ROWcount
        if (thisMatrixColumnCount === matrixToMultiplyRowCount) {
            for (i = 0; i < thisMatrixRowCount; i += 1) {
                resultArray[i] = [];
                for (j = 0; j < matrixToMultiplyColumnCount; j += 1) {
                    resultArray[i][j] = 0;
                    for (k = 0; k < thisMatrixColumnCount; k += 1) {
                        resultArray[i][j] += thisMatrix[i][k] * matrixToMultiply[k][j];
                    }
                }
            }
        } else {
            alert("Matrix multiplication impossible.");
        }

        matrixToReturn =
            new Matrix(
                resultArray[0][0],
                resultArray[0][1],
                resultArray[0][2],
                resultArray[1][0],
                resultArray[1][1],
                resultArray[1][2],
                resultArray[2][0],
                resultArray[2][1],
                resultArray[2][2]
            );

        return matrixToReturn;
    };

    Matrix.prototype.multiplyVector = function (vectorToMultiply) {
        var vectorToMultiplyX, vectorToMultiplyY, vectorToMultiplyZ,
            resultVectorX, resultVectorY, resultVectorZ;

        vectorToMultiplyX = vectorToMultiply.getX();
        vectorToMultiplyY = vectorToMultiply.getY();
        vectorToMultiplyZ = vectorToMultiply.getZ();

        resultVectorX = this.getElement(0, 0) * vectorToMultiplyX
            + this.getElement(0, 1) * vectorToMultiplyY
            + this.getElement(0, 2) * vectorToMultiplyZ;
        resultVectorY = this.getElement(1, 0) * vectorToMultiplyX
            + this.getElement(1, 1) * vectorToMultiplyY
            + this.getElement(1, 2) * vectorToMultiplyZ;
        resultVectorZ = this.getElement(2, 0) * vectorToMultiplyX
            + this.getElement(2, 1) * vectorToMultiplyY
            + this.getElement(2, 2) * vectorToMultiplyZ;

        return new Vector(resultVectorX, resultVectorY, resultVectorZ);
    };

    Matrix.prototype.setTransform = function (pContext) {
        //of form (a, b, c, d, e, f) where
        //a = 0,0; b = 1,0
        //c = 0,1; d = 1,1
        //e = 0,2; f = 1,2
        pContext.setTransform(this.getElement(0, 0), this.getElement(1, 0),
            this.getElement(0, 1), this.getElement(1, 1),
            this.getElement(0, 2), this.getElement(1, 2));
    };

    Matrix.prototype.transform = function (pContext) {
        //of form (a, b, c, d, e, f) where
        //a = 0,0; b = 1,0
        //c = 0,1; d = 1,1
        //e = 0,2; f = 1,2
        pContext.transform(this.getElement(0, 0), this.getElement(1, 0),
            this.getElement(0, 1), this.getElement(1, 1),
            this.getElement(0, 2), this.getElement(1, 2));
    };

    return Matrix;
}());