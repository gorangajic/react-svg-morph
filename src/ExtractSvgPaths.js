import * as PathConverter from './PathConverter';

export function readAttrs(node) {
    var attrs = {};
    var i = 0;
    var len = node.attributes.length;
    for ( ; i < len; i++ ) {
        let att = node.attributes[i];
        let name = att.name.toLowerCase();
        if (att.specified) {
            switch (name) {
            case 'fill':
            case 'fill-opacity':
            case 'opacity':
            case 'stroke':
            case 'stroke-opacity':
            case 'stroke-width':
                attrs[name] = att.value;
            }
        }
    }
    return attrs;
}
export function readStyles(node) {
    var style = {};
    var i = 0;
    var len = node.style.length;
    for ( ; i < len; i++ ) {
        let styleName = node.style[i];
        switch (styleName) {
        case 'fill':
        case 'fill-opacity':
        case 'opacity':
        case 'stroke':
        case 'stroke-opacity':
        case 'stroke-width':
            style[styleName] = node.style[styleName];
        }
    }
    return style;
}

export function getAllChildren(node) {
    var i = 0;
    var els = [node];
    var len = node.childNodes.length;
    for ( ; i < len; i++) {
        let el = node.childNodes[i];
        els.push(el);
        if (el.childNodes.length > 0) {
            els = els.concat(getAllChildren(el));
        }
    }

    return els;
}

export function getPathAttributes(node, defaultItem) {
    var item = {
        trans: {
            rotate: [0, 0, 0],
        },
        transStr: 'rotate(0, 0, 0)',
        ...defaultItem,
    };

    var nodeName = node.nodeName.toUpperCase();
    var allAttrs = {};
    var i = 0;
    var len = node.attributes.length;
    for ( ; i < len; i++ ) {
        let att = node.attributes[i];
        let name = att.name.toLowerCase();
        allAttrs[name] = att.value;
    }
    switch (nodeName) {
    case 'PATH':
        item.path = allAttrs.d;
        break;
    case 'CIRCLE':
        item.path = PathConverter.fromCircle(allAttrs);
        break;
    case 'ELLIPSE':
        item.path = PathConverter.fromEllipse(allAttrs);
        break;
    case 'RECT':
        item.path = PathConverter.fromRect(allAttrs);
        break;
    case 'POLYGON':
        item.path = PathConverter.fromPolygon(allAttrs);
        break;
    case 'LINE':
        item.path = PathConverter.fromLine(allAttrs);
        break;
    default:
        return false;
    }
    let attrs = readAttrs(node);
    let style = readStyles(node);
    item.attrs = {...item.attrs, ...attrs};
    item.style = {...item.style, ...style};
    return item;
}

export function getPaths(nodes, defaultItem) {
    var paths = [];
    nodes.forEach((node) => {
        var path = getPathAttributes(node, defaultItem);
        if (path) {
            paths.push(path);
        }
    });
    return paths;
}

export default function extractSvgPaths(svg) {
    var children = getAllChildren(svg);
    var defaultItem = {
        attrs: {},
        styles: {},
    };
    children.forEach((child) => {
        if (child.nodeName.toUpperCase() !== 'SVG') {
            return false;
        }
        defaultItem = {
            attrs: readAttrs(child),
            styles: readStyles(child),
        };
    });

    return getPaths(children, defaultItem);
}
