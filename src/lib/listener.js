export const addOnResize = (fuc) => {
  let resize;
  if (window.onresize) {
    resize = window.onresize;
  }
  window.onresize = () => {
    if (resize) {
      resize();
    }
    fuc();
  };
};
