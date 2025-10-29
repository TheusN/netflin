# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ElegantFin** is a custom CSS theme for Jellyfin that provides a modern, elegant interface inspired by Jellyseerr. The theme is designed to work across multiple platforms (desktop, mobile, TV) with a single import statement.

**Author:** [lscambo13](https://github.com/lscambo13)

## Repository Structure

```
Theme/
├── ElegantFin-theme-nightly.css              # Development version with latest changes
├── ElegantFin-jellyfin-theme-build-latest-minified.css  # Production minified version
├── ElegantFin-theme-v*.css                   # Versioned theme releases
└── assets/
    ├── add-ons/
    │   ├── custom-media-covers-*.css         # Media library cover customization
    │   └── media-bar-plugin-support-*.css    # Media Bar plugin styling
    └── img/
        ├── library-covers/                    # Default media library images
        └── banner.png                         # Project banner

docs/
└── index.html                                 # GitHub Pages documentation site

Previews/
└── previews-v*/                              # Screenshot collections by version
    ├── desktop/
    ├── mobile/
    └── tv/
```

## Theme Architecture

### CSS Variable System

The theme uses CSS custom properties (variables) extensively for customization. All configurable options are defined in the `:root` selector:

- **Color scheme variables:** `--darkerGradientPoint`, `--lighterGradientPoint`, `--activeColor`, etc.
- **Component variables:** `--borderColor`, `--selectorBackgroundColor`, `--textColor`, etc.
- **Layout variables:** `--sidePadding`, `--primaryItemPageNegativeSpace`, etc.
- **Effect variables:** `--blurDefault`, `--shadow`, `--cardHoverEffect`, etc.
- **User customization variables:** `--loginPageBgUrl`, `--extraCardButtonsVisibility`, `--libraryLabelVisibility`, etc.

### Theme Versions

- **Nightly builds** (`ElegantFin-theme-nightly.css`): Latest development version (currently v25.10.28)
- **Versioned releases** (`ElegantFin-theme-vYY.MM.DD.css`): Stable releases with date-based versioning (current: v25.10.28)
- **Production build** (`ElegantFin-jellyfin-theme-build-latest-minified.css`): Production version served via CDN (current: v25.10.28)

Users import the theme via:
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
```

### Add-on System

The theme supports optional add-ons that users can enable:

1. **Custom Media Covers**: Allows customization of library card cover images and overlay colors
2. **Media Bar Plugin Support**: Provides styling for the third-party Media Bar plugin

Add-ons are imported separately after the main theme import.

## Key Design Principles

From [CONTRIBUTING.md](CONTRIBUTING.md):

1. **Responsiveness first**: Theme must work on phones, tablets, TVs, and desktops
2. **Use relative units**: Prefer `em` over `px` for better scaling
3. **Avoid `!important`**: Only use when absolutely necessary
4. **Minimize media queries**: Use existing solutions where possible
5. **Logical grouping**: Keep related styles together with descriptive comments
6. **Cross-platform compatibility**: Must work on web, Android app, and WebOS TV app

## Known Compatibility Issues

- **Jellyfin Media Player (JMP)**: Based on Qt 5.x with outdated web engine; many CSS features unsupported. Recommend web app instead.
- **AndroidTV app v0.18.11**: Does not support CSS themes (mobile app and WebOS do)
- **WebOS TVs**: Some models have issues with modern Material Icons; workaround available using `--iconPack: 'Material Icons';`

## User Customization Variables

Users can customize the theme by adding CSS variables after the `@import` statement:

- `--loginPageBgUrl`: Custom login page background (requires splash screen enabled)
- `--extraCardButtonsVisibility`: Show/hide extra overlay buttons (`block` or `none`)
- `--overlayPlayButtonPosition`: Position of play button on cards (`50%` for center, `2.8em` for bottom-left)
- `--cardHoverEffect`: Enable/disable card reflection effect (`""` or `none`)
- `--libraryLabelVisibility`: Show/hide library card labels (`block` or `none`)
- `--iconPack`: Switch icon font for WebOS compatibility (`'Material Icons'` or `'Material Symbols Rounded'`)
- `--headerBlurLayerVisibility`: Enable/disable header blur effect (`""` or `none`)

For custom media covers, see [custom-media-covers.md](custom-media-covers.md) for the complete variable list.

## Testing Requirements

From [README.md](README.md):

- **Server**: Jellyfin Server v10.10.7 (v10.11.0 support in progress)
- **Browsers**: Microsoft Edge (Chromium-based browsers)
- **Mobile**: Jellyfin Android App v2.6.3
- **TV**: WebOS app (AndroidTV unsupported)

## Version Identification

Users can check their theme version in the Dashboard footer, which displays: `ElegantFin vYY.MM.DD`

The version string is controlled by `--elegantFinFooterText` variable in the CSS.

## Contributing Guidelines

When modifying the theme:

1. **Keep changes focused**: One feature/bugfix per PR
2. **Document changes**: Clear PR descriptions with before/after screenshots
3. **Comment CSS**: Explain intent for new/complex rules
4. **Test across platforms**: Desktop, mobile, and TV views
5. **Follow naming conventions**: Match existing CSS structure
6. **Propose major changes**: Open issue first for layout/color scheme changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for complete guidelines.

## Distribution

The theme is distributed via:
- **jsDelivr CDN**: Primary distribution method for end users
- **GitHub Releases**: Version-tagged releases for stability
- **GitHub Pages**: Documentation site at `/docs`

Users typically implement the theme server-side (Dashboard > General > Custom CSS) or client-side (Settings > Display > Custom CSS).
