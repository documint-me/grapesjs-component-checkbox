export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-icon",
    selectedClassName: "selected",
    defaultValues: {
      yes: "",
      no: "",
    },
    optionsTrue: [],
    optionsFalse: [],
    labelTrue: "if true",
    labelFalse: "if false",
    ...opts,
  };

  const { name, defaultValues } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-sm-field gjs-sm-composite">
        <span id="gjs-sm-input-holder">
          <div class="gjs-sm-properties">
            <div class="gjs-sm-property gjs-sm-number gjs-sm-integer gjs-sm-property__icon-true gjs-sm-property--full">
              <div class="gjs-sm-label" data-sm-label="">
                <span class="gjs-sm-icon " title="">if true</span>
              </div>
              <div class="gjs-fields" data-sm-fields="">
                <div class="gjs-field gjs-select">
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
              </div>
            </div>
            <div class="gjs-sm-property gjs-sm-number gjs-sm-integer gjs-sm-property__icon-false gjs-sm-property--full">
              <div class="gjs-sm-label" data-sm-label="">
                <span class="gjs-sm-icon " title="">if false</span>
              </div>
              <div class="gjs-fields" data-sm-fields="">
                <div class="gjs-field gjs-select">
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
              </div>
            </div>
          </div>
        </span>
      </div>`;

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
