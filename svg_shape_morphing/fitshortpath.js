function findClosestNextAngle(longPathAngles, shortPathAngles) {
  for (let i=0; i<shortPathAngles.length-1; i++) {
    if (longPathAngles[0].angle > shortPathAngles[i].angle && longPathAngles[0].angle < shortPathAngles[i + 1].angle) {
      return i+1
    }
  }
}


function fitPath(shortPath, longPathAngles, shortPathAngles) {
  let newShortPath = shortPath
  let newStart = findClosestNextAngle(longPathAngles, shortPathAngles)

  if (newStart !== 0) {
    newShortPath = [...shortPath.slice(newStart), ...shortPath.slice(0, newStart) ]

    let pathToSplitArr = newShortPath[newShortPath.length-1]
    let pathToSplitD = pathToSplitArr.join(' ')
    let pathToSplit = createFakePath(pathToSplitD)
    let splitPoint = projectPoint(pathToSplit, longPathAngles[0].angle)
    let splitPosition = findPositionOnPath(splitPoint, pathToSplit)

    // split curve
    let splitCurve = splitCurveAt(splitPosition, ...pathToSplitArr.slice(1,3), ...pathToSplitArr.slice(4))
    let curve1 = ['M', ...splitCurve.slice(0,2), 'C', ...splitCurve.slice(2, 8)]
    let curve2 = ['M', ...splitCurve.slice(6,8), 'C', ...splitCurve.slice(8)]
    newShortPath[newShortPath.length-1] = curve1
    newShortPath.unshift(curve2)
    return newShortPath
  }
}

