# TOD-ETCH-A-SKETCH

## How to use:
To paint with a color select one with the buttons and passover the mouse on a cell.

### buttons:
**black**: paints the cells black.
**eraser**: makes white a cell that is painted in any other color.
**random**: select a random color and paint a cell the first time the mouse 
            passes over it, then every time the mouse pass over it makes is
            darker by reducing 10% of luminosity until it gets completely black.
**clear**: makes the grid completely white.
**grid**: show and hide the grid, making visible every cell.
**Change Size Bar**: creates a new grid with the selected size.

## Development notes:
- All colors are handled in RGB because that's how the element.style.backgroundColor
function returns them.
- The way to generate the grids doesn't matter because the functions has to get 
them using the node selector function directly from the document.
