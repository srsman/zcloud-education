/*
 Highcharts JS v2.3.3 (2012-10-04)

 (c) 2009-2011 Torstein Hønsi

 License: www.highcharts.com/license
*/
(function(h, u) {
    function z(a, b, c) {
        this.init.call(this, a, b, c)
    }
    function A(a, b, c) {
        a.call(this, b, c);
        if (this.chart.polar) this.closeSegment = function(a) {
            var b = this.xAxis.center;
            a.push("L", b[0], b[1])
        },
        this.closedStacks = !0
    }
    function B(a, b) {
        var c = this.chart,
        d = this.options.animation,
        e = this.group,
        g = this.markerGroup,
        f = this.xAxis.center,
        j = c.plotLeft,
        n = c.plotTop;
        if (c.polar) {
            if (c.renderer.isSVG) if (d === !0 && (d = {}), b) {
                if (e.attrSetters.scaleX = e.attrSetters.scaleY = function(a, b) {
                    this[b] = a;
                    this.scaleX !== u && this.scaleY !== u && this.element.setAttribute("transform", "translate(" + this.translateX + "," + this.translateY + ") scale(" + this.scaleX + "," + this.scaleY + ")");
                    return ! 1
                },
                c = {
                    translateX: f[0] + j,
                    translateY: f[1] + n,
                    scaleX: 0,
                    scaleY: 0
                },
                e.attr(c), g) g.attrSetters = e.attrSetters,
                g.attr(c)
            } else c = {
                translateX: j,
                translateY: n,
                scaleX: 1,
                scaleY: 1
            },
            e.animate(c, d),
            g && g.animate(c, d),
            this.animate = null
        } else a.call(this, b)
    }
    var p = h.each,
    v = h.extend,
    o = h.merge,
    D = h.map,
    m = h.pick,
    w = h.pInt,
    k = h.getOptions().plotOptions,
    i = h.seriesTypes,
    E = h.extendClass,
    l = h.wrap,
    r = h.Axis,
    G = h.Tick,
    y = h.Series,
    q = i.column.prototype,
    s = function() {};
    v(z.prototype, {
        init: function(a, b, c) {
            var d = this,
            e = d.defaultOptions;
            d.chart = b;
            if (b.angular) e.background = {};
            d.options = a = o(e, a);
            (a = a.background) && p([].concat(h.splat(a)).reverse(),
            function(a) {
                var b = a.backgroundColor,
                a = o(d.defaultBackgroundOptions, a);
                if (b) a.backgroundColor = b;
                a.color = a.backgroundColor;
                c.options.plotBands.unshift(a)
            })
        },
        defaultOptions: {
            center: ["50%", "50%"],
            size: "85%",
            startAngle: 0
        },
        defaultBackgroundOptions: {
            shape: "circle",
            borderWidth: 1,
            borderColor: "silver",
            backgroundColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [[0, "#FFF"], [1, "#DDD"]]
            },
            from: Number.MIN_VALUE,
            innerRadius: 0,
            to: Number.MAX_VALUE,
            outerRadius: "105%"
        }
    });
    var x = r.prototype,
    r = G.prototype,
    H = {
        getOffset: s,
        redraw: function() {
            this.isDirty = !1
        },
        render: function() {
            this.isDirty = !1
        },
        setScale: s,
        setCategories: s,
        setTitle: s
    },
    F = {
        isRadial: !0,
        defaultRadialGaugeOptions: {
            labels: {
                align: "center",
                x: 0,
                y: null
            },
            minorGridLineWidth: 0,
            minorTickInterval: "auto",
            minorTickLength: 10,
            minorTickPosition: "inside",
            minorTickWidth: 1,
            plotBands: [],
            tickLength: 10,
            tickPosition: "inside",
            tickWidth: 2,
            title: {
                rotation: 0
            },
            zIndex: 2
        },
        defaultRadialXOptions: {
            gridLineWidth: 1,
            labels: {
                align: null,
                distance: 15,
                x: 0,
                y: null
            },
            maxPadding: 0,
            minPadding: 0,
            plotBands: [],
            showLastLabel: !1,
            tickLength: 0
        },
        defaultRadialYOptions: {
            gridLineInterpolation: "circle",
            labels: {
                align: "right",
                x: -3,
                y: -2
            },
            plotBands: [],
            showLastLabel: !1,
            title: {
                x: 4,
                text: null,
                rotation: 90
            }
        },
        setOptions: function(a) {
            this.options = o(this.defaultOptions, this.defaultRadialOptions, a)
        },
        getOffset: function() {
            x.getOffset.call(this);
            this.chart.axisOffset[this.side] = 0;
            this.center = this.pane.center = i.pie.prototype.getCenter.call(this.pane)
        },
        getLinePath: function(a, b) {
            var c = this.center,
            b = m(b, c[2] / 2 - this.offset);
            return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: !0,
                innerR: 0
            })
        },
        setAxisTranslation: function() {
            x.setAxisTranslation.call(this);
            if (this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.isXAxis)) this.minPixelPadding = this.transA * this.minPointOffset + (this.reversed ? (this.endAngleRad - this.startAngleRad) / 4 : 0)
        },
        beforeSetTickPositions: function() {
            this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange)
        },
        setAxisSize: function() {
            x.setAxisSize.call(this);
            if (this.center) this.len = this.width = this.height = this.isCircular ? this.center[2] * (this.endAngleRad - this.startAngleRad) / 2 : this.center[2] / 2
        },
        getPosition: function(a, b) {
            if (!this.isCircular) b = this.translate(a),
            a = this.min;
            return this.postTranslate(this.translate(a), m(b, this.center[2] / 2) - this.offset)
        },
        postTranslate: function(a, b) {
            var c = this.chart,
            d = this.center,
            a = this.startAngleRad + a;
            return {
                x: c.plotLeft + d[0] + Math.cos(a) * b,
                y: c.plotTop + d[1] + Math.sin(a) * b
            }
        },
        getPlotBandPath: function(a, b, c) {
            var d = this.center,
            e = this.startAngleRad,
            g = d[2] / 2,
            f = [m(c.outerRadius, "100%"), c.innerRadius, m(c.thickness, 10)],
            j = /%$/,
            n,
            C = this.isCircular;
            this.options.gridLineInterpolation === "polygon" ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (C || (f[0] = this.translate(a), f[1] = this.translate(b)), f = D(f,
            function(a) {
                j.test(a) && (a = w(a, 10) * g / 100);
                return a
            }), c.shape === "circle" || !C ? (a = -Math.PI / 2, b = Math.PI * 1.5, n = !0) : (a = e + this.translate(a), b = e + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], f[0], f[0], {
                start: a,
                end: b,
                innerR: m(f[1], f[0] - f[2]),
                open: n
            }));
            return d
        },
        getPlotLinePath: function(a, b) {
            var c = this.center,
            d = this.chart,
            e = this.getPosition(a),
            g,
            f,
            j;
            this.isCircular ? j = ["M", c[0] + d.plotLeft, c[1] + d.plotTop, "L", e.x, e.y] : this.options.gridLineInterpolation === "circle" ? (a = this.translate(a)) && (j = this.getLinePath(0, a)) : (g = d.xAxis[0], j = [], a = this.translate(a), c = g.tickPositions, g.autoConnect && (c = c.concat([c[0]])), b && (c = [].concat(c).reverse()), p(c,
            function(b, c) {
                f = g.getPosition(b, a);
                j.push(c ? "L": "M", f.x, f.y)
            }));
            return j
        },
        getTitlePosition: function() {
            var a = this.center,
            b = this.chart,
            c = this.options.title;
            return {
                x: b.plotLeft + a[0] + (c.x || 0),
                y: b.plotTop + a[1] - {
                    high: 0.5,
                    middle: 0.25,
                    low: 0
                } [c.align] * a[2] + (c.y || 0)
            }
        }
    };
    l(x, "init",
    function(a, b, c) {
        var d = this,
        e = b.angular,
        g = b.polar,
        f = c.isX,
        j = e && f,
        n;
        if (e) {
            if (v(this, j ? H: F), n = !f) this.defaultRadialOptions = this.defaultRadialGaugeOptions
        } else if (g) v(this, F),
        this.defaultRadialOptions = (n = f) ? this.defaultRadialXOptions: o(this.defaultYAxisOptions, this.defaultRadialYOptions);
        a.call(this, b, c);
        if (!j && (e || g)) {
            a = this.options;
            if (!b.panes) b.panes = D(h.splat(b.options.pane),
            function(a) {
                return new z(a, b, d)
            });
            this.pane = e = b.panes[c.pane || 0];
            g = e.options;
            b.inverted = !1;
            b.options.chart.zoomType = null;
            this.startAngleRad = e = (g.startAngle - 90) * Math.PI / 180;
            this.endAngleRad = g = (m(g.endAngle, g.startAngle + 360) - 90) * Math.PI / 180;
            this.offset = a.offset || 0;
            if ((this.isCircular = n) && c.max === u && g - e === 2 * Math.PI) this.autoConnect = !0
        }
    });
    l(r, "getPosition",
    function(a, b, c, d, e) {
        var g = this.axis;
        return g.getPosition ? g.getPosition(c) : a.call(this, b, c, d, e)
    });
    l(r, "getLabelPosition",
    function(a, b, c, d, e, g, f, j, n) {
        var h = this.axis,
        i = g.y,
        l = g.align,
        k = (h.translate(this.pos) + h.startAngleRad + Math.PI / 2) / Math.PI * 180;
        h.isRadial ? (a = h.getPosition(this.pos, h.center[2] / 2 + m(g.distance, -25)), g.rotation === "auto" ? d.attr({
            rotation: k
        }) : i === null && (i = w(d.styles.lineHeight) * 0.9 - d.getBBox().height / 2), l === null && (l = h.isCircular ? k > 20 && k < 160 ? "left": k > 200 && k < 340 ? "right": "center": "center", d.attr({
            align: l
        })), a.x += g.x, a.y += i) : a = a.call(this, b, c, d, e, g, f, j, n);
        return a
    });
    l(r, "getMarkPath",
    function(a, b, c, d, e, g, f) {
        var j = this.axis;
        j.isRadial ? (a = j.getPosition(this.pos, j.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, g, f);
        return b
    });
    k.arearange = o(k.area, {
        lineWidth: 1,
        marker: null,
        threshold: null,
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'
        },
        trackByArea: !0,
        dataLabels: {
            verticalAlign: null,
            xLow: 0,
            xHigh: 0,
            yLow: 0,
            yHigh: 0
        },
        shadow: !1
    });
    r = h.extendClass(h.Point, {
        applyOptions: function(a, b) {
            var c = this.series,
            d = c.pointArrayMap,
            e = 0,
            g = 0,
            f = d.length;
            if (typeof a === "object" && typeof a.length !== "number") v(this, a),
            this.options = a;
            else if (a.length) {
                if (a.length > f) {
                    if (typeof a[0] === "string") this.name = a[0];
                    else if (typeof a[0] === "number") this.x = a[0];
                    e++
                }
                for (; g < f;) this[d[g++]] = a[e++]
            }
            this.y = this[c.pointValKey];
            if (this.x === u && c) this.x = b === u ? c.autoIncrement() : b;
            return this
        },
        toYData: function() {
            return [this.low, this.high]
        }
    });
    i.arearange = h.extendClass(i.area, {
        type: "arearange",
        pointArrayMap: ["low", "high"],
        pointClass: r,
        pointValKey: "low",
        translate: function() {
            var a = this.yAxis;
            i.area.prototype.translate.apply(this);
            p(this.points,
            function(b) {
                if (b.y !== null) b.plotLow = b.plotY,
                b.plotHigh = a.translate(b.high, 0, 1, 0, 1)
            })
        },
        getSegmentPath: function(a) {
            for (var b = [], c = a.length, d = y.prototype.getSegmentPath, e; c--;) e = a[c],
            b.push({
                plotX: e.plotX,
                plotY: e.plotHigh
            });
            a = d.call(this, a);
            d = d.call(this, b);
            b = [].concat(a, d);
            d[0] = "L";
            this.areaPath = this.areaPath.concat(a, d);
            return b
        },
        drawDataLabels: function() {
            var a = this.data,
            b = a.length,
            c, d = [],
            e = y.prototype,
            g = this.options.dataLabels,
            f,
            j = this.chart.inverted;
            if (g.enabled || this._hasPointLabels) {
                for (c = b; c--;) f = a[c],
                f.y = f.high,
                f.plotY = f.plotHigh,
                d[c] = f.dataLabel,
                f.dataLabel = f.dataLabelUpper,
                f.below = !1,
                j ? (g.align = "left", g.x = g.xHigh) : g.y = g.yHigh;
                e.drawDataLabels.apply(this, arguments);
                for (c = b; c--;) f = a[c],
                f.dataLabelUpper = f.dataLabel,
                f.dataLabel = d[c],
                f.y = f.low,
                f.plotY = f.plotLow,
                f.below = !0,
                j ? (g.align = "right", g.x = g.xLow) : g.y = g.yLow;
                e.drawDataLabels.apply(this, arguments)
            }
        },
        alignDataLabel: i.column.prototype.alignDataLabel,
        getSymbol: i.column.prototype.getSymbol,
        drawPoints: s
    });
    k.areasplinerange = o(k.arearange);
    i.areasplinerange = E(i.arearange, {
        type: "areasplinerange",
        getPointSpline: i.spline.prototype.getPointSpline
    });
    k.columnrange = o(k.column, k.arearange, {
        lineWidth: 1,
        pointRange: null
    });
    i.columnrange = E(i.arearange, {
        type: "columnrange",
        translate: function() {
            var a = this.yAxis,
            b;
            q.translate.apply(this);
            p(this.points,
            function(c) {
                var d = c.shapeArgs;
                c.plotHigh = b = a.translate(c.high, 0, 1, 0, 1);
                c.plotLow = c.plotY;
                d.y = b;
                d.height = c.plotY - b;
                c.trackerArgs = d
            })
        },
        drawGraph: s,
        pointAttrToOptions: q.pointAttrToOptions,
        drawPoints: q.drawPoints,
        drawTracker: q.drawTracker,
        animate: q.animate
    });
    k.gauge = o(k.line, {
        dataLabels: {
            enabled: !0,
            y: 15,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 3,
            style: {
                fontWeight: "bold"
            },
            verticalAlign: "top"
        },
        dial: {},
        pivot: {},
        tooltip: {
            headerFormat: ""
        },
        showInLegend: !1
    });
    k = {
        type: "gauge",
        pointClass: h.extendClass(h.Point, {
            setState: function(a) {
                this.state = a
            }
        }),
        angular: !0,
        translate: function() {
            var a = this,
            b = a.yAxis,
            c = b.center;
            a.generatePoints();
            p(a.points,
            function(d) {
                var e = o(a.options.dial, d.dial),
                g = w(m(e.radius, 80)) * c[2] / 200,
                f = w(m(e.baseLength, 70)) * g / 100,
                j = w(m(e.rearLength, 10)) * g / 100,
                h = e.baseWidth || 3,
                i = e.topWidth || 1;
                d.shapeType = "path";
                d.shapeArgs = {
                    d: e.path || ["M", -j, -h / 2, "L", f, -h / 2, g, -i / 2, g, i / 2, f, h / 2, -j, h / 2, "z"],
                    translateX: c[0],
                    translateY: c[1],
                    rotation: (b.startAngleRad + b.translate(d.y)) * 180 / Math.PI
                };
                d.plotX = c[0];
                d.plotY = c[1]
            })
        },
        drawPoints: function() {
            var a = this,
            b = a.yAxis.center,
            c = a.pivot,
            d = a.options,
            e = d.pivot;
            p(a.points,
            function(b) {
                var c = b.graphic,
                e = b.shapeArgs,
                h = e.d,
                i = o(d.dial, b.dial);
                c ? (c.animate(e), e.d = h) : b.graphic = a.chart.renderer[b.shapeType](e).attr({
                    stroke: i.borderColor || "none",
                    "stroke-width": i.borderWidth || 0,
                    fill: i.backgroundColor || "black",
                    rotation: e.rotation
                }).add(a.group)
            });
            c ? c.animate({
                cx: b[0],
                cy: b[1]
            }) : a.pivot = a.chart.renderer.circle(b[0], b[1], m(e.radius, 5)).attr({
                "stroke-width": e.borderWidth || 0,
                stroke: e.borderColor || "silver",
                fill: e.backgroundColor || "black"
            }).add(a.group)
        },
        animate: function() {
            var a = this;
            p(a.points,
            function(b) {
                var c = b.graphic;
                c && (c.attr({
                    rotation: a.yAxis.startAngleRad * 180 / Math.PI
                }), c.animate({
                    rotation: b.shapeArgs.rotation
                },
                a.options.animation))
            });
            a.animate = null
        },
        render: function() {
            this.group = this.plotGroup("group", "series", this.visible ? "visible": "hidden", this.options.zIndex, this.chart.seriesGroup);
            i.pie.prototype.render.call(this);
            this.group.clip(this.chart.clipRect)
        },
        setData: i.pie.prototype.setData,
        drawTracker: i.column.prototype.drawTracker
    };
    i.gauge = h.extendClass(i.line, k);
    var t = y.prototype,
    k = h.MouseTracker.prototype;
    t.toXY = function(a) {
        var b, c = this.chart;
        b = a.plotX;
        var d = a.plotY;
        a.rectPlotX = b;
        a.rectPlotY = d;
        a.deg = b / Math.PI * 180;
        b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - d);
        a.plotX = a.polarPlotX = b.x - c.plotLeft;
        a.plotY = a.polarPlotY = b.y - c.plotTop
    };
    l(i.area.prototype, "init", A);
    l(i.areaspline.prototype, "init", A);
    l(i.spline.prototype, "getPointSpline",
    function(a, b, c, d) {
        var e, g, f, j, h, i, k;
        if (this.chart.polar) {
            e = c.plotX;
            g = c.plotY;
            a = b[d - 1];
            f = b[d + 1];
            this.connectEnds && (a || (a = b[b.length - 2]), f || (f = b[1]));
            if (a && f) j = a.plotX,
            h = a.plotY,
            b = f.plotX,
            i = f.plotY,
            j = (1.5 * e + j) / 2.5,
            h = (1.5 * g + h) / 2.5,
            f = (1.5 * e + b) / 2.5,
            k = (1.5 * g + i) / 2.5,
            b = Math.sqrt(Math.pow(j - e, 2) + Math.pow(h - g, 2)),
            i = Math.sqrt(Math.pow(f - e, 2) + Math.pow(k - g, 2)),
            j = Math.atan2(h - g, j - e),
            h = Math.atan2(k - g, f - e),
            k = Math.PI / 2 + (j + h) / 2,
            Math.abs(j - k) > Math.PI / 2 && (k -= Math.PI),
            j = e + Math.cos(k) * b,
            h = g + Math.sin(k) * b,
            f = e + Math.cos(Math.PI + k) * i,
            k = g + Math.sin(Math.PI + k) * i,
            c.rightContX = f,
            c.rightContY = k;
            d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, j || e, h || g, e, g], a.rightContX = a.rightContY = null) : c = ["M", e, g]
        } else c = a.call(this, b, c, d);
        return c
    });
    l(t, "translate",
    function(a) {
        a.call(this);
        if (this.chart.polar && !this.preventPostTranslate) for (var a = this.points, b = a.length; b--;) this.toXY(a[b])
    });
    l(t, "getSegmentPath",
    function(a, b) {
        var c = this.points;
        if (this.chart.polar && this.options.connectEnds !== !1 && b[b.length - 1] === c[c.length - 1] && c[0].y !== null) this.connectEnds = !0,
        b = [].concat(b, [c[0]]);
        return a.call(this, b)
    });
    l(t, "animate", B);
    l(q, "animate", B);
    l(t, "setTooltipPoints",
    function(a, b) {
        this.chart.polar && v(this.xAxis, {
            tooltipLen: 360,
            tooltipPosName: "deg"
        });
        return a.call(this, b)
    });
    l(q, "translate",
    function(a) {
        var b = this.xAxis,
        c = this.yAxis.len,
        d = b.center,
        e = b.startAngleRad,
        g = this.chart.renderer,
        f, h;
        this.preventPostTranslate = !0;
        a.call(this);
        if (b.isRadial) {
            b = this.points;
            for (h = b.length; h--;) f = b[h],
            a = f.barX + e,
            f.shapeType = "path",
            f.shapeArgs = {
                d: g.symbols.arc(d[0], d[1], c - f.plotY, null, {
                    start: a,
                    end: a + f.pointWidth,
                    innerR: c - m(f.yBottom, c)
                })
            },
            this.toXY(f)
        }
    });
    l(q, "alignDataLabel",
    function(a, b, c, d, e, g) {
        if (this.chart.polar) {
            a = b.rectPlotX / Math.PI * 180;
            if (d.align === null) d.align = a > 20 && a < 160 ? "left": a > 200 && a < 340 ? "right": "center";
            if (d.verticalAlign === null) d.verticalAlign = a < 45 || a > 315 ? "bottom": a > 135 && a < 225 ? "top": "middle";
            t.alignDataLabel.call(this, b, c, d, e, g)
        } else a.call(this, b, c, d, e, g)
    });
    l(k, "getIndex",
    function(a, b) {
        var c, d = this.chart,
        e;
        d.polar ? (e = d.xAxis[0].center, c = b.chartX - e[0] - d.plotLeft, d = b.chartY - e[1] - d.plotTop, c = 180 - Math.round(Math.atan2(c, d) / Math.PI * 180)) : c = a.call(this, b);
        return c
    });
    l(k, "getMouseCoordinates",
    function(a, b) {
        var c = this.chart,
        d = {
            xAxis: [],
            yAxis: []
        };
        c.polar ? p(c.axes,
        function(a) {
            var g = a.isXAxis,
            f = a.center,
            h = b.chartX - f[0] - c.plotLeft,
            f = b.chartY - f[1] - c.plotTop;
            d[g ? "xAxis": "yAxis"].push({
                axis: a,
                value: a.translate(g ? Math.PI - Math.atan2(h, f) : Math.sqrt(Math.pow(h, 2) + Math.pow(f, 2)), !0)
            })
        }) : d = a.call(this, b);
        return d
    })
})(Highcharts);