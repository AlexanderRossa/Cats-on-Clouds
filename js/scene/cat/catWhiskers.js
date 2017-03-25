/*global Matrix, Vector*/

var CatWhiskers = (function () {
    function CatWhiskers(pColour) {
        this.setColour(pColour);
    }
    //getters and setters
    CatWhiskers.prototype.getColour = function () {
        return this.mColour;
    };
    CatWhiskers.prototype.setColour = function (pColour) {
        this.mColour = pColour;
    };

    CatWhiskers.prototype.draw = function (pContext) {
        pContext.beginPath();
        pContext.strokeStyle = this.mColour;
        pContext.lineWidth = 0.5;
        pContext.moveTo(0, 0);
        pContext.lineTo(10, 0);
        pContext.moveTo(0, 1);
        pContext.lineTo(8, 3);
        pContext.moveTo(0, -1);
        pContext.lineTo(8, -3);
        pContext.stroke();
    };

    return CatWhiskers;
}());