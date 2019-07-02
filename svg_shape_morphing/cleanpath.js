function cleanPath(path) {
  let pathFinal = path[path.length - 1]
  let coords = []
  for (let i=1; i<6; i+=2) {
    let pointCoords = [pathFinal[i], pathFinal[i + 1]].join(',')
    coords.push(pointCoords)
  }
  if (coords[0] == coords[1] && coords[0] == coords[2]) {
    return path.slice(0, -1)
  } else {
    return path
  }
}

function decomposePath(path) {
  let decomposedPath = []
  decomposedPath.push(path[0].concat(path[1]))
  for (let i=1; i<path.length-1; i++) {
    let prev = ['M', path[i][5], path[i][6]]
    let next = path[i+1]
    decomposedPath.push(prev.concat(next))
  }
  return decomposedPath
}


function pathToString(array) {
  let stringified = '';
  for (let i=0; i<array.length; i++) {
    for (let j=0; j<array[i].fullPaths.length; j++) {
      let pathString = array[i].fullPaths[j]
      stringified += pathString
    }
  }
  return stringified
}

