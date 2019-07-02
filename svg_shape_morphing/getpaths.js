let svg = document.querySelector('svg')
let pathEl1 = document.querySelector('#p1')
let pathEl2 = document.querySelector('#p2')
let shortPath = null
let longPath = null
let short = null

// Transform d attribute path in absolute cubic path
let path1 = Snap.path.toCubic(pathEl1.getAttribute('d'))
let path2 = Snap.path.toCubic(pathEl2.getAttribute('d'))

// Clean path in case last point is useless
path1 = cleanPath(path1)
path2 = cleanPath(path2)
path1 = decomposePath(path1)
path2 = decomposePath(path2)

// Compare paths lengths (number of points)
if (path1.length > path2.length) {
  longPath = path1
  shortPath = path2
  longPathEl = pathEl1
  shortPathEl = pathEl2
} else {
  longPath = path2
  shortPath = path1
  longPathEl = pathEl2
  shortPathEl = pathEl1
  short = 1
} 

// Get angular position of each point
let longPathAngles = getAngles(longPath, 'long')
let shortPathAngles = getAngles(shortPath, 'short')

// Transform shortPath if 1st points of each path are not aligned
if (longPathAngles[0].angle !== shortPathAngles[0].angle) {
  shortPath = fitPath(shortPath, longPathAngles, shortPathAngles)
  shortPathAngles = getAngles(shortPath, 'short') 
}

// Merge angles arrays of both shapes
let allAngles = mergeAngles(longPathAngles, shortPathAngles)


//// Transform short path
// Project reference points of long path on short path
let projLongOnShort = projectOnPath(allAngles, 'long', shortPathEl)
// Merge original short path data with projected points (from long) coordinates
let mergedShort = mergeProjWithOrig(allAngles, projLongOnShort, shortPath, 'short')
// Prepare merged data to be transformed
let setsShort = makeSets(mergedShort)
// Split each original curve to insert projected points
redrawPath(setsShort)
// Stringify paths to fit 'd' attribute SVG format 
let shortPathString = pathToString(setsShort)
console.log('shortPathString', shortPathString)   // - FINAL VALUE TO USE

//// Transform long path
// Project reference points of short path on long path
let projShortOnLong = projectOnPath(allAngles, 'short', longPathEl)
// Merge original long path data with projected points (from short) coordinates
let mergedLong = mergeProjWithOrig(allAngles, projShortOnLong, longPath, 'long')
// Prepare merged data to be transformed
let setsLong = makeSets(mergedLong)
// Split each original curve to insert projected points
redrawPath(setsLong)
// Stringify paths to fit 'd' attribute SVG format
let longPathString = pathToString(setsLong)
console.log('longPathString', longPathString)   // - FINAL VALUE TO USE



// Feed the DOM with calculated values
let from = short === 1 ? shortPathString : longPathString
let to = short == 1 ? longPathString : shortPathString
let animatedPath = document.querySelector('#animated')
let animate = document.querySelector('#animated animate')
animatedPath.setAttribute('d', from)  
animate.setAttribute('to', to)

