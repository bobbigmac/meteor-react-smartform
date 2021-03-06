# CHANGELOG

## 0.9.2
* Fixed a major bug where select IDs were not stored in the right place

## 0.9.1
* All IDs are now converted to camelCase so it's not necessary to deal with things like `formData['some-thing'].value`

## 0.9.0
* Added `SmartForm.Select` to the list of supported form elements

## 0.8.0
* Added `SmartForm.Checkbox` to the list of supported form elements

## 0.7.5
* Fixed a bug so defaultValue works as expected (now a controlled component)

## 0.7.4
* Removed `displayName` properties (Facebook's React extension for Chrome now displays proper component names)

## 0.7.3
* Fixed an issue where dispatched actions would collide with main `Dispatcher` (created `FormDispatcher`)

## 0.7.2
* Syncing package.js version number with GitHub release number

## 0.7.1
* Added package version constraints

## 0.7.0
* Initial beta release
