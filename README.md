different-strokes-solver - nyt Different Strokes puzzle solver
================================================================================

The Sunday New York Times magazine frequently has a puzzle at the back of the
magazine called "Different Strokes".  A grid of lines is printed, with numbers
on some of the points where lines intersect.  From the description in the
magazine:

> From each number in the grid, draw a line whose length in units is the same
> as its number.  If the line turns, every segment in it must have a
> different length.  No lines may touch.

Eg, on the left is the puzzle, on the right is the solution.

    ┼───┼───1───6───┼               ┼───****1───6****  
    │   │   │   │   │               │   │   │   │   *
    ┼───┼───┼───3───┼               ************3───*
    │   │   │   │   │               │   │   │   │   *  
    ┼───┼───┼───┼───┼               ┼───*************  
    │   │   │   │   │               │   │   │   │   │  
    ┼───┼───┼───┼───4               ****************4  
    │   │   │   │   │               │   │   │   │   │  
    ┼───┼───┼───2───┼               ┼───********2───┼  


(note that whent printed, the numbers will be base 16 (hex))

This project implements a solver for this puzzle.

To run it, you'll enter the a list of coordinates/values for the numbers.
The coordinates are x,y with the origin at 1,1 moving right and down.
Each coordinate/value is passed as x,y,value.

The first argument is the columns/rows size, in x,y format.

For example, the puzzle above can be solved with the following arguments:

    different-strokes-solver 5,5  3,1,1  4,1,6  4,2,3  5,4,4  4,5,2

Here's are some bigger ones to solve:

    different-strokes-solver 7,7  1,1,5  2,1,2  7,1,10  7,2,1  1,3,5  1,4,3  4,4,2  7,4,5  7,5,3  7,6,1


install
================================================================================

    npm install -g pmuellr/different-strokes-solver


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.



contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md