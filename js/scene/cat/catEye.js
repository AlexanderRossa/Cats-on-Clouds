/*global Matrix, Vector*/

var CatEye = (function () {
    function CatEye(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    CatEye.prototype.getColour = function () {
        return this.mColour;
    };
    CatEye.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    CatEye.prototype.draw = function (pContext) {
        var i, radius, angle, sides, x, y;
        sides = 5;
        radius = 1;
        angle = Math.PI * 2 / sides;

        pContext.beginPath();
        pContext.fillStyle = this.mColour;

        for (i = 0; i < sides; i += 1) {
            x = radius * Math.cos(angle * i);
            y = radius * Math.sin(angle * i);
            pContext.lineTo(x, y);
        }

        pContext.closePath();
        pContext.fill();
    };

    return CatEye;
}());