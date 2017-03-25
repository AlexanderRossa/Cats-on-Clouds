/*global Matrix, Vector*/

var CatFoot = (function () {
    function CatFoot(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    CatFoot.prototype.getColour = function () {
        return this.mColour;
    };
    CatFoot.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };
    CatFoot.prototype.draw = function (pContext) {
        var i, radius, angle, sides, x, y;
        sides = 5;
        radius = 3;
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

    return CatFoot;
}());