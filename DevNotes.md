# Dotrix Notes

## What is getBoundingClientRec()?

when we add getBoundingClientRec() to an object, we would get back some properties of that element:

```
- X
- y
- width
- height
- top
- left
- bottom
- right
```

When we say e.clientX - rect.left, we’re taking the mouse’s X position (relative to the whole window) and normalizing it so that it’s relative to the board’s left edge instead. In other words, we shift the coordinate system so that the board’s top-left corner is treated as (0,0).
