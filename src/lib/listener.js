const debounce = (fn, delay) => {
    let timer = null;
    return () => {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

export const addOnResize = (fuc) => {
  let resize;
  if (window.onresize) {
    resize = window.onresize;
  }
  window.onresize = debounce(() => {
      if (resize) {
          resize();
      }
      fuc();
  }, 1000);
};
