function createFakePath(attributeD) {
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', attributeD)
  path.setAttribute('stroke', 'transparent')
  path.setAttribute('stroke-width', 1)
  return path
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2),2 ) + Math.pow((y1 - y2),2))
}

function minArrayByProp(array, property) {
  return array.reduce(function(prev, curr) {
    return prev[property] < curr[property] ? prev : curr;
  })
}

function sortArrayByProp(array, property) {
  return array.sort(function(a,b) {
    return a[property] - b[property]
  })
}

