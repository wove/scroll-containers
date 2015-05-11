# Scroll Containers
### A small script to help with keeping content within the viewport
The motivation for this was to come up with a solution for 'vertical sidebar menus'
that are too tall to fit in the viewport. It could be used for any number of other purposes.

To use it, just add `scrollContainers.js` as you would any other script (ensuring that you also 
load jQuery first).

From there you'll need to add the `.scroll-container` class to a wrapper for the element you want 
to keep in view while scrolling, and the `.scroll-element` class to the element itself. The element 
will remain in view so long as its container does. A container that is the full height of the page will 
ensure that the element is always in view.

You can have more than one `.scroll-container` per page, but only one `.scroll-element` per container.

An demonstration with various container and element sizes is available at http://wove.github.io/scroll-containers/