var svgpath = require("svgpath");

export default function scalePath(path, base, _width, _height) {
    var x = 0;
    var y = 0;
    var scale = 1;
    var width = parseInt(_width, 10);
    var height = parseInt(_height, 10);
    if (width >= height) {
        scale = base / width;
        y = (width - height) / 2;
    } else {
        scale = base / height;
        x = (height - width) / 2;
    }
    return svgpath(path).translate(x, y).scale(scale).abs()
                .round(1) // Here the real rounding happens
                .rel()
                .round(1) // Fix js floating point error/garbage after rel()
                .toString();
}
