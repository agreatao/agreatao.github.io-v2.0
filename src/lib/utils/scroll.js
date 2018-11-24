let timeout = null;

let easing = (x) => {
    if (x < 0.5) {
        return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
};

let animateScroll = (easing, options, target) => {
    options.progress = new Date().getTime() - options.start;
    options.percent = options.progress >= options.duration ? 1 : easing(options.progress / options.duration);
    options.currentPositionY = options.startPositionY + Math.ceil(options.deltaTop * options.percent);
    target.scrollTo(0, options.currentPositionY);
    if(options.percent < 1) {
        clearTimeout(timeout);
        let easedAnimate = animateScroll.bind(null, easing, options, target);
        timeout = setTimeout(easedAnimate, 1000 / 60);
        return;
    } else {
        clearTimeout(timeout);
    }
};

let currentY = (target) => {
    return target.scrollY || target.scrollTop;
};

let scroll = (options, target) => {
    options = {
        currentPositionY: 0,
        startPositionY: 0,
        targetPositionY: 0,
        progress: 0,
        duration: 0,
        start: null,
        deltaTop: null,
        percent: null,   
        ...options
    };
    options.startPositionY = currentY(target);
    options.deltaTop = Math.round(options.targetPositionY - options.startPositionY);
    options.duration = 0;
    options.start = new Date().getTime();

    options.duration = 800;
    let easedAnimate = animateScroll.bind(null, easing, options, target);
    clearTimeout(timeout);
    timeout = setTimeout(easedAnimate, 1000 / 60);
};

export default scroll;