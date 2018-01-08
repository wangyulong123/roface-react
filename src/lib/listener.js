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

export const addOnResize = (fuc, flag = false) => {
  let resize;
  if (window.onresize) {
    resize = window.onresize;
  }
  if (flag) {
      window.onresize = debounce(() => {
          if (resize) {
              resize();
          }
          fuc();
      }, 150);
  } else {
      window.onresize = () => {
          if (resize) {
              resize();
          }
          fuc();
      };
  }
};

const onKeyDowns = {};

export const addOnKeyDown = (fuc, tabId) => {
  if (!onKeyDowns[tabId]) {
    onKeyDowns[tabId] = fuc;
  }
  document.onkeydown = (e) => {
   Object.keys(onKeyDowns).forEach((key) => {
     onKeyDowns[key] && onKeyDowns[key](e, key);
   });
  };
};

export const removeOnKeyDown = (tabId) => {
  if (onKeyDowns[tabId]) {
    delete onKeyDowns[tabId];
  }
};

