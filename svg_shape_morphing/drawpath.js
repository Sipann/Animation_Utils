function mergeProjWithOrig(allAngles, projections, path, target) {
  let array = []
  for (let i=0; i<allAngles.length; i++) {
    if (allAngles[i].origin === target) {
      array.push({
        projected: false,
        angle: allAngles[i].angle,
        path: allAngles[i].path
      })
    } else {
      let projected = projections.find(item => item.angle === allAngles[i].angle)
      array.push({
        projected: true,
        angle: allAngles[i].angle,
        projectedPoint: projected.point
      })
    }
  }
  if (allAngles[0].origin === target && allAngles[1].origin !== target) { array.splice(1, 1) }
  else if (allAngles[0].origin !== target && allAngles[1].origin === target) { array.shift() }
  return array
}


function makeSets(mergedArray) {
  let array = [...mergedArray]
  let projectedPoints = []
  let originalPoints = []
  let sets = []

  for (let i=0; i<array.length; i++) {
    if (array[i].projected) {
      projectedPoints.push(i)
    } else {
      originalPoints.push(i)
    }
  }

  for (let i=0; i <originalPoints.length; i++) {
    if (originalPoints[i] !== array.length - 1) {
      let startingIndex = originalPoints[i]
      let endingIndex = originalPoints[i + 1]
      let originalPath = array[startingIndex].path
      let startingPath = [...originalPath.slice(0,3)]
      let endingPath = [...originalPath.slice(3)]

      let pointsToAdd = array.slice(startingIndex + 1, endingIndex)
      let pointsToAddList = []
      for (let j=0; j<pointsToAdd.length; j++) {
        let point = pointsToAdd[j].projectedPoint
        pointsToAddList.push(point)
      }

      let fullPaths = []
      let fullPath = `${startingPath.join(' ')} ${endingPath.join(' ')}`
      fullPaths.push(fullPath)

      let startingPoints = []
      startingPoints.push(startingPath)

      let endingPoints = []
      endingPoints.push(endingPath)

      let projectionSet = {
        fullPaths: fullPaths,
        pathEndingAt: endingPoints,
        pathStartingAt: startingPoints,
        pointsToAdd: pointsToAddList
      }
      sets.push(projectionSet)
    } else {
      let path = array[originalPoints[i]].path
      let projectionSet = {
        fullPaths: [path.join(' ')]
      }
      sets.push(projectionSet)
    }
  }
  return sets
}


function redrawPath(sets) {
  for (let i=0; i<sets.length; i++) {
    let set = sets[i]
    if (set.pointsToAdd) {
      for (let j=0; j<set.pointsToAdd.length; j++) {
        let point = set.pointsToAdd[j]
        let subPath = createFakePath(set.fullPaths[j])
        let position = findPositionOnPath(point, subPath)
        let splitCurve = splitCurveAt(position, ...set.pathStartingAt[j].slice(1), ...set.pathEndingAt[j].slice(1) )
        let curve1 = ['M', ...splitCurve.slice(0, 2), 'C', ...splitCurve.slice(2, 8)]
        let curve2 = ['M', ...splitCurve.slice(6, 8), 'C', ...splitCurve.slice(8)]
        set.fullPaths[j] = curve1.join(' ')
        set.fullPaths.push(curve2.join(' '))
        set.pathStartingAt.push(['M', ...splitCurve.slice(6, 8)]) 
        set.pathEndingAt.push(['C', ...splitCurve.slice(8)])
  
      }
    } 
  }
}





