# Contributing to Try

## Style Guides

### Code Format & Style

Code is formatted according to the [JavaScript Standard Style](https://standardjs.com)
with the added requirement of [dangling commas](https://eslint.org/docs/rules/comma-dangle).

The format is automatically enforced/applied by leveraging ESLint and PrettierX
via [prettier-standard](https://github.com/sheerun/prettier-standard). This
means that for the most part, you can rely on automation to properly format your
code.

### Commit Messages

Commit messages are constructed according to the following format (consistent
with [ESLint](https://eslint.org/docs/developer-guide/contributing/pull-requests#step2)
style commit messages):

```
<!type>: <!title> <?ticket_reference>

<?description>
```

#### Short Example

```
New: Added a new amazing feature that everyone will love!
```

#### Long Example

```
Fix: Reworked a problematic regex used when parsing conifgs. (fixes: #1337)

The previous regular expression was a nightmare. It's been rewritten to use
proper capture groups and lookaheads to ensure proper parsing of config files.
```

#### `type`

_Required_

The type must be one of the following (case sensitive):

- `Fix` - For a bug fix.
- `Update` - For a backwards-compatible enhancement.
- `New` - Implemented a new feature.
- `Breaking` - For a backwards-incompatible enhancement or feature.
- `Docs` - Changes to documentation only.
- `Build` - Changes to build process only.
- `Upgrade` - For a dependency upgrade.
- `Chore` - For refactoring, adding tests, etc. (anything that isn't
  user-facing).
- `Release` - Reserved automated commits made for a release. Does not trigger a
  build.

#### `title`

_Required_

The title is a brief description of the change which will appear in the
CHANGELOG and release notes.

#### `issue_reference`

_Optional_

`(<!keyword> #<!issue_number>)`

The issue reference should be included when the changes can be associated with
an issue.

If the change completely fixes an issue use the `fixes` keyword,
otherwise use the `refs` keyword.

#### `description`

_Optional_

The description can be multiple lines and should contain any details not easily
captured in the title.
