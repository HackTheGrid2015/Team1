function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}


function wavelengthToColor(wavelenth){
  var R, G, B, alpha, colorSpace, wl = wavelenth, gamma = 1;

  if(wl >= 380 && wl<440){
    R = -1*(wl-440)/(440-380);
    G = 0;
    B = 1;
  }
  else if(wl >= 440 && wl<490){
    R = 0;
    G = (wl-440) / (490-440);
    B = 1;
  }
  else if(wl >= 490 && wl<510){
    R = 0;
    G = 1;
    B = -1*(wl-510)/(510-490);
  }
  else if(wl >= 510 && wl<580){
    R = (wl - 510) / (580-510);
    G = 1;
    B = 0;
  }
  else if(wl>=580 && wl<645){
    R = 1;
    G = -1*(wl-645)/(645-580);
    B = 0.0;
  }
  else if(wl>=645 && wl<=780){
    R = 1;
    G = 0;
    B = 0;
  }
  else{
    R = 0;
    G = 0;
    B = 0;
  }

  if(wl>780 || wl<380){
    alpha = 0;
  }
  else if(wl > 700){
    alpha = (780 - wl)/(780-700);
  }
  else if(wl<420){
    alpha = (wl-380)/(420-380);
  }
  else{
    alpha = 1;
  }

  colorSpace = "#"+rgbToHex(R*255,G*255,B*255)
  // colorSpace = ["rgba("+(R*100)+"%,"+(G*100)+"%,"+(B*100)+"%,"+alpha+")",R,G,B,alpha]
  
  return colorSpace;
}

function temp2Color(temp){
  var wavelenth = 450 + (temp+20)*(700-450)/(50+20);
  return wavelengthToColor(wavelenth);
}