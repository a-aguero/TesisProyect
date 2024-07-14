function ShowMokup(flag, id) {
    if (flag === true) {
        if (id === "" || id == null) {
            id = "*";
        }
        else {
            id = "#" + id;
        }
        var all = document.querySelectorAll(id);
        var color = 1000;
        var increment = 100;
        for (i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = '#' + Right('00000' + Math.abs(color).toString(16), 6);
            color += increment;
        }
    }
}

/*COLOR NOVEDADES DE VIDA Y SALUD */
function GetActionColor(type) {
    switch (type) {

        case 'INCLUSION':
            return '#28a74542'
        case 'EXCLUSION':
            return '#dc35452e'
        case 'REACTIVACION':
            return '#ffc10742'
        case 'CAMBIO_PLAN':
            return '#007bff3d'
        default:
            return '#FFFFFF'
    }
}


function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}



function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}


/*Make a text box a number*/
function MakeNumber(event, dec) {
    var charCode = (event.which) ? event.which : event.keyCode;
    var element = event.target;
    var value = element.value;
    value = value.replace(value.substring(element.selectionEnd, element.selectionStart), '');
    if (charCode == 8 // enter
        || charCode == 9 // tab
        || charCode == 37 // izquierda
        || charCode == 39 // derecha
        || charCode == 46 // delete
    ) {
        return true;
    }
    /*si el decimal es cero no debe permiter punto*/
    if (charCode == 46 && dec <= 0) {
        return false;
    }
    /*falso por duplicidad del '-' y el '.' */
    if (charCode == 46 && value.indexOf('.') >= 0) {
        return false;
    }
    if (charCode == 45 && value.indexOf('-') >= 0) {
        return false;
    }
    /*inserta si es un numero antes del punto*/
    if (charCode >= 48 && charCode <= 57 && !value.indexOf('.') >= 0) {
        return true;
    }
    /*inserta si es un punto si el decimal es mayor a 0 y no hay puntos*/
    if (isInteger(dec) && dec > 0 && charCode == 46 && !value.indexOf('.') >= 0) {
        return true;
    }

    if (charCode >= 48 && charCode <= 57 && isInteger(dec) && dec > 0 && value.indexOf('.') >= 0
        && value.substring(value.indexOf('.') + 1, value.length).length < dec) {
        return true;
    }
    //if (((charCode >= 48 && charCode <= 57) ||
    //    charCode == 45 && !value.includes('-') ||
    //    charCode == 46 && !value.includes('.') && isInteger(dec) && dec > 0
    //    ) && value.length - (element.selectionEnd - element.selectionStart) == 0) {
    //    return true;
    //}

    return false;
}


/* Check is Float*/
function isFloat(number) {
    return parseFloat(number) === number;
}


/* Check is integer*/
function isInteger(number) {
    return parseInt(number) === number;
}


/* Make a textbox value positive*/
function MakePositive(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 8 // enter
        || charCode == 9 // tab
        || charCode == 37 // izquierda
        || charCode == 39 // derecha
        || charCode == 46 // delete
    ) {
        return true;
    }
    //return !isNaN(String.fromCharCode(charCode));
    if (event.target.value + String.fromCharCode(charCode) >= 0)
        return true;
    else return false;
}

/*verifica si hay texto seleccionado*/
function IsTextSelected(input) {
    var startPos = input.selectionStart;
    var endPos = input.selectionEnd;
    var doc = document.selection;
    if (doc && doc.createRange().text.length != 0) {
        return true;
    } else if (!doc && input.value.substring(startPos, endPos).length != 0) {
        return true;
    }
    return false;
}



function CheckWordRecusively(element, word, flagInit) {
    var flagNow = flagInit;
    if (flagNow) {
        return flagNow;
    }
    flagNow = element.textContent.toString().search(new RegExp(word, "i")) > -1;
    if (flagNow) {
        return flagNow;
    }
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].hasChildNodes()) {
            flagNow = CheckWordRecusively(element.childNodes[i], word, flagNow)
        }
        if (flagNow) {
            return flagNow;
        }
    }
    return flagNow;
}



function RemoveClass(element, className) {
    element.className = element.className.replace(className.trim(), "");
}


function AddClass(element, className) {
    RemoveClass(element, className);
    element.className += " " + className.trim();
}


function FinderByWords(word, levelTags) {
    elements = document.querySelectorAll(levelTags);
    for (var i = 0; i < elements.length; i++) {
        if (word === "" || CheckWordRecusively(elements[i], word, false)) {
            RemoveClass(elements[i], "hide");
            AddClass(elements[i], "show");
        } else {
            RemoveClass(elements[i], "show");
            AddClass(elements[i], "hide");
        }
    }
}






function ShowerElements(event, levelTags) {

    var charCode = (event.which) ? event.which : event.keyCode;
    var element = event.target;
    var value = element.value;
    var word = value; /*+ String.fromCharCode(charCode);*/
    var containers = FinderByWords(word, levelTags);
}


