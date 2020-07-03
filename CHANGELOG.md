## Unreleased

### Fixed

- boolean props like `bordered` must be truthy to have an effect

### Added

- `tint` as alias for `tintColor`

### Changes

## [1.4.0] - 2020-05-07

### Changes

- Renamed `withBlock` to `asBlock` (`withBlock` still works, but is deprecated)
- `asBlock` is now forwarding `ref` to the original component

## [1.3.0] - 2020-01-03

### Added

- Typings for `radius`, `if`, `bgWhite`
- `left`, `right`, `top`, `bottom` props
- `z` alias prop for `zIndex`

### Changes

- Only pass down unused props to the wrapped component
- Added `ViewProps` to Block tipes

## [1.2.0] - 2019-12-13

### Added

- `absolute` and `relative` props (shortcuts for `position: "absolute"` and `position: "relative"`)
- Comments for some TypeScript prop types
