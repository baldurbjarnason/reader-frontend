/*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
!(function (e, t) {
  'use strict'
  function n () {
    var e = A.splice(0, A.length)
    for (Ye = 0; e.length;) e.shift().call(null, e.shift())
  }
  function r (e, t) {
    for (var n = 0, r = e.length; n < r; n++) T(e[n], t)
  }
  function o (e) {
    for (var t, n = 0, r = e.length; n < r; n++) (t = e[n]), V(t, le[a(t)])
  }
  function l (e) {
    return function (t) {
      ke(t) && (T(t, e), ae.length && r(t.querySelectorAll(ae), e))
    }
  }
  function a (e) {
    var t = Ze.call(e, 'is'),
      n = e.nodeName.toUpperCase(),
      r = ue.call(oe, t ? te + t.toUpperCase() : ee + n)
    return t && r > -1 && !i(n, t) ? -1 : r
  }
  function i (e, t) {
    return ae.indexOf(e + '[is="' + t + '"]') > -1
  }
  function u (e) {
    var t = e.currentTarget,
      n = e.attrChange,
      r = e.attrName,
      o = e.target,
      l = e[$] || 2,
      a = e[Q] || 3
    !ot ||
      (o && o !== t) ||
      !t[Z] ||
      r === 'style' ||
      (e.prevValue === e.newValue &&
        (e.newValue !== '' || (n !== l && n !== a))) ||
      t[Z](r, n === l ? null : e.prevValue, n === a ? null : e.newValue)
  }
  function c (e) {
    var t = l(e)
    return function (e) {
      A.push(t, e.target), Ye && clearTimeout(Ye), (Ye = setTimeout(n, 1))
    }
  }
  function s (e) {
    rt && ((rt = !1), e.currentTarget.removeEventListener(Y, s)),
    ae.length &&
        r((e.target || y).querySelectorAll(ae), e.detail === q ? q : _),
    Re && d()
  }
  function m (e, t) {
    var n = this
    ze.call(n, e, t), O.call(n, { target: n })
  }
  function f (e, t, n) {
    var r = t.apply(e, n),
      l = a(r)
    return (
      l > -1 && V(r, le[l]),
      n.pop() && ae.length && o(r.querySelectorAll(ae)),
      r
    )
  }
  function p (e, t) {
    Fe(e, t),
    I
      ? I.observe(e, Qe)
      : (nt && ((e.setAttribute = m), (e[U] = D(e)), e[k](J, O)), e[k](W, u)),
    e[K] && ot && ((e.created = !0), e[K](), (e.created = !1))
  }
  function d () {
    for (var e, t = 0, n = _e.length; t < n; t++) { (e = _e[t]), ie.contains(e) || (n--, _e.splice(t--, 1), T(e, q)) }
  }
  function h (e) {
    throw new Error('A ' + e + ' type is already registered')
  }
  function T (e, t) {
    var n,
      r,
      o = a(e)
    o > -1 &&
      (S(e, le[o]),
      (o = 0),
      t !== _ || e[_]
        ? t !== q ||
          e[q] ||
          ((e[_] = !1), (e[q] = !0), (r = 'disconnected'), (o = 1))
        : ((e[q] = !1),
        (e[_] = !0),
        (r = 'connected'),
        (o = 1),
        Re && ue.call(_e, e) < 0 && _e.push(e)),
      o && (n = e[t + x] || e[r + x]) && n.call(e))
  }
  function L () {}
  function M (e, t, n) {
    var r = (n && n[B]) || '',
      o = t.prototype,
      l = Ie(o),
      a = t.observedAttributes || pe,
      i = { prototype: l }
    Ue(l, K, {
      value: function () {
        if (we) we = !1
        else if (!this[ve]) {
          ;(this[ve] = !0), new t(this), o[K] && o[K].call(this)
          var e = Ae[Ne.get(t)]
          ;(!ge || e.create.length > 1) && H(this)
        }
      }
    }),
    Ue(l, Z, {
      value: function (e) {
        ;ue.call(a, e) > -1 && o[Z] && o[Z].apply(this, arguments)
      }
    }),
    o[G] && Ue(l, j, { value: o[G] }),
    o[z] && Ue(l, X, { value: o[z] }),
    r && (i[B] = r),
    (e = e.toUpperCase()),
    (Ae[e] = { constructor: t, create: r ? [r, De(e)] : [e] }),
    Ne.set(t, e),
    y[R](e.toLowerCase(), i),
    g(e),
    Oe[e].r()
  }
  function E (e) {
    var t = Ae[e.toUpperCase()]
    return t && t.constructor
  }
  function v (e) {
    return typeof e === 'string' ? e : (e && e.is) || ''
  }
  function H (e) {
    for (var t, n = e[Z], r = n ? e.attributes : pe, o = r.length; o--;) { (t = r[o]), n.call(e, t.name || t.nodeName, null, t.value || t.nodeValue) }
  }
  function g (e) {
    return (
      (e = e.toUpperCase()),
      e in Oe ||
        ((Oe[e] = {}),
        (Oe[e].p = new Ce(function (t) {
          Oe[e].r = t
        }))),
      Oe[e].p
    )
  }
  function b () {
    He && delete e.customElements,
    fe(e, 'customElements', { configurable: !0, value: new L() }),
    fe(e, 'CustomElementRegistry', { configurable: !0, value: L })
    for (
      var t = w.get(/^HTML[A-Z]*[a-z]/), n = t.length;
      n--;
      (function (t) {
        var n = e[t]
        if (n) {
          ;(e[t] = function (e) {
            var t, r
            return (
              e || (e = this),
              e[ve] ||
                ((we = !0),
                (t = Ae[Ne.get(e.constructor)]),
                (r = ge && t.create.length === 1),
                (e = r
                  ? Reflect.construct(n, pe, t.constructor)
                  : y.createElement.apply(y, t.create)),
                (e[ve] = !0),
                (we = !1),
                r || H(e)),
              e
            )
          }),
          (e[t].prototype = n.prototype)
          try {
            n.prototype.constructor = e[t]
          } catch (r) {
            ;(Ee = !0), fe(n, ve, { value: e[t] })
          }
        }
      })(t[n])
    );
    ;(y.createElement = function (e, t) {
      var n = v(t)
      return n ? $e.call(this, e, De(n)) : $e.call(this, e)
    }),
    Je || ((tt = !0), y[R](''))
  }
  var y = e.document,
    C = e.Object,
    w = (function (e) {
      var t,
        n,
        r,
        o,
        l = /^[A-Z]+[a-z]/,
        a = function (e) {
          var t,
            n = []
          for (t in u) e.test(t) && n.push(t)
          return n
        },
        i = function (e, t) {
          ;(t = t.toLowerCase()) in u ||
            ((u[e] = (u[e] || []).concat(t)), (u[t] = u[t.toUpperCase()] = e))
        },
        u = (C.create || C)(null),
        c = {}
      for (n in e) {
        for (o in e[n]) {
          for (r = e[n][o], u[o] = r, t = 0; t < r.length; t++) { u[r[t].toLowerCase()] = u[r[t].toUpperCase()] = o }
        }
      }
      return (
        (c.get = function (e) {
          return typeof e === 'string' ? u[e] || (l.test(e) ? [] : '') : a(e)
        }),
        (c.set = function (e, t) {
          return l.test(e) ? i(e, t) : i(t, e), c
        }),
        c
      )
    })({
      collections: {
        HTMLAllCollection: ['all'],
        HTMLCollection: ['forms'],
        HTMLFormControlsCollection: ['elements'],
        HTMLOptionsCollection: ['options']
      },
      elements: {
        Element: ['element'],
        HTMLAnchorElement: ['a'],
        HTMLAppletElement: ['applet'],
        HTMLAreaElement: ['area'],
        HTMLAttachmentElement: ['attachment'],
        HTMLAudioElement: ['audio'],
        HTMLBRElement: ['br'],
        HTMLBaseElement: ['base'],
        HTMLBodyElement: ['body'],
        HTMLButtonElement: ['button'],
        HTMLCanvasElement: ['canvas'],
        HTMLContentElement: ['content'],
        HTMLDListElement: ['dl'],
        HTMLDataElement: ['data'],
        HTMLDataListElement: ['datalist'],
        HTMLDetailsElement: ['details'],
        HTMLDialogElement: ['dialog'],
        HTMLDirectoryElement: ['dir'],
        HTMLDivElement: ['div'],
        HTMLDocument: ['document'],
        HTMLElement: [
          'element',
          'abbr',
          'address',
          'article',
          'aside',
          'b',
          'bdi',
          'bdo',
          'cite',
          'code',
          'command',
          'dd',
          'dfn',
          'dt',
          'em',
          'figcaption',
          'figure',
          'footer',
          'header',
          'i',
          'kbd',
          'mark',
          'nav',
          'noscript',
          'rp',
          'rt',
          'ruby',
          's',
          'samp',
          'section',
          'small',
          'strong',
          'sub',
          'summary',
          'sup',
          'u',
          'var',
          'wbr'
        ],
        HTMLEmbedElement: ['embed'],
        HTMLFieldSetElement: ['fieldset'],
        HTMLFontElement: ['font'],
        HTMLFormElement: ['form'],
        HTMLFrameElement: ['frame'],
        HTMLFrameSetElement: ['frameset'],
        HTMLHRElement: ['hr'],
        HTMLHeadElement: ['head'],
        HTMLHeadingElement: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        HTMLHtmlElement: ['html'],
        HTMLIFrameElement: ['iframe'],
        HTMLImageElement: ['img'],
        HTMLInputElement: ['input'],
        HTMLKeygenElement: ['keygen'],
        HTMLLIElement: ['li'],
        HTMLLabelElement: ['label'],
        HTMLLegendElement: ['legend'],
        HTMLLinkElement: ['link'],
        HTMLMapElement: ['map'],
        HTMLMarqueeElement: ['marquee'],
        HTMLMediaElement: ['media'],
        HTMLMenuElement: ['menu'],
        HTMLMenuItemElement: ['menuitem'],
        HTMLMetaElement: ['meta'],
        HTMLMeterElement: ['meter'],
        HTMLModElement: ['del', 'ins'],
        HTMLOListElement: ['ol'],
        HTMLObjectElement: ['object'],
        HTMLOptGroupElement: ['optgroup'],
        HTMLOptionElement: ['option'],
        HTMLOutputElement: ['output'],
        HTMLParagraphElement: ['p'],
        HTMLParamElement: ['param'],
        HTMLPictureElement: ['picture'],
        HTMLPreElement: ['pre'],
        HTMLProgressElement: ['progress'],
        HTMLQuoteElement: ['blockquote', 'q', 'quote'],
        HTMLScriptElement: ['script'],
        HTMLSelectElement: ['select'],
        HTMLShadowElement: ['shadow'],
        HTMLSlotElement: ['slot'],
        HTMLSourceElement: ['source'],
        HTMLSpanElement: ['span'],
        HTMLStyleElement: ['style'],
        HTMLTableCaptionElement: ['caption'],
        HTMLTableCellElement: ['td', 'th'],
        HTMLTableColElement: ['col', 'colgroup'],
        HTMLTableElement: ['table'],
        HTMLTableRowElement: ['tr'],
        HTMLTableSectionElement: ['thead', 'tbody', 'tfoot'],
        HTMLTemplateElement: ['template'],
        HTMLTextAreaElement: ['textarea'],
        HTMLTimeElement: ['time'],
        HTMLTitleElement: ['title'],
        HTMLTrackElement: ['track'],
        HTMLUListElement: ['ul'],
        HTMLUnknownElement: ['unknown', 'vhgroupv', 'vkeygen'],
        HTMLVideoElement: ['video']
      },
      nodes: {
        Attr: ['node'],
        Audio: ['audio'],
        CDATASection: ['node'],
        CharacterData: ['node'],
        Comment: ['#comment'],
        Document: ['#document'],
        DocumentFragment: ['#document-fragment'],
        DocumentType: ['node'],
        HTMLDocument: ['#document'],
        Image: ['img'],
        Option: ['option'],
        ProcessingInstruction: ['node'],
        ShadowRoot: ['#shadow-root'],
        Text: ['#text'],
        XMLDocument: ['xml']
      }
    })
  typeof t !== 'object' && (t = { type: t || 'auto' })
  var A,
    O,
    N,
    D,
    I,
    F,
    S,
    V,
    P,
    R = 'registerElement',
    U = '__' + R + ((1e5 * e.Math.random()) >> 0),
    k = 'addEventListener',
    _ = 'attached',
    x = 'Callback',
    q = 'detached',
    B = 'extends',
    Z = 'attributeChanged' + x,
    j = _ + x,
    G = 'connected' + x,
    z = 'disconnected' + x,
    K = 'created' + x,
    X = q + x,
    $ = 'ADDITION',
    Q = 'REMOVAL',
    W = 'DOMAttrModified',
    Y = 'DOMContentLoaded',
    J = 'DOMSubtreeModified',
    ee = '<',
    te = '=',
    ne = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
    re = [
      'ANNOTATION-XML',
      'COLOR-PROFILE',
      'FONT-FACE',
      'FONT-FACE-SRC',
      'FONT-FACE-URI',
      'FONT-FACE-FORMAT',
      'FONT-FACE-NAME',
      'MISSING-GLYPH'
    ],
    oe = [],
    le = [],
    ae = '',
    ie = y.documentElement,
    ue =
      oe.indexOf ||
      function (e) {
        for (var t = this.length; t-- && this[t] !== e;);
        return t
      },
    ce = C.prototype,
    se = ce.hasOwnProperty,
    me = ce.isPrototypeOf,
    fe = C.defineProperty,
    pe = [],
    de = C.getOwnPropertyDescriptor,
    he = C.getOwnPropertyNames,
    Te = C.getPrototypeOf,
    Le = C.setPrototypeOf,
    Me = !!C.__proto__,
    Ee = !1,
    ve = '__dreCEv1',
    He = e.customElements,
    ge =
      !/^force/.test(t.type) && !!(He && He.define && He.get && He.whenDefined),
    be = C.create || C,
    ye =
      e.Map ||
      function () {
        var e,
          t = [],
          n = []
        return {
          get: function (e) {
            return n[ue.call(t, e)]
          },
          set: function (r, o) {
            ;(e = ue.call(t, r)), e < 0 ? (n[t.push(r) - 1] = o) : (n[e] = o)
          }
        }
      },
    Ce =
      e.Promise ||
      function (e) {
        function t (e) {
          for (r = !0; n.length;) n.shift()(e)
        }
        var n = [],
          r = !1,
          o = {
            catch: function () {
              return o
            },
            then: function (e) {
              return n.push(e), r && setTimeout(t, 1), o
            }
          }
        return e(t), o
      },
    we = !1,
    Ae = be(null),
    Oe = be(null),
    Ne = new ye(),
    De = function (e) {
      return e.toLowerCase()
    },
    Ie =
      C.create ||
      function it (e) {
        return e ? ((it.prototype = e), new it()) : this
      },
    Fe =
      Le ||
      (Me
        ? function (e, t) {
          return (e.__proto__ = t), e
        }
        : he && de
          ? (function () {
            function e (e, t) {
              for (var n, r = he(t), o = 0, l = r.length; o < l; o++) { (n = r[o]), se.call(e, n) || fe(e, n, de(t, n)) }
            }
            return function (t, n) {
              do {
                e(t, n)
              } while ((n = Te(n)) && !me.call(n, t))
              return t
            }
          })()
          : function (e, t) {
            for (var n in t) e[n] = t[n]
            return e
          }),
    Se = e.MutationObserver || e.WebKitMutationObserver,
    Ve = e.HTMLAnchorElement,
    Pe = (e.HTMLElement || e.Element || e.Node).prototype,
    Re = !me.call(Pe, ie),
    Ue = Re
      ? function (e, t, n) {
        return (e[t] = n.value), e
      }
      : fe,
    ke = Re
      ? function (e) {
        return e.nodeType === 1
      }
      : function (e) {
        return me.call(Pe, e)
      },
    _e = Re && [],
    xe = Pe.attachShadow,
    qe = Pe.cloneNode,
    Be = Pe.dispatchEvent,
    Ze = Pe.getAttribute,
    je = Pe.hasAttribute,
    Ge = Pe.removeAttribute,
    ze = Pe.setAttribute,
    Ke = y.createElement,
    Xe = y.importNode,
    $e = Ke,
    Qe = Se && { attributes: !0, characterData: !0, attributeOldValue: !0 },
    We =
      Se ||
      function (e) {
        ;(nt = !1), ie.removeEventListener(W, We)
      },
    Ye = 0,
    Je = R in y && !/^force-all/.test(t.type),
    et = !0,
    tt = !1,
    nt = !0,
    rt = !0,
    ot = !0
  if (
    (Se &&
      ((P = y.createElement('div')),
      (P.innerHTML = '<div><div></div></div>'),
      new Se(function (e, t) {
        if (
          e[0] &&
          e[0].type == 'childList' &&
          !e[0].removedNodes[0].childNodes.length
        ) {
          P = de(Pe, 'innerHTML')
          var n = P && P.set
          n &&
            fe(Pe, 'innerHTML', {
              set: function (e) {
                for (; this.lastChild;) this.removeChild(this.lastChild)
                n.call(this, e)
              }
            })
        }
        t.disconnect(), (P = null)
      }).observe(P, { childList: !0, subtree: !0 }),
      (P.innerHTML = '')),
    Je ||
      (Le || Me
        ? ((S = function (e, t) {
          me.call(t, e) || p(e, t)
        }),
        (V = p))
        : ((S = function (e, t) {
          e[U] || ((e[U] = C(!0)), p(e, t))
        }),
        (V = S)),
      Re
        ? ((nt = !1),
        (function () {
          var e = de(Pe, k),
            t = e.value,
            n = function (e) {
              var t = new CustomEvent(W, { bubbles: !0 })
                ;(t.attrName = e),
              (t.prevValue = Ze.call(this, e)),
              (t.newValue = null),
              (t[Q] = t.attrChange = 2),
              Ge.call(this, e),
              Be.call(this, t)
            },
            r = function (e, t) {
              var n = je.call(this, e),
                r = n && Ze.call(this, e),
                o = new CustomEvent(W, { bubbles: !0 })
              ze.call(this, e, t),
              (o.attrName = e),
              (o.prevValue = n ? r : null),
              (o.newValue = t),
              n
                ? (o.MODIFICATION = o.attrChange = 1)
                : (o[$] = o.attrChange = 0),
              Be.call(this, o)
            },
            o = function (e) {
              var t,
                n = e.currentTarget,
                r = n[U],
                o = e.propertyName
              r.hasOwnProperty(o) &&
                  ((r = r[o]),
                  (t = new CustomEvent(W, { bubbles: !0 })),
                  (t.attrName = r.name),
                  (t.prevValue = r.value || null),
                  (t.newValue = r.value = n[o] || null),
                  t.prevValue == null
                    ? (t[$] = t.attrChange = 0)
                    : (t.MODIFICATION = t.attrChange = 1),
                  Be.call(n, t))
            }
            ;(e.value = function (e, l, a) {
            e === W &&
                this[Z] &&
                this.setAttribute !== r &&
                ((this[U] = {
                  className: { name: 'class', value: this.className }
                }),
                (this.setAttribute = r),
                (this.removeAttribute = n),
                t.call(this, 'propertychange', o)),
            t.call(this, e, l, a)
          }),
          fe(Pe, k, e)
        })())
        : Se ||
          (ie[k](W, We),
          ie.setAttribute(U, 1),
          ie.removeAttribute(U),
          nt &&
            ((O = function (e) {
              var t,
                n,
                r,
                o = this
              if (o === e.target) {
                ;(t = o[U]), (o[U] = n = D(o))
                for (r in n) {
                  if (!(r in t)) return N(0, o, r, t[r], n[r], $)
                  if (n[r] !== t[r]) { return N(1, o, r, t[r], n[r], 'MODIFICATION') }
                }
                for (r in t) if (!(r in n)) return N(2, o, r, t[r], n[r], Q)
              }
            }),
            (N = function (e, t, n, r, o, l) {
              var a = {
                attrChange: e,
                currentTarget: t,
                attrName: n,
                prevValue: r,
                newValue: o
              }
              ;(a[l] = e), u(a)
            }),
            (D = function (e) {
              for (
                var t, n, r = {}, o = e.attributes, l = 0, a = o.length;
                l < a;
                l++
              ) { (t = o[l]), (n = t.name) !== 'setAttribute' && (r[n] = t.value) }
              return r
            }))),
      (y[R] = function (e, t) {
        if (
          ((n = e.toUpperCase()),
          et &&
            ((et = !1),
            Se
              ? ((I = (function (e, t) {
                function n (e, t) {
                  for (var n = 0, r = e.length; n < r; t(e[n++]));
                }
                return new Se(function (r) {
                  for (var o, l, a, i = 0, u = r.length; i < u; i++) {
                    (o = r[i]),
                    o.type === 'childList'
                      ? (n(o.addedNodes, e), n(o.removedNodes, t))
                      : ((l = o.target),
                      ot &&
                              l[Z] &&
                              o.attributeName !== 'style' &&
                              (a = Ze.call(l, o.attributeName)) !==
                                o.oldValue &&
                              l[Z](o.attributeName, o.oldValue, a))
                  }
                })
              })(l(_), l(q))),
              (F = function (e) {
                return I.observe(e, { childList: !0, subtree: !0 }), e
              }),
              F(y),
              xe &&
                  (Pe.attachShadow = function () {
                    return F(xe.apply(this, arguments))
                  }))
              : ((A = []),
              y[k]('DOMNodeInserted', c(_)),
              y[k]('DOMNodeRemoved', c(q))),
            y[k](Y, s),
            y[k]('readystatechange', s),
            (y.importNode = function (e, t) {
              switch (e.nodeType) {
                case 1:
                  return f(y, Xe, [e, !!t])
                case 11:
                  for (
                    var n = y.createDocumentFragment(),
                      r = e.childNodes,
                      o = r.length,
                      l = 0;
                    l < o;
                    l++
                  ) { n.appendChild(y.importNode(r[l], !!t)) }
                  return n
                default:
                  return qe.call(e, !!t)
              }
            }),
            (Pe.cloneNode = function (e) {
              return f(this, qe, [!!e])
            })),
          tt)
        ) { return (tt = !1) }
        if (
          (ue.call(oe, te + n) + ue.call(oe, ee + n) > -2 && h(e),
          !ne.test(n) || ue.call(re, n) > -1)
        ) { throw new Error('The type ' + e + ' is invalid') }
        var n,
          o,
          a = function () {
            return u ? y.createElement(m, n) : y.createElement(m)
          },
          i = t || ce,
          u = se.call(i, B),
          m = u ? t[B].toUpperCase() : n
        return (
          u && ue.call(oe, ee + m) > -1 && h(m),
          (o = oe.push((u ? te : ee) + n) - 1),
          (ae = ae.concat(
            ae.length ? ',' : '',
            u ? m + '[is="' + e.toLowerCase() + '"]' : m
          )),
          (a.prototype = le[o] = se.call(i, 'prototype')
            ? i.prototype
            : Ie(Pe)),
          ae.length && r(y.querySelectorAll(ae), _),
          a
        )
      }),
      (y.createElement = $e = function (e, t) {
        var n = v(t),
          r = n ? Ke.call(y, e, De(n)) : Ke.call(y, e),
          o = '' + e,
          l = ue.call(oe, (n ? te : ee) + (n || o).toUpperCase()),
          a = l > -1
        return (
          n &&
            (r.setAttribute('is', (n = n.toLowerCase())),
            a && (a = i(o.toUpperCase(), n))),
          (ot = !y.createElement.innerHTMLHelper),
          a && V(r, le[l]),
          r
        )
      })),
    (L.prototype = {
      constructor: L,
      define: ge
        ? function (e, t, n) {
          if (n) M(e, t, n)
          else {
            var r = e.toUpperCase()
              ;(Ae[r] = { constructor: t, create: [r] }),
            Ne.set(t, r),
            He.define(e, t)
          }
        }
        : M,
      get: ge
        ? function (e) {
          return He.get(e) || E(e)
        }
        : E,
      whenDefined: ge
        ? function (e) {
          return Ce.race([He.whenDefined(e), g(e)])
        }
        : g
    }),
    !He || /^force/.test(t.type))
  ) { b() } else if (!t.noBuiltIn) {
    try {
      !(function (t, n, r) {
        var o = new RegExp('^<a\\s+is=(\'|")' + r + '\\1></a>$')
        if (
          ((n[B] = 'a'),
          (t.prototype = Ie(Ve.prototype)),
          (t.prototype.constructor = t),
          e.customElements.define(r, t, n),
          !o.test(y.createElement('a', { is: r }).outerHTML) ||
            !o.test(new t().outerHTML))
        ) { throw n }
      })(
        function ut () {
          return Reflect.construct(Ve, [], ut)
        },
        {},
        'document-register-element-a'
      )
    } catch (lt) {
      b()
    }
  }
  if (!t.noBuiltIn) {
    try {
      if (Ke.call(y, 'a', 'a').outerHTML.indexOf('is') < 0) throw {}
    } catch (at) {
      De = function (e) {
        return { is: e.toLowerCase() }
      }
    }
  }
})(window)
