# GrapesJS Component Checkbox

Checkbox element

## Summary

* Plugin
  * Name: `grapesjs-component-checkbox`
  * Options:
      * `checked` Is checked by default =  true



## Download

* `npm i @documinnt/grapesjs-component-checkbox`



## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="dist/grapesjs-component-checkbox.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['grapesjs-component-checkbox'],
      pluginsOpts: {
        'grapesjs-component-checkbox': {
            default_css: true,
            default_components: true,
          }
      }
  });
</script>
```



## Development

Clone the repository

```sh
$ git clone {ADD URL}
$ cd grapesjs-component-checkbox
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```


## TODO
- When the last column is removed delete the parent row
- Fix bug when dragging column from one row to another
