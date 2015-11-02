import MorphReplace from './MorphReplace';
import MorphTransitionResize from './MorphTransitionResize';

export default
class MorphReplaceResize extends MorphReplace {
    constructor(props) {
        super(props);
        this.transitionElement = MorphTransitionResize;
    }
}
