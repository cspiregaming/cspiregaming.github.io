# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Site Is

Static single-page AngularJS 1.x application hosted on GitHub Pages at cspiregaming.github.io. The `.nojekyll` file disables Jekyll processing on GitHub Pages — Jekyll is only used locally for serving. There is no build step; the files are served as-is.

## Local Development

```bash
# Install Ruby gems (requires Ruby 3.2.0 — see .ruby-version)
bundle install

# Serve locally with live reload
./run.sh
# or directly:
bundle exec jekyll serve --incremental --livereload
```

The site is available at `http://localhost:4000` by default.

### macOS 26 (Tahoe) / Darwin 25 dependency fix

On macOS 26 beta, Ruby 3.2.0's `CXX` config is set to `false` and the CommandLineTools C++ headers directory is missing top-level headers (`iostream`, etc.). This breaks the `eventmachine` gem build.

`run.sh` handles this automatically. If running `bundle install` manually, use:
```bash
cat > /tmp/make-cxx-wrapper.sh << 'WRAPPER'
#!/bin/bash
SDK_CXX_INC="$(xcrun --show-sdk-path 2>/dev/null)/usr/include/c++/v1"
exec /usr/bin/make CXX="clang++ -I${SDK_CXX_INC}" "$@"
WRAPPER
chmod +x /tmp/make-cxx-wrapper.sh
MAKE=/tmp/make-cxx-wrapper.sh bundle install
```

## Architecture

All meaningful logic lives in two files:

- **`scripts/controllers/main.js`** — the only AngularJS controller. Officer list, social URLs, and event list are all defined here as `$scope` properties. To add/update officers or links, edit this file.
- **`index.html`** — the entire page structure. AngularJS directives (`ng-repeat`, `ng-bind-html`) render officer cards from `$scope.officers`. The navbar section is fully commented out.

Supporting files:
- `scripts/app.js` — AngularJS module/route config (rarely needs changes)
- `views/main.html`, `views/about.html` — AngularJS route templates (currently the main route just renders `index.html` content)
- `bower_components/` — AngularJS 1.4.x and related libs managed by Bower (checked into the repo, do not run `bower install` without Bower installed)
- `css/` — Bootstrap, gaia theme, and `main.css` for custom styles
- `img/faces/` — Officer headshot images referenced by filename in `main.js`
- `test/` — Stale Yeoman-generated Karma/Jasmine scaffolding. Tests reference `awesomeThings` which no longer exists, and `karma.conf.js` points to `app/scripts/` instead of the actual `scripts/` path. Do not attempt to run the test suite.

## Common Tasks

**Add or update an officer:** Edit the `$scope.officers` array in `scripts/controllers/main.js`. Each entry needs `name` (HTML allowed), `image` (filename under `img/faces/`), and `about` (HTML allowed). Officers are shuffled randomly on each page load.

**Update social links:** Edit `$scope.discordUrl`, `$scope.twitchUrl`, etc. at the top of `scripts/controllers/main.js`.

**Add an event:** Populate the `$scope.events` array in `main.js` following the commented-out example template.
