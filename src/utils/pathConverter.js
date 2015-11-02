
export function fromPolygon(polygon) {
    var points = polygon.points;
    var p = points.split(/\s+/);
    var path = "";
    var k = 0;
    var len = p.length;
    for ( ; k < len; k++ ) {
        path += (k && "L" || "M") + p[k];
    }
    return path + 'z';
}

export function fromLine(line) {
    var { x1, y1, x2, y2 } = line;
    return 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + 'z';
}

export function fromRect(rect) {
    var {x, y, rx, ry} = rect;
    var h = rect.height;
    var w = rect.width;

    if (!rx && !ry) {
        return 'M' + x + ',' + y + 'l' + w + ',0l0,' + h + 'l-' + w + ',0z';
    }
    return 'M' + (x + rx) + ',' + y +
            'l' + (w - rx * 2) + ',0' +
            'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',' + ry +
            'l0,' + (h - ry * 2) +
            'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',' + ry +
            'l' + (rx * 2 - w) + ',0' +
            'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',-' + ry +
            'l0,' + (ry * 2 - h) +
            'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',-' + ry +
            'z';
}

export function fromPath(path) {
    return path.d;
}

export function fromCircle(circle) {
    var { cx, cy, r } = circle;
    return 'M' + (cx - r) + ',' + cy + 'a' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0a' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0z';
}

export function fromEllipse(ellipse) {
    var {cx, cy, rx, ry} = ellipse;
    return 'M' + (cx - rx) + ',' + cy + 'a' + rx + ',' + ry + ' 0 1,0 ' + (rx * 2) + ',0a' + rx + ',' + ry + ' 0 1,0 -' + (rx * 2) + ',0z';
}
