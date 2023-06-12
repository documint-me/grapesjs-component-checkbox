export const TYPES = {
  label: "dm-label",
  toggle: "dm-toggle",
  checkbox: "dm-checkbox",
  icon: "dm-toggle-icon",
  holder: "dm-toggle-holder",
};

export const BLOCKS = {
  checkbox: "dm-checkbox",
};

export const ACTIONS = {
  addComponent: "add-component",
  removeComponent: "remove-component",
  cloneComponent: "clone-component",
  moveComponent: "move-component",
  selected: "selected",
};

export const RESIZER_NONE = {
  tl: false,
  tc: false,
  tr: false,
  cr: false,
  br: false,
  bc: false,
  bl: false,
  cl: false,
};
export const RESIZER_ALL = {
  tl: true,
  tc: true,
  tr: true,
  cr: true,
  br: true,
  bc: true,
  bl: true,
  cl: true,
};

export default { TYPES, ACTIONS, RESIZER_NONE, RESIZER_ALL };

export const RESIZABLE_PROPS = {
  startX: "startX",
  prevX: "prevX",
  prevDirection: "prevDirection",
  prevDeltaX: "prevDeltaX",
};
