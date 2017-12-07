export default {
    mapFunction: function (val) {
        let a = 9.5932;
        let b = 0.273;

        return Math.log(val/a)/b;
    },

    remapData: function(data) {
        var newData = [];
        for(var i = 0; i < data.length; i++) {
            var idat = data[i];
            if(idat.length == undefined)
                newData.push(this.mapFunction(idat)*100)
            else if(idat.length == 1)
                newData.push([this.mapFunction(idat[0])*100]);
            else
                newData.push([this.mapFunction(idat[0])*100, this.mapFunction(idat[1])*100]);

        }
        return newData;
    }
}