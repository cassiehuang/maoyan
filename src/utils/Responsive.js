let RS;
class Responsive {
  size = null;
  width =  null;
  height = null;
  reWidthListeners = null;
  reSizeListeners = null;
  constructor() {
    this.reWidthListeners = [];
    this.reSizeListeners = [];
    if (window) {
      window.addEventListener('resize', () => {
        this.reWidth();
      })
    }
  }

  reWidth() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    let s = this.checkSize();
    this.reWidthListeners.forEach((fn) => {fn(s)});
    if (this.size === s) return;
    this.size = s;
    this.reSizeListeners.forEach((fn) => {fn(s)});
  }
  checkSize() {
    let width = this.width;
    if (width < '768') return 'sm';
    if (width < '992') return 'md';
    if (width < '1260') return 'lg';
    return 'xl';
  }

  addReWidthListeners(fn) {
    this.reWidthListeners.push(fn);
  }

  addReSizeListeners(fn) {
    this.reSizeListeners.push(fn);
  }

  removeReWidthListeners(fn) {
    this.reWidthListeners.forEach((value, idx) => {
      if (fn === value) {
        this.reWidthListeners.slice(idx, idx+1);
      }
    })
  } 
}

export function getResp() {
  if (!RS) RS = new Responsive();
  return RS.size;
}

export function addReWidth(fn) {
  if (!RS) RS = new Responsive();
  RS.addReWidthListeners(fn);
}

export function addResize(fn) {
  if (!RS) RS = new Responsive();
  RS.addReSizeListeners(fn);
  RS.reWidth();
}