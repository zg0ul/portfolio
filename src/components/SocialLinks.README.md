# Social Links Component

A customizable, responsive social media links component for use across your portfolio.

## Usage

Import the component and use it in any part of your website:

```tsx
import SocialLinks from "@/components/SocialLinks";

// Basic usage
<SocialLinks />

// With custom styling
<SocialLinks 
  variant="outline"  
  size="md"
  className="flex-wrap" 
/>

// With labels
<SocialLinks 
  showLabels={true}
  size="lg"
  className="flex-col items-start" 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `""` | Additional classes to apply to container |
| `iconClassName` | string | `""` | Additional classes to apply to icons |
| `variant` | "default" \| "outline" \| "ghost" | "default" | Visual style of links |
| `size` | "sm" \| "md" \| "lg" | "md" | Size of the social icons |
| `showLabels` | boolean | false | Whether to show text labels next to icons |

## Variants

- **default**: Solid background with hover effect
- **outline**: Bordered with transparent background
- **ghost**: No background or border, just icons that show background on hover

## Sizes

- **sm**: Small (32px)
- **md**: Medium (40px) 
- **lg**: Large (48px)

## Examples

### In Hero Section
```tsx
<SocialLinks variant="ghost" size="md" />
```

### In About Page
```tsx
<SocialLinks variant="default" size="lg" showLabels={true} />
```

### In Footer
```tsx
<SocialLinks variant="outline" size="sm" className="justify-center md:justify-start" />
```

## Customization

To modify the available social platforms or their URLs, edit the `socialLinks` array in the component.
