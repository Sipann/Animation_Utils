var splitCurveAt = function(position, x1, y1, x2, y2, x3, y3, x4, y4){
  var v1, v2, v3, v4, quad, retPoints, i, c;
  
  if(position <= 0 || position >= 1){
      throw RangeError("splitCurveAt requires position > 0 && position < 1");
  }

    
  retPoints = []; // array of coordinates
  i = 0;
  quad = false;  // presume cubic bezier
  v1 = {};
  v2 = {};
  v4 = {};
  v1.x = x1;
  v1.y = y1;
  v2.x = x2;
  v2.y = y2;
  if(x4 === undefined || x4 === null){
      quad = true;  // this is a quadratic bezier
      v4.x = x3;
      v4.y = y3;
  }else{
      v3 = {};
      v3.x = x3;
      v3.y = y3;
      v4.x = x4;
      v4.y = y4;
  }
  c = position;
  retPoints[i++] = v1.x;  // start point 
  retPoints[i++] = v1.y;

  if(quad){ // split quadratic bezier
      retPoints[i++] = (v1.x += (v2.x - v1.x) * c);  // new control point for first curve
      retPoints[i++] = (v1.y += (v2.y - v1.y) * c);
      v2.x += (v4.x - v2.x) * c;
      v2.y += (v4.y - v2.y) * c;
      retPoints[i++] = v1.x + (v2.x - v1.x) * c;  // new end and start of first and second curves
      retPoints[i++] = v1.y + (v2.y - v1.y) * c;
      retPoints[i++] = v2.x;  // new control point for second curve
      retPoints[i++] = v2.y;
      retPoints[i++] = v4.x;  // new endpoint of second curve
      retPoints[i++] = v4.y;
      //=======================================================
      // return array with 2 curves
      return retPoints;
  }
  retPoints[i++] = (v1.x += (v2.x - v1.x) * c); // first curve first control point                
  retPoints[i++] = (v1.y += (v2.y - v1.y) * c);
  v2.x += (v3.x - v2.x) * c;
  v2.y += (v3.y - v2.y) * c;
  v3.x += (v4.x - v3.x) * c;
  v3.y += (v4.y - v3.y) * c;
  retPoints[i++] = (v1.x += (v2.x - v1.x) * c); // first curve second control point
  retPoints[i++] = (v1.y += (v2.y - v1.y) * c);
  v2.x += (v3.x - v2.x) * c;
  v2.y += (v3.y - v2.y) * c;
  retPoints[i++] = v1.x + (v2.x - v1.x) * c; // end and start point of first second curves
  retPoints[i++] = v1.y + (v2.y - v1.y) * c;
  retPoints[i++] = v2.x;  // second curve first control point
  retPoints[i++] = v2.y;
  retPoints[i++] = v3.x;  // second curve second control point
  retPoints[i++] = v3.y;
  retPoints[i++] = v4.x;  // endpoint of second curve
  retPoints[i++] = v4.y;
  //=======================================================
  // return array with 2 curves
  return retPoints;              
}