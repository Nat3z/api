var active = false;
var init = false;
/**
* The Main Function for jSync
* @param Brackets Add '#' at the beginning of the text to label it as an id
* @param Astreiks Use 'document' to label the entire body
* @param Tags Use HTML Tags ex. h1, h2, h3, b, for all tags in the Body
*/
var $s = function (obj) {
    if (obj === this) {
        return;
    }
    if (obj === undefined) {
        return new noargs();
    }
    else if (obj == document) {
        return new body();
    }
    else if (obj.charAt(0) == "#") {
        var o = obj;
        o = o.replace("#", "");
        return new idbased(o);
    }
    else {
        return new tagbased(obj);
    }
};
var $event = /** @class */ (function () {
    function $event() {
    }
    $event.active = function (funct) {
        if (!active) {
            funct();
        }
    };
    $event.ready = function (funct) {
        if (init) {
            funct();
        }
    };
    /**
     * Event Onclick
     * @param  function
     */
    $event.click = function (funct) {
        active = true;
        document.addEventListener("click", function () {
            funct();
        });
        active = false;
    };
    return $event;
}());
var tagbased = /** @class */ (function () {
    function tagbased(object) {
        this.obj = object;
    }
    /**
     * Deletes The Given Object : Tags, IDs
     */
    tagbased.prototype.del = function () {
        active = true;
        var element = document.getElementsByTagName(this.obj), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        active = false;
    };
    tagbased.prototype.hide = function () {
        active = true;
        var element = document.getElementsByTagName(this.obj), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.style.visibility = "hidden";
            element[index].parentNode.removeChild(element[index]);
        }
        active = false;
    };
    tagbased.prototype.css = function (style, newval) {
        active = true;
        var element = document.getElementsByTagName(this.obj), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.style.setProperty(style, newval);
        }
        active = false;
    };
    tagbased.prototype.forEach = function (funct) {
        active = true;
        var element = document.getElementsByTagName(this.obj), index;
        for (index = element.length - 1; index >= 0; index--) {
            funct(element[index]);
        }
        active = false;
    };
    tagbased.prototype.only = function (numb) {
        return new only(this.obj, numb);
    };
    return tagbased;
}());
var only = /** @class */ (function () {
    function only(object, numb) {
        this.obj = object;
        this.numb = numb;
        /**
        * Returns The Value of Text if the ID Provided is an input : IDs
        */
        this.val = document.getElementsByTagName(this.obj)[this.numb].value;
        this.object = document.getElementsByTagName(this.obj)[this.numb];
        this.text = document.getElementsByTagName(this.obj)[this.numb].textContent;
    }
    /**
     * Deletes The Given Object : Tags, IDs
     */
    only.prototype.del = function () {
        document.getElementsByTagName(this.obj)[this.numb].remove();
    };
    /**
    * Adds content to the Body : Body
    * @param HTML
    */
    only.prototype.add = function (HTML) {
        document.getElementsByTagName(this.obj)[this.numb].innerHTML += HTML;
    };
    /**
    * Resets The Value of Object (Only For Inputs) : IDs
    */
    only.prototype.clear = function () {
        document.getElementsByTagName(this.obj)[this.numb].value = null;
    };
    /**
    * Sets the text of the given ID : IDs
    * @param text
    */
    only.prototype.setText = function (text) {
        document.getElementsByTagName(this.obj)[this.numb].textContent = text;
    };
    /**
    * Sets the HTML of the given ID : IDs
    * @param HTML
    */
    only.prototype.setHTML = function (text) {
        document.getElementsByTagName(this.obj)[this.numb].innerHTML = text;
    };
    /**
    * Hides the Current Object
    */
    only.prototype.hide = function () {
        document.getElementsByTagName(this.obj)[this.numb].style.visibility = "hidden";
    };
    /**
    * Shows the Current Object
    */
    only.prototype.show = function () {
        document.getElementsByTagName(this.obj)[this.numb].style.visibility = "visible";
    };
    only.prototype.link = function (url) {
        active = true;
        document.getElementsByTagName(this.obj)[this.numb].addEventListener("click", function () {
            window.location = url;
        });
        document.getElementsByTagName(this.obj)[this.numb].style.cursor = "pointer";
        active = false;
    };
    only.prototype["do"] = function (func) {
        active = true;
        func(document.getElementsByTagName(this.obj)[this.numb]);
        active = false;
    };
    only.prototype.addClass = function (cls) {
        active = true;
        document.getElementsByTagName(this.obj)[this.numb].classList.add(cls);
        active = false;
    };
    only.prototype.removeClass = function (cls) {
        document.getElementsByTagName(this.obj)[this.numb].classList.remove(cls);
    };
    only.prototype.css = function (style, newval) {
        document.getElementsByTagName(this.obj)[this.numb].style.setProperty(style, newval);
    };
    only.prototype.keyPress = function (funct) {
        document.getElementsByTagName(this.obj)[this.numb].addEventListener("keypress", function (theKey) {
            funct(theKey.key);
        });
    };
    only.prototype.click = function (funct) {
        document.getElementsByTagName(this.obj)[this.numb].addEventListener("click", function () {
            funct();
        });
    };
    return only;
}());
var idbased = /** @class */ (function () {
    function idbased(object) {
        this.obj = object;
        /**
         * Returns The Value of Text if the ID Provided is an input : IDs
         */
        this.val = document.getElementById(this.obj).value;
        this.object = document.getElementById(this.obj);
        this.text = document.getElementById(this.obj).textContent;
    }
    /**
     * Deletes The Given Object : Tags, IDs
     */
    idbased.prototype.del = function () {
        document.getElementById(this.obj).remove();
    };
    /**
     * Adds content to the Body : Body
     * @param HTML
     */
    idbased.prototype.add = function (HTML) {
        document.getElementById(this.obj).innerHTML += HTML;
    };
    /**
     * Resets The Value of Object (Only For Inputs) : IDs
     */
    idbased.prototype.clear = function () {
        document.getElementById(this.obj).value = null;
    };
    /**
     * Sets the text of the given ID : IDs
     * @param text
     */
    idbased.prototype.setText = function (text) {
        document.getElementById(this.obj).textContent = text;
    };
    /**
     * Sets the HTML of the given ID : IDs
     * @param HTML
     */
    idbased.prototype.setHTML = function (text) {
        document.getElementById(this.obj).innerHTML = text;
    };
    /**
     * Hides the Current Object
     */
    idbased.prototype.hide = function () {
        document.getElementById(this.obj).style.visibility = "hidden";
    };
    /**
     * Shows the Current Object
     */
    idbased.prototype.show = function () {
        document.getElementById(this.obj).style.visibility = "visible";
    };
    idbased.prototype.link = function (url) {
        active = true;
        document.getElementById(this.obj).addEventListener("click", function () {
            window.location = url;
        });
        document.getElementById(this.obj).style.cursor = "pointer";
        active = false;
    };
    idbased.prototype["do"] = function (func) {
        active = true;
        func(document.getElementById(this.obj));
        active = false;
    };
    idbased.prototype.addClass = function (cls) {
        active = true;
        document.getElementById(this.obj).classList.add(cls);
        active = false;
    };
    idbased.prototype.removeClass = function (cls) {
        active = true;
        document.getElementById(this.obj).classList.remove(cls);
    };
    idbased.prototype.css = function (style, newval) {
        document.getElementById(this.obj).style.setProperty(style, newval);
    };
    idbased.prototype.keyPress = function (funct) {
        document.getElementById(this.obj).addEventListener("keypress", function (theKey) {
            funct(theKey.key);
        });
    };
    idbased.prototype.click = function (funct) {
        document.getElementById(this.obj).addEventListener("click", function () {
            funct();
        });
    };
    return idbased;
}());
var body = /** @class */ (function () {
    function body() {
    }
    /**
     * Adds content to the Body : Body
     * @param HTML
     */
    body.prototype.add = function (contents) {
        document.body.innerHTML += contents;
    };
    return body;
}());
var cookies = /** @class */ (function () {
    function cookies() {
    }
    /**
     * Creates A Cookie
     * @param cname
     * @param cvalue
     * @param exdays
     */
    cookies.prototype.createCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    /**
     * Gets A Cookie
     * @param cname
     * @returns
     */
    cookies.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    return cookies;
}());
var noargs = /** @class */ (function () {
    function noargs() {
        this.cookie = new cookies();
    }
    /**
     * Create a Static-based PHP (Recommended only for Github Pages)
     */
    noargs.prototype.getUrlValues = function (name, url) {
        if (url === void 0) { url = window.location.href; }
        active = true;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        active = false;
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    /**
     * Simple Random Number Generator For Your Website
     * @param upto
     */
    noargs.prototype.random = function (upto) {
        return Math.floor(Math.random() * upto);
    };
    /**
     * Checks if it contains a certain string
     * @param object
     * @param string
     */
    noargs.prototype.contains = function (ob, string) {
        active = true;
        if (ob.indexOf(string) >= 0) {
            active = false;
            return true;
        }
        active = false;
        return false;
    };
    /**
     * Get The JSON Data Of A Given URL
     * @param url
     * @param function(data)
     */
    noargs.prototype.getJSON = function (url, funct) {
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            funct(data);
        });
    };
    return noargs;
}());
init = true;
