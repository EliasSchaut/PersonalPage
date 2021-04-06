/**
 * This class manages cookies.
 */
function Cookie() {

    // ----------------------------
    // Global Variables
    // ----------------------------
    let cookieValues = {
        "clicks": ""
    }

    const EX_TIME_IN_HOURS = 2;
    const COOKIE_NAME = "Cookie";
    // ----------------------------
    

    /**
     * Sets the cookie with the values cvalues and exhours
     * 
     * @param {Object} cvalues The values to be stored as a cookie
     */
    this.setCookie = function (cvalues) {
        let date = new Date();
        date.setTime(date.getTime() + (EX_TIME_IN_HOURS * 60 * 60 * 1000));

        document.cookie = `${COOKIE_NAME}=${JSON.stringify(cvalues)};expires=${date.toGMTString()}`;
    }


    /**
     * Gets the data from the cookie
     * */
    this.getData = function () {
        return cookieValues;
    }


    /**
     * Finds the cookie and fills its values in cookieValues
     * */
    let getCookie = function () {
        if (checkCookie()) {
            let subvalues = decodeURIComponent(document.cookie);
            cookieValues = JSON.parse(subvalues.split("=")[1]);
        }
    }


    /**
     * Checks whether the cookie is valid and if so, the data is set from the cookie
     * */
    let checkCookie = function () {
        if (document.cookie === "") {
            cookieValues.clicks = "0";
            return false;
        }

        return true;

    }


    // Constructor
    getCookie();
    console.log(cookieValues)
}
