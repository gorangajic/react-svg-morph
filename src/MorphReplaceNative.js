import MorphReplace from './MorphReplace';
import MorphTransitionNative from './MorphTransitionNative';

export default
class MorphReplaceNative extends MorphReplace {
    constructor(props) {
        super(props);
        this.transitionElement = MorphTransitionNative;
    }
}
