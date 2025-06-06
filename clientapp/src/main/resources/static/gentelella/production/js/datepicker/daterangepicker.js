!(function (t, e) {
  if ("function" == typeof define && define.amd)
    define(["moment", "jquery", "exports"], function (a, i, s) {
      t.daterangepicker = e(t, s, a, i);
    });
  else if ("undefined" != typeof exports) {
    var a,
      i = require("moment");
    try {
      a = require("jquery");
    } catch (s) {
      if (((a = window.jQuery), !a))
        throw new Error("jQuery dependency not found");
    }
    e(t, exports, i, a);
  } else
    t.daterangepicker = e(
      t,
      {},
      t.moment,
      t.jQuery || t.Zepto || t.ender || t.$
    );
})(this, function (t, e, a, i) {
  var s = function (t, e, a) {
    ("object" != typeof e || null === e) && (e = {});
    var s = "";
    "string" == typeof e.calender_style && (s = e.calender_style),
      (this.parentEl = "body"),
      (this.element = i(t)),
      (this.isShowing = !1);
    var n =
      '<div class="daterangepicker dropdown-menu ' +
      s +
      '"><div class="calendar first left"></div><div class="calendar second right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input"><label for="daterangepicker_start"></label><input class="input-mini" type="text" name="daterangepicker_start" value="" /></div><div class="daterangepicker_end_input"><label for="daterangepicker_end"></label><input class="input-mini" type="text" name="daterangepicker_end" value="" /></div><button class="applyBtn" disabled="disabled"></button>&nbsp;<button class="cancelBtn"></button></div></div></div>';
    (this.parentEl = i(
      "object" == typeof e && e.parentEl && i(e.parentEl).length
        ? e.parentEl
        : this.parentEl
    )),
      (this.container = i(n).appendTo(this.parentEl)),
      this.setOptions(e, a);
    var r = this.container;
    i.each(this.buttonClasses, function (t, e) {
      r.find("button").addClass(e);
    }),
      this.container
        .find(".daterangepicker_start_input label")
        .html(this.locale.fromLabel),
      this.container
        .find(".daterangepicker_end_input label")
        .html(this.locale.toLabel),
      this.applyClass.length &&
        this.container.find(".applyBtn").addClass(this.applyClass),
      this.cancelClass.length &&
        this.container.find(".cancelBtn").addClass(this.cancelClass),
      this.container.find(".applyBtn").html(this.locale.applyLabel),
      this.container.find(".cancelBtn").html(this.locale.cancelLabel),
      this.container
        .find(".calendar")
        .on("click.daterangepicker", ".prev", i.proxy(this.clickPrev, this))
        .on("click.daterangepicker", ".next", i.proxy(this.clickNext, this))
        .on(
          "click.daterangepicker",
          "td.available",
          i.proxy(this.clickDate, this)
        )
        .on(
          "mouseenter.daterangepicker",
          "td.available",
          i.proxy(this.hoverDate, this)
        )
        .on(
          "mouseleave.daterangepicker",
          "td.available",
          i.proxy(this.updateFormInputs, this)
        )
        .on(
          "change.daterangepicker",
          "select.yearselect",
          i.proxy(this.updateMonthYear, this)
        )
        .on(
          "change.daterangepicker",
          "select.monthselect",
          i.proxy(this.updateMonthYear, this)
        )
        .on(
          "change.daterangepicker",
          "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",
          i.proxy(this.updateTime, this)
        ),
      this.container
        .find(".ranges")
        .on(
          "click.daterangepicker",
          "button.applyBtn",
          i.proxy(this.clickApply, this)
        )
        .on(
          "click.daterangepicker",
          "button.cancelBtn",
          i.proxy(this.clickCancel, this)
        )
        .on(
          "click.daterangepicker",
          ".daterangepicker_start_input,.daterangepicker_end_input",
          i.proxy(this.showCalendars, this)
        )
        .on(
          "change.daterangepicker",
          ".daterangepicker_start_input,.daterangepicker_end_input",
          i.proxy(this.inputsChanged, this)
        )
        .on(
          "keydown.daterangepicker",
          ".daterangepicker_start_input,.daterangepicker_end_input",
          i.proxy(this.inputsKeydown, this)
        )
        .on("click.daterangepicker", "li", i.proxy(this.clickRange, this))
        .on("mouseenter.daterangepicker", "li", i.proxy(this.enterRange, this))
        .on(
          "mouseleave.daterangepicker",
          "li",
          i.proxy(this.updateFormInputs, this)
        ),
      this.element.is("input")
        ? this.element.on({
            "click.daterangepicker": i.proxy(this.show, this),
            "focus.daterangepicker": i.proxy(this.show, this),
            "keyup.daterangepicker": i.proxy(this.updateFromControl, this),
          })
        : this.element.on("click.daterangepicker", i.proxy(this.toggle, this));
  };
  (s.prototype = {
    constructor: s,
    setOptions: function (t, e) {
      if (
        ((this.startDate = a().startOf("day")),
        (this.endDate = a().endOf("day")),
        (this.timeZone = a().zone()),
        (this.minDate = !1),
        (this.maxDate = !1),
        (this.dateLimit = !1),
        (this.showDropdowns = !1),
        (this.showWeekNumbers = !1),
        (this.timePicker = !1),
        (this.timePickerSeconds = !1),
        (this.timePickerIncrement = 30),
        (this.timePicker12Hour = !0),
        (this.singleDatePicker = !1),
        (this.ranges = {}),
        (this.opens = "right"),
        this.element.hasClass("pull-right") && (this.opens = "left"),
        (this.buttonClasses = ["btn", "btn-small btn-sm"]),
        (this.applyClass = "btn-success"),
        (this.cancelClass = "btn-default"),
        (this.format = "MM/DD/YYYY"),
        (this.separator = " - "),
        (this.locale = {
          applyLabel: "Apply",
          cancelLabel: "Cancel",
          fromLabel: "From",
          toLabel: "To",
          weekLabel: "W",
          customRangeLabel: "Custom Range",
          daysOfWeek: a.weekdaysMin(),
          monthNames: a.monthsShort(),
          firstDay: a.localeData()._week.dow,
        }),
        (this.cb = function () {}),
        "string" == typeof t.format && (this.format = t.format),
        "string" == typeof t.separator && (this.separator = t.separator),
        "string" == typeof t.startDate &&
          (this.startDate = a(t.startDate, this.format)),
        "string" == typeof t.endDate &&
          (this.endDate = a(t.endDate, this.format)),
        "string" == typeof t.minDate &&
          (this.minDate = a(t.minDate, this.format)),
        "string" == typeof t.maxDate &&
          (this.maxDate = a(t.maxDate, this.format)),
        "object" == typeof t.startDate && (this.startDate = a(t.startDate)),
        "object" == typeof t.endDate && (this.endDate = a(t.endDate)),
        "object" == typeof t.minDate && (this.minDate = a(t.minDate)),
        "object" == typeof t.maxDate && (this.maxDate = a(t.maxDate)),
        "string" == typeof t.applyClass && (this.applyClass = t.applyClass),
        "string" == typeof t.cancelClass && (this.cancelClass = t.cancelClass),
        "object" == typeof t.dateLimit && (this.dateLimit = t.dateLimit),
        "object" == typeof t.locale &&
          ("object" == typeof t.locale.daysOfWeek &&
            (this.locale.daysOfWeek = t.locale.daysOfWeek.slice()),
          "object" == typeof t.locale.monthNames &&
            (this.locale.monthNames = t.locale.monthNames.slice()),
          "number" == typeof t.locale.firstDay &&
            (this.locale.firstDay = t.locale.firstDay),
          "string" == typeof t.locale.applyLabel &&
            (this.locale.applyLabel = t.locale.applyLabel),
          "string" == typeof t.locale.cancelLabel &&
            (this.locale.cancelLabel = t.locale.cancelLabel),
          "string" == typeof t.locale.fromLabel &&
            (this.locale.fromLabel = t.locale.fromLabel),
          "string" == typeof t.locale.toLabel &&
            (this.locale.toLabel = t.locale.toLabel),
          "string" == typeof t.locale.weekLabel &&
            (this.locale.weekLabel = t.locale.weekLabel),
          "string" == typeof t.locale.customRangeLabel &&
            (this.locale.customRangeLabel = t.locale.customRangeLabel)),
        "string" == typeof t.opens && (this.opens = t.opens),
        "boolean" == typeof t.showWeekNumbers &&
          (this.showWeekNumbers = t.showWeekNumbers),
        "string" == typeof t.buttonClasses &&
          (this.buttonClasses = [t.buttonClasses]),
        "object" == typeof t.buttonClasses &&
          (this.buttonClasses = t.buttonClasses),
        "boolean" == typeof t.showDropdowns &&
          (this.showDropdowns = t.showDropdowns),
        "boolean" == typeof t.singleDatePicker &&
          ((this.singleDatePicker = t.singleDatePicker),
          this.singleDatePicker && (this.endDate = this.startDate.clone())),
        "boolean" == typeof t.timePicker && (this.timePicker = t.timePicker),
        "boolean" == typeof t.timePickerSeconds &&
          (this.timePickerSeconds = t.timePickerSeconds),
        "number" == typeof t.timePickerIncrement &&
          (this.timePickerIncrement = t.timePickerIncrement),
        "boolean" == typeof t.timePicker12Hour &&
          (this.timePicker12Hour = t.timePicker12Hour),
        0 != this.locale.firstDay)
      )
        for (var s = this.locale.firstDay; s > 0; )
          this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), s--;
      var n, r, o;
      if (
        "undefined" == typeof t.startDate &&
        "undefined" == typeof t.endDate &&
        i(this.element).is("input[type=text]")
      ) {
        var h = i(this.element).val(),
          l = h.split(this.separator);
        (n = r = null),
          2 == l.length
            ? ((n = a(l[0], this.format)), (r = a(l[1], this.format)))
            : this.singleDatePicker &&
              "" !== h &&
              ((n = a(h, this.format)), (r = a(h, this.format))),
          null !== n &&
            null !== r &&
            ((this.startDate = n), (this.endDate = r));
      }
      if (
        ("string" == typeof t.timeZone || "number" == typeof t.timeZone
          ? ((this.timeZone = t.timeZone),
            this.startDate.zone(this.timeZone),
            this.endDate.zone(this.timeZone))
          : (this.timeZone = a(this.startDate).zone()),
        "object" == typeof t.ranges)
      ) {
        for (o in t.ranges)
          (n =
            "string" == typeof t.ranges[o][0]
              ? a(t.ranges[o][0], this.format)
              : a(t.ranges[o][0])),
            (r =
              "string" == typeof t.ranges[o][1]
                ? a(t.ranges[o][1], this.format)
                : a(t.ranges[o][1])),
            this.minDate && n.isBefore(this.minDate) && (n = a(this.minDate)),
            this.maxDate && r.isAfter(this.maxDate) && (r = a(this.maxDate)),
            (this.minDate && r.isBefore(this.minDate)) ||
              (this.maxDate && n.isAfter(this.maxDate)) ||
              (this.ranges[o] = [n, r]);
        var c = "<ul>";
        for (o in this.ranges) c += "<li>" + o + "</li>";
        (c += "<li>" + this.locale.customRangeLabel + "</li>"),
          (c += "</ul>"),
          this.container.find(".ranges ul").remove(),
          this.container.find(".ranges").prepend(c);
      }
      if (
        ("function" == typeof e && (this.cb = e),
        this.timePicker ||
          ((this.startDate = this.startDate.startOf("day")),
          (this.endDate = this.endDate.endOf("day"))),
        this.singleDatePicker
          ? ((this.opens = "right"),
            this.container.addClass("single"),
            this.container.find(".calendar.right").show(),
            this.container.find(".calendar.left").hide(),
            this.timePicker
              ? this.container
                  .find(
                    ".ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input"
                  )
                  .hide()
              : this.container.find(".ranges").hide(),
            this.container.find(".calendar.right").hasClass("single") ||
              this.container.find(".calendar.right").addClass("single"))
          : (this.container.removeClass("single"),
            this.container.find(".calendar.right").removeClass("single"),
            this.container.find(".ranges").show()),
        (this.oldStartDate = this.startDate.clone()),
        (this.oldEndDate = this.endDate.clone()),
        (this.oldChosenLabel = this.chosenLabel),
        (this.leftCalendar = {
          month: a([
            this.startDate.year(),
            this.startDate.month(),
            1,
            this.startDate.hour(),
            this.startDate.minute(),
            this.startDate.second(),
          ]),
          calendar: [],
        }),
        (this.rightCalendar = {
          month: a([
            this.endDate.year(),
            this.endDate.month(),
            1,
            this.endDate.hour(),
            this.endDate.minute(),
            this.endDate.second(),
          ]),
          calendar: [],
        }),
        "right" == this.opens || "center" == this.opens)
      ) {
        var d = this.container.find(".calendar.first"),
          f = this.container.find(".calendar.second");
        f.hasClass("single") && (f.removeClass("single"), d.addClass("single")),
          d.removeClass("left").addClass("right"),
          f.removeClass("right").addClass("left"),
          this.singleDatePicker && (d.show(), f.hide());
      }
      "undefined" != typeof t.ranges ||
        this.singleDatePicker ||
        this.container.addClass("show-calendar"),
        this.container.addClass("opens" + this.opens),
        this.updateView(),
        this.updateCalendars();
    },
    setStartDate: function (t) {
      "string" == typeof t &&
        (this.startDate = a(t, this.format).zone(this.timeZone)),
        "object" == typeof t && (this.startDate = a(t)),
        this.timePicker || (this.startDate = this.startDate.startOf("day")),
        (this.oldStartDate = this.startDate.clone()),
        this.updateView(),
        this.updateCalendars(),
        this.updateInputText();
    },
    setEndDate: function (t) {
      "string" == typeof t &&
        (this.endDate = a(t, this.format).zone(this.timeZone)),
        "object" == typeof t && (this.endDate = a(t)),
        this.timePicker || (this.endDate = this.endDate.endOf("day")),
        (this.oldEndDate = this.endDate.clone()),
        this.updateView(),
        this.updateCalendars(),
        this.updateInputText();
    },
    updateView: function () {
      this.leftCalendar.month
        .month(this.startDate.month())
        .year(this.startDate.year())
        .hour(this.startDate.hour())
        .minute(this.startDate.minute()),
        this.rightCalendar.month
          .month(this.endDate.month())
          .year(this.endDate.year())
          .hour(this.endDate.hour())
          .minute(this.endDate.minute()),
        this.updateFormInputs();
    },
    updateFormInputs: function () {
      this.container
        .find("input[name=daterangepicker_start]")
        .val(this.startDate.format(this.format)),
        this.container
          .find("input[name=daterangepicker_end]")
          .val(this.endDate.format(this.format)),
        this.startDate.isSame(this.endDate) ||
        this.startDate.isBefore(this.endDate)
          ? this.container.find("button.applyBtn").removeAttr("disabled")
          : this.container.find("button.applyBtn").attr("disabled", "disabled");
    },
    updateFromControl: function () {
      if (this.element.is("input") && this.element.val().length) {
        var t = this.element.val().split(this.separator),
          e = null,
          i = null;
        2 === t.length &&
          ((e = a(t[0], this.format).zone(this.timeZone)),
          (i = a(t[1], this.format).zone(this.timeZone))),
          (this.singleDatePicker || null === e || null === i) &&
            ((e = a(this.element.val(), this.format).zone(this.timeZone)),
            (i = e)),
          i.isBefore(e) ||
            ((this.oldStartDate = this.startDate.clone()),
            (this.oldEndDate = this.endDate.clone()),
            (this.startDate = e),
            (this.endDate = i),
            (this.startDate.isSame(this.oldStartDate) &&
              this.endDate.isSame(this.oldEndDate)) ||
              this.notify(),
            this.updateCalendars());
      }
    },
    notify: function () {
      this.updateView(),
        this.cb(this.startDate, this.endDate, this.chosenLabel);
    },
    move: function () {
      var t = { top: 0, left: 0 },
        e = i(window).width();
      this.parentEl.is("body") ||
        ((t = {
          top: this.parentEl.offset().top - this.parentEl.scrollTop(),
          left: this.parentEl.offset().left - this.parentEl.scrollLeft(),
        }),
        (e = this.parentEl[0].clientWidth + this.parentEl.offset().left)),
        "left" == this.opens
          ? (this.container.css({
              top:
                this.element.offset().top + this.element.outerHeight() - t.top,
              right: e - this.element.offset().left - this.element.outerWidth(),
              left: "auto",
            }),
            this.container.offset().left < 0 &&
              this.container.css({ right: "auto", left: 9 }))
          : "center" == this.opens
          ? (this.container.css({
              top:
                this.element.offset().top + this.element.outerHeight() - t.top,
              left:
                this.element.offset().left -
                t.left +
                this.element.outerWidth() / 2 -
                this.container.outerWidth() / 2,
              right: "auto",
            }),
            this.container.offset().left < 0 &&
              this.container.css({ right: "auto", left: 9 }))
          : (this.container.css({
              top:
                this.element.offset().top + this.element.outerHeight() - t.top,
              left: this.element.offset().left - t.left,
              right: "auto",
            }),
            this.container.offset().left + this.container.outerWidth() >
              i(window).width() &&
              this.container.css({ left: "auto", right: 0 }));
    },
    toggle: function () {
      this.element.hasClass("active") ? this.hide() : this.show();
    },
    show: function () {
      this.isShowing ||
        (this.element.addClass("active"),
        this.container.show(),
        this.move(),
        (this._outsideClickProxy = i.proxy(function (t) {
          this.outsideClick(t);
        }, this)),
        i(document)
          .on("mousedown.daterangepicker", this._outsideClickProxy)
          .on("touchend.daterangepicker", this._outsideClickProxy)
          .on(
            "click.daterangepicker",
            "[data-toggle=dropdown]",
            this._outsideClickProxy
          )
          .on("focusin.daterangepicker", this._outsideClickProxy),
        (this.isShowing = !0),
        this.element.trigger("show.daterangepicker", this));
    },
    outsideClick: function (t) {
      var e = i(t.target);
      "focusin" == t.type ||
        e.closest(this.element).length ||
        e.closest(this.container).length ||
        e.closest(".calendar-date").length ||
        this.hide();
    },
    hide: function () {
      this.isShowing &&
        (i(document).off(".daterangepicker"),
        this.element.removeClass("active"),
        this.container.hide(),
        (this.startDate.isSame(this.oldStartDate) &&
          this.endDate.isSame(this.oldEndDate)) ||
          this.notify(),
        (this.oldStartDate = this.startDate.clone()),
        (this.oldEndDate = this.endDate.clone()),
        (this.isShowing = !1),
        this.element.trigger("hide.daterangepicker", this));
    },
    enterRange: function (t) {
      var e = t.target.innerHTML;
      if (e == this.locale.customRangeLabel) this.updateView();
      else {
        var a = this.ranges[e];
        this.container
          .find("input[name=daterangepicker_start]")
          .val(a[0].format(this.format)),
          this.container
            .find("input[name=daterangepicker_end]")
            .val(a[1].format(this.format));
      }
    },
    showCalendars: function () {
      this.container.addClass("show-calendar"),
        this.move(),
        this.element.trigger("showCalendar.daterangepicker", this);
    },
    hideCalendars: function () {
      this.container.removeClass("show-calendar"),
        this.element.trigger("hideCalendar.daterangepicker", this);
    },
    inputsChanged: function (t) {
      var e = i(t.target),
        s = a(e.val(), this.format);
      if (s.isValid()) {
        var n, r;
        "daterangepicker_start" === e.attr("name")
          ? ((n = s), (r = this.endDate))
          : ((n = this.startDate), (r = s)),
          this.setCustomDates(n, r);
      }
    },
    inputsKeydown: function (t) {
      13 === t.keyCode && (this.inputsChanged(t), this.notify());
    },
    updateInputText: function () {
      this.element.is("input") && !this.singleDatePicker
        ? this.element.val(
            this.startDate.format(this.format) +
              this.separator +
              this.endDate.format(this.format)
          )
        : this.element.is("input") &&
          this.element.val(this.endDate.format(this.format));
    },
    clickRange: function (t) {
      var e = t.target.innerHTML;
      if (((this.chosenLabel = e), e == this.locale.customRangeLabel))
        this.showCalendars();
      else {
        var a = this.ranges[e];
        (this.startDate = a[0]),
          (this.endDate = a[1]),
          this.timePicker ||
            (this.startDate.startOf("day"), this.endDate.endOf("day")),
          this.leftCalendar.month
            .month(this.startDate.month())
            .year(this.startDate.year())
            .hour(this.startDate.hour())
            .minute(this.startDate.minute()),
          this.rightCalendar.month
            .month(this.endDate.month())
            .year(this.endDate.year())
            .hour(this.endDate.hour())
            .minute(this.endDate.minute()),
          this.updateCalendars(),
          this.updateInputText(),
          this.hideCalendars(),
          this.hide(),
          this.element.trigger("apply.daterangepicker", this);
      }
    },
    clickPrev: function (t) {
      var e = i(t.target).parents(".calendar");
      e.hasClass("left")
        ? this.leftCalendar.month.subtract(1, "month")
        : this.rightCalendar.month.subtract(1, "month"),
        this.updateCalendars();
    },
    clickNext: function (t) {
      var e = i(t.target).parents(".calendar");
      e.hasClass("left")
        ? this.leftCalendar.month.add(1, "month")
        : this.rightCalendar.month.add(1, "month"),
        this.updateCalendars();
    },
    hoverDate: function (t) {
      var e = i(t.target).attr("data-title"),
        a = e.substr(1, 1),
        s = e.substr(3, 1),
        n = i(t.target).parents(".calendar");
      n.hasClass("left")
        ? this.container
            .find("input[name=daterangepicker_start]")
            .val(this.leftCalendar.calendar[a][s].format(this.format))
        : this.container
            .find("input[name=daterangepicker_end]")
            .val(this.rightCalendar.calendar[a][s].format(this.format));
    },
    setCustomDates: function (t, e) {
      if (((this.chosenLabel = this.locale.customRangeLabel), t.isAfter(e))) {
        var i = this.endDate.diff(this.startDate);
        e = a(t).add(i, "ms");
      }
      (this.startDate = t),
        (this.endDate = e),
        this.updateView(),
        this.updateCalendars();
    },
    clickDate: function (t) {
      var e,
        s,
        n = i(t.target).attr("data-title"),
        r = n.substr(1, 1),
        o = n.substr(3, 1),
        h = i(t.target).parents(".calendar");
      if (h.hasClass("left")) {
        if (
          ((e = this.leftCalendar.calendar[r][o]),
          (s = this.endDate),
          "object" == typeof this.dateLimit)
        ) {
          var l = a(e).add(this.dateLimit).startOf("day");
          s.isAfter(l) && (s = l);
        }
      } else if (
        ((e = this.startDate),
        (s = this.rightCalendar.calendar[r][o]),
        "object" == typeof this.dateLimit)
      ) {
        var c = a(s).subtract(this.dateLimit).startOf("day");
        e.isBefore(c) && (e = c);
      }
      this.singleDatePicker && h.hasClass("left")
        ? (s = e.clone())
        : this.singleDatePicker && h.hasClass("right") && (e = s.clone()),
        h.find("td").removeClass("active"),
        i(t.target).addClass("active"),
        this.setCustomDates(e, s),
        this.timePicker || s.endOf("day"),
        this.singleDatePicker && !this.timePicker && this.clickApply();
    },
    clickApply: function () {
      this.updateInputText(),
        this.hide(),
        this.element.trigger("apply.daterangepicker", this);
    },
    clickCancel: function () {
      (this.startDate = this.oldStartDate),
        (this.endDate = this.oldEndDate),
        (this.chosenLabel = this.oldChosenLabel),
        this.updateView(),
        this.updateCalendars(),
        this.hide(),
        this.element.trigger("cancel.daterangepicker", this);
    },
    updateMonthYear: function (t) {
      var e = i(t.target).closest(".calendar").hasClass("left"),
        a = e ? "left" : "right",
        s = this.container.find(".calendar." + a),
        n = parseInt(s.find(".monthselect").val(), 10),
        r = s.find(".yearselect").val();
      this[a + "Calendar"].month.month(n).year(r), this.updateCalendars();
    },
    updateTime: function (t) {
      var e = i(t.target).closest(".calendar"),
        a = e.hasClass("left"),
        s = parseInt(e.find(".hourselect").val(), 10),
        n = parseInt(e.find(".minuteselect").val(), 10),
        r = 0;
      if (
        (this.timePickerSeconds &&
          (r = parseInt(e.find(".secondselect").val(), 10)),
        this.timePicker12Hour)
      ) {
        var o = e.find(".ampmselect").val();
        "PM" === o && 12 > s && (s += 12), "AM" === o && 12 === s && (s = 0);
      }
      if (a) {
        var h = this.startDate.clone();
        h.hour(s),
          h.minute(n),
          h.second(r),
          (this.startDate = h),
          this.leftCalendar.month.hour(s).minute(n).second(r),
          this.singleDatePicker && (this.endDate = h.clone());
      } else {
        var l = this.endDate.clone();
        l.hour(s),
          l.minute(n),
          l.second(r),
          (this.endDate = l),
          this.singleDatePicker && (this.startDate = l.clone()),
          this.rightCalendar.month.hour(s).minute(n).second(r);
      }
      this.updateView(), this.updateCalendars();
    },
    updateCalendars: function () {
      (this.leftCalendar.calendar = this.buildCalendar(
        this.leftCalendar.month.month(),
        this.leftCalendar.month.year(),
        this.leftCalendar.month.hour(),
        this.leftCalendar.month.minute(),
        this.leftCalendar.month.second(),
        "left"
      )),
        (this.rightCalendar.calendar = this.buildCalendar(
          this.rightCalendar.month.month(),
          this.rightCalendar.month.year(),
          this.rightCalendar.month.hour(),
          this.rightCalendar.month.minute(),
          this.rightCalendar.month.second(),
          "right"
        )),
        this.container
          .find(".calendar.left")
          .empty()
          .html(
            this.renderCalendar(
              this.leftCalendar.calendar,
              this.startDate,
              this.minDate,
              this.maxDate,
              "left"
            )
          ),
        this.container
          .find(".calendar.right")
          .empty()
          .html(
            this.renderCalendar(
              this.rightCalendar.calendar,
              this.endDate,
              this.singleDatePicker ? this.minDate : this.startDate,
              this.maxDate,
              "right"
            )
          ),
        this.container.find(".ranges li").removeClass("active");
      var t = !0,
        e = 0;
      for (var a in this.ranges)
        this.timePicker
          ? this.startDate.isSame(this.ranges[a][0]) &&
            this.endDate.isSame(this.ranges[a][1]) &&
            ((t = !1),
            (this.chosenLabel = this.container
              .find(".ranges li:eq(" + e + ")")
              .addClass("active")
              .html()))
          : this.startDate.format("YYYY-MM-DD") ==
              this.ranges[a][0].format("YYYY-MM-DD") &&
            this.endDate.format("YYYY-MM-DD") ==
              this.ranges[a][1].format("YYYY-MM-DD") &&
            ((t = !1),
            (this.chosenLabel = this.container
              .find(".ranges li:eq(" + e + ")")
              .addClass("active")
              .html())),
          e++;
      t &&
        ((this.chosenLabel = this.container
          .find(".ranges li:last")
          .addClass("active")
          .html()),
        this.showCalendars());
    },
    buildCalendar: function (t, e, i, s, n, r) {
      var o,
        h = a([e, t]).daysInMonth(),
        l = a([e, t, 1]),
        c = a([e, t, h]),
        d = a(l).subtract(1, "month").month(),
        f = a(l).subtract(1, "month").year(),
        m = a([f, d]).daysInMonth(),
        p = l.day(),
        u = [];
      for (u.firstDay = l, u.lastDay = c, o = 0; 6 > o; o++) u[o] = [];
      var D = m - p + this.locale.firstDay + 1;
      D > m && (D -= 7), p == this.locale.firstDay && (D = m - 6);
      var g,
        y,
        k = a([f, d, D, 12, s, n]).zone(this.timeZone);
      for (o = 0, g = 0, y = 0; 42 > o; o++, g++, k = a(k).add(24, "hour"))
        o > 0 && g % 7 === 0 && ((g = 0), y++),
          (u[y][g] = k.clone().hour(i)),
          k.hour(12),
          this.minDate &&
            u[y][g].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") &&
            u[y][g].isBefore(this.minDate) &&
            "left" == r &&
            (u[y][g] = this.minDate.clone()),
          this.maxDate &&
            u[y][g].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") &&
            u[y][g].isAfter(this.maxDate) &&
            "right" == r &&
            (u[y][g] = this.maxDate.clone());
      return u;
    },
    renderDropdowns: function (t, e, a) {
      for (
        var i = t.month(),
          s = t.year(),
          n = (a && a.year()) || s + 5,
          r = (e && e.year()) || s - 50,
          o = '<select class="monthselect">',
          h = s == r,
          l = s == n,
          c = 0;
        12 > c;
        c++
      )
        (!h || c >= e.month()) &&
          (!l || c <= a.month()) &&
          (o +=
            "<option value='" +
            c +
            "'" +
            (c === i ? " selected='selected'" : "") +
            ">" +
            this.locale.monthNames[c] +
            "</option>");
      o += "</select>";
      for (var d = '<select class="yearselect">', f = r; n >= f; f++)
        d +=
          '<option value="' +
          f +
          '"' +
          (f === s ? ' selected="selected"' : "") +
          ">" +
          f +
          "</option>";
      return (d += "</select>"), o + d;
    },
    renderCalendar: function (t, e, a, s, n) {
      var r = '<div class="calendar-date">';
      (r += '<table class="table-condensed">'),
        (r += "<thead>"),
        (r += "<tr>"),
        this.showWeekNumbers && (r += "<th></th>"),
        (r +=
          !a || a.isBefore(t.firstDay)
            ? '<th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>'
            : "<th></th>");
      var o = this.locale.monthNames[t[1][1].month()] + t[1][1].format(" YYYY");
      this.showDropdowns && (o = this.renderDropdowns(t[1][1], a, s)),
        (r += '<th colspan="5" class="month">' + o + "</th>"),
        (r +=
          !s || s.isAfter(t.lastDay)
            ? '<th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>'
            : "<th></th>"),
        (r += "</tr>"),
        (r += "<tr>"),
        this.showWeekNumbers &&
          (r += '<th class="week">' + this.locale.weekLabel + "</th>"),
        i.each(this.locale.daysOfWeek, function (t, e) {
          r += "<th>" + e + "</th>";
        }),
        (r += "</tr>"),
        (r += "</thead>"),
        (r += "<tbody>");
      for (var h = 0; 6 > h; h++) {
        (r += "<tr>"),
          this.showWeekNumbers &&
            (r += '<td class="week">' + t[h][0].week() + "</td>");
        for (var l = 0; 7 > l; l++) {
          var c = "available ";
          (c += t[h][l].month() == t[1][1].month() ? "" : "off"),
            (a && t[h][l].isBefore(a, "day")) ||
            (s && t[h][l].isAfter(s, "day"))
              ? (c = " off disabled ")
              : t[h][l].format("YYYY-MM-DD") == e.format("YYYY-MM-DD")
              ? ((c += " active "),
                t[h][l].format("YYYY-MM-DD") ==
                  this.startDate.format("YYYY-MM-DD") && (c += " start-date "),
                t[h][l].format("YYYY-MM-DD") ==
                  this.endDate.format("YYYY-MM-DD") && (c += " end-date "))
              : t[h][l] >= this.startDate &&
                t[h][l] <= this.endDate &&
                ((c += " in-range "),
                t[h][l].isSame(this.startDate) && (c += " start-date "),
                t[h][l].isSame(this.endDate) && (c += " end-date "));
          var d = "r" + h + "c" + l;
          r +=
            '<td class="' +
            c.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") +
            '" data-title="' +
            d +
            '">' +
            t[h][l].date() +
            "</td>";
        }
        r += "</tr>";
      }
      (r += "</tbody>"), (r += "</table>"), (r += "</div>");
      var f;
      if (this.timePicker) {
        (r += '<div class="calendar-time">'),
          (r += '<select class="hourselect">');
        var m = 0,
          p = 23;
        a &&
          ("left" == n || this.singleDatePicker) &&
          e.format("YYYY-MM-DD") == a.format("YYYY-MM-DD") &&
          ((m = a.hour()),
          e.hour() < m && e.hour(m),
          this.timePicker12Hour && m >= 12 && e.hour() >= 12 && (m -= 12),
          this.timePicker12Hour && 12 == m && (m = 1)),
          s &&
            ("right" == n || this.singleDatePicker) &&
            e.format("YYYY-MM-DD") == s.format("YYYY-MM-DD") &&
            ((p = s.hour()),
            e.hour() > p && e.hour(p),
            this.timePicker12Hour && p >= 12 && e.hour() >= 12 && (p -= 12));
        var u = 0,
          D = 23,
          g = e.hour();
        for (
          this.timePicker12Hour &&
            ((u = 1), (D = 12), g >= 12 && (g -= 12), 0 === g && (g = 12)),
            f = u;
          D >= f;
          f++
        )
          r +=
            f == g
              ? '<option value="' +
                f +
                '" selected="selected">' +
                f +
                "</option>"
              : m > f || f > p
              ? '<option value="' +
                f +
                '" disabled="disabled" class="disabled">' +
                f +
                "</option>"
              : '<option value="' + f + '">' + f + "</option>";
        (r += "</select> : "), (r += '<select class="minuteselect">');
        var y = 0,
          k = 59;
        for (
          a &&
            ("left" == n || this.singleDatePicker) &&
            e.format("YYYY-MM-DD h A") == a.format("YYYY-MM-DD h A") &&
            ((y = a.minute()), e.minute() < y && e.minute(y)),
            s &&
              ("right" == n || this.singleDatePicker) &&
              e.format("YYYY-MM-DD h A") == s.format("YYYY-MM-DD h A") &&
              ((k = s.minute()), e.minute() > k && e.minute(k)),
            f = 0;
          60 > f;
          f += this.timePickerIncrement
        ) {
          var b = f;
          10 > b && (b = "0" + b),
            (r +=
              f == e.minute()
                ? '<option value="' +
                  f +
                  '" selected="selected">' +
                  b +
                  "</option>"
                : y > f || f > k
                ? '<option value="' +
                  f +
                  '" disabled="disabled" class="disabled">' +
                  b +
                  "</option>"
                : '<option value="' + f + '">' + b + "</option>");
        }
        if (((r += "</select> "), this.timePickerSeconds)) {
          for (
            r += ': <select class="secondselect">', f = 0;
            60 > f;
            f += this.timePickerIncrement
          ) {
            var b = f;
            10 > b && (b = "0" + b),
              (r +=
                f == e.second()
                  ? '<option value="' +
                    f +
                    '" selected="selected">' +
                    b +
                    "</option>"
                  : '<option value="' + f + '">' + b + "</option>");
          }
          r += "</select>";
        }
        if (this.timePicker12Hour) {
          r += '<select class="ampmselect">';
          var v = "",
            C = "";
          a &&
            ("left" == n || this.singleDatePicker) &&
            e.format("YYYY-MM-DD") == a.format("YYYY-MM-DD") &&
            a.hour() >= 12 &&
            (v = ' disabled="disabled" class="disabled"'),
            s &&
              ("right" == n || this.singleDatePicker) &&
              e.format("YYYY-MM-DD") == s.format("YYYY-MM-DD") &&
              s.hour() < 12 &&
              (C = ' disabled="disabled" class="disabled"'),
            (r +=
              e.hour() >= 12
                ? '<option value="AM"' +
                  v +
                  '>AM</option><option value="PM" selected="selected"' +
                  C +
                  ">PM</option>"
                : '<option value="AM" selected="selected"' +
                  v +
                  '>AM</option><option value="PM"' +
                  C +
                  ">PM</option>"),
            (r += "</select>");
        }
        r += "</div>";
      }
      return r;
    },
    remove: function () {
      this.container.remove(),
        this.element.off(".daterangepicker"),
        this.element.removeData("daterangepicker");
    },
  }),
    (i.fn.daterangepicker = function (t, e) {
      return (
        this.each(function () {
          var a = i(this);
          a.data("daterangepicker") && a.data("daterangepicker").remove(),
            a.data("daterangepicker", new s(a, t, e));
        }),
        this
      );
    });
});
