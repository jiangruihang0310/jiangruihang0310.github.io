export default function debounce(fn, delay) {
    let timer = null;

    return function () {
        if (timer) return;
        fn();
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
        }, delay);
    };
}
