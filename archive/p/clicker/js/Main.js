

window.onload = function () {
   let cookie = new Cookie();
   let cdata = cookie.getData();
   let clicker = new Clicker(cdata.clicks);


   window.onbeforeunload = function () {
      cookie.setCookie({"clicks": `${clicker.getClicks()}`});
   }

};