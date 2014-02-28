Hello
=====


----

## Directories

### resources `/res`

#### data `/res/data`

#### helpers `/res/helpers`

#### pages `/res/pages`

#### partials `/res/partials`

#### imports `/res/import`

#### styles `/res/style`

#### sprites `/res/sprites`

#### modules `/res/modules`

Javascript modules structured into directories, or standalone files.
Every directory will behave as a concatenation list.
Files will be merged in the order they appear.
The merged file will be named after their parent directory.
The default output folder is the script root (`/src/script`).
To define concatenation order, or change the output dir,
make an entry with the module's name in the `modules.json`.
You can also set an execution context for the merged script.
In this case, a wrapper function will be placed around all the scripts,
and it will be called with the variable you provided in the `modules.json`

    res/
      modules/
        modules.json
        example/
          end.js
          header.js
          script1.js
          script2.js
        example2/
          script1.js
          script2.js
        example3/
          script1.js
          script2.js

In modules.json:

    {
      // concat script in this order
      "example": [
        "header", "script1", "script2", "end"
      ],
      // change the target dir, and exclude some scripts
      "example2": {
        "target": "some/other/dir/",
        "concat":[
          "script1"
        ]
      },
      // set an execution context for scripts
      "example2": {
        "context": "myNamespace"
      }
    }

If a context is provided, the merged script will look something like this:

```js

!function(){

  /* contents of concatenated scripts in order they are defined */

}.call(myNamespace);

```


### www root `/src`

#### media `/src/media`

##### audio files `/src/media/audio`

##### image files `/src/media/image`

##### video files `/src/media/video`

#### scripts `/src/script`

##### libraries `/src/script/library`

##### plugins `/src/script/plugin`

##### polyfills`/src/script/polyfill`

#### static assets `/src/static`

##### css files `/src/static/css`

##### fonts `/src/static/font`

##### font/svg/sprite icons `/src/static/icon`

----

# Tasks


## `grunt`

The default grunt task.
Starts a server and a file watcher to monitor changes.
Changes made to any file resource will live reload the browser with affected files.

## `grunt make:<what>`

Generate a type of resource.

Possible values:

  - page
  - style
  - partial
  - helper
  - data
  - import
  - sprite

## `grunt build`

Compile project files into the build destination specified in the manifest.
This will optimize images, concatenate files and rewrite resource urls where needed.

## `grunt build:clean`

Like build, but cleans the build directory first.

## `grunt public`

Serve the build directory on another server.
This does not have live reloading.

