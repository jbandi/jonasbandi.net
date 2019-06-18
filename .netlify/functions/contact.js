!(function(t, e) {
  for (var i in e) t[i] = e[i]
})(
  exports,
  (function(t) {
    var e = {}
    function i(n) {
      if (e[n]) return e[n].exports
      var a = (e[n] = {i: n, l: !1, exports: {}})
      return t[n].call(a.exports, a, a.exports, i), (a.l = !0), a.exports
    }
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
      }),
      (i.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {value: 'Module'}),
          Object.defineProperty(t, '__esModule', {value: !0})
      }),
      (i.t = function(t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t
        var n = Object.create(null)
        if (
          (i.r(n),
          Object.defineProperty(n, 'default', {enumerable: !0, value: t}),
          2 & e && 'string' != typeof t)
        )
          for (var a in t)
            i.d(
              n,
              a,
              function(e) {
                return t[e]
              }.bind(null, a),
            )
        return n
      }),
      (i.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default
              }
            : function() {
                return t
              }
        return i.d(e, 'a', e), e
      }),
      (i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (i.p = ''),
      i((i.s = 165))
    )
  })([
    ,
    function(t, e) {
      t.exports = require('stream')
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          r,
          o = e.children || [],
          s = o.length,
          l = [],
          c = -1
        for (; ++c < s; )
          (i = a(t, o[c], e)) &&
            (c &&
              'break' === o[c - 1].type &&
              (i.value && (i.value = n.left(i.value)),
              (r = i.children && i.children[0]) &&
                r.value &&
                (r.value = n.left(r.value))),
            (l = l.concat(i)))
        return l
      }
      var n = i(10),
        a = i(89)
    },
    function(t, e, i) {
      'use strict'
      const n = i(8),
        a = i(20),
        r = i(21),
        o = i(29),
        s = i(68),
        l = i(32),
        c = (t, e, i) => {
          s['resolve' + t](e, (t, e) => {
            if (t) {
              switch (t.code) {
                case s.NODATA:
                case s.NOTFOUND:
                case s.NOTIMP:
                  return i(null, [])
              }
              return i(t)
            }
            return i(null, Array.isArray(e) ? e : [].concat(e || []))
          })
        },
        p = (t.exports.dnsCache = new Map())
      function u(t, e) {
        let i = !1,
          n = [],
          a = 0
        t.on('error', t => {
          i || ((i = !0), e(t))
        }),
          t.on('readable', () => {
            let e
            for (; null !== (e = t.read()); ) n.push(e), (a += e.length)
          }),
          t.on('end', () => {
            if (i) return
            let t
            i = !0
            try {
              t = Buffer.concat(n, a)
            } catch (t) {
              return e(t)
            }
            e(null, t)
          })
      }
      ;(t.exports.resolveHostname = (t, e) => {
        if (!(t = t || {}).host || l.isIP(t.host)) {
          let i = {host: t.host, servername: t.servername || !1}
          return e(null, i)
        }
        let i
        if (
          p.has(t.host) &&
          (!(i = p.get(t.host)).expires || i.expires >= Date.now())
        )
          return e(null, {
            host: i.value.host,
            servername: i.value.servername,
            _cached: !0,
          })
        c(4, t.host, (n, a) => {
          if (n) return i ? e(null, i.value) : e(n)
          if (a && a.length) {
            let i = {host: a[0] || t.host, servername: t.servername || t.host}
            return (
              p.set(t.host, {value: i, expires: Date.now() + 3e5}), e(null, i)
            )
          }
          c(6, t.host, (n, a) => {
            if (n) return i ? e(null, i.value) : e(n)
            if (a && a.length) {
              let i = {host: a[0] || t.host, servername: t.servername || t.host}
              return (
                p.set(t.host, {value: i, expires: Date.now() + 3e5}), e(null, i)
              )
            }
            try {
              s.lookup(t.host, {}, (n, a) => {
                if (n) return i ? e(null, i.value) : e(n)
                if (!a && i) return e(null, i.value)
                let r = {host: a || t.host, servername: t.servername || t.host}
                return (
                  p.set(t.host, {value: r, expires: Date.now() + 3e5}),
                  e(null, r)
                )
              })
            } catch (n) {
              return i ? e(null, i.value) : e(n)
            }
          })
        })
      }),
        (t.exports.parseConnectionUrl = t => {
          t = t || ''
          let e = {}
          return (
            [n.parse(t, !0)].forEach(t => {
              let i
              switch (t.protocol) {
                case 'smtp:':
                  e.secure = !1
                  break
                case 'smtps:':
                  e.secure = !0
                  break
                case 'direct:':
                  e.direct = !0
              }
              !isNaN(t.port) && Number(t.port) && (e.port = Number(t.port)),
                t.hostname && (e.host = t.hostname),
                t.auth &&
                  ((i = t.auth.split(':')),
                  e.auth || (e.auth = {}),
                  (e.auth.user = i.shift()),
                  (e.auth.pass = i.join(':'))),
                Object.keys(t.query || {}).forEach(i => {
                  let n = e,
                    a = i,
                    r = t.query[i]
                  switch ((isNaN(r) || (r = Number(r)), r)) {
                    case 'true':
                      r = !0
                      break
                    case 'false':
                      r = !1
                  }
                  if (0 === i.indexOf('tls.'))
                    (a = i.substr(4)), e.tls || (e.tls = {}), (n = e.tls)
                  else if (i.indexOf('.') >= 0) return
                  a in n || (n[a] = r)
                })
            }),
            e
          )
        }),
        (t.exports._logFunc = (t, e, i, n, a, ...r) => {
          let o = {}
          Object.keys(i || {}).forEach(t => {
            'level' !== t && (o[t] = i[t])
          }),
            Object.keys(n || {}).forEach(t => {
              'level' !== t && (o[t] = n[t])
            }),
            t[e](o, a, ...r)
        }),
        (t.exports.getLogger = (e, i) => {
          let n = {},
            r = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
          if (!(e = e || {}).logger)
            return (
              r.forEach(t => {
                n[t] = () => !1
              }),
              n
            )
          let o = e.logger
          return (
            !0 === e.logger &&
              (o = (function(t) {
                let e = 0,
                  i = new Map()
                t.forEach(t => {
                  t.length > e && (e = t.length)
                }),
                  t.forEach(t => {
                    let n = t.toUpperCase()
                    n.length < e && (n += ' '.repeat(e - n.length)), i.set(t, n)
                  })
                let n = {}
                return (
                  t.forEach(t => {
                    n[t] = ((t, e, n, ...r) => {
                      let o = ''
                      e &&
                        ('server' === e.tnx
                          ? (o = 'S: ')
                          : 'client' === e.tnx && (o = 'C: '),
                        e.sid && (o = '[' + e.sid + '] ' + o),
                        e.cid && (o = '[#' + e.cid + '] ' + o)),
                        (n = a.format(n, ...r)).split(/\r?\n/).forEach(e => {
                          console.log(
                            '[%s] %s %s',
                            new Date()
                              .toISOString()
                              .substr(0, 19)
                              .replace(/T/, ' '),
                            i.get(t),
                            o + e,
                          )
                        })
                    }).bind(null, t)
                  }),
                  n
                )
              })(r)),
            r.forEach(e => {
              n[e] = (n, a, ...r) => {
                t.exports._logFunc(o, e, i, n, a, ...r)
              }
            }),
            n
          )
        }),
        (t.exports.callbackPromise = (t, e) =>
          function() {
            let i = Array.from(arguments),
              n = i.shift()
            n ? e(n) : t(...i)
          }),
        (t.exports.resolveContent = (e, i, n) => {
          let a
          n ||
            (a = new Promise((e, i) => {
              n = t.exports.callbackPromise(e, i)
            }))
          let s,
            l = (e && e[i] && e[i].content) || e[i],
            c = (('object' == typeof e[i] && e[i].encoding) || 'utf8')
              .toString()
              .toLowerCase()
              .replace(/[-_\s]/g, '')
          if (!l) return n(null, l)
          if ('object' == typeof l) {
            if ('function' == typeof l.pipe)
              return u(l, (t, a) => {
                if (t) return n(t)
                ;(e[i] = a), n(null, a)
              })
            if (/^https?:\/\//i.test(l.path || l.href))
              return u((s = o(l.path || l.href)), n)
            if (/^data:/i.test(l.path || l.href)) {
              let t = (l.path || l.href).match(
                /^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i,
              )
              return n(
                null,
                t
                  ? /\bbase64$/i.test(t[1])
                    ? Buffer.from(t[2], 'base64')
                    : Buffer.from(decodeURIComponent(t[2]))
                  : Buffer.from(0),
              )
            }
            if (l.path) return u(r.createReadStream(l.path), n)
          }
          return (
            'string' != typeof e[i].content ||
              ['utf8', 'usascii', 'ascii'].includes(c) ||
              (l = Buffer.from(e[i].content, c)),
            setImmediate(() => n(null, l)),
            a
          )
        }),
        (t.exports.assign = function() {
          let t = Array.from(arguments),
            e = t.shift() || {}
          return (
            t.forEach(t => {
              Object.keys(t || {}).forEach(i => {
                ;['tls', 'auth'].includes(i) && t[i] && 'object' == typeof t[i]
                  ? (e[i] || (e[i] = {}),
                    Object.keys(t[i]).forEach(n => {
                      e[i][n] = t[i][n]
                    }))
                  : (e[i] = t[i])
              })
            }),
            e
          )
        }),
        (t.exports.encodeXText = t => {
          if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(t)) return t
          let e = Buffer.from(t),
            i = ''
          for (let t = 0, n = e.length; t < n; t++) {
            let n = e[t]
            i +=
              n < 33 || n > 126 || 43 === n || 61 === n
                ? '+' + (n < 16 ? '0' : '') + n.toString(16).toUpperCase()
                : String.fromCharCode(n)
          }
          return i
        })
    },
    function(t, e, i) {
      'use strict'
      var n = i(258)
      t.exports = function(t, e, i) {
        var a
        null != i ||
          ('object' == typeof e && !Array.isArray(e)) ||
          ((i = e), (e = {}))
        ;(a = n({type: String(t)}, e)),
          Array.isArray(i)
            ? (a.children = i)
            : null != i && (a.value = String(i))
        return a
      }
    },
    ,
    function(t, e) {
      t.exports = function() {
        for (var t = {}, e = 0; e < arguments.length; e++) {
          var n = arguments[e]
          for (var a in n) i.call(n, a) && (t[a] = n[a])
        }
        return t
      }
      var i = Object.prototype.hasOwnProperty
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return a.test('number' == typeof t ? n(t) : t.charAt(0))
      }
      var n = String.fromCharCode,
        a = /\s/
    },
    function(t, e) {
      t.exports = require('url')
    },
    function(t) {
      t.exports = {
        name: 'nodemailer',
        version: '5.1.1',
        description:
          'Easy as cake e-mail sending from your Node.js applications',
        main: 'lib/nodemailer.js',
        scripts: {test: 'grunt'},
        repository: {
          type: 'git',
          url: 'https://github.com/nodemailer/nodemailer.git',
        },
        keywords: ['Nodemailer'],
        author: 'Andris Reinman',
        license: 'MIT',
        bugs: {url: 'https://github.com/nodemailer/nodemailer/issues'},
        homepage: 'https://nodemailer.com/',
        devDependencies: {
          bunyan: '1.8.12',
          chai: '4.2.0',
          'eslint-config-nodemailer': '1.2.0',
          'eslint-config-prettier': '3.3.0',
          grunt: '1.0.3',
          'grunt-cli': '1.3.2',
          'grunt-eslint': '21.0.0',
          'grunt-mocha-test': '0.13.3',
          libbase64: '1.0.3',
          libmime: '4.0.1',
          libqp: '1.1.0',
          mocha: '5.2.0',
          'nodemailer-ntlm-auth': '1.0.1',
          proxy: '0.2.4',
          'proxy-test-server': '1.0.0',
          sinon: '7.2.2',
          'smtp-server': '3.5.0',
        },
        engines: {node: '>=6.0.0'},
        dependencies: {},
      }
    },
    function(t, e) {
      ;((e = t.exports = function(t) {
        return t.replace(/^\s*|\s*$/g, '')
      }).left = function(t) {
        return t.replace(/^\s*/, '')
      }),
        (e.right = function(t) {
          return t.replace(/\s*$/, '')
        })
    },
    function(t, e) {
      t.exports = require('crypto')
    },
    ,
    ,
    ,
    function(t, e) {
      t.exports = require('events')
    },
    function(t, e) {
      t.exports = require('path')
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = [],
          a = -1,
          r = t.length
        e && i.push(n('text', '\n'))
        for (; ++a < r; ) a && i.push(n('text', '\n')), i.push(t[a])
        e && 0 !== t.length && i.push(n('text', '\n'))
        return i
      }
      var n = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i
        if (
          null != e &&
          'string' != typeof e &&
          ('object' != typeof e || 0 === e.length)
        )
          throw new Error(
            'Expected `string` or `Array.<string>` for `tagNames`, not `' +
              e +
              '`',
          )
        if (
          !t ||
          'object' != typeof t ||
          'element' !== t.type ||
          'string' != typeof t.tagName
        )
          return !1
        if (null == e) return !0
        if (((i = t.tagName), 'string' == typeof e)) return i === e
        return -1 !== e.indexOf(i)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(105),
        a = i(103),
        r = i(106)
      t.exports = function(t) {
        var e,
          i,
          o = t.space,
          s = t.mustUseProperty || [],
          l = t.attributes || {},
          c = t.properties,
          p = t.transform,
          u = {},
          d = {}
        for (e in c)
          (i = new r(e, p(l, e), c[e], o)),
            -1 !== s.indexOf(e) && (i.mustUseProperty = !0),
            (u[e] = i),
            (d[n(e)] = e),
            (d[n(i.attribute)] = e)
        return new a(u, d, o)
      }
    },
    function(t, e) {
      t.exports = require('util')
    },
    function(t, e) {
      t.exports = require('fs')
    },
    function(t, e, i) {
      'use strict'
      function n(t) {
        if ('string' == typeof t)
          return (function(t) {
            return function(e) {
              return Boolean(e && e.type === t)
            }
          })(t)
        if (null == t) return a
        if ('object' == typeof t)
          return ('length' in t
            ? function(t) {
                var e = (function(t) {
                    var e = [],
                      i = t.length,
                      a = -1
                    for (; ++a < i; ) e[a] = n(t[a])
                    return e
                  })(t),
                  i = e.length
                return function() {
                  var t = -1
                  for (; ++t < i; ) if (e[t].apply(this, arguments)) return !0
                  return !1
                }
              }
            : function(t) {
                return function(e) {
                  var i
                  for (i in t) if (e[i] !== t[i]) return !1
                  return !0
                }
              })(t)
        if ('function' == typeof t) return t
        throw new Error('Expected function, string, or object as test')
      }
      function a() {
        return !0
      }
      t.exports = function t(e, i, a, r, o) {
        var s = null != r
        var l = null != a
        var c = n(e)
        if (l && ('number' != typeof a || a < 0 || a === 1 / 0))
          throw new Error('Expected positive finite index or child node')
        if (s && (!t(null, r) || !r.children))
          throw new Error('Expected parent node')
        if (!i || !i.type || 'string' != typeof i.type) return !1
        if (s !== l) throw new Error('Expected both parent and index')
        return Boolean(c.call(o, i, a, r))
      }
    },
    function(t, e, i) {
      'use strict'
      /*!
       * repeat-string <https://github.com/jonschlinkert/repeat-string>
       *
       * Copyright (c) 2014-2015, Jon Schlinkert.
       * Licensed under the MIT License.
       */ var n,
        a = ''
      t.exports = function(t, e) {
        if ('string' != typeof t) throw new TypeError('expected a string')
        if (1 === e) return t
        if (2 === e) return t + t
        var i = t.length * e
        if (n !== t || void 0 === n) (n = t), (a = '')
        else if (a.length >= i) return a.substr(0, i)
        for (; i > a.length && e > 1; ) 1 & e && (a += t), (e >>= 1), (t += t)
        return (a = (a += t).substr(0, i))
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(51),
        a = i(94),
        r = i(95)
      t.exports = function(t) {
        var e,
          i,
          o = t.space,
          s = t.mustUseProperty || [],
          l = t.attributes || {},
          c = t.properties,
          p = t.transform,
          u = {},
          d = {}
        for (e in c)
          (i = new r(e, p(l, e), c[e], o)),
            -1 !== s.indexOf(e) && (i.mustUseProperty = !0),
            (u[e] = i),
            (d[n(e)] = e),
            (d[n(i.attribute)] = e)
        return new a(u, d, o)
      }
    },
    ,
    ,
    ,
    ,
    function(t, e, i) {
      'use strict'
      const n = i(30),
        a = i(31),
        r = i(8),
        o = i(42),
        s = i(1).PassThrough,
        l = i(168),
        c = i(9),
        p = 5
      ;(t.exports = function(t, e) {
        return (function t(e, i) {
          i = i || {}
          i.fetchRes = i.fetchRes || new s()
          i.cookies = i.cookies || new l()
          i.redirects = i.redirects || 0
          i.maxRedirects = isNaN(i.maxRedirects) ? p : i.maxRedirects
          i.cookie &&
            ([].concat(i.cookie || []).forEach(t => {
              i.cookies.set(t, e)
            }),
            (i.cookie = !1))
          let u = i.fetchRes
          let d = r.parse(e)
          let h =
            (i.method || '')
              .toString()
              .trim()
              .toUpperCase() || 'GET'
          let m = !1
          let f
          let g
          let v = 'https:' === d.protocol ? a : n
          let x = {
            'accept-encoding': 'gzip,deflate',
            'user-agent': 'nodemailer/' + c.version,
          }
          Object.keys(i.headers || {}).forEach(t => {
            x[t.toLowerCase().trim()] = i.headers[t]
          })
          i.userAgent && (x['user-agent'] = i.userAgent)
          d.auth &&
            (x.Authorization =
              'Basic ' + Buffer.from(d.auth).toString('base64'))
          ;(f = i.cookies.get(e)) && (x.cookie = f)
          if (i.body) {
            if (
              (!1 !== i.contentType &&
                (x['Content-Type'] =
                  i.contentType || 'application/x-www-form-urlencoded'),
              'function' == typeof i.body.pipe)
            )
              (x['Transfer-Encoding'] = 'chunked'),
                (g = i.body).on('error', t => {
                  m ||
                    ((m = !0),
                    (t.type = 'FETCH'),
                    (t.sourceUrl = e),
                    u.emit('error', t))
                })
            else {
              if (i.body instanceof Buffer) g = i.body
              else if ('object' == typeof i.body)
                try {
                  g = Buffer.from(
                    Object.keys(i.body)
                      .map(t => {
                        let e = i.body[t].toString().trim()
                        return (
                          encodeURIComponent(t) + '=' + encodeURIComponent(e)
                        )
                      })
                      .join('&'),
                  )
                } catch (t) {
                  if (m) return
                  return (
                    (m = !0),
                    (t.type = 'FETCH'),
                    (t.sourceUrl = e),
                    void u.emit('error', t)
                  )
                }
              else g = Buffer.from(i.body.toString().trim())
              ;(x['Content-Type'] =
                i.contentType || 'application/x-www-form-urlencoded'),
                (x['Content-Length'] = g.length)
            }
            h =
              (i.method || '')
                .toString()
                .trim()
                .toUpperCase() || 'POST'
          }
          let b
          let y = {
            method: h,
            host: d.hostname,
            path: d.path,
            port: d.port ? d.port : 'https:' === d.protocol ? 443 : 80,
            headers: x,
            rejectUnauthorized: !1,
            agent: !1,
          }
          i.tls &&
            Object.keys(i.tls).forEach(t => {
              y[t] = i.tls[t]
            })
          try {
            b = v.request(y)
          } catch (t) {
            return (
              (m = !0),
              setImmediate(() => {
                ;(t.type = 'FETCH'), (t.sourceUrl = e), u.emit('error', t)
              }),
              u
            )
          }
          i.timeout &&
            b.setTimeout(i.timeout, () => {
              if (m) return
              ;(m = !0), b.abort()
              let t = new Error('Request Timeout')
              ;(t.type = 'FETCH'), (t.sourceUrl = e), u.emit('error', t)
            })
          b.on('error', t => {
            m ||
              ((m = !0),
              (t.type = 'FETCH'),
              (t.sourceUrl = e),
              u.emit('error', t))
          })
          b.on('response', n => {
            let a
            if (!m) {
              switch (n.headers['content-encoding']) {
                case 'gzip':
                case 'deflate':
                  a = o.createUnzip()
              }
              if (
                (n.headers['set-cookie'] &&
                  [].concat(n.headers['set-cookie'] || []).forEach(t => {
                    i.cookies.set(t, e)
                  }),
                [301, 302, 303, 307, 308].includes(n.statusCode) &&
                  n.headers.location)
              ) {
                if ((i.redirects++, i.redirects > i.maxRedirects)) {
                  m = !0
                  let t = new Error('Maximum redirect count exceeded')
                  return (
                    (t.type = 'FETCH'),
                    (t.sourceUrl = e),
                    u.emit('error', t),
                    void b.abort()
                  )
                }
                return (
                  (i.method = 'GET'),
                  (i.body = !1),
                  t(r.resolve(e, n.headers.location), i)
                )
              }
              if (
                ((u.statusCode = n.statusCode),
                (u.headers = n.headers),
                n.statusCode >= 300 && !i.allowErrorResponse)
              ) {
                m = !0
                let t = new Error('Invalid status code ' + n.statusCode)
                return (
                  (t.type = 'FETCH'),
                  (t.sourceUrl = e),
                  u.emit('error', t),
                  void b.abort()
                )
              }
              n.on('error', t => {
                m ||
                  ((m = !0),
                  (t.type = 'FETCH'),
                  (t.sourceUrl = e),
                  u.emit('error', t),
                  b.abort())
              }),
                a
                  ? (n.pipe(a).pipe(u),
                    a.on('error', t => {
                      m ||
                        ((m = !0),
                        (t.type = 'FETCH'),
                        (t.sourceUrl = e),
                        u.emit('error', t),
                        b.abort())
                    }))
                  : n.pipe(u)
            }
          })
          setImmediate(() => {
            if (g)
              try {
                if ('function' == typeof g.pipe) return g.pipe(b)
                b.write(g)
              } catch (t) {
                return (
                  (m = !0),
                  (t.type = 'FETCH'),
                  (t.sourceUrl = e),
                  void u.emit('error', t)
                )
              }
            b.end()
          })
          return u
        })(t, e)
      }),
        (t.exports.Cookies = l)
    },
    function(t, e) {
      t.exports = require('http')
    },
    function(t, e) {
      t.exports = require('https')
    },
    function(t, e) {
      t.exports = require('net')
    },
    function(t, e) {
      t.exports = require('os')
    },
    function(t, e, i) {
      'use strict'
      const n = i(72),
        a = i(73),
        r = i(69)
      t.exports = {
        isPlainText: t =>
          'string' == typeof t &&
          !/[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/.test(t),
        hasLongerLines: (t, e) =>
          t.length > 131072 || new RegExp('^.{' + (e + 1) + ',}', 'm').test(t),
        encodeWord(t, e, i) {
          let r
          e = (e || 'Q')
            .toString()
            .toUpperCase()
            .trim()
            .charAt(0)
          if (
            ((i = i || 0) &&
              i > 7 + 'UTF-8'.length &&
              (i -= 7 + 'UTF-8'.length),
            'Q' === e
              ? (r = a.encode(t).replace(/[^a-z0-9!*+\-\/=]/gi, t => {
                  let e = t
                    .charCodeAt(0)
                    .toString(16)
                    .toUpperCase()
                  return ' ' === t ? '_' : '=' + (1 === e.length ? '0' + e : e)
                }))
              : 'B' === e &&
                ((r = 'string' == typeof t ? t : n.encode(t)),
                (i = i ? Math.max(3, ((i - (i % 4)) / 4) * 3) : 0)),
            i && ('B' !== e ? r : n.encode(t)).length > i)
          )
            if ('Q' === e)
              r = this.splitMimeEncodedString(r, i).join(
                '?= =?UTF-8?' + e + '?',
              )
            else {
              let t = [],
                a = ''
              for (let e = 0, o = r.length; e < o; e++) {
                let o = r.charAt(e)
                Buffer.byteLength(a + o) <= i || 0 === e
                  ? (a += o)
                  : (t.push(n.encode(a)), (a = o))
              }
              a && t.push(n.encode(a)),
                (r =
                  t.length > 1 ? t.join('?= =?UTF-8?' + e + '?') : t.join(''))
            }
          else 'B' === e && (r = n.encode(t))
          return '=?UTF-8?' + e + '?' + r + ('?=' === r.substr(-2) ? '' : '?=')
        },
        encodeWords(t, e, i, n) {
          let a
          i = i || 0
          let r = t.match(/(?:^|\s)([^\s]*[\u0080-\uFFFF])/)
          if (!r) return t
          if (n) return this.encodeWord(t, e, i)
          let o = t.match(/([\u0080-\uFFFF][^\s]*)[^\u0080-\uFFFF]*$/)
          if (!o) return t
          let s = r.index + (r[0].match(/[^\s]/) || {index: 0}).index,
            l = o.index + (o[1] || '').length
          return (a =
            (s ? t.substr(0, s) : '') +
            this.encodeWord(t.substring(s, l), e || 'Q', i) +
            (l < t.length ? t.substr(l) : ''))
        },
        buildHeaderValue(t) {
          let e = []
          return (
            Object.keys(t.params || {}).forEach(i => {
              let n = t.params[i]
              !this.isPlainText(n) || n.length >= 75
                ? this.buildHeaderParam(i, n, 50).forEach(t => {
                    ;/[\s"\\;:\/=(),<>@[\]?]|^[-']|'$/.test(t.value) &&
                    '*' !== t.key.substr(-1)
                      ? e.push(t.key + '=' + JSON.stringify(t.value))
                      : e.push(t.key + '=' + t.value)
                  })
                : /[\s'"\\;:\/=(),<>@[\]?]|^-/.test(n)
                ? e.push(i + '=' + JSON.stringify(n))
                : e.push(i + '=' + n)
            }),
            t.value + (e.length ? '; ' + e.join('; ') : '')
          )
        },
        buildHeaderParam(t, e, i) {
          let n,
            a,
            r,
            o,
            s,
            l,
            c = [],
            p = 'string' == typeof e ? e : (e || '').toString(),
            u = 0
          if (((i = i || 50), this.isPlainText(e))) {
            if (p.length <= i) return [{key: t, value: p}]
            ;(p = p.replace(
              new RegExp('.{' + i + '}', 'g'),
              t => (c.push({line: t}), ''),
            )) && c.push({line: p})
          } else {
            if (/[\uD800-\uDBFF]/.test(p)) {
              for (n = [], s = 0, l = p.length; s < l; s++)
                (r = (a = p.charAt(s)).charCodeAt(0)) >= 55296 &&
                r <= 56319 &&
                s < l - 1
                  ? ((a += p.charAt(s + 1)), n.push(a), s++)
                  : n.push(a)
              p = n
            }
            o = "utf-8''"
            let t = !0
            for (u = 0, s = 0, l = p.length; s < l; s++) {
              if (((a = p[s]), t)) a = this.safeEncodeURIComponent(a)
              else if (
                (a = ' ' === a ? a : this.safeEncodeURIComponent(a)) !== p[s]
              ) {
                if (!((this.safeEncodeURIComponent(o) + a).length >= i)) {
                  ;(t = !0), (s = u), (o = '')
                  continue
                }
                c.push({line: o, encoded: t}), (o = ''), (u = s - 1)
              }
              ;(o + a).length >= i
                ? (c.push({line: o, encoded: t}),
                  (o = a =
                    ' ' === p[s] ? ' ' : this.safeEncodeURIComponent(p[s])),
                  a === p[s] ? ((t = !1), (u = s - 1)) : (t = !0))
                : (o += a)
            }
            o && c.push({line: o, encoded: t})
          }
          return c.map((e, i) => ({
            key: t + '*' + i + (e.encoded ? '*' : ''),
            value: e.line,
          }))
        },
        parseHeaderValue(t) {
          let e,
            i = {value: !1, params: {}},
            n = !1,
            a = '',
            r = 'value',
            o = !1,
            s = !1
          for (let l = 0, c = t.length; l < c; l++)
            if (((e = t.charAt(l)), 'key' === r)) {
              if ('=' === e) {
                ;(n = a.trim().toLowerCase()), (r = 'value'), (a = '')
                continue
              }
              a += e
            } else {
              if (s) a += e
              else {
                if ('\\' === e) {
                  s = !0
                  continue
                }
                o && e === o
                  ? (o = !1)
                  : o || '"' !== e
                  ? o || ';' !== e
                    ? (a += e)
                    : (!1 === n
                        ? (i.value = a.trim())
                        : (i.params[n] = a.trim()),
                      (r = 'key'),
                      (a = ''))
                  : (o = e)
              }
              s = !1
            }
          return (
            'value' === r
              ? !1 === n
                ? (i.value = a.trim())
                : (i.params[n] = a.trim())
              : a.trim() && (i.params[a.trim().toLowerCase()] = ''),
            Object.keys(i.params).forEach(t => {
              let e, n, a, r
              ;(a = t.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) &&
                ((e = t.substr(0, a.index)),
                (n = Number(a[2] || a[3]) || 0),
                (i.params[e] && 'object' == typeof i.params[e]) ||
                  (i.params[e] = {charset: !1, values: []}),
                (r = i.params[t]),
                0 === n &&
                  '*' === a[0].substr(-1) &&
                  (a = r.match(/^([^']*)'[^']*'(.*)$/)) &&
                  ((i.params[e].charset = a[1] || 'iso-8859-1'), (r = a[2])),
                (i.params[e].values[n] = r),
                delete i.params[t])
            }),
            Object.keys(i.params).forEach(t => {
              let e
              i.params[t] &&
                Array.isArray(i.params[t].values) &&
                ((e = i.params[t].values.map(t => t || '').join('')),
                i.params[t].charset
                  ? (i.params[t] =
                      '=?' +
                      i.params[t].charset +
                      '?Q?' +
                      e
                        .replace(/[=?_\s]/g, t => {
                          let e = t.charCodeAt(0).toString(16)
                          return ' ' === t
                            ? '_'
                            : '%' + (e.length < 2 ? '0' : '') + e
                        })
                        .replace(/%/g, '=') +
                      '?=')
                  : (i.params[t] = e))
            }),
            i
          )
        },
        detectExtension: t => r.detectExtension(t),
        detectMimeType: t => r.detectMimeType(t),
        foldLines(t, e, i) {
          e = e || 76
          let n,
            a,
            r = 0,
            o = (t = (t || '').toString()).length,
            s = ''
          for (; r < o; ) {
            if ((n = t.substr(r, e)).length < e) {
              s += n
              break
            }
            ;(a = n.match(/^[^\n\r]*(\r?\n|\r)/))
              ? ((s += n = a[0]), (r += n.length))
              : ((a = n.match(/(\s+)[^\s]*$/)) &&
                a[0].length - (i ? (a[1] || '').length : 0) < n.length
                  ? (n = n.substr(
                      0,
                      n.length - (a[0].length - (i ? (a[1] || '').length : 0)),
                    ))
                  : (a = t.substr(r + n.length).match(/^[^\s]+(\s*)/)) &&
                    (n += a[0].substr(
                      0,
                      a[0].length - (i ? 0 : (a[1] || '').length),
                    )),
                (s += n),
                (r += n.length) < o && (s += '\r\n'))
          }
          return s
        },
        splitMimeEncodedString: (t, e) => {
          let i,
            n,
            a,
            r,
            o = []
          for (e = Math.max(e || 0, 12); t.length; ) {
            for (
              (n = (i = t.substr(0, e)).match(/[=][0-9A-F]?$/i)) &&
                (i = i.substr(0, n.index)),
                r = !1;
              !r;

            )
              (r = !0),
                (n = t.substr(i.length).match(/^[=]([0-9A-F]{2})/i)) &&
                  (a = parseInt(n[1], 16)) < 194 &&
                  a > 127 &&
                  ((i = i.substr(0, i.length - 3)), (r = !1))
            i.length && o.push(i), (t = t.substr(i.length))
          }
          return o
        },
        encodeURICharComponent: t => {
          let e = '',
            i = t
              .charCodeAt(0)
              .toString(16)
              .toUpperCase()
          if ((i.length % 2 && (i = '0' + i), i.length > 2))
            for (let t = 0, n = i.length / 2; t < n; t++)
              e += '%' + i.substr(t, 2)
          else e += '%' + i
          return e
        },
        safeEncodeURIComponent(t) {
          t = (t || '').toString()
          try {
            t = encodeURIComponent(t)
          } catch (e) {
            return t.replace(
              /[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g,
              '',
            )
          }
          return t.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, t =>
            this.encodeURICharComponent(t),
          )
        },
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e = 'string' == typeof t ? t.charCodeAt(0) : t
        return e >= 48 && e <= 57
      }
    },
    function(t, e, i) {
      'use strict'
      var n = {}
      function a(t, e, i) {
        var r,
          o,
          s,
          l,
          c,
          p = ''
        for (
          'string' != typeof e && ((i = e), (e = a.defaultChars)),
            void 0 === i && (i = !0),
            c = (function(t) {
              var e,
                i,
                a = n[t]
              if (a) return a
              for (a = n[t] = [], e = 0; e < 128; e++)
                (i = String.fromCharCode(e)),
                  /^[0-9a-z]$/i.test(i)
                    ? a.push(i)
                    : a.push(
                        '%' + ('0' + e.toString(16).toUpperCase()).slice(-2),
                      )
              for (e = 0; e < t.length; e++) a[t.charCodeAt(e)] = t[e]
              return a
            })(e),
            r = 0,
            o = t.length;
          r < o;
          r++
        )
          if (
            ((s = t.charCodeAt(r)),
            i &&
              37 === s &&
              r + 2 < o &&
              /^[0-9a-f]{2}$/i.test(t.slice(r + 1, r + 3)))
          )
            (p += t.slice(r, r + 3)), (r += 2)
          else if (s < 128) p += c[s]
          else if (s >= 55296 && s <= 57343) {
            if (
              s >= 55296 &&
              s <= 56319 &&
              r + 1 < o &&
              (l = t.charCodeAt(r + 1)) >= 56320 &&
              l <= 57343
            ) {
              ;(p += encodeURIComponent(t[r] + t[r + 1])), r++
              continue
            }
            p += '%EF%BF%BD'
          } else p += encodeURIComponent(t[r])
        return p
      }
      ;(a.defaultChars = ";/?:@&=+$,-_.!~*'()#"),
        (a.componentChars = "-_.!~*'()"),
        (t.exports = a)
    },
    function(t, e, i) {
      'use strict'
      var n = 0
      function a() {
        return Math.pow(2, ++n)
      }
      ;(e.boolean = a()),
        (e.booleanish = a()),
        (e.overloadedBoolean = a()),
        (e.number = a()),
        (e.spaceSeparated = a()),
        (e.commaSeparated = a()),
        (e.commaOrSpaceSeparated = a())
    },
    ,
    ,
    ,
    ,
    function(t, e) {
      t.exports = require('zlib')
    },
    function(t, e, i) {
      'use strict'
      const n = i(9),
        a = i(15).EventEmitter,
        r = i(32),
        o = i(74),
        s = i(33),
        l = i(11),
        c = i(180),
        p = i(1).PassThrough,
        u = i(3),
        d = 12e4,
        h = 6e5,
        m = 3e4
      t.exports = class extends a {
        constructor(t) {
          super(t),
            (this.id = l
              .randomBytes(8)
              .toString('base64')
              .replace(/\W/g, '')),
            (this.stage = 'init'),
            (this.options = t || {}),
            (this.secureConnection = !!this.options.secure),
            (this.alreadySecured = !!this.options.secured),
            (this.port =
              Number(this.options.port) || (this.secureConnection ? 465 : 587)),
            (this.host = this.options.host || 'localhost'),
            void 0 === this.options.secure &&
              465 === this.port &&
              (this.secureConnection = !0),
            (this.name = this.options.name || this._getHostname()),
            (this.logger = u.getLogger(this.options, {
              component: this.options.component || 'smtp-connection',
              sid: this.id,
            })),
            (this.customAuth = new Map()),
            Object.keys(this.options.customAuth || {}).forEach(t => {
              let e = (t || '')
                .toString()
                .trim()
                .toUpperCase()
              e && this.customAuth.set(e, this.options.customAuth[t])
            }),
            (this.version = n.version),
            (this.authenticated = !1),
            (this.destroyed = !1),
            (this.secure = !!this.secureConnection),
            (this._remainder = ''),
            (this._responseQueue = []),
            (this.lastServerResponse = !1),
            (this._socket = !1),
            (this._supportedAuth = []),
            (this._envelope = !1),
            (this._supportedExtensions = []),
            (this._maxAllowedSize = 0),
            (this._responseActions = []),
            (this._recipientQueue = []),
            (this._greetingTimeout = !1),
            (this._connectionTimeout = !1),
            (this._destroyed = !1),
            (this._closing = !1)
        }
        connect(t) {
          if ('function' == typeof t) {
            this.once('connect', () => {
              this.logger.debug({tnx: 'smtp'}, 'SMTP handshake finished'), t()
            })
            const e = this._isDestroyedMessage('connect')
            if (e) return t(this._formatError(e, 'ECONNECTION', !1, 'CONN'))
          }
          let e = {port: this.port, host: this.host}
          this.options.localAddress &&
            (e.localAddress = this.options.localAddress)
          let i = () => {
            ;(this._connectionTimeout = setTimeout(() => {
              this._onError('Connection timeout', 'ETIMEDOUT', !1, 'CONN')
            }, this.options.connectionTimeout || d)),
              this._socket.on('error', t => {
                this._onError(t, 'ECONNECTION', !1, 'CONN')
              })
          }
          return this.options.connection
            ? ((this._socket = this.options.connection),
              void (this.secureConnection && !this.alreadySecured
                ? setImmediate(() =>
                    this._upgradeConnection(t => {
                      t
                        ? this._onError(
                            new Error(
                              'Error initiating TLS - ' + (t.message || t),
                            ),
                            'ETLS',
                            !1,
                            'CONN',
                          )
                        : this._onConnect()
                    }),
                  )
                : setImmediate(() => this._onConnect())))
            : this.options.socket
            ? ((this._socket = this.options.socket),
              u.resolveHostname(e, (t, n) => {
                if (t)
                  return setImmediate(() =>
                    this._onError(t, 'EDNS', !1, 'CONN'),
                  )
                this.logger.debug(
                  {
                    tnx: 'dns',
                    source: e.host,
                    resolved: n.host,
                    cached: !!n._cached,
                  },
                  'Resolved %s as %s [cache %s]',
                  e.host,
                  n.host,
                  n._cached ? 'hit' : 'miss',
                ),
                  Object.keys(n).forEach(t => {
                    '_' !== t.charAt(0) && n[t] && (e[t] = n[t])
                  })
                try {
                  this._socket.connect(this.port, this.host, () => {
                    this._socket.setKeepAlive(!0), this._onConnect()
                  }),
                    i()
                } catch (t) {
                  return setImmediate(() =>
                    this._onError(t, 'ECONNECTION', !1, 'CONN'),
                  )
                }
              }))
            : this.secureConnection
            ? (this.options.tls &&
                Object.keys(this.options.tls).forEach(t => {
                  e[t] = this.options.tls[t]
                }),
              u.resolveHostname(e, (t, n) => {
                if (t)
                  return setImmediate(() =>
                    this._onError(t, 'EDNS', !1, 'CONN'),
                  )
                this.logger.debug(
                  {
                    tnx: 'dns',
                    source: e.host,
                    resolved: n.host,
                    cached: !!n._cached,
                  },
                  'Resolved %s as %s [cache %s]',
                  e.host,
                  n.host,
                  n._cached ? 'hit' : 'miss',
                ),
                  Object.keys(n).forEach(t => {
                    '_' !== t.charAt(0) && n[t] && (e[t] = n[t])
                  })
                try {
                  ;(this._socket = o.connect(e, () => {
                    this._socket.setKeepAlive(!0), this._onConnect()
                  })),
                    i()
                } catch (t) {
                  return setImmediate(() =>
                    this._onError(t, 'ECONNECTION', !1, 'CONN'),
                  )
                }
              }))
            : u.resolveHostname(e, (t, n) => {
                if (t)
                  return setImmediate(() =>
                    this._onError(t, 'EDNS', !1, 'CONN'),
                  )
                this.logger.debug(
                  {
                    tnx: 'dns',
                    source: e.host,
                    resolved: n.host,
                    cached: !!n._cached,
                  },
                  'Resolved %s as %s [cache %s]',
                  e.host,
                  n.host,
                  n._cached ? 'hit' : 'miss',
                ),
                  Object.keys(n).forEach(t => {
                    '_' !== t.charAt(0) && n[t] && (e[t] = n[t])
                  })
                try {
                  ;(this._socket = r.connect(e, () => {
                    this._socket.setKeepAlive(!0), this._onConnect()
                  })),
                    i()
                } catch (t) {
                  return setImmediate(() =>
                    this._onError(t, 'ECONNECTION', !1, 'CONN'),
                  )
                }
              })
        }
        quit() {
          this._sendCommand('QUIT'), this._responseActions.push(this.close)
        }
        close() {
          if (
            (clearTimeout(this._connectionTimeout),
            clearTimeout(this._greetingTimeout),
            (this._responseActions = []),
            this._closing)
          )
            return
          this._closing = !0
          let t = 'end'
          'init' === this.stage && (t = 'destroy'),
            this.logger.debug(
              {tnx: 'smtp'},
              'Closing connection to the server using "%s"',
              t,
            )
          let e = (this._socket && this._socket.socket) || this._socket
          if (e && !e.destroyed)
            try {
              this._socket[t]()
            } catch (t) {}
          this._destroy()
        }
        login(t, e) {
          const i = this._isDestroyedMessage('login')
          if (i) return e(this._formatError(i, 'ECONNECTION', !1, 'API'))
          if (
            ((this._auth = t || {}),
            (this._authMethod =
              (this._auth.method || '')
                .toString()
                .trim()
                .toUpperCase() || !1),
            this._authMethod || !this._auth.oauth2 || this._auth.credentials
              ? (this._authMethod &&
                  ('XOAUTH2' !== this._authMethod || this._auth.oauth2)) ||
                (this._authMethod = (this._supportedAuth[0] || 'PLAIN')
                  .toUpperCase()
                  .trim())
              : (this._authMethod = 'XOAUTH2'),
            !(
              'XOAUTH2' === this._authMethod ||
              (this._auth.credentials &&
                this._auth.credentials.user &&
                this._auth.credentials.pass)
            ))
          ) {
            if (!this._auth.user || !this._auth.pass)
              return e(
                this._formatError(
                  'Missing credentials for "' + this._authMethod + '"',
                  'EAUTH',
                  !1,
                  'API',
                ),
              )
            this._auth.credentials = {
              user: this._auth.user,
              pass: this._auth.pass,
              options: this._auth.options,
            }
          }
          if (!this.customAuth.has(this._authMethod)) {
            switch (this._authMethod) {
              case 'XOAUTH2':
                return void this._handleXOauth2Token(!1, e)
              case 'LOGIN':
                return (
                  this._responseActions.push(t => {
                    this._actionAUTH_LOGIN_USER(t, e)
                  }),
                  void this._sendCommand('AUTH LOGIN')
                )
              case 'PLAIN':
                return (
                  this._responseActions.push(t => {
                    this._actionAUTHComplete(t, e)
                  }),
                  void this._sendCommand(
                    'AUTH PLAIN ' +
                      Buffer.from(
                        '\0' +
                          this._auth.credentials.user +
                          '\0' +
                          this._auth.credentials.pass,
                        'utf-8',
                      ).toString('base64'),
                  )
                )
              case 'CRAM-MD5':
                return (
                  this._responseActions.push(t => {
                    this._actionAUTH_CRAM_MD5(t, e)
                  }),
                  void this._sendCommand('AUTH CRAM-MD5')
                )
            }
            return e(
              this._formatError(
                'Unknown authentication method "' + this._authMethod + '"',
                'EAUTH',
                !1,
                'API',
              ),
            )
          }
          {
            let t,
              i = this.customAuth.get(this._authMethod),
              n = !1,
              a = () => {
                n ||
                  ((n = !0),
                  this.logger.info(
                    {
                      tnx: 'smtp',
                      username: this._auth.user,
                      action: 'authenticated',
                      method: this._authMethod,
                    },
                    'User %s authenticated',
                    JSON.stringify(this._auth.user),
                  ),
                  (this.authenticated = !0),
                  e(null, !0))
              },
              r = i => {
                n ||
                  ((n = !0),
                  e(
                    this._formatError(
                      i,
                      'EAUTH',
                      t,
                      'AUTH ' + this._authMethod,
                    ),
                  ))
              },
              o = i({
                auth: this._auth,
                method: this._authMethod,
                extensions: [].concat(this._supportedExtensions),
                authMethods: [].concat(this._supportedAuth),
                maxAllowedSize: this._maxAllowedSize || !1,
                sendCommand: (e, i) => {
                  let n
                  return (
                    i ||
                      (n = new Promise((t, e) => {
                        i = u.callbackPromise(t, e)
                      })),
                    this._responseActions.push(n => {
                      t = n
                      let a = n.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/),
                        r = {command: e, response: n}
                      a
                        ? ((r.status = Number(a[1]) || 0),
                          a[2] && (r.code = a[2]),
                          (r.text = n.substr(a[0].length)))
                        : ((r.text = n), (r.status = 0)),
                        i(null, r)
                    }),
                    setImmediate(() => this._sendCommand(e)),
                    n
                  )
                },
                resolve: a,
                reject: r,
              })
            o && 'function' == typeof o.catch && o.then(a).catch(r)
          }
        }
        send(t, e, i) {
          if (!e)
            return i(this._formatError('Empty message', 'EMESSAGE', !1, 'API'))
          const n = this._isDestroyedMessage('send message')
          if (n) return i(this._formatError(n, 'ECONNECTION', !1, 'API'))
          if (this._maxAllowedSize && t.size > this._maxAllowedSize)
            return setImmediate(() => {
              i(
                this._formatError(
                  'Message size larger than allowed ' + this._maxAllowedSize,
                  'EMESSAGE',
                  !1,
                  'MAIL FROM',
                ),
              )
            })
          let a = !1,
            r = function() {
              a || ((a = !0), i(...arguments))
            }
          'function' == typeof e.on &&
            e.on('error', t => r(this._formatError(t, 'ESTREAM', !1, 'API')))
          let o = Date.now()
          this._setEnvelope(t, (t, i) => {
            if (t) return r(t)
            let n = Date.now(),
              a = this._createSendStream((t, e) =>
                t
                  ? r(t)
                  : ((i.envelopeTime = n - o),
                    (i.messageTime = Date.now() - n),
                    (i.messageSize = a.outByteCount),
                    (i.response = e),
                    r(null, i)),
              )
            'function' == typeof e.pipe ? e.pipe(a) : (a.write(e), a.end())
          })
        }
        reset(t) {
          this._sendCommand('RSET'),
            this._responseActions.push(e =>
              '2' !== e.charAt(0)
                ? t(
                    this._formatError(
                      'Could not reset session state. response=' + e,
                      'EPROTOCOL',
                      e,
                      'RSET',
                    ),
                  )
                : ((this._envelope = !1), t(null, !0)),
            )
        }
        _onConnect() {
          clearTimeout(this._connectionTimeout),
            this.logger.info(
              {
                tnx: 'network',
                localAddress: this._socket.localAddress,
                localPort: this._socket.localPort,
                remoteAddress: this._socket.remoteAddress,
                remotePort: this._socket.remotePort,
              },
              '%s established to %s:%s',
              this.secure ? 'Secure connection' : 'Connection',
              this._socket.remoteAddress,
              this._socket.remotePort,
            ),
            this._destroyed
              ? this.close()
              : ((this.stage = 'connected'),
                this._socket.removeAllListeners('data'),
                this._socket.removeAllListeners('timeout'),
                this._socket.removeAllListeners('close'),
                this._socket.removeAllListeners('end'),
                this._socket.on('data', t => this._onData(t)),
                this._socket.once('close', t => this._onClose(t)),
                this._socket.once('end', () => this._onEnd()),
                this._socket.setTimeout(this.options.socketTimeout || h),
                this._socket.on('timeout', () => this._onTimeout()),
                (this._greetingTimeout = setTimeout(() => {
                  this._socket &&
                    !this._destroyed &&
                    this._responseActions[0] === this._actionGreeting &&
                    this._onError(
                      'Greeting never received',
                      'ETIMEDOUT',
                      !1,
                      'CONN',
                    )
                }, this.options.greetingTimeout || m)),
                this._responseActions.push(this._actionGreeting),
                this._socket.resume())
        }
        _onData(t) {
          if (this._destroyed || !t || !t.length) return
          let e,
            i = (t || '').toString('binary'),
            n = (this._remainder + i).split(/\r?\n/)
          this._remainder = n.pop()
          for (let t = 0, i = n.length; t < i; t++)
            this._responseQueue.length &&
            ((e = this._responseQueue[this._responseQueue.length - 1]),
            /^\d+-/.test(e.split('\n').pop()))
              ? (this._responseQueue[this._responseQueue.length - 1] +=
                  '\n' + n[t])
              : this._responseQueue.push(n[t])
          this._processResponse()
        }
        _onError(t, e, i, n) {
          clearTimeout(this._connectionTimeout),
            clearTimeout(this._greetingTimeout),
            this._destroyed ||
              ((t = this._formatError(t, e, i, n)),
              this.logger.error(i, t.message),
              this.emit('error', t),
              this.close())
        }
        _formatError(t, e, i, n) {
          let a
          ;(a = /Error\]$/i.test(Object.prototype.toString.call(t))
            ? t
            : new Error(t)),
            e && 'Error' !== e && (a.code = e),
            i && ((a.response = i), (a.message += ': ' + i))
          let r =
            ('string' == typeof i && Number((i.match(/^\d+/) || [])[0])) || !1
          return r && (a.responseCode = r), n && (a.command = n), a
        }
        _onClose() {
          return (
            this.logger.info({tnx: 'network'}, 'Connection closed'),
            this.upgrading && !this._destroyed
              ? this._onError(
                  new Error('Connection closed unexpectedly'),
                  'ETLS',
                  !1,
                  'CONN',
                )
              : [this._actionGreeting, this.close].includes(
                  this._responseActions[0],
                ) || this._destroyed
              ? void this._destroy()
              : this._onError(
                  new Error('Connection closed unexpectedly'),
                  'ECONNECTION',
                  !1,
                  'CONN',
                )
          )
        }
        _onEnd() {
          this._destroy()
        }
        _onTimeout() {
          return this._onError(new Error('Timeout'), 'ETIMEDOUT', !1, 'CONN')
        }
        _destroy() {
          this._destroyed || ((this._destroyed = !0), this.emit('end'))
        }
        _upgradeConnection(t) {
          this._socket.removeAllListeners('data'),
            this._socket.removeAllListeners('timeout')
          let e = this._socket,
            i = {socket: this._socket, host: this.host}
          Object.keys(this.options.tls || {}).forEach(t => {
            i[t] = this.options.tls[t]
          }),
            (this.upgrading = !0),
            (this._socket = o.connect(
              i,
              () => (
                (this.secure = !0),
                (this.upgrading = !1),
                this._socket.on('data', t => this._onData(t)),
                e.removeAllListeners('close'),
                e.removeAllListeners('end'),
                t(null, !0)
              ),
            )),
            this._socket.on('error', t =>
              this._onError(t, 'ESOCKET', !1, 'CONN'),
            ),
            this._socket.once('close', t => this._onClose(t)),
            this._socket.once('end', () => this._onEnd()),
            this._socket.setTimeout(this.options.socketTimeout || h),
            this._socket.on('timeout', () => this._onTimeout()),
            e.resume()
        }
        _processResponse() {
          if (!this._responseQueue.length) return !1
          let t = (this.lastServerResponse = (
            this._responseQueue.shift() || ''
          ).toString())
          if (/^\d+-/.test(t.split('\n').pop())) return
          ;(this.options.debug || this.options.transactionLog) &&
            this.logger.debug({tnx: 'server'}, t.replace(/\r?\n$/, '')),
            t.trim() || setImmediate(() => this._processResponse(!0))
          let e = this._responseActions.shift()
          if ('function' != typeof e)
            return this._onError(
              new Error('Unexpected Response'),
              'EPROTOCOL',
              t,
              'CONN',
            )
          e.call(this, t), setImmediate(() => this._processResponse(!0))
        }
        _sendCommand(t) {
          if (!this._destroyed) {
            if (this._socket.destroyed) return this.close()
            ;(this.options.debug || this.options.transactionLog) &&
              this.logger.debug(
                {tnx: 'client'},
                (t || '').toString().replace(/\r?\n$/, ''),
              ),
              this._socket.write(Buffer.from(t + '\r\n', 'utf-8'))
          }
        }
        _setEnvelope(t, e) {
          let i = [],
            n = !1
          if (
            ((this._envelope = t || {}),
            (this._envelope.from = (
              (this._envelope.from && this._envelope.from.address) ||
              this._envelope.from ||
              ''
            )
              .toString()
              .trim()),
            (this._envelope.to = []
              .concat(this._envelope.to || [])
              .map(t => ((t && t.address) || t || '').toString().trim())),
            !this._envelope.to.length)
          )
            return e(
              this._formatError(
                'No recipients defined',
                'EENVELOPE',
                !1,
                'API',
              ),
            )
          if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from))
            return e(
              this._formatError(
                'Invalid sender ' + JSON.stringify(this._envelope.from),
                'EENVELOPE',
                !1,
                'API',
              ),
            )
          ;/[\x80-\uFFFF]/.test(this._envelope.from) && (n = !0)
          for (let t = 0, i = this._envelope.to.length; t < i; t++) {
            if (!this._envelope.to[t] || /[\r\n<>]/.test(this._envelope.to[t]))
              return e(
                this._formatError(
                  'Invalid recipient ' + JSON.stringify(this._envelope.to[t]),
                  'EENVELOPE',
                  !1,
                  'API',
                ),
              )
            ;/[\x80-\uFFFF]/.test(this._envelope.to[t]) && (n = !0)
          }
          if (
            ((this._envelope.rcptQueue = JSON.parse(
              JSON.stringify(this._envelope.to || []),
            )),
            (this._envelope.rejected = []),
            (this._envelope.rejectedErrors = []),
            (this._envelope.accepted = []),
            this._envelope.dsn)
          )
            try {
              this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn)
            } catch (t) {
              return e(
                this._formatError(
                  'Invalid DSN ' + t.message,
                  'EENVELOPE',
                  !1,
                  'API',
                ),
              )
            }
          this._responseActions.push(t => {
            this._actionMAIL(t, e)
          }),
            n &&
              this._supportedExtensions.includes('SMTPUTF8') &&
              (i.push('SMTPUTF8'), (this._usingSmtpUtf8 = !0)),
            this._envelope.use8BitMime &&
              this._supportedExtensions.includes('8BITMIME') &&
              (i.push('BODY=8BITMIME'), (this._using8BitMime = !0)),
            this._envelope.size &&
              this._supportedExtensions.includes('SIZE') &&
              i.push('SIZE=' + this._envelope.size),
            this._envelope.dsn &&
              this._supportedExtensions.includes('DSN') &&
              (this._envelope.dsn.ret &&
                i.push('RET=' + u.encodeXText(this._envelope.dsn.ret)),
              this._envelope.dsn.envid &&
                i.push('ENVID=' + u.encodeXText(this._envelope.dsn.envid))),
            this._sendCommand(
              'MAIL FROM:<' +
                this._envelope.from +
                '>' +
                (i.length ? ' ' + i.join(' ') : ''),
            )
        }
        _setDsnEnvelope(t) {
          let e = (t.ret || t.return || '').toString().toUpperCase() || null
          if (e)
            switch (e) {
              case 'HDRS':
              case 'HEADERS':
                e = 'HDRS'
                break
              case 'FULL':
              case 'BODY':
                e = 'FULL'
            }
          if (e && !['FULL', 'HDRS'].includes(e))
            throw new Error('ret: ' + JSON.stringify(e))
          let i = (t.envid || t.id || '').toString() || null,
            n = t.notify || null
          if (n) {
            'string' == typeof n && (n = n.split(',')),
              (n = n.map(t => t.trim().toUpperCase()))
            let t = ['NEVER', 'SUCCESS', 'FAILURE', 'DELAY']
            if (
              n.filter(e => !t.includes(e)).length ||
              (n.length > 1 && n.includes('NEVER'))
            )
              throw new Error('notify: ' + JSON.stringify(n.join(',')))
            n = n.join(',')
          }
          let a = (t.orcpt || t.recipient || '').toString() || null
          return (
            a && a.indexOf(';') < 0 && (a = 'rfc822;' + a),
            {ret: e, envid: i, notify: n, orcpt: a}
          )
        }
        _getDsnRcptToArgs() {
          let t = []
          return (
            this._envelope.dsn &&
              this._supportedExtensions.includes('DSN') &&
              (this._envelope.dsn.notify &&
                t.push('NOTIFY=' + u.encodeXText(this._envelope.dsn.notify)),
              this._envelope.dsn.orcpt &&
                t.push('ORCPT=' + u.encodeXText(this._envelope.dsn.orcpt))),
            t.length ? ' ' + t.join(' ') : ''
          )
        }
        _createSendStream(t) {
          let e,
            i = new c()
          return (
            this.options.lmtp
              ? this._envelope.accepted.forEach((e, i) => {
                  let n = i === this._envelope.accepted.length - 1
                  this._responseActions.push(i => {
                    this._actionLMTPStream(e, n, i, t)
                  })
                })
              : this._responseActions.push(e => {
                  this._actionSMTPStream(e, t)
                }),
            i.pipe(
              this._socket,
              {end: !1},
            ),
            this.options.debug &&
              ((e = new p()).on('readable', () => {
                let t
                for (; (t = e.read()); )
                  this.logger.debug(
                    {tnx: 'message'},
                    t.toString('binary').replace(/\r?\n$/, ''),
                  )
              }),
              i.pipe(e)),
            i.once('end', () => {
              this.logger.info(
                {
                  tnx: 'message',
                  inByteCount: i.inByteCount,
                  outByteCount: i.outByteCount,
                },
                '<%s bytes encoded mime message (source size %s bytes)>',
                i.outByteCount,
                i.inByteCount,
              )
            }),
            i
          )
        }
        _actionGreeting(t) {
          clearTimeout(this._greetingTimeout),
            '220' === t.substr(0, 3)
              ? this.options.lmtp
                ? (this._responseActions.push(this._actionLHLO),
                  this._sendCommand('LHLO ' + this.name))
                : (this._responseActions.push(this._actionEHLO),
                  this._sendCommand('EHLO ' + this.name))
              : this._onError(
                  new Error('Invalid greeting. response=' + t),
                  'EPROTOCOL',
                  t,
                  'CONN',
                )
        }
        _actionLHLO(t) {
          '2' === t.charAt(0)
            ? this._actionEHLO(t)
            : this._onError(
                new Error('Invalid LHLO. response=' + t),
                'EPROTOCOL',
                t,
                'LHLO',
              )
        }
        _actionEHLO(t) {
          let e
          if ('421' !== t.substr(0, 3)) {
            if ('2' !== t.charAt(0))
              return this.options.requireTLS
                ? void this._onError(
                    new Error(
                      'EHLO failed but HELO does not support required STARTTLS. response=' +
                        t,
                    ),
                    'ECONNECTION',
                    t,
                    'EHLO',
                  )
                : (this._responseActions.push(this._actionHELO),
                  void this._sendCommand('HELO ' + this.name))
            if (
              !this.secure &&
              !this.options.ignoreTLS &&
              (/[ -]STARTTLS\b/im.test(t) || this.options.requireTLS)
            )
              return (
                this._sendCommand('STARTTLS'),
                void this._responseActions.push(this._actionSTARTTLS)
              )
            ;/[ -]SMTPUTF8\b/im.test(t) &&
              this._supportedExtensions.push('SMTPUTF8'),
              /[ -]DSN\b/im.test(t) && this._supportedExtensions.push('DSN'),
              /[ -]8BITMIME\b/im.test(t) &&
                this._supportedExtensions.push('8BITMIME'),
              /[ -]PIPELINING\b/im.test(t) &&
                this._supportedExtensions.push('PIPELINING'),
              /AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(t) &&
                this._supportedAuth.push('PLAIN'),
              /AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(t) &&
                this._supportedAuth.push('LOGIN'),
              /AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(t) &&
                this._supportedAuth.push('CRAM-MD5'),
              /AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(t) &&
                this._supportedAuth.push('XOAUTH2'),
              (e = t.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) &&
                (this._supportedExtensions.push('SIZE'),
                (this._maxAllowedSize = Number(e[1]) || 0)),
              this.emit('connect')
          } else
            this._onError(
              new Error('Server terminates connection. response=' + t),
              'ECONNECTION',
              t,
              'EHLO',
            )
        }
        _actionHELO(t) {
          '2' === t.charAt(0)
            ? this.emit('connect')
            : this._onError(
                new Error('Invalid HELO. response=' + t),
                'EPROTOCOL',
                t,
                'HELO',
              )
        }
        _actionSTARTTLS(t) {
          if ('2' !== t.charAt(0))
            return this.options.opportunisticTLS
              ? (this.logger.info(
                  {tnx: 'smtp'},
                  'Failed STARTTLS upgrade, continuing unencrypted',
                ),
                this.emit('connect'))
              : void this._onError(
                  new Error('Error upgrading connection with STARTTLS'),
                  'ETLS',
                  t,
                  'STARTTLS',
                )
          this._upgradeConnection((t, e) => {
            t
              ? this._onError(
                  new Error('Error initiating TLS - ' + (t.message || t)),
                  'ETLS',
                  !1,
                  'STARTTLS',
                )
              : (this.logger.info(
                  {tnx: 'smtp'},
                  'Connection upgraded with STARTTLS',
                ),
                e
                  ? this.options.lmtp
                    ? (this._responseActions.push(this._actionLHLO),
                      this._sendCommand('LHLO ' + this.name))
                    : (this._responseActions.push(this._actionEHLO),
                      this._sendCommand('EHLO ' + this.name))
                  : this.emit('connect'))
          })
        }
        _actionAUTH_LOGIN_USER(t, e) {
          ;/^334[ -]/.test(t)
            ? (this._responseActions.push(t => {
                this._actionAUTH_LOGIN_PASS(t, e)
              }),
              this._sendCommand(
                Buffer.from(this._auth.credentials.user + '', 'utf-8').toString(
                  'base64',
                ),
              ))
            : e(
                this._formatError(
                  'Invalid login sequence while waiting for "334 VXNlcm5hbWU6"',
                  'EAUTH',
                  t,
                  'AUTH LOGIN',
                ),
              )
        }
        _actionAUTH_CRAM_MD5(t, e) {
          let i = t.match(/^334\s+(.+)$/),
            n = ''
          if (!i)
            return e(
              this._formatError(
                'Invalid login sequence while waiting for server challenge string',
                'EAUTH',
                t,
                'AUTH CRAM-MD5',
              ),
            )
          n = i[1]
          let a = Buffer.from(n, 'base64').toString('ascii'),
            r = l.createHmac('md5', this._auth.credentials.pass)
          r.update(a)
          let o = r.digest('hex'),
            s = this._auth.credentials.user + ' ' + o
          this._responseActions.push(t => {
            this._actionAUTH_CRAM_MD5_PASS(t, e)
          }),
            this._sendCommand(Buffer.from(s).toString('base64'))
        }
        _actionAUTH_CRAM_MD5_PASS(t, e) {
          if (!t.match(/^235\s+/))
            return e(
              this._formatError(
                'Invalid login sequence while waiting for "235"',
                'EAUTH',
                t,
                'AUTH CRAM-MD5',
              ),
            )
          this.logger.info(
            {
              tnx: 'smtp',
              username: this._auth.user,
              action: 'authenticated',
              method: this._authMethod,
            },
            'User %s authenticated',
            JSON.stringify(this._auth.user),
          ),
            (this.authenticated = !0),
            e(null, !0)
        }
        _actionAUTH_LOGIN_PASS(t, e) {
          if (!/^334[ -]/.test(t))
            return e(
              this._formatError(
                'Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"',
                'EAUTH',
                t,
                'AUTH LOGIN',
              ),
            )
          this._responseActions.push(t => {
            this._actionAUTHComplete(t, e)
          }),
            this._sendCommand(
              Buffer.from(this._auth.credentials.pass + '', 'utf-8').toString(
                'base64',
              ),
            )
        }
        _actionAUTHComplete(t, e, i) {
          return (
            i || 'function' != typeof e || ((i = e), (e = !1)),
            '334' === t.substr(0, 3)
              ? (this._responseActions.push(t => {
                  e || 'XOAUTH2' !== this._authMethod
                    ? this._actionAUTHComplete(t, !0, i)
                    : setImmediate(() => this._handleXOauth2Token(!0, i))
                }),
                void this._sendCommand(''))
              : '2' !== t.charAt(0)
              ? (this.logger.info(
                  {
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authfail',
                    method: this._authMethod,
                  },
                  'User %s failed to authenticate',
                  JSON.stringify(this._auth.user),
                ),
                i(
                  this._formatError(
                    'Invalid login',
                    'EAUTH',
                    t,
                    'AUTH ' + this._authMethod,
                  ),
                ))
              : (this.logger.info(
                  {
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authenticated',
                    method: this._authMethod,
                  },
                  'User %s authenticated',
                  JSON.stringify(this._auth.user),
                ),
                (this.authenticated = !0),
                void i(null, !0))
          )
        }
        _actionMAIL(t, e) {
          let i, n
          if (2 !== Number(t.charAt(0)))
            return (
              (i =
                this._usingSmtpUtf8 &&
                /^550 /.test(t) &&
                /[\x80-\uFFFF]/.test(this._envelope.from)
                  ? 'Internationalized mailbox name not allowed'
                  : 'Mail command failed'),
              e(this._formatError(i, 'EENVELOPE', t, 'MAIL FROM'))
            )
          if (!this._envelope.rcptQueue.length)
            return e(
              this._formatError(
                "Can't send mail - no recipients defined",
                'EENVELOPE',
                !1,
                'API',
              ),
            )
          if (
            ((this._recipientQueue = []),
            this._supportedExtensions.includes('PIPELINING'))
          )
            for (; this._envelope.rcptQueue.length; )
              (n = this._envelope.rcptQueue.shift()),
                this._recipientQueue.push(n),
                this._responseActions.push(t => {
                  this._actionRCPT(t, e)
                }),
                this._sendCommand(
                  'RCPT TO:<' + n + '>' + this._getDsnRcptToArgs(),
                )
          else
            (n = this._envelope.rcptQueue.shift()),
              this._recipientQueue.push(n),
              this._responseActions.push(t => {
                this._actionRCPT(t, e)
              }),
              this._sendCommand(
                'RCPT TO:<' + n + '>' + this._getDsnRcptToArgs(),
              )
        }
        _actionRCPT(t, e) {
          let i,
            n,
            a = this._recipientQueue.shift()
          if (
            (2 !== Number(t.charAt(0))
              ? ((i =
                  this._usingSmtpUtf8 &&
                  /^553 /.test(t) &&
                  /[\x80-\uFFFF]/.test(a)
                    ? 'Internationalized mailbox name not allowed'
                    : 'Recipient command failed'),
                this._envelope.rejected.push(a),
                ((n = this._formatError(
                  i,
                  'EENVELOPE',
                  t,
                  'RCPT TO',
                )).recipient = a),
                this._envelope.rejectedErrors.push(n))
              : this._envelope.accepted.push(a),
            this._envelope.rcptQueue.length || this._recipientQueue.length)
          )
            this._envelope.rcptQueue.length &&
              ((a = this._envelope.rcptQueue.shift()),
              this._recipientQueue.push(a),
              this._responseActions.push(t => {
                this._actionRCPT(t, e)
              }),
              this._sendCommand(
                'RCPT TO:<' + a + '>' + this._getDsnRcptToArgs(),
              ))
          else {
            if (!(this._envelope.rejected.length < this._envelope.to.length))
              return (
                ((n = this._formatError(
                  "Can't send mail - all recipients were rejected",
                  'EENVELOPE',
                  t,
                  'RCPT TO',
                )).rejected = this._envelope.rejected),
                (n.rejectedErrors = this._envelope.rejectedErrors),
                e(n)
              )
            this._responseActions.push(t => {
              this._actionDATA(t, e)
            }),
              this._sendCommand('DATA')
          }
        }
        _actionDATA(t, e) {
          if (!/^[23]/.test(t))
            return e(
              this._formatError('Data command failed', 'EENVELOPE', t, 'DATA'),
            )
          let i = {
            accepted: this._envelope.accepted,
            rejected: this._envelope.rejected,
          }
          this._envelope.rejectedErrors.length &&
            (i.rejectedErrors = this._envelope.rejectedErrors),
            e(null, i)
        }
        _actionSMTPStream(t, e) {
          return 2 !== Number(t.charAt(0))
            ? e(this._formatError('Message failed', 'EMESSAGE', t, 'DATA'))
            : e(null, t)
        }
        _actionLMTPStream(t, e, i, n) {
          let a
          if (2 !== Number(i.charAt(0))) {
            ;((a = this._formatError(
              'Message failed for recipient ' + t,
              'EMESSAGE',
              i,
              'DATA',
            )).recipient = t),
              this._envelope.rejected.push(t),
              this._envelope.rejectedErrors.push(a)
            for (let e = 0, i = this._envelope.accepted.length; e < i; e++)
              this._envelope.accepted[e] === t &&
                this._envelope.accepted.splice(e, 1)
          }
          if (e) return n(null, i)
        }
        _handleXOauth2Token(t, e) {
          this._auth.oauth2.getToken(t, (i, n) => {
            if (i)
              return (
                this.logger.info(
                  {
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authfail',
                    method: this._authMethod,
                  },
                  'User %s failed to authenticate',
                  JSON.stringify(this._auth.user),
                ),
                e(this._formatError(i, 'EAUTH', !1, 'AUTH XOAUTH2'))
              )
            this._responseActions.push(i => {
              this._actionAUTHComplete(i, t, e)
            }),
              this._sendCommand(
                'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token(n),
              )
          })
        }
        _isDestroyedMessage(t) {
          if (this._destroyed)
            return 'Cannot ' + t + ' - smtp connection is already destroyed.'
          if (this._socket) {
            if (this._socket.destroyed)
              return (
                'Cannot ' +
                t +
                ' - smtp connection socket is already destroyed.'
              )
            if (!this._socket.writable)
              return (
                'Cannot ' +
                t +
                ' - smtp connection socket is already half-closed.'
              )
          }
        }
        _getHostname() {
          let t = s.hostname() || ''
          return (
            t.indexOf('.') < 0 && (t = '[127.0.0.1]'),
            t.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) &&
              (t = '[' + t + ']'),
            t
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      t.exports = class extends n {
        constructor(t) {
          super(t), (this.options = t || {}), (this.lastByte = !1)
        }
        _transform(t, e, i) {
          let n,
            a = 0
          for (let e = 0, i = t.length; e < i; e++)
            10 === t[e] &&
              ((e && 13 !== t[e - 1]) || (!e && 13 !== this.lastByte)) &&
              (e > a && ((n = t.slice(a, e)), this.push(n)),
              this.push(Buffer.from('\r\n')),
              (a = e + 1))
          a && a < t.length
            ? ((n = t.slice(a)), this.push(n))
            : a || this.push(t),
            (this.lastByte = t[t.length - 1]),
            i()
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(78),
        a = i(212),
        r = i(35),
        o = i(79),
        s = i(80),
        l = i(213)
      t.exports = function(t, e) {
        var i,
          r,
          o = {}
        e || (e = {})
        for (r in d) (i = e[r]), (o[r] = null == i ? d[r] : i)
        ;(o.position.indent || o.position.start) &&
          ((o.indent = o.position.indent || []),
          (o.position = o.position.start))
        return (function(t, e) {
          var i,
            r,
            o,
            d,
            T,
            O,
            C,
            j,
            L,
            P,
            q,
            N,
            I,
            z,
            M,
            B,
            D,
            R,
            U,
            H = e.additional,
            $ = e.nonTerminated,
            V = e.text,
            F = e.reference,
            G = e.warning,
            W = e.textContext,
            J = e.referenceContext,
            K = e.warningContext,
            X = e.position,
            Q = e.indent || [],
            Y = t.length,
            Z = 0,
            tt = -1,
            et = X.column || 1,
            it = X.line || 1,
            nt = '',
            at = []
          ;(B = ot()),
            (j = G
              ? function(t, e) {
                  var i = ot()
                  ;(i.column += e), (i.offset += e), G.call(K, A[t], i, t)
                }
              : u),
            Z--,
            Y++
          for (; ++Z < Y; )
            if (('\n' === T && (et = Q[tt] || 1), '&' !== (T = st(Z))))
              '\n' === T && (it++, tt++, (et = 0)), T ? ((nt += T), et++) : lt()
            else {
              if (
                '\t' === (C = st(Z + 1)) ||
                '\n' === C ||
                '\f' === C ||
                ' ' === C ||
                '<' === C ||
                '&' === C ||
                '' === C ||
                (H && C === H)
              ) {
                ;(nt += T), et++
                continue
              }
              for (
                N = I = Z + 1,
                  U = I,
                  '#' !== C
                    ? (z = h)
                    : ((U = ++N),
                      'x' === (C = st(U)) || 'X' === C
                        ? ((z = m), (U = ++N))
                        : (z = f)),
                  i = '',
                  q = '',
                  d = '',
                  M = v[z],
                  U--;
                ++U < Y && ((C = st(U)), M(C));

              )
                (d += C), z === h && c.call(n, d) && ((i = d), (q = n[d]))
              ;(o = ';' === st(U)) &&
                (U++, (r = z === h && l(d)) && ((i = d), (q = r))),
                (R = 1 + U - I),
                (o || $) &&
                  (d
                    ? z === h
                      ? (o && !q
                          ? j(k, 1)
                          : (i !== d &&
                              ((U = N + i.length), (R = 1 + U - N), (o = !1)),
                            o ||
                              ((L = i ? x : y),
                              e.attribute
                                ? '=' === (C = st(U))
                                  ? (j(L, R), (q = null))
                                  : s(C)
                                  ? (q = null)
                                  : j(L, R)
                                : j(L, R))),
                        (O = q))
                      : (o || j(b, R),
                        (O = parseInt(d, g[z])),
                        ((rt = O) >= 55296 && rt <= 57343) || rt > 1114111
                          ? (j(E, R), (O = '�'))
                          : O in a
                          ? (j(_, R), (O = a[O]))
                          : ((P = ''),
                            S(O) && j(_, R),
                            O > 65535 &&
                              ((P += p(((O -= 65536) >>> 10) | 55296)),
                              (O = 56320 | (1023 & O))),
                            (O = P + p(O))))
                    : z !== h && j(w, R)),
                O
                  ? (lt(),
                    (B = ot()),
                    (Z = U - 1),
                    (et += U - I + 1),
                    at.push(O),
                    (D = ot()).offset++,
                    F && F.call(J, O, {start: B, end: D}, t.slice(I - 1, U)),
                    (B = D))
                  : ((d = t.slice(I - 1, U)),
                    (nt += d),
                    (et += d.length),
                    (Z = U - 1))
            }
          var rt
          return at.join('')
          function ot() {
            return {line: it, column: et, offset: Z + (X.offset || 0)}
          }
          function st(e) {
            return t.charAt(e)
          }
          function lt() {
            nt &&
              (at.push(nt),
              V && V.call(W, nt, {start: B, end: ot()}),
              (nt = ''))
          }
        })(t, o)
      }
      var c = {}.hasOwnProperty,
        p = String.fromCharCode,
        u = Function.prototype,
        d = {
          warning: null,
          reference: null,
          text: null,
          warningContext: null,
          referenceContext: null,
          textContext: null,
          position: {},
          additional: null,
          attribute: !1,
          nonTerminated: !0,
        },
        h = 'named',
        m = 'hexadecimal',
        f = 'decimal',
        g = {}
      ;(g[m] = 16), (g[f] = 10)
      var v = {}
      ;(v[h] = s), (v[f] = r), (v[m] = o)
      var x = 1,
        b = 2,
        y = 3,
        w = 4,
        k = 5,
        _ = 6,
        E = 7,
        A = {}
      function S(t) {
        return (
          (t >= 1 && t <= 8) ||
          11 === t ||
          (t >= 13 && t <= 31) ||
          (t >= 127 && t <= 159) ||
          (t >= 64976 && t <= 65007) ||
          65535 == (65535 & t) ||
          65534 == (65535 & t)
        )
      }
      ;(A[x] = 'Named character references must be terminated by a semicolon'),
        (A[b] =
          'Numeric character references must be terminated by a semicolon'),
        (A[y] = 'Named character references cannot be empty'),
        (A[w] = 'Numeric character references cannot be empty'),
        (A[k] = 'Named character references must be known'),
        (A[_] = 'Numeric character references cannot be disallowed'),
        (A[E] =
          'Numeric character references cannot be outside the permissible Unicode range')
    },
    function(t, e, i) {
      'use strict'
      t.exports = s
      var n = i(83),
        a = n.CONTINUE,
        r = n.SKIP,
        o = n.EXIT
      function s(t, e, i, a) {
        'function' == typeof e &&
          'function' != typeof i &&
          ((a = i), (i = e), (e = null)),
          n(
            t,
            e,
            function(t, e) {
              var n = e[e.length - 1],
                a = n ? n.children.indexOf(t) : null
              return i(t, a, n)
            },
            a,
          )
      }
      ;(s.CONTINUE = a), (s.SKIP = r), (s.EXIT = o)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e = String(t),
          i = e.length
        for (; e.charAt(--i) === n; );
        return e.slice(0, i + 1)
      }
      var n = '\n'
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i, n) {
        var a,
          r,
          o = t.length,
          s = -1
        for (; ++s < o; )
          if (
            ((a = t[s]),
            (void 0 === (r = a[1] || {}).pedantic ||
              r.pedantic === i.options.pedantic) &&
              (void 0 === r.commonmark ||
                r.commonmark === i.options.commonmark) &&
              e[a[0]].apply(i, n))
          )
            return !0
        return !1
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(50)
      t.exports = function(t) {
        return n(t).toLowerCase()
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return String(t).replace(/\s+/g, ' ')
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return t.toLowerCase()
      }
    },
    function(t, e, i) {
      'use strict'
      var n = 0
      function a() {
        return Math.pow(2, ++n)
      }
      ;(e.boolean = a()),
        (e.booleanish = a()),
        (e.overloadedBoolean = a()),
        (e.number = a()),
        (e.spaceSeparated = a()),
        (e.commaSeparated = a()),
        (e.commaOrSpaceSeparated = a())
    },
    function(t, e, i) {
      'use strict'
      var n = {}.hasOwnProperty
      t.exports = function(t, e) {
        var i, a
        if (!t || !e || 'object' != typeof t || 'element' !== t.type) return !1
        return (
          (i = t.properties),
          null != (a = i && n.call(i, e) && i[e]) && !1 !== a
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(18)
      t.exports = function(t) {
        return n(t, a)
      }
      var a = [
        'audio',
        'canvas',
        'embed',
        'iframe',
        'img',
        'math',
        'object',
        'picture',
        'svg',
        'video',
      ]
    },
    function(t, e, i) {
      'use strict'
      var n = i(114)
      function a(t) {
        return function(e, i, a) {
          var r,
            o = e && e.children
          if (((i += t), (r = o && o[i]), !a))
            for (; r && n(r); ) r = o[(i += t)]
          return r
        }
      }
      ;(e.before = a(-1)), (e.after = a(1))
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(t, e) {
      t.exports = require('dns')
    },
    function(t, e, i) {
      'use strict'
      const n = i(16),
        a = new Map([
          ['application/acad', 'dwg'],
          ['application/applixware', 'aw'],
          ['application/arj', 'arj'],
          ['application/atom+xml', 'xml'],
          ['application/atomcat+xml', 'atomcat'],
          ['application/atomsvc+xml', 'atomsvc'],
          ['application/base64', ['mm', 'mme']],
          ['application/binhex', 'hqx'],
          ['application/binhex4', 'hqx'],
          ['application/book', ['book', 'boo']],
          ['application/ccxml+xml,', 'ccxml'],
          ['application/cdf', 'cdf'],
          ['application/cdmi-capability', 'cdmia'],
          ['application/cdmi-container', 'cdmic'],
          ['application/cdmi-domain', 'cdmid'],
          ['application/cdmi-object', 'cdmio'],
          ['application/cdmi-queue', 'cdmiq'],
          ['application/clariscad', 'ccad'],
          ['application/commonground', 'dp'],
          ['application/cu-seeme', 'cu'],
          ['application/davmount+xml', 'davmount'],
          ['application/drafting', 'drw'],
          ['application/dsptype', 'tsp'],
          ['application/dssc+der', 'dssc'],
          ['application/dssc+xml', 'xdssc'],
          ['application/dxf', 'dxf'],
          ['application/ecmascript', ['js', 'es']],
          ['application/emma+xml', 'emma'],
          ['application/envoy', 'evy'],
          ['application/epub+zip', 'epub'],
          [
            'application/excel',
            [
              'xls',
              'xl',
              'xla',
              'xlb',
              'xlc',
              'xld',
              'xlk',
              'xll',
              'xlm',
              'xlt',
              'xlv',
              'xlw',
            ],
          ],
          ['application/exi', 'exi'],
          ['application/font-tdpfr', 'pfr'],
          ['application/fractals', 'fif'],
          ['application/freeloader', 'frl'],
          ['application/futuresplash', 'spl'],
          ['application/gnutar', 'tgz'],
          ['application/groupwise', 'vew'],
          ['application/hlp', 'hlp'],
          ['application/hta', 'hta'],
          ['application/hyperstudio', 'stk'],
          ['application/i-deas', 'unv'],
          ['application/iges', ['iges', 'igs']],
          ['application/inf', 'inf'],
          ['application/internet-property-stream', 'acx'],
          ['application/ipfix', 'ipfix'],
          ['application/java', 'class'],
          ['application/java-archive', 'jar'],
          ['application/java-byte-code', 'class'],
          ['application/java-serialized-object', 'ser'],
          ['application/java-vm', 'class'],
          ['application/javascript', 'js'],
          ['application/json', 'json'],
          ['application/lha', 'lha'],
          ['application/lzx', 'lzx'],
          ['application/mac-binary', 'bin'],
          ['application/mac-binhex', 'hqx'],
          ['application/mac-binhex40', 'hqx'],
          ['application/mac-compactpro', 'cpt'],
          ['application/macbinary', 'bin'],
          ['application/mads+xml', 'mads'],
          ['application/marc', 'mrc'],
          ['application/marcxml+xml', 'mrcx'],
          ['application/mathematica', 'ma'],
          ['application/mathml+xml', 'mathml'],
          ['application/mbedlet', 'mbd'],
          ['application/mbox', 'mbox'],
          ['application/mcad', 'mcd'],
          ['application/mediaservercontrol+xml', 'mscml'],
          ['application/metalink4+xml', 'meta4'],
          ['application/mets+xml', 'mets'],
          ['application/mime', 'aps'],
          ['application/mods+xml', 'mods'],
          ['application/mp21', 'm21'],
          ['application/mp4', 'mp4'],
          ['application/mspowerpoint', ['ppt', 'pot', 'pps', 'ppz']],
          ['application/msword', ['doc', 'dot', 'w6w', 'wiz', 'word']],
          ['application/mswrite', 'wri'],
          ['application/mxf', 'mxf'],
          ['application/netmc', 'mcp'],
          ['application/octet-stream', ['*']],
          ['application/oda', 'oda'],
          ['application/oebps-package+xml', 'opf'],
          ['application/ogg', 'ogx'],
          ['application/olescript', 'axs'],
          ['application/onenote', 'onetoc'],
          ['application/patch-ops-error+xml', 'xer'],
          ['application/pdf', 'pdf'],
          ['application/pgp-encrypted', 'asc'],
          ['application/pgp-signature', 'pgp'],
          ['application/pics-rules', 'prf'],
          ['application/pkcs-12', 'p12'],
          ['application/pkcs-crl', 'crl'],
          ['application/pkcs10', 'p10'],
          ['application/pkcs7-mime', ['p7c', 'p7m']],
          ['application/pkcs7-signature', 'p7s'],
          ['application/pkcs8', 'p8'],
          ['application/pkix-attr-cert', 'ac'],
          ['application/pkix-cert', ['cer', 'crt']],
          ['application/pkix-crl', 'crl'],
          ['application/pkix-pkipath', 'pkipath'],
          ['application/pkixcmp', 'pki'],
          ['application/plain', 'text'],
          ['application/pls+xml', 'pls'],
          ['application/postscript', ['ps', 'ai', 'eps']],
          ['application/powerpoint', 'ppt'],
          ['application/pro_eng', ['part', 'prt']],
          ['application/prs.cww', 'cww'],
          ['application/pskc+xml', 'pskcxml'],
          ['application/rdf+xml', 'rdf'],
          ['application/reginfo+xml', 'rif'],
          ['application/relax-ng-compact-syntax', 'rnc'],
          ['application/resource-lists+xml', 'rl'],
          ['application/resource-lists-diff+xml', 'rld'],
          ['application/ringing-tones', 'rng'],
          ['application/rls-services+xml', 'rs'],
          ['application/rsd+xml', 'rsd'],
          ['application/rss+xml', 'xml'],
          ['application/rtf', ['rtf', 'rtx']],
          ['application/sbml+xml', 'sbml'],
          ['application/scvp-cv-request', 'scq'],
          ['application/scvp-cv-response', 'scs'],
          ['application/scvp-vp-request', 'spq'],
          ['application/scvp-vp-response', 'spp'],
          ['application/sdp', 'sdp'],
          ['application/sea', 'sea'],
          ['application/set', 'set'],
          ['application/set-payment-initiation', 'setpay'],
          ['application/set-registration-initiation', 'setreg'],
          ['application/shf+xml', 'shf'],
          ['application/sla', 'stl'],
          ['application/smil', ['smi', 'smil']],
          ['application/smil+xml', 'smi'],
          ['application/solids', 'sol'],
          ['application/sounder', 'sdr'],
          ['application/sparql-query', 'rq'],
          ['application/sparql-results+xml', 'srx'],
          ['application/srgs', 'gram'],
          ['application/srgs+xml', 'grxml'],
          ['application/sru+xml', 'sru'],
          ['application/ssml+xml', 'ssml'],
          ['application/step', ['step', 'stp']],
          ['application/streamingmedia', 'ssm'],
          ['application/tei+xml', 'tei'],
          ['application/thraud+xml', 'tfi'],
          ['application/timestamped-data', 'tsd'],
          ['application/toolbook', 'tbk'],
          ['application/vda', 'vda'],
          ['application/vnd.3gpp.pic-bw-large', 'plb'],
          ['application/vnd.3gpp.pic-bw-small', 'psb'],
          ['application/vnd.3gpp.pic-bw-var', 'pvb'],
          ['application/vnd.3gpp2.tcap', 'tcap'],
          ['application/vnd.3m.post-it-notes', 'pwn'],
          ['application/vnd.accpac.simply.aso', 'aso'],
          ['application/vnd.accpac.simply.imp', 'imp'],
          ['application/vnd.acucobol', 'acu'],
          ['application/vnd.acucorp', 'atc'],
          [
            'application/vnd.adobe.air-application-installer-package+zip',
            'air',
          ],
          ['application/vnd.adobe.fxp', 'fxp'],
          ['application/vnd.adobe.xdp+xml', 'xdp'],
          ['application/vnd.adobe.xfdf', 'xfdf'],
          ['application/vnd.ahead.space', 'ahead'],
          ['application/vnd.airzip.filesecure.azf', 'azf'],
          ['application/vnd.airzip.filesecure.azs', 'azs'],
          ['application/vnd.amazon.ebook', 'azw'],
          ['application/vnd.americandynamics.acc', 'acc'],
          ['application/vnd.amiga.ami', 'ami'],
          ['application/vnd.android.package-archive', 'apk'],
          ['application/vnd.anser-web-certificate-issue-initiation', 'cii'],
          ['application/vnd.anser-web-funds-transfer-initiation', 'fti'],
          ['application/vnd.antix.game-component', 'atx'],
          ['application/vnd.apple.installer+xml', 'mpkg'],
          ['application/vnd.apple.mpegurl', 'm3u8'],
          ['application/vnd.aristanetworks.swi', 'swi'],
          ['application/vnd.audiograph', 'aep'],
          ['application/vnd.blueice.multipass', 'mpm'],
          ['application/vnd.bmi', 'bmi'],
          ['application/vnd.businessobjects', 'rep'],
          ['application/vnd.chemdraw+xml', 'cdxml'],
          ['application/vnd.chipnuts.karaoke-mmd', 'mmd'],
          ['application/vnd.cinderella', 'cdy'],
          ['application/vnd.claymore', 'cla'],
          ['application/vnd.cloanto.rp9', 'rp9'],
          ['application/vnd.clonk.c4group', 'c4g'],
          ['application/vnd.cluetrust.cartomobile-config', 'c11amc'],
          ['application/vnd.cluetrust.cartomobile-config-pkg', 'c11amz'],
          ['application/vnd.commonspace', 'csp'],
          ['application/vnd.contact.cmsg', 'cdbcmsg'],
          ['application/vnd.cosmocaller', 'cmc'],
          ['application/vnd.crick.clicker', 'clkx'],
          ['application/vnd.crick.clicker.keyboard', 'clkk'],
          ['application/vnd.crick.clicker.palette', 'clkp'],
          ['application/vnd.crick.clicker.template', 'clkt'],
          ['application/vnd.crick.clicker.wordbank', 'clkw'],
          ['application/vnd.criticaltools.wbs+xml', 'wbs'],
          ['application/vnd.ctc-posml', 'pml'],
          ['application/vnd.cups-ppd', 'ppd'],
          ['application/vnd.curl.car', 'car'],
          ['application/vnd.curl.pcurl', 'pcurl'],
          ['application/vnd.data-vision.rdz', 'rdz'],
          ['application/vnd.denovo.fcselayout-link', 'fe_launch'],
          ['application/vnd.dna', 'dna'],
          ['application/vnd.dolby.mlp', 'mlp'],
          ['application/vnd.dpgraph', 'dpg'],
          ['application/vnd.dreamfactory', 'dfac'],
          ['application/vnd.dvb.ait', 'ait'],
          ['application/vnd.dvb.service', 'svc'],
          ['application/vnd.dynageo', 'geo'],
          ['application/vnd.ecowin.chart', 'mag'],
          ['application/vnd.enliven', 'nml'],
          ['application/vnd.epson.esf', 'esf'],
          ['application/vnd.epson.msf', 'msf'],
          ['application/vnd.epson.quickanime', 'qam'],
          ['application/vnd.epson.salt', 'slt'],
          ['application/vnd.epson.ssf', 'ssf'],
          ['application/vnd.eszigno3+xml', 'es3'],
          ['application/vnd.ezpix-album', 'ez2'],
          ['application/vnd.ezpix-package', 'ez3'],
          ['application/vnd.fdf', 'fdf'],
          ['application/vnd.fdsn.seed', 'seed'],
          ['application/vnd.flographit', 'gph'],
          ['application/vnd.fluxtime.clip', 'ftc'],
          ['application/vnd.framemaker', 'fm'],
          ['application/vnd.frogans.fnc', 'fnc'],
          ['application/vnd.frogans.ltf', 'ltf'],
          ['application/vnd.fsc.weblaunch', 'fsc'],
          ['application/vnd.fujitsu.oasys', 'oas'],
          ['application/vnd.fujitsu.oasys2', 'oa2'],
          ['application/vnd.fujitsu.oasys3', 'oa3'],
          ['application/vnd.fujitsu.oasysgp', 'fg5'],
          ['application/vnd.fujitsu.oasysprs', 'bh2'],
          ['application/vnd.fujixerox.ddd', 'ddd'],
          ['application/vnd.fujixerox.docuworks', 'xdw'],
          ['application/vnd.fujixerox.docuworks.binder', 'xbd'],
          ['application/vnd.fuzzysheet', 'fzs'],
          ['application/vnd.genomatix.tuxedo', 'txd'],
          ['application/vnd.geogebra.file', 'ggb'],
          ['application/vnd.geogebra.tool', 'ggt'],
          ['application/vnd.geometry-explorer', 'gex'],
          ['application/vnd.geonext', 'gxt'],
          ['application/vnd.geoplan', 'g2w'],
          ['application/vnd.geospace', 'g3w'],
          ['application/vnd.gmx', 'gmx'],
          ['application/vnd.google-earth.kml+xml', 'kml'],
          ['application/vnd.google-earth.kmz', 'kmz'],
          ['application/vnd.grafeq', 'gqf'],
          ['application/vnd.groove-account', 'gac'],
          ['application/vnd.groove-help', 'ghf'],
          ['application/vnd.groove-identity-message', 'gim'],
          ['application/vnd.groove-injector', 'grv'],
          ['application/vnd.groove-tool-message', 'gtm'],
          ['application/vnd.groove-tool-template', 'tpl'],
          ['application/vnd.groove-vcard', 'vcg'],
          ['application/vnd.hal+xml', 'hal'],
          ['application/vnd.handheld-entertainment+xml', 'zmm'],
          ['application/vnd.hbci', 'hbci'],
          ['application/vnd.hhe.lesson-player', 'les'],
          ['application/vnd.hp-hpgl', ['hgl', 'hpg', 'hpgl']],
          ['application/vnd.hp-hpid', 'hpid'],
          ['application/vnd.hp-hps', 'hps'],
          ['application/vnd.hp-jlyt', 'jlt'],
          ['application/vnd.hp-pcl', 'pcl'],
          ['application/vnd.hp-pclxl', 'pclxl'],
          ['application/vnd.hydrostatix.sof-data', 'sfd-hdstx'],
          ['application/vnd.hzn-3d-crossword', 'x3d'],
          ['application/vnd.ibm.minipay', 'mpy'],
          ['application/vnd.ibm.modcap', 'afp'],
          ['application/vnd.ibm.rights-management', 'irm'],
          ['application/vnd.ibm.secure-container', 'sc'],
          ['application/vnd.iccprofile', 'icc'],
          ['application/vnd.igloader', 'igl'],
          ['application/vnd.immervision-ivp', 'ivp'],
          ['application/vnd.immervision-ivu', 'ivu'],
          ['application/vnd.insors.igm', 'igm'],
          ['application/vnd.intercon.formnet', 'xpw'],
          ['application/vnd.intergeo', 'i2g'],
          ['application/vnd.intu.qbo', 'qbo'],
          ['application/vnd.intu.qfx', 'qfx'],
          ['application/vnd.ipunplugged.rcprofile', 'rcprofile'],
          ['application/vnd.irepository.package+xml', 'irp'],
          ['application/vnd.is-xpr', 'xpr'],
          ['application/vnd.isac.fcs', 'fcs'],
          ['application/vnd.jam', 'jam'],
          ['application/vnd.jcp.javame.midlet-rms', 'rms'],
          ['application/vnd.jisp', 'jisp'],
          ['application/vnd.joost.joda-archive', 'joda'],
          ['application/vnd.kahootz', 'ktz'],
          ['application/vnd.kde.karbon', 'karbon'],
          ['application/vnd.kde.kchart', 'chrt'],
          ['application/vnd.kde.kformula', 'kfo'],
          ['application/vnd.kde.kivio', 'flw'],
          ['application/vnd.kde.kontour', 'kon'],
          ['application/vnd.kde.kpresenter', 'kpr'],
          ['application/vnd.kde.kspread', 'ksp'],
          ['application/vnd.kde.kword', 'kwd'],
          ['application/vnd.kenameaapp', 'htke'],
          ['application/vnd.kidspiration', 'kia'],
          ['application/vnd.kinar', 'kne'],
          ['application/vnd.koan', 'skp'],
          ['application/vnd.kodak-descriptor', 'sse'],
          ['application/vnd.las.las+xml', 'lasxml'],
          ['application/vnd.llamagraphics.life-balance.desktop', 'lbd'],
          ['application/vnd.llamagraphics.life-balance.exchange+xml', 'lbe'],
          ['application/vnd.lotus-1-2-3', '123'],
          ['application/vnd.lotus-approach', 'apr'],
          ['application/vnd.lotus-freelance', 'pre'],
          ['application/vnd.lotus-notes', 'nsf'],
          ['application/vnd.lotus-organizer', 'org'],
          ['application/vnd.lotus-screencam', 'scm'],
          ['application/vnd.lotus-wordpro', 'lwp'],
          ['application/vnd.macports.portpkg', 'portpkg'],
          ['application/vnd.mcd', 'mcd'],
          ['application/vnd.medcalcdata', 'mc1'],
          ['application/vnd.mediastation.cdkey', 'cdkey'],
          ['application/vnd.mfer', 'mwf'],
          ['application/vnd.mfmp', 'mfm'],
          ['application/vnd.micrografx.flo', 'flo'],
          ['application/vnd.micrografx.igx', 'igx'],
          ['application/vnd.mif', 'mif'],
          ['application/vnd.mobius.daf', 'daf'],
          ['application/vnd.mobius.dis', 'dis'],
          ['application/vnd.mobius.mbk', 'mbk'],
          ['application/vnd.mobius.mqy', 'mqy'],
          ['application/vnd.mobius.msl', 'msl'],
          ['application/vnd.mobius.plc', 'plc'],
          ['application/vnd.mobius.txf', 'txf'],
          ['application/vnd.mophun.application', 'mpn'],
          ['application/vnd.mophun.certificate', 'mpc'],
          ['application/vnd.mozilla.xul+xml', 'xul'],
          ['application/vnd.ms-artgalry', 'cil'],
          ['application/vnd.ms-cab-compressed', 'cab'],
          [
            'application/vnd.ms-excel',
            ['xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlb', 'xll'],
          ],
          ['application/vnd.ms-excel.addin.macroenabled.12', 'xlam'],
          ['application/vnd.ms-excel.sheet.binary.macroenabled.12', 'xlsb'],
          ['application/vnd.ms-excel.sheet.macroenabled.12', 'xlsm'],
          ['application/vnd.ms-excel.template.macroenabled.12', 'xltm'],
          ['application/vnd.ms-fontobject', 'eot'],
          ['application/vnd.ms-htmlhelp', 'chm'],
          ['application/vnd.ms-ims', 'ims'],
          ['application/vnd.ms-lrm', 'lrm'],
          ['application/vnd.ms-officetheme', 'thmx'],
          ['application/vnd.ms-outlook', 'msg'],
          ['application/vnd.ms-pki.certstore', 'sst'],
          ['application/vnd.ms-pki.pko', 'pko'],
          ['application/vnd.ms-pki.seccat', 'cat'],
          ['application/vnd.ms-pki.stl', 'stl'],
          ['application/vnd.ms-pkicertstore', 'sst'],
          ['application/vnd.ms-pkiseccat', 'cat'],
          ['application/vnd.ms-pkistl', 'stl'],
          [
            'application/vnd.ms-powerpoint',
            ['ppt', 'pot', 'pps', 'ppa', 'pwz'],
          ],
          ['application/vnd.ms-powerpoint.addin.macroenabled.12', 'ppam'],
          [
            'application/vnd.ms-powerpoint.presentation.macroenabled.12',
            'pptm',
          ],
          ['application/vnd.ms-powerpoint.slide.macroenabled.12', 'sldm'],
          ['application/vnd.ms-powerpoint.slideshow.macroenabled.12', 'ppsm'],
          ['application/vnd.ms-powerpoint.template.macroenabled.12', 'potm'],
          ['application/vnd.ms-project', 'mpp'],
          ['application/vnd.ms-word.document.macroenabled.12', 'docm'],
          ['application/vnd.ms-word.template.macroenabled.12', 'dotm'],
          ['application/vnd.ms-works', ['wks', 'wcm', 'wdb', 'wps']],
          ['application/vnd.ms-wpl', 'wpl'],
          ['application/vnd.ms-xpsdocument', 'xps'],
          ['application/vnd.mseq', 'mseq'],
          ['application/vnd.musician', 'mus'],
          ['application/vnd.muvee.style', 'msty'],
          ['application/vnd.neurolanguage.nlu', 'nlu'],
          ['application/vnd.noblenet-directory', 'nnd'],
          ['application/vnd.noblenet-sealer', 'nns'],
          ['application/vnd.noblenet-web', 'nnw'],
          ['application/vnd.nokia.configuration-message', 'ncm'],
          ['application/vnd.nokia.n-gage.data', 'ngdat'],
          ['application/vnd.nokia.n-gage.symbian.install', 'n-gage'],
          ['application/vnd.nokia.radio-preset', 'rpst'],
          ['application/vnd.nokia.radio-presets', 'rpss'],
          ['application/vnd.nokia.ringing-tone', 'rng'],
          ['application/vnd.novadigm.edm', 'edm'],
          ['application/vnd.novadigm.edx', 'edx'],
          ['application/vnd.novadigm.ext', 'ext'],
          ['application/vnd.oasis.opendocument.chart', 'odc'],
          ['application/vnd.oasis.opendocument.chart-template', 'otc'],
          ['application/vnd.oasis.opendocument.database', 'odb'],
          ['application/vnd.oasis.opendocument.formula', 'odf'],
          ['application/vnd.oasis.opendocument.formula-template', 'odft'],
          ['application/vnd.oasis.opendocument.graphics', 'odg'],
          ['application/vnd.oasis.opendocument.graphics-template', 'otg'],
          ['application/vnd.oasis.opendocument.image', 'odi'],
          ['application/vnd.oasis.opendocument.image-template', 'oti'],
          ['application/vnd.oasis.opendocument.presentation', 'odp'],
          ['application/vnd.oasis.opendocument.presentation-template', 'otp'],
          ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
          ['application/vnd.oasis.opendocument.spreadsheet-template', 'ots'],
          ['application/vnd.oasis.opendocument.text', 'odt'],
          ['application/vnd.oasis.opendocument.text-master', 'odm'],
          ['application/vnd.oasis.opendocument.text-template', 'ott'],
          ['application/vnd.oasis.opendocument.text-web', 'oth'],
          ['application/vnd.olpc-sugar', 'xo'],
          ['application/vnd.oma.dd2+xml', 'dd2'],
          ['application/vnd.openofficeorg.extension', 'oxt'],
          [
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'pptx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.presentationml.slide',
            'sldx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'ppsx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'potx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xlsx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'xltx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx',
          ],
          [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'dotx',
          ],
          ['application/vnd.osgeo.mapguide.package', 'mgp'],
          ['application/vnd.osgi.dp', 'dp'],
          ['application/vnd.palm', 'pdb'],
          ['application/vnd.pawaafile', 'paw'],
          ['application/vnd.pg.format', 'str'],
          ['application/vnd.pg.osasli', 'ei6'],
          ['application/vnd.picsel', 'efif'],
          ['application/vnd.pmi.widget', 'wg'],
          ['application/vnd.pocketlearn', 'plf'],
          ['application/vnd.powerbuilder6', 'pbd'],
          ['application/vnd.previewsystems.box', 'box'],
          ['application/vnd.proteus.magazine', 'mgz'],
          ['application/vnd.publishare-delta-tree', 'qps'],
          ['application/vnd.pvi.ptid1', 'ptid'],
          ['application/vnd.quark.quarkxpress', 'qxd'],
          ['application/vnd.realvnc.bed', 'bed'],
          ['application/vnd.recordare.musicxml', 'mxl'],
          ['application/vnd.recordare.musicxml+xml', 'musicxml'],
          ['application/vnd.rig.cryptonote', 'cryptonote'],
          ['application/vnd.rim.cod', 'cod'],
          ['application/vnd.rn-realmedia', 'rm'],
          ['application/vnd.rn-realplayer', 'rnx'],
          ['application/vnd.route66.link66+xml', 'link66'],
          ['application/vnd.sailingtracker.track', 'st'],
          ['application/vnd.seemail', 'see'],
          ['application/vnd.sema', 'sema'],
          ['application/vnd.semd', 'semd'],
          ['application/vnd.semf', 'semf'],
          ['application/vnd.shana.informed.formdata', 'ifm'],
          ['application/vnd.shana.informed.formtemplate', 'itp'],
          ['application/vnd.shana.informed.interchange', 'iif'],
          ['application/vnd.shana.informed.package', 'ipk'],
          ['application/vnd.simtech-mindmapper', 'twd'],
          ['application/vnd.smaf', 'mmf'],
          ['application/vnd.smart.teacher', 'teacher'],
          ['application/vnd.solent.sdkm+xml', 'sdkm'],
          ['application/vnd.spotfire.dxp', 'dxp'],
          ['application/vnd.spotfire.sfs', 'sfs'],
          ['application/vnd.stardivision.calc', 'sdc'],
          ['application/vnd.stardivision.draw', 'sda'],
          ['application/vnd.stardivision.impress', 'sdd'],
          ['application/vnd.stardivision.math', 'smf'],
          ['application/vnd.stardivision.writer', 'sdw'],
          ['application/vnd.stardivision.writer-global', 'sgl'],
          ['application/vnd.stepmania.stepchart', 'sm'],
          ['application/vnd.sun.xml.calc', 'sxc'],
          ['application/vnd.sun.xml.calc.template', 'stc'],
          ['application/vnd.sun.xml.draw', 'sxd'],
          ['application/vnd.sun.xml.draw.template', 'std'],
          ['application/vnd.sun.xml.impress', 'sxi'],
          ['application/vnd.sun.xml.impress.template', 'sti'],
          ['application/vnd.sun.xml.math', 'sxm'],
          ['application/vnd.sun.xml.writer', 'sxw'],
          ['application/vnd.sun.xml.writer.global', 'sxg'],
          ['application/vnd.sun.xml.writer.template', 'stw'],
          ['application/vnd.sus-calendar', 'sus'],
          ['application/vnd.svd', 'svd'],
          ['application/vnd.symbian.install', 'sis'],
          ['application/vnd.syncml+xml', 'xsm'],
          ['application/vnd.syncml.dm+wbxml', 'bdm'],
          ['application/vnd.syncml.dm+xml', 'xdm'],
          ['application/vnd.tao.intent-module-archive', 'tao'],
          ['application/vnd.tmobile-livetv', 'tmo'],
          ['application/vnd.trid.tpt', 'tpt'],
          ['application/vnd.triscape.mxs', 'mxs'],
          ['application/vnd.trueapp', 'tra'],
          ['application/vnd.ufdl', 'ufd'],
          ['application/vnd.uiq.theme', 'utz'],
          ['application/vnd.umajin', 'umj'],
          ['application/vnd.unity', 'unityweb'],
          ['application/vnd.uoml+xml', 'uoml'],
          ['application/vnd.vcx', 'vcx'],
          ['application/vnd.visio', 'vsd'],
          ['application/vnd.visionary', 'vis'],
          ['application/vnd.vsf', 'vsf'],
          ['application/vnd.wap.wbxml', 'wbxml'],
          ['application/vnd.wap.wmlc', 'wmlc'],
          ['application/vnd.wap.wmlscriptc', 'wmlsc'],
          ['application/vnd.webturbo', 'wtb'],
          ['application/vnd.wolfram.player', 'nbp'],
          ['application/vnd.wordperfect', 'wpd'],
          ['application/vnd.wqd', 'wqd'],
          ['application/vnd.wt.stf', 'stf'],
          ['application/vnd.xara', ['web', 'xar']],
          ['application/vnd.xfdl', 'xfdl'],
          ['application/vnd.yamaha.hv-dic', 'hvd'],
          ['application/vnd.yamaha.hv-script', 'hvs'],
          ['application/vnd.yamaha.hv-voice', 'hvp'],
          ['application/vnd.yamaha.openscoreformat', 'osf'],
          ['application/vnd.yamaha.openscoreformat.osfpvg+xml', 'osfpvg'],
          ['application/vnd.yamaha.smaf-audio', 'saf'],
          ['application/vnd.yamaha.smaf-phrase', 'spf'],
          ['application/vnd.yellowriver-custom-menu', 'cmp'],
          ['application/vnd.zul', 'zir'],
          ['application/vnd.zzazz.deck+xml', 'zaz'],
          ['application/vocaltec-media-desc', 'vmd'],
          ['application/vocaltec-media-file', 'vmf'],
          ['application/voicexml+xml', 'vxml'],
          ['application/widget', 'wgt'],
          ['application/winhlp', 'hlp'],
          ['application/wordperfect', ['wp', 'wp5', 'wp6', 'wpd']],
          ['application/wordperfect6.0', ['w60', 'wp5']],
          ['application/wordperfect6.1', 'w61'],
          ['application/wsdl+xml', 'wsdl'],
          ['application/wspolicy+xml', 'wspolicy'],
          ['application/x-123', 'wk1'],
          ['application/x-7z-compressed', '7z'],
          ['application/x-abiword', 'abw'],
          ['application/x-ace-compressed', 'ace'],
          ['application/x-aim', 'aim'],
          ['application/x-authorware-bin', 'aab'],
          ['application/x-authorware-map', 'aam'],
          ['application/x-authorware-seg', 'aas'],
          ['application/x-bcpio', 'bcpio'],
          ['application/x-binary', 'bin'],
          ['application/x-binhex40', 'hqx'],
          ['application/x-bittorrent', 'torrent'],
          ['application/x-bsh', ['bsh', 'sh', 'shar']],
          ['application/x-bytecode.elisp', 'elc'],
          ['applicaiton/x-bytecode.python', 'pyc'],
          ['application/x-bzip', 'bz'],
          ['application/x-bzip2', ['boz', 'bz2']],
          ['application/x-cdf', 'cdf'],
          ['application/x-cdlink', 'vcd'],
          ['application/x-chat', ['cha', 'chat']],
          ['application/x-chess-pgn', 'pgn'],
          ['application/x-cmu-raster', 'ras'],
          ['application/x-cocoa', 'cco'],
          ['application/x-compactpro', 'cpt'],
          ['application/x-compress', 'z'],
          ['application/x-compressed', ['tgz', 'gz', 'z', 'zip']],
          ['application/x-conference', 'nsc'],
          ['application/x-cpio', 'cpio'],
          ['application/x-cpt', 'cpt'],
          ['application/x-csh', 'csh'],
          ['application/x-debian-package', 'deb'],
          ['application/x-deepv', 'deepv'],
          ['application/x-director', ['dir', 'dcr', 'dxr']],
          ['application/x-doom', 'wad'],
          ['application/x-dtbncx+xml', 'ncx'],
          ['application/x-dtbook+xml', 'dtb'],
          ['application/x-dtbresource+xml', 'res'],
          ['application/x-dvi', 'dvi'],
          ['application/x-elc', 'elc'],
          ['application/x-envoy', ['env', 'evy']],
          ['application/x-esrehber', 'es'],
          [
            'application/x-excel',
            [
              'xls',
              'xla',
              'xlb',
              'xlc',
              'xld',
              'xlk',
              'xll',
              'xlm',
              'xlt',
              'xlv',
              'xlw',
            ],
          ],
          ['application/x-font-bdf', 'bdf'],
          ['application/x-font-ghostscript', 'gsf'],
          ['application/x-font-linux-psf', 'psf'],
          ['application/x-font-otf', 'otf'],
          ['application/x-font-pcf', 'pcf'],
          ['application/x-font-snf', 'snf'],
          ['application/x-font-ttf', 'ttf'],
          ['application/x-font-type1', 'pfa'],
          ['application/x-font-woff', 'woff'],
          ['application/x-frame', 'mif'],
          ['application/x-freelance', 'pre'],
          ['application/x-futuresplash', 'spl'],
          ['application/x-gnumeric', 'gnumeric'],
          ['application/x-gsp', 'gsp'],
          ['application/x-gss', 'gss'],
          ['application/x-gtar', 'gtar'],
          ['application/x-gzip', ['gz', 'gzip']],
          ['application/x-hdf', 'hdf'],
          ['application/x-helpfile', ['help', 'hlp']],
          ['application/x-httpd-imap', 'imap'],
          ['application/x-ima', 'ima'],
          ['application/x-internet-signup', ['ins', 'isp']],
          ['application/x-internett-signup', 'ins'],
          ['application/x-inventor', 'iv'],
          ['application/x-ip2', 'ip'],
          ['application/x-iphone', 'iii'],
          ['application/x-java-class', 'class'],
          ['application/x-java-commerce', 'jcm'],
          ['application/x-java-jnlp-file', 'jnlp'],
          ['application/x-javascript', 'js'],
          ['application/x-koan', ['skd', 'skm', 'skp', 'skt']],
          ['application/x-ksh', 'ksh'],
          ['application/x-latex', ['latex', 'ltx']],
          ['application/x-lha', 'lha'],
          ['application/x-lisp', 'lsp'],
          ['application/x-livescreen', 'ivy'],
          ['application/x-lotus', 'wq1'],
          ['application/x-lotusscreencam', 'scm'],
          ['application/x-lzh', 'lzh'],
          ['application/x-lzx', 'lzx'],
          ['application/x-mac-binhex40', 'hqx'],
          ['application/x-macbinary', 'bin'],
          ['application/x-magic-cap-package-1.0', 'mc$'],
          ['application/x-mathcad', 'mcd'],
          ['application/x-meme', 'mm'],
          ['application/x-midi', ['mid', 'midi']],
          ['application/x-mif', 'mif'],
          ['application/x-mix-transfer', 'nix'],
          ['application/x-mobipocket-ebook', 'prc'],
          ['application/x-mplayer2', 'asx'],
          ['application/x-ms-application', 'application'],
          ['application/x-ms-wmd', 'wmd'],
          ['application/x-ms-wmz', 'wmz'],
          ['application/x-ms-xbap', 'xbap'],
          ['application/x-msaccess', 'mdb'],
          ['application/x-msbinder', 'obd'],
          ['application/x-mscardfile', 'crd'],
          ['application/x-msclip', 'clp'],
          ['application/x-msdownload', ['exe', 'dll']],
          ['application/x-msexcel', ['xls', 'xla', 'xlw']],
          ['application/x-msmediaview', ['mvb', 'm13', 'm14']],
          ['application/x-msmetafile', 'wmf'],
          ['application/x-msmoney', 'mny'],
          ['application/x-mspowerpoint', 'ppt'],
          ['application/x-mspublisher', 'pub'],
          ['application/x-msschedule', 'scd'],
          ['application/x-msterminal', 'trm'],
          ['application/x-mswrite', 'wri'],
          ['application/x-navi-animation', 'ani'],
          ['application/x-navidoc', 'nvd'],
          ['application/x-navimap', 'map'],
          ['application/x-navistyle', 'stl'],
          ['application/x-netcdf', ['cdf', 'nc']],
          ['application/x-newton-compatible-pkg', 'pkg'],
          ['application/x-nokia-9000-communicator-add-on-software', 'aos'],
          ['application/x-omc', 'omc'],
          ['application/x-omcdatamaker', 'omcd'],
          ['application/x-omcregerator', 'omcr'],
          ['application/x-pagemaker', ['pm4', 'pm5']],
          ['application/x-pcl', 'pcl'],
          ['application/x-perfmon', ['pma', 'pmc', 'pml', 'pmr', 'pmw']],
          ['application/x-pixclscript', 'plx'],
          ['application/x-pkcs10', 'p10'],
          ['application/x-pkcs12', ['p12', 'pfx']],
          ['application/x-pkcs7-certificates', ['p7b', 'spc']],
          ['application/x-pkcs7-certreqresp', 'p7r'],
          ['application/x-pkcs7-mime', ['p7m', 'p7c']],
          ['application/x-pkcs7-signature', ['p7s', 'p7a']],
          ['application/x-pointplus', 'css'],
          ['application/x-portable-anymap', 'pnm'],
          ['application/x-project', ['mpc', 'mpt', 'mpv', 'mpx']],
          ['application/x-qpro', 'wb1'],
          ['application/x-rar-compressed', 'rar'],
          ['application/x-rtf', 'rtf'],
          ['application/x-sdp', 'sdp'],
          ['application/x-sea', 'sea'],
          ['application/x-seelogo', 'sl'],
          ['application/x-sh', 'sh'],
          ['application/x-shar', ['shar', 'sh']],
          ['application/x-shockwave-flash', 'swf'],
          ['application/x-silverlight-app', 'xap'],
          ['application/x-sit', 'sit'],
          ['application/x-sprite', ['spr', 'sprite']],
          ['application/x-stuffit', 'sit'],
          ['application/x-stuffitx', 'sitx'],
          ['application/x-sv4cpio', 'sv4cpio'],
          ['application/x-sv4crc', 'sv4crc'],
          ['application/x-tar', 'tar'],
          ['application/x-tbook', ['sbk', 'tbk']],
          ['application/x-tcl', 'tcl'],
          ['application/x-tex', 'tex'],
          ['application/x-tex-tfm', 'tfm'],
          ['application/x-texinfo', ['texi', 'texinfo']],
          ['application/x-troff', ['roff', 't', 'tr']],
          ['application/x-troff-man', 'man'],
          ['application/x-troff-me', 'me'],
          ['application/x-troff-ms', 'ms'],
          ['application/x-troff-msvideo', 'avi'],
          ['application/x-ustar', 'ustar'],
          ['application/x-visio', ['vsd', 'vst', 'vsw']],
          ['application/x-vnd.audioexplosion.mzz', 'mzz'],
          ['application/x-vnd.ls-xpix', 'xpix'],
          ['application/x-vrml', 'vrml'],
          ['application/x-wais-source', ['src', 'wsrc']],
          ['application/x-winhelp', 'hlp'],
          ['application/x-wintalk', 'wtk'],
          ['application/x-world', ['wrl', 'svr']],
          ['application/x-wpwin', 'wpd'],
          ['application/x-wri', 'wri'],
          ['application/x-x509-ca-cert', ['cer', 'crt', 'der']],
          ['application/x-x509-user-cert', 'crt'],
          ['application/x-xfig', 'fig'],
          ['application/x-xpinstall', 'xpi'],
          ['application/x-zip-compressed', 'zip'],
          ['application/xcap-diff+xml', 'xdf'],
          ['application/xenc+xml', 'xenc'],
          ['application/xhtml+xml', 'xhtml'],
          ['application/xml', 'xml'],
          ['application/xml-dtd', 'dtd'],
          ['application/xop+xml', 'xop'],
          ['application/xslt+xml', 'xslt'],
          ['application/xspf+xml', 'xspf'],
          ['application/xv+xml', 'mxml'],
          ['application/yang', 'yang'],
          ['application/yin+xml', 'yin'],
          ['application/ynd.ms-pkipko', 'pko'],
          ['application/zip', 'zip'],
          ['audio/adpcm', 'adp'],
          ['audio/aiff', ['aiff', 'aif', 'aifc']],
          ['audio/basic', ['snd', 'au']],
          ['audio/it', 'it'],
          ['audio/make', ['funk', 'my', 'pfunk']],
          ['audio/make.my.funk', 'pfunk'],
          ['audio/mid', ['mid', 'rmi']],
          ['audio/midi', ['midi', 'kar', 'mid']],
          ['audio/mod', 'mod'],
          ['audio/mp4', 'mp4a'],
          ['audio/mpeg', ['mpga', 'mp3', 'm2a', 'mp2', 'mpa', 'mpg']],
          ['audio/mpeg3', 'mp3'],
          ['audio/nspaudio', ['la', 'lma']],
          ['audio/ogg', 'oga'],
          ['audio/s3m', 's3m'],
          ['audio/tsp-audio', 'tsi'],
          ['audio/tsplayer', 'tsp'],
          ['audio/vnd.dece.audio', 'uva'],
          ['audio/vnd.digital-winds', 'eol'],
          ['audio/vnd.dra', 'dra'],
          ['audio/vnd.dts', 'dts'],
          ['audio/vnd.dts.hd', 'dtshd'],
          ['audio/vnd.lucent.voice', 'lvp'],
          ['audio/vnd.ms-playready.media.pya', 'pya'],
          ['audio/vnd.nuera.ecelp4800', 'ecelp4800'],
          ['audio/vnd.nuera.ecelp7470', 'ecelp7470'],
          ['audio/vnd.nuera.ecelp9600', 'ecelp9600'],
          ['audio/vnd.qcelp', 'qcp'],
          ['audio/vnd.rip', 'rip'],
          ['audio/voc', 'voc'],
          ['audio/voxware', 'vox'],
          ['audio/wav', 'wav'],
          ['audio/webm', 'weba'],
          ['audio/x-aac', 'aac'],
          ['audio/x-adpcm', 'snd'],
          ['audio/x-aiff', ['aiff', 'aif', 'aifc']],
          ['audio/x-au', 'au'],
          ['audio/x-gsm', ['gsd', 'gsm']],
          ['audio/x-jam', 'jam'],
          ['audio/x-liveaudio', 'lam'],
          ['audio/x-mid', ['mid', 'midi']],
          ['audio/x-midi', ['midi', 'mid']],
          ['audio/x-mod', 'mod'],
          ['audio/x-mpeg', 'mp2'],
          ['audio/x-mpeg-3', 'mp3'],
          ['audio/x-mpegurl', 'm3u'],
          ['audio/x-mpequrl', 'm3u'],
          ['audio/x-ms-wax', 'wax'],
          ['audio/x-ms-wma', 'wma'],
          ['audio/x-nspaudio', ['la', 'lma']],
          ['audio/x-pn-realaudio', ['ra', 'ram', 'rm', 'rmm', 'rmp']],
          ['audio/x-pn-realaudio-plugin', ['ra', 'rmp', 'rpm']],
          ['audio/x-psid', 'sid'],
          ['audio/x-realaudio', 'ra'],
          ['audio/x-twinvq', 'vqf'],
          ['audio/x-twinvq-plugin', ['vqe', 'vql']],
          ['audio/x-vnd.audioexplosion.mjuicemediafile', 'mjf'],
          ['audio/x-voc', 'voc'],
          ['audio/x-wav', 'wav'],
          ['audio/xm', 'xm'],
          ['chemical/x-cdx', 'cdx'],
          ['chemical/x-cif', 'cif'],
          ['chemical/x-cmdf', 'cmdf'],
          ['chemical/x-cml', 'cml'],
          ['chemical/x-csml', 'csml'],
          ['chemical/x-pdb', ['pdb', 'xyz']],
          ['chemical/x-xyz', 'xyz'],
          ['drawing/x-dwf', 'dwf'],
          ['i-world/i-vrml', 'ivr'],
          ['image/bmp', ['bmp', 'bm']],
          ['image/cgm', 'cgm'],
          ['image/cis-cod', 'cod'],
          ['image/cmu-raster', ['ras', 'rast']],
          ['image/fif', 'fif'],
          ['image/florian', ['flo', 'turbot']],
          ['image/g3fax', 'g3'],
          ['image/gif', 'gif'],
          ['image/ief', ['ief', 'iefs']],
          ['image/jpeg', ['jpeg', 'jpe', 'jpg', 'jfif', 'jfif-tbnl']],
          ['image/jutvision', 'jut'],
          ['image/ktx', 'ktx'],
          ['image/naplps', ['nap', 'naplps']],
          ['image/pict', ['pic', 'pict']],
          ['image/pipeg', 'jfif'],
          ['image/pjpeg', ['jfif', 'jpe', 'jpeg', 'jpg']],
          ['image/png', ['png', 'x-png']],
          ['image/prs.btif', 'btif'],
          ['image/svg+xml', 'svg'],
          ['image/tiff', ['tif', 'tiff']],
          ['image/vasa', 'mcf'],
          ['image/vnd.adobe.photoshop', 'psd'],
          ['image/vnd.dece.graphic', 'uvi'],
          ['image/vnd.djvu', 'djvu'],
          ['image/vnd.dvb.subtitle', 'sub'],
          ['image/vnd.dwg', ['dwg', 'dxf', 'svf']],
          ['image/vnd.dxf', 'dxf'],
          ['image/vnd.fastbidsheet', 'fbs'],
          ['image/vnd.fpx', 'fpx'],
          ['image/vnd.fst', 'fst'],
          ['image/vnd.fujixerox.edmics-mmr', 'mmr'],
          ['image/vnd.fujixerox.edmics-rlc', 'rlc'],
          ['image/vnd.ms-modi', 'mdi'],
          ['image/vnd.net-fpx', ['fpx', 'npx']],
          ['image/vnd.rn-realflash', 'rf'],
          ['image/vnd.rn-realpix', 'rp'],
          ['image/vnd.wap.wbmp', 'wbmp'],
          ['image/vnd.xiff', 'xif'],
          ['image/webp', 'webp'],
          ['image/x-cmu-raster', 'ras'],
          ['image/x-cmx', 'cmx'],
          ['image/x-dwg', ['dwg', 'dxf', 'svf']],
          ['image/x-freehand', 'fh'],
          ['image/x-icon', 'ico'],
          ['image/x-jg', 'art'],
          ['image/x-jps', 'jps'],
          ['image/x-niff', ['niff', 'nif']],
          ['image/x-pcx', 'pcx'],
          ['image/x-pict', ['pct', 'pic']],
          ['image/x-portable-anymap', 'pnm'],
          ['image/x-portable-bitmap', 'pbm'],
          ['image/x-portable-graymap', 'pgm'],
          ['image/x-portable-greymap', 'pgm'],
          ['image/x-portable-pixmap', 'ppm'],
          ['image/x-quicktime', ['qif', 'qti', 'qtif']],
          ['image/x-rgb', 'rgb'],
          ['image/x-tiff', ['tif', 'tiff']],
          ['image/x-windows-bmp', 'bmp'],
          ['image/x-xbitmap', 'xbm'],
          ['image/x-xbm', 'xbm'],
          ['image/x-xpixmap', ['xpm', 'pm']],
          ['image/x-xwd', 'xwd'],
          ['image/x-xwindowdump', 'xwd'],
          ['image/xbm', 'xbm'],
          ['image/xpm', 'xpm'],
          ['message/rfc822', ['eml', 'mht', 'mhtml', 'nws', 'mime']],
          ['model/iges', ['iges', 'igs']],
          ['model/mesh', 'msh'],
          ['model/vnd.collada+xml', 'dae'],
          ['model/vnd.dwf', 'dwf'],
          ['model/vnd.gdl', 'gdl'],
          ['model/vnd.gtw', 'gtw'],
          ['model/vnd.mts', 'mts'],
          ['model/vnd.vtu', 'vtu'],
          ['model/vrml', ['vrml', 'wrl', 'wrz']],
          ['model/x-pov', 'pov'],
          ['multipart/x-gzip', 'gzip'],
          ['multipart/x-ustar', 'ustar'],
          ['multipart/x-zip', 'zip'],
          ['music/crescendo', ['mid', 'midi']],
          ['music/x-karaoke', 'kar'],
          ['paleovu/x-pv', 'pvu'],
          ['text/asp', 'asp'],
          ['text/calendar', 'ics'],
          ['text/css', 'css'],
          ['text/csv', 'csv'],
          ['text/ecmascript', 'js'],
          ['text/h323', '323'],
          [
            'text/html',
            ['html', 'htm', 'stm', 'acgi', 'htmls', 'htx', 'shtml'],
          ],
          ['text/iuls', 'uls'],
          ['text/javascript', 'js'],
          ['text/mcf', 'mcf'],
          ['text/n3', 'n3'],
          ['text/pascal', 'pas'],
          [
            'text/plain',
            [
              'txt',
              'bas',
              'c',
              'h',
              'c++',
              'cc',
              'com',
              'conf',
              'cxx',
              'def',
              'f',
              'f90',
              'for',
              'g',
              'hh',
              'idc',
              'jav',
              'java',
              'list',
              'log',
              'lst',
              'm',
              'mar',
              'pl',
              'sdml',
              'text',
            ],
          ],
          ['text/plain-bas', 'par'],
          ['text/prs.lines.tag', 'dsc'],
          ['text/richtext', ['rtx', 'rt', 'rtf']],
          ['text/scriplet', 'wsc'],
          ['text/scriptlet', 'sct'],
          ['text/sgml', ['sgm', 'sgml']],
          ['text/tab-separated-values', 'tsv'],
          ['text/troff', 't'],
          ['text/turtle', 'ttl'],
          ['text/uri-list', ['uni', 'unis', 'uri', 'uris']],
          ['text/vnd.abc', 'abc'],
          ['text/vnd.curl', 'curl'],
          ['text/vnd.curl.dcurl', 'dcurl'],
          ['text/vnd.curl.mcurl', 'mcurl'],
          ['text/vnd.curl.scurl', 'scurl'],
          ['text/vnd.fly', 'fly'],
          ['text/vnd.fmi.flexstor', 'flx'],
          ['text/vnd.graphviz', 'gv'],
          ['text/vnd.in3d.3dml', '3dml'],
          ['text/vnd.in3d.spot', 'spot'],
          ['text/vnd.rn-realtext', 'rt'],
          ['text/vnd.sun.j2me.app-descriptor', 'jad'],
          ['text/vnd.wap.wml', 'wml'],
          ['text/vnd.wap.wmlscript', 'wmls'],
          ['text/webviewhtml', 'htt'],
          ['text/x-asm', ['asm', 's']],
          ['text/x-audiosoft-intra', 'aip'],
          ['text/x-c', ['c', 'cc', 'cpp']],
          ['text/x-component', 'htc'],
          ['text/x-fortran', ['for', 'f', 'f77', 'f90']],
          ['text/x-h', ['h', 'hh']],
          ['text/x-java-source', ['java', 'jav']],
          ['text/x-java-source,java', 'java'],
          ['text/x-la-asf', 'lsx'],
          ['text/x-m', 'm'],
          ['text/x-pascal', 'p'],
          ['text/x-script', 'hlb'],
          ['text/x-script.csh', 'csh'],
          ['text/x-script.elisp', 'el'],
          ['text/x-script.guile', 'scm'],
          ['text/x-script.ksh', 'ksh'],
          ['text/x-script.lisp', 'lsp'],
          ['text/x-script.perl', 'pl'],
          ['text/x-script.perl-module', 'pm'],
          ['text/x-script.phyton', 'py'],
          ['text/x-script.rexx', 'rexx'],
          ['text/x-script.scheme', 'scm'],
          ['text/x-script.sh', 'sh'],
          ['text/x-script.tcl', 'tcl'],
          ['text/x-script.tcsh', 'tcsh'],
          ['text/x-script.zsh', 'zsh'],
          ['text/x-server-parsed-html', ['shtml', 'ssi']],
          ['text/x-setext', 'etx'],
          ['text/x-sgml', ['sgm', 'sgml']],
          ['text/x-speech', ['spc', 'talk']],
          ['text/x-uil', 'uil'],
          ['text/x-uuencode', ['uu', 'uue']],
          ['text/x-vcalendar', 'vcs'],
          ['text/x-vcard', 'vcf'],
          ['text/xml', 'xml'],
          ['video/3gpp', '3gp'],
          ['video/3gpp2', '3g2'],
          ['video/animaflex', 'afl'],
          ['video/avi', 'avi'],
          ['video/avs-video', 'avs'],
          ['video/dl', 'dl'],
          ['video/fli', 'fli'],
          ['video/gl', 'gl'],
          ['video/h261', 'h261'],
          ['video/h263', 'h263'],
          ['video/h264', 'h264'],
          ['video/jpeg', 'jpgv'],
          ['video/jpm', 'jpm'],
          ['video/mj2', 'mj2'],
          ['video/mp4', 'mp4'],
          [
            'video/mpeg',
            ['mpeg', 'mp2', 'mpa', 'mpe', 'mpg', 'mpv2', 'm1v', 'm2v', 'mp3'],
          ],
          ['video/msvideo', 'avi'],
          ['video/ogg', 'ogv'],
          ['video/quicktime', ['mov', 'qt', 'moov']],
          ['video/vdo', 'vdo'],
          ['video/vivo', ['viv', 'vivo']],
          ['video/vnd.dece.hd', 'uvh'],
          ['video/vnd.dece.mobile', 'uvm'],
          ['video/vnd.dece.pd', 'uvp'],
          ['video/vnd.dece.sd', 'uvs'],
          ['video/vnd.dece.video', 'uvv'],
          ['video/vnd.fvt', 'fvt'],
          ['video/vnd.mpegurl', 'mxu'],
          ['video/vnd.ms-playready.media.pyv', 'pyv'],
          ['video/vnd.rn-realvideo', 'rv'],
          ['video/vnd.uvvu.mp4', 'uvu'],
          ['video/vnd.vivo', ['viv', 'vivo']],
          ['video/vosaic', 'vos'],
          ['video/webm', 'webm'],
          ['video/x-amt-demorun', 'xdr'],
          ['video/x-amt-showrun', 'xsr'],
          ['video/x-atomic3d-feature', 'fmf'],
          ['video/x-dl', 'dl'],
          ['video/x-dv', ['dif', 'dv']],
          ['video/x-f4v', 'f4v'],
          ['video/x-fli', 'fli'],
          ['video/x-flv', 'flv'],
          ['video/x-gl', 'gl'],
          ['video/x-isvideo', 'isu'],
          ['video/x-la-asf', ['lsf', 'lsx']],
          ['video/x-m4v', 'm4v'],
          ['video/x-motion-jpeg', 'mjpg'],
          ['video/x-mpeg', ['mp3', 'mp2']],
          ['video/x-mpeq2a', 'mp2'],
          ['video/x-ms-asf', ['asf', 'asr', 'asx']],
          ['video/x-ms-asf-plugin', 'asx'],
          ['video/x-ms-wm', 'wm'],
          ['video/x-ms-wmv', 'wmv'],
          ['video/x-ms-wmx', 'wmx'],
          ['video/x-ms-wvx', 'wvx'],
          ['video/x-msvideo', 'avi'],
          ['video/x-qtc', 'qtc'],
          ['video/x-scm', 'scm'],
          ['video/x-sgi-movie', ['movie', 'mv']],
          ['windows/metafile', 'wmf'],
          ['www/mime', 'mime'],
          ['x-conference/x-cooltalk', 'ice'],
          ['x-music/x-midi', ['mid', 'midi']],
          ['x-world/x-3dmf', ['3dm', '3dmf', 'qd3', 'qd3d']],
          ['x-world/x-svr', 'svr'],
          ['x-world/x-vrml', ['flr', 'vrml', 'wrl', 'wrz', 'xaf', 'xof']],
          ['x-world/x-vrt', 'vrt'],
          ['xgl/drawing', 'xgz'],
          ['xgl/movie', 'xmz'],
        ]),
        r = new Map([
          ['123', 'application/vnd.lotus-1-2-3'],
          ['323', 'text/h323'],
          ['*', 'application/octet-stream'],
          ['3dm', 'x-world/x-3dmf'],
          ['3dmf', 'x-world/x-3dmf'],
          ['3dml', 'text/vnd.in3d.3dml'],
          ['3g2', 'video/3gpp2'],
          ['3gp', 'video/3gpp'],
          ['7z', 'application/x-7z-compressed'],
          ['a', 'application/octet-stream'],
          ['aab', 'application/x-authorware-bin'],
          ['aac', 'audio/x-aac'],
          ['aam', 'application/x-authorware-map'],
          ['aas', 'application/x-authorware-seg'],
          ['abc', 'text/vnd.abc'],
          ['abw', 'application/x-abiword'],
          ['ac', 'application/pkix-attr-cert'],
          ['acc', 'application/vnd.americandynamics.acc'],
          ['ace', 'application/x-ace-compressed'],
          ['acgi', 'text/html'],
          ['acu', 'application/vnd.acucobol'],
          ['acx', 'application/internet-property-stream'],
          ['adp', 'audio/adpcm'],
          ['aep', 'application/vnd.audiograph'],
          ['afl', 'video/animaflex'],
          ['afp', 'application/vnd.ibm.modcap'],
          ['ahead', 'application/vnd.ahead.space'],
          ['ai', 'application/postscript'],
          ['aif', ['audio/aiff', 'audio/x-aiff']],
          ['aifc', ['audio/aiff', 'audio/x-aiff']],
          ['aiff', ['audio/aiff', 'audio/x-aiff']],
          ['aim', 'application/x-aim'],
          ['aip', 'text/x-audiosoft-intra'],
          [
            'air',
            'application/vnd.adobe.air-application-installer-package+zip',
          ],
          ['ait', 'application/vnd.dvb.ait'],
          ['ami', 'application/vnd.amiga.ami'],
          ['ani', 'application/x-navi-animation'],
          ['aos', 'application/x-nokia-9000-communicator-add-on-software'],
          ['apk', 'application/vnd.android.package-archive'],
          ['application', 'application/x-ms-application'],
          ['apr', 'application/vnd.lotus-approach'],
          ['aps', 'application/mime'],
          ['arc', 'application/octet-stream'],
          ['arj', ['application/arj', 'application/octet-stream']],
          ['art', 'image/x-jg'],
          ['asf', 'video/x-ms-asf'],
          ['asm', 'text/x-asm'],
          ['aso', 'application/vnd.accpac.simply.aso'],
          ['asp', 'text/asp'],
          ['asr', 'video/x-ms-asf'],
          [
            'asx',
            [
              'video/x-ms-asf',
              'application/x-mplayer2',
              'video/x-ms-asf-plugin',
            ],
          ],
          ['atc', 'application/vnd.acucorp'],
          ['atomcat', 'application/atomcat+xml'],
          ['atomsvc', 'application/atomsvc+xml'],
          ['atx', 'application/vnd.antix.game-component'],
          ['au', ['audio/basic', 'audio/x-au']],
          [
            'avi',
            [
              'video/avi',
              'video/msvideo',
              'application/x-troff-msvideo',
              'video/x-msvideo',
            ],
          ],
          ['avs', 'video/avs-video'],
          ['aw', 'application/applixware'],
          ['axs', 'application/olescript'],
          ['azf', 'application/vnd.airzip.filesecure.azf'],
          ['azs', 'application/vnd.airzip.filesecure.azs'],
          ['azw', 'application/vnd.amazon.ebook'],
          ['bas', 'text/plain'],
          ['bcpio', 'application/x-bcpio'],
          ['bdf', 'application/x-font-bdf'],
          ['bdm', 'application/vnd.syncml.dm+wbxml'],
          ['bed', 'application/vnd.realvnc.bed'],
          ['bh2', 'application/vnd.fujitsu.oasysprs'],
          [
            'bin',
            [
              'application/octet-stream',
              'application/mac-binary',
              'application/macbinary',
              'application/x-macbinary',
              'application/x-binary',
            ],
          ],
          ['bm', 'image/bmp'],
          ['bmi', 'application/vnd.bmi'],
          ['bmp', ['image/bmp', 'image/x-windows-bmp']],
          ['boo', 'application/book'],
          ['book', 'application/book'],
          ['box', 'application/vnd.previewsystems.box'],
          ['boz', 'application/x-bzip2'],
          ['bsh', 'application/x-bsh'],
          ['btif', 'image/prs.btif'],
          ['bz', 'application/x-bzip'],
          ['bz2', 'application/x-bzip2'],
          ['c', ['text/plain', 'text/x-c']],
          ['c++', 'text/plain'],
          ['c11amc', 'application/vnd.cluetrust.cartomobile-config'],
          ['c11amz', 'application/vnd.cluetrust.cartomobile-config-pkg'],
          ['c4g', 'application/vnd.clonk.c4group'],
          ['cab', 'application/vnd.ms-cab-compressed'],
          ['car', 'application/vnd.curl.car'],
          [
            'cat',
            ['application/vnd.ms-pkiseccat', 'application/vnd.ms-pki.seccat'],
          ],
          ['cc', ['text/plain', 'text/x-c']],
          ['ccad', 'application/clariscad'],
          ['cco', 'application/x-cocoa'],
          ['ccxml', 'application/ccxml+xml,'],
          ['cdbcmsg', 'application/vnd.contact.cmsg'],
          [
            'cdf',
            ['application/cdf', 'application/x-cdf', 'application/x-netcdf'],
          ],
          ['cdkey', 'application/vnd.mediastation.cdkey'],
          ['cdmia', 'application/cdmi-capability'],
          ['cdmic', 'application/cdmi-container'],
          ['cdmid', 'application/cdmi-domain'],
          ['cdmio', 'application/cdmi-object'],
          ['cdmiq', 'application/cdmi-queue'],
          ['cdx', 'chemical/x-cdx'],
          ['cdxml', 'application/vnd.chemdraw+xml'],
          ['cdy', 'application/vnd.cinderella'],
          ['cer', ['application/pkix-cert', 'application/x-x509-ca-cert']],
          ['cgm', 'image/cgm'],
          ['cha', 'application/x-chat'],
          ['chat', 'application/x-chat'],
          ['chm', 'application/vnd.ms-htmlhelp'],
          ['chrt', 'application/vnd.kde.kchart'],
          ['cif', 'chemical/x-cif'],
          ['cii', 'application/vnd.anser-web-certificate-issue-initiation'],
          ['cil', 'application/vnd.ms-artgalry'],
          ['cla', 'application/vnd.claymore'],
          [
            'class',
            [
              'application/octet-stream',
              'application/java',
              'application/java-byte-code',
              'application/java-vm',
              'application/x-java-class',
            ],
          ],
          ['clkk', 'application/vnd.crick.clicker.keyboard'],
          ['clkp', 'application/vnd.crick.clicker.palette'],
          ['clkt', 'application/vnd.crick.clicker.template'],
          ['clkw', 'application/vnd.crick.clicker.wordbank'],
          ['clkx', 'application/vnd.crick.clicker'],
          ['clp', 'application/x-msclip'],
          ['cmc', 'application/vnd.cosmocaller'],
          ['cmdf', 'chemical/x-cmdf'],
          ['cml', 'chemical/x-cml'],
          ['cmp', 'application/vnd.yellowriver-custom-menu'],
          ['cmx', 'image/x-cmx'],
          ['cod', ['image/cis-cod', 'application/vnd.rim.cod']],
          ['com', ['application/octet-stream', 'text/plain']],
          ['conf', 'text/plain'],
          ['cpio', 'application/x-cpio'],
          ['cpp', 'text/x-c'],
          [
            'cpt',
            [
              'application/mac-compactpro',
              'application/x-compactpro',
              'application/x-cpt',
            ],
          ],
          ['crd', 'application/x-mscardfile'],
          ['crl', ['application/pkix-crl', 'application/pkcs-crl']],
          [
            'crt',
            [
              'application/pkix-cert',
              'application/x-x509-user-cert',
              'application/x-x509-ca-cert',
            ],
          ],
          ['cryptonote', 'application/vnd.rig.cryptonote'],
          ['csh', ['text/x-script.csh', 'application/x-csh']],
          ['csml', 'chemical/x-csml'],
          ['csp', 'application/vnd.commonspace'],
          ['css', ['text/css', 'application/x-pointplus']],
          ['csv', 'text/csv'],
          ['cu', 'application/cu-seeme'],
          ['curl', 'text/vnd.curl'],
          ['cww', 'application/prs.cww'],
          ['cxx', 'text/plain'],
          ['dae', 'model/vnd.collada+xml'],
          ['daf', 'application/vnd.mobius.daf'],
          ['davmount', 'application/davmount+xml'],
          ['dcr', 'application/x-director'],
          ['dcurl', 'text/vnd.curl.dcurl'],
          ['dd2', 'application/vnd.oma.dd2+xml'],
          ['ddd', 'application/vnd.fujixerox.ddd'],
          ['deb', 'application/x-debian-package'],
          ['deepv', 'application/x-deepv'],
          ['def', 'text/plain'],
          ['der', 'application/x-x509-ca-cert'],
          ['dfac', 'application/vnd.dreamfactory'],
          ['dif', 'video/x-dv'],
          ['dir', 'application/x-director'],
          ['dis', 'application/vnd.mobius.dis'],
          ['djvu', 'image/vnd.djvu'],
          ['dl', ['video/dl', 'video/x-dl']],
          ['dll', 'application/x-msdownload'],
          ['dms', 'application/octet-stream'],
          ['dna', 'application/vnd.dna'],
          ['doc', 'application/msword'],
          ['docm', 'application/vnd.ms-word.document.macroenabled.12'],
          [
            'docx',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
          ['dot', 'application/msword'],
          ['dotm', 'application/vnd.ms-word.template.macroenabled.12'],
          [
            'dotx',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
          ],
          ['dp', ['application/commonground', 'application/vnd.osgi.dp']],
          ['dpg', 'application/vnd.dpgraph'],
          ['dra', 'audio/vnd.dra'],
          ['drw', 'application/drafting'],
          ['dsc', 'text/prs.lines.tag'],
          ['dssc', 'application/dssc+der'],
          ['dtb', 'application/x-dtbook+xml'],
          ['dtd', 'application/xml-dtd'],
          ['dts', 'audio/vnd.dts'],
          ['dtshd', 'audio/vnd.dts.hd'],
          ['dump', 'application/octet-stream'],
          ['dv', 'video/x-dv'],
          ['dvi', 'application/x-dvi'],
          ['dwf', ['model/vnd.dwf', 'drawing/x-dwf']],
          ['dwg', ['application/acad', 'image/vnd.dwg', 'image/x-dwg']],
          [
            'dxf',
            [
              'application/dxf',
              'image/vnd.dwg',
              'image/vnd.dxf',
              'image/x-dwg',
            ],
          ],
          ['dxp', 'application/vnd.spotfire.dxp'],
          ['dxr', 'application/x-director'],
          ['ecelp4800', 'audio/vnd.nuera.ecelp4800'],
          ['ecelp7470', 'audio/vnd.nuera.ecelp7470'],
          ['ecelp9600', 'audio/vnd.nuera.ecelp9600'],
          ['edm', 'application/vnd.novadigm.edm'],
          ['edx', 'application/vnd.novadigm.edx'],
          ['efif', 'application/vnd.picsel'],
          ['ei6', 'application/vnd.pg.osasli'],
          ['el', 'text/x-script.elisp'],
          ['elc', ['application/x-elc', 'application/x-bytecode.elisp']],
          ['eml', 'message/rfc822'],
          ['emma', 'application/emma+xml'],
          ['env', 'application/x-envoy'],
          ['eol', 'audio/vnd.digital-winds'],
          ['eot', 'application/vnd.ms-fontobject'],
          ['eps', 'application/postscript'],
          ['epub', 'application/epub+zip'],
          ['es', ['application/ecmascript', 'application/x-esrehber']],
          ['es3', 'application/vnd.eszigno3+xml'],
          ['esf', 'application/vnd.epson.esf'],
          ['etx', 'text/x-setext'],
          ['evy', ['application/envoy', 'application/x-envoy']],
          ['exe', ['application/octet-stream', 'application/x-msdownload']],
          ['exi', 'application/exi'],
          ['ext', 'application/vnd.novadigm.ext'],
          ['ez2', 'application/vnd.ezpix-album'],
          ['ez3', 'application/vnd.ezpix-package'],
          ['f', ['text/plain', 'text/x-fortran']],
          ['f4v', 'video/x-f4v'],
          ['f77', 'text/x-fortran'],
          ['f90', ['text/plain', 'text/x-fortran']],
          ['fbs', 'image/vnd.fastbidsheet'],
          ['fcs', 'application/vnd.isac.fcs'],
          ['fdf', 'application/vnd.fdf'],
          ['fe_launch', 'application/vnd.denovo.fcselayout-link'],
          ['fg5', 'application/vnd.fujitsu.oasysgp'],
          ['fh', 'image/x-freehand'],
          ['fif', ['application/fractals', 'image/fif']],
          ['fig', 'application/x-xfig'],
          ['fli', ['video/fli', 'video/x-fli']],
          ['flo', ['image/florian', 'application/vnd.micrografx.flo']],
          ['flr', 'x-world/x-vrml'],
          ['flv', 'video/x-flv'],
          ['flw', 'application/vnd.kde.kivio'],
          ['flx', 'text/vnd.fmi.flexstor'],
          ['fly', 'text/vnd.fly'],
          ['fm', 'application/vnd.framemaker'],
          ['fmf', 'video/x-atomic3d-feature'],
          ['fnc', 'application/vnd.frogans.fnc'],
          ['for', ['text/plain', 'text/x-fortran']],
          ['fpx', ['image/vnd.fpx', 'image/vnd.net-fpx']],
          ['frl', 'application/freeloader'],
          ['fsc', 'application/vnd.fsc.weblaunch'],
          ['fst', 'image/vnd.fst'],
          ['ftc', 'application/vnd.fluxtime.clip'],
          ['fti', 'application/vnd.anser-web-funds-transfer-initiation'],
          ['funk', 'audio/make'],
          ['fvt', 'video/vnd.fvt'],
          ['fxp', 'application/vnd.adobe.fxp'],
          ['fzs', 'application/vnd.fuzzysheet'],
          ['g', 'text/plain'],
          ['g2w', 'application/vnd.geoplan'],
          ['g3', 'image/g3fax'],
          ['g3w', 'application/vnd.geospace'],
          ['gac', 'application/vnd.groove-account'],
          ['gdl', 'model/vnd.gdl'],
          ['geo', 'application/vnd.dynageo'],
          ['gex', 'application/vnd.geometry-explorer'],
          ['ggb', 'application/vnd.geogebra.file'],
          ['ggt', 'application/vnd.geogebra.tool'],
          ['ghf', 'application/vnd.groove-help'],
          ['gif', 'image/gif'],
          ['gim', 'application/vnd.groove-identity-message'],
          ['gl', ['video/gl', 'video/x-gl']],
          ['gmx', 'application/vnd.gmx'],
          ['gnumeric', 'application/x-gnumeric'],
          ['gph', 'application/vnd.flographit'],
          ['gqf', 'application/vnd.grafeq'],
          ['gram', 'application/srgs'],
          ['grv', 'application/vnd.groove-injector'],
          ['grxml', 'application/srgs+xml'],
          ['gsd', 'audio/x-gsm'],
          ['gsf', 'application/x-font-ghostscript'],
          ['gsm', 'audio/x-gsm'],
          ['gsp', 'application/x-gsp'],
          ['gss', 'application/x-gss'],
          ['gtar', 'application/x-gtar'],
          ['gtm', 'application/vnd.groove-tool-message'],
          ['gtw', 'model/vnd.gtw'],
          ['gv', 'text/vnd.graphviz'],
          ['gxt', 'application/vnd.geonext'],
          ['gz', ['application/x-gzip', 'application/x-compressed']],
          ['gzip', ['multipart/x-gzip', 'application/x-gzip']],
          ['h', ['text/plain', 'text/x-h']],
          ['h261', 'video/h261'],
          ['h263', 'video/h263'],
          ['h264', 'video/h264'],
          ['hal', 'application/vnd.hal+xml'],
          ['hbci', 'application/vnd.hbci'],
          ['hdf', 'application/x-hdf'],
          ['help', 'application/x-helpfile'],
          ['hgl', 'application/vnd.hp-hpgl'],
          ['hh', ['text/plain', 'text/x-h']],
          ['hlb', 'text/x-script'],
          [
            'hlp',
            [
              'application/winhlp',
              'application/hlp',
              'application/x-helpfile',
              'application/x-winhelp',
            ],
          ],
          ['hpg', 'application/vnd.hp-hpgl'],
          ['hpgl', 'application/vnd.hp-hpgl'],
          ['hpid', 'application/vnd.hp-hpid'],
          ['hps', 'application/vnd.hp-hps'],
          [
            'hqx',
            [
              'application/mac-binhex40',
              'application/binhex',
              'application/binhex4',
              'application/mac-binhex',
              'application/x-binhex40',
              'application/x-mac-binhex40',
            ],
          ],
          ['hta', 'application/hta'],
          ['htc', 'text/x-component'],
          ['htke', 'application/vnd.kenameaapp'],
          ['htm', 'text/html'],
          ['html', 'text/html'],
          ['htmls', 'text/html'],
          ['htt', 'text/webviewhtml'],
          ['htx', 'text/html'],
          ['hvd', 'application/vnd.yamaha.hv-dic'],
          ['hvp', 'application/vnd.yamaha.hv-voice'],
          ['hvs', 'application/vnd.yamaha.hv-script'],
          ['i2g', 'application/vnd.intergeo'],
          ['icc', 'application/vnd.iccprofile'],
          ['ice', 'x-conference/x-cooltalk'],
          ['ico', 'image/x-icon'],
          ['ics', 'text/calendar'],
          ['idc', 'text/plain'],
          ['ief', 'image/ief'],
          ['iefs', 'image/ief'],
          ['ifm', 'application/vnd.shana.informed.formdata'],
          ['iges', ['application/iges', 'model/iges']],
          ['igl', 'application/vnd.igloader'],
          ['igm', 'application/vnd.insors.igm'],
          ['igs', ['application/iges', 'model/iges']],
          ['igx', 'application/vnd.micrografx.igx'],
          ['iif', 'application/vnd.shana.informed.interchange'],
          ['iii', 'application/x-iphone'],
          ['ima', 'application/x-ima'],
          ['imap', 'application/x-httpd-imap'],
          ['imp', 'application/vnd.accpac.simply.imp'],
          ['ims', 'application/vnd.ms-ims'],
          ['inf', 'application/inf'],
          [
            'ins',
            ['application/x-internet-signup', 'application/x-internett-signup'],
          ],
          ['ip', 'application/x-ip2'],
          ['ipfix', 'application/ipfix'],
          ['ipk', 'application/vnd.shana.informed.package'],
          ['irm', 'application/vnd.ibm.rights-management'],
          ['irp', 'application/vnd.irepository.package+xml'],
          ['isp', 'application/x-internet-signup'],
          ['isu', 'video/x-isvideo'],
          ['it', 'audio/it'],
          ['itp', 'application/vnd.shana.informed.formtemplate'],
          ['iv', 'application/x-inventor'],
          ['ivp', 'application/vnd.immervision-ivp'],
          ['ivr', 'i-world/i-vrml'],
          ['ivu', 'application/vnd.immervision-ivu'],
          ['ivy', 'application/x-livescreen'],
          ['jad', 'text/vnd.sun.j2me.app-descriptor'],
          ['jam', ['application/vnd.jam', 'audio/x-jam']],
          ['jar', 'application/java-archive'],
          ['jav', ['text/plain', 'text/x-java-source']],
          [
            'java',
            ['text/plain', 'text/x-java-source,java', 'text/x-java-source'],
          ],
          ['jcm', 'application/x-java-commerce'],
          ['jfif', ['image/pipeg', 'image/jpeg', 'image/pjpeg']],
          ['jfif-tbnl', 'image/jpeg'],
          ['jisp', 'application/vnd.jisp'],
          ['jlt', 'application/vnd.hp-jlyt'],
          ['jnlp', 'application/x-java-jnlp-file'],
          ['joda', 'application/vnd.joost.joda-archive'],
          ['jpe', ['image/jpeg', 'image/pjpeg']],
          ['jpeg', ['image/jpeg', 'image/pjpeg']],
          ['jpg', ['image/jpeg', 'image/pjpeg']],
          ['jpgv', 'video/jpeg'],
          ['jpm', 'video/jpm'],
          ['jps', 'image/x-jps'],
          [
            'js',
            [
              'application/javascript',
              'application/ecmascript',
              'text/javascript',
              'text/ecmascript',
              'application/x-javascript',
            ],
          ],
          ['json', 'application/json'],
          ['jut', 'image/jutvision'],
          ['kar', ['audio/midi', 'music/x-karaoke']],
          ['karbon', 'application/vnd.kde.karbon'],
          ['kfo', 'application/vnd.kde.kformula'],
          ['kia', 'application/vnd.kidspiration'],
          ['kml', 'application/vnd.google-earth.kml+xml'],
          ['kmz', 'application/vnd.google-earth.kmz'],
          ['kne', 'application/vnd.kinar'],
          ['kon', 'application/vnd.kde.kontour'],
          ['kpr', 'application/vnd.kde.kpresenter'],
          ['ksh', ['application/x-ksh', 'text/x-script.ksh']],
          ['ksp', 'application/vnd.kde.kspread'],
          ['ktx', 'image/ktx'],
          ['ktz', 'application/vnd.kahootz'],
          ['kwd', 'application/vnd.kde.kword'],
          ['la', ['audio/nspaudio', 'audio/x-nspaudio']],
          ['lam', 'audio/x-liveaudio'],
          ['lasxml', 'application/vnd.las.las+xml'],
          ['latex', 'application/x-latex'],
          ['lbd', 'application/vnd.llamagraphics.life-balance.desktop'],
          ['lbe', 'application/vnd.llamagraphics.life-balance.exchange+xml'],
          ['les', 'application/vnd.hhe.lesson-player'],
          [
            'lha',
            [
              'application/octet-stream',
              'application/lha',
              'application/x-lha',
            ],
          ],
          ['lhx', 'application/octet-stream'],
          ['link66', 'application/vnd.route66.link66+xml'],
          ['list', 'text/plain'],
          ['lma', ['audio/nspaudio', 'audio/x-nspaudio']],
          ['log', 'text/plain'],
          ['lrm', 'application/vnd.ms-lrm'],
          ['lsf', 'video/x-la-asf'],
          ['lsp', ['application/x-lisp', 'text/x-script.lisp']],
          ['lst', 'text/plain'],
          ['lsx', ['video/x-la-asf', 'text/x-la-asf']],
          ['ltf', 'application/vnd.frogans.ltf'],
          ['ltx', 'application/x-latex'],
          ['lvp', 'audio/vnd.lucent.voice'],
          ['lwp', 'application/vnd.lotus-wordpro'],
          ['lzh', ['application/octet-stream', 'application/x-lzh']],
          [
            'lzx',
            [
              'application/lzx',
              'application/octet-stream',
              'application/x-lzx',
            ],
          ],
          ['m', ['text/plain', 'text/x-m']],
          ['m13', 'application/x-msmediaview'],
          ['m14', 'application/x-msmediaview'],
          ['m1v', 'video/mpeg'],
          ['m21', 'application/mp21'],
          ['m2a', 'audio/mpeg'],
          ['m2v', 'video/mpeg'],
          ['m3u', ['audio/x-mpegurl', 'audio/x-mpequrl']],
          ['m3u8', 'application/vnd.apple.mpegurl'],
          ['m4v', 'video/x-m4v'],
          ['ma', 'application/mathematica'],
          ['mads', 'application/mads+xml'],
          ['mag', 'application/vnd.ecowin.chart'],
          ['man', 'application/x-troff-man'],
          ['map', 'application/x-navimap'],
          ['mar', 'text/plain'],
          ['mathml', 'application/mathml+xml'],
          ['mbd', 'application/mbedlet'],
          ['mbk', 'application/vnd.mobius.mbk'],
          ['mbox', 'application/mbox'],
          ['mc$', 'application/x-magic-cap-package-1.0'],
          ['mc1', 'application/vnd.medcalcdata'],
          [
            'mcd',
            [
              'application/mcad',
              'application/vnd.mcd',
              'application/x-mathcad',
            ],
          ],
          ['mcf', ['image/vasa', 'text/mcf']],
          ['mcp', 'application/netmc'],
          ['mcurl', 'text/vnd.curl.mcurl'],
          ['mdb', 'application/x-msaccess'],
          ['mdi', 'image/vnd.ms-modi'],
          ['me', 'application/x-troff-me'],
          ['meta4', 'application/metalink4+xml'],
          ['mets', 'application/mets+xml'],
          ['mfm', 'application/vnd.mfmp'],
          ['mgp', 'application/vnd.osgeo.mapguide.package'],
          ['mgz', 'application/vnd.proteus.magazine'],
          ['mht', 'message/rfc822'],
          ['mhtml', 'message/rfc822'],
          [
            'mid',
            [
              'audio/mid',
              'audio/midi',
              'music/crescendo',
              'x-music/x-midi',
              'audio/x-midi',
              'application/x-midi',
              'audio/x-mid',
            ],
          ],
          [
            'midi',
            [
              'audio/midi',
              'music/crescendo',
              'x-music/x-midi',
              'audio/x-midi',
              'application/x-midi',
              'audio/x-mid',
            ],
          ],
          [
            'mif',
            ['application/vnd.mif', 'application/x-mif', 'application/x-frame'],
          ],
          ['mime', ['message/rfc822', 'www/mime']],
          ['mj2', 'video/mj2'],
          ['mjf', 'audio/x-vnd.audioexplosion.mjuicemediafile'],
          ['mjpg', 'video/x-motion-jpeg'],
          ['mlp', 'application/vnd.dolby.mlp'],
          ['mm', ['application/base64', 'application/x-meme']],
          ['mmd', 'application/vnd.chipnuts.karaoke-mmd'],
          ['mme', 'application/base64'],
          ['mmf', 'application/vnd.smaf'],
          ['mmr', 'image/vnd.fujixerox.edmics-mmr'],
          ['mny', 'application/x-msmoney'],
          ['mod', ['audio/mod', 'audio/x-mod']],
          ['mods', 'application/mods+xml'],
          ['moov', 'video/quicktime'],
          ['mov', 'video/quicktime'],
          ['movie', 'video/x-sgi-movie'],
          [
            'mp2',
            [
              'video/mpeg',
              'audio/mpeg',
              'video/x-mpeg',
              'audio/x-mpeg',
              'video/x-mpeq2a',
            ],
          ],
          [
            'mp3',
            [
              'audio/mpeg',
              'audio/mpeg3',
              'video/mpeg',
              'audio/x-mpeg-3',
              'video/x-mpeg',
            ],
          ],
          ['mp4', ['video/mp4', 'application/mp4']],
          ['mp4a', 'audio/mp4'],
          ['mpa', ['video/mpeg', 'audio/mpeg']],
          [
            'mpc',
            ['application/vnd.mophun.certificate', 'application/x-project'],
          ],
          ['mpe', 'video/mpeg'],
          ['mpeg', 'video/mpeg'],
          ['mpg', ['video/mpeg', 'audio/mpeg']],
          ['mpga', 'audio/mpeg'],
          ['mpkg', 'application/vnd.apple.installer+xml'],
          ['mpm', 'application/vnd.blueice.multipass'],
          ['mpn', 'application/vnd.mophun.application'],
          ['mpp', 'application/vnd.ms-project'],
          ['mpt', 'application/x-project'],
          ['mpv', 'application/x-project'],
          ['mpv2', 'video/mpeg'],
          ['mpx', 'application/x-project'],
          ['mpy', 'application/vnd.ibm.minipay'],
          ['mqy', 'application/vnd.mobius.mqy'],
          ['mrc', 'application/marc'],
          ['mrcx', 'application/marcxml+xml'],
          ['ms', 'application/x-troff-ms'],
          ['mscml', 'application/mediaservercontrol+xml'],
          ['mseq', 'application/vnd.mseq'],
          ['msf', 'application/vnd.epson.msf'],
          ['msg', 'application/vnd.ms-outlook'],
          ['msh', 'model/mesh'],
          ['msl', 'application/vnd.mobius.msl'],
          ['msty', 'application/vnd.muvee.style'],
          ['mts', 'model/vnd.mts'],
          ['mus', 'application/vnd.musician'],
          ['musicxml', 'application/vnd.recordare.musicxml+xml'],
          ['mv', 'video/x-sgi-movie'],
          ['mvb', 'application/x-msmediaview'],
          ['mwf', 'application/vnd.mfer'],
          ['mxf', 'application/mxf'],
          ['mxl', 'application/vnd.recordare.musicxml'],
          ['mxml', 'application/xv+xml'],
          ['mxs', 'application/vnd.triscape.mxs'],
          ['mxu', 'video/vnd.mpegurl'],
          ['my', 'audio/make'],
          ['mzz', 'application/x-vnd.audioexplosion.mzz'],
          ['n-gage', 'application/vnd.nokia.n-gage.symbian.install'],
          ['n3', 'text/n3'],
          ['nap', 'image/naplps'],
          ['naplps', 'image/naplps'],
          ['nbp', 'application/vnd.wolfram.player'],
          ['nc', 'application/x-netcdf'],
          ['ncm', 'application/vnd.nokia.configuration-message'],
          ['ncx', 'application/x-dtbncx+xml'],
          ['ngdat', 'application/vnd.nokia.n-gage.data'],
          ['nif', 'image/x-niff'],
          ['niff', 'image/x-niff'],
          ['nix', 'application/x-mix-transfer'],
          ['nlu', 'application/vnd.neurolanguage.nlu'],
          ['nml', 'application/vnd.enliven'],
          ['nnd', 'application/vnd.noblenet-directory'],
          ['nns', 'application/vnd.noblenet-sealer'],
          ['nnw', 'application/vnd.noblenet-web'],
          ['npx', 'image/vnd.net-fpx'],
          ['nsc', 'application/x-conference'],
          ['nsf', 'application/vnd.lotus-notes'],
          ['nvd', 'application/x-navidoc'],
          ['nws', 'message/rfc822'],
          ['o', 'application/octet-stream'],
          ['oa2', 'application/vnd.fujitsu.oasys2'],
          ['oa3', 'application/vnd.fujitsu.oasys3'],
          ['oas', 'application/vnd.fujitsu.oasys'],
          ['obd', 'application/x-msbinder'],
          ['oda', 'application/oda'],
          ['odb', 'application/vnd.oasis.opendocument.database'],
          ['odc', 'application/vnd.oasis.opendocument.chart'],
          ['odf', 'application/vnd.oasis.opendocument.formula'],
          ['odft', 'application/vnd.oasis.opendocument.formula-template'],
          ['odg', 'application/vnd.oasis.opendocument.graphics'],
          ['odi', 'application/vnd.oasis.opendocument.image'],
          ['odm', 'application/vnd.oasis.opendocument.text-master'],
          ['odp', 'application/vnd.oasis.opendocument.presentation'],
          ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
          ['odt', 'application/vnd.oasis.opendocument.text'],
          ['oga', 'audio/ogg'],
          ['ogv', 'video/ogg'],
          ['ogx', 'application/ogg'],
          ['omc', 'application/x-omc'],
          ['omcd', 'application/x-omcdatamaker'],
          ['omcr', 'application/x-omcregerator'],
          ['onetoc', 'application/onenote'],
          ['opf', 'application/oebps-package+xml'],
          ['org', 'application/vnd.lotus-organizer'],
          ['osf', 'application/vnd.yamaha.openscoreformat'],
          ['osfpvg', 'application/vnd.yamaha.openscoreformat.osfpvg+xml'],
          ['otc', 'application/vnd.oasis.opendocument.chart-template'],
          ['otf', 'application/x-font-otf'],
          ['otg', 'application/vnd.oasis.opendocument.graphics-template'],
          ['oth', 'application/vnd.oasis.opendocument.text-web'],
          ['oti', 'application/vnd.oasis.opendocument.image-template'],
          ['otp', 'application/vnd.oasis.opendocument.presentation-template'],
          ['ots', 'application/vnd.oasis.opendocument.spreadsheet-template'],
          ['ott', 'application/vnd.oasis.opendocument.text-template'],
          ['oxt', 'application/vnd.openofficeorg.extension'],
          ['p', 'text/x-pascal'],
          ['p10', ['application/pkcs10', 'application/x-pkcs10']],
          ['p12', ['application/pkcs-12', 'application/x-pkcs12']],
          ['p7a', 'application/x-pkcs7-signature'],
          ['p7b', 'application/x-pkcs7-certificates'],
          ['p7c', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
          ['p7m', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
          ['p7r', 'application/x-pkcs7-certreqresp'],
          [
            'p7s',
            ['application/pkcs7-signature', 'application/x-pkcs7-signature'],
          ],
          ['p8', 'application/pkcs8'],
          ['par', 'text/plain-bas'],
          ['part', 'application/pro_eng'],
          ['pas', 'text/pascal'],
          ['paw', 'application/vnd.pawaafile'],
          ['pbd', 'application/vnd.powerbuilder6'],
          ['pbm', 'image/x-portable-bitmap'],
          ['pcf', 'application/x-font-pcf'],
          ['pcl', ['application/vnd.hp-pcl', 'application/x-pcl']],
          ['pclxl', 'application/vnd.hp-pclxl'],
          ['pct', 'image/x-pict'],
          ['pcurl', 'application/vnd.curl.pcurl'],
          ['pcx', 'image/x-pcx'],
          ['pdb', ['application/vnd.palm', 'chemical/x-pdb']],
          ['pdf', 'application/pdf'],
          ['pfa', 'application/x-font-type1'],
          ['pfr', 'application/font-tdpfr'],
          ['pfunk', ['audio/make', 'audio/make.my.funk']],
          ['pfx', 'application/x-pkcs12'],
          ['pgm', ['image/x-portable-graymap', 'image/x-portable-greymap']],
          ['pgn', 'application/x-chess-pgn'],
          ['pgp', 'application/pgp-signature'],
          ['pic', ['image/pict', 'image/x-pict']],
          ['pict', 'image/pict'],
          ['pkg', 'application/x-newton-compatible-pkg'],
          ['pki', 'application/pkixcmp'],
          ['pkipath', 'application/pkix-pkipath'],
          ['pko', ['application/ynd.ms-pkipko', 'application/vnd.ms-pki.pko']],
          ['pl', ['text/plain', 'text/x-script.perl']],
          ['plb', 'application/vnd.3gpp.pic-bw-large'],
          ['plc', 'application/vnd.mobius.plc'],
          ['plf', 'application/vnd.pocketlearn'],
          ['pls', 'application/pls+xml'],
          ['plx', 'application/x-pixclscript'],
          ['pm', ['text/x-script.perl-module', 'image/x-xpixmap']],
          ['pm4', 'application/x-pagemaker'],
          ['pm5', 'application/x-pagemaker'],
          ['pma', 'application/x-perfmon'],
          ['pmc', 'application/x-perfmon'],
          ['pml', ['application/vnd.ctc-posml', 'application/x-perfmon']],
          ['pmr', 'application/x-perfmon'],
          ['pmw', 'application/x-perfmon'],
          ['png', 'image/png'],
          ['pnm', ['application/x-portable-anymap', 'image/x-portable-anymap']],
          ['portpkg', 'application/vnd.macports.portpkg'],
          [
            'pot',
            ['application/vnd.ms-powerpoint', 'application/mspowerpoint'],
          ],
          ['potm', 'application/vnd.ms-powerpoint.template.macroenabled.12'],
          [
            'potx',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
          ],
          ['pov', 'model/x-pov'],
          ['ppa', 'application/vnd.ms-powerpoint'],
          ['ppam', 'application/vnd.ms-powerpoint.addin.macroenabled.12'],
          ['ppd', 'application/vnd.cups-ppd'],
          ['ppm', 'image/x-portable-pixmap'],
          [
            'pps',
            ['application/vnd.ms-powerpoint', 'application/mspowerpoint'],
          ],
          ['ppsm', 'application/vnd.ms-powerpoint.slideshow.macroenabled.12'],
          [
            'ppsx',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
          ],
          [
            'ppt',
            [
              'application/vnd.ms-powerpoint',
              'application/mspowerpoint',
              'application/powerpoint',
              'application/x-mspowerpoint',
            ],
          ],
          [
            'pptm',
            'application/vnd.ms-powerpoint.presentation.macroenabled.12',
          ],
          [
            'pptx',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          ],
          ['ppz', 'application/mspowerpoint'],
          ['prc', 'application/x-mobipocket-ebook'],
          [
            'pre',
            ['application/vnd.lotus-freelance', 'application/x-freelance'],
          ],
          ['prf', 'application/pics-rules'],
          ['prt', 'application/pro_eng'],
          ['ps', 'application/postscript'],
          ['psb', 'application/vnd.3gpp.pic-bw-small'],
          ['psd', ['application/octet-stream', 'image/vnd.adobe.photoshop']],
          ['psf', 'application/x-font-linux-psf'],
          ['pskcxml', 'application/pskc+xml'],
          ['ptid', 'application/vnd.pvi.ptid1'],
          ['pub', 'application/x-mspublisher'],
          ['pvb', 'application/vnd.3gpp.pic-bw-var'],
          ['pvu', 'paleovu/x-pv'],
          ['pwn', 'application/vnd.3m.post-it-notes'],
          ['pwz', 'application/vnd.ms-powerpoint'],
          ['py', 'text/x-script.phyton'],
          ['pya', 'audio/vnd.ms-playready.media.pya'],
          ['pyc', 'applicaiton/x-bytecode.python'],
          ['pyv', 'video/vnd.ms-playready.media.pyv'],
          ['qam', 'application/vnd.epson.quickanime'],
          ['qbo', 'application/vnd.intu.qbo'],
          ['qcp', 'audio/vnd.qcelp'],
          ['qd3', 'x-world/x-3dmf'],
          ['qd3d', 'x-world/x-3dmf'],
          ['qfx', 'application/vnd.intu.qfx'],
          ['qif', 'image/x-quicktime'],
          ['qps', 'application/vnd.publishare-delta-tree'],
          ['qt', 'video/quicktime'],
          ['qtc', 'video/x-qtc'],
          ['qti', 'image/x-quicktime'],
          ['qtif', 'image/x-quicktime'],
          ['qxd', 'application/vnd.quark.quarkxpress'],
          [
            'ra',
            [
              'audio/x-realaudio',
              'audio/x-pn-realaudio',
              'audio/x-pn-realaudio-plugin',
            ],
          ],
          ['ram', 'audio/x-pn-realaudio'],
          ['rar', 'application/x-rar-compressed'],
          [
            'ras',
            [
              'image/cmu-raster',
              'application/x-cmu-raster',
              'image/x-cmu-raster',
            ],
          ],
          ['rast', 'image/cmu-raster'],
          ['rcprofile', 'application/vnd.ipunplugged.rcprofile'],
          ['rdf', 'application/rdf+xml'],
          ['rdz', 'application/vnd.data-vision.rdz'],
          ['rep', 'application/vnd.businessobjects'],
          ['res', 'application/x-dtbresource+xml'],
          ['rexx', 'text/x-script.rexx'],
          ['rf', 'image/vnd.rn-realflash'],
          ['rgb', 'image/x-rgb'],
          ['rif', 'application/reginfo+xml'],
          ['rip', 'audio/vnd.rip'],
          ['rl', 'application/resource-lists+xml'],
          ['rlc', 'image/vnd.fujixerox.edmics-rlc'],
          ['rld', 'application/resource-lists-diff+xml'],
          ['rm', ['application/vnd.rn-realmedia', 'audio/x-pn-realaudio']],
          ['rmi', 'audio/mid'],
          ['rmm', 'audio/x-pn-realaudio'],
          ['rmp', ['audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio']],
          ['rms', 'application/vnd.jcp.javame.midlet-rms'],
          ['rnc', 'application/relax-ng-compact-syntax'],
          [
            'rng',
            ['application/ringing-tones', 'application/vnd.nokia.ringing-tone'],
          ],
          ['rnx', 'application/vnd.rn-realplayer'],
          ['roff', 'application/x-troff'],
          ['rp', 'image/vnd.rn-realpix'],
          ['rp9', 'application/vnd.cloanto.rp9'],
          ['rpm', 'audio/x-pn-realaudio-plugin'],
          ['rpss', 'application/vnd.nokia.radio-presets'],
          ['rpst', 'application/vnd.nokia.radio-preset'],
          ['rq', 'application/sparql-query'],
          ['rs', 'application/rls-services+xml'],
          ['rsd', 'application/rsd+xml'],
          ['rt', ['text/richtext', 'text/vnd.rn-realtext']],
          ['rtf', ['application/rtf', 'text/richtext', 'application/x-rtf']],
          ['rtx', ['text/richtext', 'application/rtf']],
          ['rv', 'video/vnd.rn-realvideo'],
          ['s', 'text/x-asm'],
          ['s3m', 'audio/s3m'],
          ['saf', 'application/vnd.yamaha.smaf-audio'],
          ['saveme', 'application/octet-stream'],
          ['sbk', 'application/x-tbook'],
          ['sbml', 'application/sbml+xml'],
          ['sc', 'application/vnd.ibm.secure-container'],
          ['scd', 'application/x-msschedule'],
          [
            'scm',
            [
              'application/vnd.lotus-screencam',
              'video/x-scm',
              'text/x-script.guile',
              'application/x-lotusscreencam',
              'text/x-script.scheme',
            ],
          ],
          ['scq', 'application/scvp-cv-request'],
          ['scs', 'application/scvp-cv-response'],
          ['sct', 'text/scriptlet'],
          ['scurl', 'text/vnd.curl.scurl'],
          ['sda', 'application/vnd.stardivision.draw'],
          ['sdc', 'application/vnd.stardivision.calc'],
          ['sdd', 'application/vnd.stardivision.impress'],
          ['sdkm', 'application/vnd.solent.sdkm+xml'],
          ['sdml', 'text/plain'],
          ['sdp', ['application/sdp', 'application/x-sdp']],
          ['sdr', 'application/sounder'],
          ['sdw', 'application/vnd.stardivision.writer'],
          ['sea', ['application/sea', 'application/x-sea']],
          ['see', 'application/vnd.seemail'],
          ['seed', 'application/vnd.fdsn.seed'],
          ['sema', 'application/vnd.sema'],
          ['semd', 'application/vnd.semd'],
          ['semf', 'application/vnd.semf'],
          ['ser', 'application/java-serialized-object'],
          ['set', 'application/set'],
          ['setpay', 'application/set-payment-initiation'],
          ['setreg', 'application/set-registration-initiation'],
          ['sfd-hdstx', 'application/vnd.hydrostatix.sof-data'],
          ['sfs', 'application/vnd.spotfire.sfs'],
          ['sgl', 'application/vnd.stardivision.writer-global'],
          ['sgm', ['text/sgml', 'text/x-sgml']],
          ['sgml', ['text/sgml', 'text/x-sgml']],
          [
            'sh',
            [
              'application/x-shar',
              'application/x-bsh',
              'application/x-sh',
              'text/x-script.sh',
            ],
          ],
          ['shar', ['application/x-bsh', 'application/x-shar']],
          ['shf', 'application/shf+xml'],
          ['shtml', ['text/html', 'text/x-server-parsed-html']],
          ['sid', 'audio/x-psid'],
          ['sis', 'application/vnd.symbian.install'],
          ['sit', ['application/x-stuffit', 'application/x-sit']],
          ['sitx', 'application/x-stuffitx'],
          ['skd', 'application/x-koan'],
          ['skm', 'application/x-koan'],
          ['skp', ['application/vnd.koan', 'application/x-koan']],
          ['skt', 'application/x-koan'],
          ['sl', 'application/x-seelogo'],
          ['sldm', 'application/vnd.ms-powerpoint.slide.macroenabled.12'],
          [
            'sldx',
            'application/vnd.openxmlformats-officedocument.presentationml.slide',
          ],
          ['slt', 'application/vnd.epson.salt'],
          ['sm', 'application/vnd.stepmania.stepchart'],
          ['smf', 'application/vnd.stardivision.math'],
          ['smi', ['application/smil', 'application/smil+xml']],
          ['smil', 'application/smil'],
          ['snd', ['audio/basic', 'audio/x-adpcm']],
          ['snf', 'application/x-font-snf'],
          ['sol', 'application/solids'],
          ['spc', ['text/x-speech', 'application/x-pkcs7-certificates']],
          ['spf', 'application/vnd.yamaha.smaf-phrase'],
          ['spl', ['application/futuresplash', 'application/x-futuresplash']],
          ['spot', 'text/vnd.in3d.spot'],
          ['spp', 'application/scvp-vp-response'],
          ['spq', 'application/scvp-vp-request'],
          ['spr', 'application/x-sprite'],
          ['sprite', 'application/x-sprite'],
          ['src', 'application/x-wais-source'],
          ['sru', 'application/sru+xml'],
          ['srx', 'application/sparql-results+xml'],
          ['sse', 'application/vnd.kodak-descriptor'],
          ['ssf', 'application/vnd.epson.ssf'],
          ['ssi', 'text/x-server-parsed-html'],
          ['ssm', 'application/streamingmedia'],
          ['ssml', 'application/ssml+xml'],
          [
            'sst',
            [
              'application/vnd.ms-pkicertstore',
              'application/vnd.ms-pki.certstore',
            ],
          ],
          ['st', 'application/vnd.sailingtracker.track'],
          ['stc', 'application/vnd.sun.xml.calc.template'],
          ['std', 'application/vnd.sun.xml.draw.template'],
          ['step', 'application/step'],
          ['stf', 'application/vnd.wt.stf'],
          ['sti', 'application/vnd.sun.xml.impress.template'],
          ['stk', 'application/hyperstudio'],
          [
            'stl',
            [
              'application/vnd.ms-pkistl',
              'application/sla',
              'application/vnd.ms-pki.stl',
              'application/x-navistyle',
            ],
          ],
          ['stm', 'text/html'],
          ['stp', 'application/step'],
          ['str', 'application/vnd.pg.format'],
          ['stw', 'application/vnd.sun.xml.writer.template'],
          ['sub', 'image/vnd.dvb.subtitle'],
          ['sus', 'application/vnd.sus-calendar'],
          ['sv4cpio', 'application/x-sv4cpio'],
          ['sv4crc', 'application/x-sv4crc'],
          ['svc', 'application/vnd.dvb.service'],
          ['svd', 'application/vnd.svd'],
          ['svf', ['image/vnd.dwg', 'image/x-dwg']],
          ['svg', 'image/svg+xml'],
          ['svr', ['x-world/x-svr', 'application/x-world']],
          ['swf', 'application/x-shockwave-flash'],
          ['swi', 'application/vnd.aristanetworks.swi'],
          ['sxc', 'application/vnd.sun.xml.calc'],
          ['sxd', 'application/vnd.sun.xml.draw'],
          ['sxg', 'application/vnd.sun.xml.writer.global'],
          ['sxi', 'application/vnd.sun.xml.impress'],
          ['sxm', 'application/vnd.sun.xml.math'],
          ['sxw', 'application/vnd.sun.xml.writer'],
          ['t', ['text/troff', 'application/x-troff']],
          ['talk', 'text/x-speech'],
          ['tao', 'application/vnd.tao.intent-module-archive'],
          ['tar', 'application/x-tar'],
          ['tbk', ['application/toolbook', 'application/x-tbook']],
          ['tcap', 'application/vnd.3gpp2.tcap'],
          ['tcl', ['text/x-script.tcl', 'application/x-tcl']],
          ['tcsh', 'text/x-script.tcsh'],
          ['teacher', 'application/vnd.smart.teacher'],
          ['tei', 'application/tei+xml'],
          ['tex', 'application/x-tex'],
          ['texi', 'application/x-texinfo'],
          ['texinfo', 'application/x-texinfo'],
          ['text', ['application/plain', 'text/plain']],
          ['tfi', 'application/thraud+xml'],
          ['tfm', 'application/x-tex-tfm'],
          ['tgz', ['application/gnutar', 'application/x-compressed']],
          ['thmx', 'application/vnd.ms-officetheme'],
          ['tif', ['image/tiff', 'image/x-tiff']],
          ['tiff', ['image/tiff', 'image/x-tiff']],
          ['tmo', 'application/vnd.tmobile-livetv'],
          ['torrent', 'application/x-bittorrent'],
          ['tpl', 'application/vnd.groove-tool-template'],
          ['tpt', 'application/vnd.trid.tpt'],
          ['tr', 'application/x-troff'],
          ['tra', 'application/vnd.trueapp'],
          ['trm', 'application/x-msterminal'],
          ['tsd', 'application/timestamped-data'],
          ['tsi', 'audio/tsp-audio'],
          ['tsp', ['application/dsptype', 'audio/tsplayer']],
          ['tsv', 'text/tab-separated-values'],
          ['ttf', 'application/x-font-ttf'],
          ['ttl', 'text/turtle'],
          ['turbot', 'image/florian'],
          ['twd', 'application/vnd.simtech-mindmapper'],
          ['txd', 'application/vnd.genomatix.tuxedo'],
          ['txf', 'application/vnd.mobius.txf'],
          ['txt', 'text/plain'],
          ['ufd', 'application/vnd.ufdl'],
          ['uil', 'text/x-uil'],
          ['uls', 'text/iuls'],
          ['umj', 'application/vnd.umajin'],
          ['uni', 'text/uri-list'],
          ['unis', 'text/uri-list'],
          ['unityweb', 'application/vnd.unity'],
          ['unv', 'application/i-deas'],
          ['uoml', 'application/vnd.uoml+xml'],
          ['uri', 'text/uri-list'],
          ['uris', 'text/uri-list'],
          ['ustar', ['application/x-ustar', 'multipart/x-ustar']],
          ['utz', 'application/vnd.uiq.theme'],
          ['uu', ['application/octet-stream', 'text/x-uuencode']],
          ['uue', 'text/x-uuencode'],
          ['uva', 'audio/vnd.dece.audio'],
          ['uvh', 'video/vnd.dece.hd'],
          ['uvi', 'image/vnd.dece.graphic'],
          ['uvm', 'video/vnd.dece.mobile'],
          ['uvp', 'video/vnd.dece.pd'],
          ['uvs', 'video/vnd.dece.sd'],
          ['uvu', 'video/vnd.uvvu.mp4'],
          ['uvv', 'video/vnd.dece.video'],
          ['vcd', 'application/x-cdlink'],
          ['vcf', 'text/x-vcard'],
          ['vcg', 'application/vnd.groove-vcard'],
          ['vcs', 'text/x-vcalendar'],
          ['vcx', 'application/vnd.vcx'],
          ['vda', 'application/vda'],
          ['vdo', 'video/vdo'],
          ['vew', 'application/groupwise'],
          ['vis', 'application/vnd.visionary'],
          ['viv', ['video/vivo', 'video/vnd.vivo']],
          ['vivo', ['video/vivo', 'video/vnd.vivo']],
          ['vmd', 'application/vocaltec-media-desc'],
          ['vmf', 'application/vocaltec-media-file'],
          ['voc', ['audio/voc', 'audio/x-voc']],
          ['vos', 'video/vosaic'],
          ['vox', 'audio/voxware'],
          ['vqe', 'audio/x-twinvq-plugin'],
          ['vqf', 'audio/x-twinvq'],
          ['vql', 'audio/x-twinvq-plugin'],
          ['vrml', ['model/vrml', 'x-world/x-vrml', 'application/x-vrml']],
          ['vrt', 'x-world/x-vrt'],
          ['vsd', ['application/vnd.visio', 'application/x-visio']],
          ['vsf', 'application/vnd.vsf'],
          ['vst', 'application/x-visio'],
          ['vsw', 'application/x-visio'],
          ['vtu', 'model/vnd.vtu'],
          ['vxml', 'application/voicexml+xml'],
          ['w60', 'application/wordperfect6.0'],
          ['w61', 'application/wordperfect6.1'],
          ['w6w', 'application/msword'],
          ['wad', 'application/x-doom'],
          ['wav', ['audio/wav', 'audio/x-wav']],
          ['wax', 'audio/x-ms-wax'],
          ['wb1', 'application/x-qpro'],
          ['wbmp', 'image/vnd.wap.wbmp'],
          ['wbs', 'application/vnd.criticaltools.wbs+xml'],
          ['wbxml', 'application/vnd.wap.wbxml'],
          ['wcm', 'application/vnd.ms-works'],
          ['wdb', 'application/vnd.ms-works'],
          ['web', 'application/vnd.xara'],
          ['weba', 'audio/webm'],
          ['webm', 'video/webm'],
          ['webp', 'image/webp'],
          ['wg', 'application/vnd.pmi.widget'],
          ['wgt', 'application/widget'],
          ['wiz', 'application/msword'],
          ['wk1', 'application/x-123'],
          ['wks', 'application/vnd.ms-works'],
          ['wm', 'video/x-ms-wm'],
          ['wma', 'audio/x-ms-wma'],
          ['wmd', 'application/x-ms-wmd'],
          ['wmf', ['windows/metafile', 'application/x-msmetafile']],
          ['wml', 'text/vnd.wap.wml'],
          ['wmlc', 'application/vnd.wap.wmlc'],
          ['wmls', 'text/vnd.wap.wmlscript'],
          ['wmlsc', 'application/vnd.wap.wmlscriptc'],
          ['wmv', 'video/x-ms-wmv'],
          ['wmx', 'video/x-ms-wmx'],
          ['wmz', 'application/x-ms-wmz'],
          ['woff', 'application/x-font-woff'],
          ['word', 'application/msword'],
          ['wp', 'application/wordperfect'],
          ['wp5', ['application/wordperfect', 'application/wordperfect6.0']],
          ['wp6', 'application/wordperfect'],
          [
            'wpd',
            [
              'application/wordperfect',
              'application/vnd.wordperfect',
              'application/x-wpwin',
            ],
          ],
          ['wpl', 'application/vnd.ms-wpl'],
          ['wps', 'application/vnd.ms-works'],
          ['wq1', 'application/x-lotus'],
          ['wqd', 'application/vnd.wqd'],
          [
            'wri',
            [
              'application/mswrite',
              'application/x-wri',
              'application/x-mswrite',
            ],
          ],
          ['wrl', ['model/vrml', 'x-world/x-vrml', 'application/x-world']],
          ['wrz', ['model/vrml', 'x-world/x-vrml']],
          ['wsc', 'text/scriplet'],
          ['wsdl', 'application/wsdl+xml'],
          ['wspolicy', 'application/wspolicy+xml'],
          ['wsrc', 'application/x-wais-source'],
          ['wtb', 'application/vnd.webturbo'],
          ['wtk', 'application/x-wintalk'],
          ['wvx', 'video/x-ms-wvx'],
          ['x-png', 'image/png'],
          ['x3d', 'application/vnd.hzn-3d-crossword'],
          ['xaf', 'x-world/x-vrml'],
          ['xap', 'application/x-silverlight-app'],
          ['xar', 'application/vnd.xara'],
          ['xbap', 'application/x-ms-xbap'],
          ['xbd', 'application/vnd.fujixerox.docuworks.binder'],
          ['xbm', ['image/xbm', 'image/x-xbm', 'image/x-xbitmap']],
          ['xdf', 'application/xcap-diff+xml'],
          ['xdm', 'application/vnd.syncml.dm+xml'],
          ['xdp', 'application/vnd.adobe.xdp+xml'],
          ['xdr', 'video/x-amt-demorun'],
          ['xdssc', 'application/dssc+xml'],
          ['xdw', 'application/vnd.fujixerox.docuworks'],
          ['xenc', 'application/xenc+xml'],
          ['xer', 'application/patch-ops-error+xml'],
          ['xfdf', 'application/vnd.adobe.xfdf'],
          ['xfdl', 'application/vnd.xfdl'],
          ['xgz', 'xgl/drawing'],
          ['xhtml', 'application/xhtml+xml'],
          ['xif', 'image/vnd.xiff'],
          ['xl', 'application/excel'],
          [
            'xla',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-msexcel',
              'application/x-excel',
            ],
          ],
          ['xlam', 'application/vnd.ms-excel.addin.macroenabled.12'],
          [
            'xlb',
            [
              'application/excel',
              'application/vnd.ms-excel',
              'application/x-excel',
            ],
          ],
          [
            'xlc',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-excel',
            ],
          ],
          ['xld', ['application/excel', 'application/x-excel']],
          ['xlk', ['application/excel', 'application/x-excel']],
          [
            'xll',
            [
              'application/excel',
              'application/vnd.ms-excel',
              'application/x-excel',
            ],
          ],
          [
            'xlm',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-excel',
            ],
          ],
          [
            'xls',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-msexcel',
              'application/x-excel',
            ],
          ],
          ['xlsb', 'application/vnd.ms-excel.sheet.binary.macroenabled.12'],
          ['xlsm', 'application/vnd.ms-excel.sheet.macroenabled.12'],
          [
            'xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ],
          [
            'xlt',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-excel',
            ],
          ],
          ['xltm', 'application/vnd.ms-excel.template.macroenabled.12'],
          [
            'xltx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
          ],
          ['xlv', ['application/excel', 'application/x-excel']],
          [
            'xlw',
            [
              'application/vnd.ms-excel',
              'application/excel',
              'application/x-msexcel',
              'application/x-excel',
            ],
          ],
          ['xm', 'audio/xm'],
          [
            'xml',
            [
              'application/xml',
              'text/xml',
              'application/atom+xml',
              'application/rss+xml',
            ],
          ],
          ['xmz', 'xgl/movie'],
          ['xo', 'application/vnd.olpc-sugar'],
          ['xof', 'x-world/x-vrml'],
          ['xop', 'application/xop+xml'],
          ['xpi', 'application/x-xpinstall'],
          ['xpix', 'application/x-vnd.ls-xpix'],
          ['xpm', ['image/xpm', 'image/x-xpixmap']],
          ['xpr', 'application/vnd.is-xpr'],
          ['xps', 'application/vnd.ms-xpsdocument'],
          ['xpw', 'application/vnd.intercon.formnet'],
          ['xslt', 'application/xslt+xml'],
          ['xsm', 'application/vnd.syncml+xml'],
          ['xspf', 'application/xspf+xml'],
          ['xsr', 'video/x-amt-showrun'],
          ['xul', 'application/vnd.mozilla.xul+xml'],
          ['xwd', ['image/x-xwd', 'image/x-xwindowdump']],
          ['xyz', ['chemical/x-xyz', 'chemical/x-pdb']],
          ['yang', 'application/yang'],
          ['yin', 'application/yin+xml'],
          ['z', ['application/x-compressed', 'application/x-compress']],
          ['zaz', 'application/vnd.zzazz.deck+xml'],
          [
            'zip',
            [
              'application/zip',
              'multipart/x-zip',
              'application/x-zip-compressed',
              'application/x-compressed',
            ],
          ],
          ['zir', 'application/vnd.zul'],
          ['zmm', 'application/vnd.handheld-entertainment+xml'],
          ['zoo', 'application/octet-stream'],
          ['zsh', 'text/x-script.zsh'],
        ])
      t.exports = {
        detectMimeType(t) {
          if (!t) return 'application/octet-stream'
          let e = n.parse(t),
            i = (e.ext.substr(1) || e.name || '')
              .split('?')
              .shift()
              .trim()
              .toLowerCase(),
            a = 'application/octet-stream'
          return r.has(i) && (a = r.get(i)), Array.isArray(a) ? a[0] : a
        },
        detectExtension(t) {
          if (!t) return 'bin'
          let e = (t || '')
              .toLowerCase()
              .trim()
              .split('/'),
            i = e.shift().trim(),
            n = e.join('/').trim()
          if (a.has(i + '/' + n)) {
            let t = a.get(i + '/' + n)
            return Array.isArray(t) ? t[0] : t
          }
          switch (i) {
            case 'text':
              return 'txt'
            default:
              return 'bin'
          }
        },
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(11),
        a = i(33),
        r = i(21),
        o = i(71),
        s = i(1).PassThrough,
        l = i(3),
        c = i(34),
        p = i(73),
        u = i(72),
        d = i(170),
        h = i(29),
        m = i(171)
      class f {
        constructor(t, e) {
          ;(this.nodeCounter = 0),
            (e = e || {}),
            (this.baseBoundary =
              e.baseBoundary || n.randomBytes(8).toString('hex')),
            (this.boundaryPrefix = e.boundaryPrefix || '--_NmP'),
            (this.disableFileAccess = !!e.disableFileAccess),
            (this.disableUrlAccess = !!e.disableUrlAccess),
            (this.normalizeHeaderKey = e.normalizeHeaderKey),
            (this.date = new Date()),
            (this.rootNode = e.rootNode || this),
            (this.keepBcc = !!e.keepBcc),
            e.filename &&
              ((this.filename = e.filename),
              t || (t = c.detectMimeType(this.filename.split('.').pop()))),
            (this.textEncoding = (e.textEncoding || '')
              .toString()
              .trim()
              .charAt(0)
              .toUpperCase()),
            (this.parentNode = e.parentNode),
            (this.hostname = e.hostname),
            (this.childNodes = []),
            (this._nodeId = ++this.rootNode.nodeCounter),
            (this._headers = []),
            (this._isPlainText = !1),
            (this._hasLongLines = !1),
            (this._envelope = !1),
            (this._raw = !1),
            (this._transforms = []),
            (this._processFuncs = []),
            t && this.setHeader('Content-Type', t)
        }
        createChild(t, e) {
          e || 'object' != typeof t || ((e = t), (t = void 0))
          let i = new f(t, e)
          return this.appendChild(i), i
        }
        appendChild(t) {
          return (
            t.rootNode !== this.rootNode &&
              ((t.rootNode = this.rootNode),
              (t._nodeId = ++this.rootNode.nodeCounter)),
            (t.parentNode = this),
            this.childNodes.push(t),
            t
          )
        }
        replace(t) {
          return t === this
            ? this
            : (this.parentNode.childNodes.forEach((e, i) => {
                e === this &&
                  ((t.rootNode = this.rootNode),
                  (t.parentNode = this.parentNode),
                  (t._nodeId = this._nodeId),
                  (this.rootNode = this),
                  (this.parentNode = void 0),
                  (t.parentNode.childNodes[i] = t))
              }),
              t)
        }
        remove() {
          if (!this.parentNode) return this
          for (let t = this.parentNode.childNodes.length - 1; t >= 0; t--)
            if (this.parentNode.childNodes[t] === this)
              return (
                this.parentNode.childNodes.splice(t, 1),
                (this.parentNode = void 0),
                (this.rootNode = this),
                this
              )
        }
        setHeader(t, e) {
          let i,
            n = !1
          if (!e && t && 'object' == typeof t)
            return (
              t.key && 'value' in t
                ? this.setHeader(t.key, t.value)
                : Array.isArray(t)
                ? t.forEach(t => {
                    this.setHeader(t.key, t.value)
                  })
                : Object.keys(t).forEach(e => {
                    this.setHeader(e, t[e])
                  }),
              this
            )
          i = {key: (t = this._normalizeHeaderKey(t)), value: e}
          for (let e = 0, a = this._headers.length; e < a; e++)
            this._headers[e].key === t &&
              (n
                ? (this._headers.splice(e, 1), e--, a--)
                : ((this._headers[e] = i), (n = !0)))
          return n || this._headers.push(i), this
        }
        addHeader(t, e) {
          return !e && t && 'object' == typeof t
            ? (t.key && t.value
                ? this.addHeader(t.key, t.value)
                : Array.isArray(t)
                ? t.forEach(t => {
                    this.addHeader(t.key, t.value)
                  })
                : Object.keys(t).forEach(e => {
                    this.addHeader(e, t[e])
                  }),
              this)
            : Array.isArray(e)
            ? (e.forEach(e => {
                this.addHeader(t, e)
              }),
              this)
            : (this._headers.push({key: this._normalizeHeaderKey(t), value: e}),
              this)
        }
        getHeader(t) {
          t = this._normalizeHeaderKey(t)
          for (let e = 0, i = this._headers.length; e < i; e++)
            if (this._headers[e].key === t) return this._headers[e].value
        }
        setContent(t) {
          return (
            (this.content = t),
            'function' == typeof this.content.pipe
              ? ((this._contentErrorHandler = t => {
                  this.content.removeListener(
                    'error',
                    this._contentErrorHandler,
                  ),
                    (this.content = t)
                }),
                this.content.once('error', this._contentErrorHandler))
              : 'string' == typeof this.content &&
                ((this._isPlainText = c.isPlainText(this.content)),
                this._isPlainText &&
                  c.hasLongerLines(this.content, 76) &&
                  (this._hasLongLines = !0)),
            this
          )
        }
        build(t) {
          let e
          t ||
            (e = new Promise((e, i) => {
              t = l.callbackPromise(e, i)
            }))
          let i = this.createReadStream(),
            n = [],
            a = 0,
            r = !1
          return (
            i.on('readable', () => {
              let t
              for (; null !== (t = i.read()); ) n.push(t), (a += t.length)
            }),
            i.once('error', e => {
              if (!r) return (r = !0), t(e)
            }),
            i.once('end', e => {
              if (!r)
                return (
                  (r = !0),
                  e && e.length && (n.push(e), (a += e.length)),
                  t(null, Buffer.concat(n, a))
                )
            }),
            e
          )
        }
        getTransferEncoding() {
          let t = !1,
            e = (this.getHeader('Content-Type') || '')
              .toString()
              .toLowerCase()
              .trim()
          return (
            this.content &&
              (((t = (this.getHeader('Content-Transfer-Encoding') || '')
                .toString()
                .toLowerCase()
                .trim()) &&
                ['base64', 'quoted-printable'].includes(t)) ||
                (/^text\//i.test(e)
                  ? (t =
                      this._isPlainText && !this._hasLongLines
                        ? '7bit'
                        : 'string' == typeof this.content ||
                          this.content instanceof Buffer
                        ? 'Q' === this._getTextEncoding(this.content)
                          ? 'quoted-printable'
                          : 'base64'
                        : 'B' === this.transferEncoding
                        ? 'base64'
                        : 'quoted-printable')
                  : /^(multipart|message)\//i.test(e) || (t = t || 'base64'))),
            t
          )
        }
        buildHeaders() {
          let t = this.getTransferEncoding(),
            e = []
          return (
            t && this.setHeader('Content-Transfer-Encoding', t),
            this.filename &&
              !this.getHeader('Content-Disposition') &&
              this.setHeader('Content-Disposition', 'attachment'),
            this.rootNode === this &&
              (this.getHeader('Date') ||
                this.setHeader(
                  'Date',
                  this.date.toUTCString().replace(/GMT/, '+0000'),
                ),
              this.messageId(),
              this.getHeader('MIME-Version') ||
                this.setHeader('MIME-Version', '1.0')),
            this._headers.forEach(t => {
              let i,
                n,
                a = t.key,
                r = t.value,
                o = {}
              if (
                !r ||
                'object' != typeof r ||
                [
                  'From',
                  'Sender',
                  'To',
                  'Cc',
                  'Bcc',
                  'Reply-To',
                  'Date',
                  'References',
                ].includes(a) ||
                (Object.keys(r).forEach(t => {
                  'value' !== t && (o[t] = r[t])
                }),
                (r = (r.value || '').toString()).trim())
              )
                if (o.prepared)
                  o.foldLines
                    ? e.push(c.foldLines(a + ': ' + r))
                    : e.push(a + ': ' + r)
                else {
                  switch (t.key) {
                    case 'Content-Disposition':
                      ;(i = c.parseHeaderValue(r)),
                        this.filename && (i.params.filename = this.filename),
                        (r = c.buildHeaderValue(i))
                      break
                    case 'Content-Type':
                      ;(i = c.parseHeaderValue(r)),
                        this._handleContentType(i),
                        i.value.match(/^text\/plain\b/) &&
                          'string' == typeof this.content &&
                          /[\u0080-\uFFFF]/.test(this.content) &&
                          (i.params.charset = 'utf-8'),
                        (r = c.buildHeaderValue(i)),
                        this.filename &&
                          (((n = this._encodeWords(this.filename)) !==
                            this.filename ||
                            /[\s'"\\;:\/=(),<>@[\]?]|^-/.test(n)) &&
                            (n = '"' + n + '"'),
                          (r += '; name=' + n))
                      break
                    case 'Bcc':
                      if (!this.keepBcc) return
                  }
                  if (
                    ((r = this._encodeHeaderValue(a, r)) || '')
                      .toString()
                      .trim()
                  ) {
                    if ('function' == typeof this.normalizeHeaderKey) {
                      let t = this.normalizeHeaderKey(a, r)
                      t && 'string' == typeof t && t.length && (a = t)
                    }
                    e.push(c.foldLines(a + ': ' + r, 76))
                  }
                }
            }),
            e.join('\r\n')
          )
        }
        createReadStream(t) {
          let e,
            i = new s((t = t || {})),
            n = i
          this.stream(i, t, t => {
            t ? n.emit('error', t) : i.end()
          })
          for (let t = 0, i = this._transforms.length; t < i; t++)
            (e =
              'function' == typeof this._transforms[t]
                ? this._transforms[t]()
                : this._transforms[t]),
              n.once('error', t => {
                e.emit('error', t)
              }),
              (n = n.pipe(e))
          ;(e = new m()),
            n.once('error', t => {
              e.emit('error', t)
            }),
            (n = n.pipe(e))
          for (let t = 0, i = this._processFuncs.length; t < i; t++)
            (e = this._processFuncs[t]), (n = e(n))
          return n
        }
        transform(t) {
          this._transforms.push(t)
        }
        processFunc(t) {
          this._processFuncs.push(t)
        }
        stream(t, e, i) {
          let n,
            a,
            r = this.getTransferEncoding(),
            o = !1,
            s = t => {
              o || ((o = !0), i(t))
            },
            l = () => {
              let i = 0,
                n = () => {
                  if (i >= this.childNodes.length)
                    return t.write('\r\n--' + this.boundary + '--\r\n'), s()
                  let a = this.childNodes[i++]
                  t.write(
                    (i > 1 ? '\r\n' : '') + '--' + this.boundary + '\r\n',
                  ),
                    a.stream(t, e, t => {
                      if (t) return s(t)
                      setImmediate(n)
                    })
                }
              if (!this.multipart) return s()
              setImmediate(n)
            },
            c = () => {
              if (!this.content) return setImmediate(l)
              {
                if (
                  '[object Error]' ===
                  Object.prototype.toString.call(this.content)
                )
                  return s(this.content)
                'function' == typeof this.content.pipe &&
                  (this.content.removeListener(
                    'error',
                    this._contentErrorHandler,
                  ),
                  (this._contentErrorHandler = t => s(t)),
                  this.content.once('error', this._contentErrorHandler))
                let i = () => {
                  ;['quoted-printable', 'base64'].includes(r)
                    ? ((n = new ('base64' === r ? u : p).Encoder(e)).pipe(
                        t,
                        {end: !1},
                      ),
                      n.once('end', l),
                      n.once('error', t => s(t)),
                      (a = this._getStream(this.content)).pipe(n))
                    : ((a = this._getStream(this.content)).pipe(
                        t,
                        {end: !1},
                      ),
                      a.once('end', l)),
                    a.once('error', t => s(t))
                }
                if (this.content._resolve) {
                  let t = [],
                    e = 0,
                    n = !1,
                    a = this._getStream(this.content)
                  a.on('error', t => {
                    n || ((n = !0), s(t))
                  }),
                    a.on('readable', () => {
                      let i
                      for (; null !== (i = a.read()); )
                        t.push(i), (e += i.length)
                    }),
                    a.on('end', () => {
                      n ||
                        ((n = !0),
                        (this.content._resolve = !1),
                        (this.content._resolvedValue = Buffer.concat(t, e)),
                        setImmediate(i))
                    })
                } else setImmediate(i)
              }
            }
          this._raw
            ? setImmediate(() => {
                if (
                  '[object Error]' === Object.prototype.toString.call(this._raw)
                )
                  return s(this._raw)
                'function' == typeof this._raw.pipe &&
                  this._raw.removeListener('error', this._contentErrorHandler)
                let e = this._getStream(this._raw)
                e.pipe(
                  t,
                  {end: !1},
                ),
                  e.on('error', e => t.emit('error', e)),
                  e.on('end', l)
              })
            : (t.write(this.buildHeaders() + '\r\n\r\n'), setImmediate(c))
        }
        setEnvelope(t) {
          let e
          ;(this._envelope = {from: !1, to: []}),
            t.from &&
              ((e = []),
              this._convertAddresses(this._parseAddresses(t.from), e),
              (e = e.filter(t => t && t.address)).length &&
                e[0] &&
                (this._envelope.from = e[0].address)),
            ['to', 'cc', 'bcc'].forEach(e => {
              t[e] &&
                this._convertAddresses(
                  this._parseAddresses(t[e]),
                  this._envelope.to,
                )
            }),
            (this._envelope.to = this._envelope.to
              .map(t => t.address)
              .filter(t => t))
          let i = ['to', 'cc', 'bcc', 'from']
          return (
            Object.keys(t).forEach(e => {
              i.includes(e) || (this._envelope[e] = t[e])
            }),
            this
          )
        }
        getAddresses() {
          let t = {}
          return (
            this._headers.forEach(e => {
              let i = e.key.toLowerCase()
              ;['from', 'sender', 'reply-to', 'to', 'cc', 'bcc'].includes(i) &&
                (Array.isArray(t[i]) || (t[i] = []),
                this._convertAddresses(this._parseAddresses(e.value), t[i]))
            }),
            t
          )
        }
        getEnvelope() {
          if (this._envelope) return this._envelope
          let t = {from: !1, to: []}
          return (
            this._headers.forEach(e => {
              let i = []
              'From' === e.key ||
              (!t.from && ['Reply-To', 'Sender'].includes(e.key))
                ? (this._convertAddresses(this._parseAddresses(e.value), i),
                  i.length && i[0] && (t.from = i[0].address))
                : ['To', 'Cc', 'Bcc'].includes(e.key) &&
                  this._convertAddresses(this._parseAddresses(e.value), t.to)
            }),
            (t.to = t.to.map(t => t.address)),
            t
          )
        }
        messageId() {
          let t = this.getHeader('Message-ID')
          return (
            t ||
              ((t = this._generateMessageId()),
              this.setHeader('Message-ID', t)),
            t
          )
        }
        setRaw(t) {
          return (
            (this._raw = t),
            this._raw &&
              'function' == typeof this._raw.pipe &&
              ((this._contentErrorHandler = t => {
                this._raw.removeListener('error', this._contentErrorHandler),
                  (this._raw = t)
              }),
              this._raw.once('error', this._contentErrorHandler)),
            this
          )
        }
        _getStream(t) {
          let e
          return t._resolvedValue
            ? ((e = new s()), setImmediate(() => e.end(t._resolvedValue)), e)
            : 'function' == typeof t.pipe
            ? t
            : t && 'string' == typeof t.path && !t.href
            ? this.disableFileAccess
              ? ((e = new s()),
                setImmediate(() =>
                  e.emit(
                    'error',
                    new Error('File access rejected for ' + t.path),
                  ),
                ),
                e)
              : r.createReadStream(t.path)
            : t && 'string' == typeof t.href
            ? this.disableUrlAccess
              ? ((e = new s()),
                setImmediate(() =>
                  e.emit(
                    'error',
                    new Error('Url access rejected for ' + t.href),
                  ),
                ),
                e)
              : h(t.href)
            : ((e = new s()), setImmediate(() => e.end(t || '')), e)
        }
        _parseAddresses(t) {
          return [].concat.apply(
            [],
            []
              .concat(t)
              .map(t =>
                t && t.address
                  ? ((t.address = this._normalizeAddress(t.address)),
                    (t.name = t.name || ''),
                    [t])
                  : d(t),
              ),
          )
        }
        _normalizeHeaderKey(t) {
          return (t = (t || '')
            .toString()
            .replace(/\r?\n|\r/g, ' ')
            .trim()
            .toLowerCase()
            .replace(
              /^X-SMTPAPI$|^(MIME|DKIM)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi,
              t => t.toUpperCase(),
            )
            .replace(/^Content-Features$/i, 'Content-features'))
        }
        _handleContentType(t) {
          ;(this.contentType = t.value.trim().toLowerCase()),
            (this.multipart = this.contentType
              .split('/')
              .reduce((t, e) => 'multipart' === t && e)),
            this.multipart
              ? (this.boundary = t.params.boundary =
                  t.params.boundary ||
                  this.boundary ||
                  this._generateBoundary())
              : (this.boundary = !1)
        }
        _generateBoundary() {
          return (
            this.rootNode.boundaryPrefix +
            '-' +
            this.rootNode.baseBoundary +
            '-Part_' +
            this._nodeId
          )
        }
        _encodeHeaderValue(t, e) {
          switch ((t = this._normalizeHeaderKey(t))) {
            case 'From':
            case 'Sender':
            case 'To':
            case 'Cc':
            case 'Bcc':
            case 'Reply-To':
              return this._convertAddresses(this._parseAddresses(e))
            case 'Message-ID':
            case 'In-Reply-To':
            case 'Content-Id':
              return (
                '<' !==
                  (e = (e || '').toString().replace(/\r?\n|\r/g, ' ')).charAt(
                    0,
                  ) && (e = '<' + e),
                '>' !== e.charAt(e.length - 1) && (e += '>'),
                e
              )
            case 'References':
              return (e = [].concat
                .apply(
                  [],
                  [].concat(e || '').map(t =>
                    (t = (t || '')
                      .toString()
                      .replace(/\r?\n|\r/g, ' ')
                      .trim())
                      .replace(/<[^>]*>/g, t => t.replace(/\s/g, ''))
                      .split(/\s+/),
                  ),
                )
                .map(
                  t => (
                    '<' !== t.charAt(0) && (t = '<' + t),
                    '>' !== t.charAt(t.length - 1) && (t += '>'),
                    t
                  ),
                ))
                .join(' ')
                .trim()
            case 'Date':
              return '[object Date]' === Object.prototype.toString.call(e)
                ? e.toUTCString().replace(/GMT/, '+0000')
                : ((e = (e || '').toString().replace(/\r?\n|\r/g, ' ')),
                  this._encodeWords(e))
            default:
              return (
                (e = (e || '').toString().replace(/\r?\n|\r/g, ' ')),
                this._encodeWords(e)
              )
          }
        }
        _convertAddresses(t, e) {
          let i = []
          return (
            (e = e || []),
            [].concat(t || []).forEach(t => {
              t.address
                ? ((t.address = this._normalizeAddress(t.address)),
                  t.name
                    ? t.name &&
                      i.push(
                        this._encodeAddressName(t.name) +
                          ' <' +
                          t.address +
                          '>',
                      )
                    : i.push(t.address),
                  t.address &&
                    (e.filter(e => e.address === t.address).length ||
                      e.push(t)))
                : t.group &&
                  i.push(
                    this._encodeAddressName(t.name) +
                      ':' +
                      (t.group.length
                        ? this._convertAddresses(t.group, e)
                        : ''
                      ).trim() +
                      ';',
                  )
            }),
            i.join(', ')
          )
        }
        _normalizeAddress(t) {
          let e = (t = (t || '').toString().trim()).lastIndexOf('@')
          if (e < 0) return t
          let i = t.substr(0, e),
            n = t.substr(e + 1)
          return i + '@' + o.toASCII(n.toLowerCase())
        }
        _encodeAddressName(t) {
          return /^[\w ']*$/.test(t)
            ? t
            : /^[\x20-\x7e]*$/.test(t)
            ? '"' + t.replace(/([\\"])/g, '\\$1') + '"'
            : c.encodeWord(t, this._getTextEncoding(t), 52)
        }
        _encodeWords(t) {
          return c.encodeWords(t, this._getTextEncoding(t), 52, !0)
        }
        _getTextEncoding(t) {
          t = (t || '').toString()
          let e,
            i,
            n = this.textEncoding
          return (
            n ||
              (n =
                (i = (
                  t.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []
                ).length) < (e = (t.match(/[a-z]/gi) || []).length)
                  ? 'Q'
                  : 'B'),
            n
          )
        }
        _generateMessageId() {
          return (
            '<' +
            [2, 2, 2, 6].reduce(
              (t, e) => t + '-' + n.randomBytes(e).toString('hex'),
              n.randomBytes(4).toString('hex'),
            ) +
            '@' +
            (
              this.getEnvelope().from ||
              this.hostname ||
              a.hostname() ||
              'localhost'
            )
              .split('@')
              .pop() +
            '>'
          )
        }
      }
      t.exports = f
    },
    function(t, e) {
      t.exports = require('punycode')
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      function a(t) {
        return (
          'string' == typeof t && (t = Buffer.from(t, 'utf-8')),
          t.toString('base64')
        )
      }
      function r(t, e) {
        if (((e = e || 76), (t = (t || '').toString()).length <= e)) return t
        let i = [],
          n = 0,
          a = 1024 * e
        for (; n < t.length; ) {
          let r = t
            .substr(n, a)
            .replace(new RegExp('.{' + e + '}', 'g'), '$&\r\n')
            .trim()
          i.push(r), (n += a)
        }
        return i.join('\r\n').trim()
      }
      t.exports = {
        encode: a,
        wrap: r,
        Encoder: class extends n {
          constructor(t) {
            super(),
              (this.options = t || {}),
              !1 !== this.options.lineLength &&
                (this.options.lineLength = this.options.lineLength || 76),
              (this._curLine = ''),
              (this._remainingBytes = !1),
              (this.inputBytes = 0),
              (this.outputBytes = 0)
          }
          _transform(t, e, i) {
            if (('buffer' !== e && (t = Buffer.from(t, e)), !t || !t.length))
              return setImmediate(i)
            ;(this.inputBytes += t.length),
              this._remainingBytes &&
                this._remainingBytes.length &&
                ((t = Buffer.concat(
                  [this._remainingBytes, t],
                  this._remainingBytes.length + t.length,
                )),
                (this._remainingBytes = !1)),
              t.length % 3
                ? ((this._remainingBytes = t.slice(t.length - (t.length % 3))),
                  (t = t.slice(0, t.length - (t.length % 3))))
                : (this._remainingBytes = !1)
            let n = this._curLine + a(t)
            if (this.options.lineLength) {
              let t = (n = r(n, this.options.lineLength)).lastIndexOf('\n')
              t < 0
                ? ((this._curLine = n), (n = ''))
                : t === n.length - 1
                ? (this._curLine = '')
                : ((this._curLine = n.substr(t + 1)), (n = n.substr(0, t + 1)))
            }
            n &&
              ((this.outputBytes += n.length),
              this.push(Buffer.from(n, 'ascii'))),
              setImmediate(i)
          }
          _flush(t) {
            this._remainingBytes &&
              this._remainingBytes.length &&
              (this._curLine += a(this._remainingBytes)),
              this._curLine &&
                ((this._curLine = r(this._curLine, this.options.lineLength)),
                (this.outputBytes += this._curLine.length),
                this.push(this._curLine, 'ascii'),
                (this._curLine = '')),
              t()
          }
        },
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      function a(t) {
        'string' == typeof t && (t = Buffer.from(t, 'utf-8'))
        let e,
          i = [[9], [10], [13], [32, 60], [62, 126]],
          n = ''
        for (let a = 0, r = t.length; a < r; a++)
          o((e = t[a]), i) &&
          ((32 !== e && 9 !== e) ||
            (a !== r - 1 && 10 !== t[a + 1] && 13 !== t[a + 1]))
            ? (n += String.fromCharCode(e))
            : (n += '=' + (e < 16 ? '0' : '') + e.toString(16).toUpperCase())
        return n
      }
      function r(t, e) {
        if (((e = e || 76), (t = (t || '').toString()).length <= e)) return t
        let i,
          n,
          a,
          r = 0,
          o = t.length,
          s = Math.floor(e / 3),
          l = ''
        for (; r < o; )
          if ((i = (a = t.substr(r, e)).match(/\r\n/)))
            (l += a = a.substr(0, i.index + i[0].length)), (r += a.length)
          else if ('\n' !== a.substr(-1))
            if ((i = a.substr(-s).match(/\n.*?$/)))
              (l += a = a.substr(0, a.length - (i[0].length - 1))),
                (r += a.length)
            else {
              if (
                a.length > e - s &&
                (i = a.substr(-s).match(/[ \t.,!?][^ \t.,!?]*$/))
              )
                a = a.substr(0, a.length - (i[0].length - 1))
              else if (a.match(/[=][\da-f]{0,2}$/i))
                for (
                  (i = a.match(/[=][\da-f]{0,1}$/i)) &&
                  (a = a.substr(0, a.length - i[0].length));
                  a.length > 3 &&
                  a.length < o - r &&
                  !a.match(/^(?:=[\da-f]{2}){1,4}$/i) &&
                  (i = a.match(/[=][\da-f]{2}$/gi)) &&
                  !((n = parseInt(i[0].substr(1, 2), 16)) < 128) &&
                  ((a = a.substr(0, a.length - 3)), !(n >= 192));

                );
              r + a.length < o && '\n' !== a.substr(-1)
                ? (a.length === e && a.match(/[=][\da-f]{2}$/i)
                    ? (a = a.substr(0, a.length - 3))
                    : a.length === e && (a = a.substr(0, a.length - 1)),
                  (r += a.length),
                  (a += '=\r\n'))
                : (r += a.length),
                (l += a)
            }
          else (l += a), (r += a.length)
        return l
      }
      function o(t, e) {
        for (let i = e.length - 1; i >= 0; i--)
          if (e[i].length) {
            if (1 === e[i].length && t === e[i][0]) return !0
            if (2 === e[i].length && t >= e[i][0] && t <= e[i][1]) return !0
          }
        return !1
      }
      t.exports = {
        encode: a,
        wrap: r,
        Encoder: class extends n {
          constructor(t) {
            super(),
              (this.options = t || {}),
              !1 !== this.options.lineLength &&
                (this.options.lineLength = this.options.lineLength || 76),
              (this._curLine = ''),
              (this.inputBytes = 0),
              (this.outputBytes = 0)
          }
          _transform(t, e, i) {
            let n
            if (('buffer' !== e && (t = Buffer.from(t, e)), !t || !t.length))
              return i()
            ;(this.inputBytes += t.length),
              this.options.lineLength
                ? (n = (n = r(
                    (n = this._curLine + a(t)),
                    this.options.lineLength,
                  )).replace(
                    /(^|\n)([^\n]*)$/,
                    (t, e, i) => ((this._curLine = i), e),
                  )) && ((this.outputBytes += n.length), this.push(n))
                : ((n = a(t)),
                  (this.outputBytes += n.length),
                  this.push(n, 'ascii')),
              i()
          }
          _flush(t) {
            this._curLine &&
              ((this.outputBytes += this._curLine.length),
              this.push(this._curLine, 'ascii')),
              t()
          }
        },
      }
    },
    function(t, e) {
      t.exports = require('tls')
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Stream,
        a = i(29),
        r = i(11),
        o = i(3)
      t.exports = class extends n {
        constructor(t, e) {
          if ((super(), (this.options = t || {}), t && t.serviceClient)) {
            if (!t.privateKey || !t.user)
              return void setImmediate(() =>
                this.emit(
                  'error',
                  new Error(
                    'Options "privateKey" and "user" are required for service account!',
                  ),
                ),
              )
            let e = Math.min(
              Math.max(Number(this.options.serviceRequestTimeout) || 0, 0),
              3600,
            )
            this.options.serviceRequestTimeout = e || 300
          }
          if (
            ((this.logger = o.getLogger(
              {logger: e},
              {component: this.options.component || 'OAuth2'},
            )),
            (this.provisionCallback =
              'function' == typeof this.options.provisionCallback &&
              this.options.provisionCallback),
            (this.options.accessUrl =
              this.options.accessUrl ||
              'https://accounts.google.com/o/oauth2/token'),
            (this.options.customHeaders = this.options.customHeaders || {}),
            (this.options.customParams = this.options.customParams || {}),
            (this.accessToken = this.options.accessToken || !1),
            this.options.expires && Number(this.options.expires))
          )
            this.expires = this.options.expires
          else {
            let t = Math.max(Number(this.options.timeout) || 0, 0)
            this.expires = (t && Date.now() + 1e3 * t) || 0
          }
        }
        getToken(t, e) {
          if (
            !t &&
            this.accessToken &&
            (!this.expires || this.expires > Date.now())
          )
            return e(null, this.accessToken)
          let i = (...t) => {
            t[0]
              ? this.logger.error(
                  {
                    err: t[0],
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'renew',
                  },
                  'Failed generating new Access Token for %s',
                  this.options.user,
                )
              : this.logger.info(
                  {tnx: 'OAUTH2', user: this.options.user, action: 'renew'},
                  'Generated new Access Token for %s',
                  this.options.user,
                ),
              e(...t)
          }
          this.provisionCallback
            ? this.provisionCallback(this.options.user, !!t, (t, e, n) => {
                !t && e && ((this.accessToken = e), (this.expires = n || 0)),
                  i(t, e)
              })
            : this.generateToken(i)
        }
        updateToken(t, e) {
          ;(this.accessToken = t),
            (e = Math.max(Number(e) || 0, 0)),
            (this.expires = (e && Date.now() + 1e3 * e) || 0),
            this.emit('token', {
              user: this.options.user,
              accessToken: t || '',
              expires: this.expires,
            })
        }
        generateToken(t) {
          let e, i
          if (this.options.serviceClient) {
            let t = Math.floor(Date.now() / 1e3),
              n = {
                iss: this.options.serviceClient,
                scope: this.options.scope || 'https://mail.google.com/',
                sub: this.options.user,
                aud: this.options.accessUrl,
                iat: t,
                exp: t + this.options.serviceRequestTimeout,
              },
              a = this.jwtSignRS256(n)
            ;(e = {
              grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
              assertion: a,
            }),
              (i = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: n,
              })
          } else {
            if (!this.options.refreshToken)
              return t(new Error("Can't create new access token for user"))
            ;(e = {
              client_id: this.options.clientId || '',
              client_secret: this.options.clientSecret || '',
              refresh_token: this.options.refreshToken,
              grant_type: 'refresh_token',
            }),
              (i = {
                client_id: this.options.clientId || '',
                client_secret:
                  (this.options.clientSecret || '').substr(0, 6) + '...',
                refresh_token:
                  (this.options.refreshToken || '').substr(0, 6) + '...',
                grant_type: 'refresh_token',
              })
          }
          Object.keys(this.options.customParams).forEach(t => {
            ;(e[t] = this.options.customParams[t]),
              (i[t] = this.options.customParams[t])
          }),
            this.logger.debug(
              {tnx: 'OAUTH2', user: this.options.user, action: 'generate'},
              'Requesting token using: %s',
              JSON.stringify(i),
            ),
            this.postRequest(
              this.options.accessUrl,
              e,
              this.options,
              (e, i) => {
                let n
                if (e) return t(e)
                try {
                  n = JSON.parse(i.toString())
                } catch (e) {
                  return t(e)
                }
                if (!n || 'object' != typeof n)
                  return (
                    this.logger.debug(
                      {tnx: 'OAUTH2', user: this.options.user, action: 'post'},
                      'Response: %s',
                      (i || '').toString(),
                    ),
                    t(new Error('Invalid authentication response'))
                  )
                let a = {}
                return (
                  Object.keys(n).forEach(t => {
                    a[t] =
                      'access_token' !== t
                        ? n[t]
                        : (n[t] || '').toString().substr(0, 6) + '...'
                  }),
                  this.logger.debug(
                    {tnx: 'OAUTH2', user: this.options.user, action: 'post'},
                    'Response: %s',
                    JSON.stringify(a),
                  ),
                  n.error
                    ? t(new Error(n.error))
                    : n.access_token
                    ? (this.updateToken(n.access_token, n.expires_in),
                      t(null, this.accessToken))
                    : t(new Error('No access token'))
                )
              },
            )
        }
        buildXOAuth2Token(t) {
          let e = [
            'user=' + (this.options.user || ''),
            'auth=Bearer ' + (t || this.accessToken),
            '',
            '',
          ]
          return Buffer.from(e.join(''), 'utf-8').toString('base64')
        }
        postRequest(t, e, i, n) {
          let r = !1,
            o = [],
            s = 0,
            l = a(t, {
              method: 'post',
              headers: i.customHeaders,
              body: e,
              allowErrorResponse: !0,
            })
          l.on('readable', () => {
            let t
            for (; null !== (t = l.read()); ) o.push(t), (s += t.length)
          }),
            l.once('error', t => {
              if (!r) return (r = !0), n(t)
            }),
            l.once('end', () => {
              if (!r) return (r = !0), n(null, Buffer.concat(o, s))
            })
        }
        toBase64URL(t) {
          return (
            'string' == typeof t && (t = Buffer.from(t)),
            t
              .toString('base64')
              .replace(/[=]+/g, '')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
          )
        }
        jwtSignRS256(t) {
          t = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(t)]
            .map(t => this.toBase64URL(t))
            .join('.')
          let e = r
            .createSign('RSA-SHA256')
            .update(t)
            .sign(this.options.privateKey)
          return t + '.' + this.toBase64URL(e)
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(181),
        a = {}
      function r(t) {
        return t.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase()
      }
      function o(t) {
        let e = ['domains', 'aliases'],
          i = {}
        return (
          Object.keys(t).forEach(n => {
            e.indexOf(n) < 0 && (i[n] = t[n])
          }),
          i
        )
      }
      Object.keys(n).forEach(t => {
        let e = n[t]
        ;(a[r(t)] = o(e)),
          [].concat(e.aliases || []).forEach(t => {
            a[r(t)] = o(e)
          }),
          [].concat(e.domains || []).forEach(t => {
            a[r(t)] = o(e)
          })
      }),
        (t.exports = function(t) {
          return (t = r(t.split('@').pop())), a[t] || !1
        })
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      t.exports = class extends n {
        constructor(t) {
          super(t), (this.options = t || {})
        }
        _transform(t, e, i) {
          let n,
            a = 0
          for (let e = 0, i = t.length; e < i; e++)
            13 === t[e] && ((n = t.slice(a, e)), (a = e + 1), this.push(n))
          a && a < t.length
            ? ((n = t.slice(a)), this.push(n))
            : a || this.push(t),
            i()
        }
      }
    },
    function(t) {
      t.exports = {
        AElig: 'Æ',
        AMP: '&',
        Aacute: 'Á',
        Acirc: 'Â',
        Agrave: 'À',
        Aring: 'Å',
        Atilde: 'Ã',
        Auml: 'Ä',
        COPY: '©',
        Ccedil: 'Ç',
        ETH: 'Ð',
        Eacute: 'É',
        Ecirc: 'Ê',
        Egrave: 'È',
        Euml: 'Ë',
        GT: '>',
        Iacute: 'Í',
        Icirc: 'Î',
        Igrave: 'Ì',
        Iuml: 'Ï',
        LT: '<',
        Ntilde: 'Ñ',
        Oacute: 'Ó',
        Ocirc: 'Ô',
        Ograve: 'Ò',
        Oslash: 'Ø',
        Otilde: 'Õ',
        Ouml: 'Ö',
        QUOT: '"',
        REG: '®',
        THORN: 'Þ',
        Uacute: 'Ú',
        Ucirc: 'Û',
        Ugrave: 'Ù',
        Uuml: 'Ü',
        Yacute: 'Ý',
        aacute: 'á',
        acirc: 'â',
        acute: '´',
        aelig: 'æ',
        agrave: 'à',
        amp: '&',
        aring: 'å',
        atilde: 'ã',
        auml: 'ä',
        brvbar: '¦',
        ccedil: 'ç',
        cedil: '¸',
        cent: '¢',
        copy: '©',
        curren: '¤',
        deg: '°',
        divide: '÷',
        eacute: 'é',
        ecirc: 'ê',
        egrave: 'è',
        eth: 'ð',
        euml: 'ë',
        frac12: '½',
        frac14: '¼',
        frac34: '¾',
        gt: '>',
        iacute: 'í',
        icirc: 'î',
        iexcl: '¡',
        igrave: 'ì',
        iquest: '¿',
        iuml: 'ï',
        laquo: '«',
        lt: '<',
        macr: '¯',
        micro: 'µ',
        middot: '·',
        nbsp: ' ',
        not: '¬',
        ntilde: 'ñ',
        oacute: 'ó',
        ocirc: 'ô',
        ograve: 'ò',
        ordf: 'ª',
        ordm: 'º',
        oslash: 'ø',
        otilde: 'õ',
        ouml: 'ö',
        para: '¶',
        plusmn: '±',
        pound: '£',
        quot: '"',
        raquo: '»',
        reg: '®',
        sect: '§',
        shy: '­',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        szlig: 'ß',
        thorn: 'þ',
        times: '×',
        uacute: 'ú',
        ucirc: 'û',
        ugrave: 'ù',
        uml: '¨',
        uuml: 'ü',
        yacute: 'ý',
        yen: '¥',
        yuml: 'ÿ',
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e = 'string' == typeof t ? t.charCodeAt(0) : t
        return (
          (e >= 97 && e <= 102) || (e >= 65 && e <= 70) || (e >= 48 && e <= 57)
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(81),
        a = i(35)
      t.exports = function(t) {
        return n(t) || a(t)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e = 'string' == typeof t ? t.charCodeAt(0) : t
        return (e >= 97 && e <= 122) || (e >= 65 && e <= 90)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = {
        position: !0,
        gfm: !0,
        commonmark: !1,
        footnotes: !1,
        pedantic: !1,
        blocks: i(218),
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = o
      var n = i(22),
        a = 'skip',
        r = !1
      function o(t, e, i, o) {
        function s(t, l, c) {
          var p
          return ((e && !n(e, t, l, c[c.length - 1] || null)) ||
            (p = i(t, c)) !== r) &&
            t.children &&
            p !== a &&
            (function(t, e) {
              var i,
                n,
                a = o ? -1 : 1,
                l = (o ? t.length : -1) + a
              for (; l > -1 && l < t.length; ) {
                if (((i = t[l]), (n = i && s(i, l, e)) === r)) return n
                l = 'number' == typeof n ? n : l + a
              }
            })(t.children, c.concat(t)) === r
            ? r
            : p
        }
        'function' == typeof e &&
          'function' != typeof i &&
          ((o = i), (i = e), (e = null)),
          s(t, null, [])
      }
      ;(o.CONTINUE = !0), (o.SKIP = a), (o.EXIT = r)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e,
          i = 0,
          s = 0,
          l = t.charAt(i),
          c = {}
        for (; l === n || l === a; )
          (s += e = l === n ? o : r),
            e > 1 && (s = Math.floor(s / e) * e),
            (c[s] = i),
            (l = t.charAt(++i))
        return {indent: s, stops: c}
      }
      var n = '\t',
        a = ' ',
        r = 1,
        o = 4
    },
    function(t, e, i) {
      'use strict'
      var n =
          '<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"\'=<>`\\u0000-\\u0020]+|\'[^\']*\'|"[^"]*"))?)*\\s*\\/?>',
        a = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>'
      ;(e.openCloseTag = new RegExp('^(?:' + n + '|' + a + ')')),
        (e.tag = new RegExp(
          '^(?:' +
            n +
            '|' +
            a +
            '|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|<[?].*?[?]>|<![A-Za-z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)',
        ))
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.indexOf('<', e)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = t.indexOf('[', e),
          n = t.indexOf('![', e)
        if (-1 === n) return i
        return i < n ? i : n
      }
    },
    function(t, e, i) {
      'use strict'
      var n = e
      function a(t) {
        return (e.displayName = t), e
        function e(e) {
          var i = (e && e.position && e.position[t]) || {}
          return {
            line: i.line || null,
            column: i.column || null,
            offset: isNaN(i.offset) ? null : i.offset,
          }
        }
      }
      ;(n.start = a('start')), (n.end = a('end'))
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var o = e && e.type,
          s = r.call(t.handlers, o) ? t.handlers[o] : null
        if (!o) throw new Error('Expected node, got `' + e + '`')
        return ('function' == typeof s
          ? s
          : function(t, e) {
              if (
                (function(t) {
                  var e = t.data || {}
                  if (
                    r.call(e, 'hName') ||
                    r.call(e, 'hProperties') ||
                    r.call(e, 'hChildren')
                  )
                    return !1
                  return 'value' in t
                })(e)
              )
                return t.augment(e, n('text', e.value))
              return t(e, 'div', a(t, e))
            })(t, e, i)
      }
      var n = i(4),
        a = i(2),
        r = {}.hasOwnProperty
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'hr')
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = {},
          r = e.ordered ? 'ol' : 'ul'
        'number' == typeof e.start && 1 !== e.start && (i.start = e.start)
        return t(e, r, i, n(a(t, e), !0))
      }
      var n = i(17),
        a = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = e.identifier
        return t(e.position, 'sup', {id: 'fnref-' + i}, [
          t(e, 'a', {href: '#fn-' + i, className: ['footnote-ref']}, [
            n('text', i),
          ]),
        ])
      }
      var n = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          r,
          o,
          s = e.referenceType,
          l = ']'
        'collapsed' === s
          ? (l += '[]')
          : 'full' === s && (l += '[' + (e.label || e.identifier) + ']')
        if ('imageReference' === e.type) return n('text', '![' + e.alt + l)
        ;(i = a(t, e)),
          (r = i[0]) && 'text' === r.type
            ? (r.value = '[' + r.value)
            : i.unshift(n('text', '['))
        ;(o = i[i.length - 1]) && 'text' === o.type
          ? (o.value += l)
          : i.push(n('text', l))
        return i
      }
      var n = i(4),
        a = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = a
      var n = a.prototype
      function a(t, e, i) {
        ;(this.property = t), (this.normal = e), i && (this.space = i)
      }
      ;(n.space = null), (n.normal = {}), (n.property = {})
    },
    function(t, e, i) {
      'use strict'
      var n = i(96),
        a = i(52)
      function r(t, e, i, r) {
        o(this, 'space', r),
          n.call(this, t, e),
          o(this, 'boolean', s(i, a.boolean)),
          o(this, 'booleanish', s(i, a.booleanish)),
          o(this, 'overloadedBoolean', s(i, a.overloadedBoolean)),
          o(this, 'number', s(i, a.number)),
          o(this, 'commaSeparated', s(i, a.commaSeparated)),
          o(this, 'spaceSeparated', s(i, a.spaceSeparated)),
          o(this, 'commaOrSpaceSeparated', s(i, a.commaOrSpaceSeparated))
      }
      function o(t, e, i) {
        i && (t[e] = i)
      }
      function s(t, e) {
        return (t & e) === e
      }
      ;(t.exports = r), (r.prototype = new n()), (r.prototype.defined = !0)
    },
    function(t, e, i) {
      'use strict'
      t.exports = a
      var n = a.prototype
      function a(t, e) {
        ;(this.property = t), (this.attribute = e)
      }
      ;(n.space = null),
        (n.attribute = null),
        (n.property = null),
        (n.boolean = !1),
        (n.booleanish = !1),
        (n.overloadedBoolean = !1),
        (n.number = !1),
        (n.commaSeparated = !1),
        (n.spaceSeparated = !1),
        (n.commaOrSpaceSeparated = !1),
        (n.mustUseProperty = !1),
        (n.defined = !1)
    },
    function(t, e, i) {
      'use strict'
      var n = i(292)
      t.exports = function(t, e) {
        return n(t, e.toLowerCase())
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(10)
      ;(e.parse = function(t) {
        var e = n(String(t || a))
        return e === a ? [] : e.split(o)
      }),
        (e.stringify = function(t) {
          return n(t.join(r))
        })
      var a = '',
        r = ' ',
        o = /[ \t\n\r\f]+/g
    },
    function(t, e, i) {
      'use strict'
      ;(e.parse = function(t) {
        var e,
          i = [],
          r = String(t || o),
          s = r.indexOf(a),
          l = 0,
          c = !1
        for (; !c; )
          -1 === s && ((s = r.length), (c = !0)),
            (!(e = n(r.slice(l, s))) && c) || i.push(e),
            (l = s + 1),
            (s = r.indexOf(a, l))
        return i
      }),
        (e.stringify = function(t, e) {
          var i = e || {},
            s = !1 === i.padLeft ? o : r,
            l = i.padRight ? r : o
          t[t.length - 1] === o && (t = t.concat(o))
          return n(t.join(l + a + s))
        })
      var n = i(10),
        a = ',',
        r = ' ',
        o = ''
    },
    function(t) {
      t.exports = ['script', 'style', 'pre', 'textarea']
    },
    function(t, e, i) {
      'use strict'
      var n = i(18),
        a = i(53)
      t.exports = function(t) {
        var e, i, o
        if (!n(t, 'link')) return !1
        if (a(t, 'itemProp')) return !0
        if (
          ((o = (t.properties || {}).rel || []),
          (e = o.length),
          (i = -1),
          0 === o.length)
        )
          return !1
        for (; ++i < e; ) if (-1 === r.indexOf(o[i])) return !1
        return !0
      }
      var r = ['pingback', 'prefetch', 'stylesheet']
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(103)
      t.exports = function(t) {
        var e,
          i,
          r = t.length,
          o = [],
          s = [],
          l = -1
        for (; ++l < r; )
          (e = t[l]), o.push(e.property), s.push(e.normal), (i = e.space)
        return new a(n.apply(null, o), n.apply(null, s), i)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = a
      var n = a.prototype
      function a(t, e, i) {
        ;(this.property = t), (this.normal = e), i && (this.space = i)
      }
      ;(n.space = null), (n.normal = {}), (n.property = {})
    },
    function(t, e, i) {
      'use strict'
      var n = i(19)
      t.exports = n({
        space: 'xlink',
        transform: function(t, e) {
          return 'xlink:' + e.slice(5).toLowerCase()
        },
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return t.toLowerCase()
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(107),
        a = i(37)
      function r(t, e, i, r) {
        o(this, 'space', r),
          n.call(this, t, e),
          o(this, 'boolean', s(i, a.boolean)),
          o(this, 'booleanish', s(i, a.booleanish)),
          o(this, 'overloadedBoolean', s(i, a.overloadedBoolean)),
          o(this, 'number', s(i, a.number)),
          o(this, 'commaSeparated', s(i, a.commaSeparated)),
          o(this, 'spaceSeparated', s(i, a.spaceSeparated)),
          o(this, 'commaOrSpaceSeparated', s(i, a.commaOrSpaceSeparated))
      }
      function o(t, e, i) {
        i && (t[e] = i)
      }
      function s(t, e) {
        return (t & e) === e
      }
      ;(t.exports = r), (r.prototype = new n()), (r.prototype.defined = !0)
    },
    function(t, e, i) {
      'use strict'
      t.exports = a
      var n = a.prototype
      function a(t, e) {
        ;(this.property = t), (this.attribute = e)
      }
      ;(n.space = null),
        (n.attribute = null),
        (n.property = null),
        (n.boolean = !1),
        (n.booleanish = !1),
        (n.overloadedBoolean = !1),
        (n.number = !1),
        (n.commaSeparated = !1),
        (n.spaceSeparated = !1),
        (n.commaOrSpaceSeparated = !1),
        (n.mustUseProperty = !1),
        (n.defined = !1)
    },
    function(t, e, i) {
      'use strict'
      var n = i(19)
      t.exports = n({
        space: 'xml',
        transform: function(t, e) {
          return 'xml:' + e.slice(3).toLowerCase()
        },
        properties: {xmlLang: null, xmlBase: null, xmlSpace: null},
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(19),
        a = i(110)
      t.exports = n({
        space: 'xmlns',
        attributes: {xmlnsxlink: 'xmlns:xlink'},
        transform: a,
        properties: {xmlns: null, xmlnsXLink: null},
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(111)
      t.exports = function(t, e) {
        return n(t, e.toLowerCase())
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return e in t ? t[e] : e
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(37),
        a = i(19),
        r = n.booleanish,
        o = n.number,
        s = n.spaceSeparated
      t.exports = a({
        transform: function(t, e) {
          return 'role' === e ? e : 'aria-' + e.slice(4).toLowerCase()
        },
        properties: {
          ariaActiveDescendant: null,
          ariaAtomic: r,
          ariaAutoComplete: null,
          ariaBusy: r,
          ariaChecked: r,
          ariaColCount: o,
          ariaColIndex: o,
          ariaColSpan: o,
          ariaControls: s,
          ariaCurrent: null,
          ariaDescribedBy: s,
          ariaDetails: null,
          ariaDisabled: r,
          ariaDropEffect: s,
          ariaErrorMessage: null,
          ariaExpanded: r,
          ariaFlowTo: s,
          ariaGrabbed: r,
          ariaHasPopup: null,
          ariaHidden: r,
          ariaInvalid: null,
          ariaKeyShortcuts: null,
          ariaLabel: null,
          ariaLabelledBy: s,
          ariaLevel: o,
          ariaLive: null,
          ariaModal: r,
          ariaMultiLine: r,
          ariaMultiSelectable: r,
          ariaOrientation: null,
          ariaOwns: s,
          ariaPlaceholder: null,
          ariaPosInSet: o,
          ariaPressed: r,
          ariaReadOnly: r,
          ariaRelevant: null,
          ariaRequired: r,
          ariaRoleDescription: s,
          ariaRowCount: o,
          ariaRowIndex: o,
          ariaRowSpan: o,
          ariaSelected: r,
          ariaSetSize: o,
          ariaSort: null,
          ariaValueMax: o,
          ariaValueMin: o,
          ariaValueNow: o,
          ariaValueText: null,
          role: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(102),
        a = i(104),
        r = i(108),
        o = i(109),
        s = i(112),
        l = i(311)
      t.exports = n([r, a, o, s, l])
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e
        if (t && 'object' == typeof t && 'text' === t.type) e = t.value || ''
        else {
          if ('string' != typeof t) return !1
          e = t
        }
        return '' === e.replace(n, '')
      }
      var n = /[ \t\n\f\r]/g
    },
    function(t, e, i) {
      'use strict'
      var n = i(22),
        a = i(114)
      t.exports = function(t) {
        return n('text', t) && a(t.value.charAt(0))
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(22),
        a = i(18),
        r = i(115),
        o = i(55).after,
        s = i(117),
        l = 'optgroup',
        c = ['option'].concat(l),
        p = ['dt', 'dd'],
        u = 'li',
        d = ['menuitem', 'hr', 'menu'],
        h = ['rp', 'rt'],
        m = ['tbody', 'tfoot'],
        f = 'tr',
        g = ['td', 'th'],
        v = ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'],
        x = [
          'address',
          'article',
          'aside',
          'blockquote',
          'details',
          'div',
          'dl',
          'fieldset',
          'figcaption',
          'figure',
          'footer',
          'form',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'header',
          'hgroup',
          'hr',
          'main',
          'menu',
          'nav',
          'ol',
          'p',
          'pre',
          'section',
          'table',
          'ul',
        ]
      function b(t, e, i) {
        var a = o(i, e, !0)
        return !a || (!n('comment', a) && !r(a))
      }
      function y(t, e, i) {
        var n = o(i, e)
        return !n || a(n, h)
      }
      function w(t, e, i) {
        var n = o(i, e)
        return !n || a(n, g)
      }
      t.exports = s({
        html: function(t, e, i) {
          var a = o(i, e)
          return !a || !n('comment', a)
        },
        head: b,
        body: function(t, e, i) {
          var a = o(i, e)
          return !a || !n('comment', a)
        },
        p: function(t, e, i) {
          var n = o(i, e)
          return n ? a(n, x) : !i || !a(i, v)
        },
        li: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, u)
        },
        dt: function(t, e, i) {
          var n = o(i, e)
          return n && a(n, p)
        },
        dd: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, p)
        },
        rt: y,
        rp: y,
        optgroup: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, l)
        },
        option: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, c)
        },
        menuitem: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, d)
        },
        colgroup: b,
        caption: b,
        thead: function(t, e, i) {
          var n = o(i, e)
          return n && a(n, m)
        },
        tbody: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, m)
        },
        tfoot: function(t, e, i) {
          return !o(i, e)
        },
        tr: function(t, e, i) {
          var n = o(i, e)
          return !n || a(n, f)
        },
        td: w,
        th: w,
      })
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return function(e, i, a) {
          var r = e.tagName,
            o = !!n.call(t, r) && t[r]
          return !!o && o(e, i, a)
        }
      }
      var n = {}.hasOwnProperty
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i, r) {
        var o = e && e.type
        if (!o) throw new Error('Expected node, not `' + e + '`')
        if (!n.call(a, o))
          throw new Error('Cannot compile unknown node `' + o + '`')
        return a[o](t, e, i, r)
      }
      var n = {}.hasOwnProperty,
        a = {}
      ;(a.root = i(119)),
        (a.text = i(120)),
        (a.element = i(319)),
        (a.doctype = i(323)),
        (a.comment = i(324)),
        (a.raw = i(325))
    },
    function(t, e, i) {
      'use strict'
      var n = i(118)
      t.exports = function(t, e) {
        var i = e && e.children,
          a = i && i.length,
          r = -1,
          o = []
        for (; ++r < a; ) o[r] = n(t, i[r], r, e)
        return o.join('')
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(121)
      t.exports = function(t, e, i, r) {
        var o = e.value
        return (function(t) {
          return t && ('script' === t.tagName || 'style' === t.tagName)
        })(r)
          ? o
          : a(o, n(t.entities, {subset: ['<', '&']}))
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(317),
        a = i(78),
        r = i(79),
        o = i(80),
        s = i(318)
      ;(t.exports = h),
        (h.escape = function(t) {
          return h(t, {escapeOnly: !0, useNamedReferences: !0})
        })
      var l = {}.hasOwnProperty,
        c = (function() {
          var t,
            e = {}
          for (t in n) e[n[t]] = t
          return e
        })(),
        p = g(['"', "'", '<', '>', '&', '`']),
        u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        d = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
      function h(t, e) {
        var i = e || {},
          n = i.subset,
          a = n ? g(n) : p,
          r = i.escapeOnly,
          o = i.omitOptionalSemicolons
        return (
          (t = t.replace(a, function(t, e, n) {
            return m(t, n.charAt(e + 1), i)
          })),
          n || r
            ? t
            : t
                .replace(u, function(t, e, i) {
                  return f(
                    1024 * (t.charCodeAt(0) - 55296) +
                      t.charCodeAt(1) -
                      56320 +
                      65536,
                    i.charAt(e + 2),
                    o,
                  )
                })
                .replace(d, function(t, e, n) {
                  return m(t, n.charAt(e + 1), i)
                })
        )
      }
      function m(t, e, i) {
        var n,
          r,
          p = i.useShortestReferences,
          u = i.omitOptionalSemicolons
        return (
          (p || i.useNamedReferences) &&
            l.call(c, t) &&
            (n = (function(t, e, i, n) {
              var r = '&' + t
              if (
                i &&
                l.call(a, t) &&
                -1 === s.indexOf(t) &&
                (!n || (e && '=' !== e && !o(e)))
              )
                return r
              return r + ';'
            })(c[t], e, u, i.attribute)),
          (!p && n) || (r = f(t.charCodeAt(0), e, u)),
          n && (!p || n.length < r.length) ? n : r
        )
      }
      function f(t, e, i) {
        var n = '&#x' + t.toString(16).toUpperCase()
        return i && e && !r(e) ? n : n + ';'
      }
      function g(t) {
        return new RegExp('[' + t.join('') + ']', 'g')
      }
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(t, e, i) {
      function n(t, e) {
        if (null == t) return {}
        var i,
          n,
          a = (function(t, e) {
            if (null == t) return {}
            var i,
              n,
              a = {},
              r = Object.keys(t)
            for (n = 0; n < r.length; n++)
              (i = r[n]), e.indexOf(i) >= 0 || (a[i] = t[i])
            return a
          })(t, e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t)
          for (n = 0; n < r.length; n++)
            (i = r[n]),
              e.indexOf(i) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(t, i) &&
                  (a[i] = t[i]))
        }
        return a
      }
      const {URL: a} = i(8),
        r = i(166),
        o = i(188),
        {markdownToHtml: s} = i(189),
        l = o.string.is(t => /^.+@.+\..+$/.test(t))
      o(
        process.env.EMAIL_PASSWORD,
        'EMAIL_PASSWORD environment variable is not set',
        o.string.minLength(1),
      ),
        o(
          process.env.EMAIL_USERNAME,
          'EMAIL_USERNAME environment variable is not set to an email',
          l,
        )
      const c = r.createTransport({
          host: 'smtp.mailgun.org',
          port: 587,
          secure: !1,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        }),
        p = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      e.handler = async t => {
        const e = Date.now()
            .toString()
            .slice(-5),
          i = (...t) => console.log(e, ...t),
          r = new a(t.headers.origin)
        if (!(r.hostname, 'kentcdodds.com' === r.hostname))
          return Promise.reject({
            statusCode: 403,
            body: 'Unacceptable request',
            headers: p,
          })
        if ('OPTIONS' === t.httpMethod)
          return {statusCode: 200, body: 'CORS ok', headers: p}
        const u = JSON.parse(t.body),
          {name: d, email: h, subject: m, body: f} = u,
          g = n(u, ['name', 'email', 'subject', 'body'])
        try {
          i('> Validating input', ' name: ', d, ' email:', h),
            o(d, 'Name is too short', o.string.minLength(1)),
            o(d, 'Name is too long', o.string.maxLength(60)),
            o(h, 'Email is invalid', l),
            o(
              m,
              'Please keep the subject to a reasonable length',
              o.any(o.string.minLength(5), o.string.maxLength(120)),
            ),
            o(
              f,
              'Please keep the body to a reasonable length',
              o.any(o.string.minLength(40), o.string.maxLength(1001)),
            )
        } catch (t) {
          return (
            i('> Validation failed', t.message),
            Promise.reject({statusCode: 403, body: t.message, headers: p})
          )
        }
        const v = `${f}\n\n---\n\nOther form data:\n\`\`\`\n${JSON.stringify(
            g,
            null,
            2,
          )}\n\`\`\`\n`,
          x = `"${d}" <${h}>`,
          b = {
            from: x,
            to: '"Kent C. Dodds" <kent@doddsfamily.us>',
            cc: x,
            subject: m,
            text: v,
            html: await s(v),
          }
        try {
          i('> Sending...'),
            await c.verify(),
            await c.sendMail(b),
            i('> Send success!')
        } catch (t) {
          return (
            i('> Send failure!', t.message),
            Promise.reject({statusCode: 500, body: t.message, headers: p})
          )
        }
        return {
          statusCode: 200,
          body: JSON.stringify({success: !0}),
          headers: p,
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(167),
        a = i(3),
        r = i(178),
        o = i(182),
        s = i(183),
        l = i(185),
        c = i(186),
        p = i(187),
        u = i(29),
        d = i(9),
        h = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(
          /\/+$/,
          '',
        ),
        m = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(
          /\/+$/,
          '',
        ),
        f = ['true', 'yes', 'y', '1'].includes(
          (process.env.ETHEREAL_CACHE || 'yes')
            .toString()
            .trim()
            .toLowerCase(),
        )
      let g = !1
      ;(t.exports.createTransport = function(t, e) {
        let i, u, d
        return (
          (('object' == typeof t && 'function' != typeof t.send) ||
            ('string' == typeof t && /^(smtps?|direct):/i.test(t))) &&
            (t = (u = (i = 'string' == typeof t ? t : t.url)
              ? a.parseConnectionUrl(i)
              : t).pool
              ? new r(u)
              : u.sendmail
              ? new s(u)
              : u.streamTransport
              ? new l(u)
              : u.jsonTransport
              ? new c(u)
              : u.SES
              ? new p(u)
              : new o(u)),
          (d = new n(t, u, e))
        )
      }),
        (t.exports.createTestAccount = function(t, e) {
          let i
          if (
            (e || 'function' != typeof t || ((e = t), (t = !1)),
            e ||
              (i = new Promise((t, i) => {
                e = a.callbackPromise(t, i)
              })),
            f && g)
          )
            return setImmediate(() => e(null, g)), i
          let n = [],
            r = 0,
            o = u((t = t || h) + '/user', {
              contentType: 'application/json',
              method: 'POST',
              body: Buffer.from(
                JSON.stringify({requestor: d.name, version: d.version}),
              ),
            })
          return (
            o.on('readable', () => {
              let t
              for (; null !== (t = o.read()); ) n.push(t), (r += t.length)
            }),
            o.once('error', t => e(t)),
            o.once('end', () => {
              let t,
                i,
                a = Buffer.concat(n, r)
              try {
                t = JSON.parse(a.toString())
              } catch (t) {
                i = t
              }
              return i
                ? e(i)
                : 'success' !== t.status || t.error
                ? e(new Error(t.error || 'Request failed'))
                : (delete t.status, void e(null, (g = t)))
            }),
            i
          )
        }),
        (t.exports.getTestMessageUrl = function(t) {
          if (!t || !t.response) return !1
          let e = new Map()
          return (
            t.response.replace(/\[([^\]]+)\]$/, (t, i) => {
              i.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (t, i, n) => {
                e.set(i, n)
              })
            }),
            !(!e.has('STATUS') || !e.has('MSGID')) &&
              (g.web || m) + '/message/' + e.get('MSGID')
          )
        })
    },
    function(t, e, i) {
      'use strict'
      const n = i(15),
        a = i(3),
        r = i(69),
        o = i(169),
        s = i(172),
        l = i(176),
        c = i(20),
        p = i(8),
        u = i(9),
        d = i(177),
        h = i(32),
        m = i(68),
        f = i(11)
      t.exports = class extends n {
        constructor(t, e, i) {
          super(),
            (this.options = e || {}),
            (this._defaults = i || {}),
            (this._defaultPlugins = {
              compile: [(...t) => this._convertDataImages(...t)],
              stream: [],
            }),
            (this._userPlugins = {compile: [], stream: []}),
            (this.meta = new Map()),
            (this.dkim = !!this.options.dkim && new s(this.options.dkim)),
            (this.transporter = t),
            (this.transporter.mailer = this),
            (this.logger = a.getLogger(this.options, {
              component: this.options.component || 'mail',
            })),
            this.logger.debug(
              {tnx: 'create'},
              'Creating transport: %s',
              this.getVersionString(),
            ),
            'function' == typeof t.on &&
              (this.transporter.on('log', t => {
                this.logger.debug(
                  {tnx: 'transport'},
                  '%s: %s',
                  t.type,
                  t.message,
                )
              }),
              this.transporter.on('error', t => {
                this.logger.error(
                  {err: t, tnx: 'transport'},
                  'Transport Error: %s',
                  t.message,
                ),
                  this.emit('error', t)
              }),
              this.transporter.on('idle', (...t) => {
                this.emit('idle', ...t)
              })),
            ['close', 'isIdle', 'verify'].forEach(t => {
              this[t] = (...e) =>
                'function' == typeof this.transporter[t]
                  ? this.transporter[t](...e)
                  : (this.logger.warn(
                      {tnx: 'transport', methodName: t},
                      'Non existing method %s called for transport',
                      t,
                    ),
                    !1)
            }),
            this.options.proxy &&
              'string' == typeof this.options.proxy &&
              this.setupProxy(this.options.proxy)
        }
        use(t, e) {
          return (
            (t = (t || '').toString()),
            this._userPlugins.hasOwnProperty(t)
              ? this._userPlugins[t].push(e)
              : (this._userPlugins[t] = [e]),
            this
          )
        }
        sendMail(t, e) {
          let i
          e ||
            (i = new Promise((t, i) => {
              e = a.callbackPromise(t, i)
            })),
            'function' == typeof this.getSocket &&
              ((this.transporter.getSocket = this.getSocket),
              (this.getSocket = !1))
          let n = new d(this, t)
          return (
            this.logger.debug(
              {
                tnx: 'transport',
                name: this.transporter.name,
                version: this.transporter.version,
                action: 'send',
              },
              'Sending mail using %s/%s',
              this.transporter.name,
              this.transporter.version,
            ),
            this._processPlugins('compile', n, t => {
              if (t)
                return (
                  this.logger.error(
                    {err: t, tnx: 'plugin', action: 'compile'},
                    'PluginCompile Error: %s',
                    t.message,
                  ),
                  e(t)
                )
              ;(n.message = new o(n.data).compile()),
                n.setMailerHeader(),
                n.setPriorityHeaders(),
                n.setListHeaders(),
                this._processPlugins('stream', n, t => {
                  if (t)
                    return (
                      this.logger.error(
                        {err: t, tnx: 'plugin', action: 'stream'},
                        'PluginStream Error: %s',
                        t.message,
                      ),
                      e(t)
                    )
                  ;(n.data.dkim || this.dkim) &&
                    n.message.processFunc(t => {
                      let e = n.data.dkim ? new s(n.data.dkim) : this.dkim
                      return (
                        this.logger.debug(
                          {
                            tnx: 'DKIM',
                            messageId: n.message.messageId(),
                            dkimDomains: e.keys
                              .map(t => t.keySelector + '.' + t.domainName)
                              .join(', '),
                          },
                          'Signing outgoing message with %s keys',
                          e.keys.length,
                        ),
                        e.sign(t, n.data._dkim)
                      )
                    }),
                    this.transporter.send(n, (...t) => {
                      t[0] &&
                        this.logger.error(
                          {err: t[0], tnx: 'transport', action: 'send'},
                          'Send Error: %s',
                          t[0].message,
                        ),
                        e(...t)
                    })
                })
            }),
            i
          )
        }
        getVersionString() {
          return c.format(
            '%s (%s; +%s; %s/%s)',
            u.name,
            u.version,
            u.homepage,
            this.transporter.name,
            this.transporter.version,
          )
        }
        _processPlugins(t, e, i) {
          if (
            ((t = (t || '').toString()), !this._userPlugins.hasOwnProperty(t))
          )
            return i()
          let n = this._userPlugins[t] || [],
            a = this._defaultPlugins[t] || []
          if (
            (n.length &&
              this.logger.debug(
                {tnx: 'transaction', pluginCount: n.length, step: t},
                'Using %s plugins for %s',
                n.length,
                t,
              ),
            n.length + a.length === 0)
          )
            return i()
          let r = 0,
            o = 'default',
            s = () => {
              let t = 'default' === o ? a : n
              if (r >= t.length) {
                if ('default' !== o || !n.length) return i()
                ;(o = 'user'), (r = 0), (t = n)
              }
              ;(0, t[r++])(e, t => {
                if (t) return i(t)
                s()
              })
            }
          s()
        }
        setupProxy(t) {
          let e = p.parse(t)
          this.getSocket = (t, i) => {
            let n = e.protocol.replace(/:$/, '').toLowerCase()
            if (this.meta.has('proxy_handler_' + n))
              return this.meta.get('proxy_handler_' + n)(e, t, i)
            switch (n) {
              case 'http':
              case 'https':
                return void l(e.href, t.port, t.host, (t, e) =>
                  t ? i(t) : i(null, {connection: e}),
                )
              case 'socks':
              case 'socks5':
              case 'socks4':
              case 'socks4a': {
                if (!this.meta.has('proxy_socks_module'))
                  return i(new Error('Socks module not loaded'))
                let n = n => {
                  let a = !!this.meta.get('proxy_socks_module').SocksClient,
                    r = a
                      ? this.meta.get('proxy_socks_module').SocksClient
                      : this.meta.get('proxy_socks_module'),
                    o = Number(e.protocol.replace(/\D/g, '')) || 5,
                    s = {
                      proxy: {ipaddress: n, port: Number(e.port), type: o},
                      [a ? 'destination' : 'target']: {
                        host: t.host,
                        port: t.port,
                      },
                      command: 'connect',
                    }
                  if (e.auth) {
                    let t = decodeURIComponent(e.auth.split(':').shift()),
                      i = decodeURIComponent(e.auth.split(':').pop())
                    a
                      ? ((s.userId = t), (s.password = i))
                      : 4 === o
                      ? (s.userid = t)
                      : (s.authentication = {username: t, password: i})
                  }
                  r.createConnection(s, (t, e) =>
                    t ? i(t) : i(null, {connection: e.socket || e}),
                  )
                }
                return h.isIP(e.hostname)
                  ? n(e.hostname)
                  : m.resolve(e.hostname, (t, e) => {
                      if (t) return i(t)
                      n(Array.isArray(e) ? e[0] : e)
                    })
              }
            }
            i(new Error('Unknown proxy configuration'))
          }
        }
        _convertDataImages(t, e) {
          if (
            (!this.options.attachDataUrls && !t.data.attachDataUrls) ||
            !t.data.html
          )
            return e()
          t.resolveContent(t.data, 'html', (i, n) => {
            if (i) return e(i)
            let a = 0
            ;(n = (n || '')
              .toString()
              .replace(
                /(<img\b[^>]* src\s*=[\s"']*)(data:([^;]+);[^"'>\s]+)/gi,
                (e, i, n, o) => {
                  let s = f.randomBytes(10).toString('hex') + '@localhost'
                  return (
                    t.data.attachments || (t.data.attachments = []),
                    Array.isArray(t.data.attachments) ||
                      (t.data.attachments = [].concat(
                        t.data.attachments || [],
                      )),
                    t.data.attachments.push({
                      path: n,
                      cid: s,
                      filename: 'image-' + ++a + '.' + r.detectExtension(o),
                    }),
                    i + 'cid:' + s
                  )
                },
              )),
              (t.data.html = n),
              e()
          })
        }
        set(t, e) {
          return this.meta.set(t, e)
        }
        get(t) {
          return this.meta.get(t)
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(8),
        a = 1800
      t.exports = class {
        constructor(t) {
          ;(this.options = t || {}), (this.cookies = [])
        }
        set(t, e) {
          let i,
            r = n.parse(e || ''),
            o = this.parse(t)
          return (
            o.domain
              ? ((i = o.domain.replace(/^\./, '')),
                (r.hostname.length < i.length ||
                  ('.' + r.hostname).substr(1 - i.length) !== '.' + i) &&
                  (o.domain = r.hostname))
              : (o.domain = r.hostname),
            o.path || (o.path = this.getPath(r.pathname)),
            o.expires ||
              (o.expires = new Date(
                Date.now() +
                  1e3 * (Number(this.options.sessionTimeout || a) || a),
              )),
            this.add(o)
          )
        }
        get(t) {
          return this.list(t)
            .map(t => t.name + '=' + t.value)
            .join('; ')
        }
        list(t) {
          let e,
            i,
            n = []
          for (e = this.cookies.length - 1; e >= 0; e--)
            (i = this.cookies[e]),
              this.isExpired(i)
                ? this.cookies.splice(e, e)
                : this.match(i, t) && n.unshift(i)
          return n
        }
        parse(t) {
          let e = {}
          return (
            (t || '')
              .toString()
              .split(';')
              .forEach(t => {
                let i,
                  n = t.split('='),
                  a = n
                    .shift()
                    .trim()
                    .toLowerCase(),
                  r = n.join('=').trim()
                if (a)
                  switch (a) {
                    case 'expires':
                      'Invalid Date' !== (r = new Date(r)).toString() &&
                        (e.expires = r)
                      break
                    case 'path':
                      e.path = r
                      break
                    case 'domain':
                      ;(i = r.toLowerCase()).length &&
                        '.' !== i.charAt(0) &&
                        (i = '.' + i),
                        (e.domain = i)
                      break
                    case 'max-age':
                      e.expires = new Date(Date.now() + 1e3 * (Number(r) || 0))
                      break
                    case 'secure':
                      e.secure = !0
                      break
                    case 'httponly':
                      e.httponly = !0
                      break
                    default:
                      e.name || ((e.name = a), (e.value = r))
                  }
              }),
            e
          )
        }
        match(t, e) {
          let i = n.parse(e || '')
          return (
            (i.hostname === t.domain ||
              ('.' === t.domain.charAt(0) &&
                ('.' + i.hostname).substr(-t.domain.length) === t.domain)) &&
            this.getPath(i.pathname).substr(0, t.path.length) === t.path &&
            (!t.secure || 'https:' === i.protocol)
          )
        }
        add(t) {
          let e, i
          if (!t || !t.name) return !1
          for (e = 0, i = this.cookies.length; e < i; e++)
            if (this.compare(this.cookies[e], t))
              return this.isExpired(t)
                ? (this.cookies.splice(e, 1), !1)
                : ((this.cookies[e] = t), !0)
          return this.isExpired(t) || this.cookies.push(t), !0
        }
        compare(t, e) {
          return (
            t.name === e.name &&
            t.path === e.path &&
            t.domain === e.domain &&
            t.secure === e.secure &&
            t.httponly == t.httponly
          )
        }
        isExpired(t) {
          return (t.expires && t.expires < new Date()) || !t.value
        }
        getPath(t) {
          let e = (t || '/').split('/')
          return (
            e.pop(),
            '/' !== (e = e.join('/').trim()).charAt(0) && (e = '/' + e),
            '/' !== e.substr(-1) && (e += '/'),
            e
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(70),
        a = i(34)
      t.exports = class {
        constructor(t) {
          ;(this.mail = t || {}), (this.message = !1)
        }
        compile() {
          return (
            (this._alternatives = this.getAlternatives()),
            (this._htmlNode = this._alternatives
              .filter(t => /^text\/html\b/i.test(t.contentType))
              .pop()),
            (this._attachments = this.getAttachments(!!this._htmlNode)),
            (this._useRelated = !(
              !this._htmlNode || !this._attachments.related.length
            )),
            (this._useAlternative = this._alternatives.length > 1),
            (this._useMixed =
              this._attachments.attached.length > 1 ||
              (this._alternatives.length &&
                1 === this._attachments.attached.length)),
            this.mail.raw
              ? (this.message = new n().setRaw(this.mail.raw))
              : this._useMixed
              ? (this.message = this._createMixed())
              : this._useAlternative
              ? (this.message = this._createAlternative())
              : this._useRelated
              ? (this.message = this._createRelated())
              : (this.message = this._createContentNode(
                  !1,
                  []
                    .concat(this._alternatives || [])
                    .concat(this._attachments.attached || [])
                    .shift() || {contentType: 'text/plain', content: ''},
                )),
            this.mail.headers && this.message.addHeader(this.mail.headers),
            [
              'from',
              'sender',
              'to',
              'cc',
              'bcc',
              'reply-to',
              'in-reply-to',
              'references',
              'subject',
              'message-id',
              'date',
            ].forEach(t => {
              let e = t.replace(/-(\w)/g, (t, e) => e.toUpperCase())
              this.mail[e] && this.message.setHeader(t, this.mail[e])
            }),
            this.mail.envelope && this.message.setEnvelope(this.mail.envelope),
            this.message.messageId(),
            this.message
          )
        }
        getAttachments(t) {
          let e,
            i,
            n = [].concat(this.mail.attachments || []).map((t, e) => {
              let i,
                n = /^message\//i.test(t.contentType)
              return (
                /^data:/i.test(t.path || t.href) &&
                  (t = this._processDataUrl(t)),
                (i = {
                  contentType:
                    t.contentType ||
                    a.detectMimeType(t.filename || t.path || t.href || 'bin'),
                  contentDisposition:
                    t.contentDisposition || (n ? 'inline' : 'attachment'),
                  contentTransferEncoding:
                    'contentTransferEncoding' in t
                      ? t.contentTransferEncoding
                      : 'base64',
                }),
                t.filename
                  ? (i.filename = t.filename)
                  : n ||
                    !1 === t.filename ||
                    ((i.filename =
                      (t.path || t.href || '')
                        .split('/')
                        .pop()
                        .split('?')
                        .shift() || 'attachment-' + (e + 1)),
                    i.filename.indexOf('.') < 0 &&
                      (i.filename += '.' + a.detectExtension(i.contentType))),
                /^https?:\/\//i.test(t.path) &&
                  ((t.href = t.path), (t.path = void 0)),
                t.cid && (i.cid = t.cid),
                t.raw
                  ? (i.raw = t.raw)
                  : t.path
                  ? (i.content = {path: t.path})
                  : t.href
                  ? (i.content = {href: t.href})
                  : (i.content = t.content || ''),
                t.encoding && (i.encoding = t.encoding),
                t.headers && (i.headers = t.headers),
                i
              )
            })
          return (
            this.mail.icalEvent &&
              ((e =
                'object' == typeof this.mail.icalEvent &&
                (this.mail.icalEvent.content ||
                  this.mail.icalEvent.path ||
                  this.mail.icalEvent.href ||
                  this.mail.icalEvent.raw)
                  ? this.mail.icalEvent
                  : {content: this.mail.icalEvent}),
              (i = {}),
              Object.keys(e).forEach(t => {
                i[t] = e[t]
              }),
              (i.contentType = 'application/ics'),
              i.headers || (i.headers = {}),
              (i.filename = i.filename || 'invite.ics'),
              (i.headers['Content-Disposition'] = 'attachment'),
              (i.headers['Content-Transfer-Encoding'] = 'base64')),
            t
              ? {
                  attached: n.filter(t => !t.cid).concat(i || []),
                  related: n.filter(t => !!t.cid),
                }
              : {attached: n.concat(i || []), related: []}
          )
        }
        getAlternatives() {
          let t,
            e,
            i,
            n,
            r,
            o = []
          return (
            this.mail.text &&
              ((t =
                'object' == typeof this.mail.text &&
                (this.mail.text.content ||
                  this.mail.text.path ||
                  this.mail.text.href ||
                  this.mail.text.raw)
                  ? this.mail.text
                  : {content: this.mail.text}).contentType =
                'text/plain' +
                (!t.encoding && a.isPlainText(t.content)
                  ? ''
                  : '; charset=utf-8')),
            this.mail.watchHtml &&
              ((i =
                'object' == typeof this.mail.watchHtml &&
                (this.mail.watchHtml.content ||
                  this.mail.watchHtml.path ||
                  this.mail.watchHtml.href ||
                  this.mail.watchHtml.raw)
                  ? this.mail.watchHtml
                  : {content: this.mail.watchHtml}).contentType =
                'text/watch-html' +
                (!i.encoding && a.isPlainText(i.content)
                  ? ''
                  : '; charset=utf-8')),
            !this.mail.icalEvent ||
              (this.mail.attachments && this.mail.attachments.length) ||
              ((n =
                'object' == typeof this.mail.icalEvent &&
                (this.mail.icalEvent.content ||
                  this.mail.icalEvent.path ||
                  this.mail.icalEvent.href ||
                  this.mail.icalEvent.raw)
                  ? this.mail.icalEvent
                  : {content: this.mail.icalEvent}),
              (r = {}),
              Object.keys(n).forEach(t => {
                r[t] = n[t]
              }),
              r.content &&
                'object' == typeof r.content &&
                (r.content._resolve = !0),
              (r.filename = !1),
              (r.contentType =
                'text/calendar; charset="utf-8"; method=' +
                (r.method || 'PUBLISH')
                  .toString()
                  .trim()
                  .toUpperCase()),
              r.headers || (r.headers = {})),
            this.mail.html &&
              ((e =
                'object' == typeof this.mail.html &&
                (this.mail.html.content ||
                  this.mail.html.path ||
                  this.mail.html.href ||
                  this.mail.html.raw)
                  ? this.mail.html
                  : {content: this.mail.html}).contentType =
                'text/html' +
                (!e.encoding && a.isPlainText(e.content)
                  ? ''
                  : '; charset=utf-8')),
            []
              .concat(t || [])
              .concat(i || [])
              .concat(e || [])
              .concat(r || [])
              .concat(this.mail.alternatives || [])
              .forEach(t => {
                let e
                ;/^data:/i.test(t.path || t.href) &&
                  (t = this._processDataUrl(t)),
                  (e = {
                    contentType:
                      t.contentType ||
                      a.detectMimeType(t.filename || t.path || t.href || 'txt'),
                    contentTransferEncoding: t.contentTransferEncoding,
                  }),
                  t.filename && (e.filename = t.filename),
                  /^https?:\/\//i.test(t.path) &&
                    ((t.href = t.path), (t.path = void 0)),
                  t.raw
                    ? (e.raw = t.raw)
                    : t.path
                    ? (e.content = {path: t.path})
                    : t.href
                    ? (e.content = {href: t.href})
                    : (e.content = t.content || ''),
                  t.encoding && (e.encoding = t.encoding),
                  t.headers && (e.headers = t.headers),
                  o.push(e)
              }),
            o
          )
        }
        _createMixed(t) {
          let e
          return (
            (e = t
              ? t.createChild('multipart/mixed', {
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })
              : new n('multipart/mixed', {
                  baseBoundary: this.mail.baseBoundary,
                  textEncoding: this.mail.textEncoding,
                  boundaryPrefix: this.mail.boundaryPrefix,
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })),
            this._useAlternative
              ? this._createAlternative(e)
              : this._useRelated && this._createRelated(e),
            []
              .concat((!this._useAlternative && this._alternatives) || [])
              .concat(this._attachments.attached || [])
              .forEach(t => {
                ;(this._useRelated && t === this._htmlNode) ||
                  this._createContentNode(e, t)
              }),
            e
          )
        }
        _createAlternative(t) {
          let e
          return (
            (e = t
              ? t.createChild('multipart/alternative', {
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })
              : new n('multipart/alternative', {
                  baseBoundary: this.mail.baseBoundary,
                  textEncoding: this.mail.textEncoding,
                  boundaryPrefix: this.mail.boundaryPrefix,
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })),
            this._alternatives.forEach(t => {
              this._useRelated && this._htmlNode === t
                ? this._createRelated(e)
                : this._createContentNode(e, t)
            }),
            e
          )
        }
        _createRelated(t) {
          let e
          return (
            (e = t
              ? t.createChild('multipart/related; type="text/html"', {
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })
              : new n('multipart/related; type="text/html"', {
                  baseBoundary: this.mail.baseBoundary,
                  textEncoding: this.mail.textEncoding,
                  boundaryPrefix: this.mail.boundaryPrefix,
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })),
            this._createContentNode(e, this._htmlNode),
            this._attachments.related.forEach(t =>
              this._createContentNode(e, t),
            ),
            e
          )
        }
        _createContentNode(t, e) {
          let i
          ;(e = e || {}).content = e.content || ''
          let a = (e.encoding || 'utf8')
            .toString()
            .toLowerCase()
            .replace(/[-_\s]/g, '')
          return (
            (i = t
              ? t.createChild(e.contentType, {
                  filename: e.filename,
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                  normalizeHeaderKey: this.mail.normalizeHeaderKey,
                })
              : new n(e.contentType, {
                  filename: e.filename,
                  baseBoundary: this.mail.baseBoundary,
                  textEncoding: this.mail.textEncoding,
                  boundaryPrefix: this.mail.boundaryPrefix,
                  disableUrlAccess: this.mail.disableUrlAccess,
                  disableFileAccess: this.mail.disableFileAccess,
                })),
            e.headers && i.addHeader(e.headers),
            e.cid &&
              i.setHeader('Content-Id', '<' + e.cid.replace(/[<>]/g, '') + '>'),
            e.contentTransferEncoding
              ? i.setHeader(
                  'Content-Transfer-Encoding',
                  e.contentTransferEncoding,
                )
              : this.mail.encoding &&
                /^text\//i.test(e.contentType) &&
                i.setHeader('Content-Transfer-Encoding', this.mail.encoding),
            (/^text\//i.test(e.contentType) && !e.contentDisposition) ||
              i.setHeader(
                'Content-Disposition',
                e.contentDisposition || (e.cid ? 'inline' : 'attachment'),
              ),
            'string' != typeof e.content ||
              ['utf8', 'usascii', 'ascii'].includes(a) ||
              (e.content = Buffer.from(e.content, a)),
            e.raw ? i.setRaw(e.raw) : i.setContent(e.content),
            i
          )
        }
        _processDataUrl(t) {
          let e = (t.path || t.href).match(
            /^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i,
          )
          return e
            ? ((t.content = /\bbase64$/i.test(e[1])
                ? Buffer.from(e[2], 'base64')
                : Buffer.from(decodeURIComponent(e[2]))),
              'path' in t && (t.path = !1),
              'href' in t && (t.href = !1),
              e[1].split(';').forEach(e => {
                ;/^\w+\/[^\/]+$/i.test(e) &&
                  (t.contentType = t.contentType || e.toLowerCase())
              }),
              t)
            : t
        }
      }
    },
    function(t, e, i) {
      'use strict'
      class n {
        constructor(t) {
          ;(this.str = (t || '').toString()),
            (this.operatorCurrent = ''),
            (this.operatorExpecting = ''),
            (this.node = null),
            (this.escaped = !1),
            (this.list = []),
            (this.operators = {
              '"': '"',
              '(': ')',
              '<': '>',
              ',': '',
              ':': ';',
              ';': '',
            })
        }
        tokenize() {
          let t,
            e = []
          for (let e = 0, i = this.str.length; e < i; e++)
            (t = this.str.charAt(e)), this.checkChar(t)
          return (
            this.list.forEach(t => {
              ;(t.value = (t.value || '').toString().trim()),
                t.value && e.push(t)
            }),
            e
          )
        }
        checkChar(t) {
          if ((t in this.operators || '\\' === t) && this.escaped)
            this.escaped = !1
          else {
            if (this.operatorExpecting && t === this.operatorExpecting)
              return (
                (this.node = {type: 'operator', value: t}),
                this.list.push(this.node),
                (this.node = null),
                (this.operatorExpecting = ''),
                void (this.escaped = !1)
              )
            if (!this.operatorExpecting && t in this.operators)
              return (
                (this.node = {type: 'operator', value: t}),
                this.list.push(this.node),
                (this.node = null),
                (this.operatorExpecting = this.operators[t]),
                void (this.escaped = !1)
              )
          }
          this.escaped || '\\' !== t
            ? (this.node ||
                ((this.node = {type: 'text', value: ''}),
                this.list.push(this.node)),
              this.escaped && '\\' !== t && (this.node.value += '\\'),
              (this.node.value += t),
              (this.escaped = !1))
            : (this.escaped = !0)
        }
      }
      function a(t) {
        let e = new n(t).tokenize(),
          i = [],
          r = [],
          o = []
        return (
          e.forEach(t => {
            'operator' !== t.type || (',' !== t.value && ';' !== t.value)
              ? r.push(t)
              : (r.length && i.push(r), (r = []))
          }),
          r.length && i.push(r),
          i.forEach(t => {
            ;(t = (function(t) {
              let e,
                i,
                n,
                r,
                o = !1,
                s = 'text',
                l = [],
                c = {address: [], comment: [], group: [], text: []}
              for (n = 0, r = t.length; n < r; n++)
                if ('operator' === (e = t[n]).type)
                  switch (e.value) {
                    case '<':
                      s = 'address'
                      break
                    case '(':
                      s = 'comment'
                      break
                    case ':':
                      ;(s = 'group'), (o = !0)
                      break
                    default:
                      s = 'text'
                  }
                else
                  e.value &&
                    ('address' === s &&
                      (e.value = e.value.replace(/^[^<]*<\s*/, '')),
                    c[s].push(e.value))
              if (
                (!c.text.length &&
                  c.comment.length &&
                  ((c.text = c.comment), (c.comment = [])),
                o)
              )
                (c.text = c.text.join(' ')),
                  l.push({
                    name: c.text || (i && i.name),
                    group: c.group.length ? a(c.group.join(',')) : [],
                  })
              else {
                if (!c.address.length && c.text.length) {
                  for (n = c.text.length - 1; n >= 0; n--)
                    if (c.text[n].match(/^[^@\s]+@[^@\s]+$/)) {
                      c.address = c.text.splice(n, 1)
                      break
                    }
                  let t = function(t) {
                    return c.address.length
                      ? t
                      : ((c.address = [t.trim()]), ' ')
                  }
                  if (!c.address.length)
                    for (
                      n = c.text.length - 1;
                      n >= 0 &&
                      ((c.text[n] = c.text[n]
                        .replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, t)
                        .trim()),
                      !c.address.length);
                      n--
                    );
                }
                if (
                  (!c.text.length &&
                    c.comment.length &&
                    ((c.text = c.comment), (c.comment = [])),
                  c.address.length > 1 &&
                    (c.text = c.text.concat(c.address.splice(1))),
                  (c.text = c.text.join(' ')),
                  (c.address = c.address.join(' ')),
                  !c.address && o)
                )
                  return []
                ;(i = {
                  address: c.address || c.text || '',
                  name: c.text || c.address || '',
                }).address === i.name &&
                  ((i.address || '').match(/@/)
                    ? (i.name = '')
                    : (i.address = '')),
                  l.push(i)
              }
              return l
            })(t)).length && (o = o.concat(t))
          }),
          o
        )
      }
      t.exports = a
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      t.exports = class extends n {
        constructor() {
          super(), (this.lastByte = !1)
        }
        _transform(t, e, i) {
          t.length && (this.lastByte = t[t.length - 1]), this.push(t), i()
        }
        _flush(t) {
          return 10 === this.lastByte
            ? t()
            : 13 === this.lastByte
            ? (this.push(Buffer.from('\n')), t())
            : (this.push(Buffer.from('\r\n')), t())
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(173),
        a = i(174),
        r = i(175),
        o = i(1).PassThrough,
        s = i(21),
        l = i(16),
        c = i(11),
        p = 'sha256',
        u = 131072
      class d {
        constructor(t, e, i, n) {
          ;(this.options = t || {}),
            (this.keys = e),
            (this.cacheTreshold = Number(this.options.cacheTreshold) || u),
            (this.hashAlgo = this.options.hashAlgo || p),
            (this.cacheDir = this.options.cacheDir || !1),
            (this.chunks = []),
            (this.chunklen = 0),
            (this.readPos = 0),
            (this.cachePath =
              !!this.cacheDir &&
              l.join(
                this.cacheDir,
                'message.' +
                  Date.now() +
                  '-' +
                  c.randomBytes(14).toString('hex'),
              )),
            (this.cache = !1),
            (this.headers = !1),
            (this.bodyHash = !1),
            (this.parser = !1),
            (this.relaxedBody = !1),
            (this.input = i),
            (this.output = n),
            (this.output.usingCache = !1),
            (this.errored = !1),
            this.input.on('error', t => {
              ;(this.errored = !0), this.cleanup(), n.emit('error', t)
            })
        }
        cleanup() {
          this.cache && this.cachePath && s.unlink(this.cachePath, () => !1)
        }
        createReadCache() {
          ;(this.cache = s.createReadStream(this.cachePath)),
            this.cache.once('error', t => {
              this.cleanup(), this.output.emit('error', t)
            }),
            this.cache.once('close', () => {
              this.cleanup()
            }),
            this.cache.pipe(this.output)
        }
        sendNextChunk() {
          if (this.errored) return
          if (this.readPos >= this.chunks.length)
            return this.cache ? this.createReadCache() : this.output.end()
          let t = this.chunks[this.readPos++]
          if (!1 === this.output.write(t))
            return this.output.once('drain', () => {
              this.sendNextChunk()
            })
          setImmediate(() => this.sendNextChunk())
        }
        sendSignedOutput() {
          let t = 0,
            e = () => {
              if (t >= this.keys.length)
                return (
                  this.output.write(this.parser.rawHeaders),
                  setImmediate(() => this.sendNextChunk())
                )
              let i = this.keys[t++],
                n = r(this.headers, this.hashAlgo, this.bodyHash, {
                  domainName: i.domainName,
                  keySelector: i.keySelector,
                  privateKey: i.privateKey,
                  headerFieldNames: this.options.headerFieldNames,
                  skipFields: this.options.skipFields,
                })
              return (
                n && this.output.write(Buffer.from(n + '\r\n')), setImmediate(e)
              )
            }
          if (this.bodyHash && this.headers) return e()
          this.output.write(this.parser.rawHeaders), this.sendNextChunk()
        }
        createWriteCache() {
          ;(this.output.usingCache = !0),
            (this.cache = s.createWriteStream(this.cachePath)),
            this.cache.once('error', t => {
              this.cleanup(),
                this.relaxedBody.unpipe(this.cache),
                this.relaxedBody.on('readable', () => {
                  for (; null !== this.relaxedBody.read(); );
                }),
                (this.errored = !0),
                this.output.emit('error', t)
            }),
            this.cache.once('close', () => {
              this.sendSignedOutput()
            }),
            this.relaxedBody.removeAllListeners('readable'),
            this.relaxedBody.pipe(this.cache)
        }
        signStream() {
          ;(this.parser = new n()),
            (this.relaxedBody = new a({hashAlgo: this.hashAlgo})),
            this.parser.on('headers', t => {
              this.headers = t
            }),
            this.relaxedBody.on('hash', t => {
              this.bodyHash = t
            }),
            this.relaxedBody.on('readable', () => {
              let t
              if (!this.cache)
                for (; null !== (t = this.relaxedBody.read()); )
                  if (
                    (this.chunks.push(t),
                    (this.chunklen += t.length),
                    this.chunklen >= this.cacheTreshold && this.cachePath)
                  )
                    return this.createWriteCache()
            }),
            this.relaxedBody.on('end', () => {
              this.cache || this.sendSignedOutput()
            }),
            this.parser.pipe(this.relaxedBody),
            setImmediate(() => this.input.pipe(this.parser))
        }
      }
      t.exports = class {
        constructor(t) {
          ;(this.options = t || {}),
            (this.keys = [].concat(
              this.options.keys || {
                domainName: t.domainName,
                keySelector: t.keySelector,
                privateKey: t.privateKey,
              },
            ))
        }
        sign(t, e) {
          let i = new o(),
            n = t,
            a = !1
          Buffer.isBuffer(t)
            ? ((a = t), (n = new o()))
            : 'string' == typeof t && ((a = Buffer.from(t)), (n = new o()))
          let r = this.options
          e &&
            Object.keys(e).length &&
            ((r = {}),
            Object.keys(this.options || {}).forEach(t => {
              r[t] = this.options[t]
            }),
            Object.keys(e || {}).forEach(t => {
              t in r || (r[t] = e[t])
            }))
          let s = new d(r, this.keys, n, i)
          return (
            setImmediate(() => {
              s.signStream(),
                a &&
                  setImmediate(() => {
                    n.end(a)
                  })
            }),
            i
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      t.exports = class extends n {
        constructor(t) {
          super(t),
            (this.lastBytes = Buffer.alloc(4)),
            (this.headersParsed = !1),
            (this.headerBytes = 0),
            (this.headerChunks = []),
            (this.rawHeaders = !1),
            (this.bodySize = 0)
        }
        updateLastBytes(t) {
          let e = this.lastBytes.length,
            i = Math.min(t.length, e)
          for (let t = 0, n = e - i; t < n; t++)
            this.lastBytes[t] = this.lastBytes[t + i]
          for (let n = 1; n <= i; n++) this.lastBytes[e - n] = t[t.length - n]
        }
        checkHeaders(t) {
          if (this.headersParsed) return !0
          let e = this.lastBytes.length,
            i = 0
          this.curLinePos = 0
          for (let n = 0, a = this.lastBytes.length + t.length; n < a; n++) {
            let a
            if (10 === (a = n < e ? this.lastBytes[n] : t[n - e]) && n) {
              let a = n - 1 < e ? this.lastBytes[n - 1] : t[n - 1 - e],
                r = n > 1 && (n - 2 < e ? this.lastBytes[n - 2] : t[n - 2 - e])
              if (10 === a) {
                ;(this.headersParsed = !0),
                  (i = n - e + 1),
                  (this.headerBytes += i)
                break
              }
              if (13 === a && 10 === r) {
                ;(this.headersParsed = !0),
                  (i = n - e + 1),
                  (this.headerBytes += i)
                break
              }
            }
          }
          if (this.headersParsed) {
            if (
              (this.headerChunks.push(t.slice(0, i)),
              (this.rawHeaders = Buffer.concat(
                this.headerChunks,
                this.headerBytes,
              )),
              (this.headerChunks = null),
              this.emit('headers', this.parseHeaders()),
              t.length - 1 > i)
            ) {
              let e = t.slice(i)
              ;(this.bodySize += e.length), setImmediate(() => this.push(e))
            }
            return !1
          }
          return (
            (this.headerBytes += t.length),
            this.headerChunks.push(t),
            this.updateLastBytes(t),
            !1
          )
        }
        _transform(t, e, i) {
          if (!t || !t.length) return i()
          let n
          'string' == typeof t && (t = Buffer.from(t, e))
          try {
            n = this.checkHeaders(t)
          } catch (t) {
            return i(t)
          }
          n && ((this.bodySize += t.length), this.push(t)), setImmediate(i)
        }
        _flush(t) {
          if (this.headerChunks) {
            let t = Buffer.concat(this.headerChunks, this.headerBytes)
            ;(this.bodySize += t.length),
              this.push(t),
              (this.headerChunks = null)
          }
          t()
        }
        parseHeaders() {
          let t = (this.rawHeaders || '').toString().split(/\r?\n/)
          for (let e = t.length - 1; e > 0; e--)
            /^\s/.test(t[e]) && ((t[e - 1] += '\n' + t[e]), t.splice(e, 1))
          return t
            .filter(t => t.trim())
            .map(t => ({
              key: t
                .substr(0, t.indexOf(':'))
                .trim()
                .toLowerCase(),
              line: t,
            }))
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform,
        a = i(11)
      t.exports = class extends n {
        constructor(t) {
          super(),
            (t = t || {}),
            (this.chunkBuffer = []),
            (this.chunkBufferLen = 0),
            (this.bodyHash = a.createHash(t.hashAlgo || 'sha1')),
            (this.remainder = ''),
            (this.byteLength = 0),
            (this.debug = t.debug),
            (this._debugBody = !!t.debug && [])
        }
        updateHash(t) {
          let e,
            i = '',
            n = 'file'
          for (let e = t.length - 1; e >= 0; e--) {
            let a = t[e]
            if ('file' !== n || (10 !== a && 13 !== a))
              if ('file' !== n || (9 !== a && 32 !== a)) {
                if (
                  ('line' !== n || (9 !== a && 32 !== a)) &&
                  ('file' === n || 'line' === n) &&
                  ((n = 'body'), e === t.length - 1)
                )
                  break
              } else n = 'line'
            if (0 === e) {
              if (
                ('file' === n &&
                  (!this.remainder || /[\r\n]$/.test(this.remainder))) ||
                ('line' === n &&
                  (!this.remainder || /[ \t]$/.test(this.remainder)))
              )
                return void (this.remainder += t.toString('binary'))
              if ('line' === n || 'file' === n) {
                ;(i = t.toString('binary')), (t = !1)
                break
              }
            }
            if ('body' === n) {
              ;(i = t.slice(e + 1).toString('binary')), (t = t.slice(0, e + 1))
              break
            }
          }
          let a = !!this.remainder
          if (t && !a)
            for (let e = 0, i = t.length; e < i; e++) {
              if (e && 10 === t[e] && 13 !== t[e - 1]) {
                a = !0
                break
              }
              if (e && 13 === t[e] && 32 === t[e - 1]) {
                a = !0
                break
              }
              if (e && 32 === t[e] && 32 === t[e - 1]) {
                a = !0
                break
              }
              if (9 === t[e]) {
                a = !0
                break
              }
            }
          a
            ? ((e = this.remainder + (t ? t.toString('binary') : '')),
              (this.remainder = i),
              (e = e
                .replace(/\r?\n/g, '\n')
                .replace(/[ \t]*$/gm, '')
                .replace(/[ \t]+/gm, ' ')
                .replace(/\n/g, '\r\n')),
              (t = Buffer.from(e, 'binary')))
            : i && (this.remainder = i),
            this.debug && this._debugBody.push(t),
            this.bodyHash.update(t)
        }
        _transform(t, e, i) {
          if (!t || !t.length) return i()
          'string' == typeof t && (t = Buffer.from(t, e)),
            this.updateHash(t),
            (this.byteLength += t.length),
            this.push(t),
            i()
        }
        _flush(t) {
          ;/[\r\n]$/.test(this.remainder) &&
            this.byteLength > 2 &&
            this.bodyHash.update(Buffer.from('\r\n')),
            this.byteLength || this.push(Buffer.from('\r\n')),
            this.emit(
              'hash',
              this.bodyHash.digest('base64'),
              !!this.debug && Buffer.concat(this._debugBody),
            ),
            t()
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(71),
        a = i(34),
        r = i(11)
      function o(t, e, i) {
        let n = new Set(),
          a = new Set(),
          r = new Map()
        ;(i || '')
          .toLowerCase()
          .split(':')
          .forEach(t => {
            a.add(t.trim())
          }),
          (e || '')
            .toLowerCase()
            .split(':')
            .filter(t => !a.has(t.trim()))
            .forEach(t => {
              n.add(t.trim())
            })
        for (let e = t.length - 1; e >= 0; e--) {
          let i = t[e]
          n.has(i.key) && !r.has(i.key) && r.set(i.key, s(i.line))
        }
        let o = [],
          l = []
        return (
          n.forEach(t => {
            r.has(t) && (l.push(t), o.push(t + ':' + r.get(t)))
          }),
          {headers: o.join('\r\n') + '\r\n', fieldNames: l.join(':')}
        )
      }
      function s(t) {
        return t
          .substr(t.indexOf(':') + 1)
          .replace(/\r?\n/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      }
      ;(t.exports = (t, e, i, l) => {
        let c,
          p,
          u = o(
            t,
            (l = l || {}).headerFieldNames ||
              'From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive',
            l.skipFields,
          ),
          d = (function(t, e, i, r, o) {
            let s = [
              'v=1',
              'a=rsa-' + r,
              'c=relaxed/relaxed',
              'd=' + n.toASCII(t),
              'q=dns/txt',
              's=' + e,
              'bh=' + o,
              'h=' + i,
            ].join('; ')
            return a.foldLines('DKIM-Signature: ' + s, 76) + ';\r\n b='
          })(l.domainName, l.keySelector, u.fieldNames, e, i)
        ;(u.headers += 'dkim-signature:' + s(d)),
          (c = r.createSign(('rsa-' + e).toUpperCase())).update(u.headers)
        try {
          p = c.sign(l.privateKey, 'base64')
        } catch (t) {
          return !1
        }
        return d + p.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, '$&\r\n ').trim()
      }),
        (t.exports.relaxedHeaders = o)
    },
    function(t, e, i) {
      'use strict'
      const n = i(32),
        a = i(74),
        r = i(8)
      t.exports = function(t, e, i, o) {
        let s,
          l,
          c,
          p = r.parse(t)
        ;(s = {
          host: p.hostname,
          port: Number(p.port)
            ? Number(p.port)
            : 'https:' === p.protocol
            ? 443
            : 80,
        }),
          'https:' === p.protocol
            ? ((s.rejectUnauthorized = !1), (l = a.connect.bind(a)))
            : (l = n.connect.bind(n))
        let u = !1,
          d = function(t) {
            if (!u) {
              u = !0
              try {
                c.destroy()
              } catch (t) {}
              o(t)
            }
          }
        ;(c = l(s, () => {
          if (u) return
          let t = {Host: i + ':' + e, Connection: 'close'}
          p.auth &&
            (t['Proxy-Authorization'] =
              'Basic ' + Buffer.from(p.auth).toString('base64')),
            c.write(
              'CONNECT ' +
                i +
                ':' +
                e +
                ' HTTP/1.1\r\n' +
                Object.keys(t)
                  .map(e => e + ': ' + t[e])
                  .join('\r\n') +
                '\r\n\r\n',
            )
          let n = '',
            a = t => {
              let e, i
              if (!u && (e = (n += t.toString('binary')).match(/\r\n\r\n/))) {
                if (
                  (c.removeListener('data', a),
                  (i = n.substr(e.index + e[0].length)),
                  (n = n.substr(0, e.index)),
                  i && c.unshift(Buffer.from(i, 'binary')),
                  (u = !0),
                  !(e = n.match(/^HTTP\/\d+\.\d+ (\d+)/i)) ||
                    '2' !== (e[1] || '').charAt(0))
                ) {
                  try {
                    c.destroy()
                  } catch (t) {}
                  return o(
                    new Error(
                      'Invalid response from proxy' +
                        ((e && ': ' + e[1]) || ''),
                    ),
                  )
                }
                return c.removeListener('error', d), o(null, c)
              }
            }
          c.on('data', a)
        })).once('error', d)
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(3),
        a = i(70),
        r = i(34)
      t.exports = class {
        constructor(t, e) {
          ;(this.mailer = t),
            (this.data = {}),
            (this.message = null),
            (e = e || {})
          let i = t.options || {},
            n = t._defaults || {}
          Object.keys(e).forEach(t => {
            this.data[t] = e[t]
          }),
            (this.data.headers = this.data.headers || {}),
            Object.keys(n).forEach(t => {
              t in this.data
                ? 'headers' === t &&
                  Object.keys(n.headers).forEach(t => {
                    t in this.data.headers ||
                      (this.data.headers[t] = n.headers[t])
                  })
                : (this.data[t] = n[t])
            }),
            [
              'disableFileAccess',
              'disableUrlAccess',
              'normalizeHeaderKey',
            ].forEach(t => {
              t in i && (this.data[t] = i[t])
            })
        }
        resolveContent(...t) {
          return n.resolveContent(...t)
        }
        resolveAll(t) {
          let e = [
            [this.data, 'html'],
            [this.data, 'text'],
            [this.data, 'watchHtml'],
            [this.data, 'icalEvent'],
          ]
          this.data.alternatives &&
            this.data.alternatives.length &&
            this.data.alternatives.forEach((t, i) => {
              e.push([this.data.alternatives, i])
            }),
            this.data.attachments &&
              this.data.attachments.length &&
              this.data.attachments.forEach((t, i) => {
                t.filename ||
                  ((t.filename =
                    (t.path || t.href || '')
                      .split('/')
                      .pop()
                      .split('?')
                      .shift() || 'attachment-' + (i + 1)),
                  t.filename.indexOf('.') < 0 &&
                    (t.filename += '.' + r.detectExtension(t.contentType))),
                  t.contentType ||
                    (t.contentType = r.detectMimeType(
                      t.filename || t.path || t.href || 'bin',
                    )),
                  e.push([this.data.attachments, i])
              })
          let i = new a()
          ;['from', 'to', 'cc', 'bcc', 'sender', 'replyTo'].forEach(t => {
            let e
            this.message
              ? (e = [].concat(
                  i._parseAddresses(
                    this.message.getHeader('replyTo' === t ? 'reply-to' : t),
                  ) || [],
                ))
              : this.data[t] &&
                (e = [].concat(i._parseAddresses(this.data[t]) || [])),
              e && e.length
                ? (this.data[t] = e)
                : t in this.data && (this.data[t] = null)
          }),
            ['from', 'sender', 'replyTo'].forEach(t => {
              this.data[t] && (this.data[t] = this.data[t].shift())
            })
          let o = 0,
            s = () => {
              if (o >= e.length) return t(null, this.data)
              let i = e[o++]
              if (!i[0] || !i[0][i[1]]) return s()
              n.resolveContent(...i, (e, n) => {
                if (e) return t(e)
                let a = {content: n}
                i[0][i[1]] &&
                  'object' == typeof i[0][i[1]] &&
                  !Buffer.isBuffer(i[0][i[1]]) &&
                  Object.keys(i[0][i[1]]).forEach(t => {
                    t in a ||
                      ['content', 'path', 'href', 'raw'].includes(t) ||
                      (a[t] = i[0][i[1]][t])
                  }),
                  (i[0][i[1]] = a),
                  s()
              })
            }
          setImmediate(() => s())
        }
        normalize(t) {
          let e = this.data.envelope || this.message.getEnvelope(),
            i = this.message.messageId()
          this.resolveAll((n, a) =>
            n
              ? t(n)
              : ((a.envelope = e),
                (a.messageId = i),
                ['html', 'text', 'watchHtml'].forEach(t => {
                  a[t] &&
                    a[t].content &&
                    ('string' == typeof a[t].content
                      ? (a[t] = a[t].content)
                      : Buffer.isBuffer(a[t].content) &&
                        (a[t] = a[t].content.toString()))
                }),
                a.icalEvent &&
                  Buffer.isBuffer(a.icalEvent.content) &&
                  ((a.icalEvent.content = a.icalEvent.content.toString(
                    'base64',
                  )),
                  (a.icalEvent.encoding = 'base64')),
                a.alternatives &&
                  a.alternatives.length &&
                  a.alternatives.forEach(t => {
                    t &&
                      t.content &&
                      Buffer.isBuffer(t.content) &&
                      ((t.content = t.content.toString('base64')),
                      (t.encoding = 'base64'))
                  }),
                a.attachments &&
                  a.attachments.length &&
                  a.attachments.forEach(t => {
                    t &&
                      t.content &&
                      Buffer.isBuffer(t.content) &&
                      ((t.content = t.content.toString('base64')),
                      (t.encoding = 'base64'))
                  }),
                (a.normalizedHeaders = {}),
                Object.keys(a.headers || {}).forEach(t => {
                  let e = [].concat(a.headers[t] || []).shift()
                  ;(e = (e && e.value) || e) &&
                    ([
                      'references',
                      'in-reply-to',
                      'message-id',
                      'content-id',
                    ].includes(t) &&
                      (e = this.message._encodeHeaderValue(t, e)),
                    (a.normalizedHeaders[t] = e))
                }),
                a.list &&
                  'object' == typeof a.list &&
                  this._getListHeaders(a.list).forEach(t => {
                    a.normalizedHeaders[t.key] = t.value
                      .map(t => (t && t.value) || t)
                      .join(', ')
                  }),
                a.references &&
                  (a.normalizedHeaders.references = this.message._encodeHeaderValue(
                    'references',
                    a.references,
                  )),
                a.inReplyTo &&
                  (a.normalizedHeaders[
                    'in-reply-to'
                  ] = this.message._encodeHeaderValue(
                    'in-reply-to',
                    a.inReplyTo,
                  )),
                t(null, a)),
          )
        }
        setMailerHeader() {
          this.message &&
            this.data.xMailer &&
            this.message.setHeader('X-Mailer', this.data.xMailer)
        }
        setPriorityHeaders() {
          if (this.message && this.data.priority)
            switch ((this.data.priority || '').toString().toLowerCase()) {
              case 'high':
                this.message.setHeader('X-Priority', '1 (Highest)'),
                  this.message.setHeader('X-MSMail-Priority', 'High'),
                  this.message.setHeader('Importance', 'High')
                break
              case 'low':
                this.message.setHeader('X-Priority', '5 (Lowest)'),
                  this.message.setHeader('X-MSMail-Priority', 'Low'),
                  this.message.setHeader('Importance', 'Low')
            }
        }
        setListHeaders() {
          this.message &&
            this.data.list &&
            'object' == typeof this.data.list &&
            this.data.list &&
            'object' == typeof this.data.list &&
            this._getListHeaders(this.data.list).forEach(t => {
              t.value.forEach(e => {
                this.message.addHeader(t.key, e)
              })
            })
        }
        _getListHeaders(t) {
          return Object.keys(t).map(e => ({
            key: 'list-' + e.toLowerCase().trim(),
            value: [].concat(t[e] || []).map(t => ({
              prepared: !0,
              foldLines: !0,
              value: []
                .concat(t || [])
                .map(t => {
                  if (('string' == typeof t && (t = {url: t}), t && t.url)) {
                    if ('id' === e.toLowerCase().trim()) {
                      let e = t.comment || ''
                      return (
                        (e = r.isPlainText(e)
                          ? '"' + e + '"'
                          : r.encodeWord(e)),
                        (t.comment ? e + ' ' : '') +
                          this._formatListUrl(t.url).replace(
                            /^<[^:]+\/{,2}/,
                            '',
                          )
                      )
                    }
                    let i = t.comment || ''
                    return (
                      r.isPlainText(i) || (i = r.encodeWord(i)),
                      this._formatListUrl(t.url) +
                        (t.comment ? ' (' + i + ')' : '')
                    )
                  }
                  return ''
                })
                .filter(t => t)
                .join(', '),
            })),
          }))
        }
        _formatListUrl(t) {
          return (
            (t = t.replace(/[\s<]+|[\s>]+/g, '')),
            /^(https?|mailto|ftp):/.test(t)
              ? '<' + t + '>'
              : /^[^@]+@[^@]+$/.test(t)
              ? '<mailto:' + t + '>'
              : '<http://' + t + '>'
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(15),
        a = i(179),
        r = i(43),
        o = i(76),
        s = i(3),
        l = i(9)
      t.exports = class extends n {
        constructor(t) {
          let e
          super(), 'string' == typeof (t = t || {}) && (t = {url: t})
          let i = t.service
          'function' == typeof t.getSocket && (this.getSocket = t.getSocket),
            t.url && ((e = s.parseConnectionUrl(t.url)), (i = i || e.service)),
            (this.options = s.assign(!1, t, e, i && o(i))),
            (this.options.maxConnections = this.options.maxConnections || 5),
            (this.options.maxMessages = this.options.maxMessages || 100),
            (this.logger = s.getLogger(this.options, {
              component: this.options.component || 'smtp-pool',
            }))
          let n = new r(this.options)
          ;(this.name = 'SMTP (pool)'),
            (this.version = l.version + '[client:' + n.version + ']'),
            (this._rateLimit = {
              counter: 0,
              timeout: null,
              waiting: [],
              checkpoint: !1,
              delta: Number(this.options.rateDelta) || 1e3,
              limit: Number(this.options.rateLimit) || 0,
            }),
            (this._closed = !1),
            (this._queue = []),
            (this._connections = []),
            (this._connectionCounter = 0),
            (this.idling = !0),
            setImmediate(() => {
              this.idling && this.emit('idle')
            })
        }
        getSocket(t, e) {
          return setImmediate(() => e(null, !1))
        }
        send(t, e) {
          return (
            !this._closed &&
            (this._queue.push({mail: t, callback: e}),
            this.idling &&
              this._queue.length >= this.options.maxConnections &&
              (this.idling = !1),
            setImmediate(() => this._processMessages()),
            !0)
          )
        }
        close() {
          let t,
            e = this._connections.length
          if (
            ((this._closed = !0),
            clearTimeout(this._rateLimit.timeout),
            !e && !this._queue.length)
          )
            return
          for (let i = e - 1; i >= 0; i--)
            this._connections[i] &&
              this._connections[i].available &&
              ((t = this._connections[i]).close(),
              this.logger.info(
                {tnx: 'connection', cid: t.id, action: 'removed'},
                'Connection #%s removed',
                t.id,
              ))
          if (
            (e &&
              !this._connections.length &&
              this.logger.debug({tnx: 'connection'}, 'All connections removed'),
            !this._queue.length)
          )
            return
          let i = () => {
            if (!this._queue.length)
              return void this.logger.debug(
                {tnx: 'connection'},
                'Pending queue entries cleared',
              )
            let e = this._queue.shift()
            if (e && 'function' == typeof e.callback)
              try {
                e.callback(new Error('Connection pool was closed'))
              } catch (e) {
                this.logger.error(
                  {err: e, tnx: 'callback', cid: t.id},
                  'Callback error for #%s: %s',
                  t.id,
                  e.message,
                )
              }
            setImmediate(i)
          }
          setImmediate(i)
        }
        _processMessages() {
          let t, e, i
          if (this._closed) return
          if (!this._queue.length)
            return void (this.idling || ((this.idling = !0), this.emit('idle')))
          for (e = 0, i = this._connections.length; e < i; e++)
            if (this._connections[e].available) {
              t = this._connections[e]
              break
            }
          if (
            (!t &&
              this._connections.length < this.options.maxConnections &&
              (t = this._createConnection()),
            !t)
          )
            return void (this.idling = !1)
          !this.idling &&
            this._queue.length < this.options.maxConnections &&
            ((this.idling = !0), this.emit('idle'))
          let n = (t.queueEntry = this._queue.shift())
          ;(n.messageId = (
            t.queueEntry.mail.message.getHeader('message-id') || ''
          ).replace(/[<>\s]/g, '')),
            (t.available = !1),
            this.logger.debug(
              {
                tnx: 'pool',
                cid: t.id,
                messageId: n.messageId,
                action: 'assign',
              },
              'Assigned message <%s> to #%s (%s)',
              n.messageId,
              t.id,
              t.messages + 1,
            ),
            this._rateLimit.limit &&
              (this._rateLimit.counter++,
              this._rateLimit.checkpoint ||
                (this._rateLimit.checkpoint = Date.now())),
            t.send(n.mail, (e, i) => {
              if (n === t.queueEntry) {
                try {
                  n.callback(e, i)
                } catch (e) {
                  this.logger.error(
                    {err: e, tnx: 'callback', cid: t.id},
                    'Callback error for #%s: %s',
                    t.id,
                    e.message,
                  )
                }
                t.queueEntry = !1
              }
            })
        }
        _createConnection() {
          let t = new a(this)
          return (
            (t.id = ++this._connectionCounter),
            this.logger.info(
              {tnx: 'pool', cid: t.id, action: 'conection'},
              'Created new pool resource #%s',
              t.id,
            ),
            t.on('available', () => {
              this.logger.debug(
                {tnx: 'connection', cid: t.id, action: 'available'},
                'Connection #%s became available',
                t.id,
              ),
                this._closed ? this.close() : this._processMessages()
            }),
            t.once('error', e => {
              if (
                ('EMAXLIMIT' !== e.code
                  ? this.logger.error(
                      {err: e, tnx: 'pool', cid: t.id},
                      'Pool Error for #%s: %s',
                      t.id,
                      e.message,
                    )
                  : this.logger.debug(
                      {tnx: 'pool', cid: t.id, action: 'maxlimit'},
                      'Max messages limit exchausted for #%s',
                      t.id,
                    ),
                t.queueEntry)
              ) {
                try {
                  t.queueEntry.callback(e)
                } catch (e) {
                  this.logger.error(
                    {err: e, tnx: 'callback', cid: t.id},
                    'Callback error for #%s: %s',
                    t.id,
                    e.message,
                  )
                }
                t.queueEntry = !1
              }
              this._removeConnection(t), this._continueProcessing()
            }),
            t.once('close', () => {
              this.logger.info(
                {tnx: 'connection', cid: t.id, action: 'closed'},
                'Connection #%s was closed',
                t.id,
              ),
                this._removeConnection(t),
                t.queueEntry
                  ? setTimeout(() => {
                      t.queueEntry &&
                        (this.logger.debug(
                          {
                            tnx: 'pool',
                            cid: t.id,
                            messageId: t.queueEntry.messageId,
                            action: 'requeue',
                          },
                          'Re-queued message <%s> for #%s',
                          t.queueEntry.messageId,
                          t.id,
                        ),
                        this._queue.unshift(t.queueEntry),
                        (t.queueEntry = !1)),
                        this._continueProcessing()
                    }, 50)
                  : this._continueProcessing()
            }),
            this._connections.push(t),
            t
          )
        }
        _continueProcessing() {
          this._closed
            ? this.close()
            : setTimeout(() => this._processMessages(), 100)
        }
        _removeConnection(t) {
          let e = this._connections.indexOf(t)
          ;-1 !== e && this._connections.splice(e, 1)
        }
        _checkRateLimit(t) {
          if (!this._rateLimit.limit) return t()
          let e = Date.now()
          return this._rateLimit.counter < this._rateLimit.limit
            ? t()
            : (this._rateLimit.waiting.push(t),
              this._rateLimit.checkpoint <= e - this._rateLimit.delta
                ? this._clearRateLimit()
                : void (
                    this._rateLimit.timeout ||
                    ((this._rateLimit.timeout = setTimeout(
                      () => this._clearRateLimit(),
                      this._rateLimit.delta - (e - this._rateLimit.checkpoint),
                    )),
                    (this._rateLimit.checkpoint = e))
                  ))
        }
        _clearRateLimit() {
          for (
            clearTimeout(this._rateLimit.timeout),
              this._rateLimit.timeout = null,
              this._rateLimit.counter = 0,
              this._rateLimit.checkpoint = !1;
            this._rateLimit.waiting.length;

          ) {
            let t = this._rateLimit.waiting.shift()
            setImmediate(t)
          }
        }
        isIdle() {
          return this.idling
        }
        verify(t) {
          let e
          t ||
            (e = new Promise((e, i) => {
              t = s.callbackPromise(e, i)
            }))
          let i = new a(this).auth
          return (
            this.getSocket(this.options, (e, n) => {
              if (e) return t(e)
              let a = this.options
              n &&
                n.connection &&
                (this.logger.info(
                  {
                    tnx: 'proxy',
                    remoteAddress: n.connection.remoteAddress,
                    remotePort: n.connection.remotePort,
                    destHost: a.host || '',
                    destPort: a.port || '',
                    action: 'connected',
                  },
                  'Using proxied socket from %s:%s to %s:%s',
                  n.connection.remoteAddress,
                  n.connection.remotePort,
                  a.host || '',
                  a.port || '',
                ),
                (a = s.assign(!1, a)),
                Object.keys(n).forEach(t => {
                  a[t] = n[t]
                }))
              let o = new r(a),
                l = !1
              o.once('error', e => {
                if (!l) return (l = !0), o.close(), t(e)
              }),
                o.once('end', () => {
                  if (!l) return (l = !0), t(new Error('Connection closed'))
                })
              let c = () => {
                if (!l) return (l = !0), o.quit(), t(null, !0)
              }
              o.connect(() => {
                l ||
                  (i
                    ? o.login(i, e => {
                        if (!l)
                          return e ? ((l = !0), o.close(), t(e)) : void c()
                      })
                    : c())
              })
            }),
            e
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(43),
        a = i(3).assign,
        r = i(75),
        o = i(15)
      t.exports = class extends o {
        constructor(t) {
          if (
            (super(),
            (this.pool = t),
            (this.options = t.options),
            (this.logger = this.pool.logger),
            this.options.auth)
          )
            switch ((this.options.auth.type || '').toString().toUpperCase()) {
              case 'OAUTH2': {
                let t = new r(this.options.auth, this.logger)
                ;(t.provisionCallback =
                  (this.pool.mailer &&
                    this.pool.mailer.get('oauth2_provision_cb')) ||
                  t.provisionCallback),
                  (this.auth = {
                    type: 'OAUTH2',
                    user: this.options.auth.user,
                    oauth2: t,
                    method: 'XOAUTH2',
                  }),
                  t.on('token', t => this.pool.mailer.emit('token', t)),
                  t.on('error', t => this.emit('error', t))
                break
              }
              default:
                if (!this.options.auth.user && !this.options.auth.pass) break
                this.auth = {
                  type:
                    (this.options.auth.type || '').toString().toUpperCase() ||
                    'LOGIN',
                  user: this.options.auth.user,
                  credentials: {
                    user: this.options.auth.user || '',
                    pass: this.options.auth.pass,
                    options: this.options.auth.options,
                  },
                  method:
                    (this.options.auth.method || '').trim().toUpperCase() || !1,
                }
            }
          ;(this._connection = !1),
            (this._connected = !1),
            (this.messages = 0),
            (this.available = !0)
        }
        connect(t) {
          this.pool.getSocket(this.options, (e, i) => {
            if (e) return t(e)
            let r = !1,
              o = this.options
            i &&
              i.connection &&
              (this.logger.info(
                {
                  tnx: 'proxy',
                  remoteAddress: i.connection.remoteAddress,
                  remotePort: i.connection.remotePort,
                  destHost: o.host || '',
                  destPort: o.port || '',
                  action: 'connected',
                },
                'Using proxied socket from %s:%s to %s:%s',
                i.connection.remoteAddress,
                i.connection.remotePort,
                o.host || '',
                o.port || '',
              ),
              (o = a(!1, o)),
              Object.keys(i).forEach(t => {
                o[t] = i[t]
              })),
              (this.connection = new n(o)),
              this.connection.once('error', e => {
                if ((this.emit('error', e), !r)) return (r = !0), t(e)
              }),
              this.connection.once('end', () => {
                if ((this.close(), r)) return
                r = !0
                let e = setTimeout(() => {
                  if (r) return
                  let e = new Error('Unexpected socket close')
                  this.connection &&
                    this.connection._socket &&
                    this.connection._socket.upgrading &&
                    (e.code = 'ETLS'),
                    t(e)
                }, 1e3)
                try {
                  e.unref()
                } catch (t) {}
              }),
              this.connection.connect(() => {
                if (!r)
                  return this.auth
                    ? void this.connection.login(this.auth, e => {
                        if (!r) {
                          if (((r = !0), e))
                            return (
                              this.connection.close(),
                              this.emit('error', e),
                              t(e)
                            )
                          ;(this._connected = !0), t(null, !0)
                        }
                      })
                    : ((r = !0), (this._connected = !0), t(null, !0))
              })
          })
        }
        send(t, e) {
          if (!this._connected)
            return this.connect(i => (i ? e(i) : this.send(t, e)))
          let i = t.message.getEnvelope(),
            n = t.message.messageId(),
            a = [].concat(i.to || [])
          a.length > 3 && a.push('...and ' + a.splice(2).length + ' more'),
            this.logger.info(
              {tnx: 'send', messageId: n, cid: this.id},
              'Sending message %s using #%s to <%s>',
              n,
              this.id,
              a.join(', '),
            ),
            t.data.dsn && (i.dsn = t.data.dsn),
            this.connection.send(i, t.message.createReadStream(), (t, a) => {
              if ((this.messages++, t))
                return this.connection.close(), this.emit('error', t), e(t)
              ;(a.envelope = {from: i.from, to: i.to}),
                (a.messageId = n),
                setImmediate(() => {
                  let t
                  this.messages >= this.options.maxMessages
                    ? (((t = new Error('Resource exhausted')).code =
                        'EMAXLIMIT'),
                      this.connection.close(),
                      this.emit('error', t))
                    : this.pool._checkRateLimit(() => {
                        ;(this.available = !0), this.emit('available')
                      })
                }),
                e(null, a)
            })
        }
        close() {
          ;(this._connected = !1),
            this.auth &&
              this.auth.oauth2 &&
              this.auth.oauth2.removeAllListeners(),
            this.connection && this.connection.close(),
            this.emit('close')
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(1).Transform
      t.exports = class extends n {
        constructor(t) {
          super(t),
            (this.options = t || {}),
            (this._curLine = ''),
            (this.inByteCount = 0),
            (this.outByteCount = 0),
            (this.lastByte = !1)
        }
        _transform(t, e, i) {
          let n,
            a,
            r,
            o = [],
            s = 0,
            l = 0
          if (!t || !t.length) return i()
          for (
            'string' == typeof t && (t = Buffer.from(t)),
              this.inByteCount += t.length,
              n = 0,
              a = t.length;
            n < a;
            n++
          )
            46 === t[n]
              ? ((n && 10 === t[n - 1]) ||
                  (!n && (!this.lastByte || 10 === this.lastByte))) &&
                ((r = t.slice(l, n + 1)),
                o.push(r),
                o.push(Buffer.from('.')),
                (s += r.length + 1),
                (l = n + 1))
              : 10 === t[n] &&
                ((n && 13 !== t[n - 1]) || (!n && 13 !== this.lastByte)) &&
                (n > l
                  ? ((r = t.slice(l, n)), o.push(r), (s += r.length + 2))
                  : (s += 2),
                o.push(Buffer.from('\r\n')),
                (l = n + 1))
          s
            ? (l < t.length && ((r = t.slice(l)), o.push(r), (s += r.length)),
              (this.outByteCount += s),
              this.push(Buffer.concat(o, s)))
            : ((this.outByteCount += t.length), this.push(t)),
            (this.lastByte = t[t.length - 1]),
            i()
        }
        _flush(t) {
          let e
          ;(e =
            10 === this.lastByte
              ? Buffer.from('.\r\n')
              : 13 === this.lastByte
              ? Buffer.from('\n.\r\n')
              : Buffer.from('\r\n.\r\n')),
            (this.outByteCount += e.length),
            this.push(e),
            t()
        }
      }
    },
    function(t) {
      t.exports = {
        126: {host: 'smtp.126.com', port: 465, secure: !0},
        163: {host: 'smtp.163.com', port: 465, secure: !0},
        '1und1': {
          host: 'smtp.1und1.de',
          port: 465,
          secure: !0,
          authMethod: 'LOGIN',
        },
        AOL: {domains: ['aol.com'], host: 'smtp.aol.com', port: 587},
        DebugMail: {host: 'debugmail.io', port: 25},
        DynectEmail: {aliases: ['Dynect'], host: 'smtp.dynect.net', port: 25},
        FastMail: {
          domains: ['fastmail.fm'],
          host: 'smtp.fastmail.com',
          port: 465,
          secure: !0,
        },
        GandiMail: {
          aliases: ['Gandi', 'Gandi Mail'],
          host: 'mail.gandi.net',
          port: 587,
        },
        Gmail: {
          aliases: ['Google Mail'],
          domains: ['gmail.com', 'googlemail.com'],
          host: 'smtp.gmail.com',
          port: 465,
          secure: !0,
        },
        Godaddy: {host: 'smtpout.secureserver.net', port: 25},
        GodaddyAsia: {host: 'smtp.asia.secureserver.net', port: 25},
        GodaddyEurope: {host: 'smtp.europe.secureserver.net', port: 25},
        'hot.ee': {host: 'mail.hot.ee'},
        Hotmail: {
          aliases: ['Outlook', 'Outlook.com', 'Hotmail.com'],
          domains: ['hotmail.com', 'outlook.com'],
          host: 'smtp.live.com',
          port: 587,
          tls: {ciphers: 'SSLv3'},
        },
        iCloud: {
          aliases: ['Me', 'Mac'],
          domains: ['me.com', 'mac.com'],
          host: 'smtp.mail.me.com',
          port: 587,
        },
        'mail.ee': {host: 'smtp.mail.ee'},
        'Mail.ru': {host: 'smtp.mail.ru', port: 465, secure: !0},
        Maildev: {port: 1025, ignoreTLS: !0},
        Mailgun: {host: 'smtp.mailgun.org', port: 465, secure: !0},
        Mailjet: {host: 'in.mailjet.com', port: 587},
        Mailosaur: {host: 'mailosaur.io', port: 25},
        Mailtrap: {host: 'smtp.mailtrap.io', port: 2525},
        Mandrill: {host: 'smtp.mandrillapp.com', port: 587},
        Naver: {host: 'smtp.naver.com', port: 587},
        One: {host: 'send.one.com', port: 465, secure: !0},
        OpenMailBox: {
          aliases: ['OMB', 'openmailbox.org'],
          host: 'smtp.openmailbox.org',
          port: 465,
          secure: !0,
        },
        Outlook365: {host: 'smtp.office365.com', port: 587, secure: !1},
        Postmark: {
          aliases: ['PostmarkApp'],
          host: 'smtp.postmarkapp.com',
          port: 2525,
        },
        'qiye.aliyun': {host: 'smtp.mxhichina.com', port: '465', secure: !0},
        QQ: {domains: ['qq.com'], host: 'smtp.qq.com', port: 465, secure: !0},
        QQex: {
          aliases: ['QQ Enterprise'],
          domains: ['exmail.qq.com'],
          host: 'smtp.exmail.qq.com',
          port: 465,
          secure: !0,
        },
        SendCloud: {host: 'smtpcloud.sohu.com', port: 25},
        SendGrid: {host: 'smtp.sendgrid.net', port: 587},
        SendinBlue: {host: 'smtp-relay.sendinblue.com', port: 587},
        SendPulse: {host: 'smtp-pulse.com', port: 465, secure: !0},
        SES: {
          host: 'email-smtp.us-east-1.amazonaws.com',
          port: 465,
          secure: !0,
        },
        'SES-US-EAST-1': {
          host: 'email-smtp.us-east-1.amazonaws.com',
          port: 465,
          secure: !0,
        },
        'SES-US-WEST-2': {
          host: 'email-smtp.us-west-2.amazonaws.com',
          port: 465,
          secure: !0,
        },
        'SES-EU-WEST-1': {
          host: 'email-smtp.eu-west-1.amazonaws.com',
          port: 465,
          secure: !0,
        },
        Sparkpost: {
          aliases: ['SparkPost', 'SparkPost Mail'],
          domains: ['sparkpost.com'],
          host: 'smtp.sparkpostmail.com',
          port: 587,
          secure: !1,
        },
        Tipimail: {host: 'smtp.tipimail.com', port: 587},
        Yahoo: {
          domains: ['yahoo.com'],
          host: 'smtp.mail.yahoo.com',
          port: 465,
          secure: !0,
        },
        Yandex: {
          domains: ['yandex.ru'],
          host: 'smtp.yandex.ru',
          port: 465,
          secure: !0,
        },
        Zoho: {
          host: 'smtp.zoho.com',
          port: 465,
          secure: !0,
          authMethod: 'LOGIN',
        },
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(15),
        a = i(43),
        r = i(76),
        o = i(3),
        s = i(75),
        l = i(9)
      t.exports = class extends n {
        constructor(t) {
          let e
          super(), 'string' == typeof (t = t || {}) && (t = {url: t})
          let i = t.service
          'function' == typeof t.getSocket && (this.getSocket = t.getSocket),
            t.url && ((e = o.parseConnectionUrl(t.url)), (i = i || e.service)),
            (this.options = o.assign(!1, t, e, i && r(i))),
            (this.logger = o.getLogger(this.options, {
              component: this.options.component || 'smtp-transport',
            }))
          let n = new a(this.options)
          ;(this.name = 'SMTP'),
            (this.version = l.version + '[client:' + n.version + ']'),
            this.options.auth && (this.auth = this.getAuth({}))
        }
        getSocket(t, e) {
          return setImmediate(() => e(null, !1))
        }
        getAuth(t) {
          if (!t) return this.auth
          let e = !1,
            i = {}
          if (
            (this.options.auth &&
              'object' == typeof this.options.auth &&
              Object.keys(this.options.auth).forEach(t => {
                ;(e = !0), (i[t] = this.options.auth[t])
              }),
            t &&
              'object' == typeof t &&
              Object.keys(t).forEach(n => {
                ;(e = !0), (i[n] = t[n])
              }),
            !e)
          )
            return !1
          switch ((i.type || '').toString().toUpperCase()) {
            case 'OAUTH2': {
              if (!i.service && !i.user) return !1
              let t = new s(i, this.logger)
              return (
                (t.provisionCallback =
                  (this.mailer && this.mailer.get('oauth2_provision_cb')) ||
                  t.provisionCallback),
                t.on('token', t => this.mailer.emit('token', t)),
                t.on('error', t => this.emit('error', t)),
                {type: 'OAUTH2', user: i.user, oauth2: t, method: 'XOAUTH2'}
              )
            }
            default:
              return {
                type: (i.type || '').toString().toUpperCase() || 'LOGIN',
                user: i.user,
                credentials: {
                  user: i.user || '',
                  pass: i.pass,
                  options: i.options,
                },
                method: (i.method || '').trim().toUpperCase() || !1,
              }
          }
        }
        send(t, e) {
          this.getSocket(this.options, (i, n) => {
            if (i) return e(i)
            let r = !1,
              s = this.options
            n &&
              n.connection &&
              (this.logger.info(
                {
                  tnx: 'proxy',
                  remoteAddress: n.connection.remoteAddress,
                  remotePort: n.connection.remotePort,
                  destHost: s.host || '',
                  destPort: s.port || '',
                  action: 'connected',
                },
                'Using proxied socket from %s:%s to %s:%s',
                n.connection.remoteAddress,
                n.connection.remotePort,
                s.host || '',
                s.port || '',
              ),
              (s = o.assign(!1, s)),
              Object.keys(n).forEach(t => {
                s[t] = n[t]
              }))
            let l = new a(s)
            l.once('error', t => {
              if (!r) return (r = !0), l.close(), e(t)
            }),
              l.once('end', () => {
                if (r) return
                let t = setTimeout(() => {
                  if (r) return
                  r = !0
                  let t = new Error('Unexpected socket close')
                  l && l._socket && l._socket.upgrading && (t.code = 'ETLS'),
                    e(t)
                }, 1e3)
                try {
                  t.unref()
                } catch (t) {}
              })
            let c = () => {
              let i = t.message.getEnvelope(),
                n = t.message.messageId(),
                a = [].concat(i.to || [])
              a.length > 3 && a.push('...and ' + a.splice(2).length + ' more'),
                t.data.dsn && (i.dsn = t.data.dsn),
                this.logger.info(
                  {tnx: 'send', messageId: n},
                  'Sending message %s to <%s>',
                  n,
                  a.join(', '),
                ),
                l.send(i, t.message.createReadStream(), (t, a) => {
                  if (((r = !0), l.close(), t))
                    return (
                      this.logger.error(
                        {err: t, tnx: 'send'},
                        'Send error for %s: %s',
                        n,
                        t.message,
                      ),
                      e(t)
                    )
                  ;(a.envelope = {from: i.from, to: i.to}), (a.messageId = n)
                  try {
                    return e(null, a)
                  } catch (t) {
                    this.logger.error(
                      {err: t, tnx: 'callback'},
                      'Callback error for %s: %s',
                      n,
                      t.message,
                    )
                  }
                })
            }
            l.connect(() => {
              if (r) return
              let i = this.getAuth(t.data.auth)
              i
                ? l.login(i, t => {
                    if (
                      (i &&
                        i !== this.auth &&
                        i.oauth2 &&
                        i.oauth2.removeAllListeners(),
                      !r)
                    )
                      return t ? ((r = !0), l.close(), e(t)) : void c()
                  })
                : c()
            })
          })
        }
        verify(t) {
          let e
          return (
            t ||
              (e = new Promise((e, i) => {
                t = o.callbackPromise(e, i)
              })),
            this.getSocket(this.options, (e, i) => {
              if (e) return t(e)
              let n = this.options
              i &&
                i.connection &&
                (this.logger.info(
                  {
                    tnx: 'proxy',
                    remoteAddress: i.connection.remoteAddress,
                    remotePort: i.connection.remotePort,
                    destHost: n.host || '',
                    destPort: n.port || '',
                    action: 'connected',
                  },
                  'Using proxied socket from %s:%s to %s:%s',
                  i.connection.remoteAddress,
                  i.connection.remotePort,
                  n.host || '',
                  n.port || '',
                ),
                (n = o.assign(!1, n)),
                Object.keys(i).forEach(t => {
                  n[t] = i[t]
                }))
              let r = new a(n),
                s = !1
              r.once('error', e => {
                if (!s) return (s = !0), r.close(), t(e)
              }),
                r.once('end', () => {
                  if (!s) return (s = !0), t(new Error('Connection closed'))
                })
              let l = () => {
                if (!s) return (s = !0), r.quit(), t(null, !0)
              }
              r.connect(() => {
                if (s) return
                let e = this.getAuth({})
                e
                  ? r.login(e, e => {
                      if (!s) return e ? ((s = !0), r.close(), t(e)) : void l()
                    })
                  : l()
              })
            }),
            e
          )
        }
        close() {
          this.auth &&
            this.auth.oauth2 &&
            this.auth.oauth2.removeAllListeners(),
            this.emit('close')
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(184).spawn,
        a = i(9),
        r = i(44),
        o = i(77),
        s = i(3)
      t.exports = class {
        constructor(t) {
          ;(t = t || {}),
            (this._spawn = n),
            (this.options = t || {}),
            (this.name = 'Sendmail'),
            (this.version = a.version),
            (this.path = 'sendmail'),
            (this.args = !1),
            (this.winbreak = !1),
            (this.logger = s.getLogger(this.options, {
              component: this.options.component || 'sendmail',
            })),
            t &&
              ('string' == typeof t
                ? (this.path = t)
                : 'object' == typeof t &&
                  (t.path && (this.path = t.path),
                  Array.isArray(t.args) && (this.args = t.args),
                  (this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes(
                    (t.newline || '').toString().toLowerCase(),
                  ))))
        }
        send(t, e) {
          t.message.keepBcc = !0
          let i,
            n,
            a,
            s,
            l = t.data.envelope || t.message.getEnvelope(),
            c = t.message.messageId()
          i = this.args
            ? ['-i'].concat(this.args).concat(l.to)
            : ['-i'].concat(l.from ? ['-f', l.from] : []).concat(l.to)
          let p = i => {
            if (!a)
              return (
                (a = !0),
                'function' == typeof e
                  ? i
                    ? e(i)
                    : e(null, {
                        envelope: t.data.envelope || t.message.getEnvelope(),
                        messageId: c,
                        response: 'Messages queued for delivery',
                      })
                  : void 0
              )
          }
          try {
            n = this._spawn(this.path, i)
          } catch (t) {
            return (
              this.logger.error(
                {err: t, tnx: 'spawn', messageId: c},
                'Error occurred while spawning sendmail. %s',
                t.message,
              ),
              p(t)
            )
          }
          if (!n) return p(new Error('sendmail was not found'))
          {
            n.on('error', t => {
              this.logger.error(
                {err: t, tnx: 'spawn', messageId: c},
                'Error occurred when sending message %s. %s',
                c,
                t.message,
              ),
                p(t)
            }),
              n.once('exit', t => {
                if (!t) return p()
                let e
                ;(e =
                  127 === t
                    ? new Error(
                        'Sendmail command not found, process exited with code ' +
                          t,
                      )
                    : new Error('Sendmail exited with code ' + t)),
                  this.logger.error(
                    {err: e, tnx: 'stdin', messageId: c},
                    'Error sending message %s to sendmail. %s',
                    c,
                    e.message,
                  ),
                  p(e)
              }),
              n.once('close', p),
              n.stdin.on('error', t => {
                this.logger.error(
                  {err: t, tnx: 'stdin', messageId: c},
                  'Error occurred when piping message %s to sendmail. %s',
                  c,
                  t.message,
                ),
                  p(t)
              })
            let e = [].concat(l.to || [])
            e.length > 3 && e.push('...and ' + e.splice(2).length + ' more'),
              this.logger.info(
                {tnx: 'send', messageId: c},
                'Sending message %s to <%s>',
                c,
                e.join(', '),
              ),
              (s = this.winbreak ? new r() : new o())
            let i = t.message.createReadStream()
            s.once('error', t => {
              this.logger.error(
                {err: t, tnx: 'stdin', messageId: c},
                'Error occurred when generating message %s. %s',
                c,
                t.message,
              ),
                n.kill('SIGINT'),
                p(t)
            }),
              i.once('error', t => s.emit('error', t)),
              i.pipe(s).pipe(n.stdin)
          }
        }
      }
    },
    function(t, e) {
      t.exports = require('child_process')
    },
    function(t, e, i) {
      'use strict'
      const n = i(9),
        a = i(3),
        r = i(44),
        o = i(77)
      t.exports = class {
        constructor(t) {
          ;(t = t || {}),
            (this.options = t || {}),
            (this.name = 'StreamTransport'),
            (this.version = n.version),
            (this.logger = a.getLogger(this.options, {
              component: this.options.component || 'stream-transport',
            })),
            (this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes(
              (t.newline || '').toString().toLowerCase(),
            ))
        }
        send(t, e) {
          t.message.keepBcc = !0
          let i = t.data.envelope || t.message.getEnvelope(),
            n = t.message.messageId(),
            a = [].concat(i.to || [])
          a.length > 3 && a.push('...and ' + a.splice(2).length + ' more'),
            this.logger.info(
              {tnx: 'send', messageId: n},
              'Sending message %s to <%s> using %s line breaks',
              n,
              a.join(', '),
              this.winbreak ? '<CR><LF>' : '<LF>',
            ),
            setImmediate(() => {
              let i, a, s
              try {
                ;(s = this.winbreak ? new r() : new o()),
                  (i = t.message.createReadStream()),
                  (a = i.pipe(s)),
                  i.on('error', t => a.emit('error', t))
              } catch (t) {
                return (
                  this.logger.error(
                    {err: t, tnx: 'send', messageId: n},
                    'Creating send stream failed for %s. %s',
                    n,
                    t.message,
                  ),
                  e(t)
                )
              }
              if (!this.options.buffer)
                return (
                  a.once('error', t => {
                    this.logger.error(
                      {err: t, tnx: 'send', messageId: n},
                      'Failed creating message for %s. %s',
                      n,
                      t.message,
                    )
                  }),
                  e(null, {
                    envelope: t.data.envelope || t.message.getEnvelope(),
                    messageId: n,
                    message: a,
                  })
                )
              let l = [],
                c = 0
              a.on('readable', () => {
                let t
                for (; null !== (t = a.read()); ) l.push(t), (c += t.length)
              }),
                a.once(
                  'error',
                  t => (
                    this.logger.error(
                      {err: t, tnx: 'send', messageId: n},
                      'Failed creating message for %s. %s',
                      n,
                      t.message,
                    ),
                    e(t)
                  ),
                ),
                a.on('end', () =>
                  e(null, {
                    envelope: t.data.envelope || t.message.getEnvelope(),
                    messageId: n,
                    message: Buffer.concat(l, c),
                  }),
                )
            })
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(9),
        a = i(3)
      t.exports = class {
        constructor(t) {
          ;(t = t || {}),
            (this.options = t || {}),
            (this.name = 'JSONTransport'),
            (this.version = n.version),
            (this.logger = a.getLogger(this.options, {
              component: this.options.component || 'json-transport',
            }))
        }
        send(t, e) {
          t.message.keepBcc = !0
          let i = t.data.envelope || t.message.getEnvelope(),
            n = t.message.messageId(),
            a = [].concat(i.to || [])
          a.length > 3 && a.push('...and ' + a.splice(2).length + ' more'),
            this.logger.info(
              {tnx: 'send', messageId: n},
              'Composing JSON structure of %s to <%s>',
              n,
              a.join(', '),
            ),
            setImmediate(() => {
              t.normalize((t, a) =>
                t
                  ? (this.logger.error(
                      {err: t, tnx: 'send', messageId: n},
                      'Failed building JSON structure for %s. %s',
                      n,
                      t.message,
                    ),
                    e(t))
                  : (delete a.envelope,
                    delete a.normalizedHeaders,
                    e(null, {
                      envelope: i,
                      messageId: n,
                      message: this.options.skipEncoding
                        ? a
                        : JSON.stringify(a),
                    })),
              )
            })
        }
      }
    },
    function(t, e, i) {
      'use strict'
      const n = i(15),
        a = i(9),
        r = i(3),
        o = i(44)
      t.exports = class extends n {
        constructor(t) {
          super(),
            (t = t || {}),
            (this.options = t || {}),
            (this.ses = this.options.SES),
            (this.name = 'SESTransport'),
            (this.version = a.version),
            (this.logger = r.getLogger(this.options, {
              component: this.options.component || 'ses-transport',
            })),
            (this.maxConnections =
              Number(this.options.maxConnections) || 1 / 0),
            (this.connections = 0),
            (this.sendingRate = Number(this.options.sendingRate) || 1 / 0),
            (this.sendingRateTTL = null),
            (this.rateInterval = 1e3),
            (this.rateMessages = []),
            (this.pending = []),
            (this.idling = !0),
            setImmediate(() => {
              this.idling && this.emit('idle')
            })
        }
        send(t, e) {
          return this.connections >= this.maxConnections
            ? ((this.idling = !1), this.pending.push({mail: t, callback: e}))
            : this._checkSendingRate()
            ? void this._send(t, (...t) => {
                setImmediate(() => e(...t)), this._sent()
              })
            : ((this.idling = !1), this.pending.push({mail: t, callback: e}))
        }
        _checkRatedQueue() {
          if (
            this.connections >= this.maxConnections ||
            !this._checkSendingRate()
          )
            return
          if (!this.pending.length)
            return void (this.idling || ((this.idling = !0), this.emit('idle')))
          let t = this.pending.shift()
          this._send(t.mail, (...e) => {
            setImmediate(() => t.callback(...e)), this._sent()
          })
        }
        _checkSendingRate() {
          clearTimeout(this.sendingRateTTL)
          let t = Date.now(),
            e = !1
          for (let i = this.rateMessages.length - 1; i >= 0; i--)
            this.rateMessages[i].ts >= t - this.rateInterval &&
              (!e || this.rateMessages[i].ts < e) &&
              (e = this.rateMessages[i].ts),
              this.rateMessages[i].ts < t - this.rateInterval &&
                !this.rateMessages[i].pending &&
                this.rateMessages.splice(i, 1)
          if (this.rateMessages.length < this.sendingRate) return !0
          let i = Math.max(e + 1001, t + 20)
          this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), t - i)
          try {
            this.sendingRateTTL.unref()
          } catch (t) {}
          return !1
        }
        _sent() {
          this.connections--, this._checkRatedQueue()
        }
        isIdle() {
          return this.idling
        }
        _send(t, e) {
          let i = {ts: Date.now(), pending: !0}
          this.connections++, this.rateMessages.push(i)
          let n = t.data.envelope || t.message.getEnvelope(),
            a = t.message.messageId(),
            r = [].concat(n.to || [])
          r.length > 3 && r.push('...and ' + r.splice(2).length + ' more'),
            this.logger.info(
              {tnx: 'send', messageId: a},
              'Sending message %s to <%s>',
              a,
              r.join(', '),
            ),
            setImmediate(() =>
              (e => {
                t.data._dkim || (t.data._dkim = {}),
                  t.data._dkim.skipFields &&
                  'string' == typeof t.data._dkim.skipFields
                    ? (t.data._dkim.skipFields += ':date:message-id')
                    : (t.data._dkim.skipFields = 'date:message-id')
                let i = t.message.createReadStream(),
                  n = i.pipe(new o()),
                  a = [],
                  r = 0
                n.on('readable', () => {
                  let t
                  for (; null !== (t = n.read()); ) a.push(t), (r += t.length)
                }),
                  i.once('error', t => n.emit('error', t)),
                  n.once('error', t => {
                    e(t)
                  }),
                  n.once('end', () => e(null, Buffer.concat(a, r)))
              })((r, o) => {
                if (r)
                  return (
                    this.logger.error(
                      {err: r, tnx: 'send', messageId: a},
                      'Failed creating message for %s. %s',
                      a,
                      r.message,
                    ),
                    (i.pending = !1),
                    e(r)
                  )
                let s = {
                  RawMessage: {Data: o},
                  Source: n.from,
                  Destinations: n.to,
                }
                Object.keys(t.data.ses || {}).forEach(e => {
                  s[e] = t.data.ses[e]
                }),
                  this.ses.sendRawEmail(s, (t, r) => {
                    if (t)
                      return (
                        this.logger.error(
                          {err: t, tnx: 'send'},
                          'Send error for %s: %s',
                          a,
                          t.message,
                        ),
                        (i.pending = !1),
                        e(t)
                      )
                    let s =
                      (this.ses.config && this.ses.config.region) || 'us-east-1'
                    'us-east-1' === s && (s = 'email'),
                      (i.pending = !1),
                      e(null, {
                        envelope: {from: n.from, to: n.to},
                        messageId:
                          '<' +
                          r.MessageId +
                          (/@/.test(r.MessageId)
                            ? ''
                            : '@' + s + '.amazonses.com') +
                          '>',
                        response: r.MessageId,
                        raw: o,
                      })
                  })
              }),
            )
        }
        verify(t) {
          let e
          return (
            t ||
              (e = new Promise((e, i) => {
                t = r.callbackPromise(e, i)
              })),
            this.ses.sendRawEmail(
              {
                RawMessage: {
                  Data:
                    'From: invalid@invalid\r\nTo: invalid@invalid\r\n Subject: Invalid\r\n\r\nInvalid',
                },
                Source: 'invalid@invalid',
                Destinations: ['invalid@invalid'],
              },
              e =>
                e && 'InvalidParameterValue' !== e.code ? t(e) : t(null, !0),
            ),
            e
          )
        }
      }
    },
    function(module, exports, __webpack_require__) {
      module.exports = (function(t) {
        var e = {}
        function i(n) {
          if (e[n]) return e[n].exports
          var a = (e[n] = {i: n, l: !1, exports: {}})
          return t[n].call(a.exports, a, a.exports, i), (a.l = !0), a.exports
        }
        return (
          (i.m = t),
          (i.c = e),
          (i.d = function(t, e, n) {
            i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
          }),
          (i.r = function(t) {
            'undefined' != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(t, Symbol.toStringTag, {value: 'Module'}),
              Object.defineProperty(t, '__esModule', {value: !0})
          }),
          (i.t = function(t, e) {
            if ((1 & e && (t = i(t)), 8 & e)) return t
            if (4 & e && 'object' == typeof t && t && t.__esModule) return t
            var n = Object.create(null)
            if (
              (i.r(n),
              Object.defineProperty(n, 'default', {enumerable: !0, value: t}),
              2 & e && 'string' != typeof t)
            )
              for (var a in t)
                i.d(
                  n,
                  a,
                  function(e) {
                    return t[e]
                  }.bind(null, a),
                )
            return n
          }),
          (i.n = function(t) {
            var e =
              t && t.__esModule
                ? function() {
                    return t.default
                  }
                : function() {
                    return t
                  }
            return i.d(e, 'a', e), e
          }),
          (i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }),
          (i.p = ''),
          i((i.s = 4))
        )
      })([
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(1)),
            r = i(8),
            o = i(2),
            s = i(17)
          ;(e.validatorSymbol = Symbol('validators')),
            (e.Predicate = class {
              constructor(t, e = {}) {
                ;(this.type = t),
                  (this.options = e),
                  (this.context = {validators: []}),
                  (this.context = Object.assign({}, this.context, this.options))
                const i = this.type[0].toLowerCase() + this.type.slice(1)
                this.addValidator({
                  message: (t, e) =>
                    `Expected ${(e && e.substring(this.type.length + 1)) ||
                      'argument'} to be of type \`${
                      this.type
                    }\` but received type \`${a.default(t)}\``,
                  validator: t => a.default[i](t),
                })
              }
              [o.testSymbol](t, e, i) {
                for (const {validator: n, message: a} of this.context
                  .validators) {
                  if (!0 === this.options.optional && void 0 === t) continue
                  const o = n(t)
                  if (!0 === o) continue
                  let s = i
                  throw ('function' == typeof i && (s = i()),
                  (s = s ? `${this.type} \`${s}\`` : this.type),
                  new r.ArgumentError(a(t, s, o), e))
                }
              }
              get [e.validatorSymbol]() {
                return this.context.validators
              }
              get not() {
                return s.not(this)
              }
              is(t) {
                return this.addValidator({
                  message: (t, e, i) =>
                    i
                      ? `(${e}) ${i}`
                      : `Expected ${e} \`${t}\` to pass custom validation function`,
                  validator: t,
                })
              }
              addValidator(t) {
                return this.context.validators.push(t), this
              }
            })
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = 'undefined' == typeof URL ? i(16).URL : URL,
            a = Object.prototype.toString,
            r = t => e => typeof e === t,
            o = t =>
              !c.nullOrUndefined(t) &&
              !c.nullOrUndefined(t.constructor) &&
              c.function_(t.constructor.isBuffer) &&
              t.constructor.isBuffer(t),
            s = t => {
              return a.call(t).slice(8, -1) || null
            },
            l = t => e => s(e) === t
          function c(t) {
            switch (t) {
              case null:
                return 'null'
              case !0:
              case !1:
                return 'boolean'
            }
            switch (typeof t) {
              case 'undefined':
                return 'undefined'
              case 'string':
                return 'string'
              case 'number':
                return 'number'
              case 'symbol':
                return 'symbol'
            }
            if (c.function_(t)) return 'Function'
            if (c.observable(t)) return 'Observable'
            if (Array.isArray(t)) return 'Array'
            if (o(t)) return 'Buffer'
            const e = s(t)
            if (e) return e
            if (
              t instanceof String ||
              t instanceof Boolean ||
              t instanceof Number
            )
              throw new TypeError(
                "Please don't use object wrappers for primitive types",
              )
            return 'Object'
          }
          !(function(t) {
            const e = t => 'object' == typeof t
            ;(t.undefined = r('undefined')),
              (t.string = r('string')),
              (t.number = r('number')),
              (t.function_ = r('function')),
              (t.null_ = t => null === t),
              (t.class_ = e =>
                t.function_(e) && e.toString().startsWith('class ')),
              (t.boolean = t => !0 === t || !1 === t),
              (t.symbol = r('symbol')),
              (t.numericString = e =>
                t.string(e) && e.length > 0 && !Number.isNaN(Number(e))),
              (t.array = Array.isArray),
              (t.buffer = o),
              (t.nullOrUndefined = e => t.null_(e) || t.undefined(e)),
              (t.object = i =>
                !t.nullOrUndefined(i) && (t.function_(i) || e(i))),
              (t.iterable = e =>
                !t.nullOrUndefined(e) && t.function_(e[Symbol.iterator])),
              (t.asyncIterable = e =>
                !t.nullOrUndefined(e) && t.function_(e[Symbol.asyncIterator])),
              (t.generator = e =>
                t.iterable(e) && t.function_(e.next) && t.function_(e.throw)),
              (t.nativePromise = t => l('Promise')(t)),
              (t.promise = i =>
                t.nativePromise(i) ||
                (i =>
                  !t.null_(i) &&
                  e(i) &&
                  t.function_(i.then) &&
                  t.function_(i.catch))(i)),
              (t.generatorFunction = l('GeneratorFunction')),
              (t.asyncFunction = l('AsyncFunction')),
              (t.boundFunction = e =>
                t.function_(e) && !e.hasOwnProperty('prototype')),
              (t.regExp = l('RegExp')),
              (t.date = l('Date')),
              (t.error = l('Error')),
              (t.map = t => l('Map')(t)),
              (t.set = t => l('Set')(t)),
              (t.weakMap = t => l('WeakMap')(t)),
              (t.weakSet = t => l('WeakSet')(t)),
              (t.int8Array = l('Int8Array')),
              (t.uint8Array = l('Uint8Array')),
              (t.uint8ClampedArray = l('Uint8ClampedArray')),
              (t.int16Array = l('Int16Array')),
              (t.uint16Array = l('Uint16Array')),
              (t.int32Array = l('Int32Array')),
              (t.uint32Array = l('Uint32Array')),
              (t.float32Array = l('Float32Array')),
              (t.float64Array = l('Float64Array')),
              (t.arrayBuffer = l('ArrayBuffer')),
              (t.sharedArrayBuffer = l('SharedArrayBuffer')),
              (t.dataView = l('DataView')),
              (t.directInstanceOf = (t, e) =>
                Object.getPrototypeOf(t) === e.prototype),
              (t.urlInstance = t => l('URL')(t)),
              (t.urlString = e => {
                if (!t.string(e)) return !1
                try {
                  return new n(e), !0
                } catch (t) {
                  return !1
                }
              }),
              (t.truthy = t => Boolean(t)),
              (t.falsy = t => !t),
              (t.nan = t => Number.isNaN(t))
            const i = new Set([
              'undefined',
              'string',
              'number',
              'boolean',
              'symbol',
            ])
            ;(t.primitive = e => t.null_(e) || i.has(typeof e)),
              (t.integer = t => Number.isInteger(t)),
              (t.safeInteger = t => Number.isSafeInteger(t)),
              (t.plainObject = t => {
                let e
                return (
                  'Object' === s(t) &&
                  (null === (e = Object.getPrototypeOf(t)) ||
                    e === Object.getPrototypeOf({}))
                )
              })
            const a = new Set([
              'Int8Array',
              'Uint8Array',
              'Uint8ClampedArray',
              'Int16Array',
              'Uint16Array',
              'Int32Array',
              'Uint32Array',
              'Float32Array',
              'Float64Array',
            ])
            ;(t.typedArray = t => {
              const e = s(t)
              return null !== e && a.has(e)
            }),
              (t.arrayLike = e =>
                !t.nullOrUndefined(e) &&
                !t.function_(e) &&
                (e => t.safeInteger(e) && e > -1)(e.length)),
              (t.inRange = (e, i) => {
                if (t.number(i))
                  return e >= Math.min(0, i) && e <= Math.max(i, 0)
                if (t.array(i) && 2 === i.length)
                  return e >= Math.min(...i) && e <= Math.max(...i)
                throw new TypeError(`Invalid range: ${JSON.stringify(i)}`)
              })
            const c = [
              'innerHTML',
              'ownerDocument',
              'style',
              'attributes',
              'nodeValue',
            ]
            ;(t.domElement = e =>
              t.object(e) &&
              1 === e.nodeType &&
              t.string(e.nodeName) &&
              !t.plainObject(e) &&
              c.every(t => t in e)),
              (t.observable = t =>
                !!(
                  t &&
                  ((t[Symbol.observable] && t === t[Symbol.observable]()) ||
                    (t['@@observable'] && t === t['@@observable']()))
                )),
              (t.nodeStream = i =>
                !t.nullOrUndefined(i) &&
                e(i) &&
                t.function_(i.pipe) &&
                !t.observable(i)),
              (t.infinite = t => t === 1 / 0 || t === -1 / 0)
            const p = e => i => t.integer(i) && Math.abs(i % 2) === e
            ;(t.even = p(0)),
              (t.odd = p(1)),
              (t.emptyArray = e => t.array(e) && 0 === e.length),
              (t.nonEmptyArray = e => t.array(e) && e.length > 0),
              (t.emptyString = e => t.string(e) && 0 === e.length),
              (t.nonEmptyString = e => t.string(e) && e.length > 0),
              (t.emptyStringOrWhitespace = e =>
                t.emptyString(e) ||
                (e => t.string(e) && !1 === /\S/.test(e))(e)),
              (t.emptyObject = e =>
                t.object(e) &&
                !t.map(e) &&
                !t.set(e) &&
                0 === Object.keys(e).length),
              (t.nonEmptyObject = e =>
                t.object(e) &&
                !t.map(e) &&
                !t.set(e) &&
                Object.keys(e).length > 0),
              (t.emptySet = e => t.set(e) && 0 === e.size),
              (t.nonEmptySet = e => t.set(e) && e.size > 0),
              (t.emptyMap = e => t.map(e) && 0 === e.size),
              (t.nonEmptyMap = e => t.map(e) && e.size > 0)
            const u = (e, i, n) => {
              if (!1 === t.function_(i))
                throw new TypeError(`Invalid predicate: ${JSON.stringify(i)}`)
              if (0 === n.length)
                throw new TypeError('Invalid number of values')
              return e.call(n, i)
            }
            ;(t.any = (t, ...e) => u(Array.prototype.some, t, e)),
              (t.all = (t, ...e) => u(Array.prototype.every, t, e))
          })(c || (c = {})),
            Object.defineProperties(c, {
              class: {value: c.class_},
              function: {value: c.function_},
              null: {value: c.null_},
            }),
            (e.default = c),
            (t.exports = c),
            (t.exports.default = c)
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0}),
            (e.testSymbol = Symbol('test')),
            (e.isPredicate = t => Boolean(t && t[e.testSymbol]))
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0}),
            (e.default = (t, e, i = 5) => {
              const n = []
              for (const a of e)
                if (!t.has(a) && (n.push(a), n.length === i)) return n
              return 0 === n.length || n
            })
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(10)),
            r = i(11),
            o = i(0)
          e.Predicate = o.Predicate
          const s = i(2),
            l = n(i(18)),
            c = n(i(6)),
            p = n(i(9)),
            u = (t, e, i) => {
              if (!s.isPredicate(e) && 'string' != typeof e)
                throw new TypeError(
                  `Expected second argument to be a predicate or a string, got \`${typeof e}\``,
                )
              if (s.isPredicate(e)) {
                const i = a.default()
                p.default(t, () => r.inferLabel(i), e)
              } else p.default(t, e, i)
            }
          Object.defineProperties(u, {
            isValid: {
              value: (t, e) => {
                try {
                  return u(t, e), !0
                } catch (t) {
                  return !1
                }
              },
            },
            create: {
              value: (t, e) => i => {
                if (s.isPredicate(t)) {
                  const e = a.default()
                  p.default(i, () => r.inferLabel(e), t)
                } else p.default(i, t, e)
              },
            },
          }),
            (e.default = c.default(l.default(u)))
          var d = i(6)
          ;(e.StringPredicate = d.StringPredicate),
            (e.NumberPredicate = d.NumberPredicate),
            (e.BooleanPredicate = d.BooleanPredicate),
            (e.ArrayPredicate = d.ArrayPredicate),
            (e.ObjectPredicate = d.ObjectPredicate),
            (e.DatePredicate = d.DatePredicate),
            (e.ErrorPredicate = d.ErrorPredicate),
            (e.MapPredicate = d.MapPredicate),
            (e.WeakMapPredicate = d.WeakMapPredicate),
            (e.SetPredicate = d.SetPredicate),
            (e.WeakSetPredicate = d.WeakSetPredicate),
            (e.AnyPredicate = d.AnyPredicate)
        },
        function(t, e, i) {
          ;(function(t) {
            var i = '__lodash_hash_undefined__',
              n = 1,
              a = 2,
              r = 9007199254740991,
              o = '[object Arguments]',
              s = '[object Array]',
              l = '[object AsyncFunction]',
              c = '[object Boolean]',
              p = '[object Date]',
              u = '[object Error]',
              d = '[object Function]',
              h = '[object GeneratorFunction]',
              m = '[object Map]',
              f = '[object Number]',
              g = '[object Null]',
              v = '[object Object]',
              x = '[object Proxy]',
              b = '[object RegExp]',
              y = '[object Set]',
              w = '[object String]',
              k = '[object Symbol]',
              _ = '[object Undefined]',
              E = '[object ArrayBuffer]',
              A = '[object DataView]',
              S = /^\[object .+?Constructor\]$/,
              T = /^(?:0|[1-9]\d*)$/,
              O = {}
            ;(O['[object Float32Array]'] = O['[object Float64Array]'] = O[
              '[object Int8Array]'
            ] = O['[object Int16Array]'] = O['[object Int32Array]'] = O[
              '[object Uint8Array]'
            ] = O['[object Uint8ClampedArray]'] = O['[object Uint16Array]'] = O[
              '[object Uint32Array]'
            ] = !0),
              (O[o] = O[s] = O[E] = O[c] = O[A] = O[p] = O[u] = O[d] = O[m] = O[
                f
              ] = O[v] = O[b] = O[y] = O[w] = O['[object WeakMap]'] = !1)
            var C =
                'object' == typeof global &&
                global &&
                global.Object === Object &&
                global,
              j =
                'object' == typeof self &&
                self &&
                self.Object === Object &&
                self,
              L = C || j || Function('return this')(),
              P = e && !e.nodeType && e,
              q = P && 'object' == typeof t && t && !t.nodeType && t,
              N = q && q.exports === P,
              I = N && C.process,
              z = (function() {
                try {
                  return I && I.binding && I.binding('util')
                } catch (t) {}
              })(),
              M = z && z.isTypedArray
            function B(t, e) {
              for (var i = -1, n = null == t ? 0 : t.length; ++i < n; )
                if (e(t[i], i, t)) return !0
              return !1
            }
            function D(t) {
              var e = -1,
                i = Array(t.size)
              return (
                t.forEach(function(t, n) {
                  i[++e] = [n, t]
                }),
                i
              )
            }
            function R(t) {
              var e = -1,
                i = Array(t.size)
              return (
                t.forEach(function(t) {
                  i[++e] = t
                }),
                i
              )
            }
            var U,
              H,
              $,
              V = Array.prototype,
              F = Function.prototype,
              G = Object.prototype,
              W = L['__core-js_shared__'],
              J = F.toString,
              K = G.hasOwnProperty,
              X = (U = /[^.]+$/.exec((W && W.keys && W.keys.IE_PROTO) || ''))
                ? 'Symbol(src)_1.' + U
                : '',
              Q = G.toString,
              Y = RegExp(
                '^' +
                  J.call(K)
                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                    .replace(
                      /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                      '$1.*?',
                    ) +
                  '$',
              ),
              Z = N ? L.Buffer : void 0,
              tt = L.Symbol,
              et = L.Uint8Array,
              it = G.propertyIsEnumerable,
              nt = V.splice,
              at = tt ? tt.toStringTag : void 0,
              rt = Object.getOwnPropertySymbols,
              ot = Z ? Z.isBuffer : void 0,
              st = ((H = Object.keys),
              ($ = Object),
              function(t) {
                return H($(t))
              }),
              lt = qt(L, 'DataView'),
              ct = qt(L, 'Map'),
              pt = qt(L, 'Promise'),
              ut = qt(L, 'Set'),
              dt = qt(L, 'WeakMap'),
              ht = qt(Object, 'create'),
              mt = Mt(lt),
              ft = Mt(ct),
              gt = Mt(pt),
              vt = Mt(ut),
              xt = Mt(dt),
              bt = tt ? tt.prototype : void 0,
              yt = bt ? bt.valueOf : void 0
            function wt(t) {
              var e = -1,
                i = null == t ? 0 : t.length
              for (this.clear(); ++e < i; ) {
                var n = t[e]
                this.set(n[0], n[1])
              }
            }
            function kt(t) {
              var e = -1,
                i = null == t ? 0 : t.length
              for (this.clear(); ++e < i; ) {
                var n = t[e]
                this.set(n[0], n[1])
              }
            }
            function _t(t) {
              var e = -1,
                i = null == t ? 0 : t.length
              for (this.clear(); ++e < i; ) {
                var n = t[e]
                this.set(n[0], n[1])
              }
            }
            function Et(t) {
              var e = -1,
                i = null == t ? 0 : t.length
              for (this.__data__ = new _t(); ++e < i; ) this.add(t[e])
            }
            function At(t) {
              var e = (this.__data__ = new kt(t))
              this.size = e.size
            }
            function St(t, e) {
              for (var i = t.length; i--; ) if (Bt(t[i][0], e)) return i
              return -1
            }
            function Tt(t) {
              return null == t
                ? void 0 === t
                  ? _
                  : g
                : at && at in Object(t)
                ? (function(t) {
                    var e = K.call(t, at),
                      i = t[at]
                    try {
                      t[at] = void 0
                      var n = !0
                    } catch (t) {}
                    var a = Q.call(t)
                    return n && (e ? (t[at] = i) : delete t[at]), a
                  })(t)
                : (function(t) {
                    return Q.call(t)
                  })(t)
            }
            function Ot(t) {
              return Ft(t) && Tt(t) == o
            }
            function Ct(t, e, i, r, l) {
              return (
                t === e ||
                (null == t || null == e || (!Ft(t) && !Ft(e))
                  ? t != t && e != e
                  : (function(t, e, i, r, l, d) {
                      var h = Rt(t),
                        g = Rt(e),
                        x = h ? s : It(t),
                        _ = g ? s : It(e),
                        S = (x = x == o ? v : x) == v,
                        T = (_ = _ == o ? v : _) == v,
                        O = x == _
                      if (O && Ut(t)) {
                        if (!Ut(e)) return !1
                        ;(h = !0), (S = !1)
                      }
                      if (O && !S)
                        return (
                          d || (d = new At()),
                          h || Gt(t)
                            ? jt(t, e, i, r, l, d)
                            : (function(t, e, i, r, o, s, l) {
                                switch (i) {
                                  case A:
                                    if (
                                      t.byteLength != e.byteLength ||
                                      t.byteOffset != e.byteOffset
                                    )
                                      return !1
                                    ;(t = t.buffer), (e = e.buffer)
                                  case E:
                                    return !(
                                      t.byteLength != e.byteLength ||
                                      !s(new et(t), new et(e))
                                    )
                                  case c:
                                  case p:
                                  case f:
                                    return Bt(+t, +e)
                                  case u:
                                    return (
                                      t.name == e.name && t.message == e.message
                                    )
                                  case b:
                                  case w:
                                    return t == e + ''
                                  case m:
                                    var d = D
                                  case y:
                                    var h = r & n
                                    if ((d || (d = R), t.size != e.size && !h))
                                      return !1
                                    var g = l.get(t)
                                    if (g) return g == e
                                    ;(r |= a), l.set(t, e)
                                    var v = jt(d(t), d(e), r, o, s, l)
                                    return l.delete(t), v
                                  case k:
                                    if (yt) return yt.call(t) == yt.call(e)
                                }
                                return !1
                              })(t, e, x, i, r, l, d)
                        )
                      if (!(i & n)) {
                        var C = S && K.call(t, '__wrapped__'),
                          j = T && K.call(e, '__wrapped__')
                        if (C || j) {
                          var L = C ? t.value() : t,
                            P = j ? e.value() : e
                          return d || (d = new At()), l(L, P, i, r, d)
                        }
                      }
                      return (
                        !!O &&
                        (d || (d = new At()),
                        (function(t, e, i, a, r, o) {
                          var s = i & n,
                            l = Lt(t),
                            c = l.length
                          if (c != Lt(e).length && !s) return !1
                          for (var p = c; p--; ) {
                            var u = l[p]
                            if (!(s ? u in e : K.call(e, u))) return !1
                          }
                          var d = o.get(t)
                          if (d && o.get(e)) return d == e
                          var h = !0
                          o.set(t, e), o.set(e, t)
                          for (var m = s; ++p < c; ) {
                            var f = t[(u = l[p])],
                              g = e[u]
                            if (a)
                              var v = s
                                ? a(g, f, u, e, t, o)
                                : a(f, g, u, t, e, o)
                            if (
                              !(void 0 === v ? f === g || r(f, g, i, a, o) : v)
                            ) {
                              h = !1
                              break
                            }
                            m || (m = 'constructor' == u)
                          }
                          if (h && !m) {
                            var x = t.constructor,
                              b = e.constructor
                            x != b &&
                              'constructor' in t &&
                              'constructor' in e &&
                              !(
                                'function' == typeof x &&
                                x instanceof x &&
                                'function' == typeof b &&
                                b instanceof b
                              ) &&
                              (h = !1)
                          }
                          return o.delete(t), o.delete(e), h
                        })(t, e, i, r, l, d))
                      )
                    })(t, e, i, r, Ct, l))
              )
            }
            function jt(t, e, i, r, o, s) {
              var l = i & n,
                c = t.length,
                p = e.length
              if (c != p && !(l && p > c)) return !1
              var u = s.get(t)
              if (u && s.get(e)) return u == e
              var d = -1,
                h = !0,
                m = i & a ? new Et() : void 0
              for (s.set(t, e), s.set(e, t); ++d < c; ) {
                var f = t[d],
                  g = e[d]
                if (r) var v = l ? r(g, f, d, e, t, s) : r(f, g, d, t, e, s)
                if (void 0 !== v) {
                  if (v) continue
                  h = !1
                  break
                }
                if (m) {
                  if (
                    !B(e, function(t, e) {
                      if (((n = e), !m.has(n) && (f === t || o(f, t, i, r, s))))
                        return m.push(e)
                      var n
                    })
                  ) {
                    h = !1
                    break
                  }
                } else if (f !== g && !o(f, g, i, r, s)) {
                  h = !1
                  break
                }
              }
              return s.delete(t), s.delete(e), h
            }
            function Lt(t) {
              return (function(t, e, i) {
                var n = Wt(t)
                return Rt(t)
                  ? n
                  : (function(t, e) {
                      for (var i = -1, n = e.length, a = t.length; ++i < n; )
                        t[a + i] = e[i]
                      return t
                    })(n, i(t))
              })(t, 0, Nt)
            }
            function Pt(t, e) {
              var i,
                n,
                a = t.__data__
              return ('string' == (n = typeof (i = e)) ||
              'number' == n ||
              'symbol' == n ||
              'boolean' == n
              ? '__proto__' !== i
              : null === i)
                ? a['string' == typeof e ? 'string' : 'hash']
                : a.map
            }
            function qt(t, e) {
              var i = (function(t, e) {
                return null == t ? void 0 : t[e]
              })(t, e)
              return (function(t) {
                return (
                  !(!Vt(t) || ((e = t), X && X in e)) &&
                  (Ht(t) ? Y : S).test(Mt(t))
                )
                var e
              })(i)
                ? i
                : void 0
            }
            ;(wt.prototype.clear = function() {
              ;(this.__data__ = ht ? ht(null) : {}), (this.size = 0)
            }),
              (wt.prototype.delete = function(t) {
                var e = this.has(t) && delete this.__data__[t]
                return (this.size -= e ? 1 : 0), e
              }),
              (wt.prototype.get = function(t) {
                var e = this.__data__
                if (ht) {
                  var n = e[t]
                  return n === i ? void 0 : n
                }
                return K.call(e, t) ? e[t] : void 0
              }),
              (wt.prototype.has = function(t) {
                var e = this.__data__
                return ht ? void 0 !== e[t] : K.call(e, t)
              }),
              (wt.prototype.set = function(t, e) {
                var n = this.__data__
                return (
                  (this.size += this.has(t) ? 0 : 1),
                  (n[t] = ht && void 0 === e ? i : e),
                  this
                )
              }),
              (kt.prototype.clear = function() {
                ;(this.__data__ = []), (this.size = 0)
              }),
              (kt.prototype.delete = function(t) {
                var e = this.__data__,
                  i = St(e, t)
                return !(
                  i < 0 ||
                  (i == e.length - 1 ? e.pop() : nt.call(e, i, 1),
                  --this.size,
                  0)
                )
              }),
              (kt.prototype.get = function(t) {
                var e = this.__data__,
                  i = St(e, t)
                return i < 0 ? void 0 : e[i][1]
              }),
              (kt.prototype.has = function(t) {
                return St(this.__data__, t) > -1
              }),
              (kt.prototype.set = function(t, e) {
                var i = this.__data__,
                  n = St(i, t)
                return (
                  n < 0 ? (++this.size, i.push([t, e])) : (i[n][1] = e), this
                )
              }),
              (_t.prototype.clear = function() {
                ;(this.size = 0),
                  (this.__data__ = {
                    hash: new wt(),
                    map: new (ct || kt)(),
                    string: new wt(),
                  })
              }),
              (_t.prototype.delete = function(t) {
                var e = Pt(this, t).delete(t)
                return (this.size -= e ? 1 : 0), e
              }),
              (_t.prototype.get = function(t) {
                return Pt(this, t).get(t)
              }),
              (_t.prototype.has = function(t) {
                return Pt(this, t).has(t)
              }),
              (_t.prototype.set = function(t, e) {
                var i = Pt(this, t),
                  n = i.size
                return i.set(t, e), (this.size += i.size == n ? 0 : 1), this
              }),
              (Et.prototype.add = Et.prototype.push = function(t) {
                return this.__data__.set(t, i), this
              }),
              (Et.prototype.has = function(t) {
                return this.__data__.has(t)
              }),
              (At.prototype.clear = function() {
                ;(this.__data__ = new kt()), (this.size = 0)
              }),
              (At.prototype.delete = function(t) {
                var e = this.__data__,
                  i = e.delete(t)
                return (this.size = e.size), i
              }),
              (At.prototype.get = function(t) {
                return this.__data__.get(t)
              }),
              (At.prototype.has = function(t) {
                return this.__data__.has(t)
              }),
              (At.prototype.set = function(t, e) {
                var i = this.__data__
                if (i instanceof kt) {
                  var n = i.__data__
                  if (!ct || n.length < 199)
                    return n.push([t, e]), (this.size = ++i.size), this
                  i = this.__data__ = new _t(n)
                }
                return i.set(t, e), (this.size = i.size), this
              })
            var Nt = rt
                ? function(t) {
                    return null == t
                      ? []
                      : ((t = Object(t)),
                        (function(t, e) {
                          for (
                            var i = -1,
                              n = null == t ? 0 : t.length,
                              a = 0,
                              r = [];
                            ++i < n;

                          ) {
                            var o = t[i]
                            e(o) && (r[a++] = o)
                          }
                          return r
                        })(rt(t), function(e) {
                          return it.call(t, e)
                        }))
                  }
                : function() {
                    return []
                  },
              It = Tt
            function zt(t, e) {
              return (
                !!(e = null == e ? r : e) &&
                ('number' == typeof t || T.test(t)) &&
                t > -1 &&
                t % 1 == 0 &&
                t < e
              )
            }
            function Mt(t) {
              if (null != t) {
                try {
                  return J.call(t)
                } catch (t) {}
                try {
                  return t + ''
                } catch (t) {}
              }
              return ''
            }
            function Bt(t, e) {
              return t === e || (t != t && e != e)
            }
            ;((lt && It(new lt(new ArrayBuffer(1))) != A) ||
              (ct && It(new ct()) != m) ||
              (pt && '[object Promise]' != It(pt.resolve())) ||
              (ut && It(new ut()) != y) ||
              (dt && '[object WeakMap]' != It(new dt()))) &&
              (It = function(t) {
                var e = Tt(t),
                  i = e == v ? t.constructor : void 0,
                  n = i ? Mt(i) : ''
                if (n)
                  switch (n) {
                    case mt:
                      return A
                    case ft:
                      return m
                    case gt:
                      return '[object Promise]'
                    case vt:
                      return y
                    case xt:
                      return '[object WeakMap]'
                  }
                return e
              })
            var Dt = Ot(
                (function() {
                  return arguments
                })(),
              )
                ? Ot
                : function(t) {
                    return Ft(t) && K.call(t, 'callee') && !it.call(t, 'callee')
                  },
              Rt = Array.isArray,
              Ut =
                ot ||
                function() {
                  return !1
                }
            function Ht(t) {
              if (!Vt(t)) return !1
              var e = Tt(t)
              return e == d || e == h || e == l || e == x
            }
            function $t(t) {
              return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
            }
            function Vt(t) {
              var e = typeof t
              return null != t && ('object' == e || 'function' == e)
            }
            function Ft(t) {
              return null != t && 'object' == typeof t
            }
            var Gt = M
              ? (function(t) {
                  return function(e) {
                    return t(e)
                  }
                })(M)
              : function(t) {
                  return Ft(t) && $t(t.length) && !!O[Tt(t)]
                }
            function Wt(t) {
              return null != (e = t) && $t(e.length) && !Ht(e)
                ? (function(t, e) {
                    var i = Rt(t),
                      n = !i && Dt(t),
                      a = !i && !n && Ut(t),
                      r = !i && !n && !a && Gt(t),
                      o = i || n || a || r,
                      s = o
                        ? (function(t, e) {
                            for (var i = -1, n = Array(t); ++i < t; )
                              n[i] = e(i)
                            return n
                          })(t.length, String)
                        : [],
                      l = s.length
                    for (var c in t)
                      (!e && !K.call(t, c)) ||
                        (o &&
                          ('length' == c ||
                            (a && ('offset' == c || 'parent' == c)) ||
                            (r &&
                              ('buffer' == c ||
                                'byteLength' == c ||
                                'byteOffset' == c)) ||
                            zt(c, l))) ||
                        s.push(c)
                    return s
                  })(t)
                : (function(t) {
                    if (
                      ((i = (e = t) && e.constructor),
                      e !== (('function' == typeof i && i.prototype) || G))
                    )
                      return st(t)
                    var e,
                      i,
                      n = []
                    for (var a in Object(t))
                      K.call(t, a) && 'constructor' != a && n.push(a)
                    return n
                  })(t)
              var e
            }
            t.exports = function(t, e) {
              return Ct(t, e)
            }
          }.call(this, i(24)(t)))
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(19)
          e.StringPredicate = n.StringPredicate
          const a = i(21)
          e.NumberPredicate = a.NumberPredicate
          const r = i(22)
          e.BooleanPredicate = r.BooleanPredicate
          const o = i(0),
            s = i(23)
          e.ArrayPredicate = s.ArrayPredicate
          const l = i(25)
          e.ObjectPredicate = l.ObjectPredicate
          const c = i(30)
          e.DatePredicate = c.DatePredicate
          const p = i(31)
          e.ErrorPredicate = p.ErrorPredicate
          const u = i(32)
          e.MapPredicate = u.MapPredicate
          const d = i(33)
          e.WeakMapPredicate = d.WeakMapPredicate
          const h = i(34)
          e.SetPredicate = h.SetPredicate
          const m = i(35)
          e.WeakSetPredicate = m.WeakSetPredicate
          const f = i(36)
          ;(e.AnyPredicate = f.AnyPredicate),
            (e.default = (t, e) => (
              Object.defineProperties(t, {
                string: {get: () => new n.StringPredicate(e)},
                number: {get: () => new a.NumberPredicate(e)},
                boolean: {get: () => new r.BooleanPredicate(e)},
                undefined: {get: () => new o.Predicate('undefined', e)},
                null: {get: () => new o.Predicate('null', e)},
                nullOrUndefined: {
                  get: () => new o.Predicate('nullOrUndefined', e),
                },
                nan: {get: () => new o.Predicate('nan', e)},
                symbol: {get: () => new o.Predicate('symbol', e)},
                array: {get: () => new s.ArrayPredicate(e)},
                object: {get: () => new l.ObjectPredicate(e)},
                date: {get: () => new c.DatePredicate(e)},
                error: {get: () => new p.ErrorPredicate(e)},
                map: {get: () => new u.MapPredicate(e)},
                weakMap: {get: () => new d.WeakMapPredicate(e)},
                set: {get: () => new h.SetPredicate(e)},
                weakSet: {get: () => new m.WeakSetPredicate(e)},
                function: {get: () => new o.Predicate('Function', e)},
                buffer: {get: () => new o.Predicate('Buffer', e)},
                regExp: {get: () => new o.Predicate('RegExp', e)},
                promise: {get: () => new o.Predicate('Promise', e)},
                typedArray: {get: () => new o.Predicate('TypedArray', e)},
                int8Array: {get: () => new o.Predicate('Int8Array', e)},
                uint8Array: {get: () => new o.Predicate('Uint8Array', e)},
                uint8ClampedArray: {
                  get: () => new o.Predicate('Uint8ClampedArray', e),
                },
                int16Array: {get: () => new o.Predicate('Int16Array', e)},
                uint16Array: {get: () => new o.Predicate('Uint16Array', e)},
                int32Array: {get: () => new o.Predicate('Int32Array', e)},
                uint32Array: {get: () => new o.Predicate('Uint32Array', e)},
                float32Array: {get: () => new o.Predicate('Float32Array', e)},
                float64Array: {get: () => new o.Predicate('Float64Array', e)},
                arrayBuffer: {get: () => new o.Predicate('ArrayBuffer', e)},
                dataView: {get: () => new o.Predicate('DataView', e)},
                iterable: {get: () => new o.Predicate('Iterable', e)},
                any: {value: (...t) => new f.AnyPredicate(t, e)},
              }),
              t
            ))
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(4))
          e.default = (t, e) => {
            try {
              for (const i of t) a.default(i, e)
              return !0
            } catch (t) {
              return t.message
            }
          }
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0}),
            (e.ArgumentError = class extends Error {
              constructor(t, e) {
                super(t),
                  Error.captureStackTrace(this, e),
                  (this.name = 'ArgumentError')
              }
            })
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(2)
          e.default = function t(e, i, a) {
            a[n.testSymbol](e, t, i)
          }
        },
        function(t, e, i) {
          'use strict'
          const n = () => {
            const t = Error.prepareStackTrace
            Error.prepareStackTrace = (t, e) => e
            const e = new Error().stack.slice(1)
            return (Error.prepareStackTrace = t), e
          }
          ;(t.exports = n), (t.exports.default = n)
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(12)),
            r = n(i(14)),
            o = n(i(15)),
            s = /^.*?\((.*?)[,)]/
          e.inferLabel = t => {
            if (!o.default) return
            const e = a.default(),
              i = t[1],
              n = i.getFileName(),
              l = i.getLineNumber(),
              c = i.getColumnNumber()
            if (!n || null === l || null === c) return
            let p = []
            try {
              p = e.readFileSync(n, 'utf8').split('\n')
            } catch (t) {
              return
            }
            let u = p[l - 1]
            if (!u) return
            u = u.slice(c - 1)
            const d = s.exec(u)
            if (!d || !d[1]) return
            const h = d[1]
            return r.default(h) || r.default(h.split('.').pop()) ? h : void 0
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(13))
          e.default = () => a.default('fs')
        },
        function(module, exports, __webpack_require__) {
          'use strict'
          let customRequire
          Object.defineProperty(exports, '__esModule', {value: !0})
          try {
            customRequire =
              'function' === global.__non_webpack_require__
                ? global.__non_webpack_require__
                : eval('require')
          } catch (t) {
            customRequire = () => {}
          }
          exports.default = customRequire
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = /^[a-z$_][a-z$_0-9]*$/i,
            a = new Set([
              'undefined',
              'null',
              'true',
              'false',
              'super',
              'this',
              'Infinity',
              'NaN',
            ])
          e.default = t => t && !a.has(t) && n.test(t)
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0}),
            (e.default = Boolean(
              'undefined' != typeof process &&
                process.versions &&
                process.versions.node,
            ))
        },
        function(t, e) {
          t.exports = __webpack_require__(8)
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(0)
          e.not = t => {
            const e = t.addValidator
            return (
              (t.addValidator = i => {
                const a = i.validator,
                  r = i.message
                return (
                  (i.message = (t, e) => `[NOT] ${r(t, e)}`),
                  (i.validator = t => !a(t)),
                  t[n.validatorSymbol].push(i),
                  (t.addValidator = e),
                  t
                )
              }),
              t
            )
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(6))
          e.default = t => (
            Object.defineProperties(t, {
              optional: {get: () => a.default({}, {optional: !0})},
            }),
            t
          )
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(20)),
            r = i(0)
          e.StringPredicate = class extends r.Predicate {
            constructor(t) {
              super('string', t)
            }
            length(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have length \`${t}\`, got \`${e}\``,
                validator: e => e.length === t,
              })
            }
            minLength(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a minimum length of \`${t}\`, got \`${e}\``,
                validator: e => e.length >= t,
              })
            }
            maxLength(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a maximum length of \`${t}\`, got \`${e}\``,
                validator: e => e.length <= t,
              })
            }
            matches(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to match \`${t}\`, got \`${e}\``,
                validator: e => t.test(e),
              })
            }
            startsWith(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to start with \`${t}\`, got \`${e}\``,
                validator: e => e.startsWith(t),
              })
            }
            endsWith(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to end with \`${t}\`, got \`${e}\``,
                validator: e => e.endsWith(t),
              })
            }
            includes(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to include \`${t}\`, got \`${e}\``,
                validator: e => e.includes(t),
              })
            }
            oneOf(t) {
              return this.addValidator({
                message: (e, i) => {
                  let n = JSON.stringify(t)
                  if (t.length > 10) {
                    const e = t.length - 10
                    n = JSON.stringify(t.slice(0, 10)).replace(
                      /]$/,
                      `,…+${e} more]`,
                    )
                  }
                  return `Expected ${i} to be one of \`${n}\`, got \`${e}\``
                },
                validator: e => t.includes(e),
              })
            }
            get empty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be empty, got \`${t}\``,
                validator: t => '' === t,
              })
            }
            get nonEmpty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to not be empty`,
                validator: t => '' !== t,
              })
            }
            equals(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be equal to \`${t}\`, got \`${e}\``,
                validator: e => e === t,
              })
            }
            get alphanumeric() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be alphanumeric, got \`${t}\``,
                validator: t => /^[a-z\d]+$/i.test(t),
              })
            }
            get alphabetical() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be alphabetical, got \`${t}\``,
                validator: t => /^[a-z]+$/gi.test(t),
              })
            }
            get numeric() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be numeric, got \`${t}\``,
                validator: t => /^(\+|-)?\d+$/i.test(t),
              })
            }
            get date() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be a date, got \`${t}\``,
                validator: a.default,
              })
            }
            get lowercase() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be lowercase, got \`${t}\``,
                validator: t => '' !== t.trim() && t === t.toLowerCase(),
              })
            }
            get uppercase() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be uppercase, got \`${t}\``,
                validator: t => '' !== t.trim() && t === t.toUpperCase(),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          t.exports = function(t) {
            return !isNaN(Date.parse(t))
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(1)),
            r = i(0)
          e.NumberPredicate = class extends r.Predicate {
            constructor(t) {
              super('number', t)
            }
            inRange(t, e) {
              return this.addValidator({
                message: (i, n) =>
                  `Expected ${n} to be in range [${t}..${e}], got ${i}`,
                validator: i => a.default.inRange(i, [t, e]),
              })
            }
            greaterThan(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be greater than ${t}, got ${e}`,
                validator: e => e > t,
              })
            }
            greaterThanOrEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be greater than or equal to ${t}, got ${e}`,
                validator: e => e >= t,
              })
            }
            lessThan(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be less than ${t}, got ${e}`,
                validator: e => e < t,
              })
            }
            lessThanOrEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be less than or equal to ${t}, got ${e}`,
                validator: e => e <= t,
              })
            }
            equal(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be equal to ${t}, got ${e}`,
                validator: e => e === t,
              })
            }
            get integer() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be an integer, got ${t}`,
                validator: t => a.default.integer(t),
              })
            }
            get finite() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be finite, got ${t}`,
                validator: t => !a.default.infinite(t),
              })
            }
            get infinite() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be infinite, got ${t}`,
                validator: t => a.default.infinite(t),
              })
            }
            get positive() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be positive, got ${t}`,
                validator: t => t > 0,
              })
            }
            get negative() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be negative, got ${t}`,
                validator: t => t < 0,
              })
            }
            get integerOrInfinite() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be an integer or infinite, got ${t}`,
                validator: t => a.default.integer(t) || a.default.infinite(t),
              })
            }
            get uint8() {
              return this.integer.inRange(0, 255)
            }
            get uint16() {
              return this.integer.inRange(0, 65535)
            }
            get uint32() {
              return this.integer.inRange(0, 4294967295)
            }
            get int8() {
              return this.integer.inRange(-128, 127)
            }
            get int16() {
              return this.integer.inRange(-32768, 32767)
            }
            get int32() {
              return this.integer.inRange(-2147483648, 2147483647)
            }
          }
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(0)
          e.BooleanPredicate = class extends n.Predicate {
            constructor(t) {
              super('boolean', t)
            }
            get true() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be true, got ${t}`,
                validator: t => !0 === t,
              })
            }
            get false() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be false, got ${t}`,
                validator: t => !1 === t,
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(5)),
            r = n(i(4)),
            o = i(0)
          e.ArrayPredicate = class extends o.Predicate {
            constructor(t) {
              super('array', t)
            }
            length(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have length \`${t}\`, got \`${e.length}\``,
                validator: e => e.length === t,
              })
            }
            minLength(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a minimum length of \`${t}\`, got \`${
                    e.length
                  }\``,
                validator: e => e.length >= t,
              })
            }
            maxLength(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a maximum length of \`${t}\`, got \`${
                    e.length
                  }\``,
                validator: e => e.length <= t,
              })
            }
            startsWith(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to start with \`${t}\`, got \`${e[0]}\``,
                validator: e => e[0] === t,
              })
            }
            endsWith(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to end with \`${t}\`, got \`${
                    e[e.length - 1]
                  }\``,
                validator: e => e[e.length - 1] === t,
              })
            }
            includes(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to include all elements of \`${JSON.stringify(
                    t,
                  )}\`, got \`${JSON.stringify(e)}\``,
                validator: e => t.every(t => -1 !== e.indexOf(t)),
              })
            }
            includesAny(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to include any element of \`${JSON.stringify(
                    t,
                  )}\`, got \`${JSON.stringify(e)}\``,
                validator: e => t.some(t => -1 !== e.indexOf(t)),
              })
            }
            get empty() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be empty, got \`${JSON.stringify(t)}\``,
                validator: t => 0 === t.length,
              })
            }
            get nonEmpty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to not be empty`,
                validator: t => t.length > 0,
              })
            }
            deepEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be deeply equal to \`${JSON.stringify(
                    t,
                  )}\`, got \`${JSON.stringify(e)}\``,
                validator: e => a.default(e, t),
              })
            }
            ofType(t) {
              let e
              return this.addValidator({
                message: (t, i) => `(${i}) ${e}`,
                validator: i => {
                  try {
                    for (const e of i) r.default(e, t)
                    return !0
                  } catch (t) {
                    return (e = t.message), !1
                  }
                },
              })
            }
          }
        },
        function(t, e) {
          t.exports = function(t) {
            return (
              t.webpackPolyfill ||
                ((t.deprecate = function() {}),
                (t.paths = []),
                t.children || (t.children = []),
                Object.defineProperty(t, 'loaded', {
                  enumerable: !0,
                  get: function() {
                    return t.l
                  },
                }),
                Object.defineProperty(t, 'id', {
                  enumerable: !0,
                  get: function() {
                    return t.i
                  },
                }),
                (t.webpackPolyfill = 1)),
              t
            )
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(1)),
            r = n(i(26)),
            o = n(i(5)),
            s = i(0),
            l = n(i(3)),
            c = n(i(7)),
            p = n(i(28)),
            u = i(29)
          e.ObjectPredicate = class extends s.Predicate {
            constructor(t) {
              super('object', t)
            }
            get plain() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to be a plain object`,
                validator: t => a.default.plainObject(t),
              })
            }
            get empty() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be empty, got \`${JSON.stringify(t)}\``,
                validator: t => 0 === Object.keys(t).length,
              })
            }
            get nonEmpty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to not be empty`,
                validator: t => Object.keys(t).length > 0,
              })
            }
            valuesOfType(t) {
              return this.addValidator({
                message: (t, e, i) => `(${e}) ${i}`,
                validator: e => {
                  const i = Object.keys(e).map(t => e[t])
                  return c.default(i, t)
                },
              })
            }
            deepValuesOfType(t) {
              return this.addValidator({
                message: (t, e, i) => `(${e}) ${i}`,
                validator: e => p.default(e, t),
              })
            }
            deepEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be deeply equal to \`${JSON.stringify(
                    t,
                  )}\`, got \`${JSON.stringify(e)}\``,
                validator: e => o.default(e, t),
              })
            }
            instanceOf(t) {
              return this.addValidator({
                message: (e, i) => {
                  let n = e.constructor.name
                  return (
                    (n && 'Object' !== n) || (n = JSON.stringify(e)),
                    `Expected ${i} \`${n}\` to be of type \`${t.name}\``
                  )
                },
                validator: e => e instanceof t,
              })
            }
            hasKeys(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have keys \`${JSON.stringify(i)}\``,
                validator: e => l.default({has: t => r.default.has(e, t)}, t),
              })
            }
            hasAnyKeys(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any key of \`${JSON.stringify(t)}\``,
                validator: e => t.some(t => r.default.has(e, t)),
              })
            }
            partialShape(t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `${i.replace('Expected', 'Expected property')} in ${e}`,
                validator: e => u.partial(e, t),
              })
            }
            exactShape(t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `${i.replace('Expected', 'Expected property')} in ${e}`,
                validator: e => u.exact(e, t),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          const n = i(27)
          function a(t) {
            const e = t.split('.'),
              i = []
            for (let t = 0; t < e.length; t++) {
              let n = e[t]
              for (; '\\' === n[n.length - 1] && void 0 !== e[t + 1]; )
                (n = n.slice(0, -1) + '.'), (n += e[++t])
              i.push(n)
            }
            return i
          }
          t.exports = {
            get(t, e, i) {
              if (!n(t) || 'string' != typeof e) return void 0 === i ? t : i
              const r = a(e)
              for (let e = 0; e < r.length; e++) {
                if (!Object.prototype.propertyIsEnumerable.call(t, r[e]))
                  return i
                if (null == (t = t[r[e]])) {
                  if (e !== r.length - 1) return i
                  break
                }
              }
              return t
            },
            set(t, e, i) {
              if (!n(t) || 'string' != typeof e) return t
              const r = t,
                o = a(e)
              for (let e = 0; e < o.length; e++) {
                const a = o[e]
                n(t[a]) || (t[a] = {}),
                  e === o.length - 1 && (t[a] = i),
                  (t = t[a])
              }
              return r
            },
            delete(t, e) {
              if (!n(t) || 'string' != typeof e) return
              const i = a(e)
              for (let e = 0; e < i.length; e++) {
                const a = i[e]
                if (e === i.length - 1) return void delete t[a]
                if (((t = t[a]), !n(t))) return
              }
            },
            has(t, e) {
              if (!n(t) || 'string' != typeof e) return !1
              const i = a(e)
              for (let e = 0; e < i.length; e++) {
                if (!n(t)) return !1
                if (!(i[e] in t)) return !1
                t = t[i[e]]
              }
              return !0
            },
          }
        },
        function(t, e, i) {
          'use strict'
          t.exports = function(t) {
            var e = typeof t
            return null !== t && ('object' === e || 'function' === e)
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(1)),
            r = n(i(4)),
            o = (t, e) =>
              a.default.plainObject(t)
                ? Object.keys(t).every(i => o(t[i], e))
                : (r.default(t, e), !0)
          e.default = (t, e) => {
            try {
              return o(t, e)
            } catch (t) {
              return t.message
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(1)),
            r = n(i(9)),
            o = i(2)
          ;(e.partial = function t(e, i, n) {
            try {
              for (const s of Object.keys(i)) {
                const l = n ? `${n}.${s}` : s
                if (o.isPredicate(i[s])) r.default(e[s], l, i[s])
                else if (a.default.plainObject(i[s])) {
                  const n = t(e[s], i[s], l)
                  if (!0 !== n) return n
                }
              }
              return !0
            } catch (t) {
              return t.message
            }
          }),
            (e.exact = function t(e, i, n) {
              try {
                const s = new Set(Object.keys(e))
                for (const l of Object.keys(i)) {
                  s.delete(l)
                  const c = n ? `${n}.${l}` : l
                  if (o.isPredicate(i[l])) r.default(e[l], c, i[l])
                  else if (a.default.plainObject(i[l])) {
                    const n = t(e[l], i[l], c)
                    if (!0 !== n) return n
                  }
                }
                if (s.size > 0) {
                  const t = Array.from(s.keys())[0]
                  return `Did not expect property \`${
                    n ? `${n}.${t}` : t
                  }\` to exist, got \`${e[t]}\``
                }
                return !0
              } catch (t) {
                return t.message
              }
            })
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(0)
          e.DatePredicate = class extends n.Predicate {
            constructor(t) {
              super('date', t)
            }
            before(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} ${e.toISOString()} to be before ${t.toISOString()}`,
                validator: e => e.getTime() < t.getTime(),
              })
            }
            after(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} ${e.toISOString()} to be after ${t.toISOString()}`,
                validator: e => e.getTime() > t.getTime(),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(0)
          e.ErrorPredicate = class extends n.Predicate {
            constructor(t) {
              super('error', t)
            }
            name(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have name \`${t}\`, got \`${e.name}\``,
                validator: e => e.name === t,
              })
            }
            message(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} message to be \`${t}\`, got \`${e.message}\``,
                validator: e => e.message === t,
              })
            }
            messageIncludes(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} message to include \`${t}\`, got \`${
                    e.message
                  }\``,
                validator: e => e.message.includes(t),
              })
            }
            hasKeys(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} message to have keys \`${t.join('`, `')}\``,
                validator: e => t.every(t => e.hasOwnProperty(t)),
              })
            }
            instanceOf(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} \`${e.name}\` to be of type \`${t.name}\``,
                validator: e => e instanceof t,
              })
            }
            get typeError() {
              return this.instanceOf(TypeError)
            }
            get evalError() {
              return this.instanceOf(EvalError)
            }
            get rangeError() {
              return this.instanceOf(RangeError)
            }
            get referenceError() {
              return this.instanceOf(ReferenceError)
            }
            get syntaxError() {
              return this.instanceOf(SyntaxError)
            }
            get uriError() {
              return this.instanceOf(URIError)
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(5)),
            r = i(0),
            o = n(i(3)),
            s = n(i(7))
          e.MapPredicate = class extends r.Predicate {
            constructor(t) {
              super('Map', t)
            }
            size(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have size \`${t}\`, got \`${e.size}\``,
                validator: e => e.size === t,
              })
            }
            minSize(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a minimum size of \`${t}\`, got \`${
                    e.size
                  }\``,
                validator: e => e.size >= t,
              })
            }
            maxSize(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a maximum size of \`${t}\`, got \`${
                    e.size
                  }\``,
                validator: e => e.size <= t,
              })
            }
            hasKeys(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have keys \`${JSON.stringify(i)}\``,
                validator: e => o.default(e, t),
              })
            }
            hasAnyKeys(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any key of \`${JSON.stringify(t)}\``,
                validator: e => t.some(t => e.has(t)),
              })
            }
            hasValues(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have values \`${JSON.stringify(i)}\``,
                validator: e => o.default(new Set(e.values()), t),
              })
            }
            hasAnyValues(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any value of \`${JSON.stringify(t)}\``,
                validator: e => {
                  const i = new Set(e.values())
                  return t.some(t => i.has(t))
                },
              })
            }
            keysOfType(t) {
              return this.addValidator({
                message: (t, e, i) => `(${e}) ${i}`,
                validator: e => s.default(e.keys(), t),
              })
            }
            valuesOfType(t) {
              return this.addValidator({
                message: (t, e, i) => `(${e}) ${i}`,
                validator: e => s.default(e.values(), t),
              })
            }
            get empty() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be empty, got \`${JSON.stringify(
                    Array.from(t),
                  )}\``,
                validator: t => 0 === t.size,
              })
            }
            get nonEmpty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to not be empty`,
                validator: t => t.size > 0,
              })
            }
            deepEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be deeply equal to \`${JSON.stringify(
                    Array.from(t),
                  )}\`, got \`${JSON.stringify(Array.from(e))}\``,
                validator: e => a.default(e, t),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = i(0),
            r = n(i(3))
          e.WeakMapPredicate = class extends a.Predicate {
            constructor(t) {
              super('WeakMap', t)
            }
            hasKeys(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have keys \`${JSON.stringify(i)}\``,
                validator: e => r.default(e, t),
              })
            }
            hasAnyKeys(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any key of \`${JSON.stringify(t)}\``,
                validator: e => t.some(t => e.has(t)),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = n(i(5)),
            r = i(0),
            o = n(i(3)),
            s = n(i(7))
          e.SetPredicate = class extends r.Predicate {
            constructor(t) {
              super('Set', t)
            }
            size(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have size \`${t}\`, got \`${e.size}\``,
                validator: e => e.size === t,
              })
            }
            minSize(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a minimum size of \`${t}\`, got \`${
                    e.size
                  }\``,
                validator: e => e.size >= t,
              })
            }
            maxSize(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have a maximum size of \`${t}\`, got \`${
                    e.size
                  }\``,
                validator: e => e.size <= t,
              })
            }
            has(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have items \`${JSON.stringify(i)}\``,
                validator: e => o.default(e, t),
              })
            }
            hasAny(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any item of \`${JSON.stringify(t)}\``,
                validator: e => t.some(t => e.has(t)),
              })
            }
            ofType(t) {
              return this.addValidator({
                message: (t, e, i) => `(${e}) ${i}`,
                validator: e => s.default(e, t),
              })
            }
            get empty() {
              return this.addValidator({
                message: (t, e) =>
                  `Expected ${e} to be empty, got \`${JSON.stringify(
                    Array.from(t),
                  )}\``,
                validator: t => 0 === t.size,
              })
            }
            get nonEmpty() {
              return this.addValidator({
                message: (t, e) => `Expected ${e} to not be empty`,
                validator: t => t.size > 0,
              })
            }
            deepEqual(t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to be deeply equal to \`${JSON.stringify(
                    Array.from(t),
                  )}\`, got \`${JSON.stringify(Array.from(e))}\``,
                validator: e => a.default(e, t),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          var n =
            (this && this.__importDefault) ||
            function(t) {
              return t && t.__esModule ? t : {default: t}
            }
          Object.defineProperty(e, '__esModule', {value: !0})
          const a = i(0),
            r = n(i(3))
          e.WeakSetPredicate = class extends a.Predicate {
            constructor(t) {
              super('WeakSet', t)
            }
            has(...t) {
              return this.addValidator({
                message: (t, e, i) =>
                  `Expected ${e} to have items \`${JSON.stringify(i)}\``,
                validator: e => r.default(e, t),
              })
            }
            hasAny(...t) {
              return this.addValidator({
                message: (e, i) =>
                  `Expected ${i} to have any item of \`${JSON.stringify(t)}\``,
                validator: e => t.some(t => e.has(t)),
              })
            }
          }
        },
        function(t, e, i) {
          'use strict'
          Object.defineProperty(e, '__esModule', {value: !0})
          const n = i(8),
            a = i(2)
          e.AnyPredicate = class {
            constructor(t, e = {}) {
              ;(this.predicates = t), (this.options = e)
            }
            [a.testSymbol](t, e, i) {
              const a = ['Any predicate failed with the following errors:']
              for (const n of this.predicates)
                try {
                  return void e(t, i, n)
                } catch (e) {
                  if (void 0 === t && !0 === this.options.optional) return
                  a.push(`- ${e.message}`)
                }
              throw new n.ArgumentError(a.join('\n'), e)
            }
          }
        },
      ])
      const __export__ = module.exports.default
      ;(module.exports = __export__), (module.exports.default = __export__)
    },
    function(t, e, i) {
      const n = i(190),
        a = i(203),
        r = i(255),
        o = i(284),
        s = i(300),
        l = i(306)
      t.exports = {
        markdownToHtml: function(t) {
          return n()
            .use(a)
            .use(r)
            .use(o)
            .use(s)
            .use(l)
            .process(t)
            .then(t => t.contents)
        },
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(191),
        a = i(192),
        r = i(193),
        o = i(199),
        s = i(201),
        l = i(202)
      t.exports = (function t() {
        var e = []
        var i = o()
        var x = {}
        var b = !1
        var y = -1
        w.data = function(t, e) {
          if (s(t))
            return 2 === arguments.length
              ? (f('data', b), (x[t] = e), w)
              : (p.call(x, t) && x[t]) || null
          if (t) return f('data', b), (x = t), w
          return x
        }
        w.freeze = k
        w.attachers = e
        w.use = function(t) {
          var i
          if ((f('use', b), null == t));
          else if ('function' == typeof t) s.apply(null, arguments)
          else {
            if ('object' != typeof t)
              throw new Error('Expected usable value, not `' + t + '`')
            'length' in t ? o(t) : a(t)
          }
          i && (x.settings = n(x.settings || {}, i))
          return w
          function a(t) {
            o(t.plugins), t.settings && (i = n(i || {}, t.settings))
          }
          function r(t) {
            if ('function' == typeof t) s(t)
            else {
              if ('object' != typeof t)
                throw new Error('Expected usable value, not `' + t + '`')
              'length' in t ? s.apply(null, t) : a(t)
            }
          }
          function o(t) {
            var e, i
            if (null == t);
            else {
              if (!('object' == typeof t && 'length' in t))
                throw new Error('Expected a list of plugins, not `' + t + '`')
              for (e = t.length, i = -1; ++i < e; ) r(t[i])
            }
          }
          function s(t, i) {
            var a = (function(t) {
              var i,
                n = e.length,
                a = -1
              for (; ++a < n; ) if ((i = e[a])[0] === t) return i
            })(t)
            a
              ? (l(a[1]) && l(i) && (i = n(a[1], i)), (a[1] = i))
              : e.push(c.call(arguments))
          }
        }
        w.parse = function(t) {
          var e,
            i = r(t)
          if ((k(), h('parse', (e = w.Parser)), d(e)))
            return new e(String(i), i).parse()
          return e(String(i), i)
        }
        w.stringify = function(t, e) {
          var i,
            n = r(e)
          if ((k(), m('stringify', (i = w.Compiler)), g(t), d(i)))
            return new i(t, n).compile()
          return i(t, n)
        }
        w.run = _
        w.runSync = function(t, e) {
          var i,
            n = !1
          return (
            _(t, e, function(t, e) {
              ;(n = !0), a(t), (i = e)
            }),
            v('runSync', 'run', n),
            i
          )
        }
        w.process = E
        w.processSync = function(t) {
          var e,
            i = !1
          return (
            k(),
            h('processSync', w.Parser),
            m('processSync', w.Compiler),
            E((e = r(t)), function(t) {
              ;(i = !0), a(t)
            }),
            v('processSync', 'process', i),
            e
          )
        }
        return w
        function w() {
          for (var i = t(), a = e.length, r = -1; ++r < a; )
            i.use.apply(null, e[r])
          return i.data(n(!0, {}, x)), i
        }
        function k() {
          var t, n, a, r
          if (b) return w
          for (; ++y < e.length; )
            (t = e[y]),
              (n = t[0]),
              (a = t[1]),
              (r = null),
              !1 !== a &&
                (!0 === a && (t[1] = void 0),
                'function' == typeof (r = n.apply(w, t.slice(1))) && i.use(r))
          return (b = !0), (y = 1 / 0), w
        }
        function _(t, e, n) {
          if (
            (g(t),
            k(),
            n || 'function' != typeof e || ((n = e), (e = null)),
            !n)
          )
            return new Promise(a)
          function a(a, o) {
            i.run(t, r(e), function(e, i, r) {
              ;(i = i || t), e ? o(e) : a ? a(i) : n(null, i, r)
            })
          }
          a(null, n)
        }
        function E(t, e) {
          if ((k(), h('process', w.Parser), m('process', w.Compiler), !e))
            return new Promise(i)
          function i(i, n) {
            var a = r(t)
            u.run(w, {file: a}, function(t) {
              t ? n(t) : i ? i(a) : e(null, a)
            })
          }
          i(null, e)
        }
      })().freeze()
      var c = [].slice,
        p = {}.hasOwnProperty,
        u = o()
          .use(function(t, e) {
            e.tree = t.parse(e.file)
          })
          .use(function(t, e, i) {
            t.run(e.tree, e.file, function(t, n, a) {
              t ? i(t) : ((e.tree = n), (e.file = a), i())
            })
          })
          .use(function(t, e) {
            e.file.contents = t.stringify(e.tree, e.file)
          })
      function d(t) {
        return (
          'function' == typeof t &&
          (function(t) {
            var e
            for (e in t) return !0
            return !1
          })(t.prototype)
        )
      }
      function h(t, e) {
        if ('function' != typeof e)
          throw new Error('Cannot `' + t + '` without `Parser`')
      }
      function m(t, e) {
        if ('function' != typeof e)
          throw new Error('Cannot `' + t + '` without `Compiler`')
      }
      function f(t, e) {
        if (e)
          throw new Error(
            'Cannot invoke `' +
              t +
              '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.',
          )
      }
      function g(t) {
        if (!t || !s(t.type)) throw new Error('Expected node, got `' + t + '`')
      }
      function v(t, e, i) {
        if (!i)
          throw new Error('`' + t + '` finished async. Use `' + e + '` instead')
      }
    },
    function(t, e, i) {
      'use strict'
      var n = Object.prototype.hasOwnProperty,
        a = Object.prototype.toString,
        r = Object.defineProperty,
        o = Object.getOwnPropertyDescriptor,
        s = function(t) {
          return 'function' == typeof Array.isArray
            ? Array.isArray(t)
            : '[object Array]' === a.call(t)
        },
        l = function(t) {
          if (!t || '[object Object]' !== a.call(t)) return !1
          var e,
            i = n.call(t, 'constructor'),
            r =
              t.constructor &&
              t.constructor.prototype &&
              n.call(t.constructor.prototype, 'isPrototypeOf')
          if (t.constructor && !i && !r) return !1
          for (e in t);
          return void 0 === e || n.call(t, e)
        },
        c = function(t, e) {
          r && '__proto__' === e.name
            ? r(t, e.name, {
                enumerable: !0,
                configurable: !0,
                value: e.newValue,
                writable: !0,
              })
            : (t[e.name] = e.newValue)
        },
        p = function(t, e) {
          if ('__proto__' === e) {
            if (!n.call(t, e)) return
            if (o) return o(t, e).value
          }
          return t[e]
        }
      t.exports = function t() {
        var e,
          i,
          n,
          a,
          r,
          o,
          u = arguments[0],
          d = 1,
          h = arguments.length,
          m = !1
        for (
          'boolean' == typeof u && ((m = u), (u = arguments[1] || {}), (d = 2)),
            (null == u || ('object' != typeof u && 'function' != typeof u)) &&
              (u = {});
          d < h;
          ++d
        )
          if (null != (e = arguments[d]))
            for (i in e)
              (n = p(u, i)),
                u !== (a = p(e, i)) &&
                  (m && a && (l(a) || (r = s(a)))
                    ? (r
                        ? ((r = !1), (o = n && s(n) ? n : []))
                        : (o = n && l(n) ? n : {}),
                      c(u, {name: i, newValue: t(m, o, a)}))
                    : void 0 !== a && c(u, {name: i, newValue: a}))
        return u
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        if (t) throw t
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(194),
        a = i(196)
      t.exports = a
      var r = a.prototype
      function o(t, e, i) {
        var a = this.path,
          r = new n(t, e, i)
        return (
          a && ((r.name = a + ':' + r.name), (r.file = a)),
          (r.fatal = !1),
          this.messages.push(r),
          r
        )
      }
      ;(r.message = o),
        (r.info = function() {
          var t = this.message.apply(this, arguments)
          return (t.fatal = null), t
        }),
        (r.fail = function() {
          var t = this.message.apply(this, arguments)
          throw ((t.fatal = !0), t)
        }),
        (r.warn = o)
    },
    function(t, e, i) {
      'use strict'
      var n = i(195)
      function a() {}
      ;(t.exports = o), (a.prototype = Error.prototype), (o.prototype = new a())
      var r = o.prototype
      function o(t, e, i) {
        var a, r, o
        'string' == typeof e && ((i = e), (e = null)),
          (a = (function(t) {
            var e,
              i = [null, null]
            'string' == typeof t &&
              (-1 === (e = t.indexOf(':'))
                ? (i[1] = t)
                : ((i[0] = t.slice(0, e)), (i[1] = t.slice(e + 1))))
            return i
          })(i)),
          (r = n(e) || '1:1'),
          (o = {
            start: {line: null, column: null},
            end: {line: null, column: null},
          }),
          e && e.position && (e = e.position),
          e && (e.start ? ((o = e), (e = e.start)) : (o.start = e)),
          t.stack && ((this.stack = t.stack), (t = t.message)),
          (this.message = t),
          (this.name = r),
          (this.reason = t),
          (this.line = e ? e.line : null),
          (this.column = e ? e.column : null),
          (this.location = o),
          (this.source = a[0]),
          (this.ruleId = a[1])
      }
      ;(r.file = ''),
        (r.name = ''),
        (r.reason = ''),
        (r.message = ''),
        (r.stack = ''),
        (r.fatal = null),
        (r.column = null),
        (r.line = null)
    },
    function(t, e, i) {
      'use strict'
      var n = {}.hasOwnProperty
      function a(t) {
        return (
          (t && 'object' == typeof t) || (t = {}), o(t.line) + ':' + o(t.column)
        )
      }
      function r(t) {
        return (
          (t && 'object' == typeof t) || (t = {}), a(t.start) + '-' + a(t.end)
        )
      }
      function o(t) {
        return t && 'number' == typeof t ? t : 1
      }
      t.exports = function(t) {
        if (!t || 'object' != typeof t) return null
        if (n.call(t, 'position') || n.call(t, 'type')) return r(t.position)
        if (n.call(t, 'start') || n.call(t, 'end')) return r(t)
        if (n.call(t, 'line') || n.call(t, 'column')) return a(t)
        return null
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(16),
        a = i(197),
        r = i(198)
      t.exports = c
      var o = {}.hasOwnProperty,
        s = c.prototype
      s.toString = function(t) {
        var e = this.contents || ''
        return r(e) ? e.toString(t) : String(e)
      }
      var l = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']
      function c(t) {
        var e, i, n
        if (t) {
          if ('string' == typeof t || r(t)) t = {contents: t}
          else if ('message' in t && 'messages' in t) return t
        } else t = {}
        if (!(this instanceof c)) return new c(t)
        for (
          this.data = {},
            this.messages = [],
            this.history = [],
            this.cwd = process.cwd(),
            i = -1,
            n = l.length;
          ++i < n;

        )
          (e = l[i]), o.call(t, e) && (this[e] = t[e])
        for (e in t) -1 === l.indexOf(e) && (this[e] = t[e])
      }
      function p(t, e) {
        if (-1 !== t.indexOf(n.sep))
          throw new Error(
            '`' + e + '` cannot be a path: did not expect `' + n.sep + '`',
          )
      }
      function u(t, e) {
        if (!t) throw new Error('`' + e + '` cannot be empty')
      }
      function d(t, e) {
        if (!t)
          throw new Error('Setting `' + e + '` requires `path` to be set too')
      }
      Object.defineProperty(s, 'path', {
        get: function() {
          return this.history[this.history.length - 1]
        },
        set: function(t) {
          u(t, 'path'), t !== this.path && this.history.push(t)
        },
      }),
        Object.defineProperty(s, 'dirname', {
          get: function() {
            return 'string' == typeof this.path ? n.dirname(this.path) : void 0
          },
          set: function(t) {
            d(this.path, 'dirname'),
              (this.path = n.join(t || '', this.basename))
          },
        }),
        Object.defineProperty(s, 'basename', {
          get: function() {
            return 'string' == typeof this.path ? n.basename(this.path) : void 0
          },
          set: function(t) {
            u(t, 'basename'),
              p(t, 'basename'),
              (this.path = n.join(this.dirname || '', t))
          },
        }),
        Object.defineProperty(s, 'extname', {
          get: function() {
            return 'string' == typeof this.path ? n.extname(this.path) : void 0
          },
          set: function(t) {
            var e = t || ''
            if ((p(e, 'extname'), d(this.path, 'extname'), e)) {
              if ('.' !== e.charAt(0))
                throw new Error('`extname` must start with `.`')
              if (-1 !== e.indexOf('.', 1))
                throw new Error('`extname` cannot contain multiple dots')
            }
            this.path = a(this.path, e)
          },
        }),
        Object.defineProperty(s, 'stem', {
          get: function() {
            return 'string' == typeof this.path
              ? n.basename(this.path, this.extname)
              : void 0
          },
          set: function(t) {
            u(t, 'stem'),
              p(t, 'stem'),
              (this.path = n.join(this.dirname || '', t + (this.extname || '')))
          },
        })
    },
    function(t, e, i) {
      'use strict'
      var n = i(16)
      t.exports = function(t, e) {
        if ('string' != typeof t) return t
        if (0 === t.length) return t
        var i = n.basename(t, n.extname(t)) + e
        return n.join(n.dirname(t), i)
      }
    },
    function(t, e) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      t.exports = function(t) {
        return (
          null != t &&
          null != t.constructor &&
          'function' == typeof t.constructor.isBuffer &&
          t.constructor.isBuffer(t)
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(200)
      ;(t.exports = r), (r.wrap = n)
      var a = [].slice
      function r() {
        var t = [],
          e = {
            run: function() {
              var e = -1,
                i = a.call(arguments, 0, -1),
                r = arguments[arguments.length - 1]
              if ('function' != typeof r)
                throw new Error('Expected function as last argument, not ' + r)
              ;(function o(s) {
                var l = t[++e]
                var c = a.call(arguments, 0)
                var p = c.slice(1)
                var u = i.length
                var d = -1
                if (s) return void r(s)
                for (; ++d < u; )
                  (null !== p[d] && void 0 !== p[d]) || (p[d] = i[d])
                i = p
                l ? n(l, o).apply(null, i) : r.apply(null, [null].concat(i))
              }.apply(null, [null].concat(i)))
            },
            use: function(i) {
              if ('function' != typeof i)
                throw new Error('Expected `fn` to be a function, not ' + i)
              return t.push(i), e
            },
          }
        return e
      }
    },
    function(t, e, i) {
      'use strict'
      var n = [].slice
      t.exports = function(t, e) {
        var i
        return function() {
          var e,
            o = n.call(arguments, 0),
            s = t.length > o.length
          s && o.push(a)
          try {
            e = t.apply(null, o)
          } catch (t) {
            if (s && i) throw t
            return a(t)
          }
          s ||
            (e && 'function' == typeof e.then
              ? e.then(r, a)
              : e instanceof Error
              ? a(e)
              : r(e))
        }
        function a() {
          i || ((i = !0), e.apply(null, arguments))
        }
        function r(t) {
          a(null, t)
        }
      }
    },
    function(t, e) {
      var i = Object.prototype.toString
      t.exports = function(t) {
        return '[object String]' === i.call(t)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = Object.prototype.toString
      t.exports = function(t) {
        var e
        return (
          '[object Object]' === n.call(t) &&
          (null === (e = Object.getPrototypeOf(t)) ||
            e === Object.getPrototypeOf({}))
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(204),
        a = i(6),
        r = i(207)
      function o(t) {
        var e = this.data('settings'),
          i = n(r)
        ;(i.prototype.options = a(i.prototype.options, e, t)), (this.Parser = i)
      }
      ;(t.exports = o), (o.Parser = r)
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(205)
      t.exports = function(t) {
        var e, i, r
        for (i in (a(s, t), a(o, s), (e = s.prototype)))
          (r = e[i]) &&
            'object' == typeof r &&
            (e[i] = 'concat' in r ? r.concat() : n(r))
        return s
        function o(e) {
          return t.apply(this, e)
        }
        function s() {
          return this instanceof s ? t.apply(this, arguments) : new o(arguments)
        }
      }
    },
    function(t, e, i) {
      try {
        var n = i(20)
        if ('function' != typeof n.inherits) throw ''
        t.exports = n.inherits
      } catch (e) {
        t.exports = i(206)
      }
    },
    function(t, e) {
      'function' == typeof Object.create
        ? (t.exports = function(t, e) {
            ;(t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              }))
          })
        : (t.exports = function(t, e) {
            t.super_ = e
            var i = function() {}
            ;(i.prototype = e.prototype),
              (t.prototype = new i()),
              (t.prototype.constructor = t)
          })
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(208),
        r = i(209),
        o = i(210),
        s = i(211),
        l = i(215)
      function c(t, e) {
        ;(this.file = e),
          (this.offset = {}),
          (this.options = n(this.options)),
          this.setOptions({}),
          (this.inList = !1),
          (this.inBlock = !1),
          (this.inLink = !1),
          (this.atStart = !0),
          (this.toOffset = r(e).toOffset),
          (this.unescape = o(this, 'escape')),
          (this.decode = s(this))
      }
      t.exports = c
      var p = c.prototype
      function u(t) {
        var e,
          i = []
        for (e in t) i.push(e)
        return i
      }
      ;(p.setOptions = i(216)),
        (p.parse = i(219)),
        (p.options = i(82)),
        (p.exitStart = a('atStart', !0)),
        (p.enterList = a('inList', !1)),
        (p.enterLink = a('inLink', !1)),
        (p.enterBlock = a('inBlock', !1)),
        (p.interruptParagraph = [
          ['thematicBreak'],
          ['atxHeading'],
          ['fencedCode'],
          ['blockquote'],
          ['html'],
          ['setextHeading', {commonmark: !1}],
          ['definition', {commonmark: !1}],
          ['footnote', {commonmark: !1}],
        ]),
        (p.interruptList = [
          ['atxHeading', {pedantic: !1}],
          ['fencedCode', {pedantic: !1}],
          ['thematicBreak', {pedantic: !1}],
          ['definition', {commonmark: !1}],
          ['footnote', {commonmark: !1}],
        ]),
        (p.interruptBlockquote = [
          ['indentedCode', {commonmark: !0}],
          ['fencedCode', {commonmark: !0}],
          ['atxHeading', {commonmark: !0}],
          ['setextHeading', {commonmark: !0}],
          ['thematicBreak', {commonmark: !0}],
          ['html', {commonmark: !0}],
          ['list', {commonmark: !0}],
          ['definition', {commonmark: !1}],
          ['footnote', {commonmark: !1}],
        ]),
        (p.blockTokenizers = {
          newline: i(221),
          indentedCode: i(222),
          fencedCode: i(223),
          blockquote: i(224),
          atxHeading: i(225),
          thematicBreak: i(226),
          list: i(227),
          setextHeading: i(229),
          html: i(230),
          footnote: i(231),
          definition: i(232),
          table: i(233),
          paragraph: i(234),
        }),
        (p.inlineTokenizers = {
          escape: i(235),
          autoLink: i(237),
          url: i(238),
          html: i(240),
          link: i(241),
          reference: i(242),
          strong: i(243),
          emphasis: i(245),
          deletion: i(248),
          code: i(250),
          break: i(252),
          text: i(254),
        }),
        (p.blockMethods = u(p.blockTokenizers)),
        (p.inlineMethods = u(p.inlineTokenizers)),
        (p.tokenizeBlock = l('block')),
        (p.tokenizeInline = l('inline')),
        (p.tokenizeFactory = l)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        return function() {
          var n = i || this,
            a = n[t]
          return (
            (n[t] = !e),
            function() {
              n[t] = a
            }
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      function n(t) {
        return function(e) {
          var i = -1,
            n = t.length
          if (e < 0) return {}
          for (; ++i < n; )
            if (t[i] > e)
              return {line: i + 1, column: e - (t[i - 1] || 0) + 1, offset: e}
          return {}
        }
      }
      function a(t) {
        return function(e) {
          var i = e && e.line,
            n = e && e.column
          if (!isNaN(i) && !isNaN(n) && i - 1 in t)
            return (t[i - 2] || 0) + n - 1 || 0
          return -1
        }
      }
      t.exports = function(t) {
        var e = (function(t) {
          var e = [],
            i = t.indexOf('\n')
          for (; -1 !== i; ) e.push(i + 1), (i = t.indexOf('\n', i + 1))
          return e.push(t.length + 1), e
        })(String(t))
        return {toPosition: n(e), toOffset: a(e)}
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return function(i) {
          var a,
            r = 0,
            o = i.indexOf(n),
            s = t[e],
            l = []
          for (; -1 !== o; )
            l.push(i.slice(r, o)),
              (r = o + 1),
              ((a = i.charAt(r)) && -1 !== s.indexOf(a)) || l.push(n),
              (o = i.indexOf(n, r + 1))
          return l.push(i.slice(r)), l.join('')
        }
      }
      var n = '\\'
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(45)
      t.exports = function(t) {
        return (
          (i.raw = function(t, i, o) {
            return a(t, n(o, {position: e(i), warning: r}))
          }),
          i
        )
        function e(e) {
          for (var i = t.offset, n = e.line, a = []; ++n && n in i; )
            a.push((i[n] || 0) + 1)
          return {start: e, indent: a}
        }
        function i(i, n, o) {
          a(i, {
            position: e(n),
            warning: r,
            text: o,
            reference: o,
            textContext: t,
            referenceContext: t,
          })
        }
        function r(e, i, n) {
          3 !== n && t.file.message(e, i)
        }
      }
    },
    function(t) {
      t.exports = {
        0: '�',
        128: '€',
        130: '‚',
        131: 'ƒ',
        132: '„',
        133: '…',
        134: '†',
        135: '‡',
        136: 'ˆ',
        137: '‰',
        138: 'Š',
        139: '‹',
        140: 'Œ',
        142: 'Ž',
        145: '‘',
        146: '’',
        147: '“',
        148: '”',
        149: '•',
        150: '–',
        151: '—',
        152: '˜',
        153: '™',
        154: 'š',
        155: '›',
        156: 'œ',
        158: 'ž',
        159: 'Ÿ',
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(214)
      t.exports = function(t) {
        return !!a.call(n, t) && n[t]
      }
      var a = {}.hasOwnProperty
    },
    function(t) {
      t.exports = {
        AEli: 'Æ',
        AElig: 'Æ',
        AM: '&',
        AMP: '&',
        Aacut: 'Á',
        Aacute: 'Á',
        Abreve: 'Ă',
        Acir: 'Â',
        Acirc: 'Â',
        Acy: 'А',
        Afr: '𝔄',
        Agrav: 'À',
        Agrave: 'À',
        Alpha: 'Α',
        Amacr: 'Ā',
        And: '⩓',
        Aogon: 'Ą',
        Aopf: '𝔸',
        ApplyFunction: '⁡',
        Arin: 'Å',
        Aring: 'Å',
        Ascr: '𝒜',
        Assign: '≔',
        Atild: 'Ã',
        Atilde: 'Ã',
        Aum: 'Ä',
        Auml: 'Ä',
        Backslash: '∖',
        Barv: '⫧',
        Barwed: '⌆',
        Bcy: 'Б',
        Because: '∵',
        Bernoullis: 'ℬ',
        Beta: 'Β',
        Bfr: '𝔅',
        Bopf: '𝔹',
        Breve: '˘',
        Bscr: 'ℬ',
        Bumpeq: '≎',
        CHcy: 'Ч',
        COP: '©',
        COPY: '©',
        Cacute: 'Ć',
        Cap: '⋒',
        CapitalDifferentialD: 'ⅅ',
        Cayleys: 'ℭ',
        Ccaron: 'Č',
        Ccedi: 'Ç',
        Ccedil: 'Ç',
        Ccirc: 'Ĉ',
        Cconint: '∰',
        Cdot: 'Ċ',
        Cedilla: '¸',
        CenterDot: '·',
        Cfr: 'ℭ',
        Chi: 'Χ',
        CircleDot: '⊙',
        CircleMinus: '⊖',
        CirclePlus: '⊕',
        CircleTimes: '⊗',
        ClockwiseContourIntegral: '∲',
        CloseCurlyDoubleQuote: '”',
        CloseCurlyQuote: '’',
        Colon: '∷',
        Colone: '⩴',
        Congruent: '≡',
        Conint: '∯',
        ContourIntegral: '∮',
        Copf: 'ℂ',
        Coproduct: '∐',
        CounterClockwiseContourIntegral: '∳',
        Cross: '⨯',
        Cscr: '𝒞',
        Cup: '⋓',
        CupCap: '≍',
        DD: 'ⅅ',
        DDotrahd: '⤑',
        DJcy: 'Ђ',
        DScy: 'Ѕ',
        DZcy: 'Џ',
        Dagger: '‡',
        Darr: '↡',
        Dashv: '⫤',
        Dcaron: 'Ď',
        Dcy: 'Д',
        Del: '∇',
        Delta: 'Δ',
        Dfr: '𝔇',
        DiacriticalAcute: '´',
        DiacriticalDot: '˙',
        DiacriticalDoubleAcute: '˝',
        DiacriticalGrave: '`',
        DiacriticalTilde: '˜',
        Diamond: '⋄',
        DifferentialD: 'ⅆ',
        Dopf: '𝔻',
        Dot: '¨',
        DotDot: '⃜',
        DotEqual: '≐',
        DoubleContourIntegral: '∯',
        DoubleDot: '¨',
        DoubleDownArrow: '⇓',
        DoubleLeftArrow: '⇐',
        DoubleLeftRightArrow: '⇔',
        DoubleLeftTee: '⫤',
        DoubleLongLeftArrow: '⟸',
        DoubleLongLeftRightArrow: '⟺',
        DoubleLongRightArrow: '⟹',
        DoubleRightArrow: '⇒',
        DoubleRightTee: '⊨',
        DoubleUpArrow: '⇑',
        DoubleUpDownArrow: '⇕',
        DoubleVerticalBar: '∥',
        DownArrow: '↓',
        DownArrowBar: '⤓',
        DownArrowUpArrow: '⇵',
        DownBreve: '̑',
        DownLeftRightVector: '⥐',
        DownLeftTeeVector: '⥞',
        DownLeftVector: '↽',
        DownLeftVectorBar: '⥖',
        DownRightTeeVector: '⥟',
        DownRightVector: '⇁',
        DownRightVectorBar: '⥗',
        DownTee: '⊤',
        DownTeeArrow: '↧',
        Downarrow: '⇓',
        Dscr: '𝒟',
        Dstrok: 'Đ',
        ENG: 'Ŋ',
        ET: 'Ð',
        ETH: 'Ð',
        Eacut: 'É',
        Eacute: 'É',
        Ecaron: 'Ě',
        Ecir: 'Ê',
        Ecirc: 'Ê',
        Ecy: 'Э',
        Edot: 'Ė',
        Efr: '𝔈',
        Egrav: 'È',
        Egrave: 'È',
        Element: '∈',
        Emacr: 'Ē',
        EmptySmallSquare: '◻',
        EmptyVerySmallSquare: '▫',
        Eogon: 'Ę',
        Eopf: '𝔼',
        Epsilon: 'Ε',
        Equal: '⩵',
        EqualTilde: '≂',
        Equilibrium: '⇌',
        Escr: 'ℰ',
        Esim: '⩳',
        Eta: 'Η',
        Eum: 'Ë',
        Euml: 'Ë',
        Exists: '∃',
        ExponentialE: 'ⅇ',
        Fcy: 'Ф',
        Ffr: '𝔉',
        FilledSmallSquare: '◼',
        FilledVerySmallSquare: '▪',
        Fopf: '𝔽',
        ForAll: '∀',
        Fouriertrf: 'ℱ',
        Fscr: 'ℱ',
        GJcy: 'Ѓ',
        G: '>',
        GT: '>',
        Gamma: 'Γ',
        Gammad: 'Ϝ',
        Gbreve: 'Ğ',
        Gcedil: 'Ģ',
        Gcirc: 'Ĝ',
        Gcy: 'Г',
        Gdot: 'Ġ',
        Gfr: '𝔊',
        Gg: '⋙',
        Gopf: '𝔾',
        GreaterEqual: '≥',
        GreaterEqualLess: '⋛',
        GreaterFullEqual: '≧',
        GreaterGreater: '⪢',
        GreaterLess: '≷',
        GreaterSlantEqual: '⩾',
        GreaterTilde: '≳',
        Gscr: '𝒢',
        Gt: '≫',
        HARDcy: 'Ъ',
        Hacek: 'ˇ',
        Hat: '^',
        Hcirc: 'Ĥ',
        Hfr: 'ℌ',
        HilbertSpace: 'ℋ',
        Hopf: 'ℍ',
        HorizontalLine: '─',
        Hscr: 'ℋ',
        Hstrok: 'Ħ',
        HumpDownHump: '≎',
        HumpEqual: '≏',
        IEcy: 'Е',
        IJlig: 'Ĳ',
        IOcy: 'Ё',
        Iacut: 'Í',
        Iacute: 'Í',
        Icir: 'Î',
        Icirc: 'Î',
        Icy: 'И',
        Idot: 'İ',
        Ifr: 'ℑ',
        Igrav: 'Ì',
        Igrave: 'Ì',
        Im: 'ℑ',
        Imacr: 'Ī',
        ImaginaryI: 'ⅈ',
        Implies: '⇒',
        Int: '∬',
        Integral: '∫',
        Intersection: '⋂',
        InvisibleComma: '⁣',
        InvisibleTimes: '⁢',
        Iogon: 'Į',
        Iopf: '𝕀',
        Iota: 'Ι',
        Iscr: 'ℐ',
        Itilde: 'Ĩ',
        Iukcy: 'І',
        Ium: 'Ï',
        Iuml: 'Ï',
        Jcirc: 'Ĵ',
        Jcy: 'Й',
        Jfr: '𝔍',
        Jopf: '𝕁',
        Jscr: '𝒥',
        Jsercy: 'Ј',
        Jukcy: 'Є',
        KHcy: 'Х',
        KJcy: 'Ќ',
        Kappa: 'Κ',
        Kcedil: 'Ķ',
        Kcy: 'К',
        Kfr: '𝔎',
        Kopf: '𝕂',
        Kscr: '𝒦',
        LJcy: 'Љ',
        L: '<',
        LT: '<',
        Lacute: 'Ĺ',
        Lambda: 'Λ',
        Lang: '⟪',
        Laplacetrf: 'ℒ',
        Larr: '↞',
        Lcaron: 'Ľ',
        Lcedil: 'Ļ',
        Lcy: 'Л',
        LeftAngleBracket: '⟨',
        LeftArrow: '←',
        LeftArrowBar: '⇤',
        LeftArrowRightArrow: '⇆',
        LeftCeiling: '⌈',
        LeftDoubleBracket: '⟦',
        LeftDownTeeVector: '⥡',
        LeftDownVector: '⇃',
        LeftDownVectorBar: '⥙',
        LeftFloor: '⌊',
        LeftRightArrow: '↔',
        LeftRightVector: '⥎',
        LeftTee: '⊣',
        LeftTeeArrow: '↤',
        LeftTeeVector: '⥚',
        LeftTriangle: '⊲',
        LeftTriangleBar: '⧏',
        LeftTriangleEqual: '⊴',
        LeftUpDownVector: '⥑',
        LeftUpTeeVector: '⥠',
        LeftUpVector: '↿',
        LeftUpVectorBar: '⥘',
        LeftVector: '↼',
        LeftVectorBar: '⥒',
        Leftarrow: '⇐',
        Leftrightarrow: '⇔',
        LessEqualGreater: '⋚',
        LessFullEqual: '≦',
        LessGreater: '≶',
        LessLess: '⪡',
        LessSlantEqual: '⩽',
        LessTilde: '≲',
        Lfr: '𝔏',
        Ll: '⋘',
        Lleftarrow: '⇚',
        Lmidot: 'Ŀ',
        LongLeftArrow: '⟵',
        LongLeftRightArrow: '⟷',
        LongRightArrow: '⟶',
        Longleftarrow: '⟸',
        Longleftrightarrow: '⟺',
        Longrightarrow: '⟹',
        Lopf: '𝕃',
        LowerLeftArrow: '↙',
        LowerRightArrow: '↘',
        Lscr: 'ℒ',
        Lsh: '↰',
        Lstrok: 'Ł',
        Lt: '≪',
        Map: '⤅',
        Mcy: 'М',
        MediumSpace: ' ',
        Mellintrf: 'ℳ',
        Mfr: '𝔐',
        MinusPlus: '∓',
        Mopf: '𝕄',
        Mscr: 'ℳ',
        Mu: 'Μ',
        NJcy: 'Њ',
        Nacute: 'Ń',
        Ncaron: 'Ň',
        Ncedil: 'Ņ',
        Ncy: 'Н',
        NegativeMediumSpace: '​',
        NegativeThickSpace: '​',
        NegativeThinSpace: '​',
        NegativeVeryThinSpace: '​',
        NestedGreaterGreater: '≫',
        NestedLessLess: '≪',
        NewLine: '\n',
        Nfr: '𝔑',
        NoBreak: '⁠',
        NonBreakingSpace: ' ',
        Nopf: 'ℕ',
        Not: '⫬',
        NotCongruent: '≢',
        NotCupCap: '≭',
        NotDoubleVerticalBar: '∦',
        NotElement: '∉',
        NotEqual: '≠',
        NotEqualTilde: '≂̸',
        NotExists: '∄',
        NotGreater: '≯',
        NotGreaterEqual: '≱',
        NotGreaterFullEqual: '≧̸',
        NotGreaterGreater: '≫̸',
        NotGreaterLess: '≹',
        NotGreaterSlantEqual: '⩾̸',
        NotGreaterTilde: '≵',
        NotHumpDownHump: '≎̸',
        NotHumpEqual: '≏̸',
        NotLeftTriangle: '⋪',
        NotLeftTriangleBar: '⧏̸',
        NotLeftTriangleEqual: '⋬',
        NotLess: '≮',
        NotLessEqual: '≰',
        NotLessGreater: '≸',
        NotLessLess: '≪̸',
        NotLessSlantEqual: '⩽̸',
        NotLessTilde: '≴',
        NotNestedGreaterGreater: '⪢̸',
        NotNestedLessLess: '⪡̸',
        NotPrecedes: '⊀',
        NotPrecedesEqual: '⪯̸',
        NotPrecedesSlantEqual: '⋠',
        NotReverseElement: '∌',
        NotRightTriangle: '⋫',
        NotRightTriangleBar: '⧐̸',
        NotRightTriangleEqual: '⋭',
        NotSquareSubset: '⊏̸',
        NotSquareSubsetEqual: '⋢',
        NotSquareSuperset: '⊐̸',
        NotSquareSupersetEqual: '⋣',
        NotSubset: '⊂⃒',
        NotSubsetEqual: '⊈',
        NotSucceeds: '⊁',
        NotSucceedsEqual: '⪰̸',
        NotSucceedsSlantEqual: '⋡',
        NotSucceedsTilde: '≿̸',
        NotSuperset: '⊃⃒',
        NotSupersetEqual: '⊉',
        NotTilde: '≁',
        NotTildeEqual: '≄',
        NotTildeFullEqual: '≇',
        NotTildeTilde: '≉',
        NotVerticalBar: '∤',
        Nscr: '𝒩',
        Ntild: 'Ñ',
        Ntilde: 'Ñ',
        Nu: 'Ν',
        OElig: 'Œ',
        Oacut: 'Ó',
        Oacute: 'Ó',
        Ocir: 'Ô',
        Ocirc: 'Ô',
        Ocy: 'О',
        Odblac: 'Ő',
        Ofr: '𝔒',
        Ograv: 'Ò',
        Ograve: 'Ò',
        Omacr: 'Ō',
        Omega: 'Ω',
        Omicron: 'Ο',
        Oopf: '𝕆',
        OpenCurlyDoubleQuote: '“',
        OpenCurlyQuote: '‘',
        Or: '⩔',
        Oscr: '𝒪',
        Oslas: 'Ø',
        Oslash: 'Ø',
        Otild: 'Õ',
        Otilde: 'Õ',
        Otimes: '⨷',
        Oum: 'Ö',
        Ouml: 'Ö',
        OverBar: '‾',
        OverBrace: '⏞',
        OverBracket: '⎴',
        OverParenthesis: '⏜',
        PartialD: '∂',
        Pcy: 'П',
        Pfr: '𝔓',
        Phi: 'Φ',
        Pi: 'Π',
        PlusMinus: '±',
        Poincareplane: 'ℌ',
        Popf: 'ℙ',
        Pr: '⪻',
        Precedes: '≺',
        PrecedesEqual: '⪯',
        PrecedesSlantEqual: '≼',
        PrecedesTilde: '≾',
        Prime: '″',
        Product: '∏',
        Proportion: '∷',
        Proportional: '∝',
        Pscr: '𝒫',
        Psi: 'Ψ',
        QUO: '"',
        QUOT: '"',
        Qfr: '𝔔',
        Qopf: 'ℚ',
        Qscr: '𝒬',
        RBarr: '⤐',
        RE: '®',
        REG: '®',
        Racute: 'Ŕ',
        Rang: '⟫',
        Rarr: '↠',
        Rarrtl: '⤖',
        Rcaron: 'Ř',
        Rcedil: 'Ŗ',
        Rcy: 'Р',
        Re: 'ℜ',
        ReverseElement: '∋',
        ReverseEquilibrium: '⇋',
        ReverseUpEquilibrium: '⥯',
        Rfr: 'ℜ',
        Rho: 'Ρ',
        RightAngleBracket: '⟩',
        RightArrow: '→',
        RightArrowBar: '⇥',
        RightArrowLeftArrow: '⇄',
        RightCeiling: '⌉',
        RightDoubleBracket: '⟧',
        RightDownTeeVector: '⥝',
        RightDownVector: '⇂',
        RightDownVectorBar: '⥕',
        RightFloor: '⌋',
        RightTee: '⊢',
        RightTeeArrow: '↦',
        RightTeeVector: '⥛',
        RightTriangle: '⊳',
        RightTriangleBar: '⧐',
        RightTriangleEqual: '⊵',
        RightUpDownVector: '⥏',
        RightUpTeeVector: '⥜',
        RightUpVector: '↾',
        RightUpVectorBar: '⥔',
        RightVector: '⇀',
        RightVectorBar: '⥓',
        Rightarrow: '⇒',
        Ropf: 'ℝ',
        RoundImplies: '⥰',
        Rrightarrow: '⇛',
        Rscr: 'ℛ',
        Rsh: '↱',
        RuleDelayed: '⧴',
        SHCHcy: 'Щ',
        SHcy: 'Ш',
        SOFTcy: 'Ь',
        Sacute: 'Ś',
        Sc: '⪼',
        Scaron: 'Š',
        Scedil: 'Ş',
        Scirc: 'Ŝ',
        Scy: 'С',
        Sfr: '𝔖',
        ShortDownArrow: '↓',
        ShortLeftArrow: '←',
        ShortRightArrow: '→',
        ShortUpArrow: '↑',
        Sigma: 'Σ',
        SmallCircle: '∘',
        Sopf: '𝕊',
        Sqrt: '√',
        Square: '□',
        SquareIntersection: '⊓',
        SquareSubset: '⊏',
        SquareSubsetEqual: '⊑',
        SquareSuperset: '⊐',
        SquareSupersetEqual: '⊒',
        SquareUnion: '⊔',
        Sscr: '𝒮',
        Star: '⋆',
        Sub: '⋐',
        Subset: '⋐',
        SubsetEqual: '⊆',
        Succeeds: '≻',
        SucceedsEqual: '⪰',
        SucceedsSlantEqual: '≽',
        SucceedsTilde: '≿',
        SuchThat: '∋',
        Sum: '∑',
        Sup: '⋑',
        Superset: '⊃',
        SupersetEqual: '⊇',
        Supset: '⋑',
        THOR: 'Þ',
        THORN: 'Þ',
        TRADE: '™',
        TSHcy: 'Ћ',
        TScy: 'Ц',
        Tab: '\t',
        Tau: 'Τ',
        Tcaron: 'Ť',
        Tcedil: 'Ţ',
        Tcy: 'Т',
        Tfr: '𝔗',
        Therefore: '∴',
        Theta: 'Θ',
        ThickSpace: '  ',
        ThinSpace: ' ',
        Tilde: '∼',
        TildeEqual: '≃',
        TildeFullEqual: '≅',
        TildeTilde: '≈',
        Topf: '𝕋',
        TripleDot: '⃛',
        Tscr: '𝒯',
        Tstrok: 'Ŧ',
        Uacut: 'Ú',
        Uacute: 'Ú',
        Uarr: '↟',
        Uarrocir: '⥉',
        Ubrcy: 'Ў',
        Ubreve: 'Ŭ',
        Ucir: 'Û',
        Ucirc: 'Û',
        Ucy: 'У',
        Udblac: 'Ű',
        Ufr: '𝔘',
        Ugrav: 'Ù',
        Ugrave: 'Ù',
        Umacr: 'Ū',
        UnderBar: '_',
        UnderBrace: '⏟',
        UnderBracket: '⎵',
        UnderParenthesis: '⏝',
        Union: '⋃',
        UnionPlus: '⊎',
        Uogon: 'Ų',
        Uopf: '𝕌',
        UpArrow: '↑',
        UpArrowBar: '⤒',
        UpArrowDownArrow: '⇅',
        UpDownArrow: '↕',
        UpEquilibrium: '⥮',
        UpTee: '⊥',
        UpTeeArrow: '↥',
        Uparrow: '⇑',
        Updownarrow: '⇕',
        UpperLeftArrow: '↖',
        UpperRightArrow: '↗',
        Upsi: 'ϒ',
        Upsilon: 'Υ',
        Uring: 'Ů',
        Uscr: '𝒰',
        Utilde: 'Ũ',
        Uum: 'Ü',
        Uuml: 'Ü',
        VDash: '⊫',
        Vbar: '⫫',
        Vcy: 'В',
        Vdash: '⊩',
        Vdashl: '⫦',
        Vee: '⋁',
        Verbar: '‖',
        Vert: '‖',
        VerticalBar: '∣',
        VerticalLine: '|',
        VerticalSeparator: '❘',
        VerticalTilde: '≀',
        VeryThinSpace: ' ',
        Vfr: '𝔙',
        Vopf: '𝕍',
        Vscr: '𝒱',
        Vvdash: '⊪',
        Wcirc: 'Ŵ',
        Wedge: '⋀',
        Wfr: '𝔚',
        Wopf: '𝕎',
        Wscr: '𝒲',
        Xfr: '𝔛',
        Xi: 'Ξ',
        Xopf: '𝕏',
        Xscr: '𝒳',
        YAcy: 'Я',
        YIcy: 'Ї',
        YUcy: 'Ю',
        Yacut: 'Ý',
        Yacute: 'Ý',
        Ycirc: 'Ŷ',
        Ycy: 'Ы',
        Yfr: '𝔜',
        Yopf: '𝕐',
        Yscr: '𝒴',
        Yuml: 'Ÿ',
        ZHcy: 'Ж',
        Zacute: 'Ź',
        Zcaron: 'Ž',
        Zcy: 'З',
        Zdot: 'Ż',
        ZeroWidthSpace: '​',
        Zeta: 'Ζ',
        Zfr: 'ℨ',
        Zopf: 'ℤ',
        Zscr: '𝒵',
        aacut: 'á',
        aacute: 'á',
        abreve: 'ă',
        ac: '∾',
        acE: '∾̳',
        acd: '∿',
        acir: 'â',
        acirc: 'â',
        acut: '´',
        acute: '´',
        acy: 'а',
        aeli: 'æ',
        aelig: 'æ',
        af: '⁡',
        afr: '𝔞',
        agrav: 'à',
        agrave: 'à',
        alefsym: 'ℵ',
        aleph: 'ℵ',
        alpha: 'α',
        amacr: 'ā',
        amalg: '⨿',
        am: '&',
        amp: '&',
        and: '∧',
        andand: '⩕',
        andd: '⩜',
        andslope: '⩘',
        andv: '⩚',
        ang: '∠',
        ange: '⦤',
        angle: '∠',
        angmsd: '∡',
        angmsdaa: '⦨',
        angmsdab: '⦩',
        angmsdac: '⦪',
        angmsdad: '⦫',
        angmsdae: '⦬',
        angmsdaf: '⦭',
        angmsdag: '⦮',
        angmsdah: '⦯',
        angrt: '∟',
        angrtvb: '⊾',
        angrtvbd: '⦝',
        angsph: '∢',
        angst: 'Å',
        angzarr: '⍼',
        aogon: 'ą',
        aopf: '𝕒',
        ap: '≈',
        apE: '⩰',
        apacir: '⩯',
        ape: '≊',
        apid: '≋',
        apos: "'",
        approx: '≈',
        approxeq: '≊',
        arin: 'å',
        aring: 'å',
        ascr: '𝒶',
        ast: '*',
        asymp: '≈',
        asympeq: '≍',
        atild: 'ã',
        atilde: 'ã',
        aum: 'ä',
        auml: 'ä',
        awconint: '∳',
        awint: '⨑',
        bNot: '⫭',
        backcong: '≌',
        backepsilon: '϶',
        backprime: '‵',
        backsim: '∽',
        backsimeq: '⋍',
        barvee: '⊽',
        barwed: '⌅',
        barwedge: '⌅',
        bbrk: '⎵',
        bbrktbrk: '⎶',
        bcong: '≌',
        bcy: 'б',
        bdquo: '„',
        becaus: '∵',
        because: '∵',
        bemptyv: '⦰',
        bepsi: '϶',
        bernou: 'ℬ',
        beta: 'β',
        beth: 'ℶ',
        between: '≬',
        bfr: '𝔟',
        bigcap: '⋂',
        bigcirc: '◯',
        bigcup: '⋃',
        bigodot: '⨀',
        bigoplus: '⨁',
        bigotimes: '⨂',
        bigsqcup: '⨆',
        bigstar: '★',
        bigtriangledown: '▽',
        bigtriangleup: '△',
        biguplus: '⨄',
        bigvee: '⋁',
        bigwedge: '⋀',
        bkarow: '⤍',
        blacklozenge: '⧫',
        blacksquare: '▪',
        blacktriangle: '▴',
        blacktriangledown: '▾',
        blacktriangleleft: '◂',
        blacktriangleright: '▸',
        blank: '␣',
        blk12: '▒',
        blk14: '░',
        blk34: '▓',
        block: '█',
        bne: '=⃥',
        bnequiv: '≡⃥',
        bnot: '⌐',
        bopf: '𝕓',
        bot: '⊥',
        bottom: '⊥',
        bowtie: '⋈',
        boxDL: '╗',
        boxDR: '╔',
        boxDl: '╖',
        boxDr: '╓',
        boxH: '═',
        boxHD: '╦',
        boxHU: '╩',
        boxHd: '╤',
        boxHu: '╧',
        boxUL: '╝',
        boxUR: '╚',
        boxUl: '╜',
        boxUr: '╙',
        boxV: '║',
        boxVH: '╬',
        boxVL: '╣',
        boxVR: '╠',
        boxVh: '╫',
        boxVl: '╢',
        boxVr: '╟',
        boxbox: '⧉',
        boxdL: '╕',
        boxdR: '╒',
        boxdl: '┐',
        boxdr: '┌',
        boxh: '─',
        boxhD: '╥',
        boxhU: '╨',
        boxhd: '┬',
        boxhu: '┴',
        boxminus: '⊟',
        boxplus: '⊞',
        boxtimes: '⊠',
        boxuL: '╛',
        boxuR: '╘',
        boxul: '┘',
        boxur: '└',
        boxv: '│',
        boxvH: '╪',
        boxvL: '╡',
        boxvR: '╞',
        boxvh: '┼',
        boxvl: '┤',
        boxvr: '├',
        bprime: '‵',
        breve: '˘',
        brvba: '¦',
        brvbar: '¦',
        bscr: '𝒷',
        bsemi: '⁏',
        bsim: '∽',
        bsime: '⋍',
        bsol: '\\',
        bsolb: '⧅',
        bsolhsub: '⟈',
        bull: '•',
        bullet: '•',
        bump: '≎',
        bumpE: '⪮',
        bumpe: '≏',
        bumpeq: '≏',
        cacute: 'ć',
        cap: '∩',
        capand: '⩄',
        capbrcup: '⩉',
        capcap: '⩋',
        capcup: '⩇',
        capdot: '⩀',
        caps: '∩︀',
        caret: '⁁',
        caron: 'ˇ',
        ccaps: '⩍',
        ccaron: 'č',
        ccedi: 'ç',
        ccedil: 'ç',
        ccirc: 'ĉ',
        ccups: '⩌',
        ccupssm: '⩐',
        cdot: 'ċ',
        cedi: '¸',
        cedil: '¸',
        cemptyv: '⦲',
        cen: '¢',
        cent: '¢',
        centerdot: '·',
        cfr: '𝔠',
        chcy: 'ч',
        check: '✓',
        checkmark: '✓',
        chi: 'χ',
        cir: '○',
        cirE: '⧃',
        circ: 'ˆ',
        circeq: '≗',
        circlearrowleft: '↺',
        circlearrowright: '↻',
        circledR: '®',
        circledS: 'Ⓢ',
        circledast: '⊛',
        circledcirc: '⊚',
        circleddash: '⊝',
        cire: '≗',
        cirfnint: '⨐',
        cirmid: '⫯',
        cirscir: '⧂',
        clubs: '♣',
        clubsuit: '♣',
        colon: ':',
        colone: '≔',
        coloneq: '≔',
        comma: ',',
        commat: '@',
        comp: '∁',
        compfn: '∘',
        complement: '∁',
        complexes: 'ℂ',
        cong: '≅',
        congdot: '⩭',
        conint: '∮',
        copf: '𝕔',
        coprod: '∐',
        cop: '©',
        copy: '©',
        copysr: '℗',
        crarr: '↵',
        cross: '✗',
        cscr: '𝒸',
        csub: '⫏',
        csube: '⫑',
        csup: '⫐',
        csupe: '⫒',
        ctdot: '⋯',
        cudarrl: '⤸',
        cudarrr: '⤵',
        cuepr: '⋞',
        cuesc: '⋟',
        cularr: '↶',
        cularrp: '⤽',
        cup: '∪',
        cupbrcap: '⩈',
        cupcap: '⩆',
        cupcup: '⩊',
        cupdot: '⊍',
        cupor: '⩅',
        cups: '∪︀',
        curarr: '↷',
        curarrm: '⤼',
        curlyeqprec: '⋞',
        curlyeqsucc: '⋟',
        curlyvee: '⋎',
        curlywedge: '⋏',
        curre: '¤',
        curren: '¤',
        curvearrowleft: '↶',
        curvearrowright: '↷',
        cuvee: '⋎',
        cuwed: '⋏',
        cwconint: '∲',
        cwint: '∱',
        cylcty: '⌭',
        dArr: '⇓',
        dHar: '⥥',
        dagger: '†',
        daleth: 'ℸ',
        darr: '↓',
        dash: '‐',
        dashv: '⊣',
        dbkarow: '⤏',
        dblac: '˝',
        dcaron: 'ď',
        dcy: 'д',
        dd: 'ⅆ',
        ddagger: '‡',
        ddarr: '⇊',
        ddotseq: '⩷',
        de: '°',
        deg: '°',
        delta: 'δ',
        demptyv: '⦱',
        dfisht: '⥿',
        dfr: '𝔡',
        dharl: '⇃',
        dharr: '⇂',
        diam: '⋄',
        diamond: '⋄',
        diamondsuit: '♦',
        diams: '♦',
        die: '¨',
        digamma: 'ϝ',
        disin: '⋲',
        div: '÷',
        divid: '÷',
        divide: '÷',
        divideontimes: '⋇',
        divonx: '⋇',
        djcy: 'ђ',
        dlcorn: '⌞',
        dlcrop: '⌍',
        dollar: '$',
        dopf: '𝕕',
        dot: '˙',
        doteq: '≐',
        doteqdot: '≑',
        dotminus: '∸',
        dotplus: '∔',
        dotsquare: '⊡',
        doublebarwedge: '⌆',
        downarrow: '↓',
        downdownarrows: '⇊',
        downharpoonleft: '⇃',
        downharpoonright: '⇂',
        drbkarow: '⤐',
        drcorn: '⌟',
        drcrop: '⌌',
        dscr: '𝒹',
        dscy: 'ѕ',
        dsol: '⧶',
        dstrok: 'đ',
        dtdot: '⋱',
        dtri: '▿',
        dtrif: '▾',
        duarr: '⇵',
        duhar: '⥯',
        dwangle: '⦦',
        dzcy: 'џ',
        dzigrarr: '⟿',
        eDDot: '⩷',
        eDot: '≑',
        eacut: 'é',
        eacute: 'é',
        easter: '⩮',
        ecaron: 'ě',
        ecir: 'ê',
        ecirc: 'ê',
        ecolon: '≕',
        ecy: 'э',
        edot: 'ė',
        ee: 'ⅇ',
        efDot: '≒',
        efr: '𝔢',
        eg: '⪚',
        egrav: 'è',
        egrave: 'è',
        egs: '⪖',
        egsdot: '⪘',
        el: '⪙',
        elinters: '⏧',
        ell: 'ℓ',
        els: '⪕',
        elsdot: '⪗',
        emacr: 'ē',
        empty: '∅',
        emptyset: '∅',
        emptyv: '∅',
        emsp13: ' ',
        emsp14: ' ',
        emsp: ' ',
        eng: 'ŋ',
        ensp: ' ',
        eogon: 'ę',
        eopf: '𝕖',
        epar: '⋕',
        eparsl: '⧣',
        eplus: '⩱',
        epsi: 'ε',
        epsilon: 'ε',
        epsiv: 'ϵ',
        eqcirc: '≖',
        eqcolon: '≕',
        eqsim: '≂',
        eqslantgtr: '⪖',
        eqslantless: '⪕',
        equals: '=',
        equest: '≟',
        equiv: '≡',
        equivDD: '⩸',
        eqvparsl: '⧥',
        erDot: '≓',
        erarr: '⥱',
        escr: 'ℯ',
        esdot: '≐',
        esim: '≂',
        eta: 'η',
        et: 'ð',
        eth: 'ð',
        eum: 'ë',
        euml: 'ë',
        euro: '€',
        excl: '!',
        exist: '∃',
        expectation: 'ℰ',
        exponentiale: 'ⅇ',
        fallingdotseq: '≒',
        fcy: 'ф',
        female: '♀',
        ffilig: 'ﬃ',
        fflig: 'ﬀ',
        ffllig: 'ﬄ',
        ffr: '𝔣',
        filig: 'ﬁ',
        fjlig: 'fj',
        flat: '♭',
        fllig: 'ﬂ',
        fltns: '▱',
        fnof: 'ƒ',
        fopf: '𝕗',
        forall: '∀',
        fork: '⋔',
        forkv: '⫙',
        fpartint: '⨍',
        frac1: '¼',
        frac12: '½',
        frac13: '⅓',
        frac14: '¼',
        frac15: '⅕',
        frac16: '⅙',
        frac18: '⅛',
        frac23: '⅔',
        frac25: '⅖',
        frac3: '¾',
        frac34: '¾',
        frac35: '⅗',
        frac38: '⅜',
        frac45: '⅘',
        frac56: '⅚',
        frac58: '⅝',
        frac78: '⅞',
        frasl: '⁄',
        frown: '⌢',
        fscr: '𝒻',
        gE: '≧',
        gEl: '⪌',
        gacute: 'ǵ',
        gamma: 'γ',
        gammad: 'ϝ',
        gap: '⪆',
        gbreve: 'ğ',
        gcirc: 'ĝ',
        gcy: 'г',
        gdot: 'ġ',
        ge: '≥',
        gel: '⋛',
        geq: '≥',
        geqq: '≧',
        geqslant: '⩾',
        ges: '⩾',
        gescc: '⪩',
        gesdot: '⪀',
        gesdoto: '⪂',
        gesdotol: '⪄',
        gesl: '⋛︀',
        gesles: '⪔',
        gfr: '𝔤',
        gg: '≫',
        ggg: '⋙',
        gimel: 'ℷ',
        gjcy: 'ѓ',
        gl: '≷',
        glE: '⪒',
        gla: '⪥',
        glj: '⪤',
        gnE: '≩',
        gnap: '⪊',
        gnapprox: '⪊',
        gne: '⪈',
        gneq: '⪈',
        gneqq: '≩',
        gnsim: '⋧',
        gopf: '𝕘',
        grave: '`',
        gscr: 'ℊ',
        gsim: '≳',
        gsime: '⪎',
        gsiml: '⪐',
        g: '>',
        gt: '>',
        gtcc: '⪧',
        gtcir: '⩺',
        gtdot: '⋗',
        gtlPar: '⦕',
        gtquest: '⩼',
        gtrapprox: '⪆',
        gtrarr: '⥸',
        gtrdot: '⋗',
        gtreqless: '⋛',
        gtreqqless: '⪌',
        gtrless: '≷',
        gtrsim: '≳',
        gvertneqq: '≩︀',
        gvnE: '≩︀',
        hArr: '⇔',
        hairsp: ' ',
        half: '½',
        hamilt: 'ℋ',
        hardcy: 'ъ',
        harr: '↔',
        harrcir: '⥈',
        harrw: '↭',
        hbar: 'ℏ',
        hcirc: 'ĥ',
        hearts: '♥',
        heartsuit: '♥',
        hellip: '…',
        hercon: '⊹',
        hfr: '𝔥',
        hksearow: '⤥',
        hkswarow: '⤦',
        hoarr: '⇿',
        homtht: '∻',
        hookleftarrow: '↩',
        hookrightarrow: '↪',
        hopf: '𝕙',
        horbar: '―',
        hscr: '𝒽',
        hslash: 'ℏ',
        hstrok: 'ħ',
        hybull: '⁃',
        hyphen: '‐',
        iacut: 'í',
        iacute: 'í',
        ic: '⁣',
        icir: 'î',
        icirc: 'î',
        icy: 'и',
        iecy: 'е',
        iexc: '¡',
        iexcl: '¡',
        iff: '⇔',
        ifr: '𝔦',
        igrav: 'ì',
        igrave: 'ì',
        ii: 'ⅈ',
        iiiint: '⨌',
        iiint: '∭',
        iinfin: '⧜',
        iiota: '℩',
        ijlig: 'ĳ',
        imacr: 'ī',
        image: 'ℑ',
        imagline: 'ℐ',
        imagpart: 'ℑ',
        imath: 'ı',
        imof: '⊷',
        imped: 'Ƶ',
        in: '∈',
        incare: '℅',
        infin: '∞',
        infintie: '⧝',
        inodot: 'ı',
        int: '∫',
        intcal: '⊺',
        integers: 'ℤ',
        intercal: '⊺',
        intlarhk: '⨗',
        intprod: '⨼',
        iocy: 'ё',
        iogon: 'į',
        iopf: '𝕚',
        iota: 'ι',
        iprod: '⨼',
        iques: '¿',
        iquest: '¿',
        iscr: '𝒾',
        isin: '∈',
        isinE: '⋹',
        isindot: '⋵',
        isins: '⋴',
        isinsv: '⋳',
        isinv: '∈',
        it: '⁢',
        itilde: 'ĩ',
        iukcy: 'і',
        ium: 'ï',
        iuml: 'ï',
        jcirc: 'ĵ',
        jcy: 'й',
        jfr: '𝔧',
        jmath: 'ȷ',
        jopf: '𝕛',
        jscr: '𝒿',
        jsercy: 'ј',
        jukcy: 'є',
        kappa: 'κ',
        kappav: 'ϰ',
        kcedil: 'ķ',
        kcy: 'к',
        kfr: '𝔨',
        kgreen: 'ĸ',
        khcy: 'х',
        kjcy: 'ќ',
        kopf: '𝕜',
        kscr: '𝓀',
        lAarr: '⇚',
        lArr: '⇐',
        lAtail: '⤛',
        lBarr: '⤎',
        lE: '≦',
        lEg: '⪋',
        lHar: '⥢',
        lacute: 'ĺ',
        laemptyv: '⦴',
        lagran: 'ℒ',
        lambda: 'λ',
        lang: '⟨',
        langd: '⦑',
        langle: '⟨',
        lap: '⪅',
        laqu: '«',
        laquo: '«',
        larr: '←',
        larrb: '⇤',
        larrbfs: '⤟',
        larrfs: '⤝',
        larrhk: '↩',
        larrlp: '↫',
        larrpl: '⤹',
        larrsim: '⥳',
        larrtl: '↢',
        lat: '⪫',
        latail: '⤙',
        late: '⪭',
        lates: '⪭︀',
        lbarr: '⤌',
        lbbrk: '❲',
        lbrace: '{',
        lbrack: '[',
        lbrke: '⦋',
        lbrksld: '⦏',
        lbrkslu: '⦍',
        lcaron: 'ľ',
        lcedil: 'ļ',
        lceil: '⌈',
        lcub: '{',
        lcy: 'л',
        ldca: '⤶',
        ldquo: '“',
        ldquor: '„',
        ldrdhar: '⥧',
        ldrushar: '⥋',
        ldsh: '↲',
        le: '≤',
        leftarrow: '←',
        leftarrowtail: '↢',
        leftharpoondown: '↽',
        leftharpoonup: '↼',
        leftleftarrows: '⇇',
        leftrightarrow: '↔',
        leftrightarrows: '⇆',
        leftrightharpoons: '⇋',
        leftrightsquigarrow: '↭',
        leftthreetimes: '⋋',
        leg: '⋚',
        leq: '≤',
        leqq: '≦',
        leqslant: '⩽',
        les: '⩽',
        lescc: '⪨',
        lesdot: '⩿',
        lesdoto: '⪁',
        lesdotor: '⪃',
        lesg: '⋚︀',
        lesges: '⪓',
        lessapprox: '⪅',
        lessdot: '⋖',
        lesseqgtr: '⋚',
        lesseqqgtr: '⪋',
        lessgtr: '≶',
        lesssim: '≲',
        lfisht: '⥼',
        lfloor: '⌊',
        lfr: '𝔩',
        lg: '≶',
        lgE: '⪑',
        lhard: '↽',
        lharu: '↼',
        lharul: '⥪',
        lhblk: '▄',
        ljcy: 'љ',
        ll: '≪',
        llarr: '⇇',
        llcorner: '⌞',
        llhard: '⥫',
        lltri: '◺',
        lmidot: 'ŀ',
        lmoust: '⎰',
        lmoustache: '⎰',
        lnE: '≨',
        lnap: '⪉',
        lnapprox: '⪉',
        lne: '⪇',
        lneq: '⪇',
        lneqq: '≨',
        lnsim: '⋦',
        loang: '⟬',
        loarr: '⇽',
        lobrk: '⟦',
        longleftarrow: '⟵',
        longleftrightarrow: '⟷',
        longmapsto: '⟼',
        longrightarrow: '⟶',
        looparrowleft: '↫',
        looparrowright: '↬',
        lopar: '⦅',
        lopf: '𝕝',
        loplus: '⨭',
        lotimes: '⨴',
        lowast: '∗',
        lowbar: '_',
        loz: '◊',
        lozenge: '◊',
        lozf: '⧫',
        lpar: '(',
        lparlt: '⦓',
        lrarr: '⇆',
        lrcorner: '⌟',
        lrhar: '⇋',
        lrhard: '⥭',
        lrm: '‎',
        lrtri: '⊿',
        lsaquo: '‹',
        lscr: '𝓁',
        lsh: '↰',
        lsim: '≲',
        lsime: '⪍',
        lsimg: '⪏',
        lsqb: '[',
        lsquo: '‘',
        lsquor: '‚',
        lstrok: 'ł',
        l: '<',
        lt: '<',
        ltcc: '⪦',
        ltcir: '⩹',
        ltdot: '⋖',
        lthree: '⋋',
        ltimes: '⋉',
        ltlarr: '⥶',
        ltquest: '⩻',
        ltrPar: '⦖',
        ltri: '◃',
        ltrie: '⊴',
        ltrif: '◂',
        lurdshar: '⥊',
        luruhar: '⥦',
        lvertneqq: '≨︀',
        lvnE: '≨︀',
        mDDot: '∺',
        mac: '¯',
        macr: '¯',
        male: '♂',
        malt: '✠',
        maltese: '✠',
        map: '↦',
        mapsto: '↦',
        mapstodown: '↧',
        mapstoleft: '↤',
        mapstoup: '↥',
        marker: '▮',
        mcomma: '⨩',
        mcy: 'м',
        mdash: '—',
        measuredangle: '∡',
        mfr: '𝔪',
        mho: '℧',
        micr: 'µ',
        micro: 'µ',
        mid: '∣',
        midast: '*',
        midcir: '⫰',
        middo: '·',
        middot: '·',
        minus: '−',
        minusb: '⊟',
        minusd: '∸',
        minusdu: '⨪',
        mlcp: '⫛',
        mldr: '…',
        mnplus: '∓',
        models: '⊧',
        mopf: '𝕞',
        mp: '∓',
        mscr: '𝓂',
        mstpos: '∾',
        mu: 'μ',
        multimap: '⊸',
        mumap: '⊸',
        nGg: '⋙̸',
        nGt: '≫⃒',
        nGtv: '≫̸',
        nLeftarrow: '⇍',
        nLeftrightarrow: '⇎',
        nLl: '⋘̸',
        nLt: '≪⃒',
        nLtv: '≪̸',
        nRightarrow: '⇏',
        nVDash: '⊯',
        nVdash: '⊮',
        nabla: '∇',
        nacute: 'ń',
        nang: '∠⃒',
        nap: '≉',
        napE: '⩰̸',
        napid: '≋̸',
        napos: 'ŉ',
        napprox: '≉',
        natur: '♮',
        natural: '♮',
        naturals: 'ℕ',
        nbs: ' ',
        nbsp: ' ',
        nbump: '≎̸',
        nbumpe: '≏̸',
        ncap: '⩃',
        ncaron: 'ň',
        ncedil: 'ņ',
        ncong: '≇',
        ncongdot: '⩭̸',
        ncup: '⩂',
        ncy: 'н',
        ndash: '–',
        ne: '≠',
        neArr: '⇗',
        nearhk: '⤤',
        nearr: '↗',
        nearrow: '↗',
        nedot: '≐̸',
        nequiv: '≢',
        nesear: '⤨',
        nesim: '≂̸',
        nexist: '∄',
        nexists: '∄',
        nfr: '𝔫',
        ngE: '≧̸',
        nge: '≱',
        ngeq: '≱',
        ngeqq: '≧̸',
        ngeqslant: '⩾̸',
        nges: '⩾̸',
        ngsim: '≵',
        ngt: '≯',
        ngtr: '≯',
        nhArr: '⇎',
        nharr: '↮',
        nhpar: '⫲',
        ni: '∋',
        nis: '⋼',
        nisd: '⋺',
        niv: '∋',
        njcy: 'њ',
        nlArr: '⇍',
        nlE: '≦̸',
        nlarr: '↚',
        nldr: '‥',
        nle: '≰',
        nleftarrow: '↚',
        nleftrightarrow: '↮',
        nleq: '≰',
        nleqq: '≦̸',
        nleqslant: '⩽̸',
        nles: '⩽̸',
        nless: '≮',
        nlsim: '≴',
        nlt: '≮',
        nltri: '⋪',
        nltrie: '⋬',
        nmid: '∤',
        nopf: '𝕟',
        no: '¬',
        not: '¬',
        notin: '∉',
        notinE: '⋹̸',
        notindot: '⋵̸',
        notinva: '∉',
        notinvb: '⋷',
        notinvc: '⋶',
        notni: '∌',
        notniva: '∌',
        notnivb: '⋾',
        notnivc: '⋽',
        npar: '∦',
        nparallel: '∦',
        nparsl: '⫽⃥',
        npart: '∂̸',
        npolint: '⨔',
        npr: '⊀',
        nprcue: '⋠',
        npre: '⪯̸',
        nprec: '⊀',
        npreceq: '⪯̸',
        nrArr: '⇏',
        nrarr: '↛',
        nrarrc: '⤳̸',
        nrarrw: '↝̸',
        nrightarrow: '↛',
        nrtri: '⋫',
        nrtrie: '⋭',
        nsc: '⊁',
        nsccue: '⋡',
        nsce: '⪰̸',
        nscr: '𝓃',
        nshortmid: '∤',
        nshortparallel: '∦',
        nsim: '≁',
        nsime: '≄',
        nsimeq: '≄',
        nsmid: '∤',
        nspar: '∦',
        nsqsube: '⋢',
        nsqsupe: '⋣',
        nsub: '⊄',
        nsubE: '⫅̸',
        nsube: '⊈',
        nsubset: '⊂⃒',
        nsubseteq: '⊈',
        nsubseteqq: '⫅̸',
        nsucc: '⊁',
        nsucceq: '⪰̸',
        nsup: '⊅',
        nsupE: '⫆̸',
        nsupe: '⊉',
        nsupset: '⊃⃒',
        nsupseteq: '⊉',
        nsupseteqq: '⫆̸',
        ntgl: '≹',
        ntild: 'ñ',
        ntilde: 'ñ',
        ntlg: '≸',
        ntriangleleft: '⋪',
        ntrianglelefteq: '⋬',
        ntriangleright: '⋫',
        ntrianglerighteq: '⋭',
        nu: 'ν',
        num: '#',
        numero: '№',
        numsp: ' ',
        nvDash: '⊭',
        nvHarr: '⤄',
        nvap: '≍⃒',
        nvdash: '⊬',
        nvge: '≥⃒',
        nvgt: '>⃒',
        nvinfin: '⧞',
        nvlArr: '⤂',
        nvle: '≤⃒',
        nvlt: '<⃒',
        nvltrie: '⊴⃒',
        nvrArr: '⤃',
        nvrtrie: '⊵⃒',
        nvsim: '∼⃒',
        nwArr: '⇖',
        nwarhk: '⤣',
        nwarr: '↖',
        nwarrow: '↖',
        nwnear: '⤧',
        oS: 'Ⓢ',
        oacut: 'ó',
        oacute: 'ó',
        oast: '⊛',
        ocir: 'ô',
        ocirc: 'ô',
        ocy: 'о',
        odash: '⊝',
        odblac: 'ő',
        odiv: '⨸',
        odot: '⊙',
        odsold: '⦼',
        oelig: 'œ',
        ofcir: '⦿',
        ofr: '𝔬',
        ogon: '˛',
        ograv: 'ò',
        ograve: 'ò',
        ogt: '⧁',
        ohbar: '⦵',
        ohm: 'Ω',
        oint: '∮',
        olarr: '↺',
        olcir: '⦾',
        olcross: '⦻',
        oline: '‾',
        olt: '⧀',
        omacr: 'ō',
        omega: 'ω',
        omicron: 'ο',
        omid: '⦶',
        ominus: '⊖',
        oopf: '𝕠',
        opar: '⦷',
        operp: '⦹',
        oplus: '⊕',
        or: '∨',
        orarr: '↻',
        ord: 'º',
        order: 'ℴ',
        orderof: 'ℴ',
        ordf: 'ª',
        ordm: 'º',
        origof: '⊶',
        oror: '⩖',
        orslope: '⩗',
        orv: '⩛',
        oscr: 'ℴ',
        oslas: 'ø',
        oslash: 'ø',
        osol: '⊘',
        otild: 'õ',
        otilde: 'õ',
        otimes: '⊗',
        otimesas: '⨶',
        oum: 'ö',
        ouml: 'ö',
        ovbar: '⌽',
        par: '¶',
        para: '¶',
        parallel: '∥',
        parsim: '⫳',
        parsl: '⫽',
        part: '∂',
        pcy: 'п',
        percnt: '%',
        period: '.',
        permil: '‰',
        perp: '⊥',
        pertenk: '‱',
        pfr: '𝔭',
        phi: 'φ',
        phiv: 'ϕ',
        phmmat: 'ℳ',
        phone: '☎',
        pi: 'π',
        pitchfork: '⋔',
        piv: 'ϖ',
        planck: 'ℏ',
        planckh: 'ℎ',
        plankv: 'ℏ',
        plus: '+',
        plusacir: '⨣',
        plusb: '⊞',
        pluscir: '⨢',
        plusdo: '∔',
        plusdu: '⨥',
        pluse: '⩲',
        plusm: '±',
        plusmn: '±',
        plussim: '⨦',
        plustwo: '⨧',
        pm: '±',
        pointint: '⨕',
        popf: '𝕡',
        poun: '£',
        pound: '£',
        pr: '≺',
        prE: '⪳',
        prap: '⪷',
        prcue: '≼',
        pre: '⪯',
        prec: '≺',
        precapprox: '⪷',
        preccurlyeq: '≼',
        preceq: '⪯',
        precnapprox: '⪹',
        precneqq: '⪵',
        precnsim: '⋨',
        precsim: '≾',
        prime: '′',
        primes: 'ℙ',
        prnE: '⪵',
        prnap: '⪹',
        prnsim: '⋨',
        prod: '∏',
        profalar: '⌮',
        profline: '⌒',
        profsurf: '⌓',
        prop: '∝',
        propto: '∝',
        prsim: '≾',
        prurel: '⊰',
        pscr: '𝓅',
        psi: 'ψ',
        puncsp: ' ',
        qfr: '𝔮',
        qint: '⨌',
        qopf: '𝕢',
        qprime: '⁗',
        qscr: '𝓆',
        quaternions: 'ℍ',
        quatint: '⨖',
        quest: '?',
        questeq: '≟',
        quo: '"',
        quot: '"',
        rAarr: '⇛',
        rArr: '⇒',
        rAtail: '⤜',
        rBarr: '⤏',
        rHar: '⥤',
        race: '∽̱',
        racute: 'ŕ',
        radic: '√',
        raemptyv: '⦳',
        rang: '⟩',
        rangd: '⦒',
        range: '⦥',
        rangle: '⟩',
        raqu: '»',
        raquo: '»',
        rarr: '→',
        rarrap: '⥵',
        rarrb: '⇥',
        rarrbfs: '⤠',
        rarrc: '⤳',
        rarrfs: '⤞',
        rarrhk: '↪',
        rarrlp: '↬',
        rarrpl: '⥅',
        rarrsim: '⥴',
        rarrtl: '↣',
        rarrw: '↝',
        ratail: '⤚',
        ratio: '∶',
        rationals: 'ℚ',
        rbarr: '⤍',
        rbbrk: '❳',
        rbrace: '}',
        rbrack: ']',
        rbrke: '⦌',
        rbrksld: '⦎',
        rbrkslu: '⦐',
        rcaron: 'ř',
        rcedil: 'ŗ',
        rceil: '⌉',
        rcub: '}',
        rcy: 'р',
        rdca: '⤷',
        rdldhar: '⥩',
        rdquo: '”',
        rdquor: '”',
        rdsh: '↳',
        real: 'ℜ',
        realine: 'ℛ',
        realpart: 'ℜ',
        reals: 'ℝ',
        rect: '▭',
        re: '®',
        reg: '®',
        rfisht: '⥽',
        rfloor: '⌋',
        rfr: '𝔯',
        rhard: '⇁',
        rharu: '⇀',
        rharul: '⥬',
        rho: 'ρ',
        rhov: 'ϱ',
        rightarrow: '→',
        rightarrowtail: '↣',
        rightharpoondown: '⇁',
        rightharpoonup: '⇀',
        rightleftarrows: '⇄',
        rightleftharpoons: '⇌',
        rightrightarrows: '⇉',
        rightsquigarrow: '↝',
        rightthreetimes: '⋌',
        ring: '˚',
        risingdotseq: '≓',
        rlarr: '⇄',
        rlhar: '⇌',
        rlm: '‏',
        rmoust: '⎱',
        rmoustache: '⎱',
        rnmid: '⫮',
        roang: '⟭',
        roarr: '⇾',
        robrk: '⟧',
        ropar: '⦆',
        ropf: '𝕣',
        roplus: '⨮',
        rotimes: '⨵',
        rpar: ')',
        rpargt: '⦔',
        rppolint: '⨒',
        rrarr: '⇉',
        rsaquo: '›',
        rscr: '𝓇',
        rsh: '↱',
        rsqb: ']',
        rsquo: '’',
        rsquor: '’',
        rthree: '⋌',
        rtimes: '⋊',
        rtri: '▹',
        rtrie: '⊵',
        rtrif: '▸',
        rtriltri: '⧎',
        ruluhar: '⥨',
        rx: '℞',
        sacute: 'ś',
        sbquo: '‚',
        sc: '≻',
        scE: '⪴',
        scap: '⪸',
        scaron: 'š',
        sccue: '≽',
        sce: '⪰',
        scedil: 'ş',
        scirc: 'ŝ',
        scnE: '⪶',
        scnap: '⪺',
        scnsim: '⋩',
        scpolint: '⨓',
        scsim: '≿',
        scy: 'с',
        sdot: '⋅',
        sdotb: '⊡',
        sdote: '⩦',
        seArr: '⇘',
        searhk: '⤥',
        searr: '↘',
        searrow: '↘',
        sec: '§',
        sect: '§',
        semi: ';',
        seswar: '⤩',
        setminus: '∖',
        setmn: '∖',
        sext: '✶',
        sfr: '𝔰',
        sfrown: '⌢',
        sharp: '♯',
        shchcy: 'щ',
        shcy: 'ш',
        shortmid: '∣',
        shortparallel: '∥',
        sh: '­',
        shy: '­',
        sigma: 'σ',
        sigmaf: 'ς',
        sigmav: 'ς',
        sim: '∼',
        simdot: '⩪',
        sime: '≃',
        simeq: '≃',
        simg: '⪞',
        simgE: '⪠',
        siml: '⪝',
        simlE: '⪟',
        simne: '≆',
        simplus: '⨤',
        simrarr: '⥲',
        slarr: '←',
        smallsetminus: '∖',
        smashp: '⨳',
        smeparsl: '⧤',
        smid: '∣',
        smile: '⌣',
        smt: '⪪',
        smte: '⪬',
        smtes: '⪬︀',
        softcy: 'ь',
        sol: '/',
        solb: '⧄',
        solbar: '⌿',
        sopf: '𝕤',
        spades: '♠',
        spadesuit: '♠',
        spar: '∥',
        sqcap: '⊓',
        sqcaps: '⊓︀',
        sqcup: '⊔',
        sqcups: '⊔︀',
        sqsub: '⊏',
        sqsube: '⊑',
        sqsubset: '⊏',
        sqsubseteq: '⊑',
        sqsup: '⊐',
        sqsupe: '⊒',
        sqsupset: '⊐',
        sqsupseteq: '⊒',
        squ: '□',
        square: '□',
        squarf: '▪',
        squf: '▪',
        srarr: '→',
        sscr: '𝓈',
        ssetmn: '∖',
        ssmile: '⌣',
        sstarf: '⋆',
        star: '☆',
        starf: '★',
        straightepsilon: 'ϵ',
        straightphi: 'ϕ',
        strns: '¯',
        sub: '⊂',
        subE: '⫅',
        subdot: '⪽',
        sube: '⊆',
        subedot: '⫃',
        submult: '⫁',
        subnE: '⫋',
        subne: '⊊',
        subplus: '⪿',
        subrarr: '⥹',
        subset: '⊂',
        subseteq: '⊆',
        subseteqq: '⫅',
        subsetneq: '⊊',
        subsetneqq: '⫋',
        subsim: '⫇',
        subsub: '⫕',
        subsup: '⫓',
        succ: '≻',
        succapprox: '⪸',
        succcurlyeq: '≽',
        succeq: '⪰',
        succnapprox: '⪺',
        succneqq: '⪶',
        succnsim: '⋩',
        succsim: '≿',
        sum: '∑',
        sung: '♪',
        sup: '⊃',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        supE: '⫆',
        supdot: '⪾',
        supdsub: '⫘',
        supe: '⊇',
        supedot: '⫄',
        suphsol: '⟉',
        suphsub: '⫗',
        suplarr: '⥻',
        supmult: '⫂',
        supnE: '⫌',
        supne: '⊋',
        supplus: '⫀',
        supset: '⊃',
        supseteq: '⊇',
        supseteqq: '⫆',
        supsetneq: '⊋',
        supsetneqq: '⫌',
        supsim: '⫈',
        supsub: '⫔',
        supsup: '⫖',
        swArr: '⇙',
        swarhk: '⤦',
        swarr: '↙',
        swarrow: '↙',
        swnwar: '⤪',
        szli: 'ß',
        szlig: 'ß',
        target: '⌖',
        tau: 'τ',
        tbrk: '⎴',
        tcaron: 'ť',
        tcedil: 'ţ',
        tcy: 'т',
        tdot: '⃛',
        telrec: '⌕',
        tfr: '𝔱',
        there4: '∴',
        therefore: '∴',
        theta: 'θ',
        thetasym: 'ϑ',
        thetav: 'ϑ',
        thickapprox: '≈',
        thicksim: '∼',
        thinsp: ' ',
        thkap: '≈',
        thksim: '∼',
        thor: 'þ',
        thorn: 'þ',
        tilde: '˜',
        time: '×',
        times: '×',
        timesb: '⊠',
        timesbar: '⨱',
        timesd: '⨰',
        tint: '∭',
        toea: '⤨',
        top: '⊤',
        topbot: '⌶',
        topcir: '⫱',
        topf: '𝕥',
        topfork: '⫚',
        tosa: '⤩',
        tprime: '‴',
        trade: '™',
        triangle: '▵',
        triangledown: '▿',
        triangleleft: '◃',
        trianglelefteq: '⊴',
        triangleq: '≜',
        triangleright: '▹',
        trianglerighteq: '⊵',
        tridot: '◬',
        trie: '≜',
        triminus: '⨺',
        triplus: '⨹',
        trisb: '⧍',
        tritime: '⨻',
        trpezium: '⏢',
        tscr: '𝓉',
        tscy: 'ц',
        tshcy: 'ћ',
        tstrok: 'ŧ',
        twixt: '≬',
        twoheadleftarrow: '↞',
        twoheadrightarrow: '↠',
        uArr: '⇑',
        uHar: '⥣',
        uacut: 'ú',
        uacute: 'ú',
        uarr: '↑',
        ubrcy: 'ў',
        ubreve: 'ŭ',
        ucir: 'û',
        ucirc: 'û',
        ucy: 'у',
        udarr: '⇅',
        udblac: 'ű',
        udhar: '⥮',
        ufisht: '⥾',
        ufr: '𝔲',
        ugrav: 'ù',
        ugrave: 'ù',
        uharl: '↿',
        uharr: '↾',
        uhblk: '▀',
        ulcorn: '⌜',
        ulcorner: '⌜',
        ulcrop: '⌏',
        ultri: '◸',
        umacr: 'ū',
        um: '¨',
        uml: '¨',
        uogon: 'ų',
        uopf: '𝕦',
        uparrow: '↑',
        updownarrow: '↕',
        upharpoonleft: '↿',
        upharpoonright: '↾',
        uplus: '⊎',
        upsi: 'υ',
        upsih: 'ϒ',
        upsilon: 'υ',
        upuparrows: '⇈',
        urcorn: '⌝',
        urcorner: '⌝',
        urcrop: '⌎',
        uring: 'ů',
        urtri: '◹',
        uscr: '𝓊',
        utdot: '⋰',
        utilde: 'ũ',
        utri: '▵',
        utrif: '▴',
        uuarr: '⇈',
        uum: 'ü',
        uuml: 'ü',
        uwangle: '⦧',
        vArr: '⇕',
        vBar: '⫨',
        vBarv: '⫩',
        vDash: '⊨',
        vangrt: '⦜',
        varepsilon: 'ϵ',
        varkappa: 'ϰ',
        varnothing: '∅',
        varphi: 'ϕ',
        varpi: 'ϖ',
        varpropto: '∝',
        varr: '↕',
        varrho: 'ϱ',
        varsigma: 'ς',
        varsubsetneq: '⊊︀',
        varsubsetneqq: '⫋︀',
        varsupsetneq: '⊋︀',
        varsupsetneqq: '⫌︀',
        vartheta: 'ϑ',
        vartriangleleft: '⊲',
        vartriangleright: '⊳',
        vcy: 'в',
        vdash: '⊢',
        vee: '∨',
        veebar: '⊻',
        veeeq: '≚',
        vellip: '⋮',
        verbar: '|',
        vert: '|',
        vfr: '𝔳',
        vltri: '⊲',
        vnsub: '⊂⃒',
        vnsup: '⊃⃒',
        vopf: '𝕧',
        vprop: '∝',
        vrtri: '⊳',
        vscr: '𝓋',
        vsubnE: '⫋︀',
        vsubne: '⊊︀',
        vsupnE: '⫌︀',
        vsupne: '⊋︀',
        vzigzag: '⦚',
        wcirc: 'ŵ',
        wedbar: '⩟',
        wedge: '∧',
        wedgeq: '≙',
        weierp: '℘',
        wfr: '𝔴',
        wopf: '𝕨',
        wp: '℘',
        wr: '≀',
        wreath: '≀',
        wscr: '𝓌',
        xcap: '⋂',
        xcirc: '◯',
        xcup: '⋃',
        xdtri: '▽',
        xfr: '𝔵',
        xhArr: '⟺',
        xharr: '⟷',
        xi: 'ξ',
        xlArr: '⟸',
        xlarr: '⟵',
        xmap: '⟼',
        xnis: '⋻',
        xodot: '⨀',
        xopf: '𝕩',
        xoplus: '⨁',
        xotime: '⨂',
        xrArr: '⟹',
        xrarr: '⟶',
        xscr: '𝓍',
        xsqcup: '⨆',
        xuplus: '⨄',
        xutri: '△',
        xvee: '⋁',
        xwedge: '⋀',
        yacut: 'ý',
        yacute: 'ý',
        yacy: 'я',
        ycirc: 'ŷ',
        ycy: 'ы',
        ye: '¥',
        yen: '¥',
        yfr: '𝔶',
        yicy: 'ї',
        yopf: '𝕪',
        yscr: '𝓎',
        yucy: 'ю',
        yum: 'ÿ',
        yuml: 'ÿ',
        zacute: 'ź',
        zcaron: 'ž',
        zcy: 'з',
        zdot: 'ż',
        zeetrf: 'ℨ',
        zeta: 'ζ',
        zfr: '𝔷',
        zhcy: 'ж',
        zigrarr: '⇝',
        zopf: '𝕫',
        zscr: '𝓏',
        zwj: '‍',
        zwnj: '‌',
      }
    },
    function(t, e, i) {
      'use strict'
      function n(t) {
        var e, i
        return (
          'text' !== t.type ||
          !t.position ||
          ((e = t.position.start),
          (i = t.position.end),
          e.line !== i.line || i.column - e.column === t.value.length)
        )
      }
      function a(t, e) {
        return (t.value += e.value), t
      }
      function r(t, e) {
        return this.options.commonmark
          ? e
          : ((t.children = t.children.concat(e.children)), t)
      }
      t.exports = function(t) {
        return function(e, i) {
          var o,
            s,
            l,
            c,
            p,
            u,
            d = this,
            h = d.offset,
            m = [],
            f = d[t + 'Methods'],
            g = d[t + 'Tokenizers'],
            v = i.line,
            x = i.column
          if (!e) return m
          ;(k.now = y), (k.file = d.file), b('')
          for (; e; ) {
            for (
              o = -1, s = f.length, p = !1;
              ++o < s &&
              ((c = f[o]),
              !(l = g[c]) ||
                (l.onlyAtStart && !d.atStart) ||
                (l.notInList && d.inList) ||
                (l.notInBlock && d.inBlock) ||
                (l.notInLink && d.inLink) ||
                ((u = e.length), l.apply(d, [k, e]), !(p = u !== e.length)));

            );
            p || d.file.fail(new Error('Infinite loop'), k.now())
          }
          return (d.eof = y()), m
          function b(t) {
            for (var e = -1, i = t.indexOf('\n'); -1 !== i; )
              v++, (e = i), (i = t.indexOf('\n', i + 1))
            ;-1 === e ? (x += t.length) : (x = t.length - e),
              v in h && (-1 !== e ? (x += h[v]) : x <= h[v] && (x = h[v] + 1))
          }
          function y() {
            var t = {line: v, column: x}
            return (t.offset = d.toOffset(t)), t
          }
          function w(t) {
            ;(this.start = t), (this.end = y())
          }
          function k(t) {
            var i = (function() {
                var t = [],
                  e = v + 1
                return function() {
                  for (var i = v + 1; e < i; ) t.push((h[e] || 0) + 1), e++
                  return t
                }
              })(),
              o = (function() {
                var t = y()
                return function(e, i) {
                  var n = e.position,
                    a = n ? n.start : t,
                    r = [],
                    o = n && n.end.line,
                    s = t.line
                  if (((e.position = new w(a)), n && i && n.indent)) {
                    if (((r = n.indent), o < s)) {
                      for (; ++o < s; ) r.push((h[o] || 0) + 1)
                      r.push(t.column)
                    }
                    i = r.concat(i)
                  }
                  return (e.position.indent = i || []), e
                }
              })(),
              s = y()
            return (
              (function(t) {
                e.substring(0, t.length) !== t &&
                  d.file.fail(
                    new Error(
                      'Incorrectly eaten value: please report this warning on https://git.io/vg5Ft',
                    ),
                    y(),
                  )
              })(t),
              (l.reset = c),
              (c.test = p),
              (l.test = p),
              (e = e.substring(t.length)),
              b(t),
              (i = i()),
              l
            )
            function l(t, e) {
              return o(
                (function(t, e) {
                  var i,
                    o = e ? e.children : m,
                    s = o[o.length - 1]
                  s &&
                    t.type === s.type &&
                    ('text' === t.type || 'blockquote' === t.type) &&
                    n(s) &&
                    n(t) &&
                    ((i = 'text' === t.type ? a : r), (t = i.call(d, s, t)))
                  t !== s && o.push(t)
                  d.atStart && 0 !== m.length && d.exitStart()
                  return t
                })(o(t), e),
                i,
              )
            }
            function c() {
              var i = l.apply(null, arguments)
              return (v = s.line), (x = s.column), (e = t + e), i
            }
            function p() {
              var i = o({})
              return (v = s.line), (x = s.column), (e = t + e), i.position
            }
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(217),
        r = i(82)
      t.exports = function(t) {
        var e,
          i,
          o = this.options
        if (null == t) t = {}
        else {
          if ('object' != typeof t)
            throw new Error('Invalid value `' + t + '` for setting `options`')
          t = n(t)
        }
        for (e in r) {
          if (
            (null == (i = t[e]) && (i = o[e]),
            ('blocks' !== e && 'boolean' != typeof i) ||
              ('blocks' === e && 'object' != typeof i))
          )
            throw new Error(
              'Invalid value `' + i + '` for setting `options.' + e + '`',
            )
          t[e] = i
        }
        return (this.options = t), (this.escape = a(t)), this
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = o
      var n = [
          '\\',
          '`',
          '*',
          '{',
          '}',
          '[',
          ']',
          '(',
          ')',
          '#',
          '+',
          '-',
          '.',
          '!',
          '_',
          '>',
        ],
        a = n.concat(['~', '|']),
        r = a.concat([
          '\n',
          '"',
          '$',
          '%',
          '&',
          "'",
          ',',
          '/',
          ':',
          ';',
          '<',
          '=',
          '?',
          '@',
          '^',
        ])
      function o(t) {
        var e = t || {}
        return e.commonmark ? r : e.gfm ? a : n
      }
      ;(o.default = n), (o.gfm = a), (o.commonmark = r)
    },
    function(t, e, i) {
      'use strict'
      t.exports = [
        'address',
        'article',
        'aside',
        'base',
        'basefont',
        'blockquote',
        'body',
        'caption',
        'center',
        'col',
        'colgroup',
        'dd',
        'details',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'frame',
        'frameset',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'iframe',
        'legend',
        'li',
        'link',
        'main',
        'menu',
        'menuitem',
        'meta',
        'nav',
        'noframes',
        'ol',
        'optgroup',
        'option',
        'p',
        'param',
        'pre',
        'section',
        'source',
        'title',
        'summary',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'title',
        'tr',
        'track',
        'ul',
      ]
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(220)
      t.exports = function() {
        var t,
          e = String(this.file),
          i = {line: 1, column: 1, offset: 0},
          s = n(i)
        65279 === (e = e.replace(o, r)).charCodeAt(0) &&
          ((e = e.slice(1)), s.column++, s.offset++)
        ;(t = {
          type: 'root',
          children: this.tokenizeBlock(e, s),
          position: {start: i, end: this.eof || n(i)},
        }),
          this.options.position || a(t, !0)
        return t
      }
      var r = '\n',
        o = /\r\n|\r/g
    },
    function(t, e, i) {
      'use strict'
      var n = i(46)
      function a(t) {
        delete t.position
      }
      function r(t) {
        t.position = void 0
      }
      t.exports = function(t, e) {
        return n(t, e ? a : r), t
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7)
      t.exports = function(t, e, i) {
        var r,
          o,
          s,
          l,
          c = e.charAt(0)
        if (c !== a) return
        if (i) return !0
        ;(l = 1), (r = e.length), (o = c), (s = '')
        for (; l < r && ((c = e.charAt(l)), n(c)); )
          (s += c), c === a && ((o += s), (s = '')), l++
        t(o)
      }
      var a = '\n'
    },
    function(t, e, i) {
      'use strict'
      var n = i(23),
        a = i(47)
      t.exports = function(t, e, i) {
        var n,
          c,
          p,
          u = -1,
          d = e.length,
          h = '',
          m = '',
          f = '',
          g = ''
        for (; ++u < d; )
          if (((n = e.charAt(u)), p))
            if (((p = !1), (h += f), (m += g), (f = ''), (g = ''), n === r))
              (f = n), (g = n)
            else
              for (h += n, m += n; ++u < d; ) {
                if (!(n = e.charAt(u)) || n === r) {
                  ;(g = n), (f = n)
                  break
                }
                ;(h += n), (m += n)
              }
          else if (
            n === s &&
            e.charAt(u + 1) === n &&
            e.charAt(u + 2) === n &&
            e.charAt(u + 3) === n
          )
            (f += l), (u += 3), (p = !0)
          else if (n === o) (f += n), (p = !0)
          else {
            for (c = ''; n === o || n === s; ) (c += n), (n = e.charAt(++u))
            if (n !== r) break
            ;(f += c + n), (g += n)
          }
        if (m)
          return (
            !!i || t(h)({type: 'code', lang: null, meta: null, value: a(m)})
          )
      }
      var r = '\n',
        o = '\t',
        s = ' ',
        l = n(s, 4)
    },
    function(t, e, i) {
      'use strict'
      var n = i(47)
      t.exports = function(t, e, i) {
        var u,
          d,
          h,
          m,
          f,
          g,
          v,
          x,
          b,
          y,
          w,
          k,
          _,
          E = this.options.gfm,
          A = e.length + 1,
          S = 0,
          T = ''
        if (!E) return
        for (; S < A && ((h = e.charAt(S)) === o || h === r); ) (T += h), S++
        if (((k = S), (h = e.charAt(S)) !== s && h !== l)) return
        S++, (d = h), (u = 1), (T += h)
        for (; S < A && (h = e.charAt(S)) === d; ) (T += h), u++, S++
        if (u < c) return
        for (; S < A && ((h = e.charAt(S)) === o || h === r); ) (T += h), S++
        ;(m = ''), (v = '')
        for (; S < A && (h = e.charAt(S)) !== a && h !== s && h !== l; )
          h === o || h === r ? (v += h) : ((m += v + h), (v = '')), S++
        if ((h = e.charAt(S)) && h !== a) return
        if (i) return !0
        ;((_ = t.now()).column += T.length),
          (_.offset += T.length),
          (T += m),
          (m = this.decode.raw(this.unescape(m), _)),
          v && (T += v)
        ;(v = ''), (y = ''), (w = ''), (x = ''), (b = '')
        for (; S < A; )
          if (
            ((h = e.charAt(S)), (x += y), (b += w), (y = ''), (w = ''), h === a)
          ) {
            for (
              x ? ((y += h), (w += h)) : (T += h), v = '', S++;
              S < A && (h = e.charAt(S)) === o;

            )
              (v += h), S++
            if (((y += v), (w += v.slice(k)), !(v.length >= p))) {
              for (v = ''; S < A && (h = e.charAt(S)) === d; ) (v += h), S++
              if (((y += v), (w += v), !(v.length < u))) {
                for (v = ''; S < A && ((h = e.charAt(S)) === o || h === r); )
                  (y += h), (w += h), S++
                if (!h || h === a) break
              }
            }
          } else (x += h), (w += h), S++
        ;(T += x + y), (S = -1), (A = m.length)
        for (; ++S < A; )
          if ((h = m.charAt(S)) === o || h === r) f || (f = m.slice(0, S))
          else if (f) {
            g = m.slice(S)
            break
          }
        return t(T)({
          type: 'code',
          lang: f || m || null,
          meta: g || null,
          value: n(b),
        })
      }
      var a = '\n',
        r = '\t',
        o = ' ',
        s = '~',
        l = '`',
        c = 3,
        p = 4
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(48)
      t.exports = function(t, e, i) {
        var c,
          p,
          u,
          d,
          h,
          m,
          f,
          g,
          v,
          x = this.offset,
          b = this.blockTokenizers,
          y = this.interruptBlockquote,
          w = t.now(),
          k = w.line,
          _ = e.length,
          E = [],
          A = [],
          S = [],
          T = 0
        for (; T < _ && ((p = e.charAt(T)) === s || p === o); ) T++
        if (e.charAt(T) !== l) return
        if (i) return !0
        T = 0
        for (; T < _; ) {
          for (
            d = e.indexOf(r, T), f = T, g = !1, -1 === d && (d = _);
            T < _ && ((p = e.charAt(T)) === s || p === o);

          )
            T++
          if (
            (e.charAt(T) === l
              ? (T++, (g = !0), e.charAt(T) === s && T++)
              : (T = f),
            (h = e.slice(T, d)),
            !g && !n(h))
          ) {
            T = f
            break
          }
          if (!g && ((u = e.slice(T)), a(y, b, this, [t, u, !0]))) break
          ;(m = f === T ? h : e.slice(f, d)),
            S.push(T - f),
            E.push(m),
            A.push(h),
            (T = d + 1)
        }
        ;(T = -1), (_ = S.length), (c = t(E.join(r)))
        for (; ++T < _; ) (x[k] = (x[k] || 0) + S[T]), k++
        return (
          (v = this.enterBlock()),
          (A = this.tokenizeBlock(A.join(r), w)),
          v(),
          c({type: 'blockquote', children: A})
        )
      }
      var r = '\n',
        o = '\t',
        s = ' ',
        l = '>'
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var l,
          c,
          p,
          u = this.options.pedantic,
          d = e.length + 1,
          h = -1,
          m = t.now(),
          f = '',
          g = ''
        for (; ++h < d; ) {
          if ((l = e.charAt(h)) !== r && l !== a) {
            h--
            break
          }
          f += l
        }
        p = 0
        for (; ++h <= d; ) {
          if ((l = e.charAt(h)) !== o) {
            h--
            break
          }
          ;(f += l), p++
        }
        if (p > s) return
        if (!p || (!u && e.charAt(h + 1) === o)) return
        ;(d = e.length + 1), (c = '')
        for (; ++h < d; ) {
          if ((l = e.charAt(h)) !== r && l !== a) {
            h--
            break
          }
          c += l
        }
        if (!u && 0 === c.length && l && l !== n) return
        if (i) return !0
        ;(f += c), (c = ''), (g = '')
        for (; ++h < d && (l = e.charAt(h)) && l !== n; )
          if (l === r || l === a || l === o) {
            for (; l === r || l === a; ) (c += l), (l = e.charAt(++h))
            if (u || !g || c || l !== o) {
              for (; l === o; ) (c += l), (l = e.charAt(++h))
              for (; l === r || l === a; ) (c += l), (l = e.charAt(++h))
              h--
            } else g += l
          } else (g += c + l), (c = '')
        return (
          (m.column += f.length),
          (m.offset += f.length),
          t((f += g + c))({
            type: 'heading',
            depth: p,
            children: this.tokenizeInline(g, m),
          })
        )
      }
      var n = '\n',
        a = '\t',
        r = ' ',
        o = '#',
        s = 6
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var p,
          u,
          d,
          h,
          m = -1,
          f = e.length + 1,
          g = ''
        for (; ++m < f && ((p = e.charAt(m)) === n || p === r); ) g += p
        if (p !== o && p !== s && p !== l) return
        ;(u = p), (g += p), (d = 1), (h = '')
        for (; ++m < f; )
          if ((p = e.charAt(m)) === u) d++, (g += h + u), (h = '')
          else {
            if (p !== r)
              return d >= c && (!p || p === a)
                ? ((g += h), !!i || t(g)({type: 'thematicBreak'}))
                : void 0
            h += p
          }
      }
      var n = '\t',
        a = '\n',
        r = ' ',
        o = '*',
        s = '-',
        l = '_',
        c = 3
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(23),
        r = i(35),
        o = i(84),
        s = i(228),
        l = i(48)
      t.exports = function(t, e, i) {
        var a,
          o,
          s,
          x,
          y,
          w,
          k,
          _,
          E,
          S,
          T,
          O,
          C,
          j,
          L,
          P,
          q,
          N,
          I,
          z,
          M,
          B,
          D = this.options.commonmark,
          R = this.options.pedantic,
          U = this.blockTokenizers,
          H = this.interruptList,
          $ = 0,
          V = e.length,
          F = null,
          G = 0,
          W = !1
        for (; $ < V; ) {
          if ((s = e.charAt($)) === g) G += b - (G % b)
          else {
            if (s !== m) break
            G++
          }
          $++
        }
        if (G >= b) return
        if ((s = e.charAt($)) === c || s === u || s === d) (x = s), (o = !1)
        else {
          for (o = !0, a = ''; $ < V && ((s = e.charAt($)), r(s)); )
            (a += s), $++
          if (((s = e.charAt($)), !a || !(s === h || (D && s === v)))) return
          ;(F = parseInt(a, 10)), (x = s)
        }
        if (
          (s = e.charAt(++$)) !== m &&
          s !== g &&
          (R || (s !== f && '' !== s))
        )
          return
        if (i) return !0
        ;($ = 0), (C = []), (j = []), (L = [])
        for (; $ < V; ) {
          for (
            y = e.indexOf(f, $),
              w = $,
              k = !1,
              B = !1,
              -1 === y && (y = V),
              M = $ + b,
              G = 0;
            $ < V;

          ) {
            if ((s = e.charAt($)) === g) G += b - (G % b)
            else {
              if (s !== m) break
              G++
            }
            $++
          }
          if (
            (G >= b && (B = !0),
            P && G >= P.indent && (B = !0),
            (s = e.charAt($)),
            (_ = null),
            !B)
          ) {
            if (s === c || s === u || s === d) (_ = s), $++, G++
            else {
              for (a = ''; $ < V && ((s = e.charAt($)), r(s)); ) (a += s), $++
              ;(s = e.charAt($)),
                $++,
                a &&
                  (s === h || (D && s === v)) &&
                  ((_ = s), (G += a.length + 1))
            }
            if (_)
              if ((s = e.charAt($)) === g) (G += b - (G % b)), $++
              else if (s === m) {
                for (M = $ + b; $ < M && e.charAt($) === m; ) $++, G++
                $ === M && e.charAt($) === m && (($ -= b - 1), (G -= b - 1))
              } else s !== f && '' !== s && (_ = null)
          }
          if (_) {
            if (!R && x !== _) break
            k = !0
          } else
            D || B || e.charAt(w) !== m
              ? D && P && (B = G >= P.indent || G > b)
              : (B = !0),
              (k = !1),
              ($ = w)
          if (
            ((S = e.slice(w, y)),
            (E = w === $ ? S : e.slice($, y)),
            (_ === c || _ === p || _ === d) &&
              U.thematicBreak.call(this, t, S, !0))
          )
            break
          if (((T = O), (O = !k && !n(E).length), B && P))
            (P.value = P.value.concat(L, S)), (j = j.concat(L, S)), (L = [])
          else if (k)
            0 !== L.length &&
              ((W = !0), P.value.push(''), (P.trail = L.concat())),
              (P = {value: [S], indent: G, trail: []}),
              C.push(P),
              (j = j.concat(L, S)),
              (L = [])
          else if (O) {
            if (T && !D) break
            L.push(S)
          } else {
            if (T) break
            if (l(H, U, this, [t, S, !0])) break
            ;(P.value = P.value.concat(L, S)), (j = j.concat(L, S)), (L = [])
          }
          $ = y + 1
        }
        ;(I = t(j.join(f)).reset({
          type: 'list',
          ordered: o,
          start: F,
          spread: W,
          children: [],
        })),
          (q = this.enterList()),
          (N = this.enterBlock()),
          ($ = -1),
          (V = C.length)
        for (; ++$ < V; )
          (P = C[$].value.join(f)),
            (z = t.now()),
            t(P)(A(this, P, z), I),
            (P = C[$].trail.join(f)),
            $ !== V - 1 && (P += f),
            t(P)
        return q(), N(), I
      }
      var c = '*',
        p = '_',
        u = '+',
        d = '-',
        h = '.',
        m = ' ',
        f = '\n',
        g = '\t',
        v = ')',
        x = 'x',
        b = 4,
        y = /\n\n(?!\s*$)/,
        w = /^\[([ \t]|x|X)][ \t]/,
        k = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/,
        _ = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/,
        E = /^( {1,4}|\t)?/gm
      function A(t, e, i) {
        var n,
          a,
          r = t.offset,
          o = null
        return (
          (e = (t.options.pedantic ? S : T).apply(null, arguments)),
          t.options.gfm &&
            (n = e.match(w)) &&
            ((a = n[0].length),
            (o = n[1].toLowerCase() === x),
            (r[i.line] += a),
            (e = e.slice(a))),
          {
            type: 'listItem',
            spread: y.test(e),
            checked: o,
            children: t.tokenizeBlock(e, i),
          }
        )
      }
      function S(t, e, i) {
        var n = t.offset,
          a = i.line
        return (e = e.replace(_, r)), (a = i.line), e.replace(E, r)
        function r(t) {
          return (n[a] = (n[a] || 0) + t.length), a++, ''
        }
      }
      function T(t, e, i) {
        var n,
          r,
          l,
          c,
          p,
          u,
          d,
          h = t.offset,
          g = i.line
        for (
          c = (e = e.replace(k, function(t, e, i, o, s) {
            ;(r = e + i + o),
              (l = s),
              Number(i) < 10 && r.length % 2 == 1 && (i = m + i)
            return (n = e + a(m, i.length) + o) + l
          })).split(f),
            (p = s(e, o(n).indent).split(f))[0] = l,
            h[g] = (h[g] || 0) + r.length,
            g++,
            u = 0,
            d = c.length;
          ++u < d;

        )
          (h[g] = (h[g] || 0) + c[u].length - p[u].length), g++
        return p.join(f)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(23),
        r = i(84)
      t.exports = function(t, e) {
        var i,
          p,
          u,
          d,
          h = t.split(s),
          m = h.length + 1,
          f = 1 / 0,
          g = []
        h.unshift(a(l, e) + c)
        for (; m--; )
          if (((p = r(h[m])), (g[m] = p.stops), 0 !== n(h[m]).length)) {
            if (!p.indent) {
              f = 1 / 0
              break
            }
            p.indent > 0 && p.indent < f && (f = p.indent)
          }
        if (f !== 1 / 0)
          for (m = h.length; m--; ) {
            for (u = g[m], i = f; i && !(i in u); ) i--
            ;(d = 0 !== n(h[m]).length && f && i !== f ? o : ''),
              (h[m] = d + h[m].slice(i in u ? u[i] + 1 : 0))
          }
        return h.shift(), h.join(s)
      }
      var o = '\t',
        s = '\n',
        l = ' ',
        c = '!'
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var u,
          d,
          h,
          m,
          f,
          g = t.now(),
          v = e.length,
          x = -1,
          b = ''
        for (; ++x < v; ) {
          if ((h = e.charAt(x)) !== r || x >= l) {
            x--
            break
          }
          b += h
        }
        ;(u = ''), (d = '')
        for (; ++x < v; ) {
          if ((h = e.charAt(x)) === n) {
            x--
            break
          }
          h === r || h === a ? (d += h) : ((u += d + h), (d = ''))
        }
        if (
          ((g.column += b.length),
          (g.offset += b.length),
          (b += u + d),
          (h = e.charAt(++x)),
          (m = e.charAt(++x)),
          h !== n || (m !== o && m !== s))
        )
          return
        ;(b += h), (d = m), (f = m === o ? c : p)
        for (; ++x < v; ) {
          if ((h = e.charAt(x)) !== m) {
            if (h !== n) return
            x--
            break
          }
          d += h
        }
        if (i) return !0
        return t(b + d)({
          type: 'heading',
          depth: f,
          children: this.tokenizeInline(u, g),
        })
      }
      var n = '\n',
        a = '\t',
        r = ' ',
        o = '=',
        s = '-',
        l = 3,
        c = 1,
        p = 2
    },
    function(t, e, i) {
      'use strict'
      var n = i(85).openCloseTag
      t.exports = function(t, e, i) {
        var n,
          y,
          w,
          k,
          _,
          E,
          A,
          S = this.options.blocks.join('|'),
          T = new RegExp('^</?(' + S + ')(?=(\\s|/?>|$))', 'i'),
          O = e.length,
          C = 0,
          j = [
            [l, c, !0],
            [p, u, !0],
            [d, h, !0],
            [m, f, !0],
            [g, v, !0],
            [T, x, !0],
            [b, x, !1],
          ]
        for (; C < O && ((k = e.charAt(C)) === a || k === r); ) C++
        if (e.charAt(C) !== s) return
        ;(n = -1 === (n = e.indexOf(o, C + 1)) ? O : n),
          (y = e.slice(C, n)),
          (w = -1),
          (_ = j.length)
        for (; ++w < _; )
          if (j[w][0].test(y)) {
            E = j[w]
            break
          }
        if (!E) return
        if (i) return E[2]
        if (((C = n), !E[1].test(y)))
          for (; C < O; ) {
            if (
              ((n = -1 === (n = e.indexOf(o, C + 1)) ? O : n),
              (y = e.slice(C + 1, n)),
              E[1].test(y))
            ) {
              y && (C = n)
              break
            }
            C = n
          }
        return (A = e.slice(0, C)), t(A)({type: 'html', value: A})
      }
      var a = '\t',
        r = ' ',
        o = '\n',
        s = '<',
        l = /^<(script|pre|style)(?=(\s|>|$))/i,
        c = /<\/(script|pre|style)>/i,
        p = /^<!--/,
        u = /-->/,
        d = /^<\?/,
        h = /\?>/,
        m = /^<![A-Za-z]/,
        f = />/,
        g = /^<!\[CDATA\[/,
        v = /\]\]>/,
        x = /^$/,
        b = new RegExp(n.source + '\\s*$')
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(49)
      ;(t.exports = m), (m.notInList = !0), (m.notInBlock = !0)
      var r = '\\',
        o = '\n',
        s = '\t',
        l = ' ',
        c = '[',
        p = ']',
        u = '^',
        d = ':',
        h = /^( {4}|\t)?/gm
      function m(t, e, i) {
        var m,
          f,
          g,
          v,
          x,
          b,
          y,
          w,
          k,
          _,
          E,
          A,
          S = this.offset
        if (this.options.footnotes) {
          for (
            m = 0, f = e.length, g = '', v = t.now(), x = v.line;
            m < f && ((k = e.charAt(m)), n(k));

          )
            (g += k), m++
          if (e.charAt(m) === c && e.charAt(m + 1) === u) {
            for (
              m = (g += c + u).length, y = '';
              m < f && (k = e.charAt(m)) !== p;

            )
              k === r && ((y += k), m++, (k = e.charAt(m))), (y += k), m++
            if (y && e.charAt(m) === p && e.charAt(m + 1) === d) {
              if (i) return !0
              for (
                _ = y, m = (g += y + p + d).length;
                m < f && ((k = e.charAt(m)) === s || k === l);

              )
                (g += k), m++
              for (
                v.column += g.length,
                  v.offset += g.length,
                  y = '',
                  b = '',
                  w = '';
                m < f;

              ) {
                if ((k = e.charAt(m)) === o) {
                  for (w = k, m++; m < f && (k = e.charAt(m)) === o; )
                    (w += k), m++
                  for (y += w, w = ''; m < f && (k = e.charAt(m)) === l; )
                    (w += k), m++
                  if (0 === w.length) break
                  y += w
                }
                y && ((b += y), (y = '')), (b += k), m++
              }
              return (
                (g += b),
                (b = b.replace(h, function(t) {
                  return (S[x] = (S[x] || 0) + t.length), x++, ''
                })),
                (E = t(g)),
                (A = this.enterBlock()),
                (b = this.tokenizeBlock(b, v)),
                A(),
                E({
                  type: 'footnoteDefinition',
                  identifier: a(_),
                  label: _,
                  children: b,
                })
              )
            }
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(49)
      ;(t.exports = x), (x.notInList = !0), (x.notInBlock = !0)
      var r = '"',
        o = "'",
        s = '\\',
        l = '\n',
        c = '\t',
        p = ' ',
        u = '[',
        d = ']',
        h = '(',
        m = ')',
        f = ':',
        g = '<',
        v = '>'
      function x(t, e, i) {
        for (
          var n,
            v,
            x,
            w,
            k,
            _,
            E,
            A,
            S = this.options.commonmark,
            T = 0,
            O = e.length,
            C = '';
          T < O && ((w = e.charAt(T)) === p || w === c);

        )
          (C += w), T++
        if ((w = e.charAt(T)) === u) {
          for (T++, C += w, x = ''; T < O && (w = e.charAt(T)) !== d; )
            w === s && ((x += w), T++, (w = e.charAt(T))), (x += w), T++
          if (x && e.charAt(T) === d && e.charAt(T + 1) === f) {
            for (
              _ = x, T = (C += x + d + f).length, x = '';
              T < O && ((w = e.charAt(T)) === c || w === p || w === l);

            )
              (C += w), T++
            if (((x = ''), (n = C), (w = e.charAt(T)) === g)) {
              for (T++; T < O && b((w = e.charAt(T))); ) (x += w), T++
              if ((w = e.charAt(T)) === b.delimiter) (C += g + x + w), T++
              else {
                if (S) return
                ;(T -= x.length + 1), (x = '')
              }
            }
            if (!x) {
              for (; T < O && y((w = e.charAt(T))); ) (x += w), T++
              C += x
            }
            if (x) {
              for (
                E = x, x = '';
                T < O && ((w = e.charAt(T)) === c || w === p || w === l);

              )
                (x += w), T++
              if (
                ((k = null),
                (w = e.charAt(T)) === r
                  ? (k = r)
                  : w === o
                  ? (k = o)
                  : w === h && (k = m),
                k)
              ) {
                if (!x) return
                for (
                  T = (C += x + w).length, x = '';
                  T < O && (w = e.charAt(T)) !== k;

                ) {
                  if (w === l) {
                    if ((T++, (w = e.charAt(T)) === l || w === k)) return
                    x += l
                  }
                  ;(x += w), T++
                }
                if ((w = e.charAt(T)) !== k) return
                ;(v = C), (C += x + w), T++, (A = x), (x = '')
              } else (x = ''), (T = C.length)
              for (; T < O && ((w = e.charAt(T)) === c || w === p); )
                (C += w), T++
              return (w = e.charAt(T)) && w !== l
                ? void 0
                : !!i ||
                    ((n = t(n).test().end),
                    (E = this.decode.raw(this.unescape(E), n, {
                      nonTerminated: !1,
                    })),
                    A &&
                      ((v = t(v).test().end),
                      (A = this.decode.raw(this.unescape(A), v))),
                    t(C)({
                      type: 'definition',
                      identifier: a(_),
                      label: _,
                      title: A || null,
                      url: E,
                    }))
            }
          }
        }
      }
      function b(t) {
        return t !== v && t !== u && t !== d
      }
      function y(t) {
        return t !== u && t !== d && !n(t)
      }
      b.delimiter = v
    },
    function(t, e, i) {
      'use strict'
      var n = i(7)
      t.exports = function(t, e, i) {
        var v,
          x,
          b,
          y,
          w,
          k,
          _,
          E,
          A,
          S,
          T,
          O,
          C,
          j,
          L,
          P,
          q,
          N,
          I,
          z,
          M,
          B,
          D,
          R
        if (!this.options.gfm) return
        ;(v = 0), (N = 0), (k = e.length + 1), (_ = [])
        for (; v < k; ) {
          if (
            ((B = e.indexOf(r, v)),
            (D = e.indexOf(u, v + 1)),
            -1 === B && (B = e.length),
            -1 === D || D > B)
          ) {
            if (N < h) return
            break
          }
          _.push(e.slice(v, B)), N++, (v = B + 1)
        }
        ;(y = _.join(r)),
          (x = _.splice(1, 1)[0] || []),
          (v = 0),
          (k = x.length),
          N--,
          (b = !1),
          (T = [])
        for (; v < k; ) {
          if ((A = x.charAt(v)) === u) {
            if (((S = null), !1 === b)) {
              if (!1 === R) return
            } else T.push(b), (b = !1)
            R = !1
          } else if (A === s) (S = !0), (b = b || null)
          else if (A === l) b = b === m ? f : S && null === b ? g : m
          else if (!n(A)) return
          v++
        }
        !1 !== b && T.push(b)
        if (T.length < d) return
        if (i) return !0
        ;(q = -1),
          (z = []),
          (M = t(y).reset({type: 'table', align: T, children: z}))
        for (; ++q < N; ) {
          for (
            I = _[q],
              w = {type: 'tableRow', children: []},
              q && t(r),
              t(I).reset(w, M),
              k = I.length + 1,
              v = 0,
              E = '',
              O = '',
              C = !0,
              j = null,
              L = null;
            v < k;

          )
            if ((A = I.charAt(v)) !== a && A !== o) {
              if ('' === A || A === u)
                if (C) t(A)
                else {
                  if (A && L) {
                    ;(E += A), v++
                    continue
                  }
                  ;(!O && !A) ||
                    C ||
                    ((y = O),
                    E.length > 1 &&
                      (A
                        ? ((y += E.slice(0, E.length - 1)),
                          (E = E.charAt(E.length - 1)))
                        : ((y += E), (E = ''))),
                    (P = t.now()),
                    t(y)(
                      {type: 'tableCell', children: this.tokenizeInline(O, P)},
                      w,
                    )),
                    t(E + A),
                    (E = ''),
                    (O = '')
                }
              else if (
                (E && ((O += E), (E = '')),
                (O += A),
                A === c && v !== k - 2 && ((O += I.charAt(v + 1)), v++),
                A === p)
              ) {
                for (j = 1; I.charAt(v + 1) === A; ) (O += A), v++, j++
                L ? j >= L && (L = 0) : (L = j)
              }
              ;(C = !1), v++
            } else O ? (E += A) : t(A), v++
          q || t(r + x)
        }
        return M
      }
      var a = '\t',
        r = '\n',
        o = ' ',
        s = '-',
        l = ':',
        c = '\\',
        p = '`',
        u = '|',
        d = 1,
        h = 2,
        m = 'left',
        f = 'center',
        g = 'right'
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(35),
        r = i(47),
        o = i(48)
      t.exports = function(t, e, i) {
        var u,
          d,
          h,
          m,
          f,
          g = this.options,
          v = g.commonmark,
          x = g.gfm,
          b = this.blockTokenizers,
          y = this.interruptParagraph,
          w = e.indexOf(l),
          k = e.length
        for (; w < k; ) {
          if (-1 === w) {
            w = k
            break
          }
          if (e.charAt(w + 1) === l) break
          if (v) {
            for (m = 0, u = w + 1; u < k; ) {
              if ((h = e.charAt(u)) === s) {
                m = p
                break
              }
              if (h !== c) break
              m++, u++
            }
            if (m >= p && h !== l) {
              w = e.indexOf(l, w + 1)
              continue
            }
          }
          if (((d = e.slice(w + 1)), o(y, b, this, [t, d, !0]))) break
          if (
            b.list.call(this, t, d, !0) &&
            (this.inList || v || (x && !a(n.left(d).charAt(0))))
          )
            break
          if (
            ((u = w),
            -1 !== (w = e.indexOf(l, w + 1)) && '' === n(e.slice(u, w)))
          ) {
            w = u
            break
          }
        }
        if (((d = e.slice(0, w)), '' === n(d))) return t(d), null
        if (i) return !0
        return (
          (f = t.now()),
          (d = r(d)),
          t(d)({type: 'paragraph', children: this.tokenizeInline(d, f)})
        )
      }
      var s = '\t',
        l = '\n',
        c = ' ',
        p = 4
    },
    function(t, e, i) {
      'use strict'
      var n = i(236)
      ;(t.exports = o), (o.locator = n)
      var a = '\n',
        r = '\\'
      function o(t, e, i) {
        var n, o
        if (
          e.charAt(0) === r &&
          ((n = e.charAt(1)), -1 !== this.escape.indexOf(n))
        )
          return (
            !!i ||
            ((o = n === a ? {type: 'break'} : {type: 'text', value: n}),
            t(r + n)(o))
          )
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.indexOf('\\', e)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(45),
        r = i(86)
      ;(t.exports = d), (d.locator = r), (d.notInLink = !0)
      var o = '<',
        s = '>',
        l = '@',
        c = '/',
        p = 'mailto:',
        u = p.length
      function d(t, e, i) {
        var r,
          d,
          h,
          m,
          f,
          g = '',
          v = e.length,
          x = 0,
          b = '',
          y = !1,
          w = ''
        if (e.charAt(0) === o) {
          for (
            x++, g = o;
            x < v &&
            ((r = e.charAt(x)),
            !(
              n(r) ||
              r === s ||
              r === l ||
              (':' === r && e.charAt(x + 1) === c)
            ));

          )
            (b += r), x++
          if (b) {
            if (((w += b), (b = ''), (w += r = e.charAt(x)), x++, r === l))
              y = !0
            else {
              if (':' !== r || e.charAt(x + 1) !== c) return
              ;(w += c), x++
            }
            for (; x < v && ((r = e.charAt(x)), !n(r) && r !== s); )
              (b += r), x++
            if (((r = e.charAt(x)), b && r === s))
              return (
                !!i ||
                ((h = w += b),
                (g += w + r),
                (d = t.now()).column++,
                d.offset++,
                y &&
                  (w.slice(0, u).toLowerCase() === p
                    ? ((h = h.substr(u)), (d.column += u), (d.offset += u))
                    : (w = p + w)),
                (m = this.inlineTokenizers),
                (this.inlineTokenizers = {text: m.text}),
                (f = this.enterLink()),
                (h = this.tokenizeInline(h, d)),
                (this.inlineTokenizers = m),
                f(),
                t(g)({
                  type: 'link',
                  title: null,
                  url: a(w, {nonTerminated: !1}),
                  children: h,
                }))
              )
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(45),
        a = i(7),
        r = i(239)
      ;(t.exports = w), (w.locator = r), (w.notInLink = !0)
      var o = '"',
        s = "'",
        l = '(',
        c = ')',
        p = ',',
        u = '.',
        d = ':',
        h = ';',
        m = '<',
        f = '@',
        g = '[',
        v = ']',
        x = 'mailto:',
        b = ['http://', 'https://', x],
        y = b.length
      function w(t, e, i) {
        var r, w, k, _, E, A, S, T, O, C, j, L, P
        if (this.options.gfm) {
          for (r = '', _ = -1; ++_ < y; )
            if (((A = b[_]), (S = e.slice(0, A.length)).toLowerCase() === A)) {
              r = S
              break
            }
          if (r) {
            for (
              _ = r.length, T = e.length, O = '', C = 0;
              _ < T &&
              ((k = e.charAt(_)), !a(k) && k !== m) &&
              ((k !== u &&
                k !== p &&
                k !== d &&
                k !== h &&
                k !== o &&
                k !== s &&
                k !== c &&
                k !== v) ||
                ((j = e.charAt(_ + 1)) && !a(j))) &&
              ((k !== l && k !== g) || C++, (k !== c && k !== v) || !(--C < 0));

            )
              (O += k), _++
            if (O) {
              if (((w = r += O), A === x)) {
                if (-1 === (E = O.indexOf(f)) || E === T - 1) return
                w = w.substr(x.length)
              }
              return (
                !!i ||
                ((P = this.enterLink()),
                (L = this.inlineTokenizers),
                (this.inlineTokenizers = {text: L.text}),
                (w = this.tokenizeInline(w, t.now())),
                (this.inlineTokenizers = L),
                P(),
                t(r)({
                  type: 'link',
                  title: null,
                  url: n(r, {nonTerminated: !1}),
                  children: w,
                }))
              )
            }
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          a = n.length,
          r = -1,
          o = -1
        if (!this.options.gfm) return -1
        for (; ++r < a; )
          -1 !== (i = t.indexOf(n[r], e)) && (i < o || -1 === o) && (o = i)
        return o
      }
      var n = ['https://', 'http://', 'mailto:']
    },
    function(t, e, i) {
      'use strict'
      var n = i(81),
        a = i(86),
        r = i(85).tag
      ;(t.exports = d), (d.locator = a)
      var o = '<',
        s = '?',
        l = '!',
        c = '/',
        p = /^<a /i,
        u = /^<\/a>/i
      function d(t, e, i) {
        var a,
          d,
          h = e.length
        if (
          !(e.charAt(0) !== o || h < 3) &&
          ((a = e.charAt(1)),
          (n(a) || a === s || a === l || a === c) && (d = e.match(r)))
        )
          return (
            !!i ||
            ((d = d[0]),
            !this.inLink && p.test(d)
              ? (this.inLink = !0)
              : this.inLink && u.test(d) && (this.inLink = !1),
            t(d)({type: 'html', value: d}))
          )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(87)
      ;(t.exports = v), (v.locator = a)
      var r = '\n',
        o = '!',
        s = '"',
        l = "'",
        c = '(',
        p = ')',
        u = '<',
        d = '>',
        h = '[',
        m = '\\',
        f = ']',
        g = '`'
      function v(t, e, i) {
        var a,
          v,
          x,
          b,
          y,
          w,
          k,
          _,
          E,
          A,
          S,
          T,
          O,
          C,
          j,
          L,
          P,
          q,
          N = '',
          I = 0,
          z = e.charAt(0),
          M = this.options.pedantic,
          B = this.options.commonmark,
          D = this.options.gfm
        if (
          (z === o && ((_ = !0), (N = z), (z = e.charAt(++I))),
          z === h && (_ || !this.inLink))
        ) {
          for (
            N += z,
              C = '',
              I++,
              S = e.length,
              O = 0,
              (L = t.now()).column += I,
              L.offset += I;
            I < S;

          ) {
            if (((w = z = e.charAt(I)), z === g)) {
              for (v = 1; e.charAt(I + 1) === g; ) (w += z), I++, v++
              x ? v >= x && (x = 0) : (x = v)
            } else if (z === m) I++, (w += e.charAt(I))
            else if ((x && !D) || z !== h) {
              if ((!x || D) && z === f) {
                if (!O) {
                  if (!M)
                    for (; I < S && ((z = e.charAt(I + 1)), n(z)); )
                      (w += z), I++
                  if (e.charAt(I + 1) !== c) return
                  ;(w += c), (a = !0), I++
                  break
                }
                O--
              }
            } else O++
            ;(C += w), (w = ''), I++
          }
          if (a) {
            for (E = C, N += C + w, I++; I < S && ((z = e.charAt(I)), n(z)); )
              (N += z), I++
            if (((C = ''), (b = N), (z = e.charAt(I)) === u)) {
              for (I++, b += u; I < S && (z = e.charAt(I)) !== d; ) {
                if (B && z === r) return
                ;(C += z), I++
              }
              if (e.charAt(I) !== d) return
              ;(N += u + C + d), (j = C), I++
            } else {
              for (
                z = null, w = '';
                I < S &&
                ((z = e.charAt(I)),
                !w || !(z === s || z === l || (B && z === c)));

              ) {
                if (n(z)) {
                  if (!M) break
                  w += z
                } else {
                  if (z === c) O++
                  else if (z === p) {
                    if (0 === O) break
                    O--
                  }
                  ;(C += w),
                    (w = ''),
                    z === m && ((C += m), (z = e.charAt(++I))),
                    (C += z)
                }
                I++
              }
              ;(j = C), (I = (N += C).length)
            }
            for (C = ''; I < S && ((z = e.charAt(I)), n(z)); ) (C += z), I++
            if (
              ((z = e.charAt(I)),
              (N += C),
              C && (z === s || z === l || (B && z === c)))
            )
              if ((I++, (C = ''), (A = z === c ? p : z), (y = N += z), B)) {
                for (; I < S && (z = e.charAt(I)) !== A; )
                  z === m && ((C += m), (z = e.charAt(++I))), I++, (C += z)
                if ((z = e.charAt(I)) !== A) return
                for (
                  T = C, N += C + z, I++;
                  I < S && ((z = e.charAt(I)), n(z));

                )
                  (N += z), I++
              } else
                for (w = ''; I < S; ) {
                  if ((z = e.charAt(I)) === A)
                    k && ((C += A + w), (w = '')), (k = !0)
                  else if (k) {
                    if (z === p) {
                      ;(N += C + A + w), (T = C)
                      break
                    }
                    n(z) ? (w += z) : ((C += A + w + z), (w = ''), (k = !1))
                  } else C += z
                  I++
                }
            if (e.charAt(I) === p)
              return (
                !!i ||
                ((N += p),
                (j = this.decode.raw(this.unescape(j), t(b).test().end, {
                  nonTerminated: !1,
                })),
                T &&
                  ((y = t(y).test().end),
                  (T = this.decode.raw(this.unescape(T), y))),
                (q = {type: _ ? 'image' : 'link', title: T || null, url: j}),
                _
                  ? (q.alt = this.decode.raw(this.unescape(E), L) || null)
                  : ((P = this.enterLink()),
                    (q.children = this.tokenizeInline(E, L)),
                    P()),
                t(N)(q))
              )
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(87),
        r = i(49)
      ;(t.exports = x), (x.locator = a)
      var o = 'link',
        s = 'image',
        l = 'footnote',
        c = 'shortcut',
        p = 'collapsed',
        u = 'full',
        d = ' ',
        h = '!',
        m = '[',
        f = '\\',
        g = ']',
        v = '^'
      function x(t, e, i) {
        var a,
          x,
          b,
          y,
          w,
          k,
          _,
          E,
          A = this.options.commonmark,
          S = e.charAt(0),
          T = 0,
          O = e.length,
          C = '',
          j = '',
          L = o,
          P = c
        if ((S === h && ((L = s), (j = S), (S = e.charAt(++T))), S === m)) {
          if (
            (T++,
            (j += S),
            (k = ''),
            this.options.footnotes && e.charAt(T) === v)
          ) {
            if (L === s) return
            ;(j += v), T++, (L = l)
          }
          for (E = 0; T < O; ) {
            if ((S = e.charAt(T)) === m) (_ = !0), E++
            else if (S === g) {
              if (!E) break
              E--
            }
            S === f && ((k += f), (S = e.charAt(++T))), (k += S), T++
          }
          if (((C = k), (a = k), (S = e.charAt(T)) === g)) {
            if ((T++, (C += S), (k = ''), !A))
              for (; T < O && ((S = e.charAt(T)), n(S)); ) (k += S), T++
            if (((S = e.charAt(T)), L !== l && S === m)) {
              for (
                x = '', k += S, T++;
                T < O && (S = e.charAt(T)) !== m && S !== g;

              )
                S === f && ((x += f), (S = e.charAt(++T))), (x += S), T++
              ;(S = e.charAt(T)) === g
                ? ((P = x ? u : p), (k += x + S), T++)
                : (x = ''),
                (C += k),
                (k = '')
            } else {
              if (!a) return
              x = a
            }
            if (P === u || !_)
              return (
                (C = j + C),
                L === o && this.inLink
                  ? null
                  : !!i ||
                    (L === l && -1 !== a.indexOf(d)
                      ? t(C)({
                          type: l,
                          children: this.tokenizeInline(a, t.now()),
                        })
                      : (((b = t.now()).column += j.length),
                        (b.offset += j.length),
                        (y = {
                          type: L + 'Reference',
                          identifier: r((x = P === u ? x : a)),
                          label: x,
                        }),
                        (L !== o && L !== s) || (y.referenceType = P),
                        L === o
                          ? ((w = this.enterLink()),
                            (y.children = this.tokenizeInline(a, b)),
                            w())
                          : L === s &&
                            (y.alt =
                              this.decode.raw(this.unescape(a), b) || null),
                        t(C)(y)))
              )
          }
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(7),
        r = i(244)
      ;(t.exports = c), (c.locator = r)
      var o = '\\',
        s = '*',
        l = '_'
      function c(t, e, i) {
        var r,
          c,
          p,
          u,
          d,
          h,
          m,
          f = 0,
          g = e.charAt(f)
        if (
          !(
            (g !== s && g !== l) ||
            e.charAt(++f) !== g ||
            ((c = this.options.pedantic),
            (d = (p = g) + p),
            (h = e.length),
            f++,
            (u = ''),
            (g = ''),
            c && a(e.charAt(f)))
          )
        )
          for (; f < h; ) {
            if (
              ((m = g),
              !(
                (g = e.charAt(f)) !== p ||
                e.charAt(f + 1) !== p ||
                (c && a(m))
              ) && (g = e.charAt(f + 2)) !== p)
            ) {
              if (!n(u)) return
              return (
                !!i ||
                (((r = t.now()).column += 2),
                (r.offset += 2),
                t(d + u + d)({
                  type: 'strong',
                  children: this.tokenizeInline(u, r),
                }))
              )
            }
            c || g !== o || ((u += g), (g = e.charAt(++f))), (u += g), f++
          }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = t.indexOf('**', e),
          n = t.indexOf('__', e)
        if (-1 === n) return i
        if (-1 === i) return n
        return n < i ? n : i
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(10),
        a = i(246),
        r = i(7),
        o = i(247)
      ;(t.exports = p), (p.locator = o)
      var s = '*',
        l = '_',
        c = '\\'
      function p(t, e, i) {
        var o,
          p,
          u,
          d,
          h,
          m,
          f,
          g = 0,
          v = e.charAt(g)
        if (
          !(
            (v !== s && v !== l) ||
            ((p = this.options.pedantic),
            (h = v),
            (u = v),
            (m = e.length),
            g++,
            (d = ''),
            (v = ''),
            p && r(e.charAt(g)))
          )
        )
          for (; g < m; ) {
            if (((f = v), !((v = e.charAt(g)) !== u || (p && r(f))))) {
              if ((v = e.charAt(++g)) !== u) {
                if (!n(d) || f === u) return
                if (!p && u === l && a(v)) {
                  d += u
                  continue
                }
                return (
                  !!i ||
                  ((o = t.now()).column++,
                  o.offset++,
                  t(h + d + u)({
                    type: 'emphasis',
                    children: this.tokenizeInline(d, o),
                  }))
                )
              }
              d += u
            }
            p || v !== c || ((d += v), (v = e.charAt(++g))), (d += v), g++
          }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return a.test('number' == typeof t ? n(t) : t.charAt(0))
      }
      var n = String.fromCharCode,
        a = /\w/
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = t.indexOf('*', e),
          n = t.indexOf('_', e)
        if (-1 === n) return i
        if (-1 === i) return n
        return n < i ? n : i
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(249)
      ;(t.exports = s), (s.locator = a)
      var r = '~',
        o = '~~'
      function s(t, e, i) {
        var a,
          s,
          l,
          c = '',
          p = '',
          u = '',
          d = ''
        if (
          this.options.gfm &&
          e.charAt(0) === r &&
          e.charAt(1) === r &&
          !n(e.charAt(2))
        )
          for (
            a = 1, s = e.length, (l = t.now()).column += 2, l.offset += 2;
            ++a < s;

          ) {
            if (!((c = e.charAt(a)) !== r || p !== r || (u && n(u))))
              return (
                !!i ||
                t(o + d + o)({
                  type: 'delete',
                  children: this.tokenizeInline(d, l),
                })
              )
            ;(d += p), (u = p), (p = c)
          }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.indexOf('~~', e)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(7),
        a = i(251)
      ;(t.exports = o), (o.locator = a)
      var r = '`'
      function o(t, e, i) {
        for (
          var a, o, s, l, c, p, u, d, h = e.length, m = 0, f = '', g = '';
          m < h && e.charAt(m) === r;

        )
          (f += r), m++
        if (f) {
          for (c = f, l = m, f = '', d = e.charAt(m), s = 0; m < h; ) {
            if (
              ((p = d),
              (d = e.charAt(m + 1)),
              p === r ? (s++, (g += p)) : ((s = 0), (f += p)),
              s && d !== r)
            ) {
              if (s === l) {
                ;(c += f + g), (u = !0)
                break
              }
              ;(f += g), (g = '')
            }
            m++
          }
          if (!u) {
            if (l % 2 != 0) return
            f = ''
          }
          if (i) return !0
          for (a = '', o = '', h = f.length, m = -1; ++m < h; )
            (p = f.charAt(m)),
              n(p) ? (o += p) : (o && (a && (a += o), (o = '')), (a += p))
          return t(c)({type: 'inlineCode', value: a})
        }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.indexOf('`', e)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(253)
      ;(t.exports = s), (s.locator = n)
      var a = ' ',
        r = '\n',
        o = 2
      function s(t, e, i) {
        for (var n, s = e.length, l = -1, c = ''; ++l < s; ) {
          if ((n = e.charAt(l)) === r) {
            if (l < o) return
            return !!i || t((c += n))({type: 'break'})
          }
          if (n !== a) return
          c += n
        }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = t.indexOf('\n', e)
        for (; i > e && ' ' === t.charAt(i - 1); ) i--
        return i
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var n, a, r, o, s, l, c, p, u, d
        if (i) return !0
        ;(n = this.inlineMethods),
          (o = n.length),
          (a = this.inlineTokenizers),
          (r = -1),
          (u = e.length)
        for (; ++r < o; )
          'text' !== (p = n[r]) &&
            a[p] &&
            ((c = a[p].locator) || t.file.fail('Missing locator: `' + p + '`'),
            -1 !== (l = c.call(this, e, 1)) && l < u && (u = l))
        ;(s = e.slice(0, u)),
          (d = t.now()),
          this.decode(s, d, function(e, i, n) {
            t(n || e)({type: 'text', value: e})
          })
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(256)
      t.exports = function(t, e) {
        t && !t.process && ((e = t), (t = null))
        return t
          ? (function(t, e) {
              return function(i, a, r) {
                t.run(n(i, e), a, function(t) {
                  r(t)
                })
              }
            })(t, e)
          : (function(t) {
              return function(e) {
                return n(e, t)
              }
            })(e)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = i(257)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = (function(t, e) {
            var i = e || {},
              a = i.allowDangerousHTML
            return (
              (p.dangerous = a),
              (p.definition = l(t, i)),
              (p.footnotes = []),
              (p.augment = c),
              (p.handlers = n(u, i.handlers || {})),
              r(t, 'footnoteDefinition', function(t) {
                p.footnotes.push(t)
              }),
              p
            )
            function c(t, e) {
              var i, a
              return (
                t &&
                  'data' in t &&
                  ((i = t.data),
                  'element' === e.type && i.hName && (e.tagName = i.hName),
                  'element' === e.type &&
                    i.hProperties &&
                    (e.properties = n(e.properties, i.hProperties)),
                  e.children && i.hChildren && (e.children = i.hChildren)),
                (a = t && t.position ? t : {position: t}),
                s(a) || (e.position = {start: o.start(a), end: o.end(a)}),
                e
              )
            }
            function p(t, e, i, n) {
              return (
                null == n &&
                  'object' == typeof i &&
                  'length' in i &&
                  ((n = i), (i = {})),
                c(t, {
                  type: 'element',
                  tagName: e,
                  properties: i || {},
                  children: n || [],
                })
              )
            }
          })(t, e),
          d = c(i, t),
          h = p(i)
        d &&
          d.children &&
          h &&
          (d.children = d.children.concat(a('text', '\n'), h))
        return d
      }
      var n = i(6),
        a = i(4),
        r = i(46),
        o = i(88),
        s = i(259),
        l = i(260),
        c = i(89),
        p = i(261),
        u = i(262)
    },
    function(t, e, i) {
      'use strict'
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var n =
          Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        r = Object.prototype.propertyIsEnumerable
      t.exports = (function() {
        try {
          if (!Object.assign) return !1
          var t = new String('abc')
          if (((t[5] = 'de'), '5' === Object.getOwnPropertyNames(t)[0]))
            return !1
          for (var e = {}, i = 0; i < 10; i++)
            e['_' + String.fromCharCode(i)] = i
          if (
            '0123456789' !==
            Object.getOwnPropertyNames(e)
              .map(function(t) {
                return e[t]
              })
              .join('')
          )
            return !1
          var n = {}
          return (
            'abcdefghijklmnopqrst'.split('').forEach(function(t) {
              n[t] = t
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, n)).join('')
          )
        } catch (t) {
          return !1
        }
      })()
        ? Object.assign
        : function(t, e) {
            for (
              var i,
                o,
                s = (function(t) {
                  if (null == t)
                    throw new TypeError(
                      'Object.assign cannot be called with null or undefined',
                    )
                  return Object(t)
                })(t),
                l = 1;
              l < arguments.length;
              l++
            ) {
              for (var c in (i = Object(arguments[l])))
                a.call(i, c) && (s[c] = i[c])
              if (n) {
                o = n(i)
                for (var p = 0; p < o.length; p++)
                  r.call(i, o[p]) && (s[o[p]] = i[o[p]])
              }
            }
            return s
          }
    },
    function(t, e, i) {
      'use strict'
      function n(t) {
        return t && 'object' == typeof t ? t : {}
      }
      t.exports = function(t) {
        var e = n(n(t).position),
          i = n(e.start),
          a = n(e.end)
        return !(i.line && i.column && a.line && a.column)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(46)
      t.exports = function(t, e) {
        return (function(t) {
          return function(e) {
            var i = e && r(e)
            return i && a.call(t, i) ? t[i] : null
          }
        })(
          (function(t, e) {
            var i = {}
            if (!t || !t.type)
              throw new Error('mdast-util-definitions expected node')
            return (
              n(
                t,
                'definition',
                e && e.commonmark
                  ? function(t) {
                      var e = r(t.identifier)
                      a.call(i, e) || (i[e] = t)
                    }
                  : function(t) {
                      i[r(t.identifier)] = t
                    },
              ),
              i
            )
          })(t, e),
        )
      }
      var a = {}.hasOwnProperty
      function r(t) {
        return t.toUpperCase()
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        var e,
          i,
          o,
          s,
          l = t.footnotes,
          c = l.length,
          p = -1,
          u = []
        if (!c) return null
        for (; ++p < c; )
          (e = l[p]),
            (o = e.children.concat()),
            (s = o[o.length - 1]),
            (i = {
              type: 'link',
              url: '#fnref-' + e.identifier,
              data: {hProperties: {className: ['footnote-backref']}},
              children: [{type: 'text', value: '↩'}],
            }),
            (s && 'paragraph' === s.type) ||
              ((s = {type: 'paragraph', children: []}), o.push(s)),
            s.children.push(i),
            (u[p] = {
              type: 'listItem',
              data: {hProperties: {id: 'fn-' + e.identifier}},
              children: o,
              position: e.position,
            })
        return t(
          null,
          'div',
          {className: ['footnotes']},
          r([n(t), a(t, {type: 'list', ordered: !0, children: u})], !0),
        )
      }
      var n = i(90),
        a = i(91),
        r = i(17)
    },
    function(t, e, i) {
      'use strict'
      function n() {
        return null
      }
      t.exports = {
        blockquote: i(263),
        break: i(264),
        code: i(265),
        delete: i(267),
        emphasis: i(268),
        footnoteReference: i(92),
        footnote: i(269),
        heading: i(270),
        html: i(271),
        imageReference: i(272),
        image: i(273),
        inlineCode: i(274),
        linkReference: i(275),
        link: i(276),
        listItem: i(277),
        list: i(91),
        paragraph: i(278),
        root: i(279),
        strong: i(280),
        table: i(281),
        text: i(282),
        thematicBreak: i(90),
        toml: n,
        yaml: n,
        definition: n,
        footnoteDefinition: n,
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'blockquote', n(a(t, e), !0))
      }
      var n = i(17),
        a = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return [t(e, 'br'), n('text', '\n')]
      }
      var n = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = e.value ? n(e.value + '\n') : '',
          r = e.lang && e.lang.match(/^[^ \t]+(?=[ \t]|$)/),
          o = {}
        r && (o.className = ['language-' + r])
        return t(e.position, 'pre', [t(e, 'code', o, [a('text', i)])])
      }
      var n = i(266),
        a = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          s,
          l = 'string' == typeof t,
          c = l && t.length,
          p = 0,
          u = -1,
          d = -1,
          h = e || 4,
          m = []
        if (!l) throw new Error('detab expected string')
        for (; ++u < c; )
          (i = t.charCodeAt(u)) === a
            ? ((d += s = h - ((d + 1) % h)),
              m.push(t.slice(p, u) + n(' ', s)),
              (p = u + 1))
            : i === r || i === o
            ? (d = -1)
            : d++
        return m.push(t.slice(p)), m.join('')
      }
      var n = i(23),
        a = 9,
        r = 10,
        o = 13
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'del', n(t, e))
      }
      var n = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'em', n(t, e))
      }
      var n = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i = [],
          a = 1,
          r = t.footnotes,
          o = r.length,
          s = -1
        for (; ++s < o; ) i[s] = r[s].identifier
        for (; -1 !== i.indexOf(String(a)); ) a++
        return (
          (a = String(a)),
          r.push({
            type: 'footnoteDefinition',
            identifier: a,
            children: [{type: 'paragraph', children: e.children}],
            position: e.position,
          }),
          n(t, {type: 'footnoteReference', identifier: a, position: e.position})
        )
      }
      var n = i(92)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'h' + e.depth, n(t, e))
      }
      var n = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.dangerous ? t.augment(e, n('raw', e.value)) : null
      }
      var n = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          r = t.definition(e.identifier)
        if (!r) return a(t, e)
        ;(i = {src: n(r.url || ''), alt: e.alt}),
          null !== r.title && void 0 !== r.title && (i.title = r.title)
        return t(e, 'img', i)
      }
      var n = i(36),
        a = i(93)
    },
    function(t, e, i) {
      'use strict'
      var n = i(36)
      t.exports = function(t, e) {
        var i = {src: n(e.url), alt: e.alt}
        null !== e.title && void 0 !== e.title && (i.title = e.title)
        return t(e, 'img', i)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'code', [a('text', n(e.value))])
      }
      var n = i(50),
        a = i(4)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          o = t.definition(e.identifier)
        if (!o) return a(t, e)
        ;(i = {href: n(o.url || '')}),
          null !== o.title && void 0 !== o.title && (i.title = o.title)
        return t(e, 'a', i, r(t, e))
      }
      var n = i(36),
        a = i(93),
        r = i(2)
    },
    function(t, e, i) {
      'use strict'
      var n = i(36),
        a = i(2)
      t.exports = function(t, e) {
        var i = {href: n(e.url)}
        null !== e.title && void 0 !== e.title && (i.title = e.title)
        return t(e, 'a', i, a(t, e))
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var s,
          l,
          c,
          p,
          u,
          d = e.children[0],
          h = r(t, e),
          m = i
            ? (function(t) {
                var e = t.spread,
                  i = t.children,
                  n = i.length,
                  a = -1
                for (; !e && ++a < n; ) e = o(i[a])
                return e
              })(i)
            : o(e),
          f = {}
        if (m) s = h
        else
          for (s = [], p = h.length, c = -1; ++c < p; )
            'p' === (u = h[c]).tagName ? (s = s.concat(u.children)) : s.push(u)
        'boolean' == typeof e.checked &&
          (!m || (d && 'paragraph' === d.type) || s.unshift(t(null, 'p', [])),
          0 !== (l = m ? s[0].children : s).length && l.unshift(n('text', ' ')),
          l.unshift(
            t(null, 'input', {
              type: 'checkbox',
              checked: e.checked,
              disabled: !0,
            }),
          ),
          (f.className = ['task-list-item']))
        m && 0 !== s.length && (s = a(s, !0))
        return t(e, 'li', f, s)
      }
      var n = i(4),
        a = i(17),
        r = i(2)
      function o(t) {
        var e = t.spread
        return null == e ? t.children.length > 1 : e
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'p', n(t, e))
      }
      var n = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.augment(e, n('root', a(r(t, e))))
      }
      var n = i(4),
        a = i(17),
        r = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t(e, 'strong', n(t, e))
      }
      var n = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          o,
          s,
          l,
          c,
          p = e.children,
          u = p.length,
          d = e.align,
          h = d.length,
          m = []
        for (; u--; ) {
          for (
            o = p[u].children, l = 0 === u ? 'th' : 'td', i = h, s = [];
            i--;

          )
            (c = o[i]), (s[i] = t(c, l, {align: d[i]}, c ? r(t, c) : []))
          m[u] = t(p[u], 'tr', a(s, !0))
        }
        return t(
          e,
          'table',
          a(
            [
              t(m[0].position, 'thead', a([m[0]], !0)),
              t(
                {start: n.start(m[1]), end: n.end(m[m.length - 1])},
                'tbody',
                a(m.slice(1), !0),
              ),
            ],
            !0,
          ),
        )
      }
      var n = i(88),
        a = i(17),
        r = i(2)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t.augment(e, n('text', a(e.value)))
      }
      var n = i(4),
        a = i(283)
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t) {
        return String(t).replace(n, a)
      }
      var n = /[ \t]*\n+[ \t]*/g,
        a = '\n'
    },
    function(t, e, i) {
      'use strict'
      var n = i(4),
        a = i(285),
        r = i(298)
      function o() {
        return n('text', '\n')
      }
      function s(t) {
        return null == t ? [] : 'string' != typeof t && 'length' in t ? t : [t]
      }
      t.exports = function(t) {
        var e = t || {},
          i = s(e.meta),
          l = s(e.link),
          c = s(e.css),
          p = s(e.js)
        !1 !== e.responsive &&
          i.unshift({
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          })
        return function(t, s) {
          var u,
            d,
            h = e.title || s.stem,
            m = t.children.concat(),
            f = [o(), a('meta', {charset: 'utf-8'})]
          0 !== m.length && m.unshift(o())
          h && f.push(o(), a('title', [h]))
          ;(u = i.length), (d = -1)
          for (; ++d < u; ) f.push(o(), a('meta', i[d]))
          ;(u = l.length), (d = -1)
          for (; ++d < u; ) f.push(o(), a('link', l[d]))
          ;(u = c.length), (d = -1)
          for (; ++d < u; )
            f.push(o(), a('link', {rel: 'stylesheet', href: c[d]}))
          f.push(o()), (u = p.length), (d = -1)
          for (; ++d < u; ) m.push(o(), a('script', {src: p[d]}))
          return (
            m.push(o()),
            n('root', [
              n('doctype', {name: r(e.doctype || 5)}),
              o(),
              a('html', {lang: e.language || 'en'}, [
                o(),
                a('head', f),
                o(),
                a('body', m),
                o(),
              ]),
              o(),
            ])
          )
        }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = i(286)
    },
    function(t, e, i) {
      'use strict'
      var n = i(287),
        a = i(295)(n, 'div')
      ;(a.displayName = 'html'), (t.exports = a)
    },
    function(t, e, i) {
      'use strict'
      var n = i(288),
        a = i(289),
        r = i(290),
        o = i(291),
        s = i(293),
        l = i(294)
      t.exports = n([r, a, o, s, l])
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(94)
      t.exports = function(t) {
        var e,
          i,
          r = t.length,
          o = [],
          s = [],
          l = -1
        for (; ++l < r; )
          (e = t[l]), o.push(e.property), s.push(e.normal), (i = e.space)
        return new a(n.apply(null, o), n.apply(null, s), i)
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(24)
      t.exports = n({
        space: 'xlink',
        transform: function(t, e) {
          return 'xlink:' + e.slice(5).toLowerCase()
        },
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(24)
      t.exports = n({
        space: 'xml',
        transform: function(t, e) {
          return 'xml:' + e.slice(3).toLowerCase()
        },
        properties: {xmlLang: null, xmlBase: null, xmlSpace: null},
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(24),
        a = i(97)
      t.exports = n({
        space: 'xmlns',
        attributes: {xmlnsxlink: 'xmlns:xlink'},
        transform: a,
        properties: {xmlns: null, xmlnsXLink: null},
      })
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return e in t ? t[e] : e
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(52),
        a = i(24),
        r = n.booleanish,
        o = n.number,
        s = n.spaceSeparated
      t.exports = a({
        transform: function(t, e) {
          return 'role' === e ? e : 'aria-' + e.slice(4).toLowerCase()
        },
        properties: {
          ariaActiveDescendant: null,
          ariaAtomic: r,
          ariaAutoComplete: null,
          ariaBusy: r,
          ariaChecked: r,
          ariaColCount: o,
          ariaColIndex: o,
          ariaColSpan: o,
          ariaControls: s,
          ariaCurrent: null,
          ariaDescribedBy: s,
          ariaDetails: null,
          ariaDisabled: r,
          ariaDropEffect: s,
          ariaErrorMessage: null,
          ariaExpanded: r,
          ariaFlowTo: s,
          ariaGrabbed: r,
          ariaHasPopup: null,
          ariaHidden: r,
          ariaInvalid: null,
          ariaKeyShortcuts: null,
          ariaLabel: null,
          ariaLabelledBy: s,
          ariaLevel: o,
          ariaLive: null,
          ariaModal: r,
          ariaMultiLine: r,
          ariaMultiSelectable: r,
          ariaOrientation: null,
          ariaOwns: s,
          ariaPlaceholder: null,
          ariaPosInSet: o,
          ariaPressed: r,
          ariaReadOnly: r,
          ariaRelevant: null,
          ariaRequired: r,
          ariaRoleDescription: s,
          ariaRowCount: o,
          ariaRowIndex: o,
          ariaRowSpan: o,
          ariaSelected: r,
          ariaSetSize: o,
          ariaSort: null,
          ariaValueMax: o,
          ariaValueMin: o,
          ariaValueNow: o,
          ariaValueText: null,
          role: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(52),
        a = i(24),
        r = i(97),
        o = n.boolean,
        s = n.overloadedBoolean,
        l = n.booleanish,
        c = n.number,
        p = n.spaceSeparated,
        u = n.commaSeparated
      t.exports = a({
        space: 'html',
        attributes: {
          acceptcharset: 'accept-charset',
          classname: 'class',
          htmlfor: 'for',
          httpequiv: 'http-equiv',
        },
        transform: r,
        mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
        properties: {
          abbr: null,
          accept: u,
          acceptCharset: p,
          accessKey: p,
          action: null,
          allowFullScreen: o,
          allowPaymentRequest: o,
          allowUserMedia: o,
          alt: null,
          as: null,
          async: o,
          autoCapitalize: null,
          autoComplete: p,
          autoFocus: o,
          autoPlay: o,
          capture: o,
          charSet: null,
          checked: o,
          cite: null,
          className: p,
          cols: c,
          colSpan: null,
          content: null,
          contentEditable: l,
          controls: o,
          controlsList: p,
          coords: c | u,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: o,
          defer: o,
          dir: null,
          dirName: null,
          disabled: o,
          download: s,
          draggable: l,
          encType: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: o,
          formTarget: null,
          headers: p,
          height: c,
          hidden: o,
          high: c,
          href: null,
          hrefLang: null,
          htmlFor: p,
          httpEquiv: p,
          id: null,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: o,
          itemId: null,
          itemProp: p,
          itemRef: p,
          itemScope: o,
          itemType: p,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loop: o,
          low: c,
          manifest: null,
          max: null,
          maxLength: c,
          media: null,
          method: null,
          min: null,
          minLength: c,
          multiple: o,
          muted: o,
          name: null,
          nonce: null,
          noModule: o,
          noValidate: o,
          open: o,
          optimum: c,
          pattern: null,
          ping: p,
          placeholder: null,
          playsInline: o,
          poster: null,
          preload: null,
          readOnly: o,
          referrerPolicy: null,
          rel: p,
          required: o,
          reversed: o,
          rows: c,
          rowSpan: c,
          sandbox: p,
          scope: null,
          scoped: o,
          seamless: o,
          selected: o,
          shape: null,
          size: c,
          sizes: null,
          slot: null,
          span: c,
          spellCheck: l,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: u,
          start: c,
          step: null,
          style: null,
          tabIndex: c,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: o,
          useMap: null,
          value: l,
          width: c,
          wrap: null,
          align: null,
          aLink: null,
          archive: p,
          axis: null,
          background: null,
          bgColor: null,
          border: c,
          borderColor: null,
          bottomMargin: c,
          cellPadding: null,
          cellSpacing: null,
          char: null,
          charOff: null,
          classId: null,
          clear: null,
          code: null,
          codeBase: null,
          codeType: null,
          color: null,
          compact: o,
          declare: o,
          event: null,
          face: null,
          frame: null,
          frameBorder: null,
          hSpace: c,
          leftMargin: c,
          link: null,
          longDesc: null,
          lowSrc: null,
          marginHeight: c,
          marginWidth: c,
          noResize: o,
          noHref: o,
          noShade: o,
          noWrap: o,
          object: null,
          profile: null,
          prompt: null,
          rev: null,
          rightMargin: c,
          rules: null,
          scheme: null,
          scrolling: l,
          standby: null,
          summary: null,
          text: null,
          topMargin: c,
          valueType: null,
          version: null,
          vAlign: null,
          vLink: null,
          vSpace: c,
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          prefix: null,
          property: null,
          results: c,
          security: null,
          unselectable: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(296),
        a = i(51),
        r = i(297),
        o = i(98).parse,
        s = i(99).parse
      function l(t, e, i) {
        var n = i
        return (
          t.number || t.positiveNumber
            ? isNaN(n) || '' === n || (n = Number(n))
            : (t.boolean || t.overloadedBoolean) &&
              ('string' != typeof n || ('' !== n && a(i) !== a(e)) || (n = !0)),
          n
        )
      }
      t.exports = function(t, e) {
        return function(t, n) {
          var a,
            o = r(t, e),
            s = Array.prototype.slice.call(arguments, 2)
          n &&
            (function(t, e) {
              return (
                'string' == typeof t ||
                'length' in t ||
                (function(t, e) {
                  var i = e.type
                  if ('input' === t || !i || 'string' != typeof i) return !1
                  if ('object' == typeof e.children && 'length' in e.children)
                    return !0
                  if (((i = i.toLowerCase()), 'button' === t))
                    return (
                      'menu' !== i &&
                      'submit' !== i &&
                      'reset' !== i &&
                      'button' !== i
                    )
                  return 'value' in e
                })(e.tagName, t)
              )
            })(n, o) &&
            (s.unshift(n), (n = null))
          if (n) for (a in n) i(o.properties, a, n[a])
          ;(function t(e, i) {
            var n, a
            if ('string' != typeof i && 'number' != typeof i)
              if ('object' == typeof i && 'length' in i)
                for (n = -1, a = i.length; ++n < a; ) t(e, i[n])
              else {
                if ('object' != typeof i || !('type' in i))
                  throw new Error(
                    'Expected node, nodes, or string, got `' + i + '`',
                  )
                e.push(i)
              }
            else e.push({type: 'text', value: String(i)})
          })(o.children, s),
            'template' === o.tagName &&
              ((o.content = {type: 'root', children: o.children}),
              (o.children = []))
          return o
        }
        function i(e, i, a) {
          var r, c, p
          null != a &&
            a == a &&
            ((r = n(t, i)),
            (c = r.property),
            'string' == typeof (p = a) &&
              (r.spaceSeparated
                ? (p = o(p))
                : r.commaSeparated
                ? (p = s(p))
                : r.commaOrSpaceSeparated && (p = o(s(p).join(' ')))),
            'style' === c &&
              'string' != typeof a &&
              (p = (function(t) {
                var e,
                  i = []
                for (e in t) i.push([e, t[e]].join(': '))
                return i.join('; ')
              })(p)),
            'className' === c && e.className && (p = e.className.concat(p)),
            (e[c] = (function(t, e, i) {
              var n, a, r
              if ('object' != typeof i || !('length' in i)) return l(t, e, i)
              ;(a = i.length), (n = -1), (r = [])
              for (; ++n < a; ) r[n] = l(t, e, i[n])
              return r
            })(r, c, p)))
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(51),
        a = i(95),
        r = i(96),
        o = 'data'
      t.exports = function(t, e) {
        var i = n(e),
          d = e,
          h = r
        if (i in t.normal) return t.property[t.normal[i]]
        i.length > 4 &&
          i.slice(0, 4) === o &&
          s.test(e) &&
          ('-' === e.charAt(4)
            ? (d = (function(t) {
                var e = t.slice(5).replace(l, u)
                return o + e.charAt(0).toUpperCase() + e.slice(1)
              })(e))
            : (e = (function(t) {
                var e = t.slice(4)
                if (l.test(e)) return t
                '-' !== (e = e.replace(c, p)).charAt(0) && (e = '-' + e)
                return o + e
              })(e)),
          (h = a))
        return new h(d, e)
      }
      var s = /^data[-a-z0-9.:_]+$/i,
        l = /-[a-z]/g,
        c = /[A-Z]/g
      function p(t) {
        return '-' + t.toLowerCase()
      }
      function u(t) {
        return t.charAt(1).toUpperCase()
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          r,
          o,
          s,
          l,
          c = t || '',
          p = e || 'div',
          u = {},
          d = -1,
          h = c.length
        for (; ++d <= h; )
          ((o = c.charCodeAt(d)) && o !== n && o !== a) ||
            ((s = c.slice(l, d)) &&
              (r === n
                ? i
                  ? i.push(s)
                  : ((i = [s]), (u.className = i))
                : r === a
                ? (u.id = s)
                : (p = s)),
            (l = d + 1),
            (r = o))
        return {type: 'element', tagName: p, properties: u, children: []}
      }
      var n = '.'.charCodeAt(0),
        a = '#'.charCodeAt(0)
    },
    function(t, e, i) {
      'use strict'
      var n = i(299)
      ;(t.exports = r), (r.all = n)
      var a = (function() {
        var t,
          e = {}
        for (t in n) e[o(t)] = n[t]
        return e
      })()
      function r(t) {
        var e = o(t)
        return a[e] || a['h' + e] || null
      }
      function o(t) {
        return String(t)
          .toLowerCase()
          .replace(/([a-z]+|\d+)/, ' $1 ')
          .replace(/\.0+(?!\d)/, '')
          .replace(/\.01/, '')
          .replace(/\.2/, '')
          .replace(
            /\b(xhtml|html|mathml|svg|full|basic|tiny|strict|frameset|basic)\b/g,
            s,
          )
          .replace(/ t(?:ransitional)?/, '')
          .replace(/\s+/g, '')
      }
      function s(t, e) {
        return e.charAt(0)
      }
      ;(a.h = a.h5), (a.s = a['s1.1f']), (a.m = a.m2), (a.x = a['x1.1'])
    },
    function(t) {
      t.exports = {
        'HTML 5': 'html',
        'HTML 4.01 Strict':
          'HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"',
        'HTML 4.01 Transitional':
          'HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"',
        'HTML 4.01 Frameset':
          'HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"',
        'HTML 3.2': 'HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN"',
        'HTML 2.0': 'HTML PUBLIC "-//IETF//DTD HTML//EN"',
        'XHTML 1.0 Strict':
          'html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"',
        'XHTML 1.0 Transitional':
          'html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"',
        'XHTML 1.0 Frameset':
          'html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"',
        'XHTML 1.1':
          'html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"',
        'XHTML Basic 1.1':
          'html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd"',
        'XHTML Basic 1.0':
          'html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd"',
        'MathML 2.0':
          'math PUBLIC "-//W3C//DTD MathML 2.0//EN" "http://www.w3.org/Math/DTD/mathml2/mathml2.dtd"',
        'MathML 1.01':
          'math SYSTEM "http://www.w3.org/Math/DTD/mathml1/mathml.dtd"',
        'SVG 1.0':
          'svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"',
        'SVG 1.1 Full':
          'svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"',
        'SVG 1.1 Basic':
          'svg PUBLIC "-//W3C//DTD SVG 1.1 Basic//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd"',
        'SVG 1.1 Tiny':
          'svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd"',
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(301)({newlines: !0}),
        a = i(305),
        r = i(54),
        o = i(100),
        s = i(23),
        l = i(83)
      t.exports = function(t) {
        var e = t || {},
          i = e.indent || 2,
          a = e.indentInitial,
          r = e.blanks || []
        'number' == typeof i && (i = s(' ', i))
        null == a && (a = !0)
        return function(t) {
          var e = n(t),
            r = !1
          return (
            l(e, function(t, e) {
              var n,
                l,
                m,
                f,
                g = t.children || [],
                v = g.length,
                x = e.length,
                b = -1
              if (
                ('element' === t.type && 'head' === t.tagName && (r = !0),
                r && 'element' === t.type && 'body' === t.tagName && (r = !1),
                v &&
                  d(t, r) &&
                  !(function(t) {
                    for (var e = t.length; e--; )
                      if (-1 !== o.indexOf(t[e].tagName)) return !0
                    return !1
                  })(e.concat(t)))
              ) {
                for (a || x--; ++b < v; )
                  'text' === (m = g[b]).type &&
                    (-1 !== m.value.indexOf('\n') && (f = !0),
                    (m.value = m.value.replace(u, '$&' + s(i, x))))
                for (n = [], b = -1, t.children = n; ++b < v; )
                  (d((m = g[b]), r) || (f && 0 === b)) &&
                    n.push({
                      type: 'text',
                      value: (l && h(l) && h(m) ? c : p) + s(i, x),
                    }),
                    (l = m),
                    n.push(m)
                ;(f || d(l, r)) &&
                  n.push({type: 'text', value: p + s(i, x - 1)})
              }
            }),
            e
          )
        }
        function h(t) {
          return (
            'element' === t.type &&
            0 !== r.length &&
            -1 !== r.indexOf(t.tagName)
          )
        }
      }
      var c = '\n\n',
        p = '\n',
        u = /\n/g
      function d(t, e) {
        return (
          'root' === t.type ||
          ('element' === t.type &&
            (e || 'script' === t.tagName || r(t) || !a(t)))
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(50),
        a = i(100),
        r = i(22),
        o = i(302),
        s = i(18),
        l = i(53),
        c = i(54),
        p = i(101),
        u = i(304)
      function d(t) {
        return String(t).replace(/\s+/g, function(t) {
          return -1 === t.indexOf('\n') ? ' ' : '\n'
        })
      }
      function h(t) {
        return ' ' === t || '\n' === t
      }
      t.exports = function(t) {
        return function(e) {
          return (function(t, e) {
            var i = e.newlines ? d : n,
              m = o(v),
              f = !1,
              g = !1
            return v(t), t
            function v(t, e, n) {
              var o, l, c, p, u, d
              if (r('text', t)) {
                if (
                  ((l = n.children[e - 1]),
                  (c = n.children[e + 1]),
                  (p = i(t.value)),
                  (d = p.length),
                  (u = 0),
                  h(p.charAt(0)) && x(l) && u++,
                  h(p.charAt(d - 1)) && x(c) && d--,
                  !(p = p.slice(u, d)))
                )
                  return n.children.splice(e, 1), e
                t.value = p
              }
              g || f || ((o = s(t, 'head')), (f = o), (g = o)),
                t.children && !s(t, a) && m(t),
                o && (f = !1)
            }
            function x(t) {
              return (
                !t ||
                f ||
                !(function(t) {
                  return (
                    r('text', t) ||
                    s(t, u) ||
                    c(t) ||
                    p(t) ||
                    (s(t, 'meta') && l(t, 'itemProp'))
                  )
                })(t)
              )
            }
          })(e, t || {})
        }
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(303)
      t.exports = function(t) {
        return (function(t) {
          return function(e) {
            var i = e && e.children
            if (!i)
              throw new Error('Missing children in `parent` for `modifier`')
            return n(i, t, e)
          }
        })(
          (function(t) {
            return function(e, i) {
              return t(e, i, this)
            }
          })(t),
        )
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e, i) {
        var a,
          r = -1
        if (!t) throw new Error('Iterate requires that |this| not be ' + t)
        if (!n.call(t, 'length'))
          throw new Error('Iterate requires that |this| has a `length`')
        if ('function' != typeof e)
          throw new Error('`callback` must be a function')
        for (; ++r < t.length; )
          r in t &&
            'number' == typeof (a = e.call(i, t[r], r, t)) &&
            (a < 0 && (r = 0), (r = a - 1))
      }
      var n = {}.hasOwnProperty
    },
    function(t) {
      t.exports = [
        'a',
        'abbr',
        'acronym',
        'b',
        'basefont',
        'big',
        'bdi',
        'bdo',
        'blink',
        'button',
        'cite',
        'code',
        'data',
        'del',
        'dfn',
        'em',
        'font',
        'i',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'mark',
        'marquee',
        'meter',
        'nobr',
        'output',
        'progress',
        'q',
        'ruby',
        's',
        'samp',
        'select',
        'small',
        'spacer',
        'span',
        'strong',
        'sub',
        'sup',
        'textarea',
        'time',
        'tt',
        'u',
        'var',
      ]
    },
    function(t, e, i) {
      var n = i(18),
        a = i(53),
        r = i(54),
        o = i(101)
      t.exports = function(t) {
        return (
          'text' === t.type ||
          n(t, s) ||
          r(t) ||
          o(t) ||
          (n(t, 'meta') && a(t, 'itemProp'))
        )
      }
      var s = [
        'a',
        'abbr',
        'area',
        'b',
        'bdi',
        'bdo',
        'br',
        'button',
        'cite',
        'code',
        'data',
        'datalist',
        'del',
        'dfn',
        'em',
        'i',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'map',
        'mark',
        'meter',
        'noscript',
        'output',
        'progress',
        'q',
        'ruby',
        's',
        'samp',
        'script',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'template',
        'textarea',
        'time',
        'u',
        'var',
        'wbr',
      ]
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(307)
      t.exports = function(t) {
        var e = n(t, this.data('settings'))
        this.Compiler = function(t) {
          return a(t, e)
        }
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = i(308)
    },
    function(t, e, i) {
      'use strict'
      var n = i(309),
        a = i(113),
        r = i(312),
        o = i(313),
        s = i(118)
      t.exports = function(t, e) {
        var i = e || {},
          p = i.quote || l,
          u = p === l ? c : l,
          d = i.quoteSmart
        if (p !== l && p !== c)
          throw new Error(
            'Invalid quote `' + p + '`, expected `' + c + '` or `' + l + '`',
          )
        return s(
          {
            valid: i.allowParseErrors ? 0 : 1,
            safe: i.allowDangerousCharacters ? 0 : 1,
            schema: 'svg' === i.space ? a : n,
            omit: i.omitOptionalTags && o,
            quote: p,
            alternative: d ? u : null,
            unquoted: Boolean(i.preferUnquoted),
            tight: i.tightAttributes,
            tightDoctype: Boolean(i.tightDoctype),
            tightLists: i.tightCommaSeparatedLists,
            tightClose: i.tightSelfClosing,
            collapseEmpty: i.collapseEmptyAttributes,
            dangerous: i.allowDangerousHTML,
            voids: i.voids || r.concat(),
            entities: i.entities || {},
            close: i.closeSelfClosing,
            closeEmpty: i.closeEmptyElements,
          },
          t,
        )
      }
      var l = '"',
        c = "'"
    },
    function(t, e, i) {
      'use strict'
      var n = i(102),
        a = i(104),
        r = i(108),
        o = i(109),
        s = i(112),
        l = i(310)
      t.exports = n([r, a, o, s, l])
    },
    function(t, e, i) {
      'use strict'
      var n = i(37),
        a = i(19),
        r = i(110),
        o = n.boolean,
        s = n.overloadedBoolean,
        l = n.booleanish,
        c = n.number,
        p = n.spaceSeparated,
        u = n.commaSeparated
      t.exports = a({
        space: 'html',
        attributes: {
          acceptcharset: 'accept-charset',
          classname: 'class',
          htmlfor: 'for',
          httpequiv: 'http-equiv',
        },
        transform: r,
        mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
        properties: {
          abbr: null,
          accept: u,
          acceptCharset: p,
          accessKey: p,
          action: null,
          allowFullScreen: o,
          allowPaymentRequest: o,
          allowUserMedia: o,
          alt: null,
          as: null,
          async: o,
          autoCapitalize: null,
          autoComplete: p,
          autoFocus: o,
          autoPlay: o,
          capture: o,
          charSet: null,
          checked: o,
          cite: null,
          className: p,
          cols: c,
          colSpan: null,
          content: null,
          contentEditable: l,
          controls: o,
          controlsList: p,
          coords: c | u,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: o,
          defer: o,
          dir: null,
          dirName: null,
          disabled: o,
          download: s,
          draggable: l,
          encType: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: o,
          formTarget: null,
          headers: p,
          height: c,
          hidden: o,
          high: c,
          href: null,
          hrefLang: null,
          htmlFor: p,
          httpEquiv: p,
          id: null,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: o,
          itemId: null,
          itemProp: p,
          itemRef: p,
          itemScope: o,
          itemType: p,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loop: o,
          low: c,
          manifest: null,
          max: null,
          maxLength: c,
          media: null,
          method: null,
          min: null,
          minLength: c,
          multiple: o,
          muted: o,
          name: null,
          nonce: null,
          noModule: o,
          noValidate: o,
          open: o,
          optimum: c,
          pattern: null,
          ping: p,
          placeholder: null,
          playsInline: o,
          poster: null,
          preload: null,
          readOnly: o,
          referrerPolicy: null,
          rel: p,
          required: o,
          reversed: o,
          rows: c,
          rowSpan: c,
          sandbox: p,
          scope: null,
          scoped: o,
          seamless: o,
          selected: o,
          shape: null,
          size: c,
          sizes: null,
          slot: null,
          span: c,
          spellCheck: l,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: u,
          start: c,
          step: null,
          style: null,
          tabIndex: c,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: o,
          useMap: null,
          value: l,
          width: c,
          wrap: null,
          align: null,
          aLink: null,
          archive: p,
          axis: null,
          background: null,
          bgColor: null,
          border: c,
          borderColor: null,
          bottomMargin: c,
          cellPadding: null,
          cellSpacing: null,
          char: null,
          charOff: null,
          classId: null,
          clear: null,
          code: null,
          codeBase: null,
          codeType: null,
          color: null,
          compact: o,
          declare: o,
          event: null,
          face: null,
          frame: null,
          frameBorder: null,
          hSpace: c,
          leftMargin: c,
          link: null,
          longDesc: null,
          lowSrc: null,
          marginHeight: c,
          marginWidth: c,
          noResize: o,
          noHref: o,
          noShade: o,
          noWrap: o,
          object: null,
          profile: null,
          prompt: null,
          rev: null,
          rightMargin: c,
          rules: null,
          scheme: null,
          scrolling: l,
          standby: null,
          summary: null,
          text: null,
          topMargin: c,
          valueType: null,
          version: null,
          vAlign: null,
          vLink: null,
          vSpace: c,
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          prefix: null,
          property: null,
          results: c,
          security: null,
          unselectable: null,
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(37),
        a = i(19),
        r = i(111),
        o = n.boolean,
        s = n.number,
        l = n.spaceSeparated,
        c = n.commaSeparated,
        p = n.commaOrSpaceSeparated
      t.exports = a({
        space: 'svg',
        attributes: {
          accentHeight: 'accent-height',
          alignmentBaseline: 'alignment-baseline',
          arabicForm: 'arabic-form',
          baselineShift: 'baseline-shift',
          capHeight: 'cap-height',
          className: 'class',
          clipPath: 'clip-path',
          clipRule: 'clip-rule',
          colorInterpolation: 'color-interpolation',
          colorInterpolationFilters: 'color-interpolation-filters',
          colorProfile: 'color-profile',
          colorRendering: 'color-rendering',
          crossOrigin: 'crossorigin',
          dataType: 'datatype',
          dominantBaseline: 'dominant-baseline',
          enableBackground: 'enable-background',
          fillOpacity: 'fill-opacity',
          fillRule: 'fill-rule',
          floodColor: 'flood-color',
          floodOpacity: 'flood-opacity',
          fontFamily: 'font-family',
          fontSize: 'font-size',
          fontSizeAdjust: 'font-size-adjust',
          fontStretch: 'font-stretch',
          fontStyle: 'font-style',
          fontVariant: 'font-variant',
          fontWeight: 'font-weight',
          glyphName: 'glyph-name',
          glyphOrientationHorizontal: 'glyph-orientation-horizontal',
          glyphOrientationVertical: 'glyph-orientation-vertical',
          hrefLang: 'hreflang',
          horizAdvX: 'horiz-adv-x',
          horizOriginX: 'horiz-origin-x',
          horizOriginY: 'horiz-origin-y',
          imageRendering: 'image-rendering',
          letterSpacing: 'letter-spacing',
          lightingColor: 'lighting-color',
          markerEnd: 'marker-end',
          markerMid: 'marker-mid',
          markerStart: 'marker-start',
          navDown: 'nav-down',
          navDownLeft: 'nav-down-left',
          navDownRight: 'nav-down-right',
          navLeft: 'nav-left',
          navNext: 'nav-next',
          navPrev: 'nav-prev',
          navRight: 'nav-right',
          navUp: 'nav-up',
          navUpLeft: 'nav-up-left',
          navUpRight: 'nav-up-right',
          overlinePosition: 'overline-position',
          overlineThickness: 'overline-thickness',
          paintOrder: 'paint-order',
          panose1: 'panose-1',
          pointerEvents: 'pointer-events',
          renderingIntent: 'rendering-intent',
          shapeRendering: 'shape-rendering',
          stopColor: 'stop-color',
          stopOpacity: 'stop-opacity',
          strikethroughPosition: 'strikethrough-position',
          strikethroughThickness: 'strikethrough-thickness',
          strokeDashArray: 'stroke-dasharray',
          strokeDashOffset: 'stroke-dashoffset',
          strokeLineCap: 'stroke-linecap',
          strokeLineJoin: 'stroke-linejoin',
          strokeMiterLimit: 'stroke-miterlimit',
          strokeOpacity: 'stroke-opacity',
          strokeWidth: 'stroke-width',
          tabIndex: 'tabindex',
          textAnchor: 'text-anchor',
          textDecoration: 'text-decoration',
          textRendering: 'text-rendering',
          typeOf: 'typeof',
          underlinePosition: 'underline-position',
          underlineThickness: 'underline-thickness',
          unicodeBidi: 'unicode-bidi',
          unicodeRange: 'unicode-range',
          unitsPerEm: 'units-per-em',
          vAlphabetic: 'v-alphabetic',
          vHanging: 'v-hanging',
          vIdeographic: 'v-ideographic',
          vMathematical: 'v-mathematical',
          vectorEffect: 'vector-effect',
          vertAdvY: 'vert-adv-y',
          vertOriginX: 'vert-origin-x',
          vertOriginY: 'vert-origin-y',
          wordSpacing: 'word-spacing',
          writingMode: 'writing-mode',
          xHeight: 'x-height',
          playbackOrder: 'playbackorder',
          timelineBegin: 'timelinebegin',
        },
        transform: r,
        properties: {
          about: p,
          accentHeight: s,
          accumulate: null,
          additive: null,
          alignmentBaseline: null,
          alphabetic: s,
          amplitude: s,
          arabicForm: null,
          ascent: s,
          attributeName: null,
          attributeType: null,
          azimuth: s,
          bandwidth: null,
          baselineShift: null,
          baseFrequency: null,
          baseProfile: null,
          bbox: null,
          begin: null,
          bias: s,
          by: null,
          calcMode: null,
          capHeight: s,
          className: l,
          clip: null,
          clipPath: null,
          clipPathUnits: null,
          clipRule: null,
          color: null,
          colorInterpolation: null,
          colorInterpolationFilters: null,
          colorProfile: null,
          colorRendering: null,
          content: null,
          contentScriptType: null,
          contentStyleType: null,
          crossOrigin: null,
          cursor: null,
          cx: null,
          cy: null,
          d: null,
          dataType: null,
          defaultAction: null,
          descent: s,
          diffuseConstant: s,
          direction: null,
          display: null,
          dur: null,
          divisor: s,
          dominantBaseline: null,
          download: o,
          dx: null,
          dy: null,
          edgeMode: null,
          editable: null,
          elevation: s,
          enableBackground: null,
          end: null,
          event: null,
          exponent: s,
          externalResourcesRequired: null,
          fill: null,
          fillOpacity: s,
          fillRule: null,
          filter: null,
          filterRes: null,
          filterUnits: null,
          floodColor: null,
          floodOpacity: null,
          focusable: null,
          focusHighlight: null,
          fontFamily: null,
          fontSize: null,
          fontSizeAdjust: null,
          fontStretch: null,
          fontStyle: null,
          fontVariant: null,
          fontWeight: null,
          format: null,
          fr: null,
          from: null,
          fx: null,
          fy: null,
          g1: c,
          g2: c,
          glyphName: c,
          glyphOrientationHorizontal: null,
          glyphOrientationVertical: null,
          glyphRef: null,
          gradientTransform: null,
          gradientUnits: null,
          handler: null,
          hanging: s,
          hatchContentUnits: null,
          hatchUnits: null,
          height: null,
          href: null,
          hrefLang: null,
          horizAdvX: s,
          horizOriginX: s,
          horizOriginY: s,
          id: null,
          ideographic: s,
          imageRendering: null,
          initialVisibility: null,
          in: null,
          in2: null,
          intercept: s,
          k: s,
          k1: s,
          k2: s,
          k3: s,
          k4: s,
          kernelMatrix: p,
          kernelUnitLength: null,
          keyPoints: null,
          keySplines: null,
          keyTimes: null,
          kerning: null,
          lang: null,
          lengthAdjust: null,
          letterSpacing: null,
          lightingColor: null,
          limitingConeAngle: s,
          local: null,
          markerEnd: null,
          markerMid: null,
          markerStart: null,
          markerHeight: null,
          markerUnits: null,
          markerWidth: null,
          mask: null,
          maskContentUnits: null,
          maskUnits: null,
          mathematical: null,
          max: null,
          media: null,
          mediaCharacterEncoding: null,
          mediaContentEncodings: null,
          mediaSize: s,
          mediaTime: null,
          method: null,
          min: null,
          mode: null,
          name: null,
          navDown: null,
          navDownLeft: null,
          navDownRight: null,
          navLeft: null,
          navNext: null,
          navPrev: null,
          navRight: null,
          navUp: null,
          navUpLeft: null,
          navUpRight: null,
          numOctaves: null,
          observer: null,
          offset: null,
          opacity: null,
          operator: null,
          order: null,
          orient: null,
          orientation: null,
          origin: null,
          overflow: null,
          overlay: null,
          overlinePosition: s,
          overlineThickness: s,
          paintOrder: null,
          panose1: null,
          path: null,
          pathLength: s,
          patternContentUnits: null,
          patternTransform: null,
          patternUnits: null,
          phase: null,
          pitch: null,
          playbackOrder: null,
          pointerEvents: null,
          points: null,
          pointsAtX: s,
          pointsAtY: s,
          pointsAtZ: s,
          preserveAlpha: null,
          preserveAspectRatio: null,
          primitiveUnits: null,
          propagate: null,
          property: p,
          r: null,
          radius: null,
          refX: null,
          refY: null,
          rel: p,
          rev: p,
          renderingIntent: null,
          repeatCount: null,
          repeatDur: null,
          requiredExtensions: p,
          requiredFeatures: p,
          requiredFonts: p,
          requiredFormats: p,
          resource: null,
          restart: null,
          result: null,
          rotate: null,
          rx: null,
          ry: null,
          scale: null,
          seed: null,
          shapeRendering: null,
          side: null,
          slope: null,
          snapshotTime: null,
          specularConstant: s,
          specularExponent: s,
          spreadMethod: null,
          spacing: null,
          startOffset: null,
          stdDeviation: null,
          stemh: null,
          stemv: null,
          stitchTiles: null,
          stopColor: null,
          stopOpacity: null,
          strikethroughPosition: s,
          strikethroughThickness: s,
          string: null,
          stroke: null,
          strokeDashArray: p,
          strokeDashOffset: null,
          strokeLineCap: null,
          strokeLineJoin: null,
          strokeMiterLimit: s,
          strokeOpacity: s,
          strokeWidth: null,
          style: null,
          surfaceScale: s,
          syncBehavior: null,
          syncBehaviorDefault: null,
          syncMaster: null,
          syncTolerance: null,
          syncToleranceDefault: null,
          systemLanguage: p,
          tabIndex: s,
          tableValues: null,
          target: null,
          targetX: s,
          targetY: s,
          textAnchor: null,
          textDecoration: null,
          textRendering: null,
          textLength: null,
          timelineBegin: null,
          title: null,
          transformBehavior: null,
          type: null,
          typeOf: p,
          to: null,
          transform: null,
          u1: null,
          u2: null,
          underlinePosition: s,
          underlineThickness: s,
          unicode: null,
          unicodeBidi: null,
          unicodeRange: null,
          unitsPerEm: s,
          values: null,
          vAlphabetic: s,
          vMathematical: s,
          vectorEffect: null,
          vHanging: s,
          vIdeographic: s,
          version: null,
          vertAdvY: s,
          vertOriginX: s,
          vertOriginY: s,
          viewBox: null,
          viewTarget: null,
          visibility: null,
          width: null,
          widths: null,
          wordSpacing: null,
          writingMode: null,
          x: null,
          x1: null,
          x2: null,
          xChannelSelector: null,
          xHeight: s,
          y: null,
          y1: null,
          y2: null,
          yChannelSelector: null,
          z: null,
          zoomAndPan: null,
        },
      })
    },
    function(t) {
      t.exports = [
        'area',
        'base',
        'basefont',
        'bgsound',
        'br',
        'col',
        'command',
        'embed',
        'frame',
        'hr',
        'image',
        'img',
        'input',
        'isindex',
        'keygen',
        'link',
        'menuitem',
        'meta',
        'nextid',
        'param',
        'source',
        'track',
        'wbr',
      ]
    },
    function(t, e, i) {
      'use strict'
      ;(e.opening = i(314)), (e.closing = i(116))
    },
    function(t, e, i) {
      'use strict'
      var n = i(22),
        a = i(18),
        r = i(55).before,
        o = i(315),
        s = i(316),
        l = i(115),
        c = i(116),
        p = i(117),
        u = {}.hasOwnProperty,
        d = ['title', 'base'],
        h = ['meta', 'link', 'script', 'style', 'template'],
        m = ['thead', 'tbody'],
        f = 'tr'
      t.exports = p({
        html: function(t) {
          var e = o(t)
          return !e || !n('comment', e)
        },
        head: function(t) {
          var e,
            i,
            n = t.children,
            r = n.length,
            o = {},
            s = -1
          for (; ++s < r; )
            if (((e = n[s]), (i = e.tagName), a(e, d))) {
              if (u.call(o, i)) return !1
              o[i] = !0
            }
          return Boolean(r)
        },
        body: function(t) {
          var e = o(t, !0)
          return !e || (!n('comment', e) && !l(e) && !a(e, h))
        },
        colgroup: function(t, e, i) {
          var n = r(i, e),
            l = o(t, !0)
          if (a(n, 'colgroup') && c(n, s(i, n), i)) return !1
          return l && a(l, 'col')
        },
        tbody: function(t, e, i) {
          var n = r(i, e),
            l = o(t)
          if (a(n, m) && c(n, s(i, n), i)) return !1
          return l && a(l, f)
        },
      })
    },
    function(t, e, i) {
      'use strict'
      var n = i(55).after
      t.exports = function(t, e) {
        return n(t, -1, e)
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return t && t.children && t.children.indexOf(e)
      }
    },
    function(t) {
      t.exports = {
        nbsp: ' ',
        iexcl: '¡',
        cent: '¢',
        pound: '£',
        curren: '¤',
        yen: '¥',
        brvbar: '¦',
        sect: '§',
        uml: '¨',
        copy: '©',
        ordf: 'ª',
        laquo: '«',
        not: '¬',
        shy: '­',
        reg: '®',
        macr: '¯',
        deg: '°',
        plusmn: '±',
        sup2: '²',
        sup3: '³',
        acute: '´',
        micro: 'µ',
        para: '¶',
        middot: '·',
        cedil: '¸',
        sup1: '¹',
        ordm: 'º',
        raquo: '»',
        frac14: '¼',
        frac12: '½',
        frac34: '¾',
        iquest: '¿',
        Agrave: 'À',
        Aacute: 'Á',
        Acirc: 'Â',
        Atilde: 'Ã',
        Auml: 'Ä',
        Aring: 'Å',
        AElig: 'Æ',
        Ccedil: 'Ç',
        Egrave: 'È',
        Eacute: 'É',
        Ecirc: 'Ê',
        Euml: 'Ë',
        Igrave: 'Ì',
        Iacute: 'Í',
        Icirc: 'Î',
        Iuml: 'Ï',
        ETH: 'Ð',
        Ntilde: 'Ñ',
        Ograve: 'Ò',
        Oacute: 'Ó',
        Ocirc: 'Ô',
        Otilde: 'Õ',
        Ouml: 'Ö',
        times: '×',
        Oslash: 'Ø',
        Ugrave: 'Ù',
        Uacute: 'Ú',
        Ucirc: 'Û',
        Uuml: 'Ü',
        Yacute: 'Ý',
        THORN: 'Þ',
        szlig: 'ß',
        agrave: 'à',
        aacute: 'á',
        acirc: 'â',
        atilde: 'ã',
        auml: 'ä',
        aring: 'å',
        aelig: 'æ',
        ccedil: 'ç',
        egrave: 'è',
        eacute: 'é',
        ecirc: 'ê',
        euml: 'ë',
        igrave: 'ì',
        iacute: 'í',
        icirc: 'î',
        iuml: 'ï',
        eth: 'ð',
        ntilde: 'ñ',
        ograve: 'ò',
        oacute: 'ó',
        ocirc: 'ô',
        otilde: 'õ',
        ouml: 'ö',
        divide: '÷',
        oslash: 'ø',
        ugrave: 'ù',
        uacute: 'ú',
        ucirc: 'û',
        uuml: 'ü',
        yacute: 'ý',
        thorn: 'þ',
        yuml: 'ÿ',
        fnof: 'ƒ',
        Alpha: 'Α',
        Beta: 'Β',
        Gamma: 'Γ',
        Delta: 'Δ',
        Epsilon: 'Ε',
        Zeta: 'Ζ',
        Eta: 'Η',
        Theta: 'Θ',
        Iota: 'Ι',
        Kappa: 'Κ',
        Lambda: 'Λ',
        Mu: 'Μ',
        Nu: 'Ν',
        Xi: 'Ξ',
        Omicron: 'Ο',
        Pi: 'Π',
        Rho: 'Ρ',
        Sigma: 'Σ',
        Tau: 'Τ',
        Upsilon: 'Υ',
        Phi: 'Φ',
        Chi: 'Χ',
        Psi: 'Ψ',
        Omega: 'Ω',
        alpha: 'α',
        beta: 'β',
        gamma: 'γ',
        delta: 'δ',
        epsilon: 'ε',
        zeta: 'ζ',
        eta: 'η',
        theta: 'θ',
        iota: 'ι',
        kappa: 'κ',
        lambda: 'λ',
        mu: 'μ',
        nu: 'ν',
        xi: 'ξ',
        omicron: 'ο',
        pi: 'π',
        rho: 'ρ',
        sigmaf: 'ς',
        sigma: 'σ',
        tau: 'τ',
        upsilon: 'υ',
        phi: 'φ',
        chi: 'χ',
        psi: 'ψ',
        omega: 'ω',
        thetasym: 'ϑ',
        upsih: 'ϒ',
        piv: 'ϖ',
        bull: '•',
        hellip: '…',
        prime: '′',
        Prime: '″',
        oline: '‾',
        frasl: '⁄',
        weierp: '℘',
        image: 'ℑ',
        real: 'ℜ',
        trade: '™',
        alefsym: 'ℵ',
        larr: '←',
        uarr: '↑',
        rarr: '→',
        darr: '↓',
        harr: '↔',
        crarr: '↵',
        lArr: '⇐',
        uArr: '⇑',
        rArr: '⇒',
        dArr: '⇓',
        hArr: '⇔',
        forall: '∀',
        part: '∂',
        exist: '∃',
        empty: '∅',
        nabla: '∇',
        isin: '∈',
        notin: '∉',
        ni: '∋',
        prod: '∏',
        sum: '∑',
        minus: '−',
        lowast: '∗',
        radic: '√',
        prop: '∝',
        infin: '∞',
        ang: '∠',
        and: '∧',
        or: '∨',
        cap: '∩',
        cup: '∪',
        int: '∫',
        there4: '∴',
        sim: '∼',
        cong: '≅',
        asymp: '≈',
        ne: '≠',
        equiv: '≡',
        le: '≤',
        ge: '≥',
        sub: '⊂',
        sup: '⊃',
        nsub: '⊄',
        sube: '⊆',
        supe: '⊇',
        oplus: '⊕',
        otimes: '⊗',
        perp: '⊥',
        sdot: '⋅',
        lceil: '⌈',
        rceil: '⌉',
        lfloor: '⌊',
        rfloor: '⌋',
        lang: '〈',
        rang: '〉',
        loz: '◊',
        spades: '♠',
        clubs: '♣',
        hearts: '♥',
        diams: '♦',
        quot: '"',
        amp: '&',
        lt: '<',
        gt: '>',
        OElig: 'Œ',
        oelig: 'œ',
        Scaron: 'Š',
        scaron: 'š',
        Yuml: 'Ÿ',
        circ: 'ˆ',
        tilde: '˜',
        ensp: ' ',
        emsp: ' ',
        thinsp: ' ',
        zwnj: '‌',
        zwj: '‍',
        lrm: '‎',
        rlm: '‏',
        ndash: '–',
        mdash: '—',
        lsquo: '‘',
        rsquo: '’',
        sbquo: '‚',
        ldquo: '“',
        rdquo: '”',
        bdquo: '„',
        dagger: '†',
        Dagger: '‡',
        permil: '‰',
        lsaquo: '‹',
        rsaquo: '›',
        euro: '€',
      }
    },
    function(t) {
      t.exports = ['cent', 'copy', 'divide', 'gt', 'lt', 'not', 'para', 'times']
    },
    function(t, e, i) {
      'use strict'
      var n = i(6),
        a = i(113),
        r = i(320),
        o = i(98).stringify,
        s = i(99).stringify,
        l = i(121),
        c = i(321),
        p = i(119),
        u = i(322)
      t.exports = function(t, e, i, n) {
        var r,
          o,
          s,
          l,
          c,
          u = t.schema,
          g = e.tagName,
          w = '',
          k = e
        'html' === u.space && 'svg' === g && (t.schema = a)
        ;(c = (function(t, e) {
          var i,
            n,
            a,
            r,
            o,
            s,
            l = []
          for (i in e) null != (n = e[i]) && (a = y(t, i, n)) && l.push(a)
          for (r = l.length, o = -1; ++o < r; )
            (a = l[o]),
              (s = null),
              'html' === t.schema.space &&
                t.tight &&
                (s = a.charAt(a.length - 1)),
              o !== r - 1 && s !== m && s !== f && (l[o] = a + h)
          return l.join(d)
        })(t, e.properties)),
          'svg' === t.schema.space
            ? ((s = !1), (o = !0), (r = t.closeEmpty))
            : ((s = t.omit),
              (o = t.close),
              (r = -1 !== t.voids.indexOf(g.toLowerCase())),
              'template' === g && (k = e.content))
        ;(l = p(t, k)),
          (r = !l && r),
          (!c && s && s.opening(e, i, n)) ||
            ((w = v + g + (c ? h + c : d)),
            r &&
              o &&
              ((t.tightClose && c.charAt(c.length - 1) !== b) || (w += h),
              (w += b)),
            (w += x))
        ;(w += l), r || (s && s.closing(e, i, n)) || (w += v + b + g + x)
        return (t.schema = u), w
      }
      var d = '',
        h = ' ',
        m = '"',
        f = "'",
        g = '=',
        v = '<',
        x = '>',
        b = '/'
      function y(t, e, i) {
        var a = t.schema,
          p = a.space,
          h = r(a, e),
          m = h.attribute
        if (
          (!h.overloadedBoolean || (i !== m && '' !== i)
            ? (h.boolean || (h.overloadedBoolean && 'string' != typeof i)) &&
              (i = Boolean(i))
            : (i = !0),
          null == i || !1 === i || ('number' == typeof i && isNaN(i)))
        )
          return d
        if (
          ((m = (function(t, e) {
            var i = 'html' === t.schema.space ? t.valid : 1,
              a = u.name[i][t.safe]
            return l(e, n(t.entities, {subset: a}))
          })(t, m)),
          !0 === i)
        ) {
          if ('html' === p) return m
          i = m
        }
        return (
          m +
          (function(t, e, i, a) {
            var r,
              p,
              d = t.entities,
              h = t.quote,
              m = t.alternative,
              v = t.schema.space
            'object' == typeof i &&
              'length' in i &&
              (i = (a.commaSeparated ? s : o)(i, {padLeft: !t.tightLists}))
            ;(i = String(i)),
              ('html' !== v || i || !t.collapseEmpty) &&
                ((r = i),
                'html' === v &&
                  t.unquoted &&
                  ((p = u.unquoted[t.valid][t.safe]),
                  (r = l(i, n(d, {subset: p, attribute: !0})))),
                ('html' === v && t.unquoted && r === i) ||
                  (m && c(i, h) > c(i, m) && (h = m),
                  (p = (p = h === f ? u.single : u.double)[
                    'html' === v ? t.valid : 1
                  ][t.safe]),
                  (i = l(i, n(d, {subset: p, attribute: !0}))),
                  (i = h + i + h)),
                (i = i ? g + i : i))
            return i
          })(t, 0, i, h)
        )
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(105),
        a = i(106),
        r = i(107),
        o = 'data'
      t.exports = function(t, e) {
        var i = n(e),
          d = e,
          h = r
        if (i in t.normal) return t.property[t.normal[i]]
        i.length > 4 &&
          i.slice(0, 4) === o &&
          s.test(e) &&
          ('-' === e.charAt(4)
            ? (d = (function(t) {
                var e = t.slice(5).replace(l, u)
                return o + e.charAt(0).toUpperCase() + e.slice(1)
              })(e))
            : (e = (function(t) {
                var e = t.slice(4)
                if (l.test(e)) return t
                '-' !== (e = e.replace(c, p)).charAt(0) && (e = '-' + e)
                return o + e
              })(e)),
          (h = a))
        return new h(d, e)
      }
      var s = /^data[-a-z0-9.:_]+$/i,
        l = /-[a-z]/g,
        c = /[A-Z]/g
      function p(t) {
        return '-' + t.toLowerCase()
      }
      function u(t) {
        return t.charAt(1).toUpperCase()
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        var i,
          n = 0
        if (((t = String(t)), 'string' != typeof e || 1 !== e.length))
          throw new Error('Expected character')
        i = t.indexOf(e)
        for (; -1 !== i; ) n++, (i = t.indexOf(e, i + 1))
        return n
      }
    },
    function(t, e, i) {
      'use strict'
      var n = [' ', '\t', '\n', '\r', '\f'],
        a = n.concat('&', '/', '>', '='),
        r = n.concat('&', '>'),
        o = r.concat('\0', '"', "'", '<', '=', '`'),
        s = ['&', "'"],
        l = ['&', '"']
      t.exports = {
        name: [
          [a, a.concat('"', "'", '`')],
          [a.concat('\0', '"', "'", '<'), a.concat('\0', '"', "'", '<', '`')],
        ],
        unquoted: [[r, o], [o, o]],
        single: [
          [s, s.concat('"', '`')],
          [s.concat('\0'), s.concat('\0', '"', '`')],
        ],
        double: [
          [l, l.concat("'", '`')],
          [l.concat('\0'), l.concat('\0', "'", '`')],
        ],
      }
    },
    function(t, e, i) {
      'use strict'
      function n(t) {
        var e = -1 === t.indexOf('"') ? '"' : "'"
        return e + t + e
      }
      t.exports = function(t, e) {
        var i = t.tightDoctype ? '' : ' ',
          a = e.name,
          r = e.public,
          o = e.system,
          s = ['<!doctype']
        a &&
          (s.push(i, a),
          null != r
            ? s.push(' public', i, n(r))
            : null != o && s.push(' system'),
          null != o && s.push(i, n(o)))
        return s.join('') + '>'
      }
    },
    function(t, e, i) {
      'use strict'
      t.exports = function(t, e) {
        return '\x3c!--' + e.value + '--\x3e'
      }
    },
    function(t, e, i) {
      'use strict'
      var n = i(120)
      t.exports = function(t, e) {
        return t.dangerous ? e.value : n(t, e)
      }
    },
  ]),
)
