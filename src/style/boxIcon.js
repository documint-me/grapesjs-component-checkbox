export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-icon",
    selectedClassName: "selected",
    defaultValues: {
      yes: "check",
      no: "check",
    },
    optionsTrue: [
      {
        value: "check",
      },
      {
        value: "dot",
      },
      {
        value: "cross",
      },
      // {
      //   value: "custom",
      // },
    ],
    optionsFalse: [
      {
        value: "check",
      },
      {
        value: "dot",
      },
      {
        value: "cross",
      },
      // {
      //   value: "custom",
      // },
    ],
    labelTrue: "if true",
    labelFalse: "if false",
    ...opts,
  };

  const {
    name,
    defaultValues,
    labelFalse,
    labelTrue,
    optionsTrue,
    optionsFalse,
  } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-sm-field gjs-sm-composite">
        <span id="gjs-sm-input-holder">
          <div class="gjs-sm-properties">
            <div class="gjs-sm-property gjs-sm-property__icon-true gjs-sm-property--full">
              <div class="gjs-sm-label" data-sm-label="">
                <span class="gjs-sm-icon " title="">${labelTrue}</span>
              </div>
              <div class="gjs-fields" data-sm-fields="">
                <div class="gjs-field gjs-select">
                  <span id="checkbox-icon-true">
                    <select>
                    ${optionsTrue
                      .map(
                        (o) =>
                          `<option value="${o.value}" ${
                            defaultValues.yes === o.value ? "selected" : ""
                          }>${o.label || o.value}</option>`
                      )
                      .join("")}
                    </select>
                  </span>
                  <div class="gjs-sel-arrow">
                    <div class="gjs-d-s-arrow"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="gjs-sm-property gjs-sm-property__icon-false gjs-sm-property--full">
              <div class="gjs-sm-label" data-sm-label="">
                <span class="gjs-sm-icon " title="">${labelFalse}</span>
              </div>
              <div class="gjs-fields" data-sm-fields="">
                <div class="gjs-field gjs-select">
                  <span id="checkbox-icon-false">
                    <select>
                    ${optionsFalse
                      .map(
                        (o) =>
                          `<option value="${o.value}" ${
                            defaultValues.no === o.value ? "selected" : ""
                          }>${o.label || o.value}</option>`
                      )
                      .join("")}
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
