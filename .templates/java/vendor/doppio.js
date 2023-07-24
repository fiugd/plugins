!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("BrowserFS")) : "function" == typeof define && define.amd ? define(["BrowserFS"], e) : "object" == typeof exports ? exports.Doppio = e(require("BrowserFS")) : t.Doppio = e(t.BrowserFS)
}(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
    return function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var a = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(a.exports, a, a.exports, e),
            a.loaded = !0,
            a.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.p = "",
        e(0)
    }([function(t, e, n) {
        "use strict";
        var r = n(1);
        t.exports = r
    }
    , function(t, e, n) {
        "use strict";
        var r = n(2);
        e.Testing = r;
        var a = n(30);
        e.Heap = a;
        var o = n(46);
        e.VM = o;
        var s = n(51);
        e.Debug = s
    }
    , function(t, e, n) {
        (function(t) {
            "use strict";
            function r(t, e, n) {
                var r = new Error(t);
                return r.originalError = e,
                r.fatal = n,
                r
            }
            function a(t, e) {
                var n = p.resolve(t, p.join("classes", "test"));
                h.readdir(n, function(t, n) {
                    e(t ? [] : n.filter(function(t) {
                        return ".java" === p.extname(t)
                    }).map(function(t) {
                        return p.join("classes", "test", p.basename(t, ".java"))
                    }))
                })
            }
            function o(t, e) {
                var n = t.testClasses;
                null == n || 0 === n.length ? a(t.doppioHomePath, function(n) {
                    t.testClasses = n,
                    o(t, e)
                }) : e(n.map(function(e) {
                    return new d(t,e)
                }))
            }
            function s(t, e) {
                var n = t.split(/\n/)
                  , r = e.split(/\n/)
                  , a = c.text_diff(n, r, 2);
                return a.length > 0 ? "Doppio | Java\n" + a.join("\n") : null
            }
            function i(e, n, r, a, s, i) {
                function l(e) {
                    n || t.stdout.write(e)
                }
                o(e, function(t) {
                    u.asyncForEach(t, function(t, e) {
                        l("[" + t.cls + "]: Running... "),
                        t.run(s, function(n, o, s, i) {
                            n && !a && i && (n.message += "\n" + i),
                            n ? (l("fail.\n	" + n.message + "\n"),
                            n.originalError && n.originalError.stack && l(n.stack + "\n"),
                            !r || n.fatal ? (n.message = "Failed " + t.cls + ": " + n.message,
                            e(n)) : e()) : (l("pass.\n"),
                            e())
                        })
                    }, i)
                })
            }
            var l = n(5)
              , u = n(6)
              , c = n(45)
              , p = n(28)
              , h = n(27)
              , f = function() {
                function e() {
                    this._stdoutWrite = t.stdout.write,
                    this._stderrWrite = t.stderr.write,
                    this._data = "",
                    this._isCapturing = !1
                }
                return e.prototype.debugWrite = function(e) {
                    this._stdoutWrite.apply(t.stdout, [e, "utf8"])
                }
                ,
                e.prototype.start = function(e) {
                    var n = this;
                    if (this._isCapturing)
                        throw new Error("Already capturing.");
                    this._isCapturing = !0,
                    e && (this._data = ""),
                    t.stderr.write = t.stdout.write = function(t, e, r) {
                        return "string" != typeof t && (t = t.toString()),
                        n._data += t,
                        !0
                    }
                }
                ,
                e.prototype.stop = function() {
                    this._isCapturing && (this._isCapturing = !1,
                    t.stderr.write = this._stderrWrite,
                    t.stdout.write = this._stdoutWrite)
                }
                ,
                e.prototype.getOutput = function(t) {
                    var e = this._data;
                    return t && (this._data = ""),
                    e
                }
                ,
                e
            }()
              , d = function() {
                function t(t, e) {
                    this.outputCapturer = new f,
                    this.opts = t,
                    -1 !== e.indexOf(".") && (e = u.descriptor2typestr(u.int_classname(e))),
                    this.cls = e,
                    this.outFile = p.resolve(t.doppioHomePath, e) + ".runout"
                }
                return t.prototype.constructJVM = function(t) {
                    new l(u.merge(l.getDefaultOptions(this.opts.doppioHomePath), this.opts, {
                        classpath: [this.opts.doppioHomePath],
                        enableAssertions: !0,
                        enableSystemAssertions: !0
                    }),t)
                }
                ,
                t.prototype.run = function(t, e) {
                    var n = this
                      , a = this.outputCapturer
                      , o = null
                      , i = !1
                      , l = !1
                      , u = !1;
                    t(function(t) {
                        if (o)
                            try {
                                o.halt(1)
                            } catch (n) {
                                t.message += "\n\nAdditionally, test runner received the following error while trying to halt the JVM: " + n + (n.stack ? "\n\n" + n.stack : "") + "\n\nOriginal error's stack trace:"
                            }
                        a.stop(),
                        e(r("Uncaught error. Aborting further tests.\n	" + t + (t.stack ? "\n\n" + t.stack : ""), t, !0))
                    }),
                    this.constructJVM(function(t, c) {
                        if (o = c,
                        !i) {
                            if (l)
                                return e(r("constructJVM returned twice. Aborting further tests.", null, !0));
                            l = !0,
                            t ? e(r("Could not construct JVM:\n" + t, t)) : (a.start(!0),
                            c.runClass(n.cls, [], function(t) {
                                if (!i) {
                                    if (a.stop(),
                                    u)
                                        return e(r("JVM triggered completion callback twice. Aborting further tests.", null, !0));
                                    u = !0;
                                    var o = a.getOutput(!0);
                                    h.readFile(n.outFile, {
                                        encoding: "utf8"
                                    }, function(t, n) {
                                        if (t)
                                            e(r("Could not read runout file:\n" + t, t));
                                        else {
                                            var a = s(o, n)
                                              , i = null;
                                            null !== a && (i = "Output does not match native JVM."),
                                            e(i ? r(i) : null, o, n, a)
                                        }
                                    })
                                }
                            }))
                        }
                    })
                }
                ,
                t
            }();
            e.DoppioTest = d,
            e.getTests = o,
            e.diff = s,
            e.runTests = i
        }
        ).call(e, n(3))
    }
    , function(t, e, n) {
        var r = n(4);
        t.exports = r.BFSRequire("process")
    }
    , function(t, e) {
        t.exports = __WEBPACK_EXTERNAL_MODULE_4__
    }
    , function(module, exports, __webpack_require__) {
        var require;
        (function(process) {
            "use strict";
            var util = __webpack_require__(6), SafeMap = __webpack_require__(10), methods = __webpack_require__(11), ClassLoader = __webpack_require__(20), fs = __webpack_require__(27), path = __webpack_require__(28), buffer = __webpack_require__(29), threading_1 = __webpack_require__(15), enums_1 = __webpack_require__(9), Heap = __webpack_require__(30), assert = __webpack_require__(13), Parker = __webpack_require__(31), threadpool_1 = __webpack_require__(32), JDKInfo = __webpack_require__(33), BrowserFS = __webpack_require__(4), deflate = __webpack_require__(34), inflate = __webpack_require__(40), zstream = __webpack_require__(43), crc32 = __webpack_require__(38), adler32 = __webpack_require__(37), pkg;
            pkg = __webpack_require__(util.are_in_browser() ? 44 : 44);
            var coreClasses = ["Ljava/lang/String;", "Ljava/lang/Class;", "Ljava/lang/ClassLoader;", "Ljava/lang/reflect/Constructor;", "Ljava/lang/reflect/Field;", "Ljava/lang/reflect/Method;", "Ljava/lang/Error;", "Ljava/lang/StackTraceElement;", "Ljava/lang/System;", "Ljava/lang/Thread;", "Ljava/lang/ThreadGroup;", "Ljava/lang/Throwable;", "Ljava/nio/ByteOrder;", "Lsun/misc/VM;", "Lsun/reflect/ConstantPool;", "Ljava/lang/Byte;", "Ljava/lang/Character;", "Ljava/lang/Double;", "Ljava/lang/Float;", "Ljava/lang/Integer;", "Ljava/lang/Long;", "Ljava/lang/Short;", "Ljava/lang/Void;", "Ljava/io/FileDescriptor;", "Ljava/lang/Boolean;", "[Lsun/management/MemoryManagerImpl;", "[Lsun/management/MemoryPoolImpl;", "Lsun/nio/fs/UnixConstants;"]
              , JVM = function() {
                function JVM(t, e) {
                    var n = this;
                    if (this.systemProperties = null,
                    this.internedStrings = new SafeMap,
                    this.bsCl = null,
                    this.threadPool = null,
                    this.natives = {},
                    this.heap = new Heap(20971520),
                    this.nativeClasspath = null,
                    this.startupTime = new Date,
                    this.terminationCb = null,
                    this.firstThread = null,
                    this.responsiveness = null,
                    this.enableSystemAssertions = !1,
                    this.enabledAssertions = !1,
                    this.disabledAssertions = [],
                    this.printJITCompilation = !1,
                    this.systemClassLoader = null,
                    this.nextRef = 0,
                    this.vtraceMethods = {},
                    this.dumpCompiledCodeDir = null,
                    this.parker = new Parker,
                    this.status = enums_1.JVMStatus.BOOTING,
                    this.exitCode = 0,
                    this.jitDisabled = !1,
                    this.dumpJITStats = !1,
                    "string" != typeof t.doppioHomePath)
                        throw new TypeError("opts.doppioHomePath *must* be specified.");
                    t = util.merge(JVM.getDefaultOptions(t.doppioHomePath), t),
                    this.jitDisabled = t.intMode,
                    this.dumpJITStats = t.dumpJITStats;
                    var r, a, o = t.bootstrapClasspath.map(function(t) {
                        return path.resolve(t)
                    }), s = [];
                    if (!Array.isArray(t.bootstrapClasspath) || 0 === t.bootstrapClasspath.length)
                        throw new TypeError("opts.bootstrapClasspath must be specified as an array of file paths.");
                    if (!Array.isArray(t.classpath))
                        throw new TypeError("opts.classpath must be specified as an array of file paths.");
                    if ("string" != typeof t.javaHomePath)
                        throw new TypeError("opts.javaHomePath must be specified.");
                    if (!Array.isArray(t.nativeClasspath) || 0 === t.nativeClasspath.length)
                        throw new TypeError("opts.nativeClasspath must be specified as an array of file paths.");
                    this.nativeClasspath = t.nativeClasspath,
                    t.enableSystemAssertions && (this.enableSystemAssertions = t.enableSystemAssertions),
                    t.enableAssertions && (this.enabledAssertions = t.enableAssertions),
                    t.disableAssertions && (this.disabledAssertions = t.disableAssertions),
                    this.responsiveness = t.responsiveness,
                    this._initSystemProperties(o, t.classpath.map(function(t) {
                        return path.resolve(t)
                    }), path.resolve(t.javaHomePath), path.resolve(t.tmpDir), t.properties),
                    s.push(function(t) {
                        n.initializeNatives(t)
                    }),
                    s.push(function(t) {
                        n.bsCl = new ClassLoader.BootstrapClassLoader(n.systemProperties["java.home"],o,t)
                    }),
                    s.push(function(t) {
                        n.threadPool = new threadpool_1["default"](function() {
                            return n.threadPoolIsEmpty()
                        }
                        ),
                        n.bsCl.resolveClass(null, "Ljava/lang/Thread;", function(e) {
                            null == e ? t("Failed to resolve java/lang/Thread.") : (a = new (e.getConstructor(null))(null),
                            a.$thread = r = n.firstThread = new threading_1.JVMThread(n,n.threadPool,a),
                            a.ref = 1,
                            a["java/lang/Thread/priority"] = 5,
                            a["java/lang/Thread/name"] = util.initCarr(n.bsCl, "main"),
                            a["java/lang/Thread/blockerLock"] = new (n.bsCl.getResolvedClass("Ljava/lang/Object;").getConstructor(r))(r),
                            t())
                        })
                    }),
                    s.push(function(t) {
                        util.asyncForEach(coreClasses, function(t, e) {
                            n.bsCl.initializeClass(r, t, function(n) {
                                if (null == n)
                                    e("Failed to initialize " + t);
                                else if ("Ljava/lang/ThreadGroup;" === t) {
                                    var o = n.getConstructor(r)
                                      , s = new o(r);
                                    s["<init>()V"](r, null, function(t) {
                                        a["java/lang/Thread/group"] = s,
                                        e(t)
                                    })
                                } else
                                    e()
                            })
                        }, t)
                    }),
                    s.push(function(t) {
                        var e = n.bsCl.getInitializedClass(r, "Ljava/lang/System;").getConstructor(r);
                        e["java/lang/System/initializeSystemClass()V"](r, null, t)
                    }),
                    s.push(function(t) {
                        var e = n.bsCl.getInitializedClass(r, "Ljava/lang/ClassLoader;").getConstructor(r);
                        e["java/lang/ClassLoader/getSystemClassLoader()Ljava/lang/ClassLoader;"](r, null, function(e, o) {
                            if (e)
                                t(e);
                            else {
                                n.systemClassLoader = o.$loader,
                                a["java/lang/Thread/contextClassLoader"] = o;
                                var s = n.enabledAssertions === !0 ? 1 : 0;
                                o["java/lang/ClassLoader/setDefaultAssertionStatus(Z)V"](r, [s], t)
                            }
                        })
                    }),
                    s.push(function(t) {
                        n.bsCl.initializeClass(r, "Ldoppio/security/DoppioProvider;", function(e) {
                            t(e ? null : new Error("Failed to initialize DoppioProvider."))
                        })
                    }),
                    util.asyncSeries(s, function(t) {
                        setImmediate(function() {
                            t ? (n.status = enums_1.JVMStatus.TERMINATED,
                            e(t)) : (n.status = enums_1.JVMStatus.BOOTED,
                            e(null, n))
                        })
                    })
                }
                return JVM.prototype.getResponsiveness = function() {
                    var t = this.responsiveness;
                    return "number" == typeof t ? t : "function" == typeof t ? t() : void 0
                }
                ,
                JVM.getDefaultOptions = function(t) {
                    var e = path.join(t, "vendor", "java_home");
                    return {
                        doppioHomePath: t,
                        classpath: ["."],
                        bootstrapClasspath: JDKInfo.classpath.map(function(t) {
                            return path.join(e, t)
                        }),
                        javaHomePath: e,
                        nativeClasspath: [path.join(t, "natives")],
                        enableSystemAssertions: !1,
                        enableAssertions: !1,
                        disableAssertions: null,
                        properties: {},
                        tmpDir: "/tmp",
                        responsiveness: 1e3,
                        intMode: !1,
                        dumpJITStats: !1
                    }
                }
                ,
                JVM.getCompiledJDKURL = function() {
                    return JDKInfo.url
                }
                ,
                JVM.getJDKInfo = function() {
                    return JDKInfo
                }
                ,
                JVM.prototype.getSystemClassLoader = function() {
                    return this.systemClassLoader
                }
                ,
                JVM.isReleaseBuild = function() {
                    return !0
                }
                ,
                JVM.prototype.getNextRef = function() {
                    return this.nextRef++
                }
                ,
                JVM.prototype.getParker = function() {
                    return this.parker
                }
                ,
                JVM.prototype.runClass = function(t, e, n) {
                    var r = this;
                    if (this.status !== enums_1.JVMStatus.BOOTED)
                        switch (this.status) {
                        case enums_1.JVMStatus.BOOTING:
                            throw new Error("JVM is currently booting up. Please wait for it to call the bootup callback, which you passed to the constructor.");
                        case enums_1.JVMStatus.RUNNING:
                            throw new Error("JVM is already running.");
                        case enums_1.JVMStatus.TERMINATED:
                            throw new Error("This JVM has already terminated. Please create a new JVM.");
                        case enums_1.JVMStatus.TERMINATING:
                            throw new Error("This JVM is currently terminating. You should create a new JVM for each class you wish to run.")
                        }
                    this.terminationCb = n;
                    var a = this.firstThread;
                    t = util.int_classname(t),
                    this.systemClassLoader.initializeClass(a, t, function(n) {
                        if (null != n) {
                            var o, s = r.bsCl.getInitializedClass(a, "[Ljava/lang/String;").getConstructor(a), i = new s(a,e.length);
                            for (o = 0; o < e.length; o++)
                                i.array[o] = util.initString(r.bsCl, e[o]);
                            r.status = enums_1.JVMStatus.RUNNING;
                            var l = n.getConstructor(a);
                            l["main([Ljava/lang/String;)V"] ? l["main([Ljava/lang/String;)V"](a, [i]) : a.throwNewException("Ljava/lang/NoSuchMethodError;", "Could not find main method in class " + n.getExternalName() + ".")
                        } else
                            process.stdout.write("Error: Could not find or load main class " + util.ext_classname(t) + "\n"),
                            r.terminationCb(1)
                    })
                }
                ,
                JVM.prototype.isJITDisabled = function() {
                    return this.jitDisabled
                }
                ,
                JVM.prototype.shouldVtrace = function(t) {
                    return this.vtraceMethods[t] === !0
                }
                ,
                JVM.prototype.vtraceMethod = function(t) {
                    this.vtraceMethods[t] = !0
                }
                ,
                JVM.prototype.runJar = function(t, e) {
                    this.runClass("doppio.JarLauncher", t, e)
                }
                ,
                JVM.prototype.threadPoolIsEmpty = function() {
                    var t, e;
                    switch (this.status) {
                    case enums_1.JVMStatus.BOOTING:
                        return !1;
                    case enums_1.JVMStatus.BOOTED:
                        return !1;
                    case enums_1.JVMStatus.RUNNING:
                        return this.status = enums_1.JVMStatus.TERMINATING,
                        t = this.bsCl.getInitializedClass(this.firstThread, "Ljava/lang/System;"),
                        e = t.getConstructor(this.firstThread),
                        e["java/lang/System/exit(I)V"](this.firstThread, [0]),
                        !1;
                    case enums_1.JVMStatus.TERMINATED:
                        return !1;
                    case enums_1.JVMStatus.TERMINATING:
                        return this.status = enums_1.JVMStatus.TERMINATED,
                        this.terminationCb && this.terminationCb(this.exitCode),
                        this.firstThread.close(),
                        !0
                    }
                }
                ,
                JVM.prototype.hasVMBooted = function() {
                    return !(this.status === enums_1.JVMStatus.BOOTING || this.status === enums_1.JVMStatus.BOOTED)
                }
                ,
                JVM.prototype.halt = function(t) {
                    this.exitCode = t,
                    this.status = enums_1.JVMStatus.TERMINATING,
                    this.threadPool.getThreads().forEach(function(t) {
                        t.setStatus(enums_1.ThreadStatus.TERMINATED)
                    })
                }
                ,
                JVM.prototype.getSystemProperty = function(t) {
                    return this.systemProperties[t]
                }
                ,
                JVM.prototype.getSystemPropertyNames = function() {
                    return Object.keys(this.systemProperties)
                }
                ,
                JVM.prototype.getHeap = function() {
                    return this.heap
                }
                ,
                JVM.prototype.internString = function(t, e) {
                    return this.internedStrings.has(t) ? this.internedStrings.get(t) : (e || (e = util.initString(this.bsCl, t)),
                    this.internedStrings.set(t, e),
                    e)
                }
                ,
                JVM.prototype.evalNativeModule = function(mod) {
                    var rv, DoppioJVM = __webpack_require__(1), Buffer = buffer.Buffer, process2 = process, savedRequire = "undefined" != typeof require ? require : function(t) {
                        throw new Error("Cannot find module " + t)
                    }
                    ;
                    return function() {
                        function registerNatives(t) {
                            rv = t
                        }
                        eval("\nvar process = process2;\nfunction require(name) {\n  switch(name) {\n    case 'doppiojvm':\n    case '../doppiojvm':\n      return DoppioJVM;\n    case 'fs':\n      return fs;\n    case 'path':\n      return path;\n    case 'buffer':\n      return buffer;\n    case 'browserfs':\n      return BrowserFS;\n    case 'pako/lib/zlib/zstream':\n      return zstream;\n    case 'pako/lib/zlib/inflate':\n      return inflate;\n    case 'pako/lib/zlib/deflate':\n      return deflate;\n    case 'pako/lib/zlib/crc32':\n      return crc32;\n    case 'pako/lib/zlib/adler32':\n      return adler32;\n    case 'crypto':\n      return util.are_in_browser() ? null : savedRequire('crypto');\n    default:\n      return savedRequire(name);\n  }\n}\n/**\n * Emulate AMD module 'define' function for natives compiled as AMD modules.\n */\nfunction define(resources, module) {\n  var args = [];\n  resources.forEach(function(resource) {\n    switch (resource) {\n      case 'require':\n        args.push(require);\n        break;\n      case 'exports':\n        args.push({});\n        break;\n      default:\n        args.push(require(resource));\n        break;\n    }\n  });\n  module.apply(null, args);\n}\neval(mod);\n")
                    }(),
                    rv
                }
                ,
                JVM.prototype.registerNatives = function(t) {
                    var e, n;
                    for (e in t)
                        if (t.hasOwnProperty(e)) {
                            this.natives.hasOwnProperty(e) || (this.natives[e] = {});
                            var r = t[e];
                            for (n in r)
                                r.hasOwnProperty(n) && (this.natives[e][n] = r[n])
                        }
                }
                ,
                JVM.prototype.registerNative = function(t, e, n) {
                    this.registerNatives({
                        clsName: {
                            methSig: n
                        }
                    })
                }
                ,
                JVM.prototype.getNative = function(t, e) {
                    if (t = util.descriptor2typestr(t),
                    this.natives.hasOwnProperty(t)) {
                        var n = this.natives[t];
                        if (n.hasOwnProperty(e))
                            return n[e]
                    }
                    return null
                }
                ,
                JVM.prototype.getNatives = function() {
                    return this.natives
                }
                ,
                JVM.prototype.initializeNatives = function(t) {
                    var e = this
                      , n = function() {
                        if (r === e.nativeClasspath.length) {
                            var o = a.length;
                            a.forEach(function(n) {
                                fs.readFile(n, function(n, r) {
                                    n || e.registerNatives(e.evalNativeModule(r.toString())),
                                    0 === --o && t()
                                })
                            })
                        } else {
                            var s = e.nativeClasspath[r++];
                            fs.readdir(s, function(e, r) {
                                if (e)
                                    return t();
                                var o, i;
                                for (o = 0; o < r.length; o++)
                                    i = r[o],
                                    ".js" === i.substring(i.length - 3, i.length) && a.push(path.join(s, i));
                                n()
                            })
                        }
                    }
                      , r = 0
                      , a = [];
                    n()
                }
                ,
                JVM.prototype._initSystemProperties = function(t, e, n, r, a) {
                    this.systemProperties = util.merge({
                        "java.class.path": e.join(":"),
                        "java.home": n,
                        "java.ext.dirs": path.join(n, "lib", "ext"),
                        "java.io.tmpdir": r,
                        "sun.boot.class.path": t.join(":"),
                        "file.encoding": "UTF-8",
                        "java.vendor": "Doppio",
                        "java.version": "1.8",
                        "java.vendor.url": "https://github.com/plasma-umass/doppio",
                        "java.class.version": "52.0",
                        "java.specification.version": "1.8",
                        "line.separator": "\n",
                        "file.separator": path.sep,
                        "path.separator": ":",
                        "user.dir": path.resolve("."),
                        "user.home": ".",
                        "user.name": "DoppioUser",
                        "os.name": "doppio",
                        "os.arch": "js",
                        "os.version": "0",
                        "java.vm.name": "DoppioJVM 32-bit VM",
                        "java.vm.version": pkg.version,
                        "java.vm.vendor": "PLASMA@UMass",
                        "java.awt.headless": util.are_in_browser().toString(),
                        "java.awt.graphicsenv": "classes.awt.CanvasGraphicsEnvironment",
                        "jline.terminal": "jline.UnsupportedTerminal",
                        "sun.arch.data.model": "32",
                        "sun.jnu.encoding": "UTF-8"
                    }, a)
                }
                ,
                JVM.prototype.getBootstrapClassLoader = function() {
                    return this.bsCl
                }
                ,
                JVM.prototype.getStartupTime = function() {
                    return this.startupTime
                }
                ,
                JVM.prototype.areSystemAssertionsEnabled = function() {
                    return this.enableSystemAssertions
                }
                ,
                JVM.prototype.getEnabledAssertions = function() {
                    return this.enabledAssertions
                }
                ,
                JVM.prototype.getDisabledAssertions = function() {
                    return this.disabledAssertions
                }
                ,
                JVM.prototype.setPrintJITCompilation = function(t) {
                    this.printJITCompilation = t
                }
                ,
                JVM.prototype.shouldPrintJITCompilation = function() {
                    return this.printJITCompilation
                }
                ,
                JVM.prototype.dumpCompiledCode = function(t) {
                    this.dumpCompiledCodeDir = t
                }
                ,
                JVM.prototype.shouldDumpCompiledCode = function() {
                    return null !== this.dumpCompiledCodeDir
                }
                ,
                JVM.prototype.dumpObjectDefinition = function(t, e) {
                    this.shouldDumpCompiledCode() && fs.writeFile(path.resolve(this.dumpCompiledCodeDir, t.getExternalName() + "_object.dump"), e, function() {})
                }
                ,
                JVM.prototype.dumpBridgeMethod = function(t, e) {
                    this.shouldDumpCompiledCode() && fs.appendFile(path.resolve(this.dumpCompiledCodeDir, "vmtarget_bridge_methods.dump"), t + ":\n" + e + "\n\n", function() {})
                }
                ,
                JVM.prototype.dumpState = function(t, e) {
                    fs.appendFile(t, this.threadPool.getThreads().map(function(t) {
                        return "Thread " + t.getRef() + ":\n" + t.getPrintableStackTrace()
                    }).join("\n\n"), e)
                }
                ,
                JVM
            }();
            module.exports = JVM
        }
        ).call(exports, __webpack_require__(3))
    }
    , function(t, e, n) {
        (function(t, r) {
            "use strict";
            function a() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e - 0] = arguments[e];
                var n = {};
                return t.forEach(function(t) {
                    Object.keys(t).forEach(function(e) {
                        n[e] = t[e]
                    })
                }),
                n
            }
            function o() {
                return "browser" === t.platform
            }
            function s(t) {
                switch (t[0]) {
                case "L":
                    return t.slice(1, t.length - 1).replace(/_/g, "__").replace(/[\/.;$<>\[\]:\\=^-]/g, "_");
                case "[":
                    return "ARR_" + s(t.slice(1));
                default:
                    return t
                }
            }
            function i(t) {
                return t.replace(/\\/g, "\\\\")
            }
            function l(t, e, n) {
                function r(o) {
                    o ? n(o) : (a++,
                    a < t.length ? e(t[a], r) : n())
                }
                var a = -1;
                r()
            }
            function u(t, e) {
                function n(a) {
                    a ? e(a) : (r++,
                    r < t.length ? t[r](n) : e())
                }
                var r = -1;
                n()
            }
            function c(t, e, n) {
                function r(o) {
                    o ? n(t[a]) : (a++,
                    a < t.length ? e(t[a], r) : n())
                }
                var a = -1;
                r(!1)
            }
            function p(t, e, n) {
                return n.isPublic() ? !0 : n.isProtected() ? t.getPackageName() === e.getPackageName() || t.isSubclass(e) : n.isPrivate() ? t === e : t.getPackageName() === e.getPackageName()
            }
            function h(t) {
                return t > rt.Constants.INT_MAX ? rt.Constants.INT_MAX : t < rt.Constants.INT_MIN ? rt.Constants.INT_MIN : 0 | t
            }
            function f(t, e, n) {
                if (void 0 === e && (e = 0),
                void 0 === n && (n = t.length),
                st && ArrayBuffer.isView(t)) {
                    var a = t.byteOffset;
                    return new r(t.buffer.slice(a, a + t.length))
                }
                var o, s = new r(n);
                for (o = 0; n > o; o++)
                    s.writeInt8(t[e + o], o);
                return s
            }
            function d(t) {
                return !!(t && "undefined" != typeof Uint8Array && t instanceof Uint8Array)
            }
            function _(t) {
                return !!(t && "undefined" != typeof Int8Array && t instanceof Int8Array)
            }
            function g(t, e, n) {
                if (_(t))
                    return new Uint8Array(t.buffer,t.byteOffset + e,n);
                if (Array.isArray(t)) {
                    if ("undefined" != typeof Uint8Array) {
                        var r = new Int8Array(n);
                        return 0 === e && n === t.length ? r.set(t, 0) : r.set(t.slice(e, e + n), 0),
                        new Uint8Array(r.buffer)
                    }
                    for (var a = new Array(n), o = 0; n > o; o++)
                        a[o] = 255 & t[e + o];
                    return a
                }
                throw new TypeError("Invalid array.")
            }
            function v(t, e, n) {
                if (d(t))
                    return new Int8Array(t.buffer,t.byteOffset + e,n);
                if (Array.isArray(t)) {
                    if ("undefined" != typeof Int8Array) {
                        var r = new Uint8Array(n);
                        return 0 === e && n === t.length ? r.set(t, 0) : r.set(t.slice(e, e + n), 0),
                        new Int8Array(r.buffer)
                    }
                    for (var a = new Array(n), o = 0; n > o; o++)
                        a[o] = t[e + o],
                        a[o] > 127 && (a[o] |= 4294967168);
                    return a
                }
                throw new TypeError("Invalid array.")
            }
            function m(t) {
                var e = ot.buffer2Arrayish(t);
                return v(e, 0, e.length)
            }
            function T(t) {
                return t > 3.4028234663852886e38 ? Number.POSITIVE_INFINITY : t > 0 && 1.401298464324817e-45 > t ? 0 : -3.4028234663852886e38 > t ? Number.NEGATIVE_INFINITY : 0 > t && t > -1.401298464324817e-45 ? 0 : t
            }
            function y(t, e, n) {
                void 0 === e && (e = 0),
                void 0 === n && (n = t.array.length);
                var r, a = t.array, o = "", s = e + n;
                for (r = e; s > r; r++)
                    o += String.fromCharCode(a[r]);
                return o
            }
            function I(t) {
                for (var e = [], n = 0; n < t.length; n++)
                    e.push(t.charCodeAt(n));
                return e
            }
            function E(t) {
                for (var e = "", n = 0; n < t.length; n++)
                    e += String.fromCharCode(t[n]);
                return e
            }
            function A(t) {
                if ("J" === t)
                    return nt.ZERO;
                var e = t[0];
                return "[" === e || "L" === e ? null : 0
            }
            function S(t) {
                return R(t).replace(/\//g, ".")
            }
            function C(t) {
                return D(t.replace(/\./g, "/"))
            }
            function N(t) {
                var n = t.match(/^\[*/)[0].length;
                if (n > 255)
                    return !1;
                if (n > 0 && (t = t.slice(n)),
                "L" === t[0]) {
                    if (";" !== t[t.length - 1])
                        return !1;
                    t = t.slice(1, -1)
                }
                if (t in e.internal2external)
                    return !0;
                if (t.match(/\/{2,}/))
                    return !1;
                for (var r = t.split("/"), a = 0; a < r.length; a++)
                    if (r[a].match(/[^$_a-z0-9]/i))
                        return !1;
                return !0
            }
            function L(t) {
                var e, n = 0, r = [];
                for (n = 0; n < t.length; n++)
                    switch (t.charAt(n)) {
                    case "(":
                    case ")":
                        break;
                    case "L":
                        e = t.indexOf(";", n),
                        r.push(t.slice(n, e + 1)),
                        n = e;
                        break;
                    case "[":
                        for (e = n + 1; "[" === t.charAt(e); )
                            e++;
                        "L" === t.charAt(e) ? (e = t.indexOf(";", e),
                        r.push(t.slice(n, e + 1))) : r.push(t.slice(n, e + 1)),
                        n = e;
                        break;
                    default:
                        r.push(t.charAt(n))
                    }
                return r
            }
            function b(t) {
                return t.slice(1)
            }
            function O(t) {
                return "[" === t[0]
            }
            function w(t) {
                return t in e.internal2external
            }
            function k(t) {
                return "L" === t[0]
            }
            function R(t) {
                var n = t[0];
                if (n in e.internal2external)
                    return e.internal2external[n];
                if ("L" === n)
                    return t.slice(1, -1);
                if ("[" === n)
                    return t;
                throw new Error("Unrecognized type string: " + t)
            }
            function F(t) {
                var n = t.shift();
                if (null == n)
                    return null;
                if (void 0 !== e.internal2external[n])
                    return n;
                if ("L" === n) {
                    for (var r = "L"; ";" !== (n = t.shift()); )
                        r += n;
                    return r + ";"
                }
                if ("[" === n)
                    return "[" + F(t);
                throw t.unshift(n),
                new Error("Unrecognized descriptor: " + t.join(""))
            }
            function D(t) {
                return void 0 !== e.external2internal[t] ? e.external2internal[t] : "[" === t[0] ? t : "L" + t + ";"
            }
            function M(t, e, n) {
                var r, a, o, s = [];
                for (r = 0; r < e.length; r++)
                    a = e[r],
                    o = n[r],
                    w(a) ? (s.push(o.unbox()),
                    "J" !== a && "D" !== a || s.push(null)) : s.push(o);
                return s
            }
            function B(t, e, n, r) {
                e.initializeClass(t, "Ljava/lang/invoke/MethodHandleNatives;", function(a) {
                    if (null !== a) {
                        var o = a.getConstructor(t)
                          , s = L(n);
                        s.push("[Ljava/lang/Class;"),
                        e.resolveClasses(t, s, function(e) {
                            var n = s.map(function(n) {
                                return e[n].getClassObject(t)
                            });
                            n.pop();
                            var a = n.pop()
                              , i = e["[Ljava/lang/Class;"].getConstructor(t)
                              , l = new i(t,n.length);
                            l.array = n,
                            o["java/lang/invoke/MethodHandleNatives/findMethodHandleType(Ljava/lang/Class;[Ljava/lang/Class;)Ljava/lang/invoke/MethodType;"](t, [a, l], r)
                        })
                    }
                })
            }
            function j(t) {
                var e, n, r = L(t), a = r.length - 1;
                for (r.pop(),
                e = 0; e < r.length; e++)
                    n = r[e],
                    "D" !== n && "J" !== n || a++;
                return a
            }
            function U(t, e) {
                var n = "(";
                return void 0 !== e && null !== e && e.array.forEach(function(t) {
                    n += t.$cls.getInternalName()
                }),
                n += ")" + t.$cls.getInternalName()
            }
            function P(t, e) {
                return null != e && null != e.$loader ? e.$loader : t.getBsCl()
            }
            function x(t, e, n, r, a) {
                for (var o = r, s = e + a, i = e; s > i; i++)
                    n.array[o++] = t.array[i]
            }
            function V(t, e, n, r, a, o) {
                for (var s = a, i = n + o, l = r.getClass().getComponentClass(), u = n; i > u; u++) {
                    if (null !== e.array[u] && !e.array[u].getClass().isCastable(l))
                        return void t.throwNewException("Ljava/lang/ArrayStoreException;", "Array element in src cannot be cast to dest array type.");
                    r.array[s] = e.array[u],
                    s++
                }
            }
            function z(t, e) {
                var n = W(t, e)
                  , r = t.getResolvedClass("Ljava/lang/String;").getConstructor(null)
                  , a = new r(null);
                return a["java/lang/String/value"] = n,
                a
            }
            function W(t, e) {
                for (var n = t.getInitializedClass(null, "[C").getConstructor(null), r = new n(null,e.length), a = r.array, o = 0; o < e.length; o++)
                    a[o] = e.charCodeAt(o);
                return r
            }
            function J(t, e, n) {
                return new (e.getConstructor(t))(t,n)
            }
            function G(t, e, n, r) {
                var a = e.getInitializedClass(t, n);
                return J(t, a, r)
            }
            function K(t, e, n, r) {
                var a = e.getInitializedClass(t, n);
                return new (a.getConstructor(t))(t,r)
            }
            function H(t, e) {
                return new (e.getConstructor(t))(t)
            }
            function Y(t, e, n) {
                var r = e.getInitializedClass(t, n);
                return H(t, r)
            }
            function q(t, e, n) {
                return e.getInitializedClass(t, n).getConstructor(t)
            }
            function Z(t, e, n) {
                var r = J(t, e, 0);
                return r.array = n,
                r
            }
            function X(t, e, n, r) {
                var a = G(t, e, n, 0);
                return a.array = r,
                a
            }
            function $(t) {
                switch (t) {
                case "B":
                    return "Ljava/lang/Byte;";
                case "C":
                    return "Ljava/lang/Character;";
                case "D":
                    return "Ljava/lang/Double;";
                case "F":
                    return "Ljava/lang/Float;";
                case "I":
                    return "Ljava/lang/Integer;";
                case "J":
                    return "Ljava/lang/Long;";
                case "S":
                    return "Ljava/lang/Short;";
                case "Z":
                    return "Ljava/lang/Boolean;";
                case "V":
                    return "Ljava/lang/Void;";
                default:
                    throw new Error("Tried to box a non-primitive class: " + this.className)
                }
            }
            function Q(t, e, n) {
                var r = t.getBsCl().getInitializedClass(t, $(e))
                  , a = r.getConstructor(t);
                return a.box(n)
            }
            function tt(t, e, n, r, a, o) {
                void 0 === o && (o = 0);
                var s, i, l = L(n), u = J(t, e, l.length - (a ? 1 : 2) - o), c = 0, p = u.array;
                for (l.pop(),
                a || l.shift(),
                o > 0 && (l = l.slice(o),
                r = r.slice(o)),
                s = 0; s < l.length; s++) {
                    switch (i = l[s],
                    i[0]) {
                    case "[":
                    case "L":
                        p[s] = r[c];
                        break;
                    case "J":
                    case "D":
                        p[s] = Q(t, i, r[c]),
                        c++;
                        break;
                    default:
                        p[s] = Q(t, i, r[c])
                    }
                    c++
                }
                return u
            }
            function et(t) {
                return function(e, n) {
                    e ? t.throwException(e) : t.asyncReturn(n)
                }
            }
            var nt = n(8)
              , rt = n(9)
              , at = n(4)
              , ot = at.BFSRequire("bfs_utils");
            e.merge = a,
            e.are_in_browser = o,
            e.typedArraysSupported = "undefined" != typeof ArrayBuffer,
            e.jvmName2JSName = s,
            e.reescapeJVMName = i,
            e.asyncForEach = l,
            e.asyncSeries = u,
            e.asyncFind = c,
            Math.imul || (Math.imul = function(t, e) {
                var n = t >>> 16 & 65535
                  , r = 65535 & t
                  , a = e >>> 16 & 65535
                  , o = 65535 & e;
                return r * o + (n * o + r * a << 16 >>> 0) | 0
            }
            ),
            Math.expm1 || (Math.expm1 = function(t) {
                return Math.abs(t) < 1e-5 ? t + .5 * t * t : Math.exp(t) - 1
            }
            ),
            Math.sinh || (Math.sinh = function(t) {
                var e = Math.exp(t);
                return (e - 1 / e) / 2
            }
            ),
            Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
                if (null == this)
                    throw new TypeError;
                var n = Object(this)
                  , r = n.length >>> 0;
                if (0 === r)
                    return -1;
                var a = 0;
                if (void 0 !== e && (a = Number(e),
                a != a ? a = 0 : 0 != a && a != 1 / 0 && a != -(1 / 0) && (a = ((a > 0 ? 1 : 0) || -1) * Math.floor(Math.abs(a)))),
                a >= r)
                    return -1;
                for (var o = a >= 0 ? a : Math.max(r - Math.abs(a), 0); r > o; o++)
                    if (o in n && n[o] === t)
                        return o;
                return -1
            }
            ),
            e.checkAccess = p,
            e.float2int = h;
            var st = "undefined" != typeof ArrayBuffer;
            e.byteArray2Buffer = f,
            e.isUint8Array = d,
            e.isInt8Array = _,
            e.i82u8 = g,
            e.u82i8 = v,
            e.buff2i8 = m,
            e.wrapFloat = T,
            e.chars2jsStr = y,
            e.bytestr2Array = I,
            e.array2bytestr = E,
            function(t) {
                t[t.PUBLIC = 1] = "PUBLIC",
                t[t.PRIVATE = 2] = "PRIVATE",
                t[t.PROTECTED = 4] = "PROTECTED",
                t[t.STATIC = 8] = "STATIC",
                t[t.FINAL = 16] = "FINAL",
                t[t.SYNCHRONIZED = 32] = "SYNCHRONIZED",
                t[t.SUPER = 32] = "SUPER",
                t[t.VOLATILE = 64] = "VOLATILE",
                t[t.TRANSIENT = 128] = "TRANSIENT",
                t[t.VARARGS = 128] = "VARARGS",
                t[t.NATIVE = 256] = "NATIVE",
                t[t.INTERFACE = 512] = "INTERFACE",
                t[t.ABSTRACT = 1024] = "ABSTRACT",
                t[t.STRICT = 2048] = "STRICT"
            }(e.FlagMasks || (e.FlagMasks = {}));
            var it = e.FlagMasks
              , lt = function() {
                function t(t) {
                    this["byte"] = t
                }
                return t.prototype.isPublic = function() {
                    return (this["byte"] & it.PUBLIC) > 0
                }
                ,
                t.prototype.isPrivate = function() {
                    return (this["byte"] & it.PRIVATE) > 0
                }
                ,
                t.prototype.isProtected = function() {
                    return (this["byte"] & it.PROTECTED) > 0
                }
                ,
                t.prototype.isStatic = function() {
                    return (this["byte"] & it.STATIC) > 0
                }
                ,
                t.prototype.isFinal = function() {
                    return (this["byte"] & it.FINAL) > 0
                }
                ,
                t.prototype.isSynchronized = function() {
                    return (this["byte"] & it.SYNCHRONIZED) > 0
                }
                ,
                t.prototype.isSuper = function() {
                    return (this["byte"] & it.SUPER) > 0
                }
                ,
                t.prototype.isVolatile = function() {
                    return (this["byte"] & it.VOLATILE) > 0
                }
                ,
                t.prototype.isTransient = function() {
                    return (this["byte"] & it.TRANSIENT) > 0
                }
                ,
                t.prototype.isNative = function() {
                    return (this["byte"] & it.NATIVE) > 0
                }
                ,
                t.prototype.isInterface = function() {
                    return (this["byte"] & it.INTERFACE) > 0
                }
                ,
                t.prototype.isAbstract = function() {
                    return (this["byte"] & it.ABSTRACT) > 0
                }
                ,
                t.prototype.isStrict = function() {
                    return (this["byte"] & it.STRICT) > 0
                }
                ,
                t.prototype.setNative = function(t) {
                    t ? this["byte"] = this["byte"] | it.NATIVE : this["byte"] = this["byte"] & ~it.NATIVE
                }
                ,
                t.prototype.isVarArgs = function() {
                    return (this["byte"] & it.VARARGS) > 0
                }
                ,
                t.prototype.getRawByte = function() {
                    return this["byte"]
                }
                ,
                t
            }();
            e.Flags = lt,
            e.initialValue = A,
            e.ext_classname = S,
            e.int_classname = C,
            e.verify_int_classname = N,
            e.internal2external = {
                B: "byte",
                C: "char",
                D: "double",
                F: "float",
                I: "int",
                J: "long",
                S: "short",
                V: "void",
                Z: "boolean"
            },
            e.external2internal = {};
            for (var ut in e.internal2external)
                e.external2internal[e.internal2external[ut]] = ut;
            e.getTypes = L,
            e.get_component_type = b,
            e.is_array_type = O,
            e.is_primitive_type = w,
            e.is_reference_type = k,
            e.descriptor2typestr = R,
            e.carr2descriptor = F,
            e.typestr2descriptor = D,
            e.unboxArguments = M,
            e.createMethodType = B,
            e.getMethodDescriptorWordSize = j,
            e.getDescriptorString = U,
            e.getLoader = P,
            e.arraycopyNoCheck = x,
            e.arraycopyCheck = V,
            e.initString = z,
            e.initCarr = W,
            e.newArrayFromClass = J,
            e.newArray = G,
            e.multiNewArray = K,
            e.newObjectFromClass = H,
            e.newObject = Y,
            e.getStaticFields = q,
            e.newArrayFromDataWithClass = Z,
            e.newArrayFromData = X,
            e.boxClassName = $,
            e.boxPrimitiveValue = Q,
            e.boxArguments = tt,
            e.forwardResult = et
        }
        ).call(e, n(3), n(7))
    }
    , function(t, e, n) {
        var r = n(4);
        t.exports = r.BFSRequire("buffer").Buffer
    }
    , function(t, e) {
        "use strict";
        var n = function() {
            function t(t, e) {
                this.low_ = 0 | t,
                this.high_ = 0 | e
            }
            return t.fromInt = function(e) {
                if (e >= -128 && 128 > e) {
                    var n = t.IntCache_[e];
                    if (n)
                        return n
                }
                var r = new t(e,0 > e ? -1 : 0);
                return e >= -128 && 128 > e && (t.IntCache_[e] = r),
                r
            }
            ,
            t.fromNumber = function(e) {
                return isNaN(e) || !isFinite(e) ? t.ZERO : e <= -t.TWO_PWR_63_DBL_ ? t.MIN_VALUE : e + 1 >= t.TWO_PWR_63_DBL_ ? t.MAX_VALUE : 0 > e ? t.fromNumber(-e).negate() : new t(e % t.TWO_PWR_32_DBL_ | 0,e / t.TWO_PWR_32_DBL_ | 0)
            }
            ,
            t.fromBits = function(e, n) {
                return new t(e,n)
            }
            ,
            t.fromString = function(e, n) {
                if (0 == e.length)
                    throw Error("number format error: empty string");
                var r = n || 10;
                if (2 > r || r > 36)
                    throw Error("radix out of range: " + r);
                if ("-" == e.charAt(0))
                    return t.fromString(e.substring(1), r).negate();
                if (e.indexOf("-") >= 0)
                    throw Error('number format error: interior "-" character: ' + e);
                for (var a = t.fromNumber(Math.pow(r, 8)), o = t.ZERO, s = 0; s < e.length; s += 8) {
                    var i = Math.min(8, e.length - s)
                      , l = parseInt(e.substring(s, s + i), r);
                    if (8 > i) {
                        var u = t.fromNumber(Math.pow(r, i));
                        o = o.multiply(u).add(t.fromNumber(l))
                    } else
                        o = o.multiply(a),
                        o = o.add(t.fromNumber(l))
                }
                return o
            }
            ,
            t.prototype.toInt = function() {
                return this.low_
            }
            ,
            t.prototype.toNumber = function() {
                return this.high_ * t.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
            }
            ,
            t.prototype.toString = function(e) {
                var n = e || 10;
                if (2 > n || n > 36)
                    throw Error("radix out of range: " + n);
                if (this.isZero())
                    return "0";
                if (this.isNegative()) {
                    if (this.equals(t.MIN_VALUE)) {
                        var r = t.fromNumber(n)
                          , a = this.div(r)
                          , o = a.multiply(r).subtract(this);
                        return a.toString(n) + o.toInt().toString(n)
                    }
                    return "-" + this.negate().toString(n)
                }
                for (var s = t.fromNumber(Math.pow(n, 6)), o = this, i = ""; ; ) {
                    var l = o.div(s)
                      , u = o.subtract(l.multiply(s)).toInt()
                      , c = u.toString(n);
                    if (o = l,
                    o.isZero())
                        return c + i;
                    for (; c.length < 6; )
                        c = "0" + c;
                    i = "" + c + i
                }
            }
            ,
            t.prototype.getHighBits = function() {
                return this.high_
            }
            ,
            t.prototype.getLowBits = function() {
                return this.low_
            }
            ,
            t.prototype.getLowBitsUnsigned = function() {
                return this.low_ >= 0 ? this.low_ : t.TWO_PWR_32_DBL_ + this.low_
            }
            ,
            t.prototype.getNumBitsAbs = function() {
                if (this.isNegative())
                    return this.equals(t.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
                for (var e = 0 != this.high_ ? this.high_ : this.low_, n = 31; n > 0 && 0 == (e & 1 << n); n--)
                    ;
                return 0 != this.high_ ? n + 33 : n + 1
            }
            ,
            t.prototype.isZero = function() {
                return 0 == this.high_ && 0 == this.low_
            }
            ,
            t.prototype.isNegative = function() {
                return this.high_ < 0
            }
            ,
            t.prototype.isOdd = function() {
                return 1 == (1 & this.low_)
            }
            ,
            t.prototype.equals = function(t) {
                return this.high_ == t.high_ && this.low_ == t.low_
            }
            ,
            t.prototype.notEquals = function(t) {
                return this.high_ != t.high_ || this.low_ != t.low_
            }
            ,
            t.prototype.lessThan = function(t) {
                return this.compare(t) < 0
            }
            ,
            t.prototype.lessThanOrEqual = function(t) {
                return this.compare(t) <= 0
            }
            ,
            t.prototype.greaterThan = function(t) {
                return this.compare(t) > 0
            }
            ,
            t.prototype.greaterThanOrEqual = function(t) {
                return this.compare(t) >= 0
            }
            ,
            t.prototype.compare = function(t) {
                if (this.equals(t))
                    return 0;
                var e = this.isNegative()
                  , n = t.isNegative();
                return e && !n ? -1 : !e && n ? 1 : this.subtract(t).isNegative() ? -1 : 1
            }
            ,
            t.prototype.negate = function() {
                return this.equals(t.MIN_VALUE) ? t.MIN_VALUE : this.not().add(t.ONE)
            }
            ,
            t.prototype.add = function(e) {
                var n = this.high_ >>> 16
                  , r = 65535 & this.high_
                  , a = this.low_ >>> 16
                  , o = 65535 & this.low_
                  , s = e.high_ >>> 16
                  , i = 65535 & e.high_
                  , l = e.low_ >>> 16
                  , u = 65535 & e.low_
                  , c = 0
                  , p = 0
                  , h = 0
                  , f = 0;
                return f += o + u,
                h += f >>> 16,
                f &= 65535,
                h += a + l,
                p += h >>> 16,
                h &= 65535,
                p += r + i,
                c += p >>> 16,
                p &= 65535,
                c += n + s,
                c &= 65535,
                t.fromBits(h << 16 | f, c << 16 | p)
            }
            ,
            t.prototype.subtract = function(t) {
                return this.add(t.negate())
            }
            ,
            t.prototype.multiply = function(e) {
                if (this.isZero())
                    return t.ZERO;
                if (e.isZero())
                    return t.ZERO;
                if (this.equals(t.MIN_VALUE))
                    return e.isOdd() ? t.MIN_VALUE : t.ZERO;
                if (e.equals(t.MIN_VALUE))
                    return this.isOdd() ? t.MIN_VALUE : t.ZERO;
                if (this.isNegative())
                    return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
                if (e.isNegative())
                    return this.multiply(e.negate()).negate();
                if (this.lessThan(t.TWO_PWR_24_) && e.lessThan(t.TWO_PWR_24_))
                    return t.fromNumber(this.toNumber() * e.toNumber());
                var n = this.high_ >>> 16
                  , r = 65535 & this.high_
                  , a = this.low_ >>> 16
                  , o = 65535 & this.low_
                  , s = e.high_ >>> 16
                  , i = 65535 & e.high_
                  , l = e.low_ >>> 16
                  , u = 65535 & e.low_
                  , c = 0
                  , p = 0
                  , h = 0
                  , f = 0;
                return f += o * u,
                h += f >>> 16,
                f &= 65535,
                h += a * u,
                p += h >>> 16,
                h &= 65535,
                h += o * l,
                p += h >>> 16,
                h &= 65535,
                p += r * u,
                c += p >>> 16,
                p &= 65535,
                p += a * l,
                c += p >>> 16,
                p &= 65535,
                p += o * i,
                c += p >>> 16,
                p &= 65535,
                c += n * u + r * l + a * i + o * s,
                c &= 65535,
                t.fromBits(h << 16 | f, c << 16 | p)
            }
            ,
            t.prototype.div = function(e) {
                if (e.isZero())
                    throw Error("division by zero");
                if (this.isZero())
                    return t.ZERO;
                if (this.equals(t.MIN_VALUE)) {
                    if (e.equals(t.ONE) || e.equals(t.NEG_ONE))
                        return t.MIN_VALUE;
                    if (e.equals(t.MIN_VALUE))
                        return t.ONE;
                    var n = this.shiftRight(1)
                      , r = n.div(e).shiftLeft(1);
                    if (r.equals(t.ZERO))
                        return e.isNegative() ? t.ONE : t.NEG_ONE;
                    var a = this.subtract(e.multiply(r))
                      , o = r.add(a.div(e));
                    return o
                }
                if (e.equals(t.MIN_VALUE))
                    return t.ZERO;
                if (this.isNegative())
                    return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
                if (e.isNegative())
                    return this.div(e.negate()).negate();
                for (var s = t.ZERO, a = this; a.greaterThanOrEqual(e); ) {
                    var i = Math.max(1, Math.floor(a.toNumber() / e.toNumber()))
                      , l = Math.ceil(Math.log(i) / Math.LN2)
                      , u = 1;
                    l > 48 && (u = Math.pow(2, l - 48));
                    for (var c = t.fromNumber(i), p = c.multiply(e); p.isNegative() || p.greaterThan(a); )
                        i -= u,
                        c = t.fromNumber(i),
                        p = c.multiply(e);
                    c.isZero() && (c = t.ONE),
                    s = s.add(c),
                    a = a.subtract(p)
                }
                return s
            }
            ,
            t.prototype.modulo = function(t) {
                return this.subtract(this.div(t).multiply(t))
            }
            ,
            t.prototype.not = function() {
                return t.fromBits(~this.low_, ~this.high_)
            }
            ,
            t.prototype.and = function(e) {
                return t.fromBits(this.low_ & e.low_, this.high_ & e.high_)
            }
            ,
            t.prototype.or = function(e) {
                return t.fromBits(this.low_ | e.low_, this.high_ | e.high_)
            }
            ,
            t.prototype.xor = function(e) {
                return t.fromBits(this.low_ ^ e.low_, this.high_ ^ e.high_)
            }
            ,
            t.prototype.shiftLeft = function(e) {
                if (e &= 63,
                0 == e)
                    return this;
                var n = this.low_;
                if (32 > e) {
                    var r = this.high_;
                    return t.fromBits(n << e, r << e | n >>> 32 - e)
                }
                return t.fromBits(0, n << e - 32)
            }
            ,
            t.prototype.shiftRight = function(e) {
                if (e &= 63,
                0 == e)
                    return this;
                var n = this.high_;
                if (32 > e) {
                    var r = this.low_;
                    return t.fromBits(r >>> e | n << 32 - e, n >> e)
                }
                return t.fromBits(n >> e - 32, n >= 0 ? 0 : -1)
            }
            ,
            t.prototype.shiftRightUnsigned = function(e) {
                if (e &= 63,
                0 == e)
                    return this;
                var n = this.high_;
                if (32 > e) {
                    var r = this.low_;
                    return t.fromBits(r >>> e | n << 32 - e, n >>> e)
                }
                return 32 == e ? t.fromBits(n, 0) : t.fromBits(n >>> e - 32, 0)
            }
            ,
            t.IntCache_ = {},
            t.TWO_PWR_16_DBL_ = 65536,
            t.TWO_PWR_24_DBL_ = 1 << 24,
            t.TWO_PWR_32_DBL_ = t.TWO_PWR_16_DBL_ * t.TWO_PWR_16_DBL_,
            t.TWO_PWR_31_DBL_ = t.TWO_PWR_32_DBL_ / 2,
            t.TWO_PWR_48_DBL_ = t.TWO_PWR_32_DBL_ * t.TWO_PWR_16_DBL_,
            t.TWO_PWR_64_DBL_ = t.TWO_PWR_32_DBL_ * t.TWO_PWR_32_DBL_,
            t.TWO_PWR_63_DBL_ = t.TWO_PWR_64_DBL_ / 2,
            t.ZERO = t.fromInt(0),
            t.ONE = t.fromInt(1),
            t.NEG_ONE = t.fromInt(-1),
            t.MAX_VALUE = t.fromBits(4294967295, 2147483647),
            t.MIN_VALUE = t.fromBits(0, 2147483648),
            t.TWO_PWR_24_ = t.fromInt(t.TWO_PWR_24_DBL_),
            t
        }();
        t.exports = n
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            e.forEach(function(e) {
                o[e] = t
            })
        }
        !function(t) {
            t[t.NOT_LOADED = 0] = "NOT_LOADED",
            t[t.LOADED = 1] = "LOADED",
            t[t.RESOLVED = 2] = "RESOLVED",
            t[t.INITIALIZED = 3] = "INITIALIZED"
        }(e.ClassState || (e.ClassState = {}));
        e.ClassState;
        !function(t) {
            t[t.NEW = 0] = "NEW",
            t[t.RUNNABLE = 1] = "RUNNABLE",
            t[t.BLOCKED = 2] = "BLOCKED",
            t[t.UNINTERRUPTABLY_BLOCKED = 3] = "UNINTERRUPTABLY_BLOCKED",
            t[t.WAITING = 4] = "WAITING",
            t[t.TIMED_WAITING = 5] = "TIMED_WAITING",
            t[t.ASYNC_WAITING = 6] = "ASYNC_WAITING",
            t[t.PARKED = 7] = "PARKED",
            t[t.TERMINATED = 8] = "TERMINATED"
        }(e.ThreadStatus || (e.ThreadStatus = {}));
        e.ThreadStatus;
        !function(t) {
            t[t.ALIVE = 1] = "ALIVE",
            t[t.TERMINATED = 2] = "TERMINATED",
            t[t.RUNNABLE = 4] = "RUNNABLE",
            t[t.BLOCKED_ON_MONITOR_ENTER = 1024] = "BLOCKED_ON_MONITOR_ENTER",
            t[t.WAITING_INDEFINITELY = 16] = "WAITING_INDEFINITELY",
            t[t.WAITING_WITH_TIMEOUT = 32] = "WAITING_WITH_TIMEOUT"
        }(e.JVMTIThreadState || (e.JVMTIThreadState = {}));
        e.JVMTIThreadState;
        !function(t) {
            t[t.TRUE = 0] = "TRUE",
            t[t.FALSE = 1] = "FALSE",
            t[t.INDETERMINATE = 2] = "INDETERMINATE"
        }(e.TriState || (e.TriState = {}));
        e.TriState;
        !function(t) {
            t[t.BOOTING = 0] = "BOOTING",
            t[t.BOOTED = 1] = "BOOTED",
            t[t.RUNNING = 2] = "RUNNING",
            t[t.TERMINATING = 3] = "TERMINATING",
            t[t.TERMINATED = 4] = "TERMINATED"
        }(e.JVMStatus || (e.JVMStatus = {}));
        e.JVMStatus;
        !function(t) {
            t[t.INTERNAL = 0] = "INTERNAL",
            t[t.BYTECODE = 1] = "BYTECODE",
            t[t.NATIVE = 2] = "NATIVE"
        }(e.StackFrameType || (e.StackFrameType = {}));
        e.StackFrameType;
        !function(t) {
            t[t.INT_MAX = Math.pow(2, 31) - 1] = "INT_MAX",
            t[t.INT_MIN = -t.INT_MAX - 1] = "INT_MIN",
            t[t.FLOAT_POS_INFINITY = Math.pow(2, 128)] = "FLOAT_POS_INFINITY",
            t[t.FLOAT_NEG_INFINITY = -1 * t.FLOAT_POS_INFINITY] = "FLOAT_NEG_INFINITY",
            t[t.FLOAT_POS_INFINITY_AS_INT = 2139095040] = "FLOAT_POS_INFINITY_AS_INT",
            t[t.FLOAT_NEG_INFINITY_AS_INT = -8388608] = "FLOAT_NEG_INFINITY_AS_INT",
            t[t.FLOAT_NaN_AS_INT = 2143289344] = "FLOAT_NaN_AS_INT"
        }(e.Constants || (e.Constants = {}));
        e.Constants;
        !function(t) {
            t[t.CLASS = 7] = "CLASS",
            t[t.FIELDREF = 9] = "FIELDREF",
            t[t.METHODREF = 10] = "METHODREF",
            t[t.INTERFACE_METHODREF = 11] = "INTERFACE_METHODREF",
            t[t.STRING = 8] = "STRING",
            t[t.INTEGER = 3] = "INTEGER",
            t[t.FLOAT = 4] = "FLOAT",
            t[t.LONG = 5] = "LONG",
            t[t.DOUBLE = 6] = "DOUBLE",
            t[t.NAME_AND_TYPE = 12] = "NAME_AND_TYPE",
            t[t.UTF8 = 1] = "UTF8",
            t[t.METHOD_HANDLE = 15] = "METHOD_HANDLE",
            t[t.METHOD_TYPE = 16] = "METHOD_TYPE",
            t[t.INVOKE_DYNAMIC = 18] = "INVOKE_DYNAMIC"
        }(e.ConstantPoolItemType || (e.ConstantPoolItemType = {}));
        e.ConstantPoolItemType;
        !function(t) {
            t[t.SAME_FRAME = 0] = "SAME_FRAME",
            t[t.SAME_LOCALS_1_STACK_ITEM_FRAME = 1] = "SAME_LOCALS_1_STACK_ITEM_FRAME",
            t[t.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED = 2] = "SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED",
            t[t.CHOP_FRAME = 3] = "CHOP_FRAME",
            t[t.SAME_FRAME_EXTENDED = 4] = "SAME_FRAME_EXTENDED",
            t[t.APPEND_FRAME = 5] = "APPEND_FRAME",
            t[t.FULL_FRAME = 6] = "FULL_FRAME"
        }(e.StackMapTableEntryType || (e.StackMapTableEntryType = {}));
        e.StackMapTableEntryType;
        !function(t) {
            t[t.GETFIELD = 1] = "GETFIELD",
            t[t.GETSTATIC = 2] = "GETSTATIC",
            t[t.PUTFIELD = 3] = "PUTFIELD",
            t[t.PUTSTATIC = 4] = "PUTSTATIC",
            t[t.INVOKEVIRTUAL = 5] = "INVOKEVIRTUAL",
            t[t.INVOKESTATIC = 6] = "INVOKESTATIC",
            t[t.INVOKESPECIAL = 7] = "INVOKESPECIAL",
            t[t.NEWINVOKESPECIAL = 8] = "NEWINVOKESPECIAL",
            t[t.INVOKEINTERFACE = 9] = "INVOKEINTERFACE"
        }(e.MethodHandleReferenceKind || (e.MethodHandleReferenceKind = {}));
        e.MethodHandleReferenceKind;
        !function(t) {
            t[t.AALOAD = 50] = "AALOAD",
            t[t.AASTORE = 83] = "AASTORE",
            t[t.ACONST_NULL = 1] = "ACONST_NULL",
            t[t.ALOAD = 25] = "ALOAD",
            t[t.ALOAD_0 = 42] = "ALOAD_0",
            t[t.ALOAD_1 = 43] = "ALOAD_1",
            t[t.ALOAD_2 = 44] = "ALOAD_2",
            t[t.ALOAD_3 = 45] = "ALOAD_3",
            t[t.ANEWARRAY = 189] = "ANEWARRAY",
            t[t.ARETURN = 176] = "ARETURN",
            t[t.ARRAYLENGTH = 190] = "ARRAYLENGTH",
            t[t.ASTORE = 58] = "ASTORE",
            t[t.ASTORE_0 = 75] = "ASTORE_0",
            t[t.ASTORE_1 = 76] = "ASTORE_1",
            t[t.ASTORE_2 = 77] = "ASTORE_2",
            t[t.ASTORE_3 = 78] = "ASTORE_3",
            t[t.ATHROW = 191] = "ATHROW",
            t[t.BALOAD = 51] = "BALOAD",
            t[t.BASTORE = 84] = "BASTORE",
            t[t.BIPUSH = 16] = "BIPUSH",
            t[t.BREAKPOINT = 202] = "BREAKPOINT",
            t[t.CALOAD = 52] = "CALOAD",
            t[t.CASTORE = 85] = "CASTORE",
            t[t.CHECKCAST = 192] = "CHECKCAST",
            t[t.D2F = 144] = "D2F",
            t[t.D2I = 142] = "D2I",
            t[t.D2L = 143] = "D2L",
            t[t.DADD = 99] = "DADD",
            t[t.DALOAD = 49] = "DALOAD",
            t[t.DASTORE = 82] = "DASTORE",
            t[t.DCMPG = 152] = "DCMPG",
            t[t.DCMPL = 151] = "DCMPL",
            t[t.DCONST_0 = 14] = "DCONST_0",
            t[t.DCONST_1 = 15] = "DCONST_1",
            t[t.DDIV = 111] = "DDIV",
            t[t.DLOAD = 24] = "DLOAD",
            t[t.DLOAD_0 = 38] = "DLOAD_0",
            t[t.DLOAD_1 = 39] = "DLOAD_1",
            t[t.DLOAD_2 = 40] = "DLOAD_2",
            t[t.DLOAD_3 = 41] = "DLOAD_3",
            t[t.DMUL = 107] = "DMUL",
            t[t.DNEG = 119] = "DNEG",
            t[t.DREM = 115] = "DREM",
            t[t.DRETURN = 175] = "DRETURN",
            t[t.DSTORE = 57] = "DSTORE",
            t[t.DSTORE_0 = 71] = "DSTORE_0",
            t[t.DSTORE_1 = 72] = "DSTORE_1",
            t[t.DSTORE_2 = 73] = "DSTORE_2",
            t[t.DSTORE_3 = 74] = "DSTORE_3",
            t[t.DSUB = 103] = "DSUB",
            t[t.DUP = 89] = "DUP",
            t[t.DUP_X1 = 90] = "DUP_X1",
            t[t.DUP_X2 = 91] = "DUP_X2",
            t[t.DUP2 = 92] = "DUP2",
            t[t.DUP2_X1 = 93] = "DUP2_X1",
            t[t.DUP2_X2 = 94] = "DUP2_X2",
            t[t.F2D = 141] = "F2D",
            t[t.F2I = 139] = "F2I",
            t[t.F2L = 140] = "F2L",
            t[t.FADD = 98] = "FADD",
            t[t.FALOAD = 48] = "FALOAD",
            t[t.FASTORE = 81] = "FASTORE",
            t[t.FCMPG = 150] = "FCMPG",
            t[t.FCMPL = 149] = "FCMPL",
            t[t.FCONST_0 = 11] = "FCONST_0",
            t[t.FCONST_1 = 12] = "FCONST_1",
            t[t.FCONST_2 = 13] = "FCONST_2",
            t[t.FDIV = 110] = "FDIV",
            t[t.FLOAD = 23] = "FLOAD",
            t[t.FLOAD_0 = 34] = "FLOAD_0",
            t[t.FLOAD_1 = 35] = "FLOAD_1",
            t[t.FLOAD_2 = 36] = "FLOAD_2",
            t[t.FLOAD_3 = 37] = "FLOAD_3",
            t[t.FMUL = 106] = "FMUL",
            t[t.FNEG = 118] = "FNEG",
            t[t.FREM = 114] = "FREM",
            t[t.FRETURN = 174] = "FRETURN",
            t[t.FSTORE = 56] = "FSTORE",
            t[t.FSTORE_0 = 67] = "FSTORE_0",
            t[t.FSTORE_1 = 68] = "FSTORE_1",
            t[t.FSTORE_2 = 69] = "FSTORE_2",
            t[t.FSTORE_3 = 70] = "FSTORE_3",
            t[t.FSUB = 102] = "FSUB",
            t[t.GETFIELD = 180] = "GETFIELD",
            t[t.GETSTATIC = 178] = "GETSTATIC",
            t[t.GOTO = 167] = "GOTO",
            t[t.GOTO_W = 200] = "GOTO_W",
            t[t.I2B = 145] = "I2B",
            t[t.I2C = 146] = "I2C",
            t[t.I2D = 135] = "I2D",
            t[t.I2F = 134] = "I2F",
            t[t.I2L = 133] = "I2L",
            t[t.I2S = 147] = "I2S",
            t[t.IADD = 96] = "IADD",
            t[t.IALOAD = 46] = "IALOAD",
            t[t.IAND = 126] = "IAND",
            t[t.IASTORE = 79] = "IASTORE",
            t[t.ICONST_M1 = 2] = "ICONST_M1",
            t[t.ICONST_0 = 3] = "ICONST_0",
            t[t.ICONST_1 = 4] = "ICONST_1",
            t[t.ICONST_2 = 5] = "ICONST_2",
            t[t.ICONST_3 = 6] = "ICONST_3",
            t[t.ICONST_4 = 7] = "ICONST_4",
            t[t.ICONST_5 = 8] = "ICONST_5",
            t[t.IDIV = 108] = "IDIV",
            t[t.IF_ACMPEQ = 165] = "IF_ACMPEQ",
            t[t.IF_ACMPNE = 166] = "IF_ACMPNE",
            t[t.IF_ICMPEQ = 159] = "IF_ICMPEQ",
            t[t.IF_ICMPGE = 162] = "IF_ICMPGE",
            t[t.IF_ICMPGT = 163] = "IF_ICMPGT",
            t[t.IF_ICMPLE = 164] = "IF_ICMPLE",
            t[t.IF_ICMPLT = 161] = "IF_ICMPLT",
            t[t.IF_ICMPNE = 160] = "IF_ICMPNE",
            t[t.IFEQ = 153] = "IFEQ",
            t[t.IFGE = 156] = "IFGE",
            t[t.IFGT = 157] = "IFGT",
            t[t.IFLE = 158] = "IFLE",
            t[t.IFLT = 155] = "IFLT",
            t[t.IFNE = 154] = "IFNE",
            t[t.IFNONNULL = 199] = "IFNONNULL",
            t[t.IFNULL = 198] = "IFNULL",
            t[t.IINC = 132] = "IINC",
            t[t.ILOAD = 21] = "ILOAD",
            t[t.ILOAD_0 = 26] = "ILOAD_0",
            t[t.ILOAD_1 = 27] = "ILOAD_1",
            t[t.ILOAD_2 = 28] = "ILOAD_2",
            t[t.ILOAD_3 = 29] = "ILOAD_3",
            t[t.IMUL = 104] = "IMUL",
            t[t.INEG = 116] = "INEG",
            t[t.INSTANCEOF = 193] = "INSTANCEOF",
            t[t.INVOKEDYNAMIC = 186] = "INVOKEDYNAMIC",
            t[t.INVOKEINTERFACE = 185] = "INVOKEINTERFACE",
            t[t.INVOKESPECIAL = 183] = "INVOKESPECIAL",
            t[t.INVOKESTATIC = 184] = "INVOKESTATIC",
            t[t.INVOKEVIRTUAL = 182] = "INVOKEVIRTUAL",
            t[t.IOR = 128] = "IOR",
            t[t.IREM = 112] = "IREM",
            t[t.IRETURN = 172] = "IRETURN",
            t[t.ISHL = 120] = "ISHL",
            t[t.ISHR = 122] = "ISHR",
            t[t.ISTORE = 54] = "ISTORE",
            t[t.ISTORE_0 = 59] = "ISTORE_0",
            t[t.ISTORE_1 = 60] = "ISTORE_1",
            t[t.ISTORE_2 = 61] = "ISTORE_2",
            t[t.ISTORE_3 = 62] = "ISTORE_3",
            t[t.ISUB = 100] = "ISUB",
            t[t.IUSHR = 124] = "IUSHR",
            t[t.IXOR = 130] = "IXOR",
            t[t.JSR = 168] = "JSR",
            t[t.JSR_W = 201] = "JSR_W",
            t[t.L2D = 138] = "L2D",
            t[t.L2F = 137] = "L2F",
            t[t.L2I = 136] = "L2I",
            t[t.LADD = 97] = "LADD",
            t[t.LALOAD = 47] = "LALOAD",
            t[t.LAND = 127] = "LAND",
            t[t.LASTORE = 80] = "LASTORE",
            t[t.LCMP = 148] = "LCMP",
            t[t.LCONST_0 = 9] = "LCONST_0",
            t[t.LCONST_1 = 10] = "LCONST_1",
            t[t.LDC = 18] = "LDC",
            t[t.LDC_W = 19] = "LDC_W",
            t[t.LDC2_W = 20] = "LDC2_W",
            t[t.LDIV = 109] = "LDIV",
            t[t.LLOAD = 22] = "LLOAD",
            t[t.LLOAD_0 = 30] = "LLOAD_0",
            t[t.LLOAD_1 = 31] = "LLOAD_1",
            t[t.LLOAD_2 = 32] = "LLOAD_2",
            t[t.LLOAD_3 = 33] = "LLOAD_3",
            t[t.LMUL = 105] = "LMUL",
            t[t.LNEG = 117] = "LNEG",
            t[t.LOOKUPSWITCH = 171] = "LOOKUPSWITCH",
            t[t.LOR = 129] = "LOR",
            t[t.LREM = 113] = "LREM",
            t[t.LRETURN = 173] = "LRETURN",
            t[t.LSHL = 121] = "LSHL",
            t[t.LSHR = 123] = "LSHR",
            t[t.LSTORE = 55] = "LSTORE",
            t[t.LSTORE_0 = 63] = "LSTORE_0",
            t[t.LSTORE_1 = 64] = "LSTORE_1",
            t[t.LSTORE_2 = 65] = "LSTORE_2",
            t[t.LSTORE_3 = 66] = "LSTORE_3",
            t[t.LSUB = 101] = "LSUB",
            t[t.LUSHR = 125] = "LUSHR",
            t[t.LXOR = 131] = "LXOR",
            t[t.MONITORENTER = 194] = "MONITORENTER",
            t[t.MONITOREXIT = 195] = "MONITOREXIT",
            t[t.MULTIANEWARRAY = 197] = "MULTIANEWARRAY",
            t[t.NEW = 187] = "NEW",
            t[t.NEWARRAY = 188] = "NEWARRAY",
            t[t.NOP = 0] = "NOP",
            t[t.POP = 87] = "POP",
            t[t.POP2 = 88] = "POP2",
            t[t.PUTFIELD = 181] = "PUTFIELD",
            t[t.PUTSTATIC = 179] = "PUTSTATIC",
            t[t.RET = 169] = "RET",
            t[t.RETURN = 177] = "RETURN",
            t[t.SALOAD = 53] = "SALOAD",
            t[t.SASTORE = 86] = "SASTORE",
            t[t.SIPUSH = 17] = "SIPUSH",
            t[t.SWAP = 95] = "SWAP",
            t[t.TABLESWITCH = 170] = "TABLESWITCH",
            t[t.WIDE = 196] = "WIDE",
            t[t.GETSTATIC_FAST32 = 208] = "GETSTATIC_FAST32",
            t[t.GETSTATIC_FAST64 = 209] = "GETSTATIC_FAST64",
            t[t.NEW_FAST = 210] = "NEW_FAST",
            t[t.ANEWARRAY_FAST = 213] = "ANEWARRAY_FAST",
            t[t.CHECKCAST_FAST = 214] = "CHECKCAST_FAST",
            t[t.INSTANCEOF_FAST = 215] = "INSTANCEOF_FAST",
            t[t.MULTIANEWARRAY_FAST = 216] = "MULTIANEWARRAY_FAST",
            t[t.PUTSTATIC_FAST32 = 217] = "PUTSTATIC_FAST32",
            t[t.PUTSTATIC_FAST64 = 218] = "PUTSTATIC_FAST64",
            t[t.GETFIELD_FAST32 = 219] = "GETFIELD_FAST32",
            t[t.GETFIELD_FAST64 = 220] = "GETFIELD_FAST64",
            t[t.PUTFIELD_FAST32 = 221] = "PUTFIELD_FAST32",
            t[t.PUTFIELD_FAST64 = 222] = "PUTFIELD_FAST64",
            t[t.INVOKENONVIRTUAL_FAST = 223] = "INVOKENONVIRTUAL_FAST",
            t[t.INVOKESTATIC_FAST = 240] = "INVOKESTATIC_FAST",
            t[t.INVOKEVIRTUAL_FAST = 241] = "INVOKEVIRTUAL_FAST",
            t[t.INVOKEINTERFACE_FAST = 242] = "INVOKEINTERFACE_FAST",
            t[t.INVOKEHANDLE = 243] = "INVOKEHANDLE",
            t[t.INVOKEBASIC = 244] = "INVOKEBASIC",
            t[t.LINKTOSPECIAL = 245] = "LINKTOSPECIAL",
            t[t.LINKTOVIRTUAL = 247] = "LINKTOVIRTUAL",
            t[t.INVOKEDYNAMIC_FAST = 248] = "INVOKEDYNAMIC_FAST"
        }(e.OpCode || (e.OpCode = {}));
        var r = e.OpCode;
        !function(t) {
            t[t.OPCODE_ONLY = 0] = "OPCODE_ONLY",
            t[t.CONSTANT_POOL_UINT8 = 1] = "CONSTANT_POOL_UINT8",
            t[t.CONSTANT_POOL = 2] = "CONSTANT_POOL",
            t[t.CONSTANT_POOL_AND_UINT8_VALUE = 3] = "CONSTANT_POOL_AND_UINT8_VALUE",
            t[t.UINT8_VALUE = 4] = "UINT8_VALUE",
            t[t.UINT8_AND_INT8_VALUE = 5] = "UINT8_AND_INT8_VALUE",
            t[t.INT8_VALUE = 6] = "INT8_VALUE",
            t[t.INT16_VALUE = 7] = "INT16_VALUE",
            t[t.INT32_VALUE = 8] = "INT32_VALUE",
            t[t.ARRAY_TYPE = 9] = "ARRAY_TYPE",
            t[t.WIDE = 10] = "WIDE"
        }(e.OpcodeLayoutType || (e.OpcodeLayoutType = {}));
        var a = e.OpcodeLayoutType
          , o = new Array(255);
        !function() {
            for (var t = 0; 255 > t; t++)
                o[t] = a.OPCODE_ONLY
        }(),
        n(a.UINT8_VALUE, [r.ALOAD, r.ASTORE, r.DLOAD, r.DSTORE, r.FLOAD, r.FSTORE, r.ILOAD, r.ISTORE, r.LLOAD, r.LSTORE, r.RET]),
        n(a.CONSTANT_POOL_UINT8, [r.LDC]),
        n(a.CONSTANT_POOL, [r.LDC_W, r.LDC2_W, r.ANEWARRAY, r.CHECKCAST, r.GETFIELD, r.GETSTATIC, r.INSTANCEOF, r.INVOKEDYNAMIC, r.INVOKESPECIAL, r.INVOKESTATIC, r.INVOKEVIRTUAL, r.NEW, r.PUTFIELD, r.PUTSTATIC, r.MULTIANEWARRAY_FAST, r.INVOKENONVIRTUAL_FAST, r.INVOKESTATIC_FAST, r.CHECKCAST_FAST, r.NEW_FAST, r.ANEWARRAY_FAST, r.INSTANCEOF_FAST, r.GETSTATIC_FAST32, r.GETSTATIC_FAST64, r.PUTSTATIC_FAST32, r.PUTSTATIC_FAST64, r.PUTFIELD_FAST32, r.PUTFIELD_FAST64, r.GETFIELD_FAST32, r.GETFIELD_FAST64, r.INVOKEVIRTUAL_FAST]),
        n(a.CONSTANT_POOL_AND_UINT8_VALUE, [r.INVOKEINTERFACE, r.INVOKEINTERFACE_FAST, r.MULTIANEWARRAY]),
        n(a.INT8_VALUE, [r.BIPUSH]),
        n(a.INT16_VALUE, [r.SIPUSH, r.GOTO, r.IFGT, r.IFEQ, r.IFGE, r.IFLE, r.IFLT, r.IFNE, r.IFNULL, r.IFNONNULL, r.IF_ICMPLE, r.IF_ACMPEQ, r.IF_ACMPNE, r.IF_ICMPEQ, r.IF_ICMPGE, r.IF_ICMPGT, r.IF_ICMPLT, r.IF_ICMPNE, r.JSR]),
        n(a.INT32_VALUE, [r.GOTO_W, r.JSR_W]),
        n(a.UINT8_AND_INT8_VALUE, [r.IINC]),
        n(a.ARRAY_TYPE, [r.NEWARRAY]),
        e.OpcodeLayouts = o
    }
    , function(t, e) {
        "use strict";
        var n = function() {
            function t() {
                this.cache = Object.create(null)
            }
            return t.prototype.fixKey = function(t) {
                return ";" + t
            }
            ,
            t.prototype.get = function(t) {
                return t = this.fixKey(t),
                void 0 !== this.cache[t] ? this.cache[t] : void 0
            }
            ,
            t.prototype.has = function(t) {
                return void 0 !== this.get(t)
            }
            ,
            t.prototype.set = function(t, e) {
                this.cache[this.fixKey(t)] = e
            }
            ,
            t
        }();
        t.exports = n
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            return t = i.descriptor2typestr(t),
            h.hasOwnProperty(t) && h[t].hasOwnProperty(e) ? h[t][e] : null
        }
        function a(t) {
            return t.length > 0 ? "f.opStack.pushAll(" + t.join(",") + ");" : ""
        }
        function o() {
            for (var t = new Array(256), e = 0; 256 > e; e++)
                t[e] = e;
            t.sort(function(t, e) {
                return T[e] - T[t]
            });
            var n = t.slice(0, 24);
            console.log("Opcodes that closed a trace (number of times encountered):");
            for (var e = 0; e < n.length; e++) {
                var r = n[e];
                T[r] > 0 && console.log(u.OpCode[r], T[r])
            }
        }
        var s = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = n(6)
          , l = n(12)
          , u = (n(15),
        n(13),
        n(9))
          , c = n(18)
          , p = (n(14),
        n(19))
          , h = {
            "java/lang/ref/Reference": {
                "<clinit>()V": function(t) {}
            },
            "java/lang/System": {
                "loadLibrary(Ljava/lang/String;)V": function(t, e) {
                    var n = e.toString();
                    switch (n) {
                    case "zip":
                    case "net":
                    case "nio":
                    case "awt":
                    case "fontmanager":
                    case "management":
                        return;
                    default:
                        t.throwNewException("Ljava/lang/UnsatisfiedLinkError;", "no " + n + " in java.library.path")
                    }
                }
            },
            "java/lang/Terminator": {
                "setup()V": function(t) {}
            },
            "java/nio/charset/Charset$3": {
                "run()Ljava/lang/Object;": function(t, e) {
                    return null
                }
            },
            "sun/nio/fs/DefaultFileSystemProvider": {
                "create()Ljava/nio/file/spi/FileSystemProvider;": function(t) {
                    t.setStatus(u.ThreadStatus.ASYNC_WAITING);
                    var e = t.getBsCl().getInitializedClass(t, "Lsun/nio/fs/DefaultFileSystemProvider;")
                      , n = e.getConstructor(t);
                    n["createProvider(Ljava/lang/String;)Ljava/nio/file/spi/FileSystemProvider;"](t, [t.getJVM().internString("sun.nio.fs.LinuxFileSystemProvider")], i.forwardResult(t))
                }
            }
        }
          , f = function() {
            function t(t, e, n, r) {
                this.cls = t,
                this.slot = n,
                this.accessFlags = new i.Flags(r.getUint16()),
                this.name = e.get(r.getUint16()).value,
                this.rawDescriptor = e.get(r.getUint16()).value,
                this.attrs = l.makeAttributes(r, e)
            }
            return t.prototype.getAttribute = function(t) {
                for (var e = 0; e < this.attrs.length; e++) {
                    var n = this.attrs[e];
                    if (n.getName() === t)
                        return n
                }
                return null
            }
            ,
            t.prototype.getAttributes = function(t) {
                return this.attrs.filter(function(e) {
                    return e.getName() === t
                })
            }
            ,
            t.prototype.getAnnotationType = function(t, e) {
                var n = this.getAttribute(e);
                if (null === n)
                    return null;
                var r, a = t.getBsCl().getInitializedClass(t, "[B").getConstructor(t), o = new a(t,0), s = n.rawBytes.length, i = new Array(s);
                for (r = 0; s > r; r++)
                    i[r] = n.rawBytes.readInt8(r);
                return o.array = i,
                o
            }
            ,
            t.prototype.parseDescriptor = function(t) {
                throw new Error("Unimplemented error.")
            }
            ,
            t
        }();
        e.AbstractMethodField = f;
        var d = function(t) {
            function e(e, n, r, a) {
                t.call(this, e, n, r, a),
                this.fullName = i.descriptor2typestr(e.getInternalName()) + "/" + this.name
            }
            return s(e, t),
            e.prototype.reflector = function(t, e) {
                var n = this
                  , r = this.getAttribute("Signature")
                  , a = t.getJVM()
                  , o = t.getBsCl()
                  , s = function(e) {
                    var s = o.getInitializedClass(t, "Ljava/lang/reflect/Field;")
                      , l = new (s.getConstructor(t))(t);
                    return l["java/lang/reflect/Field/clazz"] = n.cls.getClassObject(t),
                    l["java/lang/reflect/Field/name"] = a.internString(n.name),
                    l["java/lang/reflect/Field/type"] = e,
                    l["java/lang/reflect/Field/modifiers"] = n.accessFlags.getRawByte(),
                    l["java/lang/reflect/Field/slot"] = n.slot,
                    l["java/lang/reflect/Field/signature"] = null !== r ? i.initString(o, r.sig) : null,
                    l["java/lang/reflect/Field/annotations"] = n.getAnnotationType(t, "RuntimeVisibleAnnotations"),
                    l
                };
                this.cls.getLoader().resolveClass(t, this.rawDescriptor, function(n) {
                    e(null != n ? s(n.getClassObject(t)) : null)
                })
            }
            ,
            e.prototype.getDefaultFieldValue = function() {
                var t = this.rawDescriptor;
                if ("J" === t)
                    return "gLongZero";
                var e = t[0];
                return "[" === e || "L" === e ? "null" : "0"
            }
            ,
            e.prototype.outputJavaScriptField = function(t, e) {
                this.accessFlags.isStatic() ? e.write(t + '["' + i.reescapeJVMName(this.fullName) + '"] = cls._getInitialStaticFieldValue(thread, "' + i.reescapeJVMName(this.name) + '");\n') : e.write('this["' + i.reescapeJVMName(this.fullName) + '"] = ' + this.getDefaultFieldValue() + ";\n")
            }
            ,
            e
        }(f);
        e.Field = d;
        var _ = function() {
            var t = []
              , e = u.OpcodeLayoutType;
            return t[e.OPCODE_ONLY] = 1,
            t[e.CONSTANT_POOL_UINT8] = 2,
            t[e.CONSTANT_POOL] = 3,
            t[e.CONSTANT_POOL_AND_UINT8_VALUE] = 4,
            t[e.UINT8_VALUE] = 2,
            t[e.UINT8_AND_INT8_VALUE] = 3,
            t[e.INT8_VALUE] = 2,
            t[e.INT16_VALUE] = 3,
            t[e.INT32_VALUE] = 5,
            t[e.ARRAY_TYPE] = 2,
            t[e.WIDE] = 1,
            t
        }()
          , g = function() {
            function t(t, e) {
                this.pc = t,
                this.jitInfo = e,
                this.pops = [],
                this.pushes = [],
                this.prefixEmit = ""
            }
            return t
        }()
          , v = function() {
            function t(t, e, n) {
                this.startPC = t,
                this.code = e,
                this.method = n,
                this.infos = [],
                this.endPc = -1
            }
            return t.prototype.emitEndPC = function(t) {
                this.endPc = t
            }
            ,
            t.prototype.addOp = function(t, e) {
                this.infos.push(new g(t,e))
            }
            ,
            t.prototype.close = function(t) {
                if (this.infos.length > 1) {
                    for (var e = [], n = 0, r = this.endPc > -1 ? "f.pc=" + this.endPc + ";" : "", a = 0; a < this.infos.length; a++) {
                        for (var o = this.infos[a], s = o.jitInfo, i = o.pops, l = s.pops < 0 ? Math.min(-s.pops, e.length) : s.pops, u = 0; l > u; u++)
                            if (e.length > 0)
                                i.push(e.pop());
                            else {
                                var c = "s" + n++;
                                o.prefixEmit += "var " + c + " = f.opStack.pop();",
                                i.push(c)
                            }
                        o.onErrorPushes = e.slice();
                        for (var p = o.pushes, u = 0; u < s.pushes; u++) {
                            var c = "s" + n++;
                            e.push(c),
                            p.push(c)
                        }
                    }
                    1 === e.length ? r += "f.opStack.push(" + e[0] + ");" : e.length > 1 && (r += "f.opStack.pushAll(" + e.join(",") + ");");
                    for (var a = this.infos.length - 1; a >= 0; a--) {
                        var o = this.infos[a]
                          , s = o.jitInfo;
                        r = o.prefixEmit + s.emit(o.pops, o.pushes, "" + a, r, this.code, o.pc, o.onErrorPushes, this.method)
                    }
                    return new Function("f","t","u",r)
                }
                return null
            }
            ,
            t
        }()
          , m = function(t) {
            function e(e, n, a, o) {
                t.call(this, e, n, a, o),
                this.numBBEntries = 0,
                this.compiledFunctions = [],
                this.failedCompile = [];
                var s, l, u = i.getTypes(this.rawDescriptor);
                for (this.signature = this.name + this.rawDescriptor,
                this.fullSignature = i.descriptor2typestr(this.cls.getInternalName()) + "/" + this.signature,
                this.returnType = u.pop(),
                this.parameterTypes = u,
                this.parameterWords = u.length,
                s = 0; s < this.parameterTypes.length; s++)
                    l = this.parameterTypes[s],
                    "D" !== l && "J" !== l || this.parameterWords++;
                var c = this.cls.getInternalName();
                if (null !== r(c, this.signature))
                    this.code = r(c, this.signature),
                    this.accessFlags.setNative(!0);
                else if (this.accessFlags.isNative())
                    if (this.signature.indexOf("registerNatives()V", 0) < 0 && this.signature.indexOf("initIDs()V", 0) < 0) {
                        var p = this;
                        this.code = function(t) {
                            var e = t.getJVM()
                              , n = e.getNative(c, p.signature);
                            return null != n ? (p.code = n,
                            n.apply(p, arguments)) : void t.throwNewException("Ljava/lang/UnsatisfiedLinkError;", "Native method '" + p.getFullSignature() + "' not implemented.\nPlease fix or file a bug at https://github.com/plasma-umass/doppio/issues")
                        }
                    } else
                        this.code = function() {}
                        ;
                else if (!this.accessFlags.isAbstract()) {
                    this.code = this.getAttribute("Code");
                    var h = this.code.code.length;
                    this.numBBEntries = h > 3 ? 200 : 1e3 * h
                }
            }
            return s(e, t),
            e.prototype.incrBBEntries = function() {
                this.numBBEntries--
            }
            ,
            e.prototype.isDefault = function() {
                return this.accessFlags.isPublic() && !this.accessFlags.isAbstract() && !this.accessFlags.isStatic() && this.cls.accessFlags.isInterface()
            }
            ,
            e.prototype.getFullSignature = function() {
                return this.cls.getExternalName() + "." + this.name + this.rawDescriptor
            }
            ,
            e.prototype.isHidden = function() {
                var t = this.getAttribute("RuntimeVisibleAnnotations");
                return null !== t && t.isHidden
            }
            ,
            e.prototype.isCallerSensitive = function() {
                var t = this.getAttribute("RuntimeVisibleAnnotations");
                return null !== t && t.isCallerSensitive
            }
            ,
            e.prototype.getParamWordSize = function() {
                return this.parameterWords
            }
            ,
            e.prototype.getCodeAttribute = function() {
                return this.code
            }
            ,
            e.prototype.getOp = function(t, e, n) {
                if (this.numBBEntries <= 0 && !this.failedCompile[t]) {
                    var r = this.compiledFunctions[t];
                    if (r)
                        return r;
                    var a = this.jitCompileFrom(t, n);
                    if (a)
                        return a;
                    this.failedCompile[t] = !0
                }
                return e.readUInt8(t)
            }
            ,
            e.prototype.makeInvokeStaticJitInfo = function(t, e) {
                var n = t.readUInt16BE(e + 1)
                  , r = this.cls.constantPool.get(n)
                  , a = r.paramWordSize;
                return r.jsConstructor[r.fullSignature],
                {
                    hasBranch: !0,
                    pops: -a,
                    pushes: 0,
                    emit: function(t, r, o, s) {
                        var i = a > t.length ? "f.opStack.sliceAndDropFromTop(" + (a - t.length) + ");" : "[" + t.reduce(function(t, e) {
                            return e + "," + t
                        }, "") + "];"
                          , l = "var args" + o + "=" + i;
                        return a > t.length && t.length > 0 && (l += "args" + o + ".push(" + t.slice().reverse().join(",") + ");"),
                        l + ("\nvar methodReference" + o + "=f.method.cls.constantPool.get(" + n + ");\nf.pc=" + e + ";\nmethodReference" + o + ".jsConstructor[methodReference" + o + ".fullSignature](t,args" + o + ");\nf.returnToThreadLoop=true;\n" + s)
                    }
                }
            }
            ,
            e.prototype.makeInvokeVirtualJitInfo = function(t, e) {
                var n = t.readUInt16BE(e + 1)
                  , r = this.cls.constantPool.get(n)
                  , o = r.paramWordSize;
                return {
                    hasBranch: !0,
                    pops: -(o + 1),
                    pushes: 0,
                    emit: function(t, e, n, s, i, l, u) {
                        var c = a(u)
                          , p = o > t.length ? "f.opStack.sliceAndDropFromTop(" + (o - t.length) + ");" : "[" + t.slice(0, o).reduce(function(t, e) {
                            return e + "," + t
                        }, "") + "];"
                          , h = "var args" + n + "=" + p;
                        return o > t.length && t.length > 0 && (h += "args" + n + ".push(" + t.slice().reverse().join(",") + ");"),
                        h + ("var obj" + n + "=" + (o + 1 === t.length ? t[o] : "f.opStack.pop()") + ";f.pc=" + l + ";\nif(!u.isNull(t,f,obj" + n + ")){obj" + n + "['" + r.signature + "'](t,args" + n + ");f.returnToThreadLoop=true;" + s + "}else{" + c + "}")
                    }
                }
            }
            ,
            e.prototype.makeInvokeNonVirtualJitInfo = function(t, e) {
                var n = t.readUInt16BE(e + 1)
                  , r = this.cls.constantPool.get(n)
                  , o = r.paramWordSize;
                return {
                    hasBranch: !0,
                    pops: -(o + 1),
                    pushes: 0,
                    emit: function(t, e, n, s, i, l, u) {
                        var c = a(u)
                          , p = o > t.length ? "f.opStack.sliceAndDropFromTop(" + (o - t.length) + ");" : "[" + t.slice(0, o).reduce(function(t, e) {
                            return e + "," + t
                        }, "") + "];"
                          , h = "var args" + n + "=" + p;
                        return o > t.length && t.length > 0 && (h += "args" + n + ".push(" + t.slice().reverse().join(",") + ");"),
                        h + ("var obj" + n + "=" + (o + 1 === t.length ? t[o] : "f.opStack.pop()") + ";f.pc=" + l + ";\nif(!u.isNull(t,f,obj" + n + ")){obj" + n + "['" + r.fullSignature + "'](t, args" + n + ");f.returnToThreadLoop=true;" + s + "}else{" + c + "}")
                    }
                }
            }
            ,
            e.prototype.jitCompileFrom = function(t, e) {
                function n() {
                    if (null !== a) {
                        var t = a.close(e);
                        t && (o.compiledFunctions[a.startPC] = t),
                        a = null
                    }
                    s = !0
                }
                for (var r = this.getCodeAttribute().getCode(), a = null, o = this, s = !1, i = t; i < r.length && !s; ) {
                    var l = r.readUInt8(i)
                      , c = p.opJitInfo[l];
                    if (c)
                        null === a && (a = new v(i,r,o)),
                        a.addOp(i, c),
                        c.hasBranch && (this.failedCompile[i] = !0,
                        n());
                    else if (l === u.OpCode.INVOKESTATIC_FAST && null !== a) {
                        var h = this.makeInvokeStaticJitInfo(r, i);
                        a.addOp(i, h),
                        this.failedCompile[i] = !0,
                        n()
                    } else if (l !== u.OpCode.INVOKEVIRTUAL_FAST && l !== u.OpCode.INVOKEINTERFACE_FAST || null === a)
                        if (l === u.OpCode.INVOKENONVIRTUAL_FAST && null !== a) {
                            var h = this.makeInvokeNonVirtualJitInfo(r, i);
                            a.addOp(i, h),
                            this.failedCompile[i] = !0,
                            n()
                        } else
                            this.failedCompile[i] = !0,
                            a && a.emitEndPC(i),
                            n();
                    else {
                        var h = this.makeInvokeVirtualJitInfo(r, i);
                        a.addOp(i, h),
                        this.failedCompile[i] = !0,
                        n()
                    }
                    i += _[u.OpcodeLayouts[l]]
                }
                return o.compiledFunctions[t]
            }
            ,
            e.prototype.getNativeFunction = function() {
                return this.code
            }
            ,
            e.prototype._resolveReferencedClasses = function(t, e) {
                var n = this.parameterTypes.concat(this.returnType)
                  , r = this.code
                  , a = this.getAttribute("Exceptions");
                !this.accessFlags.isNative() && !this.accessFlags.isAbstract() && r.exceptionHandlers.length > 0 && (n.push("Ljava/lang/Throwable;"),
                n = n.concat(r.exceptionHandlers.filter(function(t) {
                    return "<any>" !== t.catchType
                }).map(function(t) {
                    return t.catchType
                }))),
                null !== a && (n = n.concat(a.exceptions)),
                this.cls.getLoader().resolveClasses(t, n, function(n) {
                    t.getBsCl().resolveClasses(t, ["Ljava/lang/reflect/Method;", "Ljava/lang/reflect/Constructor;"], function(t) {
                        null === n || null === t ? e(null) : (n["Ljava/lang/reflect/Method;"] = t["Ljava/lang/reflect/Method;"],
                        n["Ljava/lang/reflect/Constructor;"] = t["Ljava/lang/reflect/Constructor;"],
                        e(n))
                    })
                })
            }
            ,
            e.prototype.reflector = function(t, e) {
                var n = this
                  , r = t.getBsCl()
                  , a = r.getInitializedClass(t, "[Ljava/lang/Class;").getConstructor(t)
                  , o = t.getJVM()
                  , s = this.getAttribute("Signature")
                  , i = this.getAttribute("Exceptions");
                this._resolveReferencedClasses(t, function(r) {
                    if (null === r)
                        return e(null);
                    var l = n.cls.getClassObject(t)
                      , u = o.internString(n.name)
                      , c = new a(t,0)
                      , p = r[n.returnType].getClassObject(t)
                      , h = new a(t,0)
                      , f = n.accessFlags.getRawByte()
                      , d = null !== s ? o.internString(s.sig) : null;
                    if (c.array = n.parameterTypes.map(function(e) {
                        return r[e].getClassObject(t)
                    }),
                    null !== i && (h.array = i.exceptions.map(function(e) {
                        return r[e].getClassObject(t)
                    })),
                    "<init>" === n.name) {
                        var _ = r["Ljava/lang/reflect/Constructor;"].getConstructor(t)
                          , g = new _(t);
                        g["java/lang/reflect/Constructor/clazz"] = l,
                        g["java/lang/reflect/Constructor/parameterTypes"] = c,
                        g["java/lang/reflect/Constructor/exceptionTypes"] = h,
                        g["java/lang/reflect/Constructor/modifiers"] = f,
                        g["java/lang/reflect/Constructor/slot"] = n.slot,
                        g["java/lang/reflect/Constructor/signature"] = d,
                        g["java/lang/reflect/Constructor/annotations"] = n.getAnnotationType(t, "RuntimeVisibleAnnotations"),
                        g["java/lang/reflect/Constructor/parameterAnnotations"] = n.getAnnotationType(t, "RuntimeVisibleParameterAnnotations"),
                        e(g)
                    } else {
                        var v = r["Ljava/lang/reflect/Method;"].getConstructor(t)
                          , m = new v(t);
                        m["java/lang/reflect/Method/clazz"] = l,
                        m["java/lang/reflect/Method/name"] = u,
                        m["java/lang/reflect/Method/parameterTypes"] = c,
                        m["java/lang/reflect/Method/returnType"] = p,
                        m["java/lang/reflect/Method/exceptionTypes"] = h,
                        m["java/lang/reflect/Method/modifiers"] = f,
                        m["java/lang/reflect/Method/slot"] = n.slot,
                        m["java/lang/reflect/Method/signature"] = d,
                        m["java/lang/reflect/Method/annotations"] = n.getAnnotationType(t, "RuntimeVisibleAnnotations"),
                        m["java/lang/reflect/Method/annotationDefault"] = n.getAnnotationType(t, "AnnotationDefault"),
                        m["java/lang/reflect/Method/parameterAnnotations"] = n.getAnnotationType(t, "RuntimeVisibleParameterAnnotations"),
                        e(m)
                    }
                })
            }
            ,
            e.prototype.convertArgs = function(t, e) {
                if (this.isSignaturePolymorphic())
                    return e.unshift(t),
                    e;
                var n, r = [t], a = 0;
                for (this.accessFlags.isStatic() || (r.push(e[0]),
                a = 1),
                n = 0; n < this.parameterTypes.length; n++) {
                    var o = this.parameterTypes[n];
                    r.push(e[a]),
                    a += "J" === o || "D" === o ? 2 : 1
                }
                return r
            }
            ,
            e.prototype.methodLock = function(t, e) {
                return this.accessFlags.isStatic() ? this.cls.getClassObject(t).getMonitor() : e.locals[0].getMonitor()
            }
            ,
            e.prototype.isSignaturePolymorphic = function() {
                return "Ljava/lang/invoke/MethodHandle;" === this.cls.getInternalName() && this.accessFlags.isNative() && this.accessFlags.isVarArgs() && "([Ljava/lang/Object;)Ljava/lang/Object;" === this.rawDescriptor
            }
            ,
            e.prototype.getVMTargetBridgeMethod = function(t, e) {
                var n = new c
                  , r = !(e === u.MethodHandleReferenceKind.INVOKESTATIC || e === u.MethodHandleReferenceKind.INVOKESPECIAL);
                this.accessFlags.isStatic() && n.write("var jsCons = cls.getConstructor(thread);\n"),
                n.write("function bridgeMethod(thread, descriptor, args, cb) {\n"),
                this.accessFlags.isStatic() ? n.write('  jsCons["' + i.reescapeJVMName(this.fullSignature) + '"](thread, ') : (n.write("  var obj = args.shift();\n"),
                n.write("  if (obj === null) { return thread.throwNewException('Ljava/lang/NullPointerException;', ''); }\n"),
                n.write('  obj["' + i.reescapeJVMName(r ? this.signature : this.fullSignature) + '"](thread, ')),
                n.write("args"),
                n.write(", cb);\n  }\n  return bridgeMethod;");
                var a = n.flush();
                return new Function("thread","cls","util",a)(t, this.cls, i)
            }
            ,
            e.prototype.outputJavaScriptFunction = function(t, e, n) {
                void 0 === n && (n = !1);
                var r;
                if (this.accessFlags.isStatic() ? e.write(t + '["' + i.reescapeJVMName(this.fullSignature) + '"] = ' + t + '["' + i.reescapeJVMName(this.signature) + '"] = ') : (n || e.write(t + '.prototype["' + i.reescapeJVMName(this.signature) + '"] = '),
                e.write(t + '.prototype["' + i.reescapeJVMName(this.fullSignature) + '"] = ')),
                e.write("(function(method) {\n  return function(thread, args, cb) {\n    if (typeof cb === 'function') {\n      thread.stack.push(new InternalStackFrame(cb));\n    }\n    thread.stack.push(new " + (this.accessFlags.isNative() ? "NativeStackFrame" : "BytecodeStackFrame") + "(method, "),
                this.accessFlags.isStatic())
                    this.parameterWords > 0 ? e.write("args") : e.write("[]");
                else {
                    for (e.write("[this"),
                    r = 0; r < this.parameterWords; r++)
                        e.write(", args[" + r + "]");
                    e.write("]")
                }
                e.write("));\n    thread.setStatus(" + u.ThreadStatus.RUNNABLE + ');\n  };\n})(cls.getSpecificMethod("' + i.reescapeJVMName(this.cls.getInternalName()) + '", "' + i.reescapeJVMName(this.signature) + '"));\n')
            }
            ,
            e
        }(f);
        e.Method = m;
        var T = new Array(256);
        e.dumpStats = o
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            for (var n = {
                Code: i,
                LineNumberTable: l,
                SourceFile: u,
                StackMapTable: c,
                LocalVariableTable: p,
                LocalVariableTypeTable: h,
                ConstantValue: _,
                Exceptions: f,
                InnerClasses: d,
                Synthetic: g,
                Deprecated: v,
                Signature: m,
                RuntimeVisibleAnnotations: T,
                AnnotationDefault: y,
                EnclosingMethod: I,
                BootstrapMethods: E,
                RuntimeVisibleParameterAnnotations: A
            }, r = t.getUint16(), a = [], o = 0; r > o; o++) {
                var s = e.get(t.getUint16()).value
                  , S = t.getUint32();
                if (null != n[s]) {
                    var C = t.size()
                      , N = n[s].parse(t, e, S, s)
                      , L = t.size();
                    C - L !== S && t.skip(S - C + L),
                    a.push(N)
                } else
                    t.skip(S)
            }
            return a
        }
        var a = n(6)
          , o = n(9)
          , s = (n(13),
        n(14),
        function() {
            function t(t, e, n, r) {
                this.startPC = t,
                this.endPC = e,
                this.handlerPC = n,
                this.catchType = r
            }
            return t.prototype.getName = function() {
                return "ExceptionHandler"
            }
            ,
            t.parse = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = t.getUint16()
                  , o = t.getUint16()
                  , s = 0 === o ? "<any>" : e.get(o).name;
                return new this(n,r,a,s)
            }
            ,
            t
        }());
        e.ExceptionHandler = s;
        var i = function() {
            function t(t, e, n, r, a) {
                this.maxStack = t,
                this.maxLocals = e,
                this.exceptionHandlers = n,
                this.attrs = r,
                this.code = a
            }
            return t.prototype.getName = function() {
                return "Code"
            }
            ,
            t.prototype.getMaxStack = function() {
                return this.maxStack
            }
            ,
            t.parse = function(t, e) {
                var n = t.getUint16()
                  , a = t.getUint16()
                  , o = t.getUint32();
                if (0 === o)
                    throw "Error parsing code: Code length is zero";
                for (var i = t.slice(o).getBuffer(), l = t.getUint16(), u = [], c = 0; l > c; c++)
                    u.push(s.parse(t, e));
                var p = r(t, e);
                return new this(n,a,u,p,i)
            }
            ,
            t.prototype.getCode = function() {
                return this.code
            }
            ,
            t.prototype.getAttribute = function(t) {
                for (var e = 0; e < this.attrs.length; e++) {
                    var n = this.attrs[e];
                    if (n.getName() === t)
                        return n
                }
                return null
            }
            ,
            t
        }();
        e.Code = i;
        var l = function() {
            function t(t) {
                this.entries = t
            }
            return t.prototype.getName = function() {
                return "LineNumberTable"
            }
            ,
            t.prototype.getLineNumber = function(t) {
                var e, n = -1;
                for (e = 0; e < this.entries.length; e++) {
                    var r = this.entries[e];
                    if (!(r.startPC <= t))
                        break;
                    n = r.lineNumber
                }
                return n
            }
            ,
            t.parse = function(t, e) {
                for (var n = [], r = t.getUint16(), a = 0; r > a; a++) {
                    var o = t.getUint16()
                      , s = t.getUint16();
                    n.push({
                        startPC: o,
                        lineNumber: s
                    })
                }
                return new this(n)
            }
            ,
            t
        }();
        e.LineNumberTable = l;
        var u = function() {
            function t(t) {
                this.filename = t
            }
            return t.prototype.getName = function() {
                return "SourceFile"
            }
            ,
            t.parse = function(t, e) {
                return new this(e.get(t.getUint16()).value);
            }
            ,
            t
        }();
        e.SourceFile = u;
        var c = function() {
            function t(t) {
                this.entries = t
            }
            return t.prototype.getName = function() {
                return "StackMapTable"
            }
            ,
            t.parse = function(t, e) {
                for (var n = t.getUint16(), r = [], a = 0; n > a; a++)
                    r.push(this.parseEntry(t, e));
                return new this(r)
            }
            ,
            t.parseEntry = function(t, e) {
                var n, r, a, s = t.getUint8();
                if (64 > s)
                    return {
                        type: o.StackMapTableEntryType.SAME_FRAME,
                        offsetDelta: s
                    };
                if (128 > s)
                    return {
                        type: o.StackMapTableEntryType.SAME_LOCALS_1_STACK_ITEM_FRAME,
                        offsetDelta: s - 64,
                        stack: [this.parseVerificationTypeInfo(t, e)]
                    };
                if (247 > s)
                    ;
                else {
                    if (247 === s)
                        return {
                            type: o.StackMapTableEntryType.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED,
                            offsetDelta: t.getUint16(),
                            stack: [this.parseVerificationTypeInfo(t, e)]
                        };
                    if (251 > s)
                        return {
                            type: o.StackMapTableEntryType.CHOP_FRAME,
                            offsetDelta: t.getUint16(),
                            k: 251 - s
                        };
                    if (251 === s)
                        return {
                            type: o.StackMapTableEntryType.SAME_FRAME_EXTENDED,
                            offsetDelta: t.getUint16()
                        };
                    if (255 > s) {
                        for (r = t.getUint16(),
                        n = [],
                        a = 0; s - 251 > a; a++)
                            n.push(this.parseVerificationTypeInfo(t, e));
                        return {
                            type: o.StackMapTableEntryType.APPEND_FRAME,
                            offsetDelta: r,
                            locals: n
                        }
                    }
                    if (255 === s) {
                        r = t.getUint16();
                        var i = t.getUint16();
                        for (n = [],
                        a = 0; i > a; a++)
                            n.push(this.parseVerificationTypeInfo(t, e));
                        var l = t.getUint16()
                          , u = [];
                        for (a = 0; l > a; a++)
                            u.push(this.parseVerificationTypeInfo(t, e));
                        return {
                            type: o.StackMapTableEntryType.FULL_FRAME,
                            offsetDelta: r,
                            numLocals: i,
                            locals: n,
                            numStackItems: l,
                            stack: u
                        }
                    }
                }
            }
            ,
            t.parseVerificationTypeInfo = function(t, e) {
                var n = t.getUint8();
                if (7 === n) {
                    var r = e.get(t.getUint16()).name;
                    return "class " + (/\w/.test(r[0]) ? a.descriptor2typestr(r) : '"' + r + '"')
                }
                if (8 === n)
                    return "uninitialized " + t.getUint16();
                var o = ["bogus", "int", "float", "double", "long", "null", "this", "object", "uninitialized"];
                return o[n]
            }
            ,
            t
        }();
        e.StackMapTable = c;
        var p = function() {
            function t(t) {
                this.entries = t
            }
            return t.prototype.getName = function() {
                return "LocalVariableTable"
            }
            ,
            t.parse = function(t, e) {
                for (var n = t.getUint16(), r = [], a = 0; n > a; a++)
                    r.push(this.parseEntries(t, e));
                return new this(r)
            }
            ,
            t.parseEntries = function(t, e) {
                return {
                    startPC: t.getUint16(),
                    length: t.getUint16(),
                    name: e.get(t.getUint16()).value,
                    descriptor: e.get(t.getUint16()).value,
                    ref: t.getUint16()
                }
            }
            ,
            t
        }();
        e.LocalVariableTable = p;
        var h = function() {
            function t(t) {
                this.entries = t
            }
            return t.prototype.getName = function() {
                return "LocalVariableTypeTable"
            }
            ,
            t.parse = function(t, e) {
                var n, r = t.getUint16(), a = [];
                for (n = 0; r > n; n++)
                    a.push(this.parseTableEntry(t, e));
                return new this(a)
            }
            ,
            t.parseTableEntry = function(t, e) {
                return {
                    startPC: t.getUint16(),
                    length: t.getUint16(),
                    name: e.get(t.getUint16()).value,
                    signature: e.get(t.getUint16()).value,
                    index: t.getUint16()
                }
            }
            ,
            t
        }();
        e.LocalVariableTypeTable = h;
        var f = function() {
            function t(t) {
                this.exceptions = t
            }
            return t.prototype.getName = function() {
                return "Exceptions"
            }
            ,
            t.parse = function(t, e) {
                for (var n = t.getUint16(), r = [], a = 0; n > a; a++)
                    r.push(t.getUint16());
                return new this(r.map(function(t) {
                    return e.get(t).name
                }))
            }
            ,
            t
        }();
        e.Exceptions = f;
        var d = function() {
            function t(t) {
                this.classes = t
            }
            return t.prototype.getName = function() {
                return "InnerClasses"
            }
            ,
            t.parse = function(t, e) {
                for (var n = t.getUint16(), r = [], a = 0; n > a; a++)
                    r.push(this.parseClass(t, e));
                return new this(r)
            }
            ,
            t.parseClass = function(t, e) {
                return {
                    innerInfoIndex: t.getUint16(),
                    outerInfoIndex: t.getUint16(),
                    innerNameIndex: t.getUint16(),
                    innerAccessFlags: t.getUint16()
                }
            }
            ,
            t
        }();
        e.InnerClasses = d;
        var _ = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.getName = function() {
                return "ConstantValue"
            }
            ,
            t.parse = function(t, e) {
                var n = t.getUint16();
                return new this(e.get(n))
            }
            ,
            t
        }();
        e.ConstantValue = _;
        var g = function() {
            function t() {}
            return t.prototype.getName = function() {
                return "Synthetic"
            }
            ,
            t.parse = function(t, e) {
                return new this
            }
            ,
            t
        }();
        e.Synthetic = g;
        var v = function() {
            function t() {}
            return t.prototype.getName = function() {
                return "Deprecated"
            }
            ,
            t.parse = function(t, e) {
                return new this
            }
            ,
            t
        }();
        e.Deprecated = v;
        var m = function() {
            function t(t) {
                this.sig = t
            }
            return t.prototype.getName = function() {
                return "Signature"
            }
            ,
            t.parse = function(t, e) {
                return new this(e.get(t.getUint16()).value)
            }
            ,
            t
        }();
        e.Signature = m;
        var T = function() {
            function t(t, e, n, r) {
                this.rawBytes = t,
                this.isHidden = e,
                this.isCallerSensitive = n,
                this.isCompiled = r
            }
            return t.prototype.getName = function() {
                return "RuntimeVisibleAnnotations"
            }
            ,
            t.parse = function(t, e, n) {
                function r() {
                    t.skip(2);
                    var e, n = t.getUint16();
                    for (e = 0; n > e; e++)
                        t.skip(2),
                        a()
                }
                function a() {
                    var e = String.fromCharCode(t.getUint8());
                    switch (e) {
                    case "e":
                        t.skip(2);
                    case "Z":
                    case "B":
                    case "C":
                    case "S":
                    case "I":
                    case "F":
                    case "J":
                    case "D":
                    case "s":
                    case "c":
                        t.skip(2);
                        break;
                    case "@":
                        r();
                        break;
                    case "[":
                        var n, o = t.getUint16();
                        for (n = 0; o > n; n++)
                            a()
                    }
                }
                var o = t.read(n)
                  , s = !1
                  , i = !1
                  , l = !1;
                t.seek(t.pos() - o.length);
                var u, c = t.getUint16();
                for (u = 0; c > u; u++) {
                    var p = e.get(t.getUint16());
                    switch (t.seek(t.pos() - 2),
                    r(),
                    p.value) {
                    case "Ljava/lang/invoke/LambdaForm$Hidden;":
                        s = !0;
                        break;
                    case "Lsig/sun/reflect/CallerSensitive;":
                        l = !0;
                        break;
                    case "Lsig/java/lang/invoke/LambdaForm$Compiled":
                        i = !0
                    }
                }
                return new this(o,s,l,i)
            }
            ,
            t
        }();
        e.RuntimeVisibleAnnotations = T;
        var y = function() {
            function t(t) {
                this.rawBytes = t
            }
            return t.prototype.getName = function() {
                return "AnnotationDefault"
            }
            ,
            t.parse = function(t, e, n) {
                return new this(t.read(n))
            }
            ,
            t
        }();
        e.AnnotationDefault = y;
        var I = function() {
            function t(t, e) {
                this.encClass = t,
                this.encMethod = e
            }
            return t.prototype.getName = function() {
                return "EnclosingMethod"
            }
            ,
            t.parse = function(t, e) {
                var n = e.get(t.getUint16())
                  , r = t.getUint16()
                  , a = null;
                return r > 0 && (a = e.get(r)),
                new this(n,a)
            }
            ,
            t
        }();
        e.EnclosingMethod = I;
        var E = function() {
            function t(t) {
                this.bootstrapMethods = t
            }
            return t.prototype.getName = function() {
                return "BootstrapMethods"
            }
            ,
            t.parse = function(t, e) {
                for (var n = t.getUint16(), r = [], a = 0; n > a; a++) {
                    for (var o = e.get(t.getUint16()), s = t.getUint16(), i = [], l = 0; s > l; l++)
                        i.push(e.get(t.getUint16()));
                    r.push([o, i])
                }
                return new this(r)
            }
            ,
            t
        }();
        e.BootstrapMethods = E;
        var A = function() {
            function t(t) {
                this.rawBytes = t
            }
            return t.prototype.getName = function() {
                return "RuntimeVisibleParameterAnnotations"
            }
            ,
            t.parse = function(t, e, n) {
                return new this(t.read(n))
            }
            ,
            t
        }();
        e.RuntimeVisibleParameterAnnotations = A,
        e.makeAttributes = r
    }
    , function(t, e) {
        "use strict";
        function n(t, e, n) {
            if (!t)
                throw new Error("Assertion failed: " + e + "\n" + (n ? n.getPrintableStackTrace() : ""))
        }
        t.exports = n
    }
    , function(t, e) {
        (function(e) {
            "use strict";
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof self ? self : e,
            t.exports = n
        }
        ).call(e, function() {
            return this
        }())
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            switch (t.getType()) {
            case o.ConstantPoolItemType.METHODREF:
                var e = t;
                return u.ext_classname(e.classInfo.name) + "." + e.signature;
            case o.ConstantPoolItemType.INTERFACE_METHODREF:
                var n = t;
                return u.ext_classname(n.classInfo.name) + "." + n.signature;
            case o.ConstantPoolItemType.FIELDREF:
                var r = t;
                return u.ext_classname(r.classInfo.name) + "." + r.nameAndTypeInfo.name + ":" + u.ext_classname(r.nameAndTypeInfo.descriptor);
            case o.ConstantPoolItemType.NAME_AND_TYPE:
                var a = t;
                return a.name + ":" + a.descriptor;
            case o.ConstantPoolItemType.CLASS:
                var s = t;
                return u.ext_classname(s.name);
            default:
                return l.debug_var(t.value)
            }
        }
        function a(t, n, r, a) {
            return e.OpcodeLayoutPrinters[o.OpcodeLayouts[t]](n, r, a)
        }
        var o = n(9)
          , s = (n(13),
        n(8))
          , i = n(16)
          , l = n(17)
          , u = n(6)
          , c = o.ThreadStatus
          , p = (n(14),
        l.debug,
        l.vtrace,
        l.trace,
        1e4)
          , h = p
          , f = 1
          , d = function() {
            function t(t) {
                this.curr = 0,
                this.store = new Array(t)
            }
            return t.prototype.push = function(t) {
                this.store[this.curr++] = t
            }
            ,
            t.prototype.pushAll = function() {
                for (var t = arguments.length, e = 0; t > e; e++)
                    this.store[this.curr++] = arguments[e]
            }
            ,
            t.prototype.pushWithNull = function(t) {
                this.store[this.curr] = t,
                this.curr += 2
            }
            ,
            t.prototype.push6 = function(t, e, n, r, a, o) {
                this.store[this.curr++] = t,
                this.store[this.curr++] = e,
                this.store[this.curr++] = n,
                this.store[this.curr++] = r,
                this.store[this.curr++] = a,
                this.store[this.curr++] = o
            }
            ,
            t.prototype.swap = function() {
                var t = this.store[this.curr - 1];
                this.store[this.curr - 1] = this.store[this.curr - 2],
                this.store[this.curr - 2] = t
            }
            ,
            t.prototype.dup = function() {
                this.store[this.curr] = this.store[this.curr - 1],
                this.curr++
            }
            ,
            t.prototype.dup2 = function() {
                this.store[this.curr] = this.store[this.curr - 2],
                this.store[this.curr + 1] = this.store[this.curr - 1],
                this.curr += 2
            }
            ,
            t.prototype.dup_x1 = function() {
                var t = this.store[this.curr - 1];
                this.store[this.curr - 1] = this.store[this.curr - 2],
                this.store[this.curr] = t,
                this.store[this.curr - 2] = t,
                this.curr++
            }
            ,
            t.prototype.dup_x2 = function() {
                var t = this.store[this.curr - 1];
                this.store[this.curr - 1] = this.store[this.curr - 2],
                this.store[this.curr - 2] = this.store[this.curr - 3],
                this.store[this.curr] = t,
                this.store[this.curr - 3] = t,
                this.curr++
            }
            ,
            t.prototype.dup2_x1 = function() {
                var t = this.store[this.curr - 1]
                  , e = this.store[this.curr - 2];
                this.store[this.curr] = e,
                this.store[this.curr + 1] = t,
                this.store[this.curr - 1] = this.store[this.curr - 3],
                this.store[this.curr - 2] = t,
                this.store[this.curr - 3] = e,
                this.curr += 2
            }
            ,
            t.prototype.pop = function() {
                return this.store[--this.curr]
            }
            ,
            t.prototype.pop2 = function() {
                return this.curr -= 2,
                this.store[this.curr]
            }
            ,
            t.prototype.bottom = function() {
                return this.store[0]
            }
            ,
            t.prototype.top = function() {
                return this.store[this.curr - 1]
            }
            ,
            t.prototype.fromTop = function(t) {
                return this.store[this.curr - (t + 1)]
            }
            ,
            t.prototype.sliceFromBottom = function(t) {
                return this.store.slice(t, this.curr)
            }
            ,
            t.prototype.sliceFromTop = function(t) {
                return this.store.slice(this.curr - t, this.curr)
            }
            ,
            t.prototype.dropFromTop = function(t) {
                this.curr -= t
            }
            ,
            t.prototype.sliceAndDropFromTop = function(t) {
                var e = this.curr;
                return this.curr -= t,
                this.store.slice(e - t, e)
            }
            ,
            t.prototype.getRaw = function() {
                return this.store.slice(0, this.curr)
            }
            ,
            t.prototype.clear = function() {
                this.curr = 0
            }
            ,
            t
        }();
        e.PreAllocatedStack = d;
        var _ = {
            isNull: i.isNull,
            resolveCPItem: i.resolveCPItem,
            throwException: i.throwException,
            gLong: s,
            float2int: u.float2int,
            wrapFloat: u.wrapFloat,
            Constants: o.Constants
        }
          , g = function() {
            function t(t, e) {
                this.pc = 0,
                this.returnToThreadLoop = !1,
                this.lockedMethodLock = !1,
                this.type = o.StackFrameType.BYTECODE,
                this.method = t,
                t.incrBBEntries(),
                this.locals = e,
                this.opStack = new d(t.getCodeAttribute().getMaxStack())
            }
            return t.prototype.run = function(t) {
                var e = this
                  , n = this.method
                  , r = this.method.getCodeAttribute().getCode()
                  , a = i.LookupTable;
                if (!n.accessFlags.isSynchronized() || this.lockedMethodLock || (this.lockedMethodLock = n.methodLock(t, this).enter(t, function() {
                    e.lockedMethodLock = !0
                }),
                this.lockedMethodLock))
                    if (this.returnToThreadLoop = !1,
                    t.getJVM().isJITDisabled())
                        for (; !this.returnToThreadLoop; ) {
                            var o = r.readUInt8(this.pc);
                            a[o](t, this, r)
                        }
                    else
                        for (; !this.returnToThreadLoop; ) {
                            var s = n.getOp(this.pc, r, t);
                            "function" == typeof s ? s(this, t, _) : a[s](t, this, r)
                        }
            }
            ,
            t.prototype.scheduleResume = function(t, e, n) {
                var r = this.method.getCodeAttribute().getCode().readUInt8(this.pc);
                switch (r) {
                case o.OpCode.INVOKEINTERFACE:
                case o.OpCode.INVOKEINTERFACE_FAST:
                    this.pc += 5;
                    break;
                case o.OpCode.INVOKESPECIAL:
                case o.OpCode.INVOKESTATIC:
                case o.OpCode.INVOKEVIRTUAL:
                case o.OpCode.INVOKESTATIC_FAST:
                case o.OpCode.INVOKENONVIRTUAL_FAST:
                case o.OpCode.INVOKEVIRTUAL_FAST:
                case o.OpCode.INVOKEHANDLE:
                case o.OpCode.INVOKEBASIC:
                case o.OpCode.LINKTOSPECIAL:
                case o.OpCode.LINKTOVIRTUAL:
                case o.OpCode.INVOKEDYNAMIC:
                case o.OpCode.INVOKEDYNAMIC_FAST:
                    this.pc += 3
                }
                void 0 !== e && this.opStack.push(e),
                void 0 !== n && this.opStack.push(n)
            }
            ,
            t.prototype.scheduleException = function(t, e) {
                for (var n, r = this.method.getCodeAttribute(), a = this.pc, o = this.method, s = r.exceptionHandlers, i = e.getClass(), l = 0; l < s.length; l++) {
                    var u = s[l];
                    if (u.startPC <= a && a < u.endPC) {
                        if ("<any>" === u.catchType) {
                            n = u;
                            break
                        }
                        var p = o.cls.getLoader().getResolvedClass(u.catchType);
                        if (null == p) {
                            for (var h = [], f = 0; f < s.length; f++) {
                                var d = s[f];
                                "<any>" !== d.catchType && h.push(d.catchType)
                            }
                            return t.setStatus(c.ASYNC_WAITING),
                            o.cls.getLoader().resolveClasses(t, h, function(n) {
                                null !== n && t.throwException(e)
                            }),
                            !0
                        }
                        if (i.isCastable(p)) {
                            n = u;
                            break
                        }
                    }
                }
                return null != n ? (this.opStack.clear(),
                this.opStack.push(e),
                this.pc = n.handlerPC,
                !0) : (o.accessFlags.isSynchronized() && o.methodLock(t, this).exit(t),
                !1)
            }
            ,
            t.prototype.getLoader = function() {
                return this.method.cls.getLoader()
            }
            ,
            t.prototype.getStackTraceFrame = function() {
                return {
                    method: this.method,
                    pc: this.pc,
                    stack: this.opStack.sliceFromBottom(0),
                    locals: this.locals.slice(0)
                }
            }
            ,
            t
        }();
        e.BytecodeStackFrame = g;
        var v = function() {
            function t(t, e) {
                this.type = o.StackFrameType.NATIVE,
                this.method = t,
                this.args = e,
                this.nativeMethod = t.getNativeFunction()
            }
            return t.prototype.run = function(t) {
                var e = this.nativeMethod.apply(null, this.method.convertArgs(t, this.args));
                if (t.getStatus() === c.RUNNABLE && t.currentMethod() === this.method) {
                    var n = this.method.returnType;
                    switch (n) {
                    case "J":
                    case "D":
                        t.asyncReturn(e, null);
                        break;
                    case "Z":
                        t.asyncReturn(e ? 1 : 0);
                        break;
                    default:
                        t.asyncReturn(e)
                    }
                }
            }
            ,
            t.prototype.scheduleResume = function(t, e, n) {}
            ,
            t.prototype.scheduleException = function(t, e) {
                return !1
            }
            ,
            t.prototype.getStackTraceFrame = function() {
                return {
                    method: this.method,
                    pc: -1,
                    stack: [],
                    locals: []
                }
            }
            ,
            t.prototype.getLoader = function() {
                return this.method.cls.getLoader()
            }
            ,
            t
        }();
        e.NativeStackFrame = v;
        var m = function() {
            function t(t) {
                this.isException = !1,
                this.type = o.StackFrameType.INTERNAL,
                this.cb = t
            }
            return t.prototype.run = function(t) {
                t.framePop(),
                t.setStatus(c.ASYNC_WAITING),
                this.isException ? this.cb(this.val) : this.cb(null, this.val)
            }
            ,
            t.prototype.scheduleResume = function(t, e) {
                this.isException = !1,
                this.val = e
            }
            ,
            t.prototype.scheduleException = function(t, e) {
                return this.isException = !0,
                this.val = e,
                !0
            }
            ,
            t.prototype.getStackTraceFrame = function() {
                return null
            }
            ,
            t.prototype.getLoader = function() {
                throw new Error("Internal stack frames have no loader.")
            }
            ,
            t
        }();
        e.InternalStackFrame = m;
        var T = function() {
            function t(t, e, n) {
                this.status = c.NEW,
                this.stack = [],
                this.interrupted = !1,
                this.monitor = null,
                this.jvm = t,
                this.bsCl = t.getBootstrapClassLoader(),
                this.tpool = e,
                this.jvmThreadObj = n
            }
            return t.prototype.getJVMObject = function() {
                return this.jvmThreadObj
            }
            ,
            t.prototype.isDaemon = function() {
                return 0 !== this.jvmThreadObj["java/lang/Thread/daemon"]
            }
            ,
            t.prototype.getPriority = function() {
                return this.jvmThreadObj["java/lang/Thread/priority"]
            }
            ,
            t.prototype.setJVMObject = function(t) {
                t["java/lang/Thread/threadStatus"] = this.jvmThreadObj["java/lang/Thread/threadStatus"],
                this.jvmThreadObj = t
            }
            ,
            t.prototype.getRef = function() {
                return this.jvmThreadObj.ref
            }
            ,
            t.prototype.isInterrupted = function() {
                return this.interrupted
            }
            ,
            t.prototype.currentMethod = function() {
                for (var t, e = this.stack, n = e.length; --n >= 0; )
                    if (t = e[n].getStackTraceFrame().method,
                    null !== t)
                        return t;
                return null
            }
            ,
            t.prototype.setInterrupted = function(t) {
                this.interrupted = t
            }
            ,
            t.prototype.getBsCl = function() {
                return this.bsCl
            }
            ,
            t.prototype.getLoader = function() {
                var t = this.stack[this.stack.length - 1].getLoader();
                if (t)
                    return t;
                for (var e = this.stack.length, n = 2; e >= n; n++)
                    if (t = this.stack[e - n].getLoader())
                        return t;
                throw new Error("Unable to find loader.")
            }
            ,
            t.prototype["import"] = function(t, e, n) {
                var r = this;
                void 0 === n && (n = !0);
                var a = this.getLoader();
                if (this.setStatus(c.ASYNC_WAITING),
                Array.isArray(t)) {
                    var o = [];
                    u.asyncForEach(t, function(t, e) {
                        r._import(t, a, function(t) {
                            o.push(t),
                            e()
                        }, n)
                    }, function(t) {
                        e(o)
                    })
                } else
                    this._import(t, a, e, n)
            }
            ,
            t.prototype._import = function(t, e, n, r) {
                var a = this
                  , o = e.getInitializedClass(this, t);
                o ? setImmediate(function() {
                    return n(o.getConstructor(a))
                }) : e.initializeClass(this, t, function(t) {
                    t && n(t.getConstructor(a))
                }, r)
            }
            ,
            t.prototype.getJVM = function() {
                return this.jvm
            }
            ,
            t.prototype.getThreadPool = function() {
                return this.tpool
            }
            ,
            t.prototype.getStackTrace = function() {
                var t, e, n = [];
                for (t = 0; t < this.stack.length; t++)
                    e = this.stack[t].getStackTraceFrame(),
                    null != e && n.push(e);
                return n
            }
            ,
            t.prototype.getPrintableStackTrace = function() {
                var t = "";
                return this.getStackTrace().reverse().forEach(function(e) {
                    if (t += "	at " + u.ext_classname(e.method.cls.getInternalName()) + "::" + e.method.name + "(",
                    e.pc >= 0) {
                        var n = e.method.getCodeAttribute()
                          , r = n.getAttribute("LineNumberTable")
                          , a = e.method.cls.getAttribute("SourceFile");
                        if (t += null != a ? a.filename : "unknown",
                        null != r) {
                            var o = r.getLineNumber(e.pc);
                            t += ":" + o,
                            t += " Bytecode offset: " + e.pc
                        }
                    } else
                        t += "native";
                    t += ")\n"
                }),
                t
            }
            ,
            t.prototype.run = function() {
                var t = this.stack
                  , e = (new Date).getTime();
                for (h = p; this.status === c.RUNNABLE && t.length > 0; ) {
                    var n = t[t.length - 1];
                    if (n.run(this),
                    0 === --h) {
                        var r = (new Date).getTime()
                          , a = r - e
                          , o = p / a * this.jvm.getResponsiveness() | 0;
                        p = (o + f * p) / (f + 1) | 0,
                        0 >= p && (p = 10),
                        f++,
                        this.tpool.quantumOver(this);
                        break
                    }
                }
                0 === t.length && this.setStatus(c.TERMINATED)
            }
            ,
            t.prototype.sanityCheck = function() {
                switch (this.status) {
                case c.NEW:
                    return !0;
                case c.RUNNABLE:
                    return !0;
                case c.TIMED_WAITING:
                    return !0;
                case c.WAITING:
                    return !0;
                case c.BLOCKED:
                case c.UNINTERRUPTABLY_BLOCKED:
                    return !0;
                case c.ASYNC_WAITING:
                    return !0;
                case c.TERMINATED:
                    return !0;
                case c.PARKED:
                    return !0;
                default:
                    return !1
                }
            }
            ,
            t.prototype.rawSetStatus = function(t) {
                var e = 0
                  , n = this.status;
                switch (l.log_level === l.VTRACE,
                this.status = t,
                t) {
                case c.NEW:
                    e |= o.JVMTIThreadState.ALIVE;
                    break;
                case c.RUNNABLE:
                    e |= o.JVMTIThreadState.RUNNABLE;
                    break;
                case c.BLOCKED:
                case c.UNINTERRUPTABLY_BLOCKED:
                    e |= o.JVMTIThreadState.BLOCKED_ON_MONITOR_ENTER;
                    break;
                case c.WAITING:
                case c.ASYNC_WAITING:
                case c.PARKED:
                    e |= o.JVMTIThreadState.WAITING_INDEFINITELY;
                    break;
                case c.TIMED_WAITING:
                    e |= o.JVMTIThreadState.WAITING_WITH_TIMEOUT;
                    break;
                case c.TERMINATED:
                    e |= o.JVMTIThreadState.TERMINATED;
                    break;
                default:
                    e = o.JVMTIThreadState.RUNNABLE
                }
                this.jvmThreadObj["java/lang/Thread/threadStatus"] = e,
                this.tpool.statusChange(this, n, this.status)
            }
            ,
            t.prototype.setStatus = function(t, e) {
                void 0 === e && (e = null),
                this.status !== t && (this.status,
                this.monitor = e,
                t !== c.TERMINATED ? this.rawSetStatus(t) : this.exit())
            }
            ,
            t.prototype.exit = function() {
                var t = this
                  , e = this.jvmThreadObj.getMonitor();
                if (!e.isBlocked(this) && e.getOwner() !== this && this.status !== c.TERMINATED)
                    if (0 === this.stack.length) {
                        if (this.setStatus(c.ASYNC_WAITING),
                        this.jvm.hasVMBooted()) {
                            var n = function() {
                                t.jvmThreadObj["exit()V"](t, null, function(n) {
                                    e.notifyAll(t),
                                    e.exit(t),
                                    t.rawSetStatus(c.TERMINATED)
                                })
                            };
                            e.enter(this, n) && n()
                        }
                    } else {
                        for (; this.stack.length > 0; )
                            this.stack.pop();
                        this.rawSetStatus(c.TERMINATED)
                    }
            }
            ,
            t.prototype.signalPriorityChange = function() {
                this.tpool.priorityChange(this)
            }
            ,
            t.prototype.getMonitorBlock = function() {
                return this.monitor
            }
            ,
            t.prototype.getStatus = function() {
                return this.status
            }
            ,
            t.prototype.asyncReturn = function(t, e) {
                var n = this.stack
                  , r = n.pop();
                r.type != o.StackFrameType.INTERNAL && r.type === o.StackFrameType.BYTECODE;
                var a = n.length - 1;
                a >= 0 && n[a].scheduleResume(this, t, e),
                this.setStatus(c.RUNNABLE)
            }
            ,
            t.prototype.framePop = function() {
                this.stack.pop()
            }
            ,
            t.prototype.throwException = function(t) {
                var e = this.stack
                  , n = e.length - 1;
                if (n >= 0)
                    for (e[n].type === o.StackFrameType.INTERNAL && (e.pop(),
                    n--),
                    this.setStatus(c.RUNNABLE); e.length > 0 && !e[n].scheduleException(this, t); )
                        e.pop(),
                        n--;
                0 === e.length && this.handleUncaughtException(t)
            }
            ,
            t.prototype.throwNewException = function(t, e) {
                var n = this
                  , r = this.bsCl.getInitializedClass(this, t)
                  , a = function() {
                    var t = r.getConstructor(n)
                      , a = new t(n);
                    a["<init>(Ljava/lang/String;)V"](n, [u.initString(n.bsCl, e)], function(t) {
                        t ? n.throwException(t) : n.throwException(a)
                    })
                };
                null != r ? a() : (this.setStatus(c.ASYNC_WAITING),
                this.bsCl.initializeClass(this, t, function(t) {
                    null != t && (r = t,
                    a())
                }, !1))
            }
            ,
            t.prototype.handleUncaughtException = function(t) {
                this.jvmThreadObj["dispatchUncaughtException(Ljava/lang/Throwable;)V"](this, [t])
            }
            ,
            t.prototype.close = function() {
                this.jvm = null
            }
            ,
            t
        }();
        e.JVMThread = T,
        e.validTransitions = {},
        e.validTransitions[c.NEW] = {},
        e.validTransitions[c.NEW][c.RUNNABLE] = "RunMethod invoked on new thread",
        e.validTransitions[c.NEW][c.ASYNC_WAITING] = "[JVM bootup only] Internal operation occurs on new thread",
        e.validTransitions[c.NEW][c.TERMINATED] = "[JVM halt0 only] When the JVM shuts down, it terminates all threads, including those that have never been run.",
        e.validTransitions[c.ASYNC_WAITING] = {},
        e.validTransitions[c.ASYNC_WAITING][c.RUNNABLE] = "Async operation completes",
        e.validTransitions[c.ASYNC_WAITING][c.TERMINATED] = "RunMethod completes and callstack is empty",
        e.validTransitions[c.BLOCKED] = {},
        e.validTransitions[c.BLOCKED][c.RUNNABLE] = "Acquires monitor, or is interrupted",
        e.validTransitions[c.BLOCKED][c.TERMINATED] = "Thread is terminated whilst blocked.",
        e.validTransitions[c.PARKED] = {},
        e.validTransitions[c.PARKED][c.ASYNC_WAITING] = "Balancing unpark, or is interrupted",
        e.validTransitions[c.PARKED][c.TERMINATED] = "Thread is terminated whilst parked.",
        e.validTransitions[c.RUNNABLE] = {},
        e.validTransitions[c.RUNNABLE][c.ASYNC_WAITING] = "Thread performs an asynchronous JavaScript operation",
        e.validTransitions[c.RUNNABLE][c.TERMINATED] = "Callstack is empty",
        e.validTransitions[c.RUNNABLE][c.BLOCKED] = "Thread waits to acquire monitor",
        e.validTransitions[c.RUNNABLE][c.WAITING] = "Thread waits on monitor (Object.wait)",
        e.validTransitions[c.RUNNABLE][c.TIMED_WAITING] = "Thread waits on monitor with timeout (Object.wait)",
        e.validTransitions[c.RUNNABLE][c.PARKED] = "Thread parks itself",
        e.validTransitions[c.TERMINATED] = {},
        e.validTransitions[c.TERMINATED][c.NEW] = "Thread is resurrected for re-use",
        e.validTransitions[c.TERMINATED][c.RUNNABLE] = "Thread is resurrected for re-use",
        e.validTransitions[c.TERMINATED][c.ASYNC_WAITING] = "[JVM Bootup] Thread is resurrected for internal operation",
        e.validTransitions[c.TIMED_WAITING] = {},
        e.validTransitions[c.TIMED_WAITING][c.RUNNABLE] = "Timer expires, or thread is interrupted, and thread immediately acquires lock",
        e.validTransitions[c.TIMED_WAITING][c.UNINTERRUPTABLY_BLOCKED] = "Thread is interrupted or notified, or timer expires, and lock already owned",
        e.validTransitions[c.TIMED_WAITING][c.TERMINATED] = "Thread is terminated whilst waiting.",
        e.validTransitions[c.UNINTERRUPTABLY_BLOCKED] = {},
        e.validTransitions[c.UNINTERRUPTABLY_BLOCKED][c.RUNNABLE] = "Thread acquires monitor",
        e.validTransitions[c.UNINTERRUPTABLY_BLOCKED][c.TERMINATED] = "Thread is terminated whilst blocked.",
        e.validTransitions[c.WAITING] = {},
        e.validTransitions[c.WAITING][c.RUNNABLE] = "Thread is interrupted, and immediately acquires lock",
        e.validTransitions[c.WAITING][c.UNINTERRUPTABLY_BLOCKED] = "Thread is notified or interrupted, and does not immediately acquire lock",
        e.validTransitions[c.WAITING][c.TERMINATED] = "Thread is terminated whilst waiting.",
        e.OpcodeLayoutPrinters = {},
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.OPCODE_ONLY] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase()
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.CONSTANT_POOL] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + r(t.cls.constantPool.get(e.readUInt16BE(n + 1)))
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.CONSTANT_POOL_UINT8] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + r(t.cls.constantPool.get(e.readUInt8(n + 1)))
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.CONSTANT_POOL_AND_UINT8_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + r(t.cls.constantPool.get(e.readUInt16BE(n + 1))) + " " + e.readUInt8(n + 3)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.UINT8_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + e.readUInt8(n + 1)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.UINT8_AND_INT8_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + e.readUInt8(n + 1) + " " + e.readInt8(n + 2)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.INT8_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + e.readInt8(n + 1)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.INT16_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + e.readInt16BE(n + 1)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.INT32_VALUE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + e.readInt32BE(n + 1)
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.ARRAY_TYPE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase() + " " + i.ArrayTypes[e.readUInt8(n + 1)]
        }
        ,
        e.OpcodeLayoutPrinters[o.OpcodeLayoutType.WIDE] = function(t, e, n) {
            return o.OpCode[e.readUInt8(n)].toLowerCase()
        }
        ,
        e.annotateOpcode = a
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e, n) {
            return null == n ? (l(t, e, "Ljava/lang/NullPointerException;", ""),
            !0) : !1
        }
        function a(t) {
            return t.pop(),
            t.pop()
        }
        function o(t, e, n) {
            t.setStatus(p.ThreadStatus.ASYNC_WAITING),
            n.resolve(t, e.getLoader(), e.method.cls, function(e) {
                e && t.setStatus(p.ThreadStatus.RUNNABLE)
            }, !1),
            e.returnToThreadLoop = !0
        }
        function s(t, e, n) {
            t.setStatus(p.ThreadStatus.ASYNC_WAITING),
            n.initialize(t, function(e) {
                null != e && t.setStatus(p.ThreadStatus.RUNNABLE)
            }, !1),
            e.returnToThreadLoop = !0
        }
        function i(t, e, n) {
            function r(e) {
                e.initialize(t, function(e) {
                    null != e && t.setStatus(p.ThreadStatus.RUNNABLE)
                })
            }
            t.setStatus(p.ThreadStatus.ASYNC_WAITING),
            n.isResolved() ? r(n.cls) : n.resolve(t, e.getLoader(), e.method.cls, function(t) {
                t && r(n.cls)
            }, !1),
            e.returnToThreadLoop = !0
        }
        function l(t, e, n, r) {
            t.throwNewException(n, r),
            e.returnToThreadLoop = !0
        }
        var u = n(8)
          , c = n(6)
          , p = n(9);
        n(13);
        e.isNull = r,
        e.pop2 = a,
        e.resolveCPItem = o,
        e.initializeClassFromClass = s,
        e.initializeClass = i,
        e.throwException = l,
        e.ArrayTypes = {
            4: "Z",
            5: "C",
            6: "F",
            7: "D",
            8: "B",
            9: "S",
            10: "I",
            11: "J"
        };
        var h = function() {
            function t() {}
            return t._aload_32 = function(t, e) {
                var n = e.opStack
                  , a = n.pop()
                  , o = n.pop();
                if (!r(t, e, o)) {
                    var s = o.array.length;
                    0 > a || a >= s ? l(t, e, "Ljava/lang/ArrayIndexOutOfBoundsException;", a + " not in length " + s + " array of type " + o.getClass().getInternalName()) : (n.push(o.array[a]),
                    e.pc++)
                }
            }
            ,
            t._aload_64 = function(t, e) {
                var n = e.opStack
                  , a = n.pop()
                  , o = n.pop();
                if (!r(t, e, o)) {
                    var s = o.array.length;
                    0 > a || a >= s ? l(t, e, "Ljava/lang/ArrayIndexOutOfBoundsException;", a + " not in length " + s + " array of type " + o.getClass().getInternalName()) : (n.push(o.array[a]),
                    n.push(null),
                    e.pc++)
                }
            }
            ,
            t._astore_32 = function(t, e) {
                var n = e.opStack
                  , a = n.pop()
                  , o = n.pop()
                  , s = n.pop();
                if (!r(t, e, s)) {
                    var i = s.array.length;
                    0 > o || o >= i ? l(t, e, "Ljava/lang/ArrayIndexOutOfBoundsException;", o + " not in length " + i + " array of type " + s.getClass().getInternalName()) : (s.array[o] = a,
                    e.pc++)
                }
            }
            ,
            t._astore_64 = function(t, e) {
                var n = e.opStack
                  , a = n.pop2()
                  , o = n.pop()
                  , s = n.pop();
                if (!r(t, e, s)) {
                    var i = s.array.length;
                    0 > o || o >= i ? l(t, e, "Ljava/lang/ArrayIndexOutOfBoundsException;", o + " not in length " + i + " array of type " + s.getClass().getInternalName()) : (s.array[o] = a,
                    e.pc++)
                }
            }
            ,
            t.aconst_null = function(t, e) {
                e.opStack.push(null),
                e.pc++
            }
            ,
            t._const_0_32 = function(t, e) {
                e.opStack.push(0),
                e.pc++
            }
            ,
            t._const_1_32 = function(t, e) {
                e.opStack.push(1),
                e.pc++
            }
            ,
            t._const_2_32 = function(t, e) {
                e.opStack.push(2),
                e.pc++
            }
            ,
            t.iconst_m1 = function(t, e) {
                e.opStack.push(-1),
                e.pc++
            }
            ,
            t.iconst_3 = function(t, e) {
                e.opStack.push(3),
                e.pc++
            }
            ,
            t.iconst_4 = function(t, e) {
                e.opStack.push(4),
                e.pc++
            }
            ,
            t.iconst_5 = function(t, e) {
                e.opStack.push(5),
                e.pc++
            }
            ,
            t.lconst_0 = function(t, e) {
                e.opStack.pushWithNull(u.ZERO),
                e.pc++
            }
            ,
            t.lconst_1 = function(t, e) {
                e.opStack.pushWithNull(u.ONE),
                e.pc++
            }
            ,
            t.dconst_0 = function(t, e) {
                e.opStack.pushWithNull(0),
                e.pc++
            }
            ,
            t.dconst_1 = function(t, e) {
                e.opStack.pushWithNull(1),
                e.pc++
            }
            ,
            t._load_32 = function(t, e, n) {
                var r = e.pc;
                e.opStack.push(e.locals[n.readUInt8(r + 1)]),
                e.pc += 2
            }
            ,
            t._load_0_32 = function(t, e) {
                e.opStack.push(e.locals[0]),
                e.pc++
            }
            ,
            t._load_1_32 = function(t, e) {
                e.opStack.push(e.locals[1]),
                e.pc++
            }
            ,
            t._load_2_32 = function(t, e) {
                e.opStack.push(e.locals[2]),
                e.pc++
            }
            ,
            t._load_3_32 = function(t, e) {
                e.opStack.push(e.locals[3]),
                e.pc++
            }
            ,
            t._load_64 = function(t, e, n) {
                var r = e.pc;
                e.opStack.pushWithNull(e.locals[n.readUInt8(r + 1)]),
                e.pc += 2
            }
            ,
            t._load_0_64 = function(t, e) {
                e.opStack.pushWithNull(e.locals[0]),
                e.pc++
            }
            ,
            t._load_1_64 = function(t, e) {
                e.opStack.pushWithNull(e.locals[1]),
                e.pc++
            }
            ,
            t._load_2_64 = function(t, e) {
                e.opStack.pushWithNull(e.locals[2]),
                e.pc++
            }
            ,
            t._load_3_64 = function(t, e) {
                e.opStack.pushWithNull(e.locals[3]),
                e.pc++
            }
            ,
            t._store_32 = function(t, e, n) {
                var r = e.pc;
                e.locals[n.readUInt8(r + 1)] = e.opStack.pop(),
                e.pc += 2
            }
            ,
            t._store_0_32 = function(t, e) {
                e.locals[0] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_1_32 = function(t, e) {
                e.locals[1] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_2_32 = function(t, e) {
                e.locals[2] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_3_32 = function(t, e) {
                e.locals[3] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_64 = function(t, e, n) {
                var r = e.pc
                  , a = n.readUInt8(r + 1);
                e.locals[a + 1] = e.opStack.pop(),
                e.locals[a] = e.opStack.pop(),
                e.pc += 2
            }
            ,
            t._store_0_64 = function(t, e) {
                e.locals[1] = e.opStack.pop(),
                e.locals[0] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_1_64 = function(t, e) {
                e.locals[2] = e.opStack.pop(),
                e.locals[1] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_2_64 = function(t, e) {
                e.locals[3] = e.opStack.pop(),
                e.locals[2] = e.opStack.pop(),
                e.pc++
            }
            ,
            t._store_3_64 = function(t, e) {
                e.locals[4] = e.opStack.pop(),
                e.locals[3] = e.opStack.pop(),
                e.pc++
            }
            ,
            t.sipush = function(t, e, n) {
                var r = e.pc;
                e.opStack.push(n.readInt16BE(r + 1)),
                e.pc += 3
            }
            ,
            t.bipush = function(t, e, n) {
                var r = e.pc;
                e.opStack.push(n.readInt8(r + 1)),
                e.pc += 2
            }
            ,
            t.pop = function(t, e) {
                e.opStack.dropFromTop(1),
                e.pc++
            }
            ,
            t.pop2 = function(t, e) {
                e.opStack.dropFromTop(2),
                e.pc++
            }
            ,
            t.dup = function(t, e) {
                e.opStack.dup(),
                e.pc++
            }
            ,
            t.dup_x1 = function(t, e) {
                e.opStack.dup_x1(),
                e.pc++
            }
            ,
            t.dup_x2 = function(t, e) {
                e.opStack.dup_x2(),
                e.pc++
            }
            ,
            t.dup2 = function(t, e) {
                e.opStack.dup2(),
                e.pc++
            }
            ,
            t.dup2_x1 = function(t, e) {
                e.opStack.dup2_x1(),
                e.pc++
            }
            ,
            t.dup2_x2 = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = n.pop()
                  , o = n.pop()
                  , s = n.pop();
                n.push6(a, r, s, o, a, r),
                e.pc++
            }
            ,
            t.swap = function(t, e) {
                e.opStack.swap(),
                e.pc++
            }
            ,
            t.iadd = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() + n.pop() | 0),
                e.pc++
            }
            ,
            t.ladd = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().add(n.pop2())),
                e.pc++
            }
            ,
            t.fadd = function(t, e) {
                var n = e.opStack;
                n.push(c.wrapFloat(n.pop() + n.pop())),
                e.pc++
            }
            ,
            t.dadd = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2() + n.pop2()),
                e.pc++
            }
            ,
            t.isub = function(t, e) {
                var n = e.opStack;
                n.push(-n.pop() + n.pop() | 0),
                e.pc++
            }
            ,
            t.fsub = function(t, e) {
                var n = e.opStack;
                n.push(c.wrapFloat(-n.pop() + n.pop())),
                e.pc++
            }
            ,
            t.dsub = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(-n.pop2() + n.pop2()),
                e.pc++
            }
            ,
            t.lsub = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().negate().add(n.pop2())),
                e.pc++
            }
            ,
            t.imul = function(t, e) {
                var n = e.opStack;
                n.push(Math.imul(n.pop(), n.pop())),
                e.pc++
            }
            ,
            t.lmul = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().multiply(n.pop2())),
                e.pc++
            }
            ,
            t.fmul = function(t, e) {
                var n = e.opStack;
                n.push(c.wrapFloat(n.pop() * n.pop())),
                e.pc++
            }
            ,
            t.dmul = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2() * n.pop2()),
                e.pc++
            }
            ,
            t.idiv = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = n.pop();
                0 === r ? l(t, e, "Ljava/lang/ArithmeticException;", "/ by zero") : (a === p.Constants.INT_MIN && -1 === r ? n.push(a) : n.push(a / r | 0),
                e.pc++)
            }
            ,
            t.ldiv = function(t, e) {
                var n = e.opStack
                  , r = n.pop2()
                  , a = n.pop2();
                r.isZero() ? l(t, e, "Ljava/lang/ArithmeticException;", "/ by zero") : (n.pushWithNull(a.div(r)),
                e.pc++)
            }
            ,
            t.fdiv = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.push(c.wrapFloat(n.pop() / r)),
                e.pc++
            }
            ,
            t.ddiv = function(t, e) {
                var n = e.opStack
                  , r = n.pop2();
                n.pushWithNull(n.pop2() / r),
                e.pc++
            }
            ,
            t.irem = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = n.pop();
                0 === r ? l(t, e, "Ljava/lang/ArithmeticException;", "/ by zero") : (n.push(a % r),
                e.pc++)
            }
            ,
            t.lrem = function(t, e) {
                var n = e.opStack
                  , r = n.pop2()
                  , a = n.pop2();
                r.isZero() ? l(t, e, "Ljava/lang/ArithmeticException;", "/ by zero") : (n.pushWithNull(a.modulo(r)),
                e.pc++)
            }
            ,
            t.frem = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.push(n.pop() % r),
                e.pc++
            }
            ,
            t.drem = function(t, e) {
                var n = e.opStack
                  , r = n.pop2();
                n.pushWithNull(n.pop2() % r),
                e.pc++
            }
            ,
            t.ineg = function(t, e) {
                var n = e.opStack;
                n.push(0 | -n.pop()),
                e.pc++
            }
            ,
            t.lneg = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().negate()),
                e.pc++
            }
            ,
            t.fneg = function(t, e) {
                var n = e.opStack;
                n.push(-n.pop()),
                e.pc++
            }
            ,
            t.dneg = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(-n.pop2()),
                e.pc++
            }
            ,
            t.ishl = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.push(n.pop() << r),
                e.pc++
            }
            ,
            t.lshl = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.pushWithNull(n.pop2().shiftLeft(u.fromInt(r))),
                e.pc++
            }
            ,
            t.ishr = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.push(n.pop() >> r),
                e.pc++
            }
            ,
            t.lshr = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.pushWithNull(n.pop2().shiftRight(u.fromInt(r))),
                e.pc++
            }
            ,
            t.iushr = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.push(n.pop() >>> r | 0),
                e.pc++
            }
            ,
            t.lushr = function(t, e) {
                var n = e.opStack
                  , r = n.pop();
                n.pushWithNull(n.pop2().shiftRightUnsigned(u.fromInt(r))),
                e.pc++
            }
            ,
            t.iand = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() & n.pop()),
                e.pc++
            }
            ,
            t.land = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().and(n.pop2())),
                e.pc++
            }
            ,
            t.ior = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() | n.pop()),
                e.pc++
            }
            ,
            t.lor = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().or(n.pop2())),
                e.pc++
            }
            ,
            t.ixor = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() ^ n.pop()),
                e.pc++
            }
            ,
            t.lxor = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().xor(n.pop2())),
                e.pc++
            }
            ,
            t.iinc = function(t, e, n) {
                var r = e.pc
                  , a = n.readUInt8(r + 1)
                  , o = n.readInt8(r + 2);
                e.locals[a] = e.locals[a] + o | 0,
                e.pc += 3
            }
            ,
            t.i2l = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(u.fromInt(n.pop())),
                e.pc++
            }
            ,
            t.i2f = function(t, e) {
                e.pc++
            }
            ,
            t.i2d = function(t, e) {
                e.opStack.push(null),
                e.pc++
            }
            ,
            t.l2i = function(t, e) {
                var n = e.opStack;
                n.push(n.pop2().toInt()),
                e.pc++
            }
            ,
            t.l2f = function(t, e) {
                var n = e.opStack;
                n.push(n.pop2().toNumber()),
                e.pc++
            }
            ,
            t.l2d = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(n.pop2().toNumber()),
                e.pc++
            }
            ,
            t.f2i = function(t, e) {
                var n = e.opStack;
                n.push(c.float2int(n.pop())),
                e.pc++
            }
            ,
            t.f2l = function(t, e) {
                var n = e.opStack;
                n.pushWithNull(u.fromNumber(n.pop())),
                e.pc++
            }
            ,
            t.f2d = function(t, e) {
                e.opStack.push(null),
                e.pc++
            }
            ,
            t.d2i = function(t, e) {
                var n = e.opStack;
                n.push(c.float2int(n.pop2())),
                e.pc++
            }
            ,
            t.d2l = function(t, e) {
                var n = e.opStack
                  , r = n.pop2();
                r === Number.POSITIVE_INFINITY ? n.pushWithNull(u.MAX_VALUE) : r === Number.NEGATIVE_INFINITY ? n.pushWithNull(u.MIN_VALUE) : n.pushWithNull(u.fromNumber(r)),
                e.pc++
            }
            ,
            t.d2f = function(t, e) {
                var n = e.opStack;
                n.pop(),
                n.push(c.wrapFloat(n.pop())),
                e.pc++
            }
            ,
            t.i2b = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() << 24 >> 24),
                e.pc++
            }
            ,
            t.i2c = function(t, e) {
                var n = e.opStack;
                n.push(65535 & n.pop()),
                e.pc++
            }
            ,
            t.i2s = function(t, e) {
                var n = e.opStack;
                n.push(n.pop() << 16 >> 16),
                e.pc++
            }
            ,
            t.lcmp = function(t, e) {
                var n = e.opStack
                  , r = n.pop2();
                n.push(n.pop2().compare(r)),
                e.pc++
            }
            ,
            t.fcmpl = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = n.pop();
                a === r ? n.push(0) : a > r ? n.push(1) : n.push(-1),
                e.pc++
            }
            ,
            t.fcmpg = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = n.pop();
                a === r ? n.push(0) : r > a ? n.push(-1) : n.push(1),
                e.pc++
            }
            ,
            t.dcmpl = function(t, e) {
                var n = e.opStack
                  , r = n.pop2()
                  , a = n.pop2();
                a === r ? n.push(0) : a > r ? n.push(1) : n.push(-1),
                e.pc++
            }
            ,
            t.dcmpg = function(t, e) {
                var n = e.opStack
                  , r = n.pop2()
                  , a = n.pop2();
                a === r ? n.push(0) : r > a ? n.push(-1) : n.push(1),
                e.pc++
            }
            ,
            t.ifeq = function(t, e, n) {
                var r = e.pc;
                if (0 === e.opStack.pop()) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.ifne = function(t, e, n) {
                var r = e.pc;
                if (0 !== e.opStack.pop()) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.iflt = function(t, e, n) {
                var r = e.pc;
                if (e.opStack.pop() < 0) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.ifge = function(t, e, n) {
                var r = e.pc;
                if (e.opStack.pop() >= 0) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.ifgt = function(t, e, n) {
                var r = e.pc;
                if (e.opStack.pop() > 0) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.ifle = function(t, e, n) {
                var r = e.pc;
                if (e.opStack.pop() <= 0) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmpeq = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o === a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmpne = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o !== a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmplt = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (a > o) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmpge = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o >= a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmpgt = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o > a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_icmple = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (a >= o) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_acmpeq = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o === a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.if_acmpne = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack.pop()
                  , o = e.opStack.pop();
                if (o !== a) {
                    var s = n.readInt16BE(r + 1);
                    e.pc += s,
                    0 > s && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t["goto"] = function(t, e, n) {
                var r = e.pc
                  , a = n.readInt16BE(r + 1);
                e.pc += a,
                0 > a && e.method.incrBBEntries()
            }
            ,
            t.jsr = function(t, e, n) {
                var r = e.pc;
                e.opStack.push(r + 3);
                var a = n.readInt16BE(r + 1);
                e.pc += a,
                0 > a && e.method.incrBBEntries()
            }
            ,
            t.ret = function(t, e, n) {
                var r = e.pc;
                e.pc = e.locals[n.readUInt8(r + 1)]
            }
            ,
            t.tableswitch = function(t, e, n) {
                var r = e.pc;
                r += (4 - (r + 1) % 4) % 4 + 1;
                var a = n.readInt32BE(r)
                  , o = n.readInt32BE(r + 4)
                  , s = n.readInt32BE(r + 8)
                  , i = e.opStack.pop();
                i >= o && s >= i ? e.pc += n.readInt32BE(r + 12 + 4 * (i - o)) : e.pc += a
            }
            ,
            t.lookupswitch = function(t, e, n) {
                var r = e.pc;
                r += (4 - (r + 1) % 4) % 4 + 1;
                var a, o = n.readInt32BE(r), s = n.readInt32BE(r + 4), i = e.opStack.pop();
                for (r += 8,
                a = 0; s > a; a++) {
                    if (n.readInt32BE(r) === i) {
                        var l = n.readInt32BE(r + 4);
                        return e.pc += l,
                        void (0 > l && e.method.incrBBEntries())
                    }
                    r += 8
                }
                e.pc += o
            }
            ,
            t["return"] = function(t, e) {
                e.returnToThreadLoop = !0,
                e.method.accessFlags.isSynchronized() && !e.method.methodLock(t, e).exit(t) || t.asyncReturn()
            }
            ,
            t._return_32 = function(t, e) {
                e.returnToThreadLoop = !0,
                e.method.accessFlags.isSynchronized() && !e.method.methodLock(t, e).exit(t) || t.asyncReturn(e.opStack.bottom())
            }
            ,
            t._return_64 = function(t, e) {
                e.returnToThreadLoop = !0,
                e.method.accessFlags.isSynchronized() && !e.method.methodLock(t, e).exit(t) || t.asyncReturn(e.opStack.bottom(), null)
            }
            ,
            t.getstatic = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                if (a.isResolved()) {
                    var i = a.field.cls;
                    i.isInitialized(t) ? ("J" === a.nameAndTypeInfo.descriptor || "D" === a.nameAndTypeInfo.descriptor ? n.writeUInt8(p.OpCode.GETSTATIC_FAST64, r) : n.writeUInt8(p.OpCode.GETSTATIC_FAST32, r),
                    a.fieldOwnerConstructor = i.getConstructor(t)) : s(t, e, i)
                } else
                    o(t, e, a)
            }
            ,
            t.getstatic_fast32 = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                e.opStack.push(a.fieldOwnerConstructor[a.fullFieldName]),
                e.pc += 3
            }
            ,
            t.getstatic_fast64 = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                e.opStack.pushWithNull(a.fieldOwnerConstructor[a.fullFieldName]),
                e.pc += 3
            }
            ,
            t.putstatic = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                if (a.isResolved()) {
                    var i = a.field.cls;
                    i.isInitialized(t) ? ("J" === a.nameAndTypeInfo.descriptor || "D" === a.nameAndTypeInfo.descriptor ? n.writeUInt8(p.OpCode.PUTSTATIC_FAST64, r) : n.writeUInt8(p.OpCode.PUTSTATIC_FAST32, r),
                    a.fieldOwnerConstructor = i.getConstructor(t)) : s(t, e, i)
                } else
                    o(t, e, a)
            }
            ,
            t.putstatic_fast32 = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.fieldOwnerConstructor[a.fullFieldName] = e.opStack.pop(),
                e.pc += 3
            }
            ,
            t.putstatic_fast64 = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.fieldOwnerConstructor[a.fullFieldName] = e.opStack.pop2(),
                e.pc += 3
            }
            ,
            t.getfield = function(t, e, n) {
                var a = e.pc
                  , s = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , i = (e.getLoader(),
                e.opStack.top());
                if (!r(t, e, i))
                    if (s.isResolved()) {
                        var l = s.field;
                        "J" == l.rawDescriptor || "D" == l.rawDescriptor ? n.writeUInt8(p.OpCode.GETFIELD_FAST64, a) : n.writeUInt8(p.OpCode.GETFIELD_FAST32, a)
                    } else
                        o(t, e, s)
            }
            ,
            t.getfield_fast32 = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = e.opStack
                  , i = s.pop();
                r(t, e, i) || (s.push(i[o.fullFieldName]),
                e.pc += 3)
            }
            ,
            t.getfield_fast64 = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = e.opStack
                  , i = s.pop();
                r(t, e, i) || (s.pushWithNull(i[o.fullFieldName]),
                e.pc += 3)
            }
            ,
            t.putfield = function(t, e, n) {
                var a = e.pc
                  , s = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , i = (e.getLoader(),
                "J" == s.nameAndTypeInfo.descriptor || "D" == s.nameAndTypeInfo.descriptor)
                  , l = e.opStack.fromTop(i ? 2 : 1);
                if (!r(t, e, l))
                    if (s.isResolved()) {
                        var u = s.field;
                        i ? n.writeUInt8(p.OpCode.PUTFIELD_FAST64, a) : n.writeUInt8(p.OpCode.PUTFIELD_FAST32, a),
                        s.fullFieldName = c.descriptor2typestr(u.cls.getInternalName()) + "/" + s.nameAndTypeInfo.name
                    } else
                        o(t, e, s)
            }
            ,
            t.putfield_fast32 = function(t, e, n) {
                var a = e.pc
                  , o = e.opStack
                  , s = o.pop()
                  , i = o.pop()
                  , l = e.method.cls.constantPool.get(n.readUInt16BE(a + 1));
                r(t, e, i) || (i[l.fullFieldName] = s,
                e.pc += 3)
            }
            ,
            t.putfield_fast64 = function(t, e, n) {
                var a = e.pc
                  , o = e.opStack
                  , s = o.pop2()
                  , i = o.pop()
                  , l = e.method.cls.constantPool.get(n.readUInt16BE(a + 1));
                r(t, e, i) || (i[l.fullFieldName] = s,
                e.pc += 3)
            }
            ,
            t.invokevirtual = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                if (a.isResolved()) {
                    var s = a.method;
                    if (s.isSignaturePolymorphic())
                        switch (s.name) {
                        case "invokeBasic":
                            n.writeUInt8(p.OpCode.INVOKEBASIC, r);
                            break;
                        case "invoke":
                        case "invokeExact":
                            n.writeUInt8(p.OpCode.INVOKEHANDLE, r);
                            break;
                        default:
                            l(t, e, "Ljava/lang/AbstractMethodError;", "Invalid signature polymorphic method: " + s.cls.getExternalName() + "." + s.name)
                        }
                    else
                        n.writeUInt8(p.OpCode.INVOKEVIRTUAL_FAST, r)
                } else
                    o(t, e, a)
            }
            ,
            t.invokeinterface = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? a.method.cls.isInitialized(t) ? n.writeUInt8(p.OpCode.INVOKEINTERFACE_FAST, r) : i(t, e, a.classInfo) : o(t, e, a)
            }
            ,
            t.invokedynamic = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                t.setStatus(p.ThreadStatus.ASYNC_WAITING),
                a.constructCallSiteObject(t, e.getLoader(), e.method.cls, r, function(e) {
                    e && (n.writeUInt8(p.OpCode.INVOKEDYNAMIC_FAST, r),
                    t.setStatus(p.ThreadStatus.RUNNABLE))
                }),
                e.returnToThreadLoop = !0
            }
            ,
            t.invokespecial = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? n.writeUInt8(p.OpCode.INVOKENONVIRTUAL_FAST, r) : o(t, e, a)
            }
            ,
            t.invokestatic = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                if (a.isResolved()) {
                    var i = a.method;
                    if (i.cls.isInitialized(t)) {
                        var l = p.OpCode.INVOKESTATIC_FAST;
                        if (a.method.isSignaturePolymorphic())
                            switch (a.method.name) {
                            case "linkToInterface":
                            case "linkToVirtual":
                                l = p.OpCode.LINKTOVIRTUAL;
                                break;
                            case "linkToStatic":
                            case "linkToSpecial":
                                l = p.OpCode.LINKTOSPECIAL
                            }
                        n.writeUInt8(l, r)
                    } else
                        s(t, e, i.cls)
                } else
                    o(t, e, a)
            }
            ,
            t.invokenonvirtual_fast = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = e.opStack
                  , i = o.paramWordSize
                  , l = s.fromTop(i);
                if (!r(t, e, l)) {
                    var u = s.sliceFromTop(i);
                    s.dropFromTop(i + 1),
                    l[o.fullSignature](t, u),
                    e.returnToThreadLoop = !0
                }
            }
            ,
            t.invokestatic_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1))
                  , o = e.opStack
                  , s = a.paramWordSize
                  , i = o.sliceAndDropFromTop(s);
                a.jsConstructor[a.fullSignature](t, i),
                e.returnToThreadLoop = !0
            }
            ,
            t.invokevirtual_fast = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = o.paramWordSize
                  , i = e.opStack
                  , l = i.fromTop(s);
                r(t, e, l) || (l[o.signature](t, i.sliceFromTop(s)),
                i.dropFromTop(s + 1),
                e.returnToThreadLoop = !0)
            }
            ,
            t.invokedynamic_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1))
                  , o = a.getCallSiteObject(r)
                  , s = o[1]
                  , i = o[0].vmtarget
                  , l = e.opStack
                  , u = a.paramWordSize
                  , c = l.sliceAndDropFromTop(u);
                null !== s && c.push(s),
                i(t, null, c),
                e.returnToThreadLoop = !0
            }
            ,
            t.invokehandle = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = e.opStack
                  , i = o.memberName.vmtarget
                  , l = o.paramWordSize + 1
                  , u = o.appendix
                  , c = s.sliceFromTop(l);
                null !== u && c.push(u),
                r(t, e, c[0]) || (s.dropFromTop(l),
                i(t, null, c),
                e.returnToThreadLoop = !0)
            }
            ,
            t.invokebasic = function(t, e, n) {
                var a, o, s = e.pc, i = e.method.cls.constantPool.get(n.readUInt16BE(s + 1)), l = i.getParamWordSize(), u = e.opStack, c = u.fromTop(l), p = u.sliceFromTop(l + 1);
                r(t, e, c) || (u.dropFromTop(l + 1),
                a = c["java/lang/invoke/MethodHandle/form"],
                o = a["java/lang/invoke/LambdaForm/vmentry"],
                o.vmtarget(t, i.nameAndTypeInfo.descriptor, p),
                e.returnToThreadLoop = !0)
            }
            ,
            t.linktospecial = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = e.opStack
                  , i = o.paramWordSize
                  , l = s.sliceFromTop(i)
                  , u = l.pop()
                  , c = o.nameAndTypeInfo.descriptor;
                r(t, e, u) || (s.dropFromTop(i),
                u.vmtarget(t, c.replace("Ljava/lang/invoke/MemberName;)", ")"), l),
                e.returnToThreadLoop = !0)
            }
            ,
            t.linktovirtual = function(t, e, n) {
                var a = e.pc
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(a + 1))
                  , s = o.paramWordSize
                  , i = e.opStack
                  , l = i.sliceFromTop(s)
                  , u = l.pop()
                  , c = o.nameAndTypeInfo.descriptor;
                r(t, e, u) || (i.dropFromTop(s),
                u.vmtarget(t, c.replace("Ljava/lang/invoke/MemberName;)", ")"), l),
                e.returnToThreadLoop = !0)
            }
            ,
            t.breakpoint = function(t, e) {
                l(t, e, "Ljava/lang/Error;", "breakpoint not implemented.")
            }
            ,
            t["new"] = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                if (a.isResolved()) {
                    var i = a.cls;
                    i.isInitialized(t) ? n.writeUInt8(p.OpCode.NEW_FAST, r) : s(t, e, i)
                } else
                    o(t, e, a)
            }
            ,
            t.new_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                e.opStack.push(new a.clsConstructor(t)),
                e.pc += 3
            }
            ,
            t.newarray = function(t, n, r) {
                var a = n.pc
                  , o = n.opStack
                  , s = "[" + e.ArrayTypes[r.readUInt8(a + 1)]
                  , i = n.getLoader().getInitializedClass(t, s)
                  , u = o.pop();
                u >= 0 ? (o.push(new (i.getConstructor(t))(t,u)),
                n.pc += 2) : l(t, n, "Ljava/lang/NegativeArraySizeException;", "Tried to init " + s + " array with length " + u)
            }
            ,
            t.anewarray = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? (n.writeUInt8(p.OpCode.ANEWARRAY_FAST, r),
                a.arrayClass = e.getLoader().getInitializedClass(t, "[" + a.cls.getInternalName()),
                a.arrayClassConstructor = a.arrayClass.getConstructor(t)) : o(t, e, a)
            }
            ,
            t.anewarray_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.opStack
                  , o = e.method.cls.constantPool.get(n.readUInt16BE(r + 1))
                  , s = a.pop();
                s >= 0 ? (a.push(new o.arrayClassConstructor(t,s)),
                e.pc += 3) : l(t, e, "Ljava/lang/NegativeArraySizeException;", "Tried to init " + o.arrayClass.getInternalName() + " array with length " + s)
            }
            ,
            t.arraylength = function(t, e) {
                var n = e.opStack
                  , a = n.pop();
                r(t, e, a) || (n.push(a.array.length),
                e.pc++)
            }
            ,
            t.athrow = function(t, e) {
                t.throwException(e.opStack.pop()),
                e.returnToThreadLoop = !0
            }
            ,
            t.checkcast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? n.writeUInt8(p.OpCode.CHECKCAST_FAST, r) : o(t, e, a)
            }
            ,
            t.checkcast_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1))
                  , o = a.cls
                  , s = e.opStack
                  , i = s.top();
                if (null == i || i.getClass().isCastable(o))
                    e.pc += 3;
                else {
                    var u = o.getExternalName()
                      , c = i.getClass().getExternalName();
                    l(t, e, "Ljava/lang/ClassCastException;", c + " cannot be cast to " + u)
                }
            }
            ,
            t["instanceof"] = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? n.writeUInt8(p.OpCode.INSTANCEOF_FAST, r) : o(t, e, a)
            }
            ,
            t.instanceof_fast = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1))
                  , o = a.cls
                  , s = e.opStack
                  , i = s.pop();
                s.push(null !== i && i.getClass().isCastable(o) ? 1 : 0),
                e.pc += 3
            }
            ,
            t.monitorenter = function(t, e) {
                var n = e.opStack
                  , r = n.pop()
                  , a = function() {
                    e.pc++
                };
                r.getMonitor().enter(t, a) ? a() : e.returnToThreadLoop = !0
            }
            ,
            t.monitorexit = function(t, e) {
                var n = e.opStack.pop();
                n.getMonitor().exit(t) ? e.pc++ : e.returnToThreadLoop = !0
            }
            ,
            t.multianewarray = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? n.writeUInt8(p.OpCode.MULTIANEWARRAY_FAST, r) : o(t, e, a)
            }
            ,
            t.multianewarray_fast = function(t, e, n) {
                var r, a, o = e.pc, s = e.method.cls.constantPool.get(n.readUInt16BE(o + 1)), i = e.opStack, u = n.readUInt8(o + 3), c = new Array(u);
                for (r = 0; u > r; r++)
                    if (a = i.pop(),
                    c[u - r - 1] = a,
                    0 > a)
                        return void l(t, e, "Ljava/lang/NegativeArraySizeException;", "Tried to init " + s.cls.getInternalName() + " array with a dimension of length " + a);
                i.push(new (s.cls.getConstructor(t))(t,c)),
                e.pc += 4
            }
            ,
            t.ifnull = function(t, e, n) {
                var r = e.pc;
                if (null == e.opStack.pop()) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.ifnonnull = function(t, e, n) {
                var r = e.pc;
                if (null != e.opStack.pop()) {
                    var a = n.readInt16BE(r + 1);
                    e.pc += a,
                    0 > a && e.method.incrBBEntries()
                } else
                    e.pc += 3
            }
            ,
            t.goto_w = function(t, e, n) {
                var r = e.pc
                  , a = n.readInt32BE(r + 1);
                e.pc += a,
                0 > a && e.method.incrBBEntries()
            }
            ,
            t.jsr_w = function(t, e, n) {
                var r = e.pc;
                e.opStack.push(e.pc + 5),
                e.pc += n.readInt32BE(r + 1)
            }
            ,
            t.nop = function(t, e) {
                e.pc += 1
            }
            ,
            t.ldc = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt8(r + 1));
                a.isResolved() ? (e.opStack.push(a.getConstant(t)),
                e.pc += 2) : o(t, e, a)
            }
            ,
            t.ldc_w = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                a.isResolved() ? (e.opStack.push(a.getConstant(t)),
                e.pc += 3) : o(t, e, a)
            }
            ,
            t.ldc2_w = function(t, e, n) {
                var r = e.pc
                  , a = e.method.cls.constantPool.get(n.readUInt16BE(r + 1));
                e.opStack.pushWithNull(a.value),
                e.pc += 3
            }
            ,
            t.wide = function(t, e, n) {
                var r = e.pc
                  , a = n.readUInt16BE(r + 2);
                switch (e.pc += 4,
                n.readUInt8(r + 1)) {
                case p.OpCode.ILOAD:
                case p.OpCode.FLOAD:
                case p.OpCode.ALOAD:
                    e.opStack.push(e.locals[a]);
                    break;
                case p.OpCode.LLOAD:
                case p.OpCode.DLOAD:
                    e.opStack.pushWithNull(e.locals[a]);
                    break;
                case p.OpCode.ISTORE:
                case p.OpCode.FSTORE:
                case p.OpCode.ASTORE:
                    e.locals[a] = e.opStack.pop();
                    break;
                case p.OpCode.LSTORE:
                case p.OpCode.DSTORE:
                    e.locals[a + 1] = e.opStack.pop(),
                    e.locals[a] = e.opStack.pop();
                    break;
                case p.OpCode.RET:
                    e.pc = e.locals[a];
                    break;
                case p.OpCode.IINC:
                    var o = n.readInt16BE(r + 4);
                    e.locals[a] = e.locals[a] + o | 0,
                    e.pc += 2
                }
            }
            ,
            t.iaload = t._aload_32,
            t.faload = t._aload_32,
            t.aaload = t._aload_32,
            t.baload = t._aload_32,
            t.caload = t._aload_32,
            t.saload = t._aload_32,
            t.daload = t._aload_64,
            t.laload = t._aload_64,
            t.iastore = t._astore_32,
            t.fastore = t._astore_32,
            t.aastore = t._astore_32,
            t.bastore = t._astore_32,
            t.castore = t._astore_32,
            t.sastore = t._astore_32,
            t.lastore = t._astore_64,
            t.dastore = t._astore_64,
            t.iconst_0 = t._const_0_32,
            t.iconst_1 = t._const_1_32,
            t.iconst_2 = t._const_2_32,
            t.fconst_0 = t._const_0_32,
            t.fconst_1 = t._const_1_32,
            t.fconst_2 = t._const_2_32,
            t.iload = t._load_32,
            t.iload_0 = t._load_0_32,
            t.iload_1 = t._load_1_32,
            t.iload_2 = t._load_2_32,
            t.iload_3 = t._load_3_32,
            t.fload = t._load_32,
            t.fload_0 = t._load_0_32,
            t.fload_1 = t._load_1_32,
            t.fload_2 = t._load_2_32,
            t.fload_3 = t._load_3_32,
            t.aload = t._load_32,
            t.aload_0 = t._load_0_32,
            t.aload_1 = t._load_1_32,
            t.aload_2 = t._load_2_32,
            t.aload_3 = t._load_3_32,
            t.lload = t._load_64,
            t.lload_0 = t._load_0_64,
            t.lload_1 = t._load_1_64,
            t.lload_2 = t._load_2_64,
            t.lload_3 = t._load_3_64,
            t.dload = t._load_64,
            t.dload_0 = t._load_0_64,
            t.dload_1 = t._load_1_64,
            t.dload_2 = t._load_2_64,
            t.dload_3 = t._load_3_64,
            t.istore = t._store_32,
            t.istore_0 = t._store_0_32,
            t.istore_1 = t._store_1_32,
            t.istore_2 = t._store_2_32,
            t.istore_3 = t._store_3_32,
            t.fstore = t._store_32,
            t.fstore_0 = t._store_0_32,
            t.fstore_1 = t._store_1_32,
            t.fstore_2 = t._store_2_32,
            t.fstore_3 = t._store_3_32,
            t.astore = t._store_32,
            t.astore_0 = t._store_0_32,
            t.astore_1 = t._store_1_32,
            t.astore_2 = t._store_2_32,
            t.astore_3 = t._store_3_32,
            t.lstore = t._store_64,
            t.lstore_0 = t._store_0_64,
            t.lstore_1 = t._store_1_64,
            t.lstore_2 = t._store_2_64,
            t.lstore_3 = t._store_3_64,
            t.dstore = t._store_64,
            t.dstore_0 = t._store_0_64,
            t.dstore_1 = t._store_1_64,
            t.dstore_2 = t._store_2_64,
            t.dstore_3 = t._store_3_64,
            t.ireturn = t._return_32,
            t.freturn = t._return_32,
            t.areturn = t._return_32,
            t.lreturn = t._return_64,
            t.dreturn = t._return_64,
            t.invokeinterface_fast = t.invokevirtual_fast,
            t
        }();
        e.Opcodes = h,
        e.LookupTable = new Array(255),
        function() {
            for (var t = 0; 255 > t; t++)
                p.OpCode.hasOwnProperty("" + t) && (e.LookupTable[t] = h[p.OpCode[t].toLowerCase()])
        }()
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return null === t ? "!" : void 0 === t ? "undef" : null != t.ref ? "*" + t.ref : t instanceof c ? t + "L" : t
        }
        function a(t) {
            return t.map(r)
        }
        function o(t, n) {
            if (t <= e.log_level) {
                var r = n.join(" ");
                1 == t ? console.error(r) : console.log(r)
            }
        }
        function s() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n - 0] = arguments[n];
            o(e.VTRACE, t)
        }
        function i() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n - 0] = arguments[n];
            o(e.TRACE, t)
        }
        function l() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n - 0] = arguments[n];
            o(e.DEBUG, t)
        }
        function u() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n - 0] = arguments[n];
            o(e.ERROR, t)
        }
        var c = n(8);
        e.debug_var = r,
        e.debug_vars = a,
        e.VTRACE = 10,
        e.TRACE = 9,
        e.DEBUG = 5,
        e.ERROR = 1,
        e.log_level = e.ERROR,
        e.vtrace = s,
        e.trace = i,
        e.debug = l,
        e.error = u
    }
    , function(t, e) {
        "use strict";
        var n = function() {
            function t() {
                this._data = []
            }
            return t.prototype.write = function(t) {
                this._data.push(t)
            }
            ,
            t.prototype.flush = function() {
                var t = this._data.join("");
                return this._data = [],
                t
            }
            ,
            t
        }();
        t.exports = n
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            return t.length > 0 ? "f.pc=" + e + ";f.opStack.pushAll(" + t.join(",") + ");" : "f.pc=" + e + ";"
        }
        var a = n(9)
          , o = n(16)
          , s = /\\/g;
        e.opJitInfo = function() {
            var t = []
              , e = a.OpCode;
            t[e.ACONST_NULL] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=null;" + r
                }
            },
            t[e.ICONST_M1] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=-1;" + r
                }
            };
            var n = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[0];" + r
                }
            }
              , i = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[1];" + r
                }
            }
              , l = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[2];" + r
                }
            }
              , u = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[3];" + r
                }
            };
            t[e.ALOAD_0] = n,
            t[e.ILOAD_0] = n,
            t[e.FLOAD_0] = n,
            t[e.ALOAD_1] = i,
            t[e.ILOAD_1] = i,
            t[e.FLOAD_1] = i,
            t[e.ALOAD_2] = l,
            t[e.ILOAD_2] = l,
            t[e.FLOAD_2] = l,
            t[e.ALOAD_3] = u,
            t[e.ILOAD_3] = u,
            t[e.FLOAD_3] = u;
            var c = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[0]," + e[1] + "=null;" + r
                }
            }
              , p = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[1]," + e[1] + "=null;" + r
                }
            }
              , h = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[2]," + e[1] + "=null;" + r
                }
            }
              , f = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=f.locals[3]," + e[1] + "=null;" + r
                }
            };
            t[e.LLOAD_0] = c,
            t[e.DLOAD_0] = c,
            t[e.LLOAD_1] = p,
            t[e.DLOAD_1] = p,
            t[e.LLOAD_2] = h,
            t[e.DLOAD_2] = h,
            t[e.LLOAD_3] = f,
            t[e.DLOAD_3] = f;
            var d = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[0]=" + t[0] + ";" + r
                }
            }
              , _ = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[1]=" + t[0] + ";" + r
                }
            }
              , g = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[2]=" + t[0] + ";" + r
                }
            }
              , v = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[3]=" + t[0] + ";" + r
                }
            };
            t[e.ASTORE_0] = d,
            t[e.ISTORE_0] = d,
            t[e.FSTORE_0] = d,
            t[e.ASTORE_1] = _,
            t[e.ISTORE_1] = _,
            t[e.FSTORE_1] = _,
            t[e.ASTORE_2] = g,
            t[e.ISTORE_2] = g,
            t[e.FSTORE_2] = g,
            t[e.ASTORE_3] = v,
            t[e.ISTORE_3] = v,
            t[e.FSTORE_3] = v;
            var m = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt8(o + 1);
                    return "f.locals[" + (s + 1) + "]=" + t[0] + ";f.locals[" + s + "]=" + t[1] + ";" + r
                }
            }
              , T = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[1]=" + t[0] + ";f.locals[0]=" + t[1] + ";" + r
                }
            }
              , y = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[2]=" + t[0] + ";f.locals[1]=" + t[1] + ";" + r
                }
            }
              , I = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[3]=" + t[0] + ";f.locals[2]=" + t[1] + ";" + r
                }
            }
              , E = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "f.locals[4]=" + t[0] + ";f.locals[3]=" + t[1] + ";" + r
                }
            };
            t[e.LSTORE] = m,
            t[e.DSTORE] = m,
            t[e.LSTORE_0] = T,
            t[e.DSTORE_0] = T,
            t[e.LSTORE_1] = y,
            t[e.DSTORE_1] = y,
            t[e.LSTORE_2] = I,
            t[e.DSTORE_2] = I,
            t[e.LSTORE_3] = E,
            t[e.DSTORE_3] = E;
            var A = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=0;" + r
                }
            }
              , S = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=1;" + r
                }
            }
              , C = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=2;" + r
                }
            };
            t[e.ICONST_0] = A,
            t[e.ICONST_1] = S,
            t[e.ICONST_2] = C,
            t[e.FCONST_0] = A,
            t[e.FCONST_1] = S,
            t[e.FCONST_2] = C,
            t[e.ICONST_3] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=3;" + r
                }
            },
            t[e.ICONST_4] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=4;" + r
                }
            },
            t[e.ICONST_5] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=5;" + r
                }
            },
            t[e.LCONST_0] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.gLong.ZERO," + e[1] + "=null;" + r
                }
            },
            t[e.LCONST_1] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.gLong.ONE," + e[1] + "=null;" + r
                }
            },
            t[e.DCONST_0] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=0," + e[1] + "=null;" + r
                }
            },
            t[e.DCONST_1] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=1," + e[1] + "=null;" + r
                }
            };
            var N = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(!u.isNull(t,f," + t[1] + ")){\nvar len" + n + "=" + t[1] + ".array.length;\nif(" + t[0] + "<0||" + t[0] + ">=len" + n + "){\n" + l + "\nu.throwException(t,f,'Ljava/lang/ArrayIndexOutOfBoundsException;',\"\"+" + t[0] + '+" not in length "+len' + n + '+" array of type "+' + t[1] + ".getClass().getInternalName());\n}else{var " + e[0] + "=" + t[1] + ".array[" + t[0] + "];" + a + "}\n}else{" + l + "}"
                }
            };
            t[e.IALOAD] = N,
            t[e.FALOAD] = N,
            t[e.AALOAD] = N,
            t[e.BALOAD] = N,
            t[e.CALOAD] = N,
            t[e.SALOAD] = N;
            var L = {
                hasBranch: !1,
                pops: 2,
                pushes: 2,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(!u.isNull(t,f," + t[1] + ")){\nvar len" + n + "=" + t[1] + ".array.length;\nif(" + t[0] + "<0||" + t[0] + ">=len" + n + "){\n" + l + "\nu.throwException(t,f,'Ljava/lang/ArrayIndexOutOfBoundsException;',\"\"+" + t[0] + '+" not in length "+len' + n + '+" array of type "+' + t[1] + ".getClass().getInternalName());\n}else{var " + e[0] + "=" + t[1] + ".array[" + t[0] + "]," + e[1] + "=null;" + a + "}\n}else{" + l + "}"
                }
            };
            t[e.DALOAD] = L,
            t[e.LALOAD] = L;
            var b = {
                hasBranch: !1,
                pops: 3,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(!u.isNull(t,f," + t[2] + ")){\nvar len" + n + "=" + t[2] + ".array.length;\nif(" + t[1] + "<0||" + t[1] + ">=len" + n + "){\n" + l + "\nu.throwException(t,f,'Ljava/lang/ArrayIndexOutOfBoundsException;',\"\"+" + t[1] + '+" not in length "+len' + n + '+" array of type "+' + t[2] + ".getClass().getInternalName());\n}else{" + t[2] + ".array[" + t[1] + "]=" + t[0] + ";" + a + "}\n}else{" + l + "}"
                }
            };
            t[e.IASTORE] = b,
            t[e.FASTORE] = b,
            t[e.AASTORE] = b,
            t[e.BASTORE] = b,
            t[e.CASTORE] = b,
            t[e.SASTORE] = b;
            var O = {
                hasBranch: !1,
                pops: 4,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(!u.isNull(t,f," + t[3] + ")){\nvar len" + n + "=" + t[3] + ".array.length;\nif(" + t[2] + "<0||" + t[2] + ">=len" + n + "){\n" + l + "\nu.throwException(t,f,'Ljava/lang/ArrayIndexOutOfBoundsException;',\"\"+" + t[2] + '+" not in length "+len' + n + '+" array of type "+' + t[3] + ".getClass().getInternalName());\n}else{" + t[3] + ".array[" + t[2] + "]=" + t[1] + ";" + a + "}\n}else{" + l + "}"
                }
            };
            t[e.DASTORE] = O,
            t[e.LASTORE] = O,
            t[e.LDC] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readUInt8(s + 1)
                      , u = r(i, s);
                    return "\nvar cnst" + n + "=f.method.cls.constantPool.get(" + l + ");\nif(cnst" + n + ".isResolved()){var " + e[0] + "=cnst" + n + ".getConstant(t);" + a + "\n}else{" + u + "u.resolveCPItem(t,f,cnst" + n + ");}"
                }
            },
            t[e.LDC_W] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readUInt16BE(s + 1)
                      , u = r(i, s);
                    return "\nvar cnst" + n + "=f.method.cls.constantPool.get(" + l + ");\nif(cnst" + n + ".isResolved()){var " + e[0] + "=cnst" + n + ".getConstant(t);" + a + "\n}else{" + u + "u.resolveCPItem(t,f,cnst" + n + ");}"
                }
            },
            t[e.LDC2_W] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt16BE(o + 1);
                    return "var " + e[0] + "=f.method.cls.constantPool.get(" + s + ").value," + e[1] + "=null;" + r
                }
            },
            t[e.GETSTATIC_FAST32] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt16BE(o + 1);
                    return "var fi" + n + "=f.method.cls.constantPool.get(" + s + ")," + e[0] + "=fi" + n + ".fieldOwnerConstructor[fi" + n + ".fullFieldName];" + r
                }
            },
            t[e.GETSTATIC_FAST64] = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt16BE(o + 1);
                    return "\nvar fi" + n + "=f.method.cls.constantPool.get(" + s + ")," + e[0] + "=fi" + n + ".fieldOwnerConstructor[fi" + n + ".fullFieldName],\n" + e[1] + "=null;" + r
                }
            },
            t[e.GETFIELD_FAST32] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, a, o, i, l, u) {
                    var c = r(l, i)
                      , p = o.readUInt16BE(i + 1)
                      , h = u.cls.constantPool.get(p)
                      , f = h.fullFieldName.replace(s, "\\\\");
                    return "if(!u.isNull(t,f," + t[0] + ")){var " + e[0] + "=" + t[0] + "['" + f + "'];" + a + "}else{" + c + "}"
                }
            },
            t[e.GETFIELD_FAST64] = {
                hasBranch: !1,
                pops: 1,
                pushes: 2,
                emit: function(t, e, n, a, o, i, l, u) {
                    var c = r(l, i)
                      , p = o.readUInt16BE(i + 1)
                      , h = u.cls.constantPool.get(p)
                      , f = h.fullFieldName.replace(s, "\\\\");
                    return "if(!u.isNull(t,f," + t[0] + ")){var " + e[0] + "=" + t[0] + "['" + f + "']," + e[1] + "=null;" + a + "}else{" + c + "}"
                }
            },
            t[e.PUTFIELD_FAST32] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, i, l, u) {
                    var c = r(l, i)
                      , p = o.readUInt16BE(i + 1)
                      , h = u.cls.constantPool.get(p)
                      , f = h.fullFieldName.replace(s, "\\\\");
                    return "if(!u.isNull(t,f," + t[1] + ")){" + t[1] + "['" + f + "']=" + t[0] + ";" + a + "}else{" + c + "}"
                }
            },
            t[e.PUTFIELD_FAST64] = {
                hasBranch: !1,
                pops: 3,
                pushes: 0,
                emit: function(t, e, n, a, o, i, l, u) {
                    var c = r(l, i)
                      , p = o.readUInt16BE(i + 1)
                      , h = u.cls.constantPool.get(p)
                      , f = h.fullFieldName.replace(s, "\\\\");
                    return "if(!u.isNull(t,f," + t[2] + ")){" + t[2] + "['" + f + "']=" + t[1] + ";" + a + "}else{" + c + "}"
                }
            },
            t[e.INSTANCEOF_FAST] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt16BE(o + 1);
                    return "var cls" + n + "=f.method.cls.constantPool.get(" + s + ").cls," + e[0] + "=" + t[0] + "!==null?(" + t[0] + ".getClass().isCastable(cls" + n + ")?1:0):0;" + r
                }
            },
            t[e.CHECKCAST_FAST] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r, a, o, s, i) {
                    var l = a.readUInt16BE(o + 1)
                      , u = i.cls.constantPool.get(l)
                      , c = u.cls.getExternalName();
                    return "var cls" + n + "=f.method.cls.constantPool.get(" + l + ").cls;\nif((" + t[0] + "!=null)&&!" + t[0] + ".getClass().isCastable(cls" + n + ")){\nu.throwException(t,f,'Ljava/lang/ClassCastException;'," + t[0] + ".getClass().getExternalName()+' cannot be cast to " + c + "');\n}else{var " + e[0] + "=" + t[0] + ";" + r + "}"
                }
            },
            t[e.ARRAYLENGTH] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "if(!u.isNull(t,f," + t[0] + ")){var " + e[0] + "=" + t[0] + ".array.length;" + a + "}else{" + l + "}"
                }
            };
            var w = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt8(o + 1);
                    return "var " + e[0] + "=f.locals[" + s + "];" + r
                }
            };
            t[e.ILOAD] = w,
            t[e.ALOAD] = w,
            t[e.FLOAD] = w;
            var k = {
                hasBranch: !1,
                pops: 0,
                pushes: 2,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt8(o + 1);
                    return "var " + e[0] + "=f.locals[" + s + "]," + e[1] + "=null;" + r
                }
            };
            t[e.LLOAD] = k,
            t[e.DLOAD] = k;
            var R = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt8(o + 1);
                    return "f.locals[" + s + "]=" + t[0] + ";" + r
                }
            };
            t[e.ISTORE] = R,
            t[e.ASTORE] = R,
            t[e.FSTORE] = R,
            t[e.BIPUSH] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readInt8(o + 1);
                    return "var " + e[0] + "=" + s + ";" + r
                }
            },
            t[e.SIPUSH] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readInt16BE(o + 1);
                    return "var " + e[0] + "=" + s + ";" + r
                }
            },
            t[e.IINC] = {
                hasBranch: !1,
                pops: 0,
                pushes: 0,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt8(o + 1)
                      , i = a.readInt8(o + 2);
                    return "f.locals[" + s + "]=(f.locals[" + s + "]+" + i + ")|0;" + r
                }
            },
            t[e.ATHROW] = {
                hasBranch: !0,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return l + "t.throwException(" + t[0] + ");f.returnToThreadLoop=true;"
                }
            },
            t[e.GOTO] = {
                hasBranch: !0,
                pops: 0,
                pushes: 0,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readInt16BE(o + 1);
                    return "f.pc=" + (o + s) + ";" + r
                }
            },
            t[e.TABLESWITCH] = {
                hasBranch: !0,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r, a, o) {
                    var s = o + (4 - (o + 1) % 4) % 4 + 1
                      , i = a.readInt32BE(s)
                      , l = a.readInt32BE(s + 4)
                      , u = a.readInt32BE(s + 8);
                    if (8 > u - l) {
                        for (var c = "switch(" + t[0] + "){", p = l; u >= p; p++) {
                            var h = a.readInt32BE(s + 12 + 4 * (p - l));
                            c += "case " + p + ":f.pc=" + (o + h) + ";break;"
                        }
                        return c += "default:f.pc=" + (o + i) + "}" + r
                    }
                    return "if(" + t[0] + ">=" + l + "&&" + t[0] + "<=" + u + "){f.pc=" + o + "+f.method.getCodeAttribute().getCode().readInt32BE(" + (s + 12) + "+((" + t[0] + "-" + l + ")*4))}else{f.pc=" + (o + i) + "}" + r
                }
            };
            var F = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "===" + t[1] + "){" + u + "}else{" + a + "}"
                }
            };
            t[e.IF_ICMPEQ] = F,
            t[e.IF_ACMPEQ] = F;
            var D = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "!==" + t[1] + "){" + u + "}else{" + a + "}"
                }
            };
            t[e.IF_ICMPNE] = D,
            t[e.IF_ACMPNE] = D,
            t[e.IF_ICMPGE] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[1] + ">=" + t[0] + "){" + u + "}else{" + a + "}"
                }
            },
            t[e.IF_ICMPGT] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[1] + ">" + t[0] + "){" + u + "}else{" + a + "}"
                }
            },
            t[e.IF_ICMPLE] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[1] + "<=" + t[0] + "){" + u + "}else{" + a + "}"
                }
            },
            t[e.IF_ICMPLT] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[1] + "<" + t[0] + "){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFNULL] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "==null){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFNONNULL] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "!=null){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFEQ] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "===0){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFNE] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "!==0){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFGT] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + ">0){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFLT] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "<0){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFGE] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + ">=0){" + u + "}else{" + a + "}"
                }
            },
            t[e.IFLE] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = o.readInt16BE(s + 1)
                      , u = r(i, s + l);
                    return "if(" + t[0] + "<=0){" + u + "}else{" + a + "}"
                }
            },
            t[e.LCMP] = {
                hasBranch: !1,
                pops: 4,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + ".compare(" + t[1] + ");" + r
                }
            },
            t[e.FCMPL] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "===" + t[1] + "?0:(" + t[1] + ">" + t[0] + "?1:-1);" + r
                }
            },
            t[e.DCMPL] = {
                hasBranch: !1,
                pops: 4,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "===" + t[1] + "?0:(" + t[3] + ">" + t[1] + "?1:-1);" + r
                }
            },
            t[e.FCMPG] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "===" + t[1] + "?0:(" + t[1] + "<" + t[0] + "?-1:1);" + r
                }
            },
            t[e.DCMPG] = {
                hasBranch: !1,
                pops: 4,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "===" + t[1] + "?0:(" + t[3] + "<" + t[1] + "?-1:1);" + r
                }
            },
            t[e.RETURN] = {
                hasBranch: !0,
                pops: 0,
                pushes: 0,
                emit: function(t, e, n, r, a, o, s, i) {
                    return i.accessFlags.isSynchronized() ? "f.pc=" + o + ";f.returnToThreadLoop=true;if(!f.method.methodLock(t,f).exit(t)){return}t.asyncReturn();" : "f.pc=" + o + ";f.returnToThreadLoop=true;t.asyncReturn();"
                }
            };
            var M = {
                hasBranch: !0,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r, a, o, s, i) {
                    return i.accessFlags.isSynchronized() ? "f.pc=" + o + ";f.returnToThreadLoop=true;if(!f.method.methodLock(t,f).exit(t)){return}t.asyncReturn(" + t[0] + ");" : "f.pc=" + o + ";f.returnToThreadLoop=true;t.asyncReturn(" + t[0] + ");"
                }
            };
            t[e.IRETURN] = M,
            t[e.FRETURN] = M,
            t[e.ARETURN] = M;
            var B = {
                hasBranch: !0,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r, a, o, s, i) {
                    return i.accessFlags.isSynchronized() ? "f.pc=" + o + ";f.returnToThreadLoop=true;if(!f.method.methodLock(t,f).exit(t)){return}t.asyncReturn(" + t[1] + ",null);" : "f.pc=" + o + ";f.returnToThreadLoop=true;t.asyncReturn(" + t[1] + ",null);"
                }
            };
            return t[e.LRETURN] = B,
            t[e.DRETURN] = B,
            t[e.MONITOREXIT] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "if(" + t[0] + ".getMonitor().exit(t)){" + a + "}else{" + l + "f.returnToThreadLoop=true;}"
                }
            },
            t[e.IXOR] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "^" + t[1] + ";" + r
                }
            },
            t[e.LXOR] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".xor(" + t[3] + ")," + e[1] + "=null;" + r
                }
            },
            t[e.IOR] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "|" + t[1] + ";" + r
                }
            },
            t[e.LOR] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + ".or(" + t[1] + ")," + e[1] + "=null;" + r
                }
            },
            t[e.IAND] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "&" + t[1] + ";" + r
                }
            },
            t[e.LAND] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + ".and(" + t[1] + ")," + e[1] + "=null;" + r
                }
            },
            t[e.IADD] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(" + t[0] + "+" + t[1] + ")|0;" + r
                }
            },
            t[e.LADD] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".add(" + t[3] + ")," + e[1] + "=null;" + r
                }
            },
            t[e.DADD] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + "+" + t[3] + "," + e[1] + "=null;" + r
                }
            },
            t[e.IMUL] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=Math.imul(" + t[0] + ", " + t[1] + ");" + r
                }
            },
            t[e.FMUL] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.wrapFloat(" + t[0] + "*" + t[1] + ");" + r
                }
            },
            t[e.LMUL] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + ".multiply(" + t[1] + ")," + e[1] + "= null;" + r
                }
            },
            t[e.DMUL] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "*" + t[1] + "," + e[1] + "=null;" + r
                }
            },
            t[e.IDIV] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(" + t[0] + "===0){" + l + "u.throwException(t,f,'Ljava/lang/ArithmeticException;','/ by zero');\n}else{var " + e[0] + "=(" + t[1] + "===u.Constants.INT_MIN&&" + t[0] + "===-1)?" + t[1] + ":((" + t[1] + "/" + t[0] + ")|0);" + a + "}"
                }
            },
            t[e.LDIV] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "\nif(" + t[1] + ".isZero()){" + l + "u.throwException(t,f,'Ljava/lang/ArithmeticException;','/ by zero');\n}else{var " + e[0] + "=" + t[3] + ".div(" + t[1] + ")," + e[1] + "=null;" + a + "}"
                }
            },
            t[e.DDIV] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "/" + t[1] + "," + e[1] + "=null;" + r
                }
            },
            t[e.ISUB] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(" + t[1] + "-" + t[0] + ")|0;" + r
                }
            },
            t[e.LSUB] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".negate().add(" + t[3] + ")," + e[1] + "= null;" + r
                }
            },
            t[e.DSUB] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "-" + t[1] + "," + e[1] + "=null;" + r
                }
            },
            t[e.IREM] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "if(" + t[0] + "===0){" + l + "u.throwException(t,f,'Ljava/lang/ArithmeticException;','/ by zero');\n}else{var " + e[0] + "=" + t[1] + "%" + t[0] + ";" + a + "}"
                }
            },
            t[e.LREM] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, a, o, s, i) {
                    var l = r(i, s);
                    return "if(" + t[1] + ".isZero()){" + l + "u.throwException(t,f,'Ljava/lang/ArithmeticException;','/ by zero');\n}else{var " + e[0] + "=" + t[3] + ".modulo(" + t[1] + ")," + e[1] + "=null;" + a + "}"
                }
            },
            t[e.DREM] = {
                hasBranch: !1,
                pops: 4,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[3] + "%" + t[1] + "," + e[1] + "=null;" + r
                }
            },
            t[e.INEG] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(-" + t[0] + ")|0;" + r
                }
            },
            t[e.LNEG] = {
                hasBranch: !1,
                pops: 2,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".negate()," + e[1] + "=null;" + r
                }
            },
            t[e.ISHL] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + "<<" + t[0] + ";" + r
                }
            },
            t[e.LSHL] = {
                hasBranch: !1,
                pops: 3,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[2] + ".shiftLeft(u.gLong.fromInt(" + t[0] + "))," + e[1] + "=null;" + r
                }
            },
            t[e.ISHR] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ">>" + t[0] + ";" + r
                }
            },
            t[e.LSHR] = {
                hasBranch: !1,
                pops: 3,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[2] + ".shiftRight(u.gLong.fromInt(" + t[0] + "))," + e[1] + "=null;" + r
                }
            },
            t[e.IUSHR] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(" + t[1] + ">>>" + t[0] + ")|0;" + r
                }
            },
            t[e.LUSHR] = {
                hasBranch: !1,
                pops: 3,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[2] + ".shiftRightUnsigned(u.gLong.fromInt(" + t[0] + "))," + e[1] + "=null;" + r
                }
            },
            t[e.I2B] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(" + t[0] + "<<24)>>24;" + r
                }
            },
            t[e.I2S] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=(" + t[0] + "<<16)>>16;" + r
                }
            },
            t[e.I2C] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "&0xFFFF;" + r
                }
            },
            t[e.I2L] = {
                hasBranch: !1,
                pops: 1,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.gLong.fromInt(" + t[0] + ")," + e[1] + "=null;" + r
                }
            },
            t[e.I2F] = {
                hasBranch: !1,
                pops: 0,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "" + r
                }
            },
            t[e.I2D] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=null;" + r
                }
            },
            t[e.F2I] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.float2int(" + t[0] + ");" + r
                }
            },
            t[e.F2D] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=null;" + r
                }
            },
            t[e.L2I] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".toInt();" + r
                }
            },
            t[e.L2D] = {
                hasBranch: !1,
                pops: 2,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + ".toNumber()," + e[1] + "=null;" + r
                }
            },
            t[e.D2I] = {
                hasBranch: !1,
                pops: 2,
                pushes: 1,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=u.float2int(" + t[1] + ");" + r
                }
            },
            t[e.DUP] = {
                hasBranch: !1,
                pops: 1,
                pushes: 2,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "," + e[1] + "=" + t[0] + ";" + r
                }
            },
            t[e.DUP2] = {
                hasBranch: !1,
                pops: 2,
                pushes: 4,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + "," + e[1] + "=" + t[0] + "," + e[2] + "=" + t[1] + "," + e[3] + "=" + t[0] + ";" + r
                }
            },
            t[e.DUP_X1] = {
                hasBranch: !1,
                pops: 2,
                pushes: 3,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "," + e[1] + "=" + t[1] + "," + e[2] + "=" + t[0] + ";" + r
                }
            },
            t[e.DUP_X2] = {
                hasBranch: !1,
                pops: 3,
                pushes: 4,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[0] + "," + e[1] + "=" + t[2] + "," + e[2] + "=" + t[1] + "," + e[3] + "=" + t[0] + ";" + r
                }
            },
            t[e.DUP2_X1] = {
                hasBranch: !1,
                pops: 3,
                pushes: 5,
                emit: function(t, e, n, r) {
                    return "var " + e[0] + "=" + t[1] + "," + e[1] + "=" + t[0] + "," + e[2] + "=" + t[2] + "," + e[3] + "=" + t[1] + "," + e[4] + "=" + t[0] + ";" + r
                }
            },
            t[e.NEW_FAST] = {
                hasBranch: !1,
                pops: 0,
                pushes: 1,
                emit: function(t, e, n, r, a, o) {
                    var s = a.readUInt16BE(o + 1);
                    return "var cr" + n + "=f.method.cls.constantPool.get(" + s + ")," + e[0] + "=(new cr" + n + ".clsConstructor(t));" + r
                }
            },
            t[e.NEWARRAY] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, a, s, i, l) {
                    var u = s.readUInt8(i + 1)
                      , c = "[" + o.ArrayTypes[u]
                      , p = r(l, i);
                    return "\nvar cls" + n + "=f.getLoader().getInitializedClass(t,'" + c + "');\nif(" + t[0] + ">=0){var " + e[0] + "=new (cls" + n + ".getConstructor(t))(t," + t[0] + ");" + a + "\n}else{" + p + "u.throwException(t,f,'Ljava/lang/NegativeArraySizeException;','Tried to init " + c + " array with length '+" + t[0] + ");}"
                }
            },
            t[e.ANEWARRAY_FAST] = {
                hasBranch: !1,
                pops: 1,
                pushes: 1,
                emit: function(t, e, n, a, s, i, l) {
                    var u = s.readUInt16BE(i + 1)
                      , c = ("[" + o.ArrayTypes[u],
                    r(l, i));
                    return "\nvar cr" + n + "=f.method.cls.constantPool.get(" + u + ");\nif(" + t[0] + ">=0){var " + e[0] + "=new cr" + n + ".arrayClassConstructor(t," + t[0] + ");" + a + "\n}else{" + c + "u.throwException(t,f,'Ljava/lang/NegativeArraySizeException;','Tried to init '+cr" + n + ".arrayClass.getInternalName()+' array with length '+" + t[0] + ");}"
                }
            },
            t[e.NOP] = {
                hasBranch: !1,
                pops: 0,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "" + r
                }
            },
            t[e.POP] = {
                hasBranch: !1,
                pops: 1,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "" + r
                }
            },
            t[e.POP2] = {
                hasBranch: !1,
                pops: 2,
                pushes: 0,
                emit: function(t, e, n, r) {
                    return "" + r
                }
            },
            t
        }()
    }
    , function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , a = n(21)
          , o = n(24)
          , s = n(26)
          , i = n(9)
          , l = n(6)
          , u = n(17)
          , c = (n(13),
        u.debug,
        function() {
            function t() {
                this.locks = {}
            }
            return t.prototype.tryLock = function(t, e, n) {
                return "undefined" == typeof this.locks[t] && (this.locks[t] = new o),
                this.locks[t].tryLock(e, n)
            }
            ,
            t.prototype.unlock = function(t, e) {
                this.locks[t].unlock(e),
                delete this.locks[t]
            }
            ,
            t.prototype.getOwner = function(t) {
                return this.locks[t] ? this.locks[t].getOwner() : null
            }
            ,
            t
        }())
          , p = function() {
            function t(t) {
                this.bootstrap = t,
                this.loadedClasses = {},
                this.loadClassLocks = new c
            }
            return t.prototype.getLoadedClassNames = function() {
                return Object.keys(this.loadedClasses)
            }
            ,
            t.prototype.addClass = function(t, e) {
                this.loadedClasses[t] = e
            }
            ,
            t.prototype.getClass = function(t) {
                return this.loadedClasses[t]
            }
            ,
            t.prototype.defineClass = function(t, e, n, r) {
                try {
                    var o = new a.ReferenceClassData(n,r,this);
                    return this.addClass(e, o),
                    o
                } catch (s) {
                    return null === t ? (u.error("JVM initialization failed: " + s),
                    u.error(s.stack)) : t.throwNewException("Ljava/lang/ClassFormatError;", s),
                    null
                }
            }
            ,
            t.prototype.defineArrayClass = function(t) {
                var e = new a.ArrayClassData(l.get_component_type(t),this);
                return this.addClass(t, e),
                e
            }
            ,
            t.prototype.getLoadedClass = function(t) {
                var e = this.loadedClasses[t];
                if (null != e)
                    return e;
                if (l.is_primitive_type(t))
                    return this.bootstrap.getPrimitiveClass(t);
                if (l.is_array_type(t)) {
                    var n = this.getLoadedClass(l.get_component_type(t));
                    if (null != n) {
                        var r = n.getLoader();
                        return r === this ? this.defineArrayClass(t) : (e = r.getLoadedClass(t),
                        this.addClass(t, e),
                        e)
                    }
                }
                return null
            }
            ,
            t.prototype.getResolvedClass = function(t) {
                var e = this.getLoadedClass(t);
                return null !== e && (e.isResolved() || e.tryToResolve()) ? e : null
            }
            ,
            t.prototype.getInitializedClass = function(t, e) {
                var n = this.getLoadedClass(e);
                return null !== n ? n.isInitialized(t) || n.tryToInitialize() ? n : null : n
            }
            ,
            t.prototype.loadClass = function(t, e, n, r) {
                var a = this;
                void 0 === r && (r = !0);
                var o = this.getLoadedClass(e);
                o ? setImmediate(function() {
                    n(o)
                }) : this.loadClassLocks.tryLock(e, t, n) && (l.is_reference_type(e) ? this._loadClass(t, e, function(t) {
                    a.loadClassLocks.unlock(e, t)
                }, r) : this.loadClass(t, l.get_component_type(e), function(t) {
                    null != t && a.loadClassLocks.unlock(e, a.getLoadedClass(e))
                }, r))
            }
            ,
            t.prototype.resolveClasses = function(t, e, n) {
                var r = this
                  , a = {};
                l.asyncForEach(e, function(e, n) {
                    r.resolveClass(t, e, function(t) {
                        null === t ? n("Error resolving class: " + e) : (a[e] = t,
                        n())
                    })
                }, function(t) {
                    n(t ? null : a)
                })
            }
            ,
            t.prototype.resolveClass = function(t, e, n, r) {
                void 0 === r && (r = !0),
                this.loadClass(t, e, function(e) {
                    null === e || e.isResolved() ? setImmediate(function() {
                        n(e)
                    }) : e.resolve(t, n, r)
                }, r)
            }
            ,
            t.prototype.initializeClass = function(t, e, n, r) {
                void 0 === r && (r = !0),
                this.resolveClass(t, e, function(e) {
                    null === e || e.isInitialized(t) ? setImmediate(function() {
                        n(e)
                    }) : e.initialize(t, n, r)
                }, r)
            }
            ,
            t.prototype.throwClassNotFoundException = function(t, e, n) {
                t.throwNewException(n ? "Ljava/lang/ClassNotFoundException;" : "Ljava/lang/NoClassDefFoundError;", "Cannot load class: " + l.ext_classname(e))
            }
            ,
            t
        }();
        e.ClassLoader = p;
        var h = function(t) {
            function e(e, n, r) {
                var a = this;
                t.call(this, null),
                this.bootstrap = this,
                this.classpath = null,
                this.loadedPackages = {},
                s.ClasspathFactory(e, n, function(t) {
                    a.classpath = t.reverse(),
                    r()
                })
            }
            return r(e, t),
            e.prototype._registerLoadedClass = function(t, e) {
                var n = t.slice(0, t.lastIndexOf("/"))
                  , r = this.loadedPackages[n];
                r ? r[0] !== e && -1 === r.indexOf(e) && r.push(e) : this.loadedPackages[n] = [e]
            }
            ,
            e.prototype.getPackages = function() {
                var t = this;
                return Object.keys(this.loadedPackages).map(function(e) {
                    return [e, t.loadedPackages[e].map(function(t) {
                        return t.getPath()
                    })]
                })
            }
            ,
            e.prototype.getPrimitiveClass = function(t) {
                var e = this.getClass(t);
                return null == e && (e = new a.PrimitiveClassData(t,this),
                this.addClass(t, e)),
                e
            }
            ,
            e.prototype._loadClass = function(t, e, n, r) {
                var a = this;
                void 0 === r && (r = !0);
                var o, s = l.descriptor2typestr(e), u = this.classpath.length, c = [];
                t: for (var p = 0; u > p; p++) {
                    var h = this.classpath[p];
                    switch (h.hasClass(s)) {
                    case i.TriState.INDETERMINATE:
                        c.push(h);
                        break;
                    case i.TriState.TRUE:
                        c.push(h);
                        break t
                    }
                }
                l.asyncFind(c, function(t, e) {
                    t.loadClass(s, function(t, n) {
                        t ? e(!1) : (o = n,
                        e(!0))
                    })
                }, function(i) {
                    if (i) {
                        var l = a.defineClass(t, e, o, null);
                        null !== l && a._registerLoadedClass(s, i),
                        n(l)
                    } else
                        a.throwClassNotFoundException(t, e, r),
                        n(null)
                })
            }
            ,
            e.prototype.getLoadedClassFiles = function() {
                var t = this.getLoadedClassNames();
                return t.filter(function(t) {
                    return l.is_reference_type(t)
                })
            }
            ,
            e.prototype.getLoaderObject = function() {
                return null
            }
            ,
            e.prototype.getClassPath = function() {
                for (var t = this.classpath.length, e = new Array(t), n = 0; t > n; n++)
                    e[n] = this.classpath[t - n - 1].getPath();
                return e
            }
            ,
            e.prototype.getClassPathItems = function() {
                return this.classpath.slice(0)
            }
            ,
            e
        }(p);
        e.BootstrapClassLoader = h;
        var f = function(t) {
            function e(e, n) {
                t.call(this, e),
                this.loaderObj = n
            }
            return r(e, t),
            e.prototype._loadClass = function(t, e, n, r) {
                var a = this;
                void 0 === r && (r = !0),
                this.loaderObj["loadClass(Ljava/lang/String;)Ljava/lang/Class;"](t, [l.initString(this.bootstrap, l.ext_classname(e))], function(o, s) {
                    if (o)
                        a.throwClassNotFoundException(t, e, r),
                        n(null);
                    else {
                        var i = s.$cls;
                        a.addClass(e, i),
                        n(i)
                    }
                })
            }
            ,
            e.prototype.getLoaderObject = function() {
                return this.loaderObj
            }
            ,
            e
        }(p);
        e.CustomClassLoader = f
    }
    , function(t, e, n) {
        "use strict";
        function r() {
            return m++
        }
        function a(t, e) {
            function n() {
                this.constructor = t
            }
            n.prototype = e.prototype,
            t.prototype = new n
        }
        var o = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , s = n(6)
          , i = n(22)
          , l = n(23)
          , u = n(12)
          , c = n(15)
          , p = n(17)
          , h = n(11)
          , f = n(9)
          , d = n(24)
          , _ = (n(13),
        n(8))
          , g = n(18)
          , v = f.ClassState
          , m = (p.trace,
        p.debug,
        n(14),
        1)
          , T = {
            "Ljava/lang/invoke/MemberName;": {
                vmtarget: ["(thread: JVMThread, descriptor: string, args: any[], cb?: (e?: JVMTypes.java_lang_Throwable, rv?: any) => void) => void", "null"],
                vmindex: ["number", "-1"]
            },
            "Ljava/lang/Object;": {
                ref: ["number", "getRef()"],
                $monitor: ["Monitor", "null"]
            },
            "Ljava/net/PlainSocketImpl;": {
                $is_shutdown: ["boolean", "false"],
                $ws: ["Interfaces.IWebsock", "null"]
            },
            "Ljava/io/FileDescriptor;": {
                $pos: ["number", "-1"]
            },
            "Ljava/lang/Class;": {
                $cls: ["ClassData", "null"]
            },
            "Ljava/lang/ClassLoader;": {
                $loader: ["ClassLoader", "new ClassLoader.CustomClassLoader(thread.getBsCl(), this);"]
            },
            "Ljava/lang/Thread;": {
                $thread: ["JVMThread", "thread ? new thread.constructor(thread.getJVM(), thread.getThreadPool(), this) : null"]
            }
        }
          , y = {
            "Ljava/lang/Object;": {
                getClass: ["(): ClassData", "function() { return this.constructor.cls }"],
                getMonitor: ["(): Monitor", "function() {\n  if (this.$monitor === null) {\n    this.$monitor = new Monitor();\n  }\n  return this.$monitor;\n}"]
            },
            "Ljava/lang/String;": {
                toString: ["(): string", "function() { return util.chars2jsStr(this['java/lang/String/value']); }"]
            },
            "Ljava/lang/Byte;": {
                unbox: ["(): number", "function() { return this['java/lang/Byte/value']; }"]
            },
            "Ljava/lang/Character;": {
                unbox: ["(): number", "function() { return this['java/lang/Character/value']; }"]
            },
            "Ljava/lang/Double;": {
                unbox: ["(): number", "function() { return this['java/lang/Double/value']; }"]
            },
            "Ljava/lang/Float;": {
                unbox: ["(): number", "function() { return this['java/lang/Float/value']; }"]
            },
            "Ljava/lang/Integer;": {
                unbox: ["(): number", "function() { return this['java/lang/Integer/value']; }"]
            },
            "Ljava/lang/Long;": {
                unbox: ["(): Long", "function() { return this['java/lang/Long/value']; }"]
            },
            "Ljava/lang/Short;": {
                unbox: ["(): number", "function() { return this['java/lang/Short/value']; }"]
            },
            "Ljava/lang/Boolean;": {
                unbox: ["(): number", "function() { return this['java/lang/Boolean/value']; }"]
            },
            "Ljava/lang/Void;": {
                unbox: ["(): number", 'function() { throw new Error("Cannot unbox a Void type."); }']
            },
            "Ljava/lang/invoke/MethodType;": {
                toString: ["(): string", 'function() { return "(" + this[\'java/lang/invoke/MethodType/ptypes\'].array.map(function (type) { return type.$cls.getInternalName(); }).join("") + ")" + this[\'java/lang/invoke/MethodType/rtype\'].$cls.getInternalName(); }']
            }
        }
          , I = {
            "Ljava/lang/Byte;": {
                box: ["(val: number): java_lang_Byte", "function(val) { var rv = new this(null); rv['java/lang/Byte/value'] = val; return rv; }"]
            },
            "Ljava/lang/Character;": {
                box: ["(val: number): java_lang_Character", "function(val) { var rv = new this(null); rv['java/lang/Character/value'] = val; return rv; }"]
            },
            "Ljava/lang/Double;": {
                box: ["(val: number): java_lang_Double", "function(val) { var rv = new this(null); rv['java/lang/Double/value'] = val; return rv; }"]
            },
            "Ljava/lang/Float;": {
                box: ["(val: number): java_lang_Float", "function(val) { var rv = new this(null); rv['java/lang/Float/value'] = val; return rv; }"]
            },
            "Ljava/lang/Integer;": {
                box: ["(val: number): java_lang_Integer", "function(val) { var rv = new this(null); rv['java/lang/Integer/value'] = val; return rv; }"]
            },
            "Ljava/lang/Long;": {
                box: ["(val: Long): java_lang_Long", "function(val) { var rv = new this(null); rv['java/lang/Long/value'] = val; return rv; }"]
            },
            "Ljava/lang/Short;": {
                box: ["(val: number): java_lang_Short", "function(val) { var rv = new this(null); rv['java/lang/Short/value'] = val; return rv; }"]
            },
            "Ljava/lang/Boolean;": {
                box: ["(val: number): java_lang_Boolean", "function(val) { var rv = new this(null); rv['java/lang/Boolean/value'] = val; return rv; }"]
            },
            "Ljava/lang/Void;": {
                box: ["(): java_lang_Void", "function() { return new this(null); }"]
            }
        }
          , E = function() {
            function t(t) {
                this.accessFlags = null,
                this.state = f.ClassState.LOADED,
                this.jco = null,
                this.superClass = null,
                this.loader = t
            }
            return t.prototype.getExternalName = function() {
                return s.ext_classname(this.className)
            }
            ,
            t.prototype.getInternalName = function() {
                return this.className
            }
            ,
            t.prototype.getPackageName = function() {
                var t, e = this.getExternalName();
                for (t = e.length - 1; t >= 0 && "." !== e[t]; t--)
                    ;
                return t >= 0 ? e.slice(0, t) : ""
            }
            ,
            t.prototype.getLoader = function() {
                return this.loader
            }
            ,
            t.prototype.getSuperClass = function() {
                return this.superClass
            }
            ,
            t.prototype.getInterfaces = function() {
                return []
            }
            ,
            t.prototype.getInjectedFields = function() {
                var t = {};
                if (void 0 !== T[this.getInternalName()]) {
                    var e = T[this.getInternalName()];
                    Object.keys(e).forEach(function(n) {
                        t[n] = e[n][0]
                    })
                }
                return t
            }
            ,
            t.prototype.getInjectedMethods = function() {
                var t = {}
                  , e = this.getInternalName();
                if ("[" === e[0] && (e = "["),
                void 0 !== y[e]) {
                    var n = y[e];
                    Object.keys(n).forEach(function(e) {
                        t[e] = n[e][0]
                    })
                }
                return t
            }
            ,
            t.prototype.getInjectedStaticMethods = function() {
                var t = {}
                  , e = this.getInternalName();
                if ("[" === e[0] && (e = "["),
                void 0 !== I[e]) {
                    var n = I[e];
                    Object.keys(n).forEach(function(e) {
                        t[e] = n[e][0]
                    })
                }
                return t
            }
            ,
            t.prototype.getClassObject = function(t) {
                return null === this.jco && (this.jco = new (t.getBsCl().getResolvedClass("Ljava/lang/Class;").getConstructor(t))(t),
                this.jco.$cls = this,
                this.jco["java/lang/Class/classLoader"] = this.getLoader().getLoaderObject()),
                this.jco
            }
            ,
            t.prototype.getProtectionDomain = function() {
                return null
            }
            ,
            t.prototype.getMethod = function(t) {
                return null
            }
            ,
            t.prototype.getMethods = function() {
                return []
            }
            ,
            t.prototype.getFields = function() {
                return []
            }
            ,
            t.prototype.setState = function(t) {
                this.state = t
            }
            ,
            t.prototype.getState = function() {
                if (this.state === v.RESOLVED && null === this.getMethod("<clinit>()V")) {
                    var t = this.getSuperClass();
                    null !== t && t.getState() === v.INITIALIZED && (this.state = v.INITIALIZED)
                }
                return this.state
            }
            ,
            t.prototype.isInitialized = function(t) {
                return this.getState() === v.INITIALIZED
            }
            ,
            t.prototype.isResolved = function() {
                return this.getState() !== v.LOADED
            }
            ,
            t.prototype.isSubinterface = function(t) {
                return !1
            }
            ,
            t.prototype.isSubclass = function(t) {
                return this === t ? !0 : null === this.getSuperClass() ? !1 : this.getSuperClass().isSubclass(t)
            }
            ,
            t.prototype.resolve = function(t, e, n) {
                throw void 0 === n && (n = !0),
                new Error("Unimplemented.")
            }
            ,
            t.prototype.initialize = function(t, e, n) {
                throw void 0 === n && (n = !0),
                new Error("Unimplemented.")
            }
            ,
            t.prototype.outputInjectedMethods = function(t, e) {
                var n = this.getInternalName();
                if ("[" === n[0] && (n = "["),
                void 0 !== y[n]) {
                    var r = y[n];
                    Object.keys(r).forEach(function(n) {
                        e.write("  " + t + ".prototype." + n + " = " + r[n][1] + ";\n")
                    })
                }
                if (void 0 !== I[n]) {
                    var a = I[n];
                    Object.keys(a).forEach(function(n) {
                        e.write("  " + t + "." + n + " = " + a[n][1] + ";\n")
                    })
                }
            }
            ,
            t
        }();
        e.ClassData = E;
        var A = function(t) {
            function e(e, n) {
                t.call(this, n),
                this.className = e,
                this.accessFlags = new s.Flags(1041),
                this.setState(v.INITIALIZED)
            }
            return o(e, t),
            e.prototype.isCastable = function(t) {
                return this.className === t.getInternalName()
            }
            ,
            e.prototype.boxClassName = function() {
                return s.boxClassName(this.className)
            }
            ,
            e.prototype.createWrapperObject = function(t, e) {
                var n = this.boxClassName()
                  , r = t.getBsCl().getInitializedClass(t, n)
                  , a = r.getConstructor(t)
                  , o = new a(t);
                return "V" !== n && (o[s.descriptor2typestr(n) + "/value"] = e),
                o
            }
            ,
            e.prototype.tryToResolve = function() {
                return !0
            }
            ,
            e.prototype.tryToInitialize = function() {
                return !0
            }
            ,
            e.prototype.resolve = function(t, e, n) {
                var r = this;
                void 0 === n && (n = !0),
                setImmediate(function() {
                    return e(r)
                })
            }
            ,
            e
        }(E);
        e.PrimitiveClassData = A;
        var S = function(t) {
            function e(e, n) {
                t.call(this, n),
                this._constructor = null,
                this.className = "[" + e,
                this.accessFlags = new s.Flags(1041),
                this.componentClassName = e
            }
            return o(e, t),
            e.prototype.methodLookup = function(t) {
                return this.superClass.methodLookup(t)
            }
            ,
            e.prototype.fieldLookup = function(t) {
                return this.superClass.fieldLookup(t)
            }
            ,
            e.prototype.resolve = function(t, e, n) {
                var r = this;
                return void 0 === n && (n = !0),
                this.isResolved() ? void setImmediate(function() {
                    return e(r)
                }) : void s.asyncForEach(["Ljava/lang/Object;", this.componentClassName], function(e, n) {
                    r.loader.resolveClass(t, e, function(t) {
                        null !== t ? n() : n("Failed.")
                    })
                }, function(t) {
                    t ? e(null) : (r.setResolved(r.loader.getResolvedClass("Ljava/lang/Object;"), r.loader.getResolvedClass(r.componentClassName)),
                    e(r))
                })
            }
            ,
            e.prototype.getComponentClass = function() {
                return this.componentClass
            }
            ,
            e.prototype.setResolved = function(t, e) {
                this.superClass = t,
                this.componentClass = e,
                this.setState(v.INITIALIZED)
            }
            ,
            e.prototype.tryToResolve = function() {
                var t = this.loader
                  , e = t.getResolvedClass("Ljava/lang/Object;")
                  , n = t.getResolvedClass(this.componentClassName);
                return null === e || null === n ? !1 : (this.setResolved(e, n),
                !0)
            }
            ,
            e.prototype.tryToInitialize = function() {
                return this.tryToResolve()
            }
            ,
            e.prototype.isCastable = function(t) {
                if (!(t instanceof e)) {
                    if (t instanceof A)
                        return !1;
                    if (t.accessFlags.isInterface()) {
                        var n = t.getInternalName();
                        return "Ljava/lang/Cloneable;" === n || "Ljava/io/Serializable;" === n
                    }
                    return "Ljava/lang/Object;" === t.getInternalName()
                }
                return this.getComponentClass().isCastable(t.getComponentClass())
            }
            ,
            e.prototype.initialize = function(t, e, n) {
                void 0 === n && (n = !0),
                this.resolve(t, e, n)
            }
            ,
            e.prototype.getJSArrayConstructor = function() {
                if (!s.typedArraysSupported)
                    return "Array";
                switch (this.componentClassName) {
                case "B":
                    return "Int8Array";
                case "C":
                    return "Uint16Array";
                case "S":
                    return "Int16Array";
                case "I":
                    return "Int32Array";
                case "F":
                    return "Float32Array";
                case "D":
                    return "Float64Array";
                default:
                    return "Array"
                }
            }
            ,
            e.prototype.getJSDefaultArrayElement = function() {
                switch (this.componentClassName[0]) {
                case "[":
                    return "new (cls.getComponentClass().getConstructor())(thread, otherLengths)";
                case "L":
                    return "null";
                case "J":
                    return "gLongZero";
                default:
                    return "0"
                }
            }
            ,
            e.prototype._getSliceMethod = function() {
                var t = new g
                  , e = this.getJSArrayConstructor();
                if (t.write("function(start, end) {\n    var newObj = new this.constructor(null, 0);\n"),
                "Array" === e)
                    t.write("    newObj.array = this.array.slice(start, end);\n");
                else {
                    var n;
                    switch (e) {
                    case "Int8Array":
                        n = 1;
                        break;
                    case "Int16Array":
                    case "Uint16Array":
                        n = 2;
                        break;
                    case "Int32Array":
                    case "Float32Array":
                        n = 4;
                        break;
                    case "Float64Array":
                        n = 8
                    }
                    t.write("    if (end === undefined) end = this.array.length;\n      " + (n > 1 ? "start *= " + n + ";\nend *= " + n + ";" : "") + "\n      newObj.array = new " + e + "(this.array.buffer.slice(start, end));\n")
                }
                return t.write("    return newObj;\n  }"),
                t.flush()
            }
            ,
            e.prototype._constructConstructor = function(t) {
                var e = new g
                  , n = s.jvmName2JSName(this.getInternalName());
                e.write("extendClass(" + n + ", superCls.getConstructor(thread));\n  function " + n + "(thread, lengths) {\n"),
                this.superClass.outputInjectedFields(e),
                "[" !== this.componentClassName[0] ? (e.write("    this.array = new " + this.getJSArrayConstructor() + "(lengths);\n"),
                "Array" === this.getJSArrayConstructor() && e.write("    for (var i = 0; i < lengths; i++) {\n      this.array[i] = " + this.getJSDefaultArrayElement() + ";\n    }\n")) : e.write("    if (typeof lengths === 'number') {\n        this.array = new " + this.getJSArrayConstructor() + "(lengths);\n        for (var i = 0; i < length; i++) {\n          this.array[i] = null;\n        }\n      } else {\n        var length = lengths[0], otherLengths = lengths.length > 2 ? lengths.slice(1) : lengths[1];\n        this.array = new " + this.getJSArrayConstructor() + "(length);\n        for (var i = 0; i < length; i++) {\n          this.array[i] = " + this.getJSDefaultArrayElement() + ";\n        }\n      }\n"),
                e.write("  }\n\n  " + n + ".prototype.slice = " + this._getSliceMethod() + ";\n  " + n + ".cls = cls;\n"),
                this.outputInjectedMethods(n, e),
                e.write("\n  return " + n + ";");
                var o = new Function("extendClass","cls","superCls","gLongZero","thread","getRef","util",e.flush());
                return o(a, this, this.superClass, _.ZERO, t, r, s)
            }
            ,
            e.prototype.getConstructor = function(t) {
                return null === this._constructor && (this._constructor = this._constructConstructor(t)),
                this._constructor
            }
            ,
            e
        }(E);
        e.ArrayClassData = S;
        var C = function(t) {
            function e(e, n, r, a) {
                t.call(this, r),
                this.interfaceClasses = null,
                this.superClassRef = null,
                this.initLock = new d,
                this._constructor = null,
                this._fieldLookup = {},
                this._objectFields = [],
                this._staticFields = [],
                this._methodLookup = {},
                this._vmTable = [],
                this._uninheritedDefaultMethods = [],
                this._protectionDomain = n ? n : null;
                var o = new i(e)
                  , c = 0;
                if (3405691582 !== o.getUint32())
                    throw new Error("Magic number invalid");
                if (this.minorVersion = o.getUint16(),
                this.majorVersion = o.getUint16(),
                !(45 <= this.majorVersion && this.majorVersion <= 52))
                    throw new Error("Major version invalid");
                this.constantPool = new l.ConstantPool,
                this.constantPool.parse(o, a),
                this.accessFlags = new s.Flags(o.getUint16()),
                this.className = this.constantPool.get(o.getUint16()).name;
                var p = o.getUint16();
                0 !== p && (this.superClassRef = this.constantPool.get(p));
                var f = o.getUint16();
                for (this.interfaceRefs = new Array(f),
                c = 0; f > c; ++c)
                    this.interfaceRefs[c] = this.constantPool.get(o.getUint16());
                var _ = o.getUint16();
                for (this.fields = new Array(_),
                c = 0; _ > c; ++c)
                    this.fields[c] = new h.Field(this,this.constantPool,c,o);
                var g = o.getUint16();
                for (this.methods = new Array(g),
                c = 0; g > c; c++) {
                    var v = new h.Method(this,this.constantPool,c,o);
                    this.methods[c] = v
                }
                if (this.attrs = u.makeAttributes(o, this.constantPool),
                o.hasBytes())
                    throw "Leftover bytes in classfile: " + o
            }
            return o(e, t),
            e.prototype.getSuperClassReference = function() {
                return this.superClassRef
            }
            ,
            e.prototype.getInterfaceClassReferences = function() {
                return this.interfaceRefs.slice(0)
            }
            ,
            e.prototype.getInterfaces = function() {
                return this.interfaceClasses
            }
            ,
            e.prototype.getFields = function() {
                return this.fields
            }
            ,
            e.prototype.getVMTable = function() {
                return this._vmTable
            }
            ,
            e.prototype.getVMIndexForMethod = function(t) {
                return this._vmTable.indexOf(this.methodLookup(t.signature))
            }
            ,
            e.prototype.getMethodFromVMIndex = function(t) {
                return void 0 !== this._vmTable[t] ? this._vmTable[t] : null
            }
            ,
            e.prototype.getVMIndexForField = function(t) {
                return t.accessFlags.isStatic() ? this._staticFields.indexOf(t) : this._objectFields.indexOf(t)
            }
            ,
            e.prototype.getStaticFieldFromVMIndex = function(t) {
                var e = this._staticFields[t];
                return void 0 !== e ? e : null
            }
            ,
            e.prototype.getObjectFieldFromVMIndex = function(t) {
                var e = this._objectFields[t];
                return void 0 !== e ? e : null
            }
            ,
            e.prototype.getFieldFromSlot = function(t) {
                return this.fields[t]
            }
            ,
            e.prototype.getMethodFromSlot = function(t) {
                return this.methods[t]
            }
            ,
            e.prototype.getMethod = function(t) {
                var e = this._methodLookup[t];
                return e.cls === this ? e : null
            }
            ,
            e.prototype.getSpecificMethod = function(t, e) {
                if (this.getInternalName() === t)
                    return this.getMethod(e);
                var n, r = this.interfaceClasses.slice(0);
                this.superClass && r.push(this.superClass);
                for (var a = 0; a < r.length; a++)
                    if (null !== (n = r[a].getSpecificMethod(t, e)))
                        return n;
                return null
            }
            ,
            e.prototype.getMethods = function() {
                return this.methods
            }
            ,
            e.prototype.getUninheritedDefaultMethods = function() {
                return this._uninheritedDefaultMethods
            }
            ,
            e.prototype.getProtectionDomain = function() {
                return this._protectionDomain
            }
            ,
            e.prototype._resolveMethods = function() {
                var t = this;
                null !== this.superClass && (this._vmTable = this._vmTable.concat(this.superClass._vmTable),
                Object.keys(this.superClass._methodLookup).forEach(function(e) {
                    t._methodLookup[e] = t.superClass._methodLookup[e]
                })),
                this.methods.forEach(function(e) {
                    var n = t._methodLookup[e.signature];
                    e.accessFlags.isStatic() || "<init>" === e.name || (void 0 === n ? t._vmTable.push(e) : t._vmTable[t._vmTable.indexOf(n)] = e),
                    t._methodLookup[e.signature] = e
                }),
                this.interfaceClasses.forEach(function(e) {
                    Object.keys(e._methodLookup).forEach(function(n) {
                        var r = e._methodLookup[n];
                        void 0 === t._methodLookup[n] ? (r.accessFlags.isStatic() || t._vmTable.push(r),
                        t._methodLookup[n] = r) : r.isDefault() && t._uninheritedDefaultMethods.push(r)
                    })
                })
            }
            ,
            e.prototype._resolveFields = function() {
                var t = this;
                null !== this.superClass && (this._objectFields = this._objectFields.concat(this.superClass._objectFields),
                Object.keys(this.superClass._fieldLookup).forEach(function(e) {
                    t._fieldLookup[e] = t.superClass._fieldLookup[e]
                })),
                this.interfaceClasses.forEach(function(e) {
                    Object.keys(e._fieldLookup).forEach(function(n) {
                        var r = e._fieldLookup[n];
                        t._fieldLookup[n] = r
                    })
                }),
                this.fields.forEach(function(e) {
                    t._fieldLookup[e.name] = e,
                    e.accessFlags.isStatic() ? t._staticFields.push(e) : t._objectFields.push(e)
                })
            }
            ,
            e.prototype.methodLookup = function(t) {
                var e = this._methodLookup[t];
                return void 0 !== e ? e : null
            }
            ,
            e.prototype.signaturePolymorphicAwareMethodLookup = function(t) {
                var e;
                if (null !== (e = this.methodLookup(t)))
                    return e;
                if ("Ljava/lang/invoke/MethodHandle;" === this.className) {
                    var n = t.slice(0, t.indexOf("(")) + "([Ljava/lang/Object;)Ljava/lang/Object;"
                      , e = this._methodLookup[n];
                    if (void 0 !== e && e.accessFlags.isNative() && e.accessFlags.isVarArgs() && e.cls === this)
                        return e
                } else if (null !== this.superClass)
                    return this.superClass.signaturePolymorphicAwareMethodLookup(t);
                return null
            }
            ,
            e.prototype.fieldLookup = function(t) {
                var e = this._fieldLookup[t];
                return void 0 !== e ? e : null
            }
            ,
            e.prototype.getAttribute = function(t) {
                for (var e = this.attrs, n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (r.getName() === t)
                        return r
                }
                return null
            }
            ,
            e.prototype.getAttributes = function(t) {
                for (var e = this.attrs, n = [], r = 0; r < e.length; r++) {
                    var a = e[r];
                    a.getName() === t && n.push(a)
                }
                return n
            }
            ,
            e.prototype.getBootstrapMethod = function(t) {
                var e = this.getAttribute("BootstrapMethods");
                return e.bootstrapMethods[t]
            }
            ,
            e.prototype._getInitialStaticFieldValue = function(t, e) {
                var n = this.fieldLookup(e);
                if (null !== n && n.accessFlags.isStatic()) {
                    var r = n.getAttribute("ConstantValue");
                    if (null === r)
                        return s.initialValue(n.rawDescriptor);
                    switch (r.value.getType()) {
                    case f.ConstantPoolItemType.STRING:
                        var a = r.value;
                        return null === a.value && (a.value = t.getJVM().internString(a.stringValue)),
                        a.value;
                    default:
                        return r.value.value
                    }
                }
            }
            ,
            e.prototype.setResolved = function(t, e) {
                this.superClass = t,
                this.interfaceClasses = e,
                this._resolveMethods(),
                this._resolveFields(),
                this.setState(v.RESOLVED)
            }
            ,
            e.prototype.tryToResolve = function() {
                if (this.getState() === v.LOADED) {
                    var t, e, n = this.loader, r = null !== this.superClassRef ? this.interfaceRefs.concat(this.superClassRef) : this.interfaceRefs, a = [];
                    for (t = 0; t < r.length; t++) {
                        if (e = r[t],
                        !e.tryResolve(n))
                            return !1;
                        a.push(e.cls)
                    }
                    this.setResolved(null !== this.superClassRef ? a.pop() : null, a)
                }
                return !0
            }
            ,
            e.prototype.tryToInitialize = function() {
                if (this.getState() === v.INITIALIZED)
                    return !0;
                if (this.getState() === v.RESOLVED || this.tryToResolve()) {
                    if (null !== this.superClass && !this.superClass.tryToInitialize())
                        return !1;
                    var t = this.getMethod("<clinit>()V");
                    return null !== t ? !1 : (this.setState(v.INITIALIZED),
                    !0)
                }
                return !1
            }
            ,
            e.prototype.isCastable = function(t) {
                return t instanceof e ? this.accessFlags.isInterface() ? t.accessFlags.isInterface() ? this.isSubinterface(t) : t.accessFlags.isInterface() ? void 0 : "Ljava/lang/Object;" === t.getInternalName() : t.accessFlags.isInterface() ? this.isSubinterface(t) : this.isSubclass(t) : !1
            }
            ,
            e.prototype.isSubinterface = function(t) {
                if (this.className === t.getInternalName())
                    return !0;
                for (var e = this.getInterfaces(), n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (r.isSubinterface(t))
                        return !0
                }
                return null == this.getSuperClass() ? !1 : this.getSuperClass().isSubinterface(t)
            }
            ,
            e.prototype.initialize = function(t, e, n) {
                var r = this;
                void 0 === n && (n = !0),
                this.isResolved() ? this.isInitialized(t) ? setImmediate(function() {
                    e(r)
                }) : this.initLock.tryLock(t, e) && (null != this.superClass ? this.superClass.initialize(t, function(e) {
                    null == e ? r.initLock.unlock(null) : r._initialize(t, function(t) {
                        r.initLock.unlock(t)
                    })
                }, n) : this._initialize(t, function(t) {
                    r.initLock.unlock(t)
                })) : this.resolve(t, function(a) {
                    null !== a ? r.initialize(t, e, n) : e(a)
                }, n)
            }
            ,
            e.prototype._initialize = function(t, e) {
                var n = this
                  , r = this.getConstructor(t);
                void 0 !== r["<clinit>()V"] ? r["<clinit>()V"](t, null, function(r) {
                    r ? (n.setState(f.ClassState.RESOLVED),
                    r.getClass().isCastable(t.getBsCl().getResolvedClass("Ljava/lang/Error;")) ? (t.throwException(r),
                    e(null)) : t.getBsCl().initializeClass(t, "Ljava/lang/ExceptionInInitializerError;", function(n) {
                        if (null == n)
                            e(null);
                        else {
                            var a = n.getConstructor(t)
                              , o = new a(t);
                            o["<init>(Ljava/lang/Throwable;)V"](t, [r], function(n) {
                                t.throwException(o),
                                e(null)
                            })
                        }
                    })) : (n.setState(f.ClassState.INITIALIZED),
                    e(n))
                }) : (this.setState(f.ClassState.INITIALIZED),
                e(this))
            }
            ,
            e.prototype.isInitialized = function(t) {
                return this.getState() === v.INITIALIZED || this.initLock.getOwner() === t
            }
            ,
            e.prototype.resolve = function(t, e, n) {
                var r = this;
                void 0 === n && (n = !0);
                var a = this.interfaceRefs.slice(0);
                null !== this.superClassRef && a.push(this.superClassRef),
                a = a.filter(function(t) {
                    return !t.isResolved()
                }),
                s.asyncForEach(a, function(e, a) {
                    e.resolve(t, r.loader, r, function(t) {
                        t ? a() : a("Failed.")
                    }, n)
                }, function(t) {
                    t ? e(null) : (r.setResolved(null !== r.superClassRef ? r.superClassRef.cls : null, r.interfaceRefs.map(function(t) {
                        return t.cls
                    })),
                    e(r))
                })
            }
            ,
            e.prototype.getMirandaAndDefaultMethods = function() {
                var t = this
                  , e = null !== this.superClass ? this.superClass.getVMTable() : [];
                return this.getVMTable().slice(e.length).filter(function(e) {
                    return e.cls !== t
                })
            }
            ,
            e.prototype.outputInjectedFields = function(t) {
                null !== this.superClass && this.superClass.outputInjectedFields(t);
                var e = T[this.getInternalName()];
                void 0 !== e && Object.keys(e).forEach(function(n) {
                    t.write("this." + n + " = " + e[n][1] + ";\n")
                })
            }
            ,
            e.prototype._constructConstructor = function(t) {
                var e = s.jvmName2JSName(this.getInternalName())
                  , o = new g;
                o.write("if (cls.superClass !== null) {\n    extendClass(" + e + ", cls.superClass.getConstructor(thread));\n  }\n  function " + e + "(thread) {\n"),
                this.outputInjectedFields(o),
                this._objectFields.forEach(function(t) {
                    return t.outputJavaScriptField(e, o)
                }),
                o.write("  }\n  " + e + ".cls = cls;\n"),
                this.outputInjectedMethods(e, o),
                this._staticFields.forEach(function(t) {
                    return t.outputJavaScriptField(e, o)
                }),
                this.getMethods().forEach(function(t) {
                    return t.outputJavaScriptFunction(e, o)
                }),
                this.getMirandaAndDefaultMethods().forEach(function(t) {
                    return t.outputJavaScriptFunction(e, o)
                }),
                this.getUninheritedDefaultMethods().forEach(function(t) {
                    return t.outputJavaScriptFunction(e, o, !0)
                }),
                o.write("  return " + e + ";");
                var i = o.flush()
                  , l = new Function("extendClass","cls","InternalStackFrame","NativeStackFrame","BytecodeStackFrame","gLongZero","ClassLoader","Monitor","thread","getRef","util",i);
                return l(a, this, c.InternalStackFrame, c.NativeStackFrame, c.BytecodeStackFrame, _.ZERO, n(20), n(25), t, r, s)
            }
            ,
            e.prototype.getConstructor = function(t) {
                return null == this._constructor && (this._constructor = this._constructConstructor(t)),
                this._constructor
            }
            ,
            e
        }(E);
        e.ReferenceClassData = C
    }
    , function(t, e, n) {
        "use strict";
        var r = n(8)
          , a = (n(13),
        function() {
            function t(t) {
                this.buffer = t,
                this._index = 0
            }
            return t.prototype.incIndex = function(t) {
                var e = this._index;
                return this._index += t,
                e
            }
            ,
            t.prototype.rewind = function() {
                this._index = 0
            }
            ,
            t.prototype.seek = function(t) {
                this._index = t
            }
            ,
            t.prototype.pos = function() {
                return this._index
            }
            ,
            t.prototype.skip = function(t) {
                this._index += t
            }
            ,
            t.prototype.hasBytes = function() {
                return this._index < this.buffer.length
            }
            ,
            t.prototype.getFloat = function() {
                return this.buffer.readFloatBE(this.incIndex(4))
            }
            ,
            t.prototype.getDouble = function() {
                return this.buffer.readDoubleBE(this.incIndex(8))
            }
            ,
            t.prototype.getUint = function(t) {
                switch (t) {
                case 1:
                    return this.getUint8();
                case 2:
                    return this.getUint16();
                case 4:
                    return this.getUint32();
                default:
                    throw new Error("Invalid byte count for getUint: " + t)
                }
            }
            ,
            t.prototype.getInt = function(t) {
                switch (t) {
                case 1:
                    return this.getInt8();
                case 2:
                    return this.getInt16();
                case 4:
                    return this.getInt32();
                default:
                    throw new Error("Invalid byte count for getUint: " + t)
                }
            }
            ,
            t.prototype.getUint8 = function() {
                return this.buffer.readUInt8(this.incIndex(1))
            }
            ,
            t.prototype.getUint16 = function() {
                return this.buffer.readUInt16BE(this.incIndex(2))
            }
            ,
            t.prototype.getUint32 = function() {
                return this.buffer.readUInt32BE(this.incIndex(4))
            }
            ,
            t.prototype.getInt8 = function() {
                return this.buffer.readInt8(this.incIndex(1))
            }
            ,
            t.prototype.getInt16 = function() {
                return this.buffer.readInt16BE(this.incIndex(2))
            }
            ,
            t.prototype.getInt32 = function() {
                return this.buffer.readInt32BE(this.incIndex(4))
            }
            ,
            t.prototype.getInt64 = function() {
                var t = this.getUint32()
                  , e = this.getUint32();
                return r.fromBits(e, t)
            }
            ,
            t.prototype.read = function(t) {
                var e = this.buffer.slice(this._index, this._index + t);
                return this._index += t,
                e
            }
            ,
            t.prototype.peek = function() {
                return this.buffer.readUInt8(this._index)
            }
            ,
            t.prototype.size = function() {
                return this.buffer.length - this._index
            }
            ,
            t.prototype.slice = function(e) {
                var n = new t(this.buffer.slice(this._index, this._index + e));
                return this._index += e,
                n
            }
            ,
            t.prototype.getBuffer = function() {
                return this.buffer
            }
            ,
            t
        }());
        t.exports = a
    }
    , function(t, e, n) {
        "use strict";
        var r = n(6)
          , a = n(9)
          , o = (n(13),
        {})
          , s = function() {
            function t(t) {
                this.value = this.bytes2str(t)
            }
            return t.prototype.bytes2str = function(t) {
                for (var e, n, r, a, o = 0, s = ""; o < t.length; )
                    r = 255 & t.readUInt8(o++),
                    127 >= r ? a = r : 223 >= r ? (e = t.readUInt8(o++),
                    a = ((31 & r) << 6) + (63 & e)) : (e = t.readUInt8(o++),
                    n = t.readUInt8(o++),
                    a = ((15 & r) << 12) + ((63 & e) << 6) + (63 & n)),
                    s += String.fromCharCode(a);
                return s
            }
            ,
            t.prototype.getType = function() {
                return a.ConstantPoolItemType.UTF8
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16();
                return new this(t.read(n))
            }
            ,
            t.size = 1,
            t.infoByteSize = 0,
            t
        }();
        e.ConstUTF8 = s,
        o[a.ConstantPoolItemType.UTF8] = s;
        var i = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.INTEGER
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                return new this(t.getInt32())
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.ConstInt32 = i,
        o[a.ConstantPoolItemType.INTEGER] = i;
        var l = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.FLOAT
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                return new this(t.getFloat())
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.ConstFloat = l,
        o[a.ConstantPoolItemType.FLOAT] = l;
        var u = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.LONG
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                return new this(t.getInt64())
            }
            ,
            t.size = 2,
            t.infoByteSize = 8,
            t
        }();
        e.ConstLong = u,
        o[a.ConstantPoolItemType.LONG] = u;
        var c = function() {
            function t(t) {
                this.value = t
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.DOUBLE
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                return new this(t.getDouble())
            }
            ,
            t.size = 2,
            t.infoByteSize = 8,
            t
        }();
        e.ConstDouble = c,
        o[a.ConstantPoolItemType.DOUBLE] = c;
        var p = function() {
            function t(t) {
                this.cls = null,
                this.clsConstructor = null,
                this.arrayClass = null,
                this.arrayClassConstructor = null,
                this.name = t
            }
            return t.prototype.tryResolve = function(t) {
                return null === this.cls && (this.cls = t.getResolvedClass(this.name)),
                null !== this.cls
            }
            ,
            t.prototype.resolve = function(t, e, n, r, a) {
                var o = this;
                if (void 0 === a && (a = !0),
                null !== t) {
                    var s = t.currentMethod();
                    if (null !== s && this.name === s.cls.getInternalName())
                        return this.setResolved(t, t.currentMethod().cls),
                        r(!0)
                }
                e.resolveClass(t, this.name, function(e) {
                    o.setResolved(t, e),
                    r(null !== e)
                }, a)
            }
            ,
            t.prototype.setResolved = function(t, e) {
                this.cls = e,
                null !== e && (this.clsConstructor = e.getConstructor(t))
            }
            ,
            t.prototype.getType = function() {
                return a.ConstantPoolItemType.CLASS
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.cls.getClassObject(t)
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.cls
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , a = e.get(n);
                return new this(r.typestr2descriptor(a.value))
            }
            ,
            t.size = 1,
            t.infoByteSize = 2,
            t
        }();
        e.ClassReference = p,
        o[a.ConstantPoolItemType.CLASS] = p;
        var h = function() {
            function t(t, e) {
                this.name = t,
                this.descriptor = e
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.NAME_AND_TYPE
            }
            ,
            t.prototype.isResolved = function() {
                return !0
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = e.get(n)
                  , o = e.get(r);
                return new this(a.value,o.value)
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.NameAndTypeInfo = h,
        o[a.ConstantPoolItemType.NAME_AND_TYPE] = h;
        var f = function() {
            function t(t) {
                this.value = null,
                this.stringValue = t
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.STRING
            }
            ,
            t.prototype.resolve = function(t, e, n, r) {
                this.value = t.getJVM().internString(this.stringValue),
                setImmediate(function() {
                    return r(!0)
                })
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.value
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.value
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = e.get(n);
                return new this(r.value)
            }
            ,
            t.size = 1,
            t.infoByteSize = 2,
            t
        }();
        e.ConstString = f,
        o[a.ConstantPoolItemType.STRING] = f;
        var d = function() {
            function t(t) {
                this.methodType = null,
                this.descriptor = t
            }
            return t.prototype.resolve = function(t, e, n, a) {
                var o = this;
                r.createMethodType(t, e, this.descriptor, function(e, n) {
                    e ? (t.throwException(e),
                    a(!1)) : (o.methodType = n,
                    a(!0))
                })
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.methodType
            }
            ,
            t.prototype.getType = function() {
                return a.ConstantPoolItemType.METHOD_TYPE
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.methodType
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = e.get(n);
                return new this(r.value)
            }
            ,
            t.size = 1,
            t.infoByteSize = 2,
            t
        }();
        e.MethodType = d,
        o[a.ConstantPoolItemType.METHOD_TYPE] = d;
        var _ = function() {
            function t(t, e) {
                this.method = null,
                this.fullSignature = null,
                this.paramWordSize = -1,
                this.memberName = null,
                this.appendix = null,
                this.jsConstructor = null,
                this.classInfo = t,
                this.nameAndTypeInfo = e,
                this.signature = this.nameAndTypeInfo.name + this.nameAndTypeInfo.descriptor
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.METHODREF
            }
            ,
            t.prototype.hasAccess = function(t, e, n) {
                var a = this.method
                  , o = e.method.cls;
                return a.accessFlags.isStatic() !== n ? (t.throwNewException("Ljava/lang/IncompatibleClassChangeError;", "Method " + a.name + " from class " + a.cls.getExternalName() + " is " + (n ? "not " : "") + "static."),
                e.returnToThreadLoop = !0,
                !1) : r.checkAccess(o, a.cls, a.accessFlags) ? !0 : (t.throwNewException("Ljava/lang/IllegalAccessError;", o.getExternalName() + " cannot access " + a.cls.getExternalName() + "." + a.name),
                e.returnToThreadLoop = !0,
                !1)
            }
            ,
            t.prototype.resolveMemberName = function(t, e, n, o, s) {
                var i = this
                  , l = e.getBsCl().getInitializedClass(e, "Ljava/lang/invoke/MethodHandleNatives;").getConstructor(e)
                  , u = new (e.getBsCl().getInitializedClass(e, "[Ljava/lang/Object;").getConstructor(e))(e,1);
                r.createMethodType(e, n, this.nameAndTypeInfo.descriptor, function(t, n) {
                    t ? (e.throwException(t),
                    s(!1)) : l["java/lang/invoke/MethodHandleNatives/linkMethod(Ljava/lang/Class;ILjava/lang/Class;Ljava/lang/String;Ljava/lang/Object;[Ljava/lang/Object;)Ljava/lang/invoke/MemberName;"](e, [o.getClassObject(e), a.MethodHandleReferenceKind.INVOKEVIRTUAL, i.classInfo.cls.getClassObject(e), e.getJVM().internString(i.nameAndTypeInfo.name), n, u], function(t, n) {
                        null !== t ? (e.throwException(t),
                        s(!1)) : (i.appendix = u.array[0],
                        i.memberName = n,
                        s(!0))
                    })
                })
            }
            ,
            t.prototype.resolve = function(t, e, n, a, o) {
                var s = this;
                if (void 0 === o && (o = !0),
                this.classInfo.isResolved()) {
                    var i = this.classInfo.cls
                      , l = i.methodLookup(this.signature);
                    if (null === l && r.is_reference_type(i.getInternalName()) && (l = i.signaturePolymorphicAwareMethodLookup(this.signature),
                    null !== l && ("invoke" === l.name || "invokeExact" === l.name)))
                        return this.resolveMemberName(l, t, e, n, function(e) {
                            e === !0 ? s.setResolved(t, l) : t.throwNewException("Ljava/lang/NoSuchMethodError;", "Method " + s.signature + " does not exist in class " + s.classInfo.cls.getExternalName() + "."),
                            a(e)
                        });
                    null !== l ? (this.setResolved(t, l),
                    a(!0)) : (t.throwNewException("Ljava/lang/NoSuchMethodError;", "Method " + this.signature + " does not exist in class " + this.classInfo.cls.getExternalName() + "."),
                    a(!1))
                } else
                    this.classInfo.resolve(t, e, n, function(r) {
                        r ? s.resolve(t, e, n, a, o) : a(!1)
                    }, o)
            }
            ,
            t.prototype.setResolved = function(t, e) {
                this.method = e,
                this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor),
                this.fullSignature = this.method.fullSignature,
                this.jsConstructor = this.method.cls.getConstructor(t)
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.method
            }
            ,
            t.prototype.getParamWordSize = function() {
                return -1 === this.paramWordSize && (this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor)),
                this.paramWordSize
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = e.get(n)
                  , o = e.get(r);
                return new this(a,o)
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.MethodReference = _,
        o[a.ConstantPoolItemType.METHODREF] = _;
        var g = function() {
            function t(t, e) {
                this.fullSignature = null,
                this.method = null,
                this.paramWordSize = -1,
                this.jsConstructor = null,
                this.classInfo = t,
                this.nameAndTypeInfo = e,
                this.signature = this.nameAndTypeInfo.name + this.nameAndTypeInfo.descriptor
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.INTERFACE_METHODREF
            }
            ,
            t.prototype.hasAccess = function(t, e, n) {
                var a = this.method
                  , o = e.method.cls;
                return a.accessFlags.isStatic() !== n ? (t.throwNewException("Ljava/lang/IncompatibleClassChangeError;", "Method " + a.name + " from class " + a.cls.getExternalName() + " is " + (n ? "not " : "") + "static."),
                e.returnToThreadLoop = !0,
                !1) : r.checkAccess(o, a.cls, a.accessFlags) ? !0 : (t.throwNewException("Ljava/lang/IllegalAccessError;", o.getExternalName() + " cannot access " + a.cls.getExternalName() + "." + a.name),
                e.returnToThreadLoop = !0,
                !1)
            }
            ,
            t.prototype.resolve = function(t, e, n, a, o) {
                var s = this;
                if (void 0 === o && (o = !0),
                this.classInfo.isResolved()) {
                    var i = this.classInfo.cls
                      , l = i.methodLookup(this.signature);
                    this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor),
                    null !== l ? (this.setResolved(t, l),
                    a(!0)) : (t.throwNewException("Ljava/lang/NoSuchMethodError;", "Method " + this.signature + " does not exist in class " + this.classInfo.cls.getExternalName() + "."),
                    a(!1))
                } else
                    this.classInfo.resolve(t, e, n, function(r) {
                        r ? s.resolve(t, e, n, a, o) : a(!1)
                    }, o)
            }
            ,
            t.prototype.setResolved = function(t, e) {
                this.method = e,
                this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor),
                this.fullSignature = this.method.fullSignature,
                this.jsConstructor = this.method.cls.getConstructor(t)
            }
            ,
            t.prototype.getParamWordSize = function() {
                return -1 === this.paramWordSize && (this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor)),
                this.paramWordSize
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.method
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = e.get(n)
                  , o = e.get(r);
                return new this(a,o)
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.InterfaceMethodReference = g,
        o[a.ConstantPoolItemType.INTERFACE_METHODREF] = g;
        var v = function() {
            function t(t, e) {
                this.field = null,
                this.fullFieldName = null,
                this.fieldOwnerConstructor = null,
                this.classInfo = t,
                this.nameAndTypeInfo = e
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.FIELDREF
            }
            ,
            t.prototype.hasAccess = function(t, e, n) {
                var a = this.field
                  , o = e.method.cls;
                return a.accessFlags.isStatic() !== n ? (t.throwNewException("Ljava/lang/IncompatibleClassChangeError;", "Field " + name + " from class " + a.cls.getExternalName() + " is " + (n ? "not " : "") + "static."),
                e.returnToThreadLoop = !0,
                !1) : r.checkAccess(o, a.cls, a.accessFlags) ? !0 : (t.throwNewException("Ljava/lang/IllegalAccessError;", o.getExternalName() + " cannot access " + a.cls.getExternalName() + "." + name),
                e.returnToThreadLoop = !0,
                !1)
            }
            ,
            t.prototype.resolve = function(t, e, n, a, o) {
                var s = this;
                if (void 0 === o && (o = !0),
                this.classInfo.isResolved()) {
                    var i = this.classInfo.cls
                      , l = i.fieldLookup(this.nameAndTypeInfo.name);
                    null !== l ? (this.fullFieldName = r.descriptor2typestr(l.cls.getInternalName()) + "/" + l.name,
                    this.field = l,
                    a(!0)) : (t.throwNewException("Ljava/lang/NoSuchFieldError;", "Field " + this.nameAndTypeInfo.name + " does not exist in class " + this.classInfo.cls.getExternalName() + "."),
                    a(!1))
                } else
                    this.classInfo.resolve(t, e, n, function(r) {
                        r ? s.resolve(t, e, n, a, o) : a(!1)
                    }, o)
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.field
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = e.get(n)
                  , o = e.get(r);
                return new this(a,o)
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.FieldReference = v,
        o[a.ConstantPoolItemType.FIELDREF] = v;
        var m = function() {
            function t(t, e) {
                this.callSiteObjects = {},
                this.methodType = null,
                this.bootstrapMethodAttrIndex = t,
                this.nameAndTypeInfo = e,
                this.paramWordSize = r.getMethodDescriptorWordSize(this.nameAndTypeInfo.descriptor)
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.INVOKE_DYNAMIC
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.methodType
            }
            ,
            t.prototype.resolve = function(t, e, n, a) {
                var o = this;
                r.createMethodType(t, e, this.nameAndTypeInfo.descriptor, function(e, n) {
                    e ? (t.throwException(e),
                    a(!1)) : (o.methodType = n,
                    a(!0))
                })
            }
            ,
            t.prototype.getCallSiteObject = function(t) {
                var e = this.callSiteObjects[t];
                return e ? e : null
            }
            ,
            t.prototype.constructCallSiteObject = function(t, e, n, o, s, i) {
                function l() {
                    var n, r, o = c[1], s = new (t.getBsCl().getInitializedClass(t, "[Ljava/lang/Object;").getConstructor(t))(t,o.length), i = s.array;
                    for (n = 0; n < o.length; n++)
                        switch (r = o[n],
                        r.getType()) {
                        case a.ConstantPoolItemType.CLASS:
                            i[n] = r.cls.getClassObject(t);
                            break;
                        case a.ConstantPoolItemType.METHOD_HANDLE:
                            i[n] = r.methodHandle;
                            break;
                        case a.ConstantPoolItemType.METHOD_TYPE:
                            i[n] = r.methodType;
                            break;
                        case a.ConstantPoolItemType.STRING:
                            i[n] = r.value;
                            break;
                        case a.ConstantPoolItemType.UTF8:
                            i[n] = t.getJVM().internString(r.value);
                            break;
                        case a.ConstantPoolItemType.INTEGER:
                            i[n] = e.getInitializedClass(t, "I").createWrapperObject(t, r.value);
                            break;
                        case a.ConstantPoolItemType.LONG:
                            i[n] = e.getInitializedClass(t, "J").createWrapperObject(t, r.value);
                            break;
                        case a.ConstantPoolItemType.FLOAT:
                            i[n] = e.getInitializedClass(t, "F").createWrapperObject(t, r.value);
                            break;
                        case a.ConstantPoolItemType.DOUBLE:
                            i[n] = e.getInitializedClass(t, "D").createWrapperObject(t, r.value)
                        }
                    return s
                }
                var u = this;
                void 0 === i && (i = !0);
                var c = n.getBootstrapMethod(this.bootstrapMethodAttrIndex)
                  , p = c[1].concat(c[0], this).filter(function(t) {
                    return !t.isResolved()
                });
                if (p.length > 0)
                    return r.asyncForEach(p, function(r, a) {
                        r.resolve(t, e, n, function(t) {
                            t ? a() : a("Failed.")
                        }, i)
                    }, function(r) {
                        r ? s(!1) : u.constructCallSiteObject(t, e, n, o, s, i)
                    });
                var h = t.getJVM().internString(this.nameAndTypeInfo.name)
                  , f = new (e.getInitializedClass(t, "[Ljava/lang/Object;").getConstructor(t))(t,1)
                  , d = l()
                  , _ = e.getInitializedClass(t, "Ljava/lang/invoke/MethodHandleNatives;").getConstructor(t);
                _["java/lang/invoke/MethodHandleNatives/linkCallSite(Ljava/lang/Object;Ljava/lang/Object;Ljava/lang/Object;Ljava/lang/Object;Ljava/lang/Object;[Ljava/lang/Object;)Ljava/lang/invoke/MemberName;"](t, [n.getClassObject(t), c[0].methodHandle, h, this.methodType, d, f], function(e, n) {
                    e ? (t.throwException(e),
                    s(!1)) : (u.setResolved(o, [n, f.array[0]]),
                    s(!0))
                })
            }
            ,
            t.prototype.setResolved = function(t, e) {
                void 0 === this.callSiteObjects[t] && (this.callSiteObjects[t] = e)
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint16()
                  , r = t.getUint16()
                  , a = e.get(r);
                return new this(n,a)
            }
            ,
            t.size = 1,
            t.infoByteSize = 4,
            t
        }();
        e.InvokeDynamic = m,
        o[a.ConstantPoolItemType.INVOKE_DYNAMIC] = m;
        var T = function() {
            function t(t, e) {
                this.methodHandle = null,
                this.reference = t,
                this.referenceType = e
            }
            return t.prototype.getType = function() {
                return a.ConstantPoolItemType.METHOD_HANDLE
            }
            ,
            t.prototype.isResolved = function() {
                return null !== this.methodHandle
            }
            ,
            t.prototype.getConstant = function(t) {
                return this.methodHandle
            }
            ,
            t.prototype.resolve = function(t, e, n, r, a) {
                var o = this;
                return this.reference.isResolved() ? void this.constructMethodHandleType(t, e, function(a) {
                    if (null === a)
                        r(!1);
                    else {
                        var s = e.getInitializedClass(t, "Ljava/lang/invoke/MethodHandleNatives;").getConstructor(t);
                        s["linkMethodHandleConstant(Ljava/lang/Class;ILjava/lang/Class;Ljava/lang/String;Ljava/lang/Object;)Ljava/lang/invoke/MethodHandle;"](t, [n.getClassObject(t), o.referenceType, o.getDefiningClassObj(t), t.getJVM().internString(o.reference.nameAndTypeInfo.name), a], function(e, n) {
                            e ? (t.throwException(e),
                            r(!1)) : (o.methodHandle = n,
                            r(!0))
                        })
                    }
                }) : this.reference.resolve(t, e, n, function(s) {
                    s ? o.resolve(t, e, n, r, a) : r(!1)
                }, a)
            }
            ,
            t.prototype.getDefiningClassObj = function(t) {
                return this.reference.getType() === a.ConstantPoolItemType.FIELDREF ? this.reference.field.cls.getClassObject(t) : this.reference.method.cls.getClassObject(t)
            }
            ,
            t.prototype.constructMethodHandleType = function(t, e, n) {
                if (this.reference.getType() === a.ConstantPoolItemType.FIELDREF) {
                    var o = this.reference.nameAndTypeInfo.descriptor;
                    e.resolveClass(t, o, function(e) {
                        n(null !== e ? e.getClassObject(t) : null)
                    })
                } else
                    r.createMethodType(t, e, this.reference.nameAndTypeInfo.descriptor, function(e, r) {
                        e ? (t.throwException(e),
                        n(null)) : n(r)
                    })
            }
            ,
            t.fromBytes = function(t, e) {
                var n = t.getUint8()
                  , r = t.getUint16()
                  , a = e.get(r);
                return new this(a,n)
            }
            ,
            t.size = 1,
            t.infoByteSize = 3,
            t
        }();
        e.MethodHandle = T,
        o[a.ConstantPoolItemType.METHOD_HANDLE] = T;
        var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        !function(t) {
            t.forEach(function(t, e) {
                t.forEach(function(t) {
                    y[t] = e
                })
            })
        }([[a.ConstantPoolItemType.UTF8, a.ConstantPoolItemType.INTEGER, a.ConstantPoolItemType.FLOAT, a.ConstantPoolItemType.LONG, a.ConstantPoolItemType.DOUBLE], [a.ConstantPoolItemType.CLASS, a.ConstantPoolItemType.STRING, a.ConstantPoolItemType.NAME_AND_TYPE, a.ConstantPoolItemType.METHOD_TYPE], [a.ConstantPoolItemType.FIELDREF, a.ConstantPoolItemType.METHODREF, a.ConstantPoolItemType.INTERFACE_METHODREF, a.ConstantPoolItemType.INVOKE_DYNAMIC], [a.ConstantPoolItemType.METHOD_HANDLE]]);
        var I = function() {
            function t() {}
            return t.prototype.parse = function(t, e) {
                var n = this;
                void 0 === e && (e = null);
                var r = t.getUint16()
                  , a = [[], [], []]
                  , s = 0
                  , i = 1
                  , l = 0
                  , u = 0
                  , c = 0;
                for (this.constantPool = new Array(r); r > i; )
                    u = t.pos(),
                    l = t.getUint8(),
                    c = y[l],
                    c > 0 ? (a[c - 1].push({
                        offset: u,
                        index: i
                    }),
                    t.skip(o[l].infoByteSize)) : this.constantPool[i] = o[l].fromBytes(t, this),
                    i += o[l].size;
                return s = t.pos(),
                a.forEach(function(r) {
                    r.forEach(function(r) {
                        if (t.seek(r.offset),
                        l = t.getUint8(),
                        n.constantPool[r.index] = o[l].fromBytes(t, n),
                        null !== e && null !== e.array[r.index] && void 0 !== e.array[r.index]) {
                            var a = e.array[r.index];
                            switch (a.getClass().getInternalName()) {
                            case "Ljava/lang/Integer;":
                                n.constantPool[r.index].value = a["java/lang/Integer/value"];
                                break;
                            case "Ljava/lang/Long;":
                                n.constantPool[r.index].value = a["java/lang/Long/value"];
                                break;
                            case "Ljava/lang/Float;":
                                n.constantPool[r.index].value = a["java/lang/Float/value"];
                                break;
                            case "Ljava/lang/Double;":
                                n.constantPool[r.index].value = a["java/lang/Double/value"];
                                break;
                            case "Ljava/lang/String;":
                                n.constantPool[r.index].value = a.toString();
                                break;
                            case "Ljava/lang/Class;":
                                n.constantPool[r.index].name = a.$cls.getInternalName(),
                                n.constantPool[r.index].cls = a.$cls;
                                break;
                            default:
                                n.constantPool[r.index].stringValue = "",
                                n.constantPool[r.index].value = a
                            }
                        }
                    })
                }),
                t.seek(s),
                t
            }
            ,
            t.prototype.get = function(t) {
                return this.constantPool[t]
            }
            ,
            t.prototype.each = function(t) {
                this.constantPool.forEach(function(e, n) {
                    void 0 !== e && t(n, e)
                })
            }
            ,
            t
        }();
        e.ConstantPool = I
    }
    , function(t, e) {
        "use strict";
        var n = function() {
            function t() {
                this.queue = []
            }
            return t.prototype.tryLock = function(t, e) {
                return 1 === this.queue.push({
                    thread: t,
                    cb: e
                })
            }
            ,
            t.prototype.unlock = function(t) {
                var e, n = this.queue.length;
                for (e = 0; n > e; e++)
                    this.queue[e].cb(t);
                this.queue = []
            }
            ,
            t.prototype.getOwner = function() {
                return this.queue.length > 0 ? this.queue[0].thread : null
            }
            ,
            t
        }();
        t.exports = n
    }
    , function(t, e, n) {
        "use strict";
        var r = n(9)
          , a = (n(13),
        function() {
            function t() {
                this.owner = null,
                this.count = 0,
                this.blocked = {},
                this.waiting = {}
            }
            return t.prototype.enter = function(t, e) {
                return this.owner === t ? (this.count++,
                !0) : this.contendForLock(t, 1, r.ThreadStatus.BLOCKED, e)
            }
            ,
            t.prototype.contendForLock = function(t, e, n, r) {
                var a = this.owner;
                return null === a ? (this.owner = t,
                this.count = e,
                !0) : (this.blocked[t.getRef()] = {
                    thread: t,
                    cb: r,
                    count: e
                },
                t.setStatus(n, this),
                !1)
            }
            ,
            t.prototype.exit = function(t) {
                var e = this.owner;
                return e === t ? 0 === --this.count && (this.owner = null,
                this.appointNewOwner()) : t.throwNewException("Ljava/lang/IllegalMonitorStateException;", "Cannot exit a monitor that you do not own."),
                e === t
            }
            ,
            t.prototype.appointNewOwner = function() {
                var t = Object.keys(this.blocked);
                if (t.length > 0) {
                    var e = t[Math.floor(Math.random() * t.length)]
                      , n = this.blocked[e];
                    this.unblock(n.thread, !1)
                }
            }
            ,
            t.prototype.wait = function(t, e, n, a) {
                var o = this;
                return this.getOwner() === t ? (this.waiting[t.getRef()] = {
                    thread: t,
                    cb: e,
                    count: this.count,
                    isTimed: null != n && 0 !== n
                },
                this.owner = null,
                this.count = 0,
                null != n && 0 !== n ? (this.waiting[t.getRef()].timer = setTimeout(function() {
                    o.unwait(t, !0)
                }, n),
                t.setStatus(r.ThreadStatus.TIMED_WAITING, this)) : t.setStatus(r.ThreadStatus.WAITING, this),
                this.appointNewOwner(),
                !0) : (t.throwNewException("Ljava/lang/IllegalMonitorStateException;", "Cannot wait on an object that you do not own."),
                !1)
            }
            ,
            t.prototype.unwait = function(t, e, n, a) {
                void 0 === n && (n = !1),
                void 0 === a && (a = null);
                var o = this.waiting[t.getRef()]
                  , s = r.ThreadStatus.UNINTERRUPTABLY_BLOCKED
                  , i = function() {
                    t.setStatus(r.ThreadStatus.RUNNABLE),
                    n ? a() : o.cb(e)
                };
                if (delete this.waiting[t.getRef()],
                t.getStatus() === r.ThreadStatus.TIMED_WAITING && !e) {
                    var l = o.timer;
                    clearTimeout(l)
                }
                this.contendForLock(t, o.count, s, i) && i()
            }
            ,
            t.prototype.unblock = function(t, e) {
                void 0 === e && (e = !1);
                var n = this.blocked[t.getRef()];
                null != n && (delete this.blocked[t.getRef()],
                t.setStatus(r.ThreadStatus.RUNNABLE),
                e || (this.owner = t,
                this.count = n.count,
                n.cb()))
            }
            ,
            t.prototype.notify = function(t) {
                if (this.owner === t) {
                    var e = Object.keys(this.waiting);
                    e.length > 0 && this.unwait(this.waiting[e[Math.floor(Math.random() * e.length)]].thread, !1)
                } else
                    t.throwNewException("Ljava/lang/IllegalMonitorStateException;", "Cannot notify on a monitor that you do not own.")
            }
            ,
            t.prototype.notifyAll = function(t) {
                if (this.owner === t) {
                    var e, n = Object.keys(this.waiting);
                    for (e = 0; e < n.length; e++)
                        this.unwait(this.waiting[n[e]].thread, !1)
                } else
                    t.throwNewException("Ljava/lang/IllegalMonitorStateException;", "Cannot notifyAll on a monitor that you do not own.")
            }
            ,
            t.prototype.getOwner = function() {
                return this.owner
            }
            ,
            t.prototype.isWaiting = function(t) {
                return null != this.waiting[t.getRef()] && !this.waiting[t.getRef()].isTimed
            }
            ,
            t.prototype.isTimedWaiting = function(t) {
                return null != this.waiting[t.getRef()] && this.waiting[t.getRef()].isTimed
            }
            ,
            t.prototype.isBlocked = function(t) {
                return null != this.blocked[t.getRef()]
            }
            ,
            t
        }());
        t.exports = a
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t.replace(/\\/g, "/")
        }
        function a(t) {
            for (var e = t.split("\n"), n = {}, r = null, a = 0; a < e.length; a++) {
                var o = e[a];
                if (o.length > 0)
                    switch (o[0]) {
                    case "%":
                    case "@":
                        continue;
                    case "!":
                    case "#":
                        var s = o.slice(2);
                        n[s] = r = {};
                        break;
                    default:
                        "/" === o[o.length - 1] && (o = o.slice(0, o.length - 1));
                        var i = o.split("/")
                          , l = r
                          , u = void 0;
                        for (u = 0; u < i.length - 1; u++) {
                            var c = i[u]
                              , p = l[c];
                            l = p ? l[c] : l[c] = {}
                        }
                        l[i[u]] = !0
                    }
            }
            return n
        }
        function o(t, e, n) {
            var r = new Array(e.length)
              , o = 0;
            l.readFile(u.join(t, "lib", "meta-index"), function(s, i) {
                var c = {};
                s || (c = a(i.toString())),
                p.asyncForEach(e, function(e, n) {
                    var a = u.relative(t + "/lib", e);
                    l.stat(e, function(t, s) {
                        var i;
                        i = t ? new m(e) : s.isDirectory() ? new v(e) : c[a] ? new g(c[a],e) : new _(e),
                        r[o++] = i,
                        i.initialize(n)
                    })
                }, function(t) {
                    n(r)
                })
            })
        }
        var s = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = n(9)
          , l = (n(13),
        n(27))
          , u = n(28)
          , c = n(4)
          , p = n(6)
          , h = c.BFSRequire("fs")
          , f = c.FileSystem.ZipFS
          , d = function() {
            function t(t) {
                this._fs = new h.FS,
                this._jarRead = i.TriState.INDETERMINATE,
                this._path = t
            }
            return t.prototype.getPath = function() {
                return this._path
            }
            ,
            t.prototype.loadJar = function(t) {
                var e = this;
                this._jarRead !== i.TriState.TRUE ? l.readFile(this._path, function(n, r) {
                    if (n)
                        e._jarRead = i.TriState.FALSE,
                        t(n);
                    else
                        try {
                            f.computeIndex(r, function(n) {
                                try {
                                    e._fs.initialize(new f(n,u.basename(e._path))),
                                    e._jarRead = i.TriState.TRUE,
                                    t()
                                } catch (r) {
                                    e._jarRead = i.TriState.FALSE,
                                    t(r)
                                }
                            })
                        } catch (n) {
                            e._jarRead = i.TriState.FALSE,
                            t(n)
                        }
                }) : setImmediate(function() {
                    return t(e._jarRead === i.TriState.TRUE ? null : new Error("Failed to load JAR file."))
                })
            }
            ,
            t.prototype.tryLoadClassSync = function(t) {
                if (this._jarRead !== i.TriState.TRUE)
                    return null;
                if (this.hasClass(t) === i.TriState.FALSE)
                    return null;
                try {
                    return this._fs.readFileSync("/" + t + ".class")
                } catch (e) {
                    return null
                }
            }
            ,
            t.prototype._wrapOp = function(t, e) {
                var n = this;
                switch (this._jarRead) {
                case i.TriState.TRUE:
                    t();
                    break;
                case i.TriState.FALSE:
                    setImmediate(function() {
                        return e(new Error("Unable to load JAR file."))
                    });
                    break;
                default:
                    this.loadJar(function() {
                        n._wrapOp(t, e)
                    })
                }
            }
            ,
            t.prototype._wrapSyncOp = function(t) {
                if (this._jarRead !== i.TriState.TRUE)
                    return null;
                try {
                    return t()
                } catch (e) {
                    return null
                }
            }
            ,
            t.prototype.loadClass = function(t, e) {
                var n = this;
                this._wrapOp(function() {
                    n._fs.readFile("/" + t + ".class", e)
                }, e)
            }
            ,
            t.prototype.statResource = function(t, e) {
                var n = this;
                this._wrapOp(function() {
                    n._fs.stat(t, e)
                }, e)
            }
            ,
            t.prototype.readdir = function(t, e) {
                var n = this;
                this._wrapOp(function() {
                    n._fs.readdir(r(t), e)
                }, e)
            }
            ,
            t.prototype.tryReaddirSync = function(t) {
                var e = this;
                return this._wrapSyncOp(function() {
                    return e._fs.readdirSync(r(t))
                })
            }
            ,
            t.prototype.tryStatSync = function(t) {
                var e = this;
                return this._wrapSyncOp(function() {
                    return e._fs.statSync(r(t))
                })
            }
            ,
            t.prototype.getFS = function() {
                return this._fs.getRootFS()
            }
            ,
            t
        }();
        e.AbstractClasspathJar = d;
        var _ = function(t) {
            function e(e) {
                t.call(this, e),
                this._classList = null
            }
            return s(e, t),
            e.prototype.hasClass = function(t) {
                return this._jarRead === i.TriState.FALSE ? i.TriState.FALSE : this._hasClass(t)
            }
            ,
            e.prototype._hasClass = function(t) {
                return this._classList ? this._classList[t] ? i.TriState.TRUE : i.TriState.FALSE : i.TriState.INDETERMINATE
            }
            ,
            e.prototype.initializeWithClasslist = function(t) {
                this._classList = {};
                for (var e = t.length, n = 0; e > n; n++)
                    this._classList[t[n]] = !0
            }
            ,
            e.prototype.initialize = function(t) {
                var e = this;
                this.loadJar(function(n) {
                    if (n)
                        t();
                    else {
                        for (var r = ["/"], a = [], o = e._fs; r.length > 0; ) {
                            var s = r.pop();
                            try {
                                var i = o.statSync(s);
                                if (i.isDirectory())
                                    for (var l = o.readdirSync(s), c = 0; c < l.length; c++)
                                        r.push(u.join(s, l[c]));
                                else
                                    ".class" === u.extname(s) && a.push(s.slice(1, s.length - 6))
                            } catch (p) {}
                        }
                        e.initializeWithClasslist(a),
                        t()
                    }
                })
            }
            ,
            e
        }(d);
        e.UnindexedClasspathJar = _;
        var g = function(t) {
            function e(e, n) {
                t.call(this, n),
                this._metaIndex = e,
                this._metaName = u.basename(n)
            }
            return s(e, t),
            e.prototype.initialize = function(t) {
                setImmediate(function() {
                    return t()
                })
            }
            ,
            e.prototype.hasClass = function(t) {
                if (this._jarRead === i.TriState.FALSE)
                    return i.TriState.FALSE;
                var e = t.split("/")
                  , n = this._metaIndex;
                e.pop();
                for (var r = 0; r < e.length; r++) {
                    var a = n[e[r]];
                    if (!a)
                        return i.TriState.FALSE;
                    if (a === !0)
                        return i.TriState.INDETERMINATE;
                    n = a
                }
                return i.TriState.FALSE
            }
            ,
            e
        }(d);
        e.IndexedClasspathJar = g;
        var v = function() {
            function t(t) {
                this._path = t
            }
            return t.prototype.getPath = function() {
                return this._path
            }
            ,
            t.prototype.hasClass = function(t) {
                return i.TriState.INDETERMINATE
            }
            ,
            t.prototype.initialize = function(t) {
                setImmediate(t)
            }
            ,
            t.prototype.tryLoadClassSync = function(t) {
                try {
                    return l.readFileSync(u.resolve(this._path, t + ".class"))
                } catch (e) {
                    return null
                }
            }
            ,
            t.prototype.loadClass = function(t, e) {
                l.readFile(u.resolve(this._path, t + ".class"), e)
            }
            ,
            t.prototype.statResource = function(t, e) {
                l.stat(u.resolve(this._path, t), e)
            }
            ,
            t.prototype.readdir = function(t, e) {
                l.readdir(u.resolve(this._path, t), e)
            }
            ,
            t.prototype.tryReaddirSync = function(t) {
                try {
                    return l.readdirSync(u.resolve(this._path, t))
                } catch (e) {
                    return null
                }
            }
            ,
            t.prototype.tryStatSync = function(t) {
                try {
                    return l.statSync(u.resolve(this._path, t))
                } catch (e) {
                    return null
                }
            }
            ,
            t
        }();
        e.ClasspathFolder = v;
        var m = function() {
            function t(t) {
                this._path = t
            }
            return t.prototype.getPath = function() {
                return this._path;
            }
            ,
            t.prototype.hasClass = function(t) {
                return i.TriState.FALSE
            }
            ,
            t.prototype.initialize = function(t) {
                setImmediate(t)
            }
            ,
            t.prototype.initializeWithClasslist = function(t) {}
            ,
            t.prototype.tryLoadClassSync = function(t) {
                return null
            }
            ,
            t.prototype._notFoundError = function(t) {
                setImmediate(function() {
                    return t(new Error("Class cannot be found."))
                })
            }
            ,
            t.prototype.loadClass = function(t, e) {
                this._notFoundError(e)
            }
            ,
            t.prototype.statResource = function(t, e) {
                this._notFoundError(e)
            }
            ,
            t.prototype.readdir = function(t, e) {
                this._notFoundError(e)
            }
            ,
            t.prototype.tryReaddirSync = function(t) {
                return null
            }
            ,
            t.prototype.tryStatSync = function(t) {
                return null
            }
            ,
            t
        }();
        e.ClasspathNotFound = m,
        e.ClasspathFactory = o
    }
    , function(t, e, n) {
        var r = n(4);
        t.exports = r.BFSRequire("fs")
    }
    , function(t, e, n) {
        var r = n(4);
        t.exports = r.BFSRequire("path")
    }
    , function(t, e, n) {
        var r = n(4);
        t.exports = r.BFSRequire("buffer")
    }
    , function(t, e, n) {
        (function(e) {
            "use strict";
            var n = function() {
                function t(n) {
                    this.size = n,
                    this._sizeMap = {},
                    this._buffer = new e(n),
                    this._remaining = n,
                    this._offset = 0,
                    this._freeLists = new Array(t._numSizeClasses);
                    for (var r = 0; r < t._numSizeClasses; r++)
                        this._freeLists[r] = []
                }
                return t.prototype.malloc = function(e) {
                    if (4 >= e && (e = 4),
                    this._remaining < e)
                        throw "out of memory";
                    var n, r;
                    return r = t.size_to_class(e),
                    n = this._freeLists[r].pop(),
                    void 0 === n && (n = this.refill(r)),
                    n
                }
                ,
                t.prototype.free = function(e) {
                    var n = e & ~(t._chunkSize - 1)
                      , r = this._sizeMap[n];
                    this._freeLists[r].push(e)
                }
                ,
                t.prototype.store_word = function(t, e) {
                    this._buffer.writeInt32LE(e, t)
                }
                ,
                t.prototype.get_byte = function(t) {
                    return this._buffer.readUInt8(t)
                }
                ,
                t.prototype.get_word = function(t) {
                    return this._buffer.readInt32LE(t)
                }
                ,
                t.prototype.get_buffer = function(t, e) {
                    return this._buffer.slice(t, t + e)
                }
                ,
                t.prototype.get_signed_byte = function(t) {
                    return this._buffer.readInt8(t)
                }
                ,
                t.prototype.set_byte = function(t, e) {
                    this._buffer.writeUInt8(e, t)
                }
                ,
                t.prototype.set_signed_byte = function(t, e) {
                    this._buffer.writeInt8(e, t)
                }
                ,
                t.prototype.memcpy = function(t, e, n) {
                    this._buffer.copy(this._buffer, e, t, t + n)
                }
                ,
                t.prototype.refill = function(e) {
                    var n = this.cl_to_size(e)
                      , r = Math.floor(t._chunkSize / n);
                    1 > r && (r = 1);
                    var a = this._offset;
                    this._sizeMap[a] = e;
                    for (var o = 0; r > o; o++)
                        this._remaining -= n,
                        a = this._offset,
                        this._freeLists[e].push(a),
                        this._offset += n;
                    return a
                }
                ,
                t.ilog2 = function(t) {
                    for (var e = 0, n = 1; t > n; )
                        n <<= 1,
                        e++;
                    return e
                }
                ,
                t.size_to_class = function(e) {
                    return t.ilog2(e)
                }
                ,
                t.prototype.cl_to_size = function(t) {
                    return 1 << t
                }
                ,
                t._numSizeClasses = 64,
                t._chunkSize = 4096,
                t
            }();
            t.exports = n
        }
        ).call(e, n(7))
    }
    , function(t, e, n) {
        "use strict";
        var r = n(9)
          , a = (n(13),
        function() {
            function t() {
                this._parkCounts = {},
                this._parkCallbacks = {}
            }
            return t.prototype.park = function(t, e) {
                var n = t.getRef();
                this._parkCallbacks[n] = e,
                this._mutateParkCount(t, 1),
                this.isParked(t) && t.setStatus(r.ThreadStatus.PARKED)
            }
            ,
            t.prototype.unpark = function(t) {
                this._mutateParkCount(t, -1)
            }
            ,
            t.prototype.completelyUnpark = function(t) {
                var e = t.getRef()
                  , n = this._parkCounts[e];
                n && this._mutateParkCount(t, -n)
            }
            ,
            t.prototype._mutateParkCount = function(t, e) {
                var n, a = t.getRef();
                this._parkCounts[a] || (this._parkCounts[a] = 0),
                0 === (this._parkCounts[a] += e) && (n = this._parkCallbacks[a],
                delete this._parkCounts[a],
                delete this._parkCallbacks[a],
                t.getStatus() === r.ThreadStatus.PARKED && (t.setStatus(r.ThreadStatus.ASYNC_WAITING),
                n()))
            }
            ,
            t.prototype.isParked = function(t) {
                return !!this._parkCounts[t.getRef()]
            }
            ,
            t
        }());
        t.exports = a
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t === a.ThreadStatus.RUNNABLE
        }
        var a = n(9)
          , o = (n(13),
        function() {
            function t() {
                this._count = 0,
                this._queue = [],
                this._threadScheduled = !1
            }
            return t.prototype.scheduleThread = function(t) {
                this._queue.push(t),
                1 === this._queue.length && this.runThread()
            }
            ,
            t.prototype.runThread = function() {
                var t = this;
                this._threadScheduled || (this._threadScheduled = !0,
                setImmediate(function() {
                    var e = t._queue;
                    if (t._threadScheduled = !1,
                    e.length > 0) {
                        var n = t._queue[0];
                        n.run()
                    }
                }))
            }
            ,
            t.prototype.unscheduleThread = function(t) {
                var e = this._queue
                  , n = e[0] === t;
                n ? (e.shift(),
                this._count = 0,
                this.runThread()) : e.splice(e.indexOf(t), 1)
            }
            ,
            t.prototype.getRunningThread = function() {
                var t = this._queue;
                return t.length > 0 ? t[0] : null
            }
            ,
            t.prototype.priorityChange = function(t) {}
            ,
            t.prototype.quantumOver = function(t) {
                this._count++,
                (this._count >= t.getPriority() || t.getStatus() !== a.ThreadStatus.RUNNABLE) && (this._count = 0,
                this._queue.push(this._queue.shift())),
                this.runThread()
            }
            ,
            t
        }())
          , s = function() {
            function t(t) {
                this.threads = [],
                this.scheduler = new o,
                this.emptyCallback = t
            }
            return t.prototype.getThreads = function() {
                return this.threads.slice(0)
            }
            ,
            t.prototype.anyNonDaemonicThreads = function() {
                for (var t = 0; t < this.threads.length; t++) {
                    var e = this.threads[t];
                    if (!e.isDaemon()) {
                        var n = e.getStatus();
                        if (n !== a.ThreadStatus.NEW && n !== a.ThreadStatus.TERMINATED)
                            return !0
                    }
                }
                return !1
            }
            ,
            t.prototype.threadTerminated = function(t) {
                var e = this.threads.indexOf(t);
                if (this.threads.splice(e, 1),
                !this.anyNonDaemonicThreads()) {
                    var n = this.emptyCallback();
                    n && (this.emptyCallback = null)
                }
            }
            ,
            t.prototype.statusChange = function(t, e, n) {
                var o = r(e)
                  , s = r(n);
                e !== a.ThreadStatus.NEW && e !== a.ThreadStatus.TERMINATED || -1 === this.threads.indexOf(t) && this.threads.push(t),
                o !== s && (o ? this.scheduler.unscheduleThread(t) : this.scheduler.scheduleThread(t)),
                n === a.ThreadStatus.TERMINATED && this.threadTerminated(t)
            }
            ,
            t.prototype.priorityChange = function(t) {
                this.scheduler.priorityChange(t)
            }
            ,
            t.prototype.quantumOver = function(t) {
                this.scheduler.quantumOver(t)
            }
            ,
            t
        }();
        e.__esModule = !0,
        e["default"] = s
    }
    , function(t, e) {
        t.exports = {
            url: "https://github.com/plasma-umass/doppio_jcl/releases/download/v3.2/java_home.tar.gz",
            classpath: ["lib/rt.jar", "lib/charsets.jar", "lib/doppio.jar", "lib/dt.jar", "lib/jce.jar", "lib/jconsole.jar", "lib/jsse.jar", "lib/management-agent.jar", "lib/resources.jar", "lib/sa-jdi.jar", "lib/tools.jar"]
        }
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            return t.msg = D[e],
            e
        }
        function a(t) {
            return (t << 1) - (t > 4 ? 9 : 0)
        }
        function o(t) {
            for (var e = t.length; --e >= 0; )
                t[e] = 0
        }
        function s(t) {
            var e = t.state
              , n = e.pending;
            n > t.avail_out && (n = t.avail_out),
            0 !== n && (w.arraySet(t.output, e.pending_buf, e.pending_out, n, t.next_out),
            t.next_out += n,
            e.pending_out += n,
            t.total_out += n,
            t.avail_out -= n,
            e.pending -= n,
            0 === e.pending && (e.pending_out = 0))
        }
        function i(t, e) {
            k._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e),
            t.block_start = t.strstart,
            s(t.strm)
        }
        function l(t, e) {
            t.pending_buf[t.pending++] = e
        }
        function u(t, e) {
            t.pending_buf[t.pending++] = e >>> 8 & 255,
            t.pending_buf[t.pending++] = 255 & e
        }
        function c(t, e, n, r) {
            var a = t.avail_in;
            return a > r && (a = r),
            0 === a ? 0 : (t.avail_in -= a,
            w.arraySet(e, t.input, t.next_in, a, n),
            1 === t.state.wrap ? t.adler = R(t.adler, e, a, n) : 2 === t.state.wrap && (t.adler = F(t.adler, e, a, n)),
            t.next_in += a,
            t.total_in += a,
            a)
        }
        function p(t, e) {
            var n, r, a = t.max_chain_length, o = t.strstart, s = t.prev_length, i = t.nice_match, l = t.strstart > t.w_size - pt ? t.strstart - (t.w_size - pt) : 0, u = t.window, c = t.w_mask, p = t.prev, h = t.strstart + ct, f = u[o + s - 1], d = u[o + s];
            t.prev_length >= t.good_match && (a >>= 2),
            i > t.lookahead && (i = t.lookahead);
            do
                if (n = e,
                u[n + s] === d && u[n + s - 1] === f && u[n] === u[o] && u[++n] === u[o + 1]) {
                    o += 2,
                    n++;
                    do
                        ;
                    while (u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && h > o);
                    if (r = ct - (h - o),
                    o = h - ct,
                    r > s) {
                        if (t.match_start = e,
                        s = r,
                        r >= i)
                            break;
                        f = u[o + s - 1],
                        d = u[o + s]
                    }
                }
            while ((e = p[e & c]) > l && 0 !== --a);
            return s <= t.lookahead ? s : t.lookahead
        }
        function h(t) {
            var e, n, r, a, o, s = t.w_size;
            do {
                if (a = t.window_size - t.lookahead - t.strstart,
                t.strstart >= s + (s - pt)) {
                    w.arraySet(t.window, t.window, s, s, 0),
                    t.match_start -= s,
                    t.strstart -= s,
                    t.block_start -= s,
                    n = t.hash_size,
                    e = n;
                    do
                        r = t.head[--e],
                        t.head[e] = r >= s ? r - s : 0;
                    while (--n);
                    n = s,
                    e = n;
                    do
                        r = t.prev[--e],
                        t.prev[e] = r >= s ? r - s : 0;
                    while (--n);
                    a += s
                }
                if (0 === t.strm.avail_in)
                    break;
                if (n = c(t.strm, t.window, t.strstart + t.lookahead, a),
                t.lookahead += n,
                t.lookahead + t.insert >= ut)
                    for (o = t.strstart - t.insert,
                    t.ins_h = t.window[o],
                    t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + ut - 1]) & t.hash_mask,
                    t.prev[o & t.w_mask] = t.head[t.ins_h],
                    t.head[t.ins_h] = o,
                    o++,
                    t.insert--,
                    !(t.lookahead + t.insert < ut)); )
                        ;
            } while (t.lookahead < pt && 0 !== t.strm.avail_in)
        }
        function f(t, e) {
            var n = 65535;
            for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5); ; ) {
                if (t.lookahead <= 1) {
                    if (h(t),
                    0 === t.lookahead && e === M)
                        return yt;
                    if (0 === t.lookahead)
                        break
                }
                t.strstart += t.lookahead,
                t.lookahead = 0;
                var r = t.block_start + n;
                if ((0 === t.strstart || t.strstart >= r) && (t.lookahead = t.strstart - r,
                t.strstart = r,
                i(t, !1),
                0 === t.strm.avail_out))
                    return yt;
                if (t.strstart - t.block_start >= t.w_size - pt && (i(t, !1),
                0 === t.strm.avail_out))
                    return yt
            }
            return t.insert = 0,
            e === U ? (i(t, !0),
            0 === t.strm.avail_out ? Et : At) : t.strstart > t.block_start && (i(t, !1),
            0 === t.strm.avail_out) ? yt : yt
        }
        function d(t, e) {
            for (var n, r; ; ) {
                if (t.lookahead < pt) {
                    if (h(t),
                    t.lookahead < pt && e === M)
                        return yt;
                    if (0 === t.lookahead)
                        break
                }
                if (n = 0,
                t.lookahead >= ut && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ut - 1]) & t.hash_mask,
                n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                t.head[t.ins_h] = t.strstart),
                0 !== n && t.strstart - n <= t.w_size - pt && (t.match_length = p(t, n)),
                t.match_length >= ut)
                    if (r = k._tr_tally(t, t.strstart - t.match_start, t.match_length - ut),
                    t.lookahead -= t.match_length,
                    t.match_length <= t.max_lazy_match && t.lookahead >= ut) {
                        t.match_length--;
                        do
                            t.strstart++,
                            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ut - 1]) & t.hash_mask,
                            n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                            t.head[t.ins_h] = t.strstart;
                        while (0 !== --t.match_length);
                        t.strstart++
                    } else
                        t.strstart += t.match_length,
                        t.match_length = 0,
                        t.ins_h = t.window[t.strstart],
                        t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                else
                    r = k._tr_tally(t, 0, t.window[t.strstart]),
                    t.lookahead--,
                    t.strstart++;
                if (r && (i(t, !1),
                0 === t.strm.avail_out))
                    return yt
            }
            return t.insert = t.strstart < ut - 1 ? t.strstart : ut - 1,
            e === U ? (i(t, !0),
            0 === t.strm.avail_out ? Et : At) : t.last_lit && (i(t, !1),
            0 === t.strm.avail_out) ? yt : It
        }
        function _(t, e) {
            for (var n, r, a; ; ) {
                if (t.lookahead < pt) {
                    if (h(t),
                    t.lookahead < pt && e === M)
                        return yt;
                    if (0 === t.lookahead)
                        break
                }
                if (n = 0,
                t.lookahead >= ut && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ut - 1]) & t.hash_mask,
                n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                t.head[t.ins_h] = t.strstart),
                t.prev_length = t.match_length,
                t.prev_match = t.match_start,
                t.match_length = ut - 1,
                0 !== n && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - pt && (t.match_length = p(t, n),
                t.match_length <= 5 && (t.strategy === K || t.match_length === ut && t.strstart - t.match_start > 4096) && (t.match_length = ut - 1)),
                t.prev_length >= ut && t.match_length <= t.prev_length) {
                    a = t.strstart + t.lookahead - ut,
                    r = k._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - ut),
                    t.lookahead -= t.prev_length - 1,
                    t.prev_length -= 2;
                    do
                        ++t.strstart <= a && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ut - 1]) & t.hash_mask,
                        n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                        t.head[t.ins_h] = t.strstart);
                    while (0 !== --t.prev_length);
                    if (t.match_available = 0,
                    t.match_length = ut - 1,
                    t.strstart++,
                    r && (i(t, !1),
                    0 === t.strm.avail_out))
                        return yt
                } else if (t.match_available) {
                    if (r = k._tr_tally(t, 0, t.window[t.strstart - 1]),
                    r && i(t, !1),
                    t.strstart++,
                    t.lookahead--,
                    0 === t.strm.avail_out)
                        return yt
                } else
                    t.match_available = 1,
                    t.strstart++,
                    t.lookahead--
            }
            return t.match_available && (r = k._tr_tally(t, 0, t.window[t.strstart - 1]),
            t.match_available = 0),
            t.insert = t.strstart < ut - 1 ? t.strstart : ut - 1,
            e === U ? (i(t, !0),
            0 === t.strm.avail_out ? Et : At) : t.last_lit && (i(t, !1),
            0 === t.strm.avail_out) ? yt : It
        }
        function g(t, e) {
            for (var n, r, a, o, s = t.window; ; ) {
                if (t.lookahead <= ct) {
                    if (h(t),
                    t.lookahead <= ct && e === M)
                        return yt;
                    if (0 === t.lookahead)
                        break
                }
                if (t.match_length = 0,
                t.lookahead >= ut && t.strstart > 0 && (a = t.strstart - 1,
                r = s[a],
                r === s[++a] && r === s[++a] && r === s[++a])) {
                    o = t.strstart + ct;
                    do
                        ;
                    while (r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && o > a);
                    t.match_length = ct - (o - a),
                    t.match_length > t.lookahead && (t.match_length = t.lookahead)
                }
                if (t.match_length >= ut ? (n = k._tr_tally(t, 1, t.match_length - ut),
                t.lookahead -= t.match_length,
                t.strstart += t.match_length,
                t.match_length = 0) : (n = k._tr_tally(t, 0, t.window[t.strstart]),
                t.lookahead--,
                t.strstart++),
                n && (i(t, !1),
                0 === t.strm.avail_out))
                    return yt
            }
            return t.insert = 0,
            e === U ? (i(t, !0),
            0 === t.strm.avail_out ? Et : At) : t.last_lit && (i(t, !1),
            0 === t.strm.avail_out) ? yt : It
        }
        function v(t, e) {
            for (var n; ; ) {
                if (0 === t.lookahead && (h(t),
                0 === t.lookahead)) {
                    if (e === M)
                        return yt;
                    break
                }
                if (t.match_length = 0,
                n = k._tr_tally(t, 0, t.window[t.strstart]),
                t.lookahead--,
                t.strstart++,
                n && (i(t, !1),
                0 === t.strm.avail_out))
                    return yt
            }
            return t.insert = 0,
            e === U ? (i(t, !0),
            0 === t.strm.avail_out ? Et : At) : t.last_lit && (i(t, !1),
            0 === t.strm.avail_out) ? yt : It
        }
        function m(t, e, n, r, a) {
            this.good_length = t,
            this.max_lazy = e,
            this.nice_length = n,
            this.max_chain = r,
            this.func = a
        }
        function T(t) {
            t.window_size = 2 * t.w_size,
            o(t.head),
            t.max_lazy_match = O[t.level].max_lazy,
            t.good_match = O[t.level].good_length,
            t.nice_match = O[t.level].nice_length,
            t.max_chain_length = O[t.level].max_chain,
            t.strstart = 0,
            t.block_start = 0,
            t.lookahead = 0,
            t.insert = 0,
            t.match_length = t.prev_length = ut - 1,
            t.match_available = 0,
            t.ins_h = 0
        }
        function y() {
            this.strm = null,
            this.status = 0,
            this.pending_buf = null,
            this.pending_buf_size = 0,
            this.pending_out = 0,
            this.pending = 0,
            this.wrap = 0,
            this.gzhead = null,
            this.gzindex = 0,
            this.method = $,
            this.last_flush = -1,
            this.w_size = 0,
            this.w_bits = 0,
            this.w_mask = 0,
            this.window = null,
            this.window_size = 0,
            this.prev = null,
            this.head = null,
            this.ins_h = 0,
            this.hash_size = 0,
            this.hash_bits = 0,
            this.hash_mask = 0,
            this.hash_shift = 0,
            this.block_start = 0,
            this.match_length = 0,
            this.prev_match = 0,
            this.match_available = 0,
            this.strstart = 0,
            this.match_start = 0,
            this.lookahead = 0,
            this.prev_length = 0,
            this.max_chain_length = 0,
            this.max_lazy_match = 0,
            this.level = 0,
            this.strategy = 0,
            this.good_match = 0,
            this.nice_match = 0,
            this.dyn_ltree = new w.Buf16(2 * it),
            this.dyn_dtree = new w.Buf16(2 * (2 * ot + 1)),
            this.bl_tree = new w.Buf16(2 * (2 * st + 1)),
            o(this.dyn_ltree),
            o(this.dyn_dtree),
            o(this.bl_tree),
            this.l_desc = null,
            this.d_desc = null,
            this.bl_desc = null,
            this.bl_count = new w.Buf16(lt + 1),
            this.heap = new w.Buf16(2 * at + 1),
            o(this.heap),
            this.heap_len = 0,
            this.heap_max = 0,
            this.depth = new w.Buf16(2 * at + 1),
            o(this.depth),
            this.l_buf = 0,
            this.lit_bufsize = 0,
            this.last_lit = 0,
            this.d_buf = 0,
            this.opt_len = 0,
            this.static_len = 0,
            this.matches = 0,
            this.insert = 0,
            this.bi_buf = 0,
            this.bi_valid = 0
        }
        function I(t) {
            var e;
            return t && t.state ? (t.total_in = t.total_out = 0,
            t.data_type = X,
            e = t.state,
            e.pending = 0,
            e.pending_out = 0,
            e.wrap < 0 && (e.wrap = -e.wrap),
            e.status = e.wrap ? ft : mt,
            t.adler = 2 === e.wrap ? 0 : 1,
            e.last_flush = M,
            k._tr_init(e),
            x) : r(t, z)
        }
        function E(t) {
            var e = I(t);
            return e === x && T(t.state),
            e
        }
        function A(t, e) {
            return t && t.state ? 2 !== t.state.wrap ? z : (t.state.gzhead = e,
            x) : z
        }
        function S(t, e, n, a, o, s) {
            if (!t)
                return z;
            var i = 1;
            if (e === G && (e = 6),
            0 > a ? (i = 0,
            a = -a) : a > 15 && (i = 2,
            a -= 16),
            1 > o || o > Q || n !== $ || 8 > a || a > 15 || 0 > e || e > 9 || 0 > s || s > q)
                return r(t, z);
            8 === a && (a = 9);
            var l = new y;
            return t.state = l,
            l.strm = t,
            l.wrap = i,
            l.gzhead = null,
            l.w_bits = a,
            l.w_size = 1 << l.w_bits,
            l.w_mask = l.w_size - 1,
            l.hash_bits = o + 7,
            l.hash_size = 1 << l.hash_bits,
            l.hash_mask = l.hash_size - 1,
            l.hash_shift = ~~((l.hash_bits + ut - 1) / ut),
            l.window = new w.Buf8(2 * l.w_size),
            l.head = new w.Buf16(l.hash_size),
            l.prev = new w.Buf16(l.w_size),
            l.lit_bufsize = 1 << o + 6,
            l.pending_buf_size = 4 * l.lit_bufsize,
            l.pending_buf = new w.Buf8(l.pending_buf_size),
            l.d_buf = l.lit_bufsize >> 1,
            l.l_buf = 3 * l.lit_bufsize,
            l.level = e,
            l.strategy = s,
            l.method = n,
            E(t)
        }
        function C(t, e) {
            return S(t, e, $, tt, et, Z)
        }
        function N(t, e) {
            var n, i, c, p;
            if (!t || !t.state || e > P || 0 > e)
                return t ? r(t, z) : z;
            if (i = t.state,
            !t.output || !t.input && 0 !== t.avail_in || i.status === Tt && e !== U)
                return r(t, 0 === t.avail_out ? J : z);
            if (i.strm = t,
            n = i.last_flush,
            i.last_flush = e,
            i.status === ft)
                if (2 === i.wrap)
                    t.adler = 0,
                    l(i, 31),
                    l(i, 139),
                    l(i, 8),
                    i.gzhead ? (l(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)),
                    l(i, 255 & i.gzhead.time),
                    l(i, i.gzhead.time >> 8 & 255),
                    l(i, i.gzhead.time >> 16 & 255),
                    l(i, i.gzhead.time >> 24 & 255),
                    l(i, 9 === i.level ? 2 : i.strategy >= H || i.level < 2 ? 4 : 0),
                    l(i, 255 & i.gzhead.os),
                    i.gzhead.extra && i.gzhead.extra.length && (l(i, 255 & i.gzhead.extra.length),
                    l(i, i.gzhead.extra.length >> 8 & 255)),
                    i.gzhead.hcrc && (t.adler = F(t.adler, i.pending_buf, i.pending, 0)),
                    i.gzindex = 0,
                    i.status = dt) : (l(i, 0),
                    l(i, 0),
                    l(i, 0),
                    l(i, 0),
                    l(i, 0),
                    l(i, 9 === i.level ? 2 : i.strategy >= H || i.level < 2 ? 4 : 0),
                    l(i, St),
                    i.status = mt);
                else {
                    var h = $ + (i.w_bits - 8 << 4) << 8
                      , f = -1;
                    f = i.strategy >= H || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3,
                    h |= f << 6,
                    0 !== i.strstart && (h |= ht),
                    h += 31 - h % 31,
                    i.status = mt,
                    u(i, h),
                    0 !== i.strstart && (u(i, t.adler >>> 16),
                    u(i, 65535 & t.adler)),
                    t.adler = 1
                }
            if (i.status === dt)
                if (i.gzhead.extra) {
                    for (c = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                    s(t),
                    c = i.pending,
                    i.pending !== i.pending_buf_size)); )
                        l(i, 255 & i.gzhead.extra[i.gzindex]),
                        i.gzindex++;
                    i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                    i.gzindex === i.gzhead.extra.length && (i.gzindex = 0,
                    i.status = _t)
                } else
                    i.status = _t;
            if (i.status === _t)
                if (i.gzhead.name) {
                    c = i.pending;
                    do {
                        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                        s(t),
                        c = i.pending,
                        i.pending === i.pending_buf_size)) {
                            p = 1;
                            break
                        }
                        p = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0,
                        l(i, p)
                    } while (0 !== p);
                    i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                    0 === p && (i.gzindex = 0,
                    i.status = gt)
                } else
                    i.status = gt;
            if (i.status === gt)
                if (i.gzhead.comment) {
                    c = i.pending;
                    do {
                        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                        s(t),
                        c = i.pending,
                        i.pending === i.pending_buf_size)) {
                            p = 1;
                            break
                        }
                        p = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0,
                        l(i, p)
                    } while (0 !== p);
                    i.gzhead.hcrc && i.pending > c && (t.adler = F(t.adler, i.pending_buf, i.pending - c, c)),
                    0 === p && (i.status = vt)
                } else
                    i.status = vt;
            if (i.status === vt && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && s(t),
            i.pending + 2 <= i.pending_buf_size && (l(i, 255 & t.adler),
            l(i, t.adler >> 8 & 255),
            t.adler = 0,
            i.status = mt)) : i.status = mt),
            0 !== i.pending) {
                if (s(t),
                0 === t.avail_out)
                    return i.last_flush = -1,
                    x
            } else if (0 === t.avail_in && a(e) <= a(n) && e !== U)
                return r(t, J);
            if (i.status === Tt && 0 !== t.avail_in)
                return r(t, J);
            if (0 !== t.avail_in || 0 !== i.lookahead || e !== M && i.status !== Tt) {
                var d = i.strategy === H ? v(i, e) : i.strategy === Y ? g(i, e) : O[i.level].func(i, e);
                if (d !== Et && d !== At || (i.status = Tt),
                d === yt || d === Et)
                    return 0 === t.avail_out && (i.last_flush = -1),
                    x;
                if (d === It && (e === B ? k._tr_align(i) : e !== P && (k._tr_stored_block(i, 0, 0, !1),
                e === j && (o(i.head),
                0 === i.lookahead && (i.strstart = 0,
                i.block_start = 0,
                i.insert = 0))),
                s(t),
                0 === t.avail_out))
                    return i.last_flush = -1,
                    x
            }
            return e !== U ? x : i.wrap <= 0 ? V : (2 === i.wrap ? (l(i, 255 & t.adler),
            l(i, t.adler >> 8 & 255),
            l(i, t.adler >> 16 & 255),
            l(i, t.adler >> 24 & 255),
            l(i, 255 & t.total_in),
            l(i, t.total_in >> 8 & 255),
            l(i, t.total_in >> 16 & 255),
            l(i, t.total_in >> 24 & 255)) : (u(i, t.adler >>> 16),
            u(i, 65535 & t.adler)),
            s(t),
            i.wrap > 0 && (i.wrap = -i.wrap),
            0 !== i.pending ? x : V)
        }
        function L(t) {
            var e;
            return t && t.state ? (e = t.state.status,
            e !== ft && e !== dt && e !== _t && e !== gt && e !== vt && e !== mt && e !== Tt ? r(t, z) : (t.state = null,
            e === mt ? r(t, W) : x)) : z
        }
        function b(t, e) {
            var n, r, a, s, i, l, u, c, p = e.length;
            if (!t || !t.state)
                return z;
            if (n = t.state,
            s = n.wrap,
            2 === s || 1 === s && n.status !== ft || n.lookahead)
                return z;
            for (1 === s && (t.adler = R(t.adler, e, p, 0)),
            n.wrap = 0,
            p >= n.w_size && (0 === s && (o(n.head),
            n.strstart = 0,
            n.block_start = 0,
            n.insert = 0),
            c = new w.Buf8(n.w_size),
            w.arraySet(c, e, p - n.w_size, n.w_size, 0),
            e = c,
            p = n.w_size),
            i = t.avail_in,
            l = t.next_in,
            u = t.input,
            t.avail_in = p,
            t.next_in = 0,
            t.input = e,
            h(n); n.lookahead >= ut; ) {
                r = n.strstart,
                a = n.lookahead - (ut - 1);
                do
                    n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + ut - 1]) & n.hash_mask,
                    n.prev[r & n.w_mask] = n.head[n.ins_h],
                    n.head[n.ins_h] = r,
                    r++;
                while (--a);
                n.strstart = r,
                n.lookahead = ut - 1,
                h(n)
            }
            return n.strstart += n.lookahead,
            n.block_start = n.strstart,
            n.insert = n.lookahead,
            n.lookahead = 0,
            n.match_length = n.prev_length = ut - 1,
            n.match_available = 0,
            t.next_in = l,
            t.input = u,
            t.avail_in = i,
            n.wrap = s,
            x
        }
        var O, w = n(35), k = n(36), R = n(37), F = n(38), D = n(39), M = 0, B = 1, j = 3, U = 4, P = 5, x = 0, V = 1, z = -2, W = -3, J = -5, G = -1, K = 1, H = 2, Y = 3, q = 4, Z = 0, X = 2, $ = 8, Q = 9, tt = 15, et = 8, nt = 29, rt = 256, at = rt + 1 + nt, ot = 30, st = 19, it = 2 * at + 1, lt = 15, ut = 3, ct = 258, pt = ct + ut + 1, ht = 32, ft = 42, dt = 69, _t = 73, gt = 91, vt = 103, mt = 113, Tt = 666, yt = 1, It = 2, Et = 3, At = 4, St = 3;
        O = [new m(0,0,0,0,f), new m(4,4,8,4,d), new m(4,5,16,8,d), new m(4,6,32,32,d), new m(4,4,16,16,_), new m(8,16,32,32,_), new m(8,16,128,128,_), new m(8,32,128,256,_), new m(32,128,258,1024,_), new m(32,258,258,4096,_)],
        e.deflateInit = C,
        e.deflateInit2 = S,
        e.deflateReset = E,
        e.deflateResetKeep = I,
        e.deflateSetHeader = A,
        e.deflate = N,
        e.deflateEnd = L,
        e.deflateSetDictionary = b,
        e.deflateInfo = "pako deflate (from Nodeca project)"
    }
    , function(t, e) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        e.assign = function(t) {
            for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
                var n = e.shift();
                if (n) {
                    if ("object" != typeof n)
                        throw new TypeError(n + "must be non-object");
                    for (var r in n)
                        n.hasOwnProperty(r) && (t[r] = n[r])
                }
            }
            return t
        }
        ,
        e.shrinkBuf = function(t, e) {
            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e,
            t)
        }
        ;
        var r = {
            arraySet: function(t, e, n, r, a) {
                if (e.subarray && t.subarray)
                    return void t.set(e.subarray(n, n + r), a);
                for (var o = 0; r > o; o++)
                    t[a + o] = e[n + o]
            },
            flattenChunks: function(t) {
                var e, n, r, a, o, s;
                for (r = 0,
                e = 0,
                n = t.length; n > e; e++)
                    r += t[e].length;
                for (s = new Uint8Array(r),
                a = 0,
                e = 0,
                n = t.length; n > e; e++)
                    o = t[e],
                    s.set(o, a),
                    a += o.length;
                return s
            }
        }
          , a = {
            arraySet: function(t, e, n, r, a) {
                for (var o = 0; r > o; o++)
                    t[a + o] = e[n + o]
            },
            flattenChunks: function(t) {
                return [].concat.apply([], t)
            }
        };
        e.setTyped = function(t) {
            t ? (e.Buf8 = Uint8Array,
            e.Buf16 = Uint16Array,
            e.Buf32 = Int32Array,
            e.assign(e, r)) : (e.Buf8 = Array,
            e.Buf16 = Array,
            e.Buf32 = Array,
            e.assign(e, a))
        }
        ,
        e.setTyped(n)
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            for (var e = t.length; --e >= 0; )
                t[e] = 0
        }
        function a(t, e, n, r, a) {
            this.static_tree = t,
            this.extra_bits = e,
            this.extra_base = n,
            this.elems = r,
            this.max_length = a,
            this.has_stree = t && t.length
        }
        function o(t, e) {
            this.dyn_tree = t,
            this.max_code = 0,
            this.stat_desc = e
        }
        function s(t) {
            return 256 > t ? lt[t] : lt[256 + (t >>> 7)]
        }
        function i(t, e) {
            t.pending_buf[t.pending++] = 255 & e,
            t.pending_buf[t.pending++] = e >>> 8 & 255
        }
        function l(t, e, n) {
            t.bi_valid > q - n ? (t.bi_buf |= e << t.bi_valid & 65535,
            i(t, t.bi_buf),
            t.bi_buf = e >> q - t.bi_valid,
            t.bi_valid += n - q) : (t.bi_buf |= e << t.bi_valid & 65535,
            t.bi_valid += n)
        }
        function u(t, e, n) {
            l(t, n[2 * e], n[2 * e + 1])
        }
        function c(t, e) {
            var n = 0;
            do
                n |= 1 & t,
                t >>>= 1,
                n <<= 1;
            while (--e > 0);
            return n >>> 1
        }
        function p(t) {
            16 === t.bi_valid ? (i(t, t.bi_buf),
            t.bi_buf = 0,
            t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf,
            t.bi_buf >>= 8,
            t.bi_valid -= 8)
        }
        function h(t, e) {
            var n, r, a, o, s, i, l = e.dyn_tree, u = e.max_code, c = e.stat_desc.static_tree, p = e.stat_desc.has_stree, h = e.stat_desc.extra_bits, f = e.stat_desc.extra_base, d = e.stat_desc.max_length, _ = 0;
            for (o = 0; Y >= o; o++)
                t.bl_count[o] = 0;
            for (l[2 * t.heap[t.heap_max] + 1] = 0,
            n = t.heap_max + 1; H > n; n++)
                r = t.heap[n],
                o = l[2 * l[2 * r + 1] + 1] + 1,
                o > d && (o = d,
                _++),
                l[2 * r + 1] = o,
                r > u || (t.bl_count[o]++,
                s = 0,
                r >= f && (s = h[r - f]),
                i = l[2 * r],
                t.opt_len += i * (o + s),
                p && (t.static_len += i * (c[2 * r + 1] + s)));
            if (0 !== _) {
                do {
                    for (o = d - 1; 0 === t.bl_count[o]; )
                        o--;
                    t.bl_count[o]--,
                    t.bl_count[o + 1] += 2,
                    t.bl_count[d]--,
                    _ -= 2
                } while (_ > 0);
                for (o = d; 0 !== o; o--)
                    for (r = t.bl_count[o]; 0 !== r; )
                        a = t.heap[--n],
                        a > u || (l[2 * a + 1] !== o && (t.opt_len += (o - l[2 * a + 1]) * l[2 * a],
                        l[2 * a + 1] = o),
                        r--)
            }
        }
        function f(t, e, n) {
            var r, a, o = new Array(Y + 1), s = 0;
            for (r = 1; Y >= r; r++)
                o[r] = s = s + n[r - 1] << 1;
            for (a = 0; e >= a; a++) {
                var i = t[2 * a + 1];
                0 !== i && (t[2 * a] = c(o[i]++, i))
            }
        }
        function d() {
            var t, e, n, r, o, s = new Array(Y + 1);
            for (n = 0,
            r = 0; z - 1 > r; r++)
                for (ct[r] = n,
                t = 0; t < 1 << et[r]; t++)
                    ut[n++] = r;
            for (ut[n - 1] = r,
            o = 0,
            r = 0; 16 > r; r++)
                for (pt[r] = o,
                t = 0; t < 1 << nt[r]; t++)
                    lt[o++] = r;
            for (o >>= 7; G > r; r++)
                for (pt[r] = o << 7,
                t = 0; t < 1 << nt[r] - 7; t++)
                    lt[256 + o++] = r;
            for (e = 0; Y >= e; e++)
                s[e] = 0;
            for (t = 0; 143 >= t; )
                st[2 * t + 1] = 8,
                t++,
                s[8]++;
            for (; 255 >= t; )
                st[2 * t + 1] = 9,
                t++,
                s[9]++;
            for (; 279 >= t; )
                st[2 * t + 1] = 7,
                t++,
                s[7]++;
            for (; 287 >= t; )
                st[2 * t + 1] = 8,
                t++,
                s[8]++;
            for (f(st, J + 1, s),
            t = 0; G > t; t++)
                it[2 * t + 1] = 5,
                it[2 * t] = c(t, 5);
            ht = new a(st,et,W + 1,J,Y),
            ft = new a(it,nt,0,G,Y),
            dt = new a(new Array(0),rt,0,K,Z)
        }
        function _(t) {
            var e;
            for (e = 0; J > e; e++)
                t.dyn_ltree[2 * e] = 0;
            for (e = 0; G > e; e++)
                t.dyn_dtree[2 * e] = 0;
            for (e = 0; K > e; e++)
                t.bl_tree[2 * e] = 0;
            t.dyn_ltree[2 * X] = 1,
            t.opt_len = t.static_len = 0,
            t.last_lit = t.matches = 0
        }
        function g(t) {
            t.bi_valid > 8 ? i(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
            t.bi_buf = 0,
            t.bi_valid = 0
        }
        function v(t, e, n, r) {
            g(t),
            r && (i(t, n),
            i(t, ~n)),
            R.arraySet(t.pending_buf, t.window, e, n, t.pending),
            t.pending += n
        }
        function m(t, e, n, r) {
            var a = 2 * e
              , o = 2 * n;
            return t[a] < t[o] || t[a] === t[o] && r[e] <= r[n]
        }
        function T(t, e, n) {
            for (var r = t.heap[n], a = n << 1; a <= t.heap_len && (a < t.heap_len && m(e, t.heap[a + 1], t.heap[a], t.depth) && a++,
            !m(e, r, t.heap[a], t.depth)); )
                t.heap[n] = t.heap[a],
                n = a,
                a <<= 1;
            t.heap[n] = r
        }
        function y(t, e, n) {
            var r, a, o, i, c = 0;
            if (0 !== t.last_lit)
                do
                    r = t.pending_buf[t.d_buf + 2 * c] << 8 | t.pending_buf[t.d_buf + 2 * c + 1],
                    a = t.pending_buf[t.l_buf + c],
                    c++,
                    0 === r ? u(t, a, e) : (o = ut[a],
                    u(t, o + W + 1, e),
                    i = et[o],
                    0 !== i && (a -= ct[o],
                    l(t, a, i)),
                    r--,
                    o = s(r),
                    u(t, o, n),
                    i = nt[o],
                    0 !== i && (r -= pt[o],
                    l(t, r, i)));
                while (c < t.last_lit);
            u(t, X, e)
        }
        function I(t, e) {
            var n, r, a, o = e.dyn_tree, s = e.stat_desc.static_tree, i = e.stat_desc.has_stree, l = e.stat_desc.elems, u = -1;
            for (t.heap_len = 0,
            t.heap_max = H,
            n = 0; l > n; n++)
                0 !== o[2 * n] ? (t.heap[++t.heap_len] = u = n,
                t.depth[n] = 0) : o[2 * n + 1] = 0;
            for (; t.heap_len < 2; )
                a = t.heap[++t.heap_len] = 2 > u ? ++u : 0,
                o[2 * a] = 1,
                t.depth[a] = 0,
                t.opt_len--,
                i && (t.static_len -= s[2 * a + 1]);
            for (e.max_code = u,
            n = t.heap_len >> 1; n >= 1; n--)
                T(t, o, n);
            a = l;
            do
                n = t.heap[1],
                t.heap[1] = t.heap[t.heap_len--],
                T(t, o, 1),
                r = t.heap[1],
                t.heap[--t.heap_max] = n,
                t.heap[--t.heap_max] = r,
                o[2 * a] = o[2 * n] + o[2 * r],
                t.depth[a] = (t.depth[n] >= t.depth[r] ? t.depth[n] : t.depth[r]) + 1,
                o[2 * n + 1] = o[2 * r + 1] = a,
                t.heap[1] = a++,
                T(t, o, 1);
            while (t.heap_len >= 2);
            t.heap[--t.heap_max] = t.heap[1],
            h(t, e),
            f(o, u, t.bl_count)
        }
        function E(t, e, n) {
            var r, a, o = -1, s = e[1], i = 0, l = 7, u = 4;
            for (0 === s && (l = 138,
            u = 3),
            e[2 * (n + 1) + 1] = 65535,
            r = 0; n >= r; r++)
                a = s,
                s = e[2 * (r + 1) + 1],
                ++i < l && a === s || (u > i ? t.bl_tree[2 * a] += i : 0 !== a ? (a !== o && t.bl_tree[2 * a]++,
                t.bl_tree[2 * $]++) : 10 >= i ? t.bl_tree[2 * Q]++ : t.bl_tree[2 * tt]++,
                i = 0,
                o = a,
                0 === s ? (l = 138,
                u = 3) : a === s ? (l = 6,
                u = 3) : (l = 7,
                u = 4))
        }
        function A(t, e, n) {
            var r, a, o = -1, s = e[1], i = 0, c = 7, p = 4;
            for (0 === s && (c = 138,
            p = 3),
            r = 0; n >= r; r++)
                if (a = s,
                s = e[2 * (r + 1) + 1],
                !(++i < c && a === s)) {
                    if (p > i) {
                        do
                            u(t, a, t.bl_tree);
                        while (0 !== --i)
                    } else
                        0 !== a ? (a !== o && (u(t, a, t.bl_tree),
                        i--),
                        u(t, $, t.bl_tree),
                        l(t, i - 3, 2)) : 10 >= i ? (u(t, Q, t.bl_tree),
                        l(t, i - 3, 3)) : (u(t, tt, t.bl_tree),
                        l(t, i - 11, 7));
                    i = 0,
                    o = a,
                    0 === s ? (c = 138,
                    p = 3) : a === s ? (c = 6,
                    p = 3) : (c = 7,
                    p = 4)
                }
        }
        function S(t) {
            var e;
            for (E(t, t.dyn_ltree, t.l_desc.max_code),
            E(t, t.dyn_dtree, t.d_desc.max_code),
            I(t, t.bl_desc),
            e = K - 1; e >= 3 && 0 === t.bl_tree[2 * at[e] + 1]; e--)
                ;
            return t.opt_len += 3 * (e + 1) + 5 + 5 + 4,
            e
        }
        function C(t, e, n, r) {
            var a;
            for (l(t, e - 257, 5),
            l(t, n - 1, 5),
            l(t, r - 4, 4),
            a = 0; r > a; a++)
                l(t, t.bl_tree[2 * at[a] + 1], 3);
            A(t, t.dyn_ltree, e - 1),
            A(t, t.dyn_dtree, n - 1)
        }
        function N(t) {
            var e, n = 4093624447;
            for (e = 0; 31 >= e; e++,
            n >>>= 1)
                if (1 & n && 0 !== t.dyn_ltree[2 * e])
                    return D;
            if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
                return M;
            for (e = 32; W > e; e++)
                if (0 !== t.dyn_ltree[2 * e])
                    return M;
            return D
        }
        function L(t) {
            _t || (d(),
            _t = !0),
            t.l_desc = new o(t.dyn_ltree,ht),
            t.d_desc = new o(t.dyn_dtree,ft),
            t.bl_desc = new o(t.bl_tree,dt),
            t.bi_buf = 0,
            t.bi_valid = 0,
            _(t)
        }
        function b(t, e, n, r) {
            l(t, (j << 1) + (r ? 1 : 0), 3),
            v(t, e, n, !0)
        }
        function O(t) {
            l(t, U << 1, 3),
            u(t, X, st),
            p(t)
        }
        function w(t, e, n, r) {
            var a, o, s = 0;
            t.level > 0 ? (t.strm.data_type === B && (t.strm.data_type = N(t)),
            I(t, t.l_desc),
            I(t, t.d_desc),
            s = S(t),
            a = t.opt_len + 3 + 7 >>> 3,
            o = t.static_len + 3 + 7 >>> 3,
            a >= o && (a = o)) : a = o = n + 5,
            a >= n + 4 && -1 !== e ? b(t, e, n, r) : t.strategy === F || o === a ? (l(t, (U << 1) + (r ? 1 : 0), 3),
            y(t, st, it)) : (l(t, (P << 1) + (r ? 1 : 0), 3),
            C(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1),
            y(t, t.dyn_ltree, t.dyn_dtree)),
            _(t),
            r && g(t)
        }
        function k(t, e, n) {
            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255,
            t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e,
            t.pending_buf[t.l_buf + t.last_lit] = 255 & n,
            t.last_lit++,
            0 === e ? t.dyn_ltree[2 * n]++ : (t.matches++,
            e--,
            t.dyn_ltree[2 * (ut[n] + W + 1)]++,
            t.dyn_dtree[2 * s(e)]++),
            t.last_lit === t.lit_bufsize - 1
        }
        var R = n(35)
          , F = 4
          , D = 0
          , M = 1
          , B = 2
          , j = 0
          , U = 1
          , P = 2
          , x = 3
          , V = 258
          , z = 29
          , W = 256
          , J = W + 1 + z
          , G = 30
          , K = 19
          , H = 2 * J + 1
          , Y = 15
          , q = 16
          , Z = 7
          , X = 256
          , $ = 16
          , Q = 17
          , tt = 18
          , et = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
          , nt = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
          , rt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
          , at = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
          , ot = 512
          , st = new Array(2 * (J + 2));
        r(st);
        var it = new Array(2 * G);
        r(it);
        var lt = new Array(ot);
        r(lt);
        var ut = new Array(V - x + 1);
        r(ut);
        var ct = new Array(z);
        r(ct);
        var pt = new Array(G);
        r(pt);
        var ht, ft, dt, _t = !1;
        e._tr_init = L,
        e._tr_stored_block = b,
        e._tr_flush_block = w,
        e._tr_tally = k,
        e._tr_align = O
    }
    , function(t, e) {
        "use strict";
        function n(t, e, n, r) {
            for (var a = 65535 & t | 0, o = t >>> 16 & 65535 | 0, s = 0; 0 !== n; ) {
                s = n > 2e3 ? 2e3 : n,
                n -= s;
                do
                    a = a + e[r++] | 0,
                    o = o + a | 0;
                while (--s);
                a %= 65521,
                o %= 65521
            }
            return a | o << 16 | 0
        }
        t.exports = n
    }
    , function(t, e) {
        "use strict";
        function n() {
            for (var t, e = [], n = 0; 256 > n; n++) {
                t = n;
                for (var r = 0; 8 > r; r++)
                    t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                e[n] = t
            }
            return e
        }
        function r(t, e, n, r) {
            var o = a
              , s = r + n;
            t ^= -1;
            for (var i = r; s > i; i++)
                t = t >>> 8 ^ o[255 & (t ^ e[i])];
            return -1 ^ t
        }
        var a = n();
        t.exports = r
    }
    , function(t, e) {
        "use strict";
        t.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        }
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
        }
        function a() {
            this.mode = 0,
            this.last = !1,
            this.wrap = 0,
            this.havedict = !1,
            this.flags = 0,
            this.dmax = 0,
            this.check = 0,
            this.total = 0,
            this.head = null,
            this.wbits = 0,
            this.wsize = 0,
            this.whave = 0,
            this.wnext = 0,
            this.window = null,
            this.hold = 0,
            this.bits = 0,
            this.length = 0,
            this.offset = 0,
            this.extra = 0,
            this.lencode = null,
            this.distcode = null,
            this.lenbits = 0,
            this.distbits = 0,
            this.ncode = 0,
            this.nlen = 0,
            this.ndist = 0,
            this.have = 0,
            this.next = null,
            this.lens = new m.Buf16(320),
            this.work = new m.Buf16(288),
            this.lendyn = null,
            this.distdyn = null,
            this.sane = 0,
            this.back = 0,
            this.was = 0
        }
        function o(t) {
            var e;
            return t && t.state ? (e = t.state,
            t.total_in = t.total_out = e.total = 0,
            t.msg = "",
            e.wrap && (t.adler = 1 & e.wrap),
            e.mode = j,
            e.last = 0,
            e.havedict = 0,
            e.dmax = 32768,
            e.head = null,
            e.hold = 0,
            e.bits = 0,
            e.lencode = e.lendyn = new m.Buf32(_t),
            e.distcode = e.distdyn = new m.Buf32(gt),
            e.sane = 1,
            e.back = -1,
            O) : R
        }
        function s(t) {
            var e;
            return t && t.state ? (e = t.state,
            e.wsize = 0,
            e.whave = 0,
            e.wnext = 0,
            o(t)) : R
        }
        function i(t, e) {
            var n, r;
            return t && t.state ? (r = t.state,
            0 > e ? (n = 0,
            e = -e) : (n = (e >> 4) + 1,
            48 > e && (e &= 15)),
            e && (8 > e || e > 15) ? R : (null !== r.window && r.wbits !== e && (r.window = null),
            r.wrap = n,
            r.wbits = e,
            s(t))) : R
        }
        function l(t, e) {
            var n, r;
            return t ? (r = new a,
            t.state = r,
            r.window = null,
            n = i(t, e),
            n !== O && (t.state = null),
            n) : R
        }
        function u(t) {
            return l(t, mt)
        }
        function c(t) {
            if (Tt) {
                var e;
                for (g = new m.Buf32(512),
                v = new m.Buf32(32),
                e = 0; 144 > e; )
                    t.lens[e++] = 8;
                for (; 256 > e; )
                    t.lens[e++] = 9;
                for (; 280 > e; )
                    t.lens[e++] = 7;
                for (; 288 > e; )
                    t.lens[e++] = 8;
                for (E(S, t.lens, 0, 288, g, 0, t.work, {
                    bits: 9
                }),
                e = 0; 32 > e; )
                    t.lens[e++] = 5;
                E(C, t.lens, 0, 32, v, 0, t.work, {
                    bits: 5
                }),
                Tt = !1
            }
            t.lencode = g,
            t.lenbits = 9,
            t.distcode = v,
            t.distbits = 5
        }
        function p(t, e, n, r) {
            var a, o = t.state;
            return null === o.window && (o.wsize = 1 << o.wbits,
            o.wnext = 0,
            o.whave = 0,
            o.window = new m.Buf8(o.wsize)),
            r >= o.wsize ? (m.arraySet(o.window, e, n - o.wsize, o.wsize, 0),
            o.wnext = 0,
            o.whave = o.wsize) : (a = o.wsize - o.wnext,
            a > r && (a = r),
            m.arraySet(o.window, e, n - r, a, o.wnext),
            r -= a,
            r ? (m.arraySet(o.window, e, n - r, r, 0),
            o.wnext = r,
            o.whave = o.wsize) : (o.wnext += a,
            o.wnext === o.wsize && (o.wnext = 0),
            o.whave < o.wsize && (o.whave += a))),
            0
        }
        function h(t, e) {
            var n, a, o, s, i, l, u, h, f, d, _, g, v, _t, gt, vt, mt, Tt, yt, It, Et, At, St, Ct, Nt = 0, Lt = new m.Buf8(4), bt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in)
                return R;
            n = t.state,
            n.mode === Y && (n.mode = q),
            i = t.next_out,
            o = t.output,
            u = t.avail_out,
            s = t.next_in,
            a = t.input,
            l = t.avail_in,
            h = n.hold,
            f = n.bits,
            d = l,
            _ = u,
            At = O;
            t: for (; ; )
                switch (n.mode) {
                case j:
                    if (0 === n.wrap) {
                        n.mode = q;
                        break
                    }
                    for (; 16 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if (2 & n.wrap && 35615 === h) {
                        n.check = 0,
                        Lt[0] = 255 & h,
                        Lt[1] = h >>> 8 & 255,
                        n.check = y(n.check, Lt, 2, 0),
                        h = 0,
                        f = 0,
                        n.mode = U;
                        break
                    }
                    if (n.flags = 0,
                    n.head && (n.head.done = !1),
                    !(1 & n.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                        t.msg = "incorrect header check",
                        n.mode = ht;
                        break
                    }
                    if ((15 & h) !== B) {
                        t.msg = "unknown compression method",
                        n.mode = ht;
                        break
                    }
                    if (h >>>= 4,
                    f -= 4,
                    Et = (15 & h) + 8,
                    0 === n.wbits)
                        n.wbits = Et;
                    else if (Et > n.wbits) {
                        t.msg = "invalid window size",
                        n.mode = ht;
                        break
                    }
                    n.dmax = 1 << Et,
                    t.adler = n.check = 1,
                    n.mode = 512 & h ? K : Y,
                    h = 0,
                    f = 0;
                    break;
                case U:
                    for (; 16 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if (n.flags = h,
                    (255 & n.flags) !== B) {
                        t.msg = "unknown compression method",
                        n.mode = ht;
                        break
                    }
                    if (57344 & n.flags) {
                        t.msg = "unknown header flags set",
                        n.mode = ht;
                        break
                    }
                    n.head && (n.head.text = h >> 8 & 1),
                    512 & n.flags && (Lt[0] = 255 & h,
                    Lt[1] = h >>> 8 & 255,
                    n.check = y(n.check, Lt, 2, 0)),
                    h = 0,
                    f = 0,
                    n.mode = P;
                case P:
                    for (; 32 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    n.head && (n.head.time = h),
                    512 & n.flags && (Lt[0] = 255 & h,
                    Lt[1] = h >>> 8 & 255,
                    Lt[2] = h >>> 16 & 255,
                    Lt[3] = h >>> 24 & 255,
                    n.check = y(n.check, Lt, 4, 0)),
                    h = 0,
                    f = 0,
                    n.mode = x;
                case x:
                    for (; 16 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    n.head && (n.head.xflags = 255 & h,
                    n.head.os = h >> 8),
                    512 & n.flags && (Lt[0] = 255 & h,
                    Lt[1] = h >>> 8 & 255,
                    n.check = y(n.check, Lt, 2, 0)),
                    h = 0,
                    f = 0,
                    n.mode = V;
                case V:
                    if (1024 & n.flags) {
                        for (; 16 > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        n.length = h,
                        n.head && (n.head.extra_len = h),
                        512 & n.flags && (Lt[0] = 255 & h,
                        Lt[1] = h >>> 8 & 255,
                        n.check = y(n.check, Lt, 2, 0)),
                        h = 0,
                        f = 0
                    } else
                        n.head && (n.head.extra = null);
                    n.mode = z;
                case z:
                    if (1024 & n.flags && (g = n.length,
                    g > l && (g = l),
                    g && (n.head && (Et = n.head.extra_len - n.length,
                    n.head.extra || (n.head.extra = new Array(n.head.extra_len)),
                    m.arraySet(n.head.extra, a, s, g, Et)),
                    512 & n.flags && (n.check = y(n.check, a, g, s)),
                    l -= g,
                    s += g,
                    n.length -= g),
                    n.length))
                        break t;
                    n.length = 0,
                    n.mode = W;
                case W:
                    if (2048 & n.flags) {
                        if (0 === l)
                            break t;
                        g = 0;
                        do
                            Et = a[s + g++],
                            n.head && Et && n.length < 65536 && (n.head.name += String.fromCharCode(Et));
                        while (Et && l > g);
                        if (512 & n.flags && (n.check = y(n.check, a, g, s)),
                        l -= g,
                        s += g,
                        Et)
                            break t
                    } else
                        n.head && (n.head.name = null);
                    n.length = 0,
                    n.mode = J;
                case J:
                    if (4096 & n.flags) {
                        if (0 === l)
                            break t;
                        g = 0;
                        do
                            Et = a[s + g++],
                            n.head && Et && n.length < 65536 && (n.head.comment += String.fromCharCode(Et));
                        while (Et && l > g);
                        if (512 & n.flags && (n.check = y(n.check, a, g, s)),
                        l -= g,
                        s += g,
                        Et)
                            break t
                    } else
                        n.head && (n.head.comment = null);
                    n.mode = G;
                case G:
                    if (512 & n.flags) {
                        for (; 16 > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        if (h !== (65535 & n.check)) {
                            t.msg = "header crc mismatch",
                            n.mode = ht;
                            break
                        }
                        h = 0,
                        f = 0
                    }
                    n.head && (n.head.hcrc = n.flags >> 9 & 1,
                    n.head.done = !0),
                    t.adler = n.check = 0,
                    n.mode = Y;
                    break;
                case K:
                    for (; 32 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    t.adler = n.check = r(h),
                    h = 0,
                    f = 0,
                    n.mode = H;
                case H:
                    if (0 === n.havedict)
                        return t.next_out = i,
                        t.avail_out = u,
                        t.next_in = s,
                        t.avail_in = l,
                        n.hold = h,
                        n.bits = f,
                        k;
                    t.adler = n.check = 1,
                    n.mode = Y;
                case Y:
                    if (e === L || e === b)
                        break t;
                case q:
                    if (n.last) {
                        h >>>= 7 & f,
                        f -= 7 & f,
                        n.mode = ut;
                        break
                    }
                    for (; 3 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    switch (n.last = 1 & h,
                    h >>>= 1,
                    f -= 1,
                    3 & h) {
                    case 0:
                        n.mode = Z;
                        break;
                    case 1:
                        if (c(n),
                        n.mode = nt,
                        e === b) {
                            h >>>= 2,
                            f -= 2;
                            break t
                        }
                        break;
                    case 2:
                        n.mode = Q;
                        break;
                    case 3:
                        t.msg = "invalid block type",
                        n.mode = ht
                    }
                    h >>>= 2,
                    f -= 2;
                    break;
                case Z:
                    for (h >>>= 7 & f,
                    f -= 7 & f; 32 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if ((65535 & h) !== (h >>> 16 ^ 65535)) {
                        t.msg = "invalid stored block lengths",
                        n.mode = ht;
                        break
                    }
                    if (n.length = 65535 & h,
                    h = 0,
                    f = 0,
                    n.mode = X,
                    e === b)
                        break t;
                case X:
                    n.mode = $;
                case $:
                    if (g = n.length) {
                        if (g > l && (g = l),
                        g > u && (g = u),
                        0 === g)
                            break t;
                        m.arraySet(o, a, s, g, i),
                        l -= g,
                        s += g,
                        u -= g,
                        i += g,
                        n.length -= g;
                        break
                    }
                    n.mode = Y;
                    break;
                case Q:
                    for (; 14 > f; ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if (n.nlen = (31 & h) + 257,
                    h >>>= 5,
                    f -= 5,
                    n.ndist = (31 & h) + 1,
                    h >>>= 5,
                    f -= 5,
                    n.ncode = (15 & h) + 4,
                    h >>>= 4,
                    f -= 4,
                    n.nlen > 286 || n.ndist > 30) {
                        t.msg = "too many length or distance symbols",
                        n.mode = ht;
                        break
                    }
                    n.have = 0,
                    n.mode = tt;
                case tt:
                    for (; n.have < n.ncode; ) {
                        for (; 3 > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        n.lens[bt[n.have++]] = 7 & h,
                        h >>>= 3,
                        f -= 3
                    }
                    for (; n.have < 19; )
                        n.lens[bt[n.have++]] = 0;
                    if (n.lencode = n.lendyn,
                    n.lenbits = 7,
                    St = {
                        bits: n.lenbits
                    },
                    At = E(A, n.lens, 0, 19, n.lencode, 0, n.work, St),
                    n.lenbits = St.bits,
                    At) {
                        t.msg = "invalid code lengths set",
                        n.mode = ht;
                        break
                    }
                    n.have = 0,
                    n.mode = et;
                case et:
                    for (; n.have < n.nlen + n.ndist; ) {
                        for (; Nt = n.lencode[h & (1 << n.lenbits) - 1],
                        gt = Nt >>> 24,
                        vt = Nt >>> 16 & 255,
                        mt = 65535 & Nt,
                        !(f >= gt); ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        if (16 > mt)
                            h >>>= gt,
                            f -= gt,
                            n.lens[n.have++] = mt;
                        else {
                            if (16 === mt) {
                                for (Ct = gt + 2; Ct > f; ) {
                                    if (0 === l)
                                        break t;
                                    l--,
                                    h += a[s++] << f,
                                    f += 8
                                }
                                if (h >>>= gt,
                                f -= gt,
                                0 === n.have) {
                                    t.msg = "invalid bit length repeat",
                                    n.mode = ht;
                                    break
                                }
                                Et = n.lens[n.have - 1],
                                g = 3 + (3 & h),
                                h >>>= 2,
                                f -= 2
                            } else if (17 === mt) {
                                for (Ct = gt + 3; Ct > f; ) {
                                    if (0 === l)
                                        break t;
                                    l--,
                                    h += a[s++] << f,
                                    f += 8
                                }
                                h >>>= gt,
                                f -= gt,
                                Et = 0,
                                g = 3 + (7 & h),
                                h >>>= 3,
                                f -= 3
                            } else {
                                for (Ct = gt + 7; Ct > f; ) {
                                    if (0 === l)
                                        break t;
                                    l--,
                                    h += a[s++] << f,
                                    f += 8
                                }
                                h >>>= gt,
                                f -= gt,
                                Et = 0,
                                g = 11 + (127 & h),
                                h >>>= 7,
                                f -= 7
                            }
                            if (n.have + g > n.nlen + n.ndist) {
                                t.msg = "invalid bit length repeat",
                                n.mode = ht;
                                break
                            }
                            for (; g--; )
                                n.lens[n.have++] = Et
                        }
                    }
                    if (n.mode === ht)
                        break;
                    if (0 === n.lens[256]) {
                        t.msg = "invalid code -- missing end-of-block",
                        n.mode = ht;
                        break
                    }
                    if (n.lenbits = 9,
                    St = {
                        bits: n.lenbits
                    },
                    At = E(S, n.lens, 0, n.nlen, n.lencode, 0, n.work, St),
                    n.lenbits = St.bits,
                    At) {
                        t.msg = "invalid literal/lengths set",
                        n.mode = ht;
                        break
                    }
                    if (n.distbits = 6,
                    n.distcode = n.distdyn,
                    St = {
                        bits: n.distbits
                    },
                    At = E(C, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, St),
                    n.distbits = St.bits,
                    At) {
                        t.msg = "invalid distances set",
                        n.mode = ht;
                        break
                    }
                    if (n.mode = nt,
                    e === b)
                        break t;
                case nt:
                    n.mode = rt;
                case rt:
                    if (l >= 6 && u >= 258) {
                        t.next_out = i,
                        t.avail_out = u,
                        t.next_in = s,
                        t.avail_in = l,
                        n.hold = h,
                        n.bits = f,
                        I(t, _),
                        i = t.next_out,
                        o = t.output,
                        u = t.avail_out,
                        s = t.next_in,
                        a = t.input,
                        l = t.avail_in,
                        h = n.hold,
                        f = n.bits,
                        n.mode === Y && (n.back = -1);
                        break
                    }
                    for (n.back = 0; Nt = n.lencode[h & (1 << n.lenbits) - 1],
                    gt = Nt >>> 24,
                    vt = Nt >>> 16 & 255,
                    mt = 65535 & Nt,
                    !(f >= gt); ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if (vt && 0 === (240 & vt)) {
                        for (Tt = gt,
                        yt = vt,
                        It = mt; Nt = n.lencode[It + ((h & (1 << Tt + yt) - 1) >> Tt)],
                        gt = Nt >>> 24,
                        vt = Nt >>> 16 & 255,
                        mt = 65535 & Nt,
                        !(f >= Tt + gt); ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        h >>>= Tt,
                        f -= Tt,
                        n.back += Tt
                    }
                    if (h >>>= gt,
                    f -= gt,
                    n.back += gt,
                    n.length = mt,
                    0 === vt) {
                        n.mode = lt;
                        break
                    }
                    if (32 & vt) {
                        n.back = -1,
                        n.mode = Y;
                        break
                    }
                    if (64 & vt) {
                        t.msg = "invalid literal/length code",
                        n.mode = ht;
                        break
                    }
                    n.extra = 15 & vt,
                    n.mode = at;
                case at:
                    if (n.extra) {
                        for (Ct = n.extra; Ct > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        n.length += h & (1 << n.extra) - 1,
                        h >>>= n.extra,
                        f -= n.extra,
                        n.back += n.extra
                    }
                    n.was = n.length,
                    n.mode = ot;
                case ot:
                    for (; Nt = n.distcode[h & (1 << n.distbits) - 1],
                    gt = Nt >>> 24,
                    vt = Nt >>> 16 & 255,
                    mt = 65535 & Nt,
                    !(f >= gt); ) {
                        if (0 === l)
                            break t;
                        l--,
                        h += a[s++] << f,
                        f += 8
                    }
                    if (0 === (240 & vt)) {
                        for (Tt = gt,
                        yt = vt,
                        It = mt; Nt = n.distcode[It + ((h & (1 << Tt + yt) - 1) >> Tt)],
                        gt = Nt >>> 24,
                        vt = Nt >>> 16 & 255,
                        mt = 65535 & Nt,
                        !(f >= Tt + gt); ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        h >>>= Tt,
                        f -= Tt,
                        n.back += Tt
                    }
                    if (h >>>= gt,
                    f -= gt,
                    n.back += gt,
                    64 & vt) {
                        t.msg = "invalid distance code",
                        n.mode = ht;
                        break
                    }
                    n.offset = mt,
                    n.extra = 15 & vt,
                    n.mode = st;
                case st:
                    if (n.extra) {
                        for (Ct = n.extra; Ct > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        n.offset += h & (1 << n.extra) - 1,
                        h >>>= n.extra,
                        f -= n.extra,
                        n.back += n.extra
                    }
                    if (n.offset > n.dmax) {
                        t.msg = "invalid distance too far back",
                        n.mode = ht;
                        break
                    }
                    n.mode = it;
                case it:
                    if (0 === u)
                        break t;
                    if (g = _ - u,
                    n.offset > g) {
                        if (g = n.offset - g,
                        g > n.whave && n.sane) {
                            t.msg = "invalid distance too far back",
                            n.mode = ht;
                            break
                        }
                        g > n.wnext ? (g -= n.wnext,
                        v = n.wsize - g) : v = n.wnext - g,
                        g > n.length && (g = n.length),
                        _t = n.window
                    } else
                        _t = o,
                        v = i - n.offset,
                        g = n.length;
                    g > u && (g = u),
                    u -= g,
                    n.length -= g;
                    do
                        o[i++] = _t[v++];
                    while (--g);
                    0 === n.length && (n.mode = rt);
                    break;
                case lt:
                    if (0 === u)
                        break t;
                    o[i++] = n.length,
                    u--,
                    n.mode = rt;
                    break;
                case ut:
                    if (n.wrap) {
                        for (; 32 > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h |= a[s++] << f,
                            f += 8
                        }
                        if (_ -= u,
                        t.total_out += _,
                        n.total += _,
                        _ && (t.adler = n.check = n.flags ? y(n.check, o, _, i - _) : T(n.check, o, _, i - _)),
                        _ = u,
                        (n.flags ? h : r(h)) !== n.check) {
                            t.msg = "incorrect data check",
                            n.mode = ht;
                            break
                        }
                        h = 0,
                        f = 0
                    }
                    n.mode = ct;
                case ct:
                    if (n.wrap && n.flags) {
                        for (; 32 > f; ) {
                            if (0 === l)
                                break t;
                            l--,
                            h += a[s++] << f,
                            f += 8
                        }
                        if (h !== (4294967295 & n.total)) {
                            t.msg = "incorrect length check",
                            n.mode = ht;
                            break
                        }
                        h = 0,
                        f = 0
                    }
                    n.mode = pt;
                case pt:
                    At = w;
                    break t;
                case ht:
                    At = F;
                    break t;
                case ft:
                    return D;
                case dt:
                default:
                    return R
                }
            return t.next_out = i,
            t.avail_out = u,
            t.next_in = s,
            t.avail_in = l,
            n.hold = h,
            n.bits = f,
            (n.wsize || _ !== t.avail_out && n.mode < ht && (n.mode < ut || e !== N)) && p(t, t.output, t.next_out, _ - t.avail_out) ? (n.mode = ft,
            D) : (d -= t.avail_in,
            _ -= t.avail_out,
            t.total_in += d,
            t.total_out += _,
            n.total += _,
            n.wrap && _ && (t.adler = n.check = n.flags ? y(n.check, o, _, t.next_out - _) : T(n.check, o, _, t.next_out - _)),
            t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Y ? 128 : 0) + (n.mode === nt || n.mode === X ? 256 : 0),
            (0 === d && 0 === _ || e === N) && At === O && (At = M),
            At)
        }
        function f(t) {
            if (!t || !t.state)
                return R;
            var e = t.state;
            return e.window && (e.window = null),
            t.state = null,
            O
        }
        function d(t, e) {
            var n;
            return t && t.state ? (n = t.state,
            0 === (2 & n.wrap) ? R : (n.head = e,
            e.done = !1,
            O)) : R
        }
        function _(t, e) {
            var n, r, a, o = e.length;
            return t && t.state ? (n = t.state,
            0 !== n.wrap && n.mode !== H ? R : n.mode === H && (r = 1,
            r = T(r, e, o, 0),
            r !== n.check) ? F : (a = p(t, e, o, o)) ? (n.mode = ft,
            D) : (n.havedict = 1,
            O)) : R
        }
        var g, v, m = n(35), T = n(37), y = n(38), I = n(41), E = n(42), A = 0, S = 1, C = 2, N = 4, L = 5, b = 6, O = 0, w = 1, k = 2, R = -2, F = -3, D = -4, M = -5, B = 8, j = 1, U = 2, P = 3, x = 4, V = 5, z = 6, W = 7, J = 8, G = 9, K = 10, H = 11, Y = 12, q = 13, Z = 14, X = 15, $ = 16, Q = 17, tt = 18, et = 19, nt = 20, rt = 21, at = 22, ot = 23, st = 24, it = 25, lt = 26, ut = 27, ct = 28, pt = 29, ht = 30, ft = 31, dt = 32, _t = 852, gt = 592, vt = 15, mt = vt, Tt = !0;
        e.inflateReset = s,
        e.inflateReset2 = i,
        e.inflateResetKeep = o,
        e.inflateInit = u,
        e.inflateInit2 = l,
        e.inflate = h,
        e.inflateEnd = f,
        e.inflateGetHeader = d,
        e.inflateSetDictionary = _,
        e.inflateInfo = "pako inflate (from Nodeca project)"
    }
    , function(t, e) {
        "use strict";
        var n = 30
          , r = 12;
        t.exports = function(t, e) {
            var a, o, s, i, l, u, c, p, h, f, d, _, g, v, m, T, y, I, E, A, S, C, N, L, b;
            a = t.state,
            o = t.next_in,
            L = t.input,
            s = o + (t.avail_in - 5),
            i = t.next_out,
            b = t.output,
            l = i - (e - t.avail_out),
            u = i + (t.avail_out - 257),
            c = a.dmax,
            p = a.wsize,
            h = a.whave,
            f = a.wnext,
            d = a.window,
            _ = a.hold,
            g = a.bits,
            v = a.lencode,
            m = a.distcode,
            T = (1 << a.lenbits) - 1,
            y = (1 << a.distbits) - 1;
            t: do {
                15 > g && (_ += L[o++] << g,
                g += 8,
                _ += L[o++] << g,
                g += 8),
                I = v[_ & T];
                e: for (; ; ) {
                    if (E = I >>> 24,
                    _ >>>= E,
                    g -= E,
                    E = I >>> 16 & 255,
                    0 === E)
                        b[i++] = 65535 & I;
                    else {
                        if (!(16 & E)) {
                            if (0 === (64 & E)) {
                                I = v[(65535 & I) + (_ & (1 << E) - 1)];
                                continue e
                            }
                            if (32 & E) {
                                a.mode = r;
                                break t
                            }
                            t.msg = "invalid literal/length code",
                            a.mode = n;
                            break t
                        }
                        A = 65535 & I,
                        E &= 15,
                        E && (E > g && (_ += L[o++] << g,
                        g += 8),
                        A += _ & (1 << E) - 1,
                        _ >>>= E,
                        g -= E),
                        15 > g && (_ += L[o++] << g,
                        g += 8,
                        _ += L[o++] << g,
                        g += 8),
                        I = m[_ & y];
                        n: for (; ; ) {
                            if (E = I >>> 24,
                            _ >>>= E,
                            g -= E,
                            E = I >>> 16 & 255,
                            !(16 & E)) {
                                if (0 === (64 & E)) {
                                    I = m[(65535 & I) + (_ & (1 << E) - 1)];
                                    continue n
                                }
                                t.msg = "invalid distance code",
                                a.mode = n;
                                break t
                            }
                            if (S = 65535 & I,
                            E &= 15,
                            E > g && (_ += L[o++] << g,
                            g += 8,
                            E > g && (_ += L[o++] << g,
                            g += 8)),
                            S += _ & (1 << E) - 1,
                            S > c) {
                                t.msg = "invalid distance too far back",
                                a.mode = n;
                                break t
                            }
                            if (_ >>>= E,
                            g -= E,
                            E = i - l,
                            S > E) {
                                if (E = S - E,
                                E > h && a.sane) {
                                    t.msg = "invalid distance too far back",
                                    a.mode = n;
                                    break t
                                }
                                if (C = 0,
                                N = d,
                                0 === f) {
                                    if (C += p - E,
                                    A > E) {
                                        A -= E;
                                        do
                                            b[i++] = d[C++];
                                        while (--E);
                                        C = i - S,
                                        N = b
                                    }
                                } else if (E > f) {
                                    if (C += p + f - E,
                                    E -= f,
                                    A > E) {
                                        A -= E;
                                        do
                                            b[i++] = d[C++];
                                        while (--E);
                                        if (C = 0,
                                        A > f) {
                                            E = f,
                                            A -= E;
                                            do
                                                b[i++] = d[C++];
                                            while (--E);
                                            C = i - S,
                                            N = b
                                        }
                                    }
                                } else if (C += f - E,
                                A > E) {
                                    A -= E;
                                    do
                                        b[i++] = d[C++];
                                    while (--E);
                                    C = i - S,
                                    N = b
                                }
                                for (; A > 2; )
                                    b[i++] = N[C++],
                                    b[i++] = N[C++],
                                    b[i++] = N[C++],
                                    A -= 3;
                                A && (b[i++] = N[C++],
                                A > 1 && (b[i++] = N[C++]))
                            } else {
                                C = i - S;
                                do
                                    b[i++] = b[C++],
                                    b[i++] = b[C++],
                                    b[i++] = b[C++],
                                    A -= 3;
                                while (A > 2);
                                A && (b[i++] = b[C++],
                                A > 1 && (b[i++] = b[C++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (s > o && u > i);
            A = g >> 3,
            o -= A,
            g -= A << 3,
            _ &= (1 << g) - 1,
            t.next_in = o,
            t.next_out = i,
            t.avail_in = s > o ? 5 + (s - o) : 5 - (o - s),
            t.avail_out = u > i ? 257 + (u - i) : 257 - (i - u),
            a.hold = _,
            a.bits = g
        }
    }
    , function(t, e, n) {
        "use strict";
        var r = n(35)
          , a = 15
          , o = 852
          , s = 592
          , i = 0
          , l = 1
          , u = 2
          , c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
          , p = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
          , h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
          , f = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(t, e, n, d, _, g, v, m) {
            var T, y, I, E, A, S, C, N, L, b = m.bits, O = 0, w = 0, k = 0, R = 0, F = 0, D = 0, M = 0, B = 0, j = 0, U = 0, P = null, x = 0, V = new r.Buf16(a + 1), z = new r.Buf16(a + 1), W = null, J = 0;
            for (O = 0; a >= O; O++)
                V[O] = 0;
            for (w = 0; d > w; w++)
                V[e[n + w]]++;
            for (F = b,
            R = a; R >= 1 && 0 === V[R]; R--)
                ;
            if (F > R && (F = R),
            0 === R)
                return _[g++] = 20971520,
                _[g++] = 20971520,
                m.bits = 1,
                0;
            for (k = 1; R > k && 0 === V[k]; k++)
                ;
            for (k > F && (F = k),
            B = 1,
            O = 1; a >= O; O++)
                if (B <<= 1,
                B -= V[O],
                0 > B)
                    return -1;
            if (B > 0 && (t === i || 1 !== R))
                return -1;
            for (z[1] = 0,
            O = 1; a > O; O++)
                z[O + 1] = z[O] + V[O];
            for (w = 0; d > w; w++)
                0 !== e[n + w] && (v[z[e[n + w]]++] = w);
            if (t === i ? (P = W = v,
            S = 19) : t === l ? (P = c,
            x -= 257,
            W = p,
            J -= 257,
            S = 256) : (P = h,
            W = f,
            S = -1),
            U = 0,
            w = 0,
            O = k,
            A = g,
            D = F,
            M = 0,
            I = -1,
            j = 1 << F,
            E = j - 1,
            t === l && j > o || t === u && j > s)
                return 1;
            for (var G = 0; ; ) {
                G++,
                C = O - M,
                v[w] < S ? (N = 0,
                L = v[w]) : v[w] > S ? (N = W[J + v[w]],
                L = P[x + v[w]]) : (N = 96,
                L = 0),
                T = 1 << O - M,
                y = 1 << D,
                k = y;
                do
                    y -= T,
                    _[A + (U >> M) + y] = C << 24 | N << 16 | L | 0;
                while (0 !== y);
                for (T = 1 << O - 1; U & T; )
                    T >>= 1;
                if (0 !== T ? (U &= T - 1,
                U += T) : U = 0,
                w++,
                0 === --V[O]) {
                    if (O === R)
                        break;
                    O = e[n + v[w]]
                }
                if (O > F && (U & E) !== I) {
                    for (0 === M && (M = F),
                    A += k,
                    D = O - M,
                    B = 1 << D; R > D + M && (B -= V[D + M],
                    !(0 >= B)); )
                        D++,
                        B <<= 1;
                    if (j += 1 << D,
                    t === l && j > o || t === u && j > s)
                        return 1;
                    I = U & E,
                    _[I] = F << 24 | D << 16 | A - g | 0
                }
            }
            return 0 !== U && (_[A + U] = O - M << 24 | 64 << 16 | 0),
            m.bits = F,
            0
        }
    }
    , function(t, e) {
        "use strict";
        function n() {
            this.input = null,
            this.next_in = 0,
            this.avail_in = 0,
            this.total_in = 0,
            this.output = null,
            this.next_out = 0,
            this.avail_out = 0,
            this.total_out = 0,
            this.msg = "",
            this.state = null,
            this.data_type = 2,
            this.adler = 0
        }
        t.exports = n
    }
    , function(t, e) {
        t.exports = {
            name: "doppiojvm",
            version: "0.3.1",
            engine: "node >= 4.0.0",
            license: "MIT",
            main: "dist/release/doppio.js",
            typings: "dist/typings/src/doppiojvm",
            dependencies: {
                async: "^1.5.2",
                browserfs: "^0.5.12",
                glob: "^7.0.3",
                "gunzip-maybe": "^1.3.1",
                optimist: "~0.6",
                pako: "^1.0.1",
                rimraf: "^2.5.2",
                "source-map-support": "^0.4.0",
                "tar-fs": "^1.12.0"
            },
            devDependencies: {
                "bfs-buffer": "^0.1.7",
                "bfs-path": "^0.1.2",
                "bfs-process": "^0.1.6",
                "body-parser": "^1.15.1",
                cpr: "^1.1.1",
                "detect-browser": "^1.3.1",
                escodegen: "^1.8.0",
                esprima: "^2.7.2",
                estraverse: "^4.2.0",
                express: "^4.13.4",
                grunt: "^1.0",
                "grunt-cli": "^1.2",
                "grunt-contrib-compress": "^1.2.0",
                "grunt-contrib-connect": "^1.0",
                "grunt-contrib-copy": "^1.0",
                "grunt-contrib-uglify": "^1.0",
                "grunt-karma": "^1.0",
                "grunt-lineending": "^0.2.4",
                "grunt-merge-source-maps": "^0.1.0",
                "grunt-newer": "^1.2.0",
                "grunt-ts": "^5.5",
                "grunt-webpack": "^1.0.11",
                "imports-loader": "^0.6.5",
                "jasmine-core": "^2.3.4",
                "json-loader": "^0.5.4",
                karma: "^0.13.22",
                "karma-chrome-launcher": "^1.0",
                "karma-firefox-launcher": "^1.0",
                "karma-ie-launcher": "^1.0",
                "karma-jasmine": "^1.0",
                "karma-opera-launcher": "^1.0",
                "karma-safari-launcher": "^1.0",
                "locate-java-home": "^0.1.4",
                semver: "^5.1.0",
                "source-map-loader": "^0.1.5",
                typescript: "^1.8.10",
                "uglify-js": "^2.6.2",
                underscore: "^1.8.3",
                webpack: "^1.13.1",
                "webpack-dev-server": "^1.14.1"
            },
            scripts: {
                test: "grunt test",
                prepublish: "node ./prepublish.js",
                install: "node ./install.js",
                "appveyor-test": "grunt test-browser-appveyor"
            },
            repository: {
                type: "git",
                url: "http://github.com/plasma-umass/doppio.git"
            },
            bin: {
                doppio: "./bin/doppio",
                doppioh: "./bin/doppioh",
                "doppio-dev": "./bin/doppio-dev",
                "doppio-fast-dev": "./bin/doppio-fast-dev"
            }
        }
    }
    , function(t, e) {
        "use strict";
        function n(t, e, n) {
            return new o(t,e).text_diff(n)
        }
        function r(t, e) {
            for (var n = Math.max(t.length, e.length), r = 0; n > r; r++) {
                if (t[r] < e[r])
                    return -1;
                if (t[r] > e[r])
                    return 1
            }
            return t.length == e.length ? 0 : t.length < e.length ? -1 : 1
        }
        function a(t, e, n) {
            return t.hasOwnProperty(e) ? t[e] : n
        }
        e.text_diff = n;
        var o = function() {
            function t(t, e) {
                this.a = t,
                this.b = e,
                this.b2j = {};
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    this.b2j.hasOwnProperty(r) ? this.b2j[r].push(n) : this.b2j[r] = [n]
                }
            }
            return t.prototype.find_longest_match = function(t, e, n, r) {
                for (var o = this.a, s = this.b, i = this.b2j, l = t, u = n, c = 0, p = {}, h = t; e > h; h++) {
                    var f = {}
                      , d = a(i, o[h], []);
                    for (var _ in d)
                        if (d.hasOwnProperty(_)) {
                            var g = d[_];
                            if (n > g)
                                continue;
                            if (g >= r)
                                break;
                            var v = a(p, g - 1, 0) + 1;
                            f[g] = v,
                            v > c && (l = h - v + 1,
                            u = g - v + 1,
                            c = v)
                        }
                    p = f
                }
                for (; l > t && u > n && o[l - 1] == s[u - 1]; )
                    l--,
                    u--,
                    c++;
                for (; e > l + c && r > u + c && o[l + c] == s[u + c]; )
                    c++;
                return [l, u, c]
            }
            ,
            t.prototype.get_matching_blocks = function() {
                if (null != this.matching_blocks)
                    return this.matching_blocks;
                for (var t = this.a.length, e = this.b.length, n = [[0, t, 0, e]], a = []; n.length; ) {
                    var o = n.pop()
                      , s = o[0]
                      , i = o[1]
                      , l = o[2]
                      , u = o[3]
                      , c = this.find_longest_match(s, i, l, u)
                      , p = c[0]
                      , h = c[1]
                      , f = c[2];
                    f && (a.push(c),
                    p > s && h > l && n.push([s, p, l, h]),
                    i > p + f && u > h + f && n.push([p + f, i, h + f, u]))
                }
                a.sort(r);
                for (var d = 0, _ = 0, g = 0, v = [], m = 0; m < a.length; m++) {
                    var T = a[m]
                      , y = T[0]
                      , I = T[1]
                      , E = T[2];
                    d + g == y && _ + g == I ? g += E : (g && v.push([d, _, g]),
                    d = y,
                    _ = I,
                    g = E)
                }
                return g && v.push([d, _, g]),
                v.push([t, e, 0]),
                this.matching_blocks = v,
                this.matching_blocks
            }
            ,
            t.prototype.get_opcodes = function() {
                if (null != this.opcodes)
                    return this.opcodes;
                var t = 0
                  , e = 0
                  , n = [];
                this.opcodes = n;
                for (var r = this.get_matching_blocks(), a = 0; a < r.length; a++) {
                    var o = r[a]
                      , s = o[0]
                      , i = o[1]
                      , l = o[2]
                      , u = "";
                    s > t && i > e ? u = "replace" : s > t ? u = "delete" : i > e && (u = "insert"),
                    u && n.push([u, t, s, e, i]),
                    t = s + l,
                    e = i + l,
                    l && n.push(["equal", s, t, i, e])
                }
                return n
            }
            ,
            t.prototype.text_diff = function(t) {
                for (var e = this.get_opcodes(), n = [], r = [], a = [], o = 0, s = -1, i = 0; i < e.length; i++) {
                    var l = e[i];
                    if ("equal" !== l[0]) {
                        var u = l[1]
                          , c = l[3]
                          , p = l[2] - 1
                          , h = l[4] - 1
                          , f = Math.min(u, c)
                          , d = Math.max(p, h)
                          , _ = "";
                        switch (l[0]) {
                        case "delete":
                            _ = " < ";
                            break;
                        case "insert":
                            _ = " > ";
                            break;
                        case "replace":
                            _ = " | "
                        }
                        for (var g = Math.max(s + 1, f - t); f > g; g++) {
                            var v = g + ": ";
                            g < this.a.length ? (r.push(v + this.a[g]),
                            o = Math.max(o, this.a[g].length + v.length)) : r.push(v),
                            g < this.b.length ? a.push(this.b[g]) : a.push(""),
                            n.push("   ")
                        }
                        for (var g = f; d >= g; g++) {
                            var v = g + ": ";
                            g >= u && p >= g ? (r.push(v + this.a[g]),
                            o = Math.max(o, this.a[g].length + v.length)) : r.push(v),
                            g >= c && h >= g ? a.push(this.b[g]) : a.push(""),
                            n.push(_)
                        }
                        s = d
                    }
                }
                for (var g = 0; g < n.length; g++) {
                    var m = r[g]
                      , T = a[g];
                    m.length < o && (m += new Array(o - m.length + 1).join(" ")),
                    n[g] = m + n[g] + T
                }
                return n
            }
            ,
            t
        }();
        e.SequenceMatcher = o
    }
    , function(t, e, n) {
        "use strict";
        var r = n(5);
        e.JVM = r;
        var a = n(47);
        e.CLI = a;
        var o = n(49);
        e.ClassFile = o;
        var s = n(15);
        e.Threading = s;
        var i = n(8);
        e.Long = i;
        var l = n(6);
        e.Util = l;
        var u = n(9);
        e.Enums = u;
        var c = n(50);
        e.Interfaces = c;
        var p = n(25);
        e.Monitor = p
    }
    , function(t, e, n) {
        (function(e) {
            "use strict";
            function r(t, n, r, i) {
                void 0 === i && (i = function(t) {}
                );
                var u, h = p.parse(t), f = h["default"], d = h.X;
                if (n.properties = f.mapOption("D"),
                f.flag("help", !1))
                    return o(n.launcherName, p.help("default"), r, 0);
                if (f.flag("X", !1))
                    return s(n.launcherName, p.help("X"), r, 0);
                var _ = d.stringOption("log", "ERROR");
                if (n.intMode = d.flag("int", !1),
                n.dumpJITStats = d.flag("dump-JIT-stats", !1),
                /^[0-9]+$/.test(_))
                    c.log_level = parseInt(_, 10);
                else {
                    var g = c[_.toUpperCase()];
                    if (null == g)
                        return e.stderr.write("Unrecognized log level: " + _ + "."),
                        o(n.launcherName, p.help("default"), r, 1);
                    c.log_level = g
                }
                d.flag("list-class-cache", !1) && (r = function(t) {
                    return function(n) {
                        var r = u.getBootstrapClassLoader().getLoadedClassFiles();
                        e.stdout.write(r.join("\n") + "\n"),
                        t(n)
                    }
                }(r)),
                f.flag("enablesystemassertions", !1) && (n.enableSystemAssertions = !0),
                f.flag("disablesystemassertions", !1) && (n.enableSystemAssertions = !1),
                f.flag("enableassertions", !1) ? n.enableAssertions = !0 : f.stringOption("enableassertions", null) && (n.enableAssertions = f.stringOption("enableassertions", null).split(":")),
                f.stringOption("disableassertions", null) && (n.disableAssertions = f.stringOption("disableassertions", null).split(":"));
                var v = d.stringOption("bootclasspath", null);
                null !== v && (n.bootstrapClasspath = v.split(":"));
                var m = d.stringOption("bootclasspath/a", null);
                m && (n.bootstrapClasspath = n.bootstrapClasspath.concat(m.split(":")));
                var T = d.stringOption("bootclasspath/p", null);
                T && (n.bootstrapClasspath = T.split(":").concat(n.bootstrapClasspath)),
                n.classpath || (n.classpath = []),
                f.stringOption("jar", null) ? n.classpath.push(f.stringOption("jar", null)) : f.stringOption("classpath", null) ? n.classpath = n.classpath.concat(f.stringOption("classpath", null).split(":")) : n.classpath.push(e.cwd());
                var y = f.stringOption("native-classpath", null);
                y && (n.nativeClasspath = n.nativeClasspath.concat(y.split(":"))),
                u = new l(n,function(t) {
                    t ? (e.stderr.write("Error constructing JVM:\n"),
                    e.stderr.write(t.toString() + "\n"),
                    r(1)) : a(f, n, u, r, i)
                }
                ),
                u.setPrintJITCompilation(d.flag("X:+PrintCompilation", !1));
                var I = d.stringOption("vtrace-methods", null);
                I && I.split(":").forEach(function(t) {
                    return u.vtraceMethod(t)
                });
                var E = d.stringOption("dumpCompiledCode", null);
                E && u.dumpCompiledCode(E)
            }
            function a(t, e, n, r, a) {
                var s = t.unparsedArgs();
                if (t.stringOption("jar", null))
                    n.runJar(s, r),
                    a(n);
                else if (s.length > 0) {
                    var i = s[0];
                    ".class" === i.slice(-6) && (i = i.slice(0, -6)),
                    -1 !== i.indexOf(".") && (i = u.descriptor2typestr(u.int_classname(i))),
                    n.runClass(i, s.slice(1), r),
                    a(n)
                } else
                    o(e.launcherName, p.help("default"), r, 0)
            }
            function o(t, n, r, a) {
                e.stdout.write("Usage: " + t + " [-options] class [args...]\n        (to execute a class)\nor  " + t + " [-options] -jar jarfile [args...]\n        (to execute a jar file)\nwhere options include:\n" + n),
                r(a)
            }
            function s(t, n, r, a) {
                e.stdout.write(n + "\n\nThe -X options are non-standard and subject to change without notice.\n"),
                r(a)
            }
            var i = n(48)
              , l = n(5)
              , u = n(6)
              , c = n(17)
              , p = new i.OptionParser({
                "default": {
                    classpath: {
                        type: 3,
                        alias: "cp",
                        optDesc: " <class search path of directories and zip/jar files>",
                        desc: "A : separated list of directories, JAR archives, and ZIP archives to search for class files."
                    },
                    D: {
                        type: 4,
                        optDesc: "<name>=<value>",
                        desc: "set a system property"
                    },
                    jar: {
                        type: 3,
                        stopParsing: !0
                    },
                    help: {
                        alias: "?",
                        desc: "print this help message"
                    },
                    X: {
                        desc: "print help on non-standard options"
                    },
                    enableassertions: {
                        type: 2,
                        optDesc: "[:<packagename>...|:<classname>]",
                        alias: "ea",
                        desc: "enable assertions with specified granularity"
                    },
                    disableassertions: {
                        type: 2,
                        optDesc: "[:<packagename>...|:<classname>]",
                        alias: "da",
                        desc: "disable assertions with specified granularity"
                    },
                    enablesystemassertions: {
                        alias: "esa",
                        desc: "enable system assertions"
                    },
                    disablesystemassertions: {
                        alias: "dsa",
                        desc: "disable system assertions "
                    }
                },
                X: {
                    "int": {
                        desc: "interpreted mode execution only"
                    },
                    "dump-JIT-stats": {
                        desc: "dump JIT statistics"
                    },
                    log: {
                        desc: "log level, [0-10]|vtrace|trace|debug|error",
                        type: 3
                    },
                    "vtrace-methods": {
                        type: 3,
                        optDesc: " <java/lang/Object/getHashCode()I:...>",
                        desc: "specify particular methods to vtrace separated by colons"
                    },
                    "list-class-cache": {
                        desc: "list all of the bootstrap loaded classes after execution"
                    },
                    "dump-compiled-code": {
                        type: 3,
                        optDesc: " <directory>",
                        desc: "location to dump compiled object definitions"
                    },
                    "native-classpath": {
                        type: 3,
                        optDesc: " <class search path of directories>",
                        desc: "A : separated list of directories to search for native mathods in JS files."
                    },
                    "bootclasspath/a": {
                        type: 1,
                        optDesc: ":<directories and zip/jar files separated by :>",
                        desc: "append to end of bootstrap class path"
                    },
                    "bootclasspath/p": {
                        type: 1,
                        optDesc: ":<directories and zip/jar files separated by :>",
                        desc: "prepend in front of bootstrap class path"
                    },
                    bootclasspath: {
                        type: 1,
                        optDesc: ":<directories and zip/jar files separated by :>",
                        desc: "set search path for bootstrap classes and resources"
                    },
                    "X:+PrintCompilation": {
                        desc: "Print JIT compilation details"
                    }
                }
            });
            t.exports = r
        }
        ).call(e, n(3))
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            return "default" !== t ? "" + t + e : e
        }
        function r(t, e) {
            for (var n = t, r = e - t.length; r-- > 0; )
                n += " ";
            return n
        }
        function a(t, e) {
            var n = {}
              , a = 13;
            return Object.keys(t).forEach(function(r) {
                var a = t[r];
                if (!a.stopParsing) {
                    var o = [r];
                    null != a.alias && o.push(a.alias);
                    var s;
                    s = a.optDesc ? o.map(function(t) {
                        return "-" + e + t + a.optDesc
                    }).join("\n") : o.map(function(t) {
                        return "-" + e + t
                    }).join(" | "),
                    n[s] = a
                }
            }),
            Object.keys(n).map(function(t) {
                var e = n[t];
                if (e.optDesc) {
                    var o = t.split("\n")
                      , s = o.map(function(t) {
                        return "    " + t
                    });
                    return s.join("\n") + "\n                  " + e.desc
                }
                var i = r(t, a);
                return i.length === a ? "    " + i + " " + e.desc : "    " + i + "\n                  " + e.desc
            }).join("\n") + "\n"
        }
        var o = function() {
            function t(t, e) {
                void 0 === e && (e = []),
                this._result = t,
                this._unparsedArgs = e
            }
            return t.prototype.unparsedArgs = function() {
                return this._unparsedArgs
            }
            ,
            t.prototype.flag = function(t, e) {
                var n = this._result[t];
                return "boolean" == typeof n ? n : e
            }
            ,
            t.prototype.stringOption = function(t, e) {
                var n = this._result[t];
                return "string" == typeof n ? n : e
            }
            ,
            t.prototype.mapOption = function(t) {
                var e = this._result[t];
                return "object" == typeof e ? e : {}
            }
            ,
            t
        }();
        e.PrefixParseResult = o;
        var s = function() {
            function t(t) {
                var e = this;
                this._parseMap = {},
                this._prefixes = [],
                this._mapArgs = [],
                this._rawDesc = t,
                this._prefixes = Object.keys(t),
                this._prefixes.forEach(function(r) {
                    var a = t[r]
                      , o = Object.keys(a);
                    o.slice(0).forEach(function(t) {
                        var s = a[t];
                        s.type || (s.type = 0),
                        4 === s.type && e._mapArgs.push(t),
                        s.prefix = r,
                        s.name = t,
                        e._parseMap[n(r, t)] = s,
                        s.alias && (o.push(s.alias),
                        e._parseMap[n(r, s.alias)] = s)
                    })
                })
            }
            return t.prototype.parse = function(t) {
                var e, n = this, r = {}, a = 0;
                for (this._prefixes.forEach(function(t) {
                    return r[t] = {}
                }),
                t = t.map(function(t) {
                    return t.trim()
                }).filter(function(t) {
                    return "" !== t
                }),
                e = t.length; e > a; ) {
                    var s = t[a];
                    if ("-" !== s[0])
                        break;
                    s = s.slice(1);
                    var i;
                    if (i = this._parseMap[s])
                        switch (i.type) {
                        case 0:
                        case 2:
                            r[i.prefix][i.name] = !0;
                            break;
                        case 3:
                        case 1:
                            if (a++,
                            !(e > a))
                                throw new Error("-" + s + " requires an argument.");
                            r[i.prefix][i.name] = t[a];
                            break;
                        case 4:
                            break;
                        default:
                            throw new Error("INTERNAL ERROR: Invalid parse type for -" + s + ".")
                        }
                    else if (this._mapArgs.filter(function(t) {
                        return s.slice(0, t.length) === t ? (i = n._parseMap[t],
                        !0) : !1
                    }).length > 0) {
                        var l = s.slice(i.name.length)
                          , u = r[i.prefix][i.name];
                        u || (u = r[i.prefix][i.name] = {});
                        var c = l.indexOf("=");
                        -1 !== c ? u[l.slice(0, c)] = l.slice(c + 1) : u[l] = ""
                    } else {
                        if (-1 === s.indexOf(":") || !(i = this._parseMap[s.slice(0, s.indexOf(":"))]))
                            throw new Error("Unrecognized option: -" + s);
                        if (1 !== i.type && 2 !== i.type)
                            throw new Error("Unrecognized option: -" + s);
                        r[i.prefix][i.name] = s.slice(s.indexOf(":") + 1)
                    }
                    if (i.stopParsing) {
                        a++;
                        break
                    }
                    a++
                }
                var p = t.slice(a)
                  , h = {};
                return Object.keys(r).forEach(function(t) {
                    h[t] = new o(r[t],p)
                }),
                h
            }
            ,
            t.prototype.help = function(t) {
                return a(this._rawDesc[t], "default" === t ? "" : t)
            }
            ,
            t
        }();
        e.OptionParser = s
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            for (var n in t)
                e.hasOwnProperty(n) || (e[n] = t[n])
        }
        var a = n(23);
        e.ConstantPool = a;
        var o = n(12);
        e.Attributes = o,
        r(n(21)),
        r(n(11)),
        r(n(20)),
        r(n(26))
    }
    , function(t, e) {
        "use strict"
    }
    , function(t, e, n) {
        "use strict";
        var r = n(13);
        e.Assert = r;
        var a = n(17);
        e.Logging = a;
        var o = n(45);
        e.Difflib = o
    }
    ])
});
//# sourceMappingURL=doppio.js.map
