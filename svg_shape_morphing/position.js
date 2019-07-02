function findPositionOnPath(point, path) {
  let indexes = []
  let pathLength = path.getTotalLength()
  for (let i=0; i<pathLength; i++) {
    let position = path.getPointAtLength(i)
    let distanceTarget = distance(position.x, position.y, point.x, point.y)
    if (distanceTarget < 2) {    // ! distance must be set according to the stroke width
      indexes.push({
        pos: i,
        distance: distanceTarget
      })
    }
  }
  let position = minArrayByProp(indexes, 'distance')
  return position.pos / pathLength
}