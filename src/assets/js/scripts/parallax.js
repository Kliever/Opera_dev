const parallaxContainer = document.querySelectorAll('.js-parallax-container');

parallaxContainer.forEach((parallax) => {
  const parallaxItem = parallax.querySelector('.js-parallax-item');

  //as active
  let parallaxActive = true;

  //translate
  let translateCoefsX = getAttrCoefs(parallax, 'data-translateX');
  let translateCoefsY = getAttrCoefs(parallax, 'data-translateY');
  let translateCoefsZ = getAttrCoefs(parallax, 'data-translateZ');

  //rotate
  let rotateCoefsX = getAttrCoefs(parallax, 'data-rotateX');
  let rotateCoefsY = getAttrCoefs(parallax, 'data-rotateY');
  let rotateCoefsZ = getAttrCoefs(parallax, 'data-rotateZ');

  //skew
  let skewCoefsX = getAttrCoefs(parallax, 'data-skewX');
  let skewCoefsY = getAttrCoefs(parallax, 'data-skewY');

  //scale
  let scaleCoefsX = getAttrCoefs(parallax, 'data-scaleX');
  let scaleCoefsY = getAttrCoefs(parallax, 'data-scaleY');
  let scaleCoefsZ = getAttrCoefs(parallax, 'data-scaleZ');

  //perspective
  let perspective = parallax.getAttribute('data-perspective') ?? null;
  perspective = perspective ? perspective : null;
  parallax.style.perspective = perspective;
  //transform-origin
  let transformOrigin = parallax.getAttribute('data-transformOrigin') ?? null;
  transformOrigin = transformOrigin ? transformOrigin : null;
  parallaxItem.style.transformOrigin = transformOrigin;

  //transition options
  const duration = parallax.getAttribute('data-duration') || '1s';
  const timingFunc = parallax.getAttribute('data-timingFunc') || 'cubic-bezier(.17,.67,.67, 1)';
  //transition
  parallaxItem.style.transition = `transform ${duration} ${timingFunc} 0s`;

  //viewport
  let dataViewportArr = parallax.getAttribute('data-viewport') ?? null;
  dataViewportArr = dataViewportArr ? dataViewportArr.split('/') : null;
  const viewportWidth = dataViewportArr ? +dataViewportArr[0] : 0;
  const viewportHeight = dataViewportArr ? +dataViewportArr[1] : 0;

  if (window.innerWidth > viewportWidth && window.innerHeight > viewportHeight) {
    parallaxActive = true;
  } else {
    parallaxActive = false;
  }


  //media breakPoint
  window.matchMedia(`(max-width: ${viewportWidth}px)`).addEventListener('change', () => {
    if (window.matchMedia(`(max-width: ${viewportWidth}px)`).matches) {
      parallaxActive = false;
      parallaxItem.style.removeProperty('transform');
      parallaxItem.style.transition = 'transform .3s';
    } else {
      parallaxActive = true;
      parallaxItem.style.transition = `transform ${duration} ${timingFunc} 0s`;
    }
  })

  window.matchMedia(`(max-height: ${viewportHeight}px)`).addEventListener('change', () => {
    if (window.matchMedia(`(max-height: ${viewportHeight}px)`).matches) {
      parallaxActive = false;
      parallaxItem.style.removeProperty('transform');
      parallaxItem.style.transition = 'transform .3s';
    } else {
      parallaxActive = true;
      parallaxItem.style.transition = `transform ${duration} ${timingFunc} 0s`;
    }
  })



  //create move options
  let translateX = '';
  let translateY = '';
  let translateZ = '';
  let rotateX = '';
  let rotateY = '';
  let rotateZ = '';
  let skewX = '';
  let skewY = '';
  let scaleX = '';
  let scaleY = '';
  let scaleZ = '';

  //move function
  document.addEventListener('mousemove', (e) => {
    if (parallaxActive) {
      //translate
      if (translateCoefsX) {
        translateX = moveCoordinate(e, translateCoefsX);
        translateX = `translateX(${translateX}px)`;
      }
      if (translateCoefsY) {
        translateY = moveCoordinate(e, translateCoefsY);
        translateY = `translateY(${translateY}px)`;
      }
      if (translateCoefsZ) {
        translateZ = moveCoordinate(e, translateCoefsZ);
        translateZ = `translateZ(${translateZ}px)`;
      }
      //rotate
      if (rotateCoefsX) {
        rotateX = moveCoordinate(e, rotateCoefsX);
        rotateX = `rotateX(${rotateX}deg)`;
      }
      if (rotateCoefsY) {
        rotateY = moveCoordinate(e, rotateCoefsY);
        rotateY = `rotateY(${rotateY}deg)`;
      }
      if (rotateCoefsZ) {
        rotateZ = moveCoordinate(e, rotateCoefsZ);
        rotateZ = `rotateZ(${rotateZ}deg)`;
      }
      //scew
      if (skewCoefsX) {
        skewX = moveCoordinate(e, skewCoefsX);
        skewX = `skewX(${skewX}deg)`;
      }
      if (skewCoefsY) {
        skewY = moveCoordinate(e, skewCoefsY);
        skewY = `skewY(${skewY}deg)`;
      }
      //scale
      if (scaleCoefsX) {
        scaleX = moveCoordinate(e, scaleCoefsX, 10000);
        scaleX = `scaleX(${scaleX})`;
      }
      if (scaleCoefsY) {
        scaleY = moveCoordinate(e, scaleCoefsY, 10000);
        scaleY = `scaleY(${scaleY})`;
      }
      if (scaleCoefsZ) {
        scaleZ = moveCoordinate(e, scaleCoefsZ, 10000)
        scaleZ = `scale(${scaleZ})`;
      }
      parallaxItem.style.transform = `${translateX} ${translateY} ${translateZ} ${rotateX} ${rotateY} ${rotateZ} ${skewX} ${skewY} ${scaleX} ${scaleY} ${scaleZ}`;
    }
  });
})


function moveCoordinate(e, coefArr, coef = 100) {
  let calibrate = 0;
  if (coef === 10000) calibrate = 1;
  let move = `${((window.innerWidth / 2 - e.screenX) / coef * +coefArr[0]) + (((window.innerHeight / 2 - e.screenY) / coef * +coefArr[1])) + calibrate}`;

  return move;
}

function getAttrCoefs(item, attr) {
  let coefs = item.getAttribute(attr) ?? null;
  coefs = coefs ? coefs.split('/') : null;
  return coefs;
}
