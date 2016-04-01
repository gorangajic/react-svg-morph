# React svg morph

> morph your svg components one into another

<img src="https://rawgit.com/gorangajic/react-svg-morph/master/example.gif" width="60" alt="React Icons">


# Instalation

```
npm install react-svg-morph --save
```

# Usage example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MorphReplace } from 'react-svg-morph';

class Checked extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        );
    }
}

class CheckBox extends React.Component {
    render() {
        return (
            <svg width="24" height="24" fill="#666666" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }
    toggleChecked() {
        this.setState({checked: !this.state.checked});
    }
    render() {
        return (
            <div onClick={this.toggleChecked.bind(this)}>
                <MorphReplace width={100} height={100}>
                    {this.state.checked ? <Checked key="checked" /> : <CheckBox key="checkbox" />}
                </MorphReplace>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
# Usage with react-native

`react-svg-morph` only works on ios because react native art package is [only available there](https://facebook.github.io/react-native/docs/known-issues.html). Before getting started you will need to include ReactNativeArt into your project, there is good example how to do that on this link http://browniefed.com/blog/2015/05/03/getting-react-art-running-on-react-native/

Evrything else is the same only you need to include `MorphReplaceNative` and `MorphTransitionNative` from `react-svg-morph/native`. 

For now it works with normal svg tags/components like in example top.

# API

### &lt;MorphReplace /> or &lt;MorphReplaceNative />
> when children element change it will morph from one svg element into another svg element
Props:

##### `width: Number`
width of the svg element defaults to 40
##### `height: Number`
height of the svg element defaults to 40
##### `viewBox: String`
viewBox of the svg element default to `0 0 ${width} ${height}`
##### `duration: Number`
swap animation duration in ms defaults to 350 ms
##### `rotation: String`
rotation of the animation available options are `clockwise`, `counterclock`, `none` defaults to _`clockwise`_
##### `easing: function`
easing function, default easing is linear
```javascript
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var easeInCubic = function(t) {
    return t*t*t;
}
```
there is default easing functions already provided in `src/utils/easing` or `lib/utils/easing` so you can reuse them
```
import {easeInQuint} from `lib/utils/easing`
<MorphReplace easing={easeInQuint}>
    {this.state.checked ? <Checked /> : <CheckBox />}
</MorphReplace>

```
##### `children: React.Element`
only element you want to display need to be passed as children, when you replace that element with new one animation will be triggered. It's important to provide `key` prop to child element so `MorphReplace` know when child is changed.

> every other props passed to the element will be passed to svg, so you can also pass normal svg attributes like `fill`,`opaticy`,`styles`...

##### usage example

```javascript
import {MorphReplace} from 'react-svg-morph';

render() {
    return (
        <MorphReplace width={100} height={100}>
            {this.state.checked ? <Checked key={'checked'} /> : <CheckBox key={'checkbox'}/>}
        </MorphReplace>
    )
}
```
### &lt;MorphReplaceResize />
> same as `MorphReplace` only you should use this when you have two svg elements that have different viewBox attributes so `MorphReplaceResize` will normalize their paths before passing it to `MorphReplace`

### &lt;MorphTransition /> or &lt;MorphTransitionNative />

##### `width: Number`
width of the svg element defaults to 40
##### `height: Number`
height of the svg element defaults to 40
##### `viewBox: String`
viewBox of the svg element default to `0 0 ${width} ${height}`
> viewBox is ignored in react-native

##### `progress: Number`
current progress of the svg animation, default to 0
##### `rotation: String`
rotation of the animation available options are `clockwise`, `counterclock`, `none` defaults to _`clockwise`_
> every other props passed to the element will be passed to svg, so you can passs normal svg attributes like `fill`,`opaticy`,`styles`...

##### `children: Object{from: React.Element, to: React.Element}`
accept two React elements that need to have svg element inside, it will morph one into another based on progress passed

##### other props
All other props will be passed to the svg element

##### usage example
```
import {MorphTransition} from 'react-svg-morph';

render() {
    return (
        <MorphTransition progres={50} width={100} height={100}>
            {from: <LoveSvg />, to: <LogoSvg />}
        </MorphReplace>
    )
}
```
> it can be also used with `react-motion`


## Related

- [react-icons](https://github.com/gorangajic/react-icons/) it work with react-icons out of the box because they are all normalized to the same size

## License

MIT Copyright (c) Goran Gajic 2015

## Credits

> svg convert algoritam is takan from https://github.com/alexk111/SVG-Morpheus and addapted
