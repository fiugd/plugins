## fiug-plugins

fiug supports file formats and language source files through the use of plugins.  These are mainly used from terminal using the `preview` command.


### templates

html templates are the most basic form of plugins.  These are named according to file extension: `{{file extension}}.html`.
They are placed in a folder name `.templates` at the root of repository.  They are installed by cloning the repository with fiug.
After install, files with the corresponding extension will be injected into the template and will be served by service worker at `{{file url}}/::preview::/`

One exception to this, files with `json` extension will be served by template if the json contents described an object with a property `type` equal to `{{file extension}}`.
`d3-graph.html` is an example of this.


### plugins \[WIP\]

plugins will work similar to templates, but will offer tighter integration with the service worker and file change life-cycle.  More will follow as becomes available.


### tutorial \[WIP\]

> insert video showing how to use templates here
