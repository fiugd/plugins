## fiug-plugins

fiug supports file formats and language source files through the use of plugins.  These are mainly used from terminal using the `preview` command.


### templates

html templates are the most basic form of plugins.  These are named according to file extension: `{{file extension}}.html`.
They are placed in a folder name `.templates` at the root of repository.  They are installed by cloning the repository with fiug.
After install, files with the corresponding extension will be injected into the template and will be served by service worker at `{{file url}}/::preview::/`

One exception to this, files with `json` extension will be served by template if the json contents described an object with a property `type` equal to `{{file extension}}`.
`d3-graph.html` is an example of this.

### examples

example templates can be found in the `.templates` folder at the root of this repository.
Examples of files which use these templates can be found in the following folders at the root of this repository: `binary`, `documents`, `graphics`, and `languages`.


### plugins \[WIP\]

> plugins will work similar to templates, but will offer tighter integration with the service worker and file change life-cycle.  More will follow as becomes available.

### store

> once plugins are fleshed out, a store fascade will be created to host plugins.  This store should serve as the means for fiug to determine if an unrecognized file can be supported.  Support could include syntax highlighting, file icons, templates, and/or plugins.

### tutorial \[WIP\]

> insert video showing how to use templates here

### todo

- [ ] dependencies.json
	- load these to browser cache?
- [ ] broken templates:
	- go
	- csharp
- [ ] slightly broken templates:
	- scm - problem with template default, but file previews fine
	- ink - problem with template default, but file previews fine
	- forth - problem with template default, but file previews fine