function ShowAlert(mensaje) {
    if (mensaje != "") alert(mensaje);
}


function ChangeUri(query, uri) {
    document.querySelector(query).setAttribute('href', uri)
}

/*fullscream request*/
function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(el) {
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return false
}

function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        requestFullScreen(elem);
    }
    return isInFullScreen;
}

function toggleFullToElementPath(element, image_path) {
    var isInFullScreen = toggleFull();
    if (isInFullScreen) {
        element.style.background = "url(" + image_path + ") center no-repeat";
    }
    else {
        /*imagen pantalla completa*/
        image_path = image_path.replace(".png", "-exit.png");
        element.style.background = "url(" + image_path + ") center no-repeat";
    }
}


function hover_class(ele, hover_class) {
    var elements = document.getElementsByClassName(hover_class);
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className.replace(hover_class, "");
    }
    ele.className = ele.className + " " + hover_class;
}

function active_class(ele, active_class) {
    var elements = document.getElementsByClassName(active_class);
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className.replace(active_class, "");
    }
    ele.className = ele.className + " " + active_class;
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function doCall(url, html_paramethers) {
    if (html_paramethers.trim() != "") {
        html_paramethers = '/?' + html_paramethers.trim()
    }
    window.location.href = url + html_paramethers;
}


function doCallAjax(url, parametherList, to) {
    $.get(url, parametherList,
        function (data) {
            $(to).html(data);
        },
        "html"
    );
}




/*Funciones para fechas*/
/*Funcion Para añadir dias a una fecha determinada*/
Date.prototype.addDays = function (n) {
    this.setDate(this.getDate() + n);
    return this;
};

Date.prototype.addWeeks = function (n) {
    this.setDate(this.getDate() + n * 7);
    return this;
};

Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

/*

  Date format

*/

/*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

/*

  Fin date format

*/


function GetDateProjection(payment_frequence, beginDate, times) {
    if ($.trim(payment_frequence) == "1") {
        beginDate.addDays(1 * times);
    }
    else if ($.trim(payment_frequence) == "2") {
        beginDate.addWeeks(1 * times);
    }
    else if ($.trim(payment_frequence) == "3") {
        beginDate.addWeeks(2 * times);
    }
    else if ($.trim(payment_frequence) == "4") {
        beginDate.addDays(15 * times);
    }
    else if ($.trim(payment_frequence) == "5") {
        beginDate.addMonths(1 * times);
    }
    else if ($.trim(payment_frequence) == "6") {
        beginDate.addMonths(2 * times);
    }
    else if ($.trim(payment_frequence) == "7") {
        beginDate.addMonths(3 * times);
    }
    else if ($.trim(payment_frequence) == "8") {
        beginDate.addMonths(6 * times);
    }
    else if ($.trim(payment_frequence) == "9") {
        beginDate.addMonths(12);
    }
    return beginDate;
}

/*fin funciones para fechas*/

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function setPage(event, querySelector) {
    $.get(event.getAttribute("href"), function (data) {
        $(querySelector).html(data)
    });
    return false;
}

