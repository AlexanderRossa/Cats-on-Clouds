/*global Matrix, Vector*/

var CatNose = (function () {
    function CatNose(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    CatNose.prototype.getColour = function () {
        return this.mColour;
    };
    CatNose.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    CatNose.prototype.draw = function (pContext) {
        var i, radius, angle, sides, x, y;
        sides = 3;
        radius = 2;
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

    return CatNose;
}());