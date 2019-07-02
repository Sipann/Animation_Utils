function createPoint(angle, i) {
  let s = svg.createSVGPoint()
  let tan = null
  
  if (angle === -180) {
    s.x = 50 - i
    s.y = 50
  }

  else if (angle === -90) {
    s.x = 50
    s.y = 50 - i
  }

  else if (angle === 0) {
    s.x = 50 + i
    s.y = 50
  }

  else if (angle === 90) {
    s.x = 50
    s.y = 50 + i
  }

  else if (angle > -180 && angle < -90) {
    tan = Math.tan((-180 + angle) * Math.PI / 180)
    s.x = 50 - i
    s.y = 50 - (i * tan)
  }
  else if (angle > -90 && angle < 0) {
    tan = Math.tan(-angle * Math.PI / 180)
    s.x = 50 + i
    s.y = 50 - (i * tan)
  }
  else if (angle > 0 && angle < 90) {
    tan = Math.tan(angle * Math.PI / 180)
    s.x = 50 + i
    s.y = 50 + (i * tan)
  }
  else if (angle > 90) {
    tan = Math.tan((180 - angle) * Math.PI / 180)
    s.x = 50 - i
    s.y = 50 + (i * tan)
  }
  return s
}


function projectPoint(path, angle) {
  let points = []
  svg.appendChild(path)
  for (let i=0; i<=50; i+=0.2) {
    let s = createPoint(angle, i)
    if (path.isPointInStroke(s)) {
      points.push(s)
    } 
  }
  svg.removeChild(path)
  return points[0]
}


function projectOnPath(allAngles, projected, pathEl) {
  let projections = []

  let originalIndex = []
  let projectedIndex = []
  // starting @ 1 since 1st point already (kind of) "aligned"
  for (let i=0; i<allAngles.length; i++) {
    if (allAngles[i].origin === projected) {
      projectedIndex.push(i)
    } else {
      originalIndex.push(i)
    }
  }

  for (let i=0; i<projectedIndex.length; i++) {
    let angle = allAngles[projectedIndex[i]].angle
    
    let point = projectPoint(pathEl, angle)
    projections.push({
      angle: angle,
      point: point,
      indexInAll: projectedIndex[i]
    })
  }
  return projections
}