function teleportation(From, To) {
    debugger;
    From.filter("input, select, textarea").each(function (index) {
        var Control = $(this);
        var ToControl = To.filter("[name$='" + Control.attr("name") + "']");
        if (ToControl.length == 0) {
            ToControl = To.find("[name$='" + Control.attr("name") + "']");
        }
        if (ToControl.is(Control)) {
            // Si es igual no realiza el cambio
        }
        else {
            ToControl.val(Control.val());
        }
    });
    From.find("input, select, textarea").each(function (index) {
        var Control = $(this);
        var ToControl = To.filter("[name$='" + Control.attr("name") + "']");
        if (ToControl.length == 0) {
            ToControl = To.find("[name$='" + Control.attr("name") + "']");
        }
        if (ToControl.is(Control)) {
            // Si es igual no realiza el cambio
        }
        else {
            ToControl.val(Control.val());
        }
    });
}
/**
from: Plain Object, Query Selector [inputs, selects, textareas]
rel: Plain Object
to: Plain Object, Query Selector [inputs, selects, textareas]
bind: bool 
**/
function zeroPad(num, places) {
    if (!num) return num;
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function stir_error(inputs, error_class) {
    inputs.removeClass(error_class);
}
function set_error(inputs, error_class) {
    inputs.addClass(error_class);
}
function rename_table(table) {
    var rows = table.find("tbody tr");
    rows.each(function (i) {
        $(this).find(":input").each(function () {
            $(this).prop("name", $(this).prop("name").replace(/\[[0-9]*\]/ig, "[" + i.toString() + "]"));
        });
    });
}
function data_generator(count, f_content) {
    var result = [];
    if (typeof (f_content) == "function") {
        for (var i = 0; i < count; i++) {
            result.push(f_content(i));
        }
    } else {
        for (var i = 0; i < count; i++) {
            result.push(f_content);
        }
    }
    return result;
}
function data_select(json, d_temp, d_value, d_selected, d_disabled, f_label) {
    var select = d_temp;
    if ((select || "") == "") {
        $.each(json, function (i, obj) {
            var t_value = "";
            var t_label = "";
            var t_selected = "";
            var t_disabled = "";
            var d_value_arry = "";
            for (var i = 0; i < (d_value || "").split(",").length; i++) {
                var d_value_temp = (d_value || "").split(",")[i];
                if (obj[d_value_temp])
                    d_value_arry = d_value_arry + obj[d_value_temp];
                if (i < (d_value || "").split(",").length - 1)
                    d_value_arry = d_value_arry + ",";
            }
            if (d_value_arry != "")
                t_value = " value='" + d_value_arry + "'";
            if (obj[d_selected])
                t_selected = " selected='" + obj[d_selected].toString() + "'"
            if (obj[d_disabled])
                t_disabled = " disabled='" + obj[d_disabled].toString() + "'"
            t_label = f_label(obj);
            select += "<option " + t_value + t_selected + t_disabled + " >" + t_label + "</option>";
        });
    }
    return select;
}

function teleportation2(from, rel, to, bind) {
    if (from.constructor === Object) {
        from = from;
    }
    else if (from.constructor === jQuery) {
        var from_temp = from.serializeJson();
        from = ($.isEmptyObject(from_temp)) ? from.find(":input").serializeJson() : from_temp;
    }
    else if (from.constructor === Array) {
        var obj = from.reduce(function (o, v, i) {
            o[i] = v;
            return o;
        }, {});
    }
    to_temp = to.find(":input");
    if (to_temp.length > 0) {
        to = to_temp;
    }
    else {
        to = to.filter(":input");
    }
    $.each(from, function (i_rel, obj_rel) {
        var temp = to.filter(function () {
            if (!bind && rel[i_rel] == this.name) {
                return true;
            }
            return (rel[i_rel] ? rel[i_rel] : new RegExp("^[a-zA-Z0-9 ,]+$")).test(this.name)
        }).val(obj_rel);
    });

}
$.fn.serializeJson = function () {
    var json = {};
    jQuery.map(jQuery(this).serializeArray(), function (n, i) {
        var _ = n.name.indexOf('[');
        if (_ > -1) {
            var o = json;
            _name = n.name.replace(/\]/gi, '').split('[');
            for (var i = 0, len = _name.length; i < len; i++) {
                if (i == len - 1) {
                    if (o[_name[i]]) {
                        if (typeof o[_name[i]] == 'string') {
                            o[_name[i]] = [o[_name[i]]];
                        }
                        o[_name[i]].push(n.value);
                    }
                    else o[_name[i]] = n.value || '';
                }
                else o = o[_name[i]] = o[_name[i]] || {};
            }
        }
        else {
            if (json[n.name] !== undefined) {
                if (!json[n.name].push) {
                    json[n.name] = [json[n.name]];
                }
                json[n.name].push(n.value || '');
            }
            else json[n.name] = n.value || '';
        }
    });
    return json;
};

$.fn.da_validate = function (settings) {
    var da_options = {
        "init": function () { },
        "validate": function (form) {
            var da_options = this;
            var errors = [];
            var input_v = form.find("[required]:input,[data-da-options]:input");
            input_v.removeClass(da_options.error_class);
            $.each(input_v.filter("[required]"), function (i) {
                if ($(this).val() == "") {
                    $(this).addClass(da_options.error_class);
                    errors.push({
                        name: $(this).prop("name"),
                        error_message: (($(this).data("daOptions")) ? $(this).data("daOptions")["requiredMessage"] : $(this).data("daRequiredMessage")) || "Campo es requerido",
                        value: $(this).val()
                    });
                }
            });
            $.each(input_v.filter("[data-da-options]"), function (i) {
                var target = $(this);
                //debugger;
                $.each(target.data("daOptions"), function (index, value) {
                    index = index.toLowerCase();
                    //debugger;
                    if ("required".toLowerCase() == index && (/^(true|1)$/i).test(value) && ($(target).val() || "").trim() == "") {
                        $(target).addClass(da_options.error_class);
                        errors.push({
                            name: $(target).prop("name"),
                            error_message: (($(target).data("daOptions")) ? $(target).data("daOptions")["requiredMessage"] : $(target).data("daRequiredMessage")) || "Campo es requerido" + value,
                            value: $(target).val()
                        });
                    }
                    else if ("minLength".toLowerCase() == index && $(target).val().length < parseInt(value)) {
                        $(target).addClass(da_options.error_class);
                        errors.push({
                            name: $(target).prop("name"),
                            error_message: (($(target).data("daOptions")) ? $(target).data("daOptions")["minLengthMessage"] : $(target).data("daMinLengthMessage")) || "Campo no debe ser menor a " + value,
                            value: $(target).val()
                        });
                    }
                    else if ("maxLength".toLowerCase() == index && $(target).val().length > parseInt(value)) {
                        $(target).addClass(da_options.error_class);
                        errors.push({
                            name: $(target).prop("name"),
                            error_message: (($(target).data("daOptions")) ? $(target).data("daOptions")["maxLengthMessage"] : $(target).data("daMaxLengthMessage")) || "Campo no debe ser mayor a " + value,
                            value: $(target).val()
                        });
                    }
                });
            });
            return errors;
        },//before success, error
        "success": function () { },
        "error": function (errors) { },
        "submit": function (event) { }, // after success, error
        "error_class": "da_error"
    }
    $.extend(da_options, settings);
    var glob_fun = function (event) {
        //da_options.init();
        var form = $(event.target);
        var errors = da_options.validate(form);
        if ((errors || []).length <= 0) {
            da_options.success();
            da_options.submit(event);
        }
        else {
            da_options.error(errors);
            event.preventDefault();
        }
    }
    var form = jQuery(this);
    form.on("submit", glob_fun);
};

