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

