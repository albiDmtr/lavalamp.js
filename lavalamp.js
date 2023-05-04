function randomShuffle(spread) {
    return Math.random() * spread + (1-(spread/2));
}

function rgbToHsl(rgb) {
    let r = rgb[0],
    g = rgb[1],
    b = rgb[2];
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [ h, s, l ];
  }

function getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    rgb = [match[1],match[2],match[3]]
    return rgb;
};

function assignBubble(numberOfCircles, item, baseColor, i, isFirstRun) {
    let distance = ((i+1)/numberOfCircles)*randomShuffle(0.2)*1.2; // (0-1.2)
    let angle = Math.random();
    let xPos = Math.sqrt(angle*(distance**2));
    let yPos = Math.sqrt((1-angle)*(distance**2));
    let size = 0.45*randomShuffle(1);
    let itemWidth = isFirstRun ? 190 : item.offsetWidth;
    let itemHeight = isFirstRun ? 240 : item.offsetHeight;
    let color = 'hsl(' + (360*(baseColor[0]-((distance-0.6)/4)))%360 + ', 57%, ' + 100*baseColor[2] + '%)';

    bubble = item.querySelector('#bubble-' + i);


    bubble.style.width = size*itemWidth+'px';
    bubble.style.height = size*itemWidth+'px';

    bubble.style.backgroundColor = color;
    bubble.style.position = 'absolute';
    let xTrans = xPos*itemWidth-(size*itemWidth/2) + 'px';
    let yTrans = yPos*itemHeight-(size*itemHeight/2) + 'px';
    bubble.style.transform = 'translate('+xTrans+','+yTrans+') rotate('+360*Math.random()+'deg) scaleX('+randomShuffle(1)+')';
}

const originPoints = [0, 0.5, 1];

function generateLavaLamp(item) {
    // creating bubble container
    item.innerHTML += '<div class="lavalamp-cont"></div> <div class="lavalamp-blur"></div>';
    const cont = item.querySelector('.lavalamp-cont');

    // random generating parameters of lavalamp
    const speed = 3;
    const origin = [originPoints[Math.floor(Math.random() * originPoints.length)],originPoints[Math.floor(Math.random() * originPoints.length)]];
    // color
    cont.style.backgroundColor = item.dataset.lavalampColor;
    const baseColor = rgbToHsl(getRGB(cont.style.backgroundColor));
    if (item.dataset.lavalampBg == 'true') {
        cont.style.background = 'hsl(' + 360*baseColor[0] + ', 50%, 40%)';
    } else {
        cont.style.backgroundColor = 'transparent';
    }

    // making it look similar on all screens
    const containerRatio = item.offsetHeight/item.offsetWidth;
    const numberOfCircles = Math.round(8.7*containerRatio);

    // generating bubbles
    for (let i = 0; i < numberOfCircles; i++) {
        cont.innerHTML += '<div class="lava-bubble" id="bubble-'+i+'"></div>';
        assignBubble(numberOfCircles,cont,baseColor,i,true);
    }

    let bubblenum = 0;
    // itt van valami, ay assignbubble csak eleinte hivodik meg mindenkire
    setInterval(function () {
        assignBubble(numberOfCircles, item, baseColor, bubblenum % numberOfCircles, false); bubblenum++;
    }, speed * 1000 / numberOfCircles);
    
    item.innerHTML += '<style>.lava-bubble{will-change: transform; border-radius:100%; transition:' + speed * 2.5 + 's;} .lavalamp-cont{position:absolute; top:0; left:0; width:100%; height:100%; z-index:-999;} .lavalamp-blur{position:absolute; top:0; left:0; width:100%; height:100%; z-index:-998; backdrop-filter:blur(' + (item.offsetWidth / 7.037) + 'px);}</style>';
    item.style.overflow = 'hidden';
    item.style.position = 'relative';

    // making bubbles move at the beginning
    for (let i = 0; i < numberOfCircles; i++) {
        assignBubble(numberOfCircles,item,baseColor,i, false);
    }

}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('[data-lavalamp-color]').forEach(function (item, index) { 
        generateLavaLamp(item);
    });
});