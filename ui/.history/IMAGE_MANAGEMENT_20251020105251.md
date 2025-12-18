# Image Management for Country Reports Demo

This guide explains how to manage images in the Country Reports Demo application.

## Directory Structure

```
country-reports-demo-ui/
├── data/
│   └── images/              # ← Place your actual image files here
│       ├── gbif-logo.png
│       ├── australia-*.png
│       ├── botswana-*.png
│       ├── colombia-*.png
│       └── denmark-*.png
├── public/
│   └── data/
│       └── images/          # ← Images copied here for serving
└── ...
```

## How Images Work

1. **Source Location**: Place your actual images in `data/images/`
2. **Served Location**: Images are copied to `public/data/images/` to be served by Vite
3. **URL Format**: Images are accessed via `/data/images/filename.png` in the application
4. **References**: Image paths are defined in:
   - `data/api.ts` - Main image constants
   - `data/countries/*.ts` - Country-specific images
   - `App.tsx` - App-level images
   - `components/figma/ImageWithFallback.tsx` - Error fallback image

## Expected Images

The application expects these image files:

### General Assets
- `gbif-logo.png` - GBIF organization logo
- `occurrence-records.png` - Occurrence records illustration
- `chao1-explainer.png` - Chao1 estimator explanation image
- `error-placeholder.png` - Fallback image for errors

### Country-Specific Images
For each country (Australia, Botswana, Colombia, Denmark):
- `{country}-accumulation.png` - Species accumulation curve
- `{country}-chao1.png` - Chao1 estimator visualization  
- `{country}-species-richness.png` - Species richness map

## Managing Images

### Add New Images
1. Place image files in `data/images/`
2. Run the copy script: `npm run copy-images`
3. Images will be available at `/data/images/filename.png`

### Check Image Status
```bash
npm run check-images
```
This shows which images are present/missing in both directories.

### Copy Images to Public Directory
```bash
npm run copy-images
```
This copies all images from `data/images/` to `public/data/images/`.

## Development Workflow

1. **Adding Images**: Place new images in `data/images/`
2. **Update References**: Modify the image path constants in the appropriate files
3. **Copy Images**: Run `npm run copy-images` 
4. **Verify**: Check that images load correctly in the application

## Build Process

During the build process (`npm run build`), the public directory (including `public/data/images/`) is automatically included in the distribution.

## File Formats

Supported image formats:
- PNG (recommended for charts and maps)
- JPG/JPEG (for photos)
- SVG (for vector graphics)
- GIF (for animations)

## Tips

- Keep image file sizes reasonable for web performance
- Use descriptive, consistent naming conventions
- The `ImageWithFallback` component handles broken image links gracefully
- Images are served from the root `/data/images/` path in both development and production