function setTextContents($elem, text) {
    $elem.contents().filter(function () {
        if (this.nodeType == Node.TEXT_NODE) {
            this.nodeValue = text;
        }
    });
}

String.prototype.left = function (n) {
    if (n <= 0)
        return "";
    else if (n > this.length)
        return this;
    else
        return this.substring(0, n);
}

String.prototype.right = function (n) {
    if (n <= 0)
        return "";
    else if (n > this.length)
        return this;
    else {
        var iLen = this.length;
        return this.substring(iLen, iLen - n);
    }
}

function addDangerAlert(form, ec, inputs, errorClass, message) {
    form.find(ec + " >").remove();
    form.find(":input").removeClass(errorClass);
    $.each(inputs, function (i, obj) {
        form.find("[name='" + obj + "']").addClass(errorClass);
    });
    var html = "";
    html += '<div class="alert alert-danger"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>';
    html += message
    html += '</strong></div>'
    if (message.trim() != "")
        form.find(ec).html(html);
}

function addSuccessAlert(form, ec, inputs, errorClass, message) {
    form.find(ec + " >").remove();
    form.find(":input").removeClass(errorClass);
    $.each(inputs, function (i, obj) {
        form.find("[name='" + obj + "']").addClass(errorClass);
    });
    var html = "";
    html += '<div class="alert alert-success"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>';
    html += message
    html += '</strong></div>'
    if (message.trim() != "")
        form.find(ec).html(html);
}

function table_secuence(table, col, pad) {
    var row = table.find("tbody tr");
    $.each(row, function (index, r) {
        $(r).find("td:nth-child(" + col + ") span").remove();
        $(r).find("td:nth-child(" + col + ")").append("<span>" + zeroPad(($(r).index() + 1).toString(), pad) + "</span>");
    });
}

