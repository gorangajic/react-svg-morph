
import {
    curvePathBBox,
    path2curve,
    path2string,
} from './svglite';

import {
    styleToNorm,
    styleNormToString,
    curveCalc,
    styleNormCalc,
    transCalc,
    trans2string,
} from './helpers';

export function normalizePaths(fromPaths, toPaths, _options) {
    var options = _options || {};
    var max = Math.max(fromPaths.length, toPaths.length);
    var toBB, i;

    for ( i = 0; i < max; i++ ) {
        if (!fromPaths[i]) {
            if (!!toPaths[i]) {
                toBB = curvePathBBox(path2curve(toPaths[i].path));
                fromPaths.push({
                    path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, toBB.cx, toBB.cy],
                    },
                });
            } else {
                fromPaths.push({
                    path: 'M0,0l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, 0, 0],
                    },
                });
            }
        }

        if (!toPaths[i]) {
            if (!!fromPaths[i]) {
                toBB = curvePathBBox(path2curve(fromPaths[i].path));
                toPaths.push({
                    path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, toBB.cx, toBB.cy],
                    },
                });
            } else {
                toPaths.push({
                    path: 'M0,0l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, 0, 0],
                    },
                });
            }
        }

    }


    for ( i = 0; i < max; i++ ) {
        let fromIconItem = fromPaths[i];
        let toIconItem = toPaths[i];

        // Calculate from/to curve data and set to fromIcon/toIcon
        let curves = path2curve(fromPaths[i].path, toPaths[i].path);
        fromIconItem.curve = curves[0];
        toIconItem.curve = curves[1];
        // Normalize from/to attrs
        let attrsNorm = styleToNorm(fromPaths[i].attrs, toPaths[i].attrs);
        fromIconItem.attrsNorm = attrsNorm[0];
        toIconItem.attrsNorm = attrsNorm[1];
        fromIconItem.attrs = styleNormToString(fromIconItem.attrsNorm);
        toIconItem.attrs = styleNormToString(toIconItem.attrsNorm);

        // Normalize from/to style
        let styleNorm = styleToNorm(fromPaths[i].style, toPaths[i].style);
        fromIconItem.styleNorm = styleNorm[0];
        toIconItem.styleNorm = styleNorm[1];
        fromIconItem.style = styleNormToString(fromIconItem.styleNorm);
        toIconItem.style = styleNormToString(toIconItem.styleNorm);

        // Calculate from/to transform
        toBB = curvePathBBox(toIconItem.curve);
        toIconItem.trans = {
            rotate: [0, toBB.cx, toBB.cy],
        };
        // TODO rotation accept
        let rotation = options.rotation, degAdd;
        if ( rotation === 'random' ) {
            rotation = Math.random() < 0.5 ? 'counterclock' : 'clock';
        }
        switch (rotation) {
        case 'none':
            if ( !!fromIconItem.trans.rotate ) {
                toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0];
            }
            break;
        case 'counterclock':
            if ( !!fromIconItem.trans.rotate ) {
                toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] - 360;
                degAdd = -fromIconItem.trans.rotate[0] % 360;
                toIconItem.trans.rotate[0] += (degAdd < 180 ? degAdd : degAdd - 360);
            } else {
                toIconItem.trans.rotate[0] = -360;
            }
            break;
        default: // Clockwise
            if (!!fromIconItem.trans.rotate) {
                toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] + 360;
                degAdd = fromIconItem.trans.rotate[0] % 360;
                toIconItem.trans.rotate[0] += (degAdd < 180 ? -degAdd : 360 - degAdd);
            } else {
                toIconItem.trans.rotate[0] = 360;
            }
            break;
        }
    }

    return {
        to: toPaths,
        from: fromPaths,
    };
}


export function getProgress(fromPaths, toPaths, progress) {
    // TODO easing
    // progress=easings[this._easing](progress);
    var i = 0;
    var newPaths = [];
    var len = fromPaths.length;
    // Update path/attrs/transform
    for ( ; i < len; i++ ) {
        newPaths[i] = {};
        newPaths[i].curve = curveCalc(fromPaths[i].curve, toPaths[i].curve, progress);
        newPaths[i].path = path2string(newPaths[i].curve);

        newPaths[i].attrsNorm = styleNormCalc(fromPaths[i].attrsNorm, toPaths[i].attrsNorm, progress);
        newPaths[i].attrs = styleNormToString(newPaths[i].attrsNorm);

        newPaths[i].styleNorm = styleNormCalc(fromPaths[i].styleNorm, toPaths[i].styleNorm, progress);
        newPaths[i].style = styleNormToString(newPaths[i].styleNorm);

        newPaths[i].trans = transCalc(fromPaths[i].trans, toPaths[i].trans, progress);
        newPaths[i].transStr = trans2string(newPaths[i].trans);
    }

    return newPaths;
}
