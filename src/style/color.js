export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-label-text",
    selectedClassName: "selected",
    defaultValues: {
      text: "I'm a Checkbox",
    },
    ...opts,
  };

  const { name, defaultValues } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-field"></div>`;

      editor.on("component:selected", () => this.updateUI());

      return el;
    },

    // Propagate UI changes to target
    emit({ updateStyle }, { css, partial }) {},

    // Update UI when target is changed
    updateUI() {},

    // Clean memory if necessary
    destroy() {},
  });
}
