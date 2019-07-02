function getPointsCoords(path) {
  let coordX = null
  let coordY = null
  let refCoords = []
  for (let i=0; i<path.length; i++) {
    coordX = path[i][1]
    coordY = path[i][2]
    let pointCoords = [coordX, coordY]
    refCoords.push(pointCoords)
  }
  return refCoords
}


function getAngle(coords) {
  let x = coords[0]
  let y = coords[1]
  let angle = null
  if (x === 50 && y === 50) return angle = 0
  else if (x < 50 && y === 50) return angle = -180 
  else if (x === 50 && y < 50) return angle = -90
  else if (x > 50 && y === 50) return angle = 0
  else if (x === 50 && y > 50) return angle = 90
  else if (x < 50 && y < 50) {
    let dimX = 50 - x
    let dimY = 50 - y
    let intermediaryAngle = Math.atan(dimY/dimX) * 180 / Math.PI
    angle = -(180 - intermediaryAngle)
    return angle
  } 
  else if (x > 50 && y < 50) {
    let dimX = x - 50
    let dimY = 50 - y
    angle = -(Math.atan(dimY/dimX) * 180 / Math.PI)
    return angle
  }
  else if (x > 50 && y > 50) {
    let dimX = x - 50
    let dimY = y - 50
    angle = Math.atan(dimY/dimX) * 180 / Math.PI
    return angle
  }

  else if (x < 50 && y > 50) {
    let dimX = 50 - x
    let dimY = y - 50
    let intermediaryAngle = Math.atan(dimY/dimX) * 180 / Math.PI
    angle = 180 - intermediaryAngle
    return angle
  }
}


function getAngles(path, tag) {
  let pathPointsCoords = getPointsCoords(path)

  let anglesArray = []
  for (let i=0; i<pathPointsCoords.length; i++) {
    let coords = pathPointsCoords[i]
    let itemAngle = getAngle(coords) 
    anglesArray.push({
      origin: tag,
      angle: itemAngle, 
      path: path[i]
    })
  }
  return anglesArray
}


function mergeAngles(longPathAngles, shortPathAngles) {
  let allAngles = longPathAngles.concat(shortPathAngles)
  allAngles = sortArrayByProp(allAngles, 'angle')

  if (allAngles[0].angle !== longPathAngles[0].angle && allAngles[0].angle !== shortPathAngles[0].angle) {
    let index0 = allAngles.findIndex(item => item.angle === longPathAngles[0].angle)
    let index1 = allAngles.findIndex(item => item.angle === shortPathAngles[0].angle)
    let index = Math.min(index0, index1)
    allAngles = [...allAngles.slice(index), ...allAngles.slice(0, index)]
  }
  return allAngles
}