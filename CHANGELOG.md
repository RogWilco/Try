# [2.1.0](https://github.com/rogwilco/Try/compare/v2.0.0...v2.1.0) (2021-02-04)


### Build

* Added extra command following CHANGELOG updates to ensure the document is formatted using prettier-standard. ([2d93600](https://github.com/rogwilco/Try/commit/2d93600b66e930bb586619d4d686080f51ae312b))
* Added prettier-standard for linting and formatting. ([5545114](https://github.com/rogwilco/Try/commit/5545114b99515dcf24610d85adefd67873b32c91))
* Disabling npm publish for this release. ([02b867a](https://github.com/rogwilco/Try/commit/02b867aaacf0d9c6d01d2be674e6eb4285c9ffb2))
* Fixed incorrectly named secret reference. ([992e7f8](https://github.com/rogwilco/Try/commit/992e7f8941d2e9cbb6ce7138fa8d5553b81bc54c))
* Set up automatic publishing of generated TypeDoc docs to GitHub Pages. ([82ea07e](https://github.com/rogwilco/Try/commit/82ea07e333d3fe7e9da9af0e4a6e394f98b4eaf4))
* Updated CI config to accommodate changes in crazy-max/ghaction-import-gpg. ([09db0b0](https://github.com/rogwilco/Try/commit/09db0b061c1c6e5fcc9468a6106d1826f38ff853))
* Upgraded outdated GitHub actions for publish job. ([21d863c](https://github.com/rogwilco/Try/commit/21d863c6fb4bd5e8f2f8cd1ce6d141da429f2801))
* Upgraded outdated GitHub actions. ([4213305](https://github.com/rogwilco/Try/commit/42133058c4ef39cb88c3be4ae48bea829714f14a))

### Chore

* Applied formatting to existing files. ([0c4932f](https://github.com/rogwilco/Try/commit/0c4932f4c818a111031913a2f34195dd97ca165a))
* Updated supported node version to >=10. ([c1eb41f](https://github.com/rogwilco/Try/commit/c1eb41f5e347df7ee0f8b01234904f001e50c923))

### Docs

* Added CONTRIBUTING with instructions for formatting commit messages. ([1f15034](https://github.com/rogwilco/Try/commit/1f15034e635db6113d8ae25ff1b71d3587c29237))
* Added link to TypeDoc generated docs. ([f37f7a5](https://github.com/rogwilco/Try/commit/f37f7a504a80c17b7bc22cd270bf3ca4fe2df7e1))
* Removed some wording that only applied to ESLint. ([5f808d4](https://github.com/rogwilco/Try/commit/5f808d41df88b59884063f14aca020d838fd3477))
* Updated CONTRIBUTING to include code style/format information. ([8b8efd4](https://github.com/rogwilco/Try/commit/8b8efd4f59f11b8257314d86c5df4bf760815367))

### New

* Added Rethrow() utility function for simplifying catch blocks that simply rethrow another type of throwable. ([3557959](https://github.com/rogwilco/Try/commit/3557959278fcc00394e78f22831228a91e412086))

### Upgrade

* Updated dependency @qiwi/semantic-release-gh-pages-plugin from 4.0.3 => 5.0.4 ([b53d0d0](https://github.com/rogwilco/Try/commit/b53d0d07f56e7bcccb0306d22558d04a6547ebc9))

# [2.0.0](https://github.com/rogwilco/Try/compare/v1.0.0...v2.0.0) (2020-09-01)

### Breaking

- Renamed Throwable to ThrowableType to better reflect its purpose. ([3389b54](https://github.com/rogwilco/Try/commit/3389b549519c67680221e1c44aeaa64e1d70ba3e))

### Build

- Ensured TypeScript is actually transpiled during the publish job. ([6e8ccbb](https://github.com/rogwilco/Try/commit/6e8ccbb90be577b8459f87dd2c608dc67cfe097a))

### Docs

- Fixed NPM badge in README. ([e3bfa1d](https://github.com/rogwilco/Try/commit/e3bfa1d86777268b0c3f0ebe8f24fadcaccdd842))

# 1.0.0 (2020-09-01)

### Build

- Added semantic-relase config and plugins. ([a0f89c7](https://github.com/rogwilco/Try/commit/a0f89c7885455a8e546a2e7657710b4a4e612e74))
- Initial setup for GitHub actions, created CI workflow. ([86a495f](https://github.com/rogwilco/Try/commit/86a495f4eff26dff35c2ff276944570188c5bbaf))

### Chore

- Added project configuration files. ([0594bc7](https://github.com/rogwilco/Try/commit/0594bc73db19a6672747f9900e0178829a92ec9f))
- Added tests. ([e426728](https://github.com/rogwilco/Try/commit/e42672807a51d928bc9ddc8732d5621c442879d0))
- Added TypeDoc support. ([c4e4905](https://github.com/rogwilco/Try/commit/c4e49053faeed98473dd1f2ce7a2031259014fbf))
- Setting up project. ([88ca902](https://github.com/rogwilco/Try/commit/88ca9028a97f578445d891f3d9fbae5ada133d89))

### Docs

- Added empty README. ([7d74b9d](https://github.com/rogwilco/Try/commit/7d74b9d3a7291d579b49a6c440b9911afac2f8a7))
- Added LICENSE with BSD-3-Clause license. ([7b5f51c](https://github.com/rogwilco/Try/commit/7b5f51c8a8a7dc645f5ce5f2a5b64b3508856a12))
- Updated README with requirements and install/usage instructions. ([a7b8ca2](https://github.com/rogwilco/Try/commit/a7b8ca2865b9364e98417ed37456adc95e1d30c3))

### New

- Added Handle() function for use with native try/catch/finally blocks. ([da42211](https://github.com/rogwilco/Try/commit/da422113f22e7bce483642fcd37c67fe691f520e))
- Initial implementation. ([fd8ccd0](https://github.com/rogwilco/Try/commit/fd8ccd072251bc58437f0fb824c00fc5fd91e8ba))

### Update

- Improved catch block matching to include parent classes. ([3713643](https://github.com/rogwilco/Try/commit/371364300fad6e77ce949b80c5cefcb7b32c4b50))

### Upgrade

- Upgraded dev dependencies. ([8379d99](https://github.com/rogwilco/Try/commit/8379d999daf81aa04f0d298a53fbb8f689409714))
