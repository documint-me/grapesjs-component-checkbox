export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-box-type",
    selectedClassName: "selected",
    defaultValues: {
      type: "checkbox",
      yes: "",
      no: "",
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
      el.innerHTML = `<div class="gjs-field gjs-select">
        <span id="gjs-sm-input-holder">
          <select>
            <option value="checkbox">checkbox</option>
            <option value="xbox">x box</option>
            <option value="radio">radio</option>
            <option value="custom">custom</option>
          </select>
        </span>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
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
