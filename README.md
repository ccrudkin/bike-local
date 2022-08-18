# Bike Local 

## Ride Local Trails
This app initially targets the Casper, Wyoming, area, but is built to be scalable. It's meant to host basic trail information (location, maps, conditions, difficulty, amenities) with no account needed or other barriers to access.

## Status
~~Build phase, primarily focused on functionality and back end work.~~  
Refining phase, mainly working on smoother functionality, errors, and edge cases. Designg yet to come.  

## Features to add

### Phase 1
\[-\] Styling (please take away the ugly)  
\[x\] Homepage photo  
\[-\] Break CSS into page/component specific stylesheets  
\[-\] Layout optimization for all breakpoints  
\[-\] Useful header and footer content  
\[x\] Distance and elevation on trail pages  
\[x\] Current weather / forecast (NOAA API)  
\[-\] Style weather forecast  
\[x\] Handle weather API errors  
\[x\] Add sophistication for recent reports algorithm (report expir., etc.)  
\[x\] Add expir. for I Rode It! after 30 days  
\[-\] Add trails (Lamberson, Hogadon)  
\[x\] Static generate all appropriate pages; load common updates after  
\[-\] Increase separation of concerns; further reduce components; clean code  
\[x\] Bug: able to submit blank condition  
\[ \] Amenities and icons (add to database and pages)  
\[ \] Trailhead elevations  
\[ \] Sort trails (alpha?)  
\[x\] Add damp/firm condition; order drop down differently  
\[-\] Favicon  
\[x\] Deploy test  

### Phase 2
\[-\] Interactive map  
\[ \] Add local interests page (shops, breweries, restaurants, etc.)  
\[ \] Cookies for I Rode It! and condition report (once per day per trail)  
\[ \] Cookies alert  
\[ \] Add editor interface for adding new trails  

## Resources

* [https://openmaptiles.org/](https://openmaptiles.org/)
* [Hack to recreate and reload scripts upon nav](https://github.com/vercel/next.js/discussions/17919#discussioncomment-3149719)