function currencyFormat(num, position = 2) {

    if (typeof num == "undefined") {
        return Number("0.00").toFixed(position).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    } 

    if (num.constructor == String)
        num = num.replace(/[, ]/ig, "");
    return Number(num).toFixed(position).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function documentDescFormat(documentType_ID, documentDesc) {
    if (documentType_ID == "1")
        return (documentDesc || "").trim().substring(0, 3) + "-" + (documentDesc || "").trim().substring(3, 8) + "-" + (documentDesc || "").trim().substring(8);
    else if (documentType_ID == "2")
        return (documentDesc || "").trim().substring(0, 3) + "-" + (documentDesc || "").trim().substring(3, 10) + "-" + (documentDesc || "").trim().substring(10);
    else
        return documentDesc;
}

function phoneTypeFormat(phoneNumber) {
    if (phoneNumber)
        return (phoneNumber || "").trim().substring(0, 3) + "-" + (phoneNumber || "").trim().substring(3, 6) + "-" + (phoneNumber || "").trim().substring(6);
    else
        return phoneNumber || "";
}
function currentAge(dateFrom) {
    if ((dateFrom || "").length == 10) {
        var today = new Date();
        var dob = new Date(dateFrom.substring(6) + "-" + dateFrom.substring(3, 5) + "-" + dateFrom.substring(0, 2));
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    } else {
        return "";
    }
}


function tDataTypeControl(tDataType_ID, subName, info, mandatory) {
    //console.log(tDataType_ID, subName, info, mandatory);
    var html = "";
    switch (Number(tDataType_ID)) {
        case 1://Bool
            html += "<td>" + "<input  class='form-control form-control-sm CoverageValue' name=\"" + subName + "BoolValue\" type=\"checkbox\" value=\"true\" ><input name=\"" + subName + "BoolValue\" type=\"hidden\" value=\"false\">" + "</td>";
            break;
        case 2:
            var s = mandatory ? "" : "-Seleccionar-";
            var data = [];
            $.each(info.split(","), function (index, obj) {
                data.push({ "StringValue": obj, "StringDisplay": obj });
            });
            var select = (mandatory ? "" : "<option value=''>-Seleccionar-</option>") + data_select(data, "", "StringValue", "", "", function (d) {
                return d.StringDisplay;
            });
            html += "<td>" + "<select class='form-control form-control-sm CoverageValue' name='" + subName + "StringValue' >" + select + "</select>" + "</td>";
            break;
        case 3:
            html += "<td>" + "<input class='form-control form-control-sm  CoverageValue' name='" + subName + "DecimalValue' placeholder='Número' type='text' data-inputmask=\"'mask':'[9][9][9][9][9][9][9][9].[9][9]', 'placeholder':''\" style='text-align:right' >" + "</td>";
            break;
        case 4:
            //html += "<td>" + "<input name='SpecialDataAssigned[0].DecimalValue' type='text' data-inputmask=\"'mask':'[9][9][9].[9][9]', 'placeholder':''\" style='text-align:right' >" + "</td>";
            html += "<td>" + "<input class='form-control form-control-sm CoverageValue' name='" + subName + "DecimalValue' placeholder='%' type='text' data-inputmask-regex=\"(^100(\\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\\.[0-9]{1,2})?$)\" style='text-align:right' >" + "</td>";
            break;
        case 5:
            html += "<td>" + "<input class='form-control form-control-sm CoverageValue' name='" + subName + "StringValue' type='text' " + (info == "" ? "maxlength='50'" : info) + " >" + "</td>";
            break;
        case 6:
            var date = new Date();
            html += "<td>" + "<input class='form-control form-control-sm CoverageValue' name='" + subName + "DateValue' placeholder='dd/mm/yyyy' type='text' " + (mandatory ? "value=\"" + date.format("dd/mm/yyyy") + "\"" : "") + " data-inputmask=\"'mask':'99/99/9999', 'placeholder':' '\" >" + "</td>";
            break;
        case 7:
            html += "<td>" + "<input class='form-control form-control-sm CoverageValue' name='" + subName + "TimeValue' placeholder='HH:MM' type='text' data-inputmask-regex=\"([01]\\d|2[0-3]):([0-5]\\d)\" >";
            break;
        case 8:
            html += "<td style='text-align:center'>"
                + "<input class='form-control form-control-sm CoverageValue' name='" + subName + "StringValue' type='hidden' " + (info == "" ? "maxlength='500'" : info) + " >"
                + "<input id='specialdata_comment'  type='button' class='btn btn-primary btn-sm btn-block'  data-toggle='modal' data-toggle='modal' data-target='#comment_editor' value='Comentar'>" + "</td>";
            break;
    }
    return html;
}

function tDataTypeTrigger(tDataType_ID, row, json) {
    if (tDataType_ID == 1) {
        row.find("input[name$='.BoolValue']").prop("checked", json.BoolValue);
    }
    if (tDataType_ID == 2) {
        row.find("select[name$='.StringValue']").val(json.StringValue);
    }
    if (tDataType_ID == 3) {
        row.find("input[name$='.DecimalValue']").val(json.DecimalValue).inputmask();
    }
    if (tDataType_ID == 4) {
        row.find("input[name$='.DecimalValue']").val(json.DecimalValue).inputmask("Regex");
    }
    if (tDataType_ID == 5) {
        row.find("input[name$='.StringValue']").val(json.StringValue);
        if (row.find("input[name$='.StringValue']").attr("data-inputmask-regex"))
            row.find("input[name$='.StringValue']").inputmask("Regex");
        if (row.find("input[name$='.StringValue']").attr("data-inputmask"))
            row.find("input[name$='.StringValue']").inputmask();
    }
    if (tDataType_ID == 6) {
        row.find("input[name$='.DateValue']").val(json.DateValue).inputmask().datepicker({ dateFormat: 'dd/mm/yy', changeYear: true });
    }
    if (tDataType_ID == 7) {
        row.find("input[name$='.TimeValue']").val(json.TimeValue).inputmask("Regex");
    }
    if (tDataType_ID == 8) {
    }
}
function tDataTypeFormat(tDataType_ID, row, json) {
    if (tDataType_ID == 1) {
    }
    if (tDataType_ID == 2) {
    }
    if (tDataType_ID == 3) {
        row.find("input[name$='.DecimalValue']").inputmask();
    }
    if (tDataType_ID == 4) {
        row.find("input[name$='.DecimalValue']").inputmask("Regex");
    }
    if (tDataType_ID == 5) {
        if (row.find("input[name$='.StringValue']").attr("data-inputmask-regex"))
            row.find("input[name$='.StringValue']").inputmask("Regex");
        if (row.find("input[name$='.StringValue']").attr("data-inputmask"))
            row.find("input[name$='.StringValue']").inputmask();
    }
    if (tDataType_ID == 6) {
        row.find("input[name$='.DateValue']").inputmask().datepicker({ dateFormat: 'dd/mm/yy', changeYear: true });
    }
    if (tDataType_ID == 7) {
        row.find("input[name$='.TimeValue']").inputmask("Regex");
    }
    if (tDataType_ID == 8) {
    }
}
function toDate(jDate) {
    if (jDate && jDate.constructor == String && jDate.indexOf("/Date(") >= 0)
        return new Date(Number(jDate.replace("/Date(", "").replace(")/", "")));
    else if (/[\d]{1,2}\/[\d]{1,2}\/[\d]{2}\s*[\d]{2}:[\d]{2}:[\d]{2}[\w\W]+/.test(jDate)) {
        var year = jDate.split("/")[2].split(" ")[0] >= 90 ? "19" + jDate.split("/")[2].split(" ")[0] : "20" + jDate.split("/")[2].split(" ")[0];
        var month = jDate.split("/")[1] - 1;
        var day = jDate.split("/")[0];
        var hours = jDate.split(" ")[1].split(":")[0];
        var minutes = jDate.split(" ")[1].split(":")[1];
        var seconds = jDate.split(" ")[1].split(":")[2];
        if (jDate.split("p.m.").length - 1 == 1) {
            hours = hours >= 12 ? 0 : hours;
            hours = (Number(hours) + 12);
        }
        var d = new Date(year, month, day, hours, minutes, seconds);
      //  console.log(d);
        return d;
    }
    else if (jDate && jDate.constructor == String && jDate.split("/").length - 1 == 2 && jDate.split(" ").length - 1 >= 1) {
        var year = jDate.split("/")[2].split(" ")[0] < 1000 ? "20" + jDate.split("/")[2].split(" ")[0] : jDate.split("/")[2].split(" ")[0];
        var month = jDate.split("/")[1] - 1;
        var day = jDate.split("/")[0];
        var hours = jDate.split(" ")[1].split(":")[0];
        var minutes = jDate.split(" ")[1].split(":")[1];
        var seconds = jDate.split(" ")[1].split(":")[2];
        if (jDate.split("p.m.").length - 1 == 1) {
            hours = hours >= 12 ? 0 : hours;
            hours = (Number(hours) + 12);
        }
        var d = new Date(year, month, day, hours, minutes, seconds);
        return d;
    }
    else if (jDate && jDate.constructor == String && jDate.split("/").length - 1 == 2)
        return new Date(jDate.split("/")[2] < 1000 ? "20" + jDate.split("/")[2] : jDate.split("/")[2], jDate.split("/")[1] - 1, jDate.split("/")[0]);
    else if (jDate && jDate.constructor == String && jDate.split("-").length - 1 == 2 && jDate.split("-")[0].length == 4)
        return new Date(jDate.split("-")[0], jDate.split("-")[1] - 1, jDate.split("-")[2]);
    else if (jDate && jDate.constructor == String)
        return new Date(jDate.substring(0, 4), jDate.substring(4, 6) - 1, jDate.substring(6, 8));
    else return jDate || "";
}
function make_inputs(type, obj, container, indexs) {
    var html = "";
    $.each(indexs.split(","), function (i, index) {
        var value = "value";
        if (obj[index]) value = "value='" + obj[index] + "'";
        html += ("<input name='" + container + "." + index + "' type='" + type + "' " + value + " >");
    });
    return html;
}
function mass_assignment(container, inputs, val) {
    var inputsTags = "";
    if (inputs.constructor == String) {
        $.each(inputs.split(","), function (i, input) {
            inputsTags += ",[name='" + input.trim() + "']"
        });
        inputsTags = inputsTags.substring(1);
    }
    else if (inputs.constructor == Array) {
        $.each(inputs.split(","), function (i, input) {
            inputsTags += ",[name='" + input.trim() + "']"
        });
        inputsTags = inputsTags.substring(1);
    }
    return container.find(inputsTags).val(val);
}
function data_function(url, data, func) {
    $.post(url, data, function (json) {
        func(json[0]);
    });
}
function columnMask(inputs_h, column_s, mask) {
    inputs_h.prop("type", "hidden").prop("disabled", false);
    var column_h = "";
    var affected = [];
    $.each(inputs_h, function (i, obj) {
        obj = $(obj);
        var new_i;
        var parent = obj.parent();
        if (parent.find("[name$='" + column_s + "']").length > 0) {
            new_i = parent.find("[name$='" + column_s + "']");
        }
        else {
            column_h = obj.prop("name").slice(obj.prop("name").indexOf(".") + 1, obj.prop("name").length);
            var cl = obj.clone();
            cl.prop("id", cl.prop("id").replace(new RegExp(column_h + "$"), "") + column_s);
            cl.prop("name", cl.prop("name").replace(new RegExp(column_h + "$"), "") + column_s).prop("type", "text");
            cl.removeAttr("data-inputmask");
            parent.append(cl);
            new_i = parent.find("[name$='" + column_s + "']");
            new_i.inputmask(mask, { numericInput: true });
        }
        new_i.val(obj.val());
        affected.push({ "old": obj, "new": new_i });
    });
    $.each(affected, function (i, o) {
        parent = o["old"].closest("table");
        if (parent.length <= 0)
            parent = o["old"].parent();
        var old_i = $(o["old"]);
        var new_i = $(o["new"]);
        parent.off("keydown keyup change", "[name='" + new_i.prop("name") + "']").on("keydouwn keyup change", "[name='" + new_i.prop("name") + "']", function (event) {
            old_i.val($(this).val().replace(/[^0-9\.]/ig, ""));
        });
        parent.off("blur", "[name='" + new_i.prop("name") + "']").on("blur", "[name='" + new_i.prop("name") + "']", function (event) {
            var number = $(this).val().replace(/[^0-9\.]/ig, "");
            old_i.val(number);
            if (number == "")
                $(this).val("")
            else
                $(this).val(currencyFormat(number));
        });
        parent.off("focus", "[name='" + new_i.prop("name") + "']").on("focus", "[name='" + new_i.prop("name") + "']", function (event) {
            $(this).select();
        });
    });
    return;
}
jQuery.fn.fixedHeaders2 = function () {
    var table = $(this);
    if ($(this).find("table").length == 1)
        table = $(this).find("table");
    if ($(this).find("table").length > 1)
        table = $(this).find("table").last();
    if (table.parent().parent().find("#wraphead").length <= 0) {
        var height = table.data("da-height");
        var wrapbody = table.wrap("<div style='max-height:" + height + ";overflow-y: auto;'></div>").parent();
        wrapbody.prop("id", "wrapbody");
        var headers = table.find("thead tr").clone();
        wrapbody.before("<div style='overflow-y: auto;'><table class='table table-sm text-nowrap table-hover'><thead><tr>" + headers.html() + "</tr></thead></table></div>");
        var wraphead = wrapbody.parent().find("div:not(#wrapbody)")
        wraphead.prop("id", "wraphead");
        wraphead.find("table").css("margin-bottom", "0px");

        /*HIDE TABLE HEAD*/
        table.find("thead tr th").css("background", "transparent").css("color", "transparent").css("border-color", "transparent");
        table.css("margin-top", (-table.find("thead tr").height()) + "px");
        /*FIN HIDE TABLE HEAD*/

        var timingID = window.setInterval(function () {
            var plus = 1.8;
            if (wrapbody.hasScrollBar()) {
                wraphead.css("width", (wrapbody.find("table thead tr").width() + 1) + "px");
            }
            $.each(wrapbody.find("table thead tr th"), function (i, th) {
                var th = $(th);
                $(wraphead.find("table thead tr th")[i]).css("width", (th.width() + plus) + "px");
            });
            table.css("margin-top", (-table.find("thead tr").height()) + "px");
        }, 500);
      //  console.log("created timingID : " + timingID);
        table.on("remove", function () {
           //console.log("removed timingID : " + timingID);
            clearInterval(timingID);
        });
    }
    return $(this);
}
jQuery.fn.hasScrollBar = function () {
    //
    if ($(this).height() < $(this).find(">").innerHeight()) {
        return true;
    } else {
        return false;
    }
}
jQuery.fn.sum = function () {
    var vsum = 0.0;
    $.each($(this), function (i, inp) {
        vsum += Number($(inp).val().replace(/,/ig, ""));
        vsum = Math.round(vsum * 100) / 100;
    });
    return vsum;
}
function fill_table(form, table, url, data, name, hiddens) {
    table = table.filter(":last");
    table.find("tbody tr").remove();
    $.post(url, data).then(function (json) {
        $.each(json, function (i1, row) {
            var html = "<tr>", html_h = "";
            $.each(hiddens.split(","), function (i2, hidden) {
                html_h += "<input type='hidden' name='" + name + "[0]." + hidden + "' value='" + row[hidden] + "' >";
            });
            var html_s = "";
            $.each(table.find("thead:last th"), function (i3, col) {
                var col_show = $(col).data("da-show");
                var style = get_style({
                    "text-align": $(col).data("da-align")
                });
                style = style != "" ? "style='" + style + "'" : "";
                row[col_show] = get_format(row[col_show], $(col).data("da-format"));
                if (i3 == 0) {
                    html_s += `<td>${html_h}<span>${row[col_show]}</span></td>`;
                }
                else if ($(col).data("da-insert")) {
                    html_s += `<td ${style}>${$(col).data("da-insert")}</td>`;
                }
                else if (row[col_show]) {
                    html_s += `<td ${style}>${row[col_show]}</td>`;
                }
                else {
                    html_s += `<td ${style}></td>`;
                }
            });
            html += html_s + "</tr>";
            table.find("tbody").append(html);
            rename_table(table);
            var row = table.find("tbody tr:last-child");
        });
    });
}


function fill_table(form, table, url, data, name, hiddens, loading) {
    table = table.filter(":last");
    table.find("tbody tr").remove();
    loading.show();
    $.post(url, data).then(function (json) {
        loading.hide();
        $.each(json, function (i1, row) {
            var html = "<tr>", html_h = "";
            $.each(hiddens.split(","), function (i2, hidden) {
                html_h += "<input type='hidden' name='" + name + "[0]." + hidden + "' value='" + row[hidden] + "' >";
            });
            var html_s = "";
            $.each(table.find("thead:last th"), function (i3, col) {
                var col_show = $(col).data("da-show");
                var style = get_style({
                    "text-align": $(col).data("da-align")
                });
                style = style != "" ? "style='" + style + "'" : "";
                row[col_show] = get_format(row[col_show], $(col).data("da-format"));
                if (i3 == 0) {
                    html_s += `<td>${html_h}<span>${row[col_show]}</span></td>`;
                }
                else if ($(col).data("da-insert")) {
                    html_s += `<td ${style}>${$(col).data("da-insert")}</td>`;
                }
                else if (row[col_show]) {
                    html_s += `<td ${style}>${row[col_show]}</td>`;
                }
                else {
                    html_s += `<td ${style}></td>`;
                }
            });
            html += html_s + "</tr>";
            table.find("tbody").append(html);
            rename_table(table);
            var row = table.find("tbody tr:last-child");
        });
    });
}


function get_style(j) {
    var style = "";
    $.each(j, function (i, val) {
        if ((val || "") != "")
            style += i + ":" + val + ";";
    });
    //style = style.slice(0, style.length - 1);
    return style;
}
function get_format(str, format) {
    format = (format || "").toLowerCase();
    if (format.indexOf("n") >= 0) {
        if (Number(str) && str != "") {
            str = currencyFormat(Number(str));
        }
    }
    else if (format.indexOf("d")) {

    }
    return str;
}
(function ($) {
    $.fn.extend({
        makeSortable: function (indexes) {
            var tableShorting = this;

            var getCellValue = function (row, index) {
                return $(row).children('td').eq(index).text();
            };
            var headers = tableShorting.find("th").toArray();
            for (header of headers) {
                header.last_sort = false;
            }
            tableShorting.find("th").click(function () {
                var shortTable = $(this).parents('table').eq(0);
                var shortIndex = $(this).index();
                // Sort by the given filter
                if (indexes && !indexes.split(",").some(x => x == (shortIndex + ""))) {
                    return;
                }

                var rows = shortTable.find('tr:gt(0)').toArray().sort(function (a, b) {
                    var valA = getCellValue(a, shortIndex), valB = getCellValue(b, shortIndex);

                    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
                });
                this.asc = !this.asc;
                this.last_sort = true;
                if (!this.asc) {
                    rows = rows.reverse();
                }
                for (var i = 0; i < rows.length; i++) {
                    shortTable.append(rows[i]);
                }
            });
        },
        doShorting: function (shortIndex) {
            var shortTable = this;
            var asc = true;
            var headers = shortTable.find('th').toArray();
            if (shortIndex >= 0) {
                asc = headers[shortIndex].asc;
            }
            else {
                for (var header of headers) {
                    if (header.last_sort) {
                        shortIndex = $(header).index();
                        asc = header.asc;
                    }
                }
            }
            if (!(shortIndex >= 0)) {
                return;
            }
            debugger;
            var getCellValue = function (row, index) {
                return $(row).children('td').eq(index).text();
            };

            var rows = shortTable.find('tr:gt(0)').toArray().sort(function (a, b) {
                var valA = getCellValue(a, shortIndex), valB = getCellValue(b, shortIndex);

                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
            });
            if (!asc) {
                rows = rows.reverse();
            }
            for (var i = 0; i < rows.length; i++) {
                shortTable.append(rows[i]);
            }
        }
    });
})(jQuery);


/*funciones propias de una vista*/
/*Home/Login*/
function Home_Login_Init() {
    var user_name = document.querySelector('#textbox_user_name').value;
    var uri = document.querySelector('#link_forgotten_password').getAttribute('href');
    uri = uri.replace('{mail}', user_name);
    ChangeUri('#link_forgotten_password', uri);
}



function StepShow(inside, query_selector) {
    inside.children("div:not(" + query_selector + ")").hide();
    inside.children("div" + query_selector).show();
}

function SetMessage(type, title, text, IsTime = false, useTimer = false) {
    //type success, error, warning,  info, question
    var Time = 3600000;
    if (useTimer) {
        Time = 2000;
    }
    if (IsTime) {
        setTimeout(() => {
            Swal.fire({
                icon: type,
                title: title,
                html: text,
                timer: Time,
                allowEnterKey: true,
                allowOutsideClick: true,
                backdrop: `rgba(0, 0, 0, 0.71)  `,
            });
        }, 300)
    } else {
        Swal.fire({
            icon: type,
            title: title,
            timer: Time,
            html: text,
            allowEnterKey: true,
            allowOutsideClick: true,
            backdrop: `rgba(0, 0, 0, 0.71)  `,
        });
    }
}
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
