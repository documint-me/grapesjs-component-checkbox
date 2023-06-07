export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-text-position",
    selectedClassName: "selected",
    defaultValues: {
      position: "right",
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
      el.innerHTML = `<div class="gjs-field gjs-field-radio">
        <div class="gjs-radio-items">
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio gjs-sm-radio--" id="--left-c533" name="--c533" value="">
            <label class="gjs-radio-item-label" for="--left-c533">Left</label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio gjs-sm-radio--" id="--right-c533" name="--c533" value="right" checked="">
            <label class="gjs-radio-item-label" for="--right-c533">Right</label>
          </div>
        </div>
      </div>
      `;

      this.em.on("component:selected", () => this.updateUI());

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
