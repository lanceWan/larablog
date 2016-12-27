/* Elfsight (c) elfsight.com */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var Api = function () {
};
$.extend(Api, {});
Api.prototype = function () {
};
$.extend(Api.prototype, {});
module.exports = Api;
},{"./jquery":20}],2:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var AutoRotator = function (gallery) {
    var self = this;
    self.gallery = gallery;
    self.enabled = true;
    self.pause = false;
    self.duration = null;
    self.hoverPause = null;
    self.timer = null;
    self.initialize();
};
AutoRotator.prototype = function () {
};
$.extend(AutoRotator.prototype, {
    initialize: function () {
        var self = this;
        var auto = parseInt(self.gallery.options.auto, 10);
        if (auto > 0) {
            self.enabled = true;
            self.duration = parseInt(auto, 10);
            self.hoverPause = self.gallery.options.autoHoverPause;
            self.start();
            self.watch();
        }
    },
    start: function () {
        var self = this;
        if (!self.enabled) {
            return;
        }
        self.pause = false;
        self.rotate();
    },
    stop: function () {
        var self = this;
        if (!self.enabled) {
            return;
        }
        clearInterval(self.timer);
        self.pause = true;
    },
    rotate: function () {
        var self = this;
        self.timer = setTimeout(function () {
            if (!self.enabled || self.pause || !self.gallery.hasNextView()) {
                return;
            }
            self.gallery.moveToNextView().always(function () {
                self.rotate();
            });
        }, self.duration);
    },
    watch: function () {
        var self = this;
        self.gallery.$root.on('mouseenter.instaShow', function () {
            if (!self.hoverPause) {
                return;
            }
            self.stop();
        });
        self.gallery.$root.on('mouseleave.instaShow', function () {
            if (!self.hoverPause) {
                return;
            }
            self.start();
        });
    }
});
module.exports = AutoRotator;
},{"./jquery":20}],3:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), u = require('./u'), defaults = require('./defaults'), Instapi = require('./instapi'), Gallery = require('./gallery'), Popup = require('./popup'), views = require('./views'), Lang = require('./lang');
var Core = function ($element, options, id) {
    var self = this;
    self.$element = $element;
    self.$style = null;
    self.options = $.extend(true, {}, defaults, options);
    self.instapi = null;
    self.gallery = null;
    self.popup = null;
    self.lang = null;
    self.id = id;
    self.initialize();
};
$.extend(Core, {
    VERSION: '2.0.4 June',
    TPL_OPTIONS_ALIASES: {
        tplError: 'error',
        tplGalleryArrows: 'gallery.arrows',
        tplGalleryCounter: 'gallery.counter',
        tplGalleryCover: 'gallery.cover',
        tplGalleryInfo: 'gallery.info',
        tplGalleryLoader: 'gallery.loader',
        tplGalleryMedia: 'gallery.media',
        tplGalleryScroll: 'gallery.scroll',
        tplGalleryView: 'gallery.view',
        tplGalleryWrapper: 'gallery.wrapper',
        tplPopupMedia: 'popup.media',
        tplPopupRoot: 'popup.root',
        tplPopupTwilight: 'popup.twilight',
        tplStyle: 'style'
    }
});
Core.prototype = function () {
};
$.extend(Core.prototype, {
    initialize: function () {
        var self = this;
        self.instapi = new Instapi(self, self.options, self.id);
        var source;
        if (self.instapi.isSandbox()) {
            source = ['@self'];
        } else {
            source = u.unifyMultipleOption(self.options.source);
        }
        if (!source || !source.length) {
            self.showError('Please set option "source". See details in docs.');
            return;
        }
        var filter = {
                only: self.options.filterOnly ? u.unifyMultipleOption(self.options.filterOnly) : null,
                except: self.options.filterExcept ? u.unifyMultipleOption(self.options.filterExcept) : null
            };
        self.mediaFetcher = self.instapi.createMediaFetcher(source, filter, self.options.filter);
        if (!self.mediaFetcher) {
            self.showError('Option "source" is invalid. See details in docs.');
            return;
        }
        self.gallery = new Gallery(self);
        self.popup = new Popup(self);
        self.lang = new Lang(self, self.options.lang);
        self.$style = $(views.style($.extend({}, self.options, { id: self.id })));
        self.$style.insertBefore(self.$element);
        if (Handlebars && Handlebars.compile) {
            $.each(Core.TPL_OPTIONS_ALIASES, function (optName, tplName) {
                var tplId = self.options[optName];
                if (!tplId) {
                    return;
                }
                var rawTpl = $('[data-is-tpl="' + tplId + '"]').html();
                if (!rawTpl) {
                    return;
                }
                u.setProperty(views, tplName, Handlebars.compile(rawTpl));
            });
        }
    },
    showError: function (message) {
        var self = this;
        if (!self.options.debug) {
            $('#instaShowGallery_' + self.id).css('display', 'none');
        }
        var $message = $(views.error({ message: message }));
        if (self.gallery) {
            self.gallery.puzzle();
            $message.appendTo(self.gallery.$root);
        } else {
            $message.insertBefore(self.$element);
        }
    }
});
module.exports = Core;
},{"./defaults":4,"./gallery":6,"./instapi":8,"./jquery":20,"./lang":21,"./popup":24,"./u":27,"./views":28}],4:[function(require,module,exports){
"use strict";
module.exports = {
    api: null,
    clientId: null,
    accessToken: null,
    debug: false,
    source: null,
    filterOnly: null,
    filterExcept: null,
    filter: null,
    limit: 0,
    width: 'auto',
    height: 'auto',
    columns: 4,
    rows: 2,
    gutter: 0,
    responsive: null,
    loop: true,
    arrowsControl: true,
    scrollControl: false,
    dragControl: true,
    direction: 'horizontal',
    freeMode: false,
    scrollbar: true,
    effect: 'slide',
    speed: 600,
    easing: 'ease',
    auto: 0,
    autoHoverPause: true,
    popupSpeed: 400,
    popupEasing: 'ease',
    lang: 'en',
    cacheMediaTime: 0,
    mode: 'popup',
    info: 'likesCounter commentsCounter description',
    popupInfo: 'username instagramLink likesCounter commentsCounter location passedTime description comments',
    popupDeepLinking: false,
    popupHrImages: false,
    colorGalleryBg: 'rgba(0, 0, 0, 0)',
    colorGalleryCounters: 'rgb(255, 255, 255)',
    colorGalleryDescription: 'rgb(255, 255, 255)',
    colorGalleryOverlay: 'rgba(33, 150, 243, 0.9)',
    colorGalleryArrows: 'rgb(0, 142, 255)',
    colorGalleryArrowsHover: 'rgb(37, 181, 255)',
    colorGalleryArrowsBg: 'rgba(255, 255, 255, 0.9)',
    colorGalleryArrowsBgHover: 'rgb(255, 255, 255)',
    colorGalleryScrollbar: 'rgba(255, 255, 255, 0.5)',
    colorGalleryScrollbarSlider: 'rgb(68, 68, 68)',
    colorPopupOverlay: 'rgba(43, 43, 43, 0.9)',
    colorPopupBg: 'rgb(255, 255, 255)',
    colorPopupUsername: 'rgb(0, 142, 255)',
    colorPopupUsernameHover: 'rgb(37, 181, 255)',
    colorPopupInstagramLink: 'rgb(0, 142, 255)',
    colorPopupInstagramLinkHover: 'rgb(37, 181, 255)',
    colorPopupCounters: 'rgb(0, 0, 0)',
    colorPopupPassedTime: 'rgb(152, 152, 152)',
    colorPopupAnchor: 'rgb(0, 142, 255)',
    colorPopupAnchorHover: 'rgb(37, 181, 255)',
    colorPopupText: 'rgb(0, 0, 0)',
    colorPopupControls: 'rgb(103, 103, 103)',
    colorPopupControlsHover: 'rgb(255, 255, 255)',
    colorPopupMobileControls: 'rgb(103, 103, 103)',
    colorPopupMobileControlsBg: 'rgba(255, 255, 255, .8)',
    tplError: null,
    tplGalleryArrows: null,
    tplGalleryCounter: null,
    tplGalleryCover: null,
    tplGalleryInfo: null,
    tplGalleryLoader: null,
    tplGalleryMedia: null,
    tplGalleryScroll: null,
    tplGalleryView: null,
    tplGalleryWrapper: null,
    tplPopupMedia: null,
    tplPopupRoot: null,
    tplPopupTwilight: null,
    tplStyle: null
};
},{}],5:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), Instashow = require('./instashow'), Core = require('./core'), Api = require('./api'), defaults = require('./defaults');
var id = 0;
var initialize = function (element, options) {
    var core = new Core($(element), options, ++id);
    $.data(element, 'instaShow', new Api(core));
};
$.fn.instaShow = function (options) {
    this.each(function (i, element) {
        var instance = $.data(element, 'instaShow');
        if (!instance) {
            $.data(element, 'instaShow', initialize(element, options));
        }
    });
    return this;
};
$.instaShow = function (context) {
    $('[data-is]', context).each(function (i, item) {
        var $item = $(item);
        var options = {};
        $.each(defaults, function (name) {
            var attrName = 'data-is-' + name.replace(/([A-Z])/g, function (l) {
                    return '-' + l.toLowerCase();
                });
            var val = $item.attr(attrName);
            if ($.type(val) !== 'undefined' && val !== '') {
                if (val === 'true') {
                    val = true;
                } else if (val === 'false') {
                    val = false;
                }
                options[name] = val;
            }
        });
        $item.instaShow($.extend(false, {}, defaults, options));
    });
};
$(function () {
    var readyFunc = window['onInstaShowReady'];
    if (readyFunc && $.type(readyFunc) === 'function') {
        readyFunc();
    }
    $(window).trigger('instaShowReady');
    $.instaShow(window.document.body);
});
},{"./api":1,"./core":3,"./defaults":4,"./instashow":19,"./jquery":20}],6:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), u = require('./u'), views = require('./views'), Grid = require('./grid'), translations = require('./translations'), moveControl = require('./move-control'), Scrollbar = require('./scrollbar'), Loader = require('./loader'), AutoRotator = require('./auto-rotator');
var $w = $(window);
var Gallery = function (core) {
    var self = this;
    self.core = core;
    self.options = core.options;
    self.translations = translations;
    self.mediaList = [];
    self.classes = {};
    self.storage = {};
    self.infoTypes = null;
    self.grid = null;
    self.scrollbar = null;
    self.loader = null;
    self.autoRotator = null;
    self.breakpoints = [];
    self.prevBreakpoint = null;
    self.defaultBreakpoing = null;
    self.currentBreakpoint = null;
    self.limit = null;
    self.$mediaList = $();
    self.$viewsList = $();
    self.$root = core.$element;
    self.$wrapper = null;
    self.$container = null;
    self.busy = false;
    self.drag = false;
    self.activeViewId = -1;
    self.translationPrevProgress = 0;
    self.progress = 0;
    self.isTranslating = false;
    self.viewsCastled = false;
    self.initialize();
};
Gallery.prototype = function () {
};
$.extend(Gallery, {
    INFO_TYPES: [
        'description',
        'commentsCounter',
        'likesCounter'
    ]
});
$.extend(Gallery.prototype, {
    constructor: Gallery,
    initialize: function () {
        var self = this;
        self.limit = Math.abs(parseInt(self.options.limit, 10));
        self.$wrapper = $(views.gallery.wrapper());
        self.$container = self.$wrapper.children().first();
        self.$root.append(self.$wrapper);
        self.defaultBreakpoing = {
            columns: self.options.columns,
            rows: self.options.rows,
            gutter: self.options.gutter
        };
        if (self.options.responsive) {
            if ($.type(self.options.responsive) === 'string') {
                self.options.responsive = JSON.parse(decodeURIComponent(self.options.responsive));
            }
            if ($.isPlainObject(self.options.responsive)) {
                $.each(self.options.responsive, function (minWidth, grid) {
                    minWidth = parseInt(minWidth, 10);
                    self.breakpoints.push($.extend(false, {}, grid, { minWidth: minWidth }));
                });
                self.breakpoints = self.breakpoints.sort(function (a, b) {
                    if (a.minWidth < b.minWidth) {
                        return -1;
                    } else if (a.minWidth > b.minWidth) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
        self.grid = new Grid(self.$root, {
            width: self.options.width,
            height: self.options.height,
            columns: self.options.columns,
            rows: self.options.rows,
            gutter: self.options.gutter
        });
        self.updateBreakpoint();
        self.$root.width(self.options.width).height(self.options.height);
        self.scrollbar = new Scrollbar(self);
        if (self.options.arrowsControl) {
            self.$root.append(views.gallery.arrows());
            self.$arrowPrevious = self.$root.find('.instashow-gallery-control-arrow-previous');
            self.$arrowNext = self.$root.find('.instashow-gallery-control-arrow-next');
        }
        self.$root.attr('id', 'instaShowGallery_' + self.core.id);
        self.loader = new Loader(self.$root, $(views.gallery.loader()));
        self.defineClasses();
        self.watch();
        self.fit();
        self.addView().done(function (id) {
            self.setActiveView(id);
            self.$root.trigger('initialized.instaShow', [self.$root]);
        });
        self.autoRotator = new AutoRotator(self);
    },
    getMediaIdByNativeId: function (nativeId) {
        var self = this;
        var mediaId = -1;
        $.each(self.mediaList, function (i, media) {
            if (mediaId !== -1) {
                return;
            }
            if (media.id === nativeId) {
                mediaId = i;
            }
        });
        return mediaId;
    },
    setProgress: function (progress) {
        var self = this;
        self.progress = progress;
        self.$root.trigger('progressChanged.instaShow', [progress]);
    },
    getProgressByOffset: function (offset) {
        var self = this;
        return offset / self.getGlobalThreshold();
    },
    puzzle: function () {
        var self = this;
        self.busy = true;
    },
    free: function () {
        var self = this;
        self.busy = false;
    },
    isBusy: function () {
        var self = this;
        return self.busy;
    },
    isHorizontal: function () {
        var self = this;
        return self.options.direction && self.options.direction.toLowerCase() === 'horizontal';
    },
    isFreeMode: function () {
        var self = this;
        return !!self.options.freeMode && self.options.effect === 'slide';
    },
    hasView: function (id) {
        var self = this;
        return id >= 0 && id <= self.$viewsList.length - 1;
    },
    hasNextView: function () {
        var self = this;
        return self.hasView(self.activeViewId + 1) || (!self.limit || self.mediaList.length < self.limit) && self.core.mediaFetcher.hasNext();
    },
    hasPreviousView: function () {
        var self = this;
        return self.hasView(self.activeViewId - 1);
    },
    setActiveView: function (id, force) {
        var self = this;
        if (!self.hasView(id) || !force && id === self.activeViewId) {
            return;
        }
        var $current = self.$viewsList.eq(id);
        self.$viewsList.removeClass('instashow-gallery-view-active instashow-gallery-view-active-prev instashow-gallery-view-active-next');
        $current.addClass('instashow-gallery-view-active');
        $current.prev().addClass('instashow-gallery-view-active-prev');
        $current.next().addClass('instashow-gallery-view-active-next');
        self.activeViewId = id;
        self.$root.trigger('activeViewChanged.instaShow', [
            id,
            $current
        ]);
        return true;
    },
    defineClasses: function () {
        var self = this;
        var defaultClasses = self.$root.attr('class');
        if (defaultClasses) {
            defaultClasses = defaultClasses.split(' ');
            $.each(defaultClasses, function (i, cl) {
                self.classes[cl] = true;
            });
        }
        self.classes['instashow'] = true;
        self.classes['instashow-gallery'] = true;
        self.classes['instashow-gallery-horizontal'] = self.isHorizontal();
        self.classes['instashow-gallery-vertical'] = !self.classes['instashow-gallery-horizontal'];
        self.classes['instashow-gallery-' + self.options.effect] = true;
        self.updateClasses();
    },
    updateClasses: function () {
        var self = this;
        var classes = [];
        $.each(self.classes, function (cl, enabled) {
            if (enabled) {
                classes.push(cl);
            }
        });
        self.$root.attr('class', classes.join(' '));
    },
    getInfoTypes: function () {
        var self = this;
        var types;
        if (!self.infoTypes) {
            types = u.unifyMultipleOption(self.options.info);
            if (types) {
                self.infoTypes = types.filter(function (t) {
                    return !!~self.constructor.INFO_TYPES.indexOf(t);
                });
            }
        }
        return self.infoTypes;
    },
    updateBreakpoint: function (rebuild) {
        var self = this;
        var newBreakpoint;
        var windowWidth = $w.innerWidth();
        $.each(self.breakpoints, function (i, breakpoint) {
            if (newBreakpoint) {
                return;
            }
            if (windowWidth <= breakpoint.minWidth) {
                newBreakpoint = breakpoint;
            }
        });
        if (!newBreakpoint) {
            newBreakpoint = self.defaultBreakpoing;
        }
        if (newBreakpoint !== self.currentBreakpoint) {
            self.prevBreakpoint = self.currentBreakpoint;
            self.currentBreakpoint = newBreakpoint;
            self.grid.columns = parseInt(self.currentBreakpoint.columns || self.defaultBreakpoing.columns, 10);
            self.grid.rows = parseInt(self.currentBreakpoint.rows || self.defaultBreakpoing.rows, 10);
            self.grid.gutter = parseInt(self.currentBreakpoint.gutter || self.defaultBreakpoing.gutter, 10);
            if (rebuild) {
                self.grid.calculate();
                self.rebuildViews(true);
            }
        }
    },
    fit: function () {
        var self = this;
        self.updateBreakpoint(true);
        self.grid.calculate();
        var freeOffset;
        if (self.grid.autoHeight) {
            self.$root.height(self.grid.height);
        }
        var fontSize = self.grid.cellSize / 100 * 7;
        if (fontSize > 14) {
            fontSize = 14;
        }
        self.$wrapper.width(self.grid.width).height(self.grid.height);
        self.$viewsList.css({
            width: self.grid.viewWidth,
            height: self.grid.viewHeight,
            margin: self.grid.viewMoatVertical + 'px ' + self.grid.viewMoatHorizontal + 'px',
            padding: self.grid.gutter / 2
        });
        self.$mediaList.css({
            width: self.grid.cellSize,
            height: self.grid.cellSize,
            padding: self.grid.gutter / 2,
            fontSize: fontSize
        });
        if (self.options.effect === 'slide') {
            if (self.isHorizontal()) {
                self.$container.width(self.$viewsList.length * self.grid.width);
            } else {
                self.$container.height(self.$viewsList.length * self.grid.height);
            }
        }
        self.fitDescription(self.activeViewId);
        self.updateClasses();
    },
    rebuildViews: function (reset) {
        var self = this;
        self.$container.empty();
        self.$viewsList = $();
        var cellsCount = self.grid.countCells();
        var viewsCount = Math.ceil(self.$mediaList.length / cellsCount);
        for (var i = 0; i < viewsCount; ++i)
            (function ($viewMediaList) {
                var $view = $(views.gallery.view());
                $viewMediaList.removeClass('instashow-gallery-media-loaded');
                $viewMediaList.appendTo($view);
                $viewMediaList.filter(function (item) {
                    return !!$('img[src!=""]', this).length;
                }).addClass('instashow-gallery-media-loaded');
                self.$viewsList = self.$viewsList.add($view.appendTo(self.$container));
            }(self.$mediaList.slice(i * cellsCount, (i + 1) * cellsCount)));
        self.fitImages();
        if (reset) {
            self.viewsRebuilded = true;
            self.setProgress(0);
            self.setActiveView(0, true);
            self.translate(0);
        } else {
            self.viewsRebuilded = false;
        }
    },
    fitDescription: function (id) {
        var self = this;
        if (!self.hasView(id)) {
            return;
        }
        var $view = self.$viewsList.eq(id);
        var $info = $view.find('.instashow-gallery-media-info');
        var $description = $view.find('.instashow-gallery-media-info-description');
        var lh = parseInt($description.css('line-height'));
        if (!$description.length) {
            return;
        }
        $description.css('max-height', '');
        $info.height($info.css('max-height'));
        var descriptionHeight = $info.height() - $description.position().top - parseFloat($description.css('margin-top'));
        var lines = Math.floor(descriptionHeight / lh);
        var maxHeight = (lines - 1) * lh;
        $info.height('');
        $description.each(function (i, item) {
            var $item = $(item);
            if ($item.height() > maxHeight) {
                $item.css({ maxHeight: maxHeight });
                $item.parent().addClass('instashow-gallery-media-info-cropped');
            }
        });
    },
    fitImages: function ($view) {
        var self = this;
        $view = $view || self.$viewsList;
        var $images = $view.find('img');
        $images.each(function (i, item) {
            var $item = $(item);
            var $media = $item.closest('.instashow-gallery-media');
            var id = $media.attr('data-is-media-id');
            var media = self.storage['instaShow#' + self.core.id + '_media#' + id];
            $item.attr('src', self.grid.cellSize > 210 ? media.images.standard_resolution.url : media.images.low_resolution.url);
            $item.one('load', function () {
                $media.addClass('instashow-gallery-media-loaded');
            });
        });
    },
    addView: function (q) {
        var self = this;
        q = q || $.Deferred();
        if (!self.core.mediaFetcher.hasNext()) {
            q.reject();
        } else {
            self.puzzle();
            self.loader.show(400);
            self.core.mediaFetcher.fetch(self.grid.countCells()).done(function (list) {
                self.free();
                self.loader.hide();
                if (!list || !list.length) {
                    q.reject();
                    return;
                }
                var $view = $(views.gallery.view());
                $.each(list, function (i, media) {
                    if (self.limit && self.mediaList.length === self.limit) {
                        return;
                    }
                    var $media = $(views.gallery.media(media));
                    var $mediaInner = $media.children().first();
                    if (self.setMediaInfo($mediaInner, media)) {
                        self.setMediaCover($mediaInner);
                    }
                    $media.attr('data-is-media-id', media.id);
                    self.storage['instaShow#' + self.core.id + '_media#' + media.id] = media;
                    $media.addClass('instashow-gallery-media-' + media.getImageOrientation());
                    if (media.type === 'video') {
                        $media.addClass('instashow-gallery-media-video');
                    }
                    self.mediaList.push(media);
                    self.$mediaList = self.$mediaList.add($media.appendTo($view));
                });
                self.$viewsList = self.$viewsList.add($view.appendTo(self.$container));
                var id = self.$viewsList.length - 1;
                self.$root.trigger('viewAdded.instaShow', [
                    id,
                    $view
                ]);
                setTimeout(function () {
                    q.resolve(id, $view);
                });
            });
        }
        return q.promise();
    },
    setMediaCover: function ($mediaInner) {
        var self = this;
        var $cover = $(views.gallery.cover({ type: 'plain' }));
        $cover.prependTo($mediaInner);
    },
    setMediaInfo: function ($mediaInner, media) {
        var self = this;
        var infoTypes = self.getInfoTypes();
        if (!infoTypes || !infoTypes.length) {
            return false;
        }
        var $info;
        var tplData = {
                options: {},
                info: {
                    likesCount: media.getLikesCount(),
                    commentsCount: media.getCommentsCount(),
                    description: media.caption ? media.caption.text : null
                }
            };
        $.each(infoTypes, function (i, item) {
            tplData.options[item] = true;
        });
        tplData.options.hasDescription = tplData.options.description && media.caption;
        if (infoTypes.length > 1 || tplData.options.description) {
            if (infoTypes.length === 1 && !tplData.options.hasDescription) {
                return false;
            }
            $info = $('<div></div>');
            $info.html(views.gallery.info(tplData));
            $info = $info.unwrap();
        } else {
            switch (infoTypes[0]) {
            case 'likesCounter':
                tplData.icon = 'like';
                tplData.value = tplData.info.likesCount;
                break;
            case 'commentsCounter':
                tplData.icon = 'comment';
                tplData.value = tplData.info.commentsCount;
                break;
            }
            $info = $(views.gallery.counter(tplData));
        }
        $info.prependTo($mediaInner);
        return true;
    },
    getViewStartProgress: function ($view) {
        var self = this;
        var id = self.$viewsList.index($view);
        if (!~id) {
            return -1;
        }
        return id === 0 ? 0 : 1 / (self.$viewsList.length - 1) * id;
    },
    getViewIdByProgress: function (progress) {
        var self = this;
        var lastViewId = self.$viewsList.length - 1;
        if (progress <= 0) {
            return 0;
        } else if (progress >= 1) {
            return lastViewId;
        }
        return Math.round(lastViewId * progress);
    },
    getActiveView: function () {
        var self = this;
        return self.$viewsList.eq(self.activeViewId);
    },
    getGlobalThreshold: function () {
        var self = this;
        return (self.$viewsList.length - 1) * self.getThreshold();
    },
    getThreshold: function () {
        var self = this;
        return self.isHorizontal() ? self.grid.width : self.grid.height;
    },
    translate: function (progress, smoothly, movement, q) {
        var self = this;
        smoothly = !!smoothly;
        movement = movement || 1;
        q = q || $.Deferred();
        var effect = self.options.effect ? self.options.effect.toLowerCase() : 'sharp';
        var func = self.translations[effect] || self.translations['sharp'];
        if (!func) {
            self.core.showError('Translating effect "' + effect + '" is undefined.');
            return;
        }
        self.isTranslating = true;
        func.call(self, progress, smoothly, movement, q);
        q.done(function () {
            self.isTranslating = false;
            self.$root.trigger('translationEnded.instaShow');
        });
        return q.promise();
    },
    getAdjustedProgress: function (prevViewsCount, oldProgress) {
        var self = this;
        if (oldProgress === 0) {
            return 0;
        }
        var offset, progress;
        if (self.options.effect === 'slide') {
            offset = oldProgress * prevViewsCount * self.getThreshold();
            progress = offset / self.getGlobalThreshold();
        } else {
            progress = oldProgress * prevViewsCount / (self.$viewsList.length - 1);
        }
        return progress;
    },
    moveToNextView: function () {
        var self = this;
        var q = $.Deferred();
        var nextId = self.activeViewId + 1;
        if (self.isBusy()) {
            q.reject();
        } else {
            if (!self.hasView(nextId) && self.hasNextView(nextId)) {
                self.addView().done(function () {
                    self.moveToView(nextId, q);
                }).fail(function () {
                    q.reject();
                });
            } else {
                self.moveToView(nextId, q);
            }
        }
        return q.promise();
    },
    moveToPreviousView: function () {
        var self = this;
        return self.moveToView(self.activeViewId - 1);
    },
    moveToView: function (id, q) {
        var self = this;
        var progress;
        var q = q || $.Deferred();
        if (self.isBusy() || !self.hasView(id)) {
            q.reject();
        } else {
            progress = self.getViewStartProgress(self.$viewsList.eq(id));
            self.puzzle();
            self.translate(progress, true).done(function () {
                self.free();
                q.resolve();
            });
            self.setProgress(progress);
            self.setActiveView(id);
        }
        return q.promise();
    },
    watchScroll: function () {
        var self = this;
        var scrolling;
        self.$root.on('wheel', function (e) {
            e = e.originalEvent || e;
            e.preventDefault();
            e.stopPropagation();
            if (scrolling || self.isBusy()) {
                return;
            }
            var scrollDistance, progress, targetViewId;
            var delta = e.wheelDelta / 40 || -(Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY);
            var dir = delta > 0 ? -1 : 1;
            if (dir === 1 && !self.hasView(self.activeViewId + 1) && self.hasNextView()) {
                self.addView().done(function () {
                    if (!self.isFreeMode()) {
                        self.moveToNextView();
                    }
                });
                return;
            }
            if (self.isFreeMode()) {
                scrollDistance = -delta * self.getThreshold() * 0.02;
                progress = self.progress + scrollDistance / self.getGlobalThreshold();
                self.setActiveView(self.getViewIdByProgress(progress));
                progress = self.progress + scrollDistance / self.getGlobalThreshold();
                if (progress > 1) {
                    progress = 1;
                } else if (progress < 0) {
                    progress = 0;
                }
                self.translate(progress);
                self.setProgress(progress);
            } else {
                if (Math.abs(delta) < 0.75) {
                    return;
                }
                scrolling = true;
                if (dir === 1) {
                    targetViewId = self.activeViewId + 1;
                } else {
                    targetViewId = self.activeViewId - 1;
                }
                if (!self.hasView(targetViewId)) {
                    scrolling = false;
                    return;
                }
                self.moveToView(targetViewId).done(function () {
                    scrolling = false;
                });
            }
        });
    },
    castleViews: function () {
        var self = this;
        if (self.viewsCastled) {
            return;
        }
        self.viewsCastled = true;
        self.$root.on('translationEnded.instaShow.castleViews', function () {
            if (self.progress !== 1) {
                return;
            }
            self.$root.off('translationEnded.instaShow.castleViews');
            var $lastClone = self.$viewsList.last().clone();
            var $firstClone = self.$viewsList.first().clone();
            $().add($lastClone).add($firstClone).addClass('instashow-gallery-view-diplicate');
            self.$viewsList = $().add($lastClone.prependTo(self.$container)).add(self.$viewsList).add($firstClone.appendTo(self.$container));
            var viewStartProgress = self.getViewStartProgress(self.$viewsList.eq(self.activeViewId + 1));
            self.setActiveView(self.activeViewId + 1);
            self.setProgress(viewStartProgress);
            self.translate(viewStartProgress, false);
            self.fitImages($lastClone);
            self.fitImages($firstClone);
            self.fit();
            self.$root.on('translationEnded.instaShow.castleViews', function () {
                var targetViewId, viewStartProgress;
                if (self.progress === 0) {
                    targetViewId = self.$viewsList.length - 2;
                } else if (self.progress === 1) {
                    targetViewId = 1;
                } else {
                    return;
                }
                viewStartProgress = self.getViewStartProgress(self.$viewsList.eq(targetViewId));
                self.setActiveView(targetViewId);
                self.setProgress(viewStartProgress);
                if (self.core.options.effect === 'fade') {
                    self.$viewsList.css('opacity', 0);
                }
                self.translate(viewStartProgress, false);
            });
        });
    },
    watch: function () {
        var self = this;
        self.$root.on('initialized.instaShow', function () {
            self.fit();
        }).on('activeViewChanged.instaShow', function (e, id) {
            if (self.core.options.loop && !self.isFreeMode() && !self.viewsCastled && (self.limit && self.mediaList.length >= self.limit || !self.core.mediaFetcher.hasNext())) {
                self.castleViews();
            }
            if (self.options.arrowsControl) {
                self.$arrowNext.toggleClass('instashow-gallery-control-arrow-disabled', !self.viewsCastled && !self.hasNextView());
                self.$arrowPrevious.toggleClass('instashow-gallery-control-arrow-disabled', !self.viewsCastled && !self.hasPreviousView());
            }
        }).on('viewAdded.instaShow', function (e, id, $view) {
            if (self.$viewsList.length !== 1 && self.$viewsList.length - 1 === id) {
                self.$viewsList.eq(id).addClass('instashow-gallery-view-active-next');
            }
            if (self.viewsRebuilded) {
                self.rebuildViews();
            }
            self.translationPrevProgress = self.getAdjustedProgress(id - 1, self.translationPrevProgress);
            var progress = self.getAdjustedProgress(id - 1, self.progress);
            if (self.options.effect === 'slide' || id == 0) {
                self.translate(progress, false);
            }
            self.setProgress(progress);
            self.fit();
            self.fitImages($view);
            self.fitDescription(id);
        });
        $w.resize(function () {
            self.fit();
            self.fitImages();
            self.translate(self.progress, false);
        });
        if (self.options.scrollControl) {
            self.watchScroll();
        }
        moveControl(self).watch();
        if (self.options.arrowsControl) {
            self.$arrowPrevious.on('click touchend', function () {
                if (self.drag) {
                    return;
                }
                self.moveToPreviousView();
            });
            self.$arrowNext.on('click touchend', function () {
                if (self.drag) {
                    return;
                }
                self.moveToNextView();
            });
        }
        if (self.options.mode === 'popup') {
            self.$root.on('click', '.instashow-gallery-media', function (e) {
                if (self.drag) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                var id = $(this).attr('data-is-media-id');
                var media = self.storage['instaShow#' + self.core.id + '_media#' + id];
                self.core.popup.open(media);
            });
        }
    }
});
module.exports = Gallery;
},{"./auto-rotator":2,"./grid":7,"./jquery":20,"./loader":22,"./move-control":23,"./scrollbar":25,"./translations":26,"./u":27,"./views":28}],7:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var Grid = function ($element, options) {
    var self = this;
    self.$element = $element;
    self.options = options;
    self.width = null;
    self.height = null;
    self.columns = Math.floor(self.options.columns) || 0;
    self.rows = Math.floor(self.options.rows) || 0;
    self.gutter = Math.floor(self.options.gutter) || 0;
    self.ratio = null;
    self.viewWidth = null;
    self.viewRatio = null;
    self.cellSize = null;
    self.viewMoatHorizontal = null;
    self.viewMoatVertical = null;
    self.initialize();
};
Grid.prototype = function () {
};
$.extend(Grid.prototype, {
    initialize: function () {
        var self = this;
        self.autoHeight = !self.options.height || self.options.height === 'auto';
    },
    calculate: function () {
        var self = this;
        self.width = self.$element.width();
        self.viewRatio = self.columns / self.rows;
        if (self.autoHeight) {
            self.height = self.width / self.viewRatio;
            self.ratio = self.viewRatio;
        } else {
            self.height = self.$element.height();
            self.ratio = self.width / self.height;
        }
        if (self.ratio > 1) {
            if (self.viewRatio <= 1 || self.viewRatio < self.ratio) {
                self.viewHeight = self.height;
                self.viewWidth = Math.floor(self.viewHeight * self.viewRatio);
            } else {
                self.viewWidth = self.width;
                self.viewHeight = Math.floor(self.viewWidth / self.viewRatio);
            }
        } else {
            if (self.viewRatio >= 1 || self.viewRatio > self.ratio) {
                self.viewWidth = self.width;
                self.viewHeight = Math.floor(self.viewWidth / self.viewRatio);
            } else {
                self.viewHeight = self.height;
                self.viewWidth = Math.floor(self.viewHeight * self.viewRatio);
            }
        }
        if (self.autoHeight) {
            self.cellSize = (self.viewWidth - self.gutter) / self.columns;
            self.height = self.viewHeight = self.cellSize * self.rows + self.gutter;
            self.viewWidth = self.cellSize * self.columns + self.gutter;
        } else {
            if (self.viewRatio > 1) {
                self.cellSize = (self.viewHeight - self.gutter) / self.rows;
            } else {
                self.cellSize = (self.viewWidth - self.gutter) / self.columns;
            }
            self.viewWidth = self.cellSize * self.columns + self.gutter;
            self.viewHeight = self.cellSize * self.rows + self.gutter;
        }
        self.viewMoatHorizontal = (self.width - self.viewWidth) / 2;
        self.viewMoatVertical = (self.height - self.viewHeight) / 2;
    },
    countCells: function () {
        var self = this;
        return self.columns * self.rows;
    }
});
module.exports = Grid;
},{"./jquery":20}],8:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), Client = require('./instapi/client'), CacheProvider = require('./instapi/cache-provider'), UserMediaFetcher = require('./instapi/user-media-fetcher'), TagMediaFetcher = require('./instapi/tag-media-fetcher'), ComplexMediaFetcher = require('./instapi/complex-media-fetcher'), SpecificMediaFetcher = require('./instapi/specific-media-fetcher');
var Instapi = function (core, options, id) {
    var self = this;
    self.core = core;
    self.options = options;
    self.id = id;
    self.client = null;
    self.cacheProvider = null;
    self.initialize();
};
$.extend(Instapi, {
    SOURCE_DETERMINANTS: [
        {
            type: 'user',
            regex: /^@([^$]+)$/,
            index: 1
        },
        {
            type: 'tag',
            regex: /^#([^$]+)$/,
            index: 1
        },
        {
            type: 'specific_media_id',
            regex: /^\$(\d+_\d+)$/,
            index: 1
        },
        {
            type: 'specific_media_shortcode',
            regex: /^\$([^$]+)$/i,
            index: 1
        },
        {
            type: 'user',
            regex: /^https?\:\/\/(www\.)?instagram.com\/([^\/]+)\/?(\?[^\$]+)?$/,
            index: 2
        },
        {
            type: 'tag',
            regex: /^https?\:\/\/(www\.)?instagram.com\/explore\/tags\/([^\/]+)\/?(\?[^\$]+)?$/,
            index: 2
        },
        {
            type: 'specific_media_shortcode',
            regex: /^https?\:\/\/(www\.)?instagram.com\/p\/([^\/]+)\/?(\?[^\$]+)?$/,
            index: 2
        }
    ],
    createScheme: function (list) {
        var scheme = [];
        if ($.type(list) !== 'array' || !list.length) {
            return scheme;
        }
        $.each(list, function (i, item) {
            if ($.type(item) !== 'string') {
                return;
            }
            var type, name;
            $.each(Instapi.SOURCE_DETERMINANTS, function (d, determinant) {
                if (type) {
                    return;
                }
                var matches = item.match(determinant.regex);
                if (matches && matches[determinant.index]) {
                    type = determinant.type;
                    name = matches[determinant.index];
                }
            });
            if (!type) {
                return;
            }
            if (type !== 'specific_media_shortcode') {
                name = name.toLowerCase();
            }
            scheme.push({
                type: type,
                name: name
            });
        });
        return scheme;
    },
    parseAnchors: function (str) {
        str = str.replace(/(https?\:\/\/[^$\s]+)/g, function (url) {
            return '<a href="' + url + '" target="_blank" rel="nofollow">' + url + '</a>';
        });
        str = str.replace(/(@|#)([^\s#@]+)/g, function (str, type, name) {
            var uri = '';
            switch (type) {
            case '@':
                uri = 'https://instagram.com/' + name + '/';
                break;
            case '#':
                uri = 'https://instagram.com/explore/tags/' + name + '/';
                break;
            default:
                return str;
            }
            return '<a href="' + uri + '" target="_blank" rel="nofollow">' + str + '</a>';
        });
        return str;
    }
});
Instapi.prototype = function () {
};
$.extend(Instapi.prototype, {
    initialize: function () {
        var self = this;
        self.cacheProvider = new CacheProvider(self.id);
        self.client = new Client(self, self.options, self.cacheProvider);
    },
    isSandbox: function () {
        var self = this;
        return !self.client.isAlternativeApi() && self.options.accessToken && !self.options.source;
    },
    createMediaFetcher: function (source, filter, postFilter) {
        var self = this;
        if ($.type(source) !== 'array' || !source.length) {
            return;
        }
        if ($.type(postFilter) === 'string' && $.type(window[postFilter]) === 'function') {
            postFilter = window[postFilter];
        }
        var sourceScheme = Instapi.createScheme(source);
        if (!sourceScheme || !sourceScheme.length) {
            return;
        }
        var filtersScheme = [];
        if (filter && $.isPlainObject(filter)) {
            $.each(filter, function (type, values) {
                if (!values || !values.length) {
                    return;
                }
                var scheme = Instapi.createScheme(values);
                $.each(scheme, function (i, item) {
                    item.logic = type;
                });
                Array.prototype.push.apply(filtersScheme, scheme);
            });
        }
        var mediaFetcher;
        var fetchers = [];
        $.each(sourceScheme, function (i, origin) {
            var fetcher;
            switch (origin.type) {
            default:
                break;
            case 'tag':
                fetcher = new TagMediaFetcher(self.client, origin.name, filtersScheme, postFilter);
                break;
            case 'user':
                fetcher = new UserMediaFetcher(self.client, origin.name, filtersScheme, postFilter);
                break;
            case 'specific_media_id':
            case 'specific_media_shortcode':
                fetcher = new SpecificMediaFetcher(self.client, origin.type, origin.name, filtersScheme, postFilter);
                break;
            }
            fetchers.push(fetcher);
        });
        if (fetchers.length > 1) {
            return new ComplexMediaFetcher(fetchers);
        } else {
            return fetchers[0];
        }
    }
});
module.exports = Instapi;
},{"./instapi/cache-provider":9,"./instapi/client":10,"./instapi/complex-media-fetcher":11,"./instapi/specific-media-fetcher":15,"./instapi/tag-media-fetcher":16,"./instapi/user-media-fetcher":17,"./jquery":20}],9:[function(require,module,exports){
"use strict";
var $ = require('../jquery');
var CacheProvider = function (id) {
    var self = this;
    self.id = id;
    self.enabled = !!window.localStorage;
};
CacheProvider.prototype = function () {
};
$.extend(CacheProvider.prototype, {
    set: function (key, expired, value) {
        var self = this;
        if (!self.enabled) {
            return false;
        }
        try {
            localStorage.setItem(key, JSON.stringify({
                cacheTime: expired,
                expired: Date.now() / 1000 + expired,
                value: value
            }));
            return true;
        } catch (e) {
            localStorage.clear();
            return false;
        }
    },
    get: function (key, cacheTime) {
        var self = this;
        if (!self.enabled) {
            return false;
        }
        var data = localStorage.getItem(key);
        data = data ? JSON.parse(data) : null;
        if (data && cacheTime === data.cacheTime && data.expired > Date.now() / 1000) {
            return data.value;
        }
        localStorage.removeItem(key);
        return null;
    },
    has: function (key, cacheTime) {
        var self = this;
        return !!self.get(key, cacheTime);
    }
});
module.exports = CacheProvider;
},{"../jquery":20}],10:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), u = require('../u');
var Client = function (instapi, options, cacheProvider) {
    var self = this;
    self.instapi = instapi;
    self.options = options;
    self.cacheProvider = cacheProvider;
    self.authorized = false;
    self.clientId = options.clientId;
    self.accessToken = options.accessToken;
    self.displayErrors = true;
    self.lastErrorMessage = null;
    self.initialize();
};
$.extend(Client, { API_URI: 'https://api.instagram.com/v1' });
Client.prototype = function () {
};
$.extend(Client.prototype, {
    initialize: function () {
        var self = this;
        if (self.accessToken) {
            self.authorized = true;
        } else if (!self.clientId) {
        }
    },
    getApiUrl: function () {
        var self = this;
        if (self.options.api) {
            return self.options.api.replace(/\/+$/, '') + '/';
        }
        return Client.API_URI;
    },
    isAlternativeApi: function () {
        var self = this;
        return self.getApiUrl() != Client.API_URI;
    },
    send: function (path, params, options, expired) {
        var self = this;
        params = params || {};
        options = options || {};
        expired = $.type(expired) === 'undefined' ? 0 : parseInt(expired, 10) || 0;
        var q = $.Deferred();
        var pathParams = u.parseQuery(path);
        params = $.extend(false, {}, pathParams, params);
        path = path.replace(self.getApiUrl(), '').replace(/\?.+$/, '');
        if (!self.isAlternativeApi()) {
            if (self.accessToken) {
                params.access_token = self.accessToken;
            }
            if (self.clientId) {
                params.client_id = self.clientId;
            }
        }
        if (params.callback) {
            params.callback = null;
        }
        var url;
        if (self.isAlternativeApi()) {
            params.path = '/v1' + path.replace('/v1', '');
            url = self.getApiUrl() + '?' + $.param(params);
        } else {
            url = self.getApiUrl() + path + '?' + $.param(params);
        }
        options = $.extend(false, {}, options, {
            url: url,
            dataType: 'jsonp',
            type: options.type || 'get'
        });
        if (options.type === 'get' && expired && self.cacheProvider.has(url, expired)) {
            q.resolve(self.cacheProvider.get(url, expired));
        } else {
            $.ajax(options).done(function (res) {
                if (res.meta.code !== 200) {
                    self.lastErrorMessage = res.meta.error_message;
                    if (self.displayErrors) {
                        self.instapi.core.showError(res.meta.error_message);
                    }
                    q.reject();
                } else {
                    self.cacheProvider.set(url, expired, res);
                    q.resolve(res);
                }
            });
        }
        return q.promise();
    },
    get: function (path, params, options, expired) {
        var self = this;
        options = $.extend(false, options, { type: 'get' });
        return self.send(path, params, options, expired);
    },
    setDisplayErrors: function (v) {
        var self = this;
        self.displayErrors = !!v;
    }
});
module.exports = Client;
},{"../jquery":20,"../u":27}],11:[function(require,module,exports){
"use strict";
var $ = require('../jquery');
var ComplexMediaFetcher = function (fetchers) {
    var self = this;
    self.fetchers = fetchers;
};
ComplexMediaFetcher.prototype = function () {
};
$.extend(ComplexMediaFetcher.prototype, {
    fetch: function (count, q) {
        var self = this;
        q = q || $.Deferred();
        var data;
        var finished = 0;
        var results = [];
        var fetchersCount = self.fetchers.length;
        var done = function () {
            var dirtyData = [];
            var filteredData = [];
            $.each(results, function (i, resourceData) {
                Array.prototype.push.apply(dirtyData, resourceData);
            });
            $.each(dirtyData, function (i, item) {
                var duplicate = filteredData.some(function (b) {
                        return b.id === item.id;
                    });
                if (!duplicate) {
                    filteredData.push(item);
                }
            });
            filteredData.sort(function (a, b) {
                return b.created_time - a.created_time;
            });
            data = filteredData.slice(0, count);
            $.each(filteredData.slice(count).reverse(), function (i, media) {
                media.fetcher.refund(media);
            });
            q.resolve(data);
        };
        var client = self.fetchers[0].client;
        client.setDisplayErrors(false);
        $.each(self.fetchers, function (i, fetcher) {
            fetcher.fetch(count).always(function (result) {
                if (this.state() === 'resolved') {
                    results.push(result);
                } else if (fetchersCount < 2) {
                    return;
                } else {
                    self.fetchers = self.fetchers.filter(function (f, j) {
                        return i !== j;
                    });
                }
                if (++finished == fetchersCount) {
                    client.setDisplayErrors(true);
                    if (self.fetchers.length) {
                        done();
                    } else {
                        client.instapi.core.showError(client.lastErrorMessage);
                    }
                }
            });
        });
        return q.promise();
    },
    hasNext: function () {
        var self = this;
        return self.fetchers.some(function (f) {
            return f.hasNext();
        });
    }
});
module.exports = ComplexMediaFetcher;
},{"../jquery":20}],12:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), Media = require('./media');
var MediaFetcher = function (client, sourceName, filters, postFilter) {
    var self = this;
    self.client = client;
    self.sourceName = sourceName;
    self.filters = filters;
    self.postFilter = postFilter;
    self.stack = [];
    self.hasNextMedia = true;
    self.nextPaginationUri = null;
    self.basePath = null;
    self.initialize();
};
MediaFetcher.prototype = function () {
};
$.extend(MediaFetcher.prototype, {
    initialize: function () {
        var self = this;
    },
    fetch: function (count, q) {
        var self = this;
        q = q || $.Deferred();
        var data;
        if (!self.hasNextMedia || count <= self.stack.length) {
            data = self.stack.slice(0, count);
            self.stack = self.stack.slice(count);
            q.resolve(self.processData(data));
        } else {
            self.load().done(function (result) {
                var data = result.data;
                if ($.type(data) !== 'array') {
                    data = [data];
                }
                Array.prototype.push.apply(self.stack, data);
                self.fetch(count, q);
            }).fail(function (status) {
                if (status === -1) {
                    q.reject();
                } else {
                    self.fetch(count, q);
                }
            });
        }
        return q.promise();
    },
    load: function () {
        var self = this;
        var path, params;
        var q = $.Deferred();
        if (!self.hasNextMedia) {
            q.reject();
        } else {
            params = { count: 33 };
            path = self.nextPaginationUri ? self.nextPaginationUri : self.basePath;
            self.client.get(path, params, null, self.client.instapi.core.options.cacheMediaTime).done(function (result) {
                if (result.pagination && result.pagination.next_url) {
                    self.nextPaginationUri = result.pagination.next_url;
                    self.hasNextMedia = true;
                } else {
                    self.nextPaginationUri = null;
                    self.hasNextMedia = false;
                }
                result.data = self.filterData(result.data);
                q.resolve(result);
            }).fail(function () {
                q.reject(-1);
            });
        }
        return q.promise();
    },
    processData: function (data) {
        var self = this;
        var collection = [];
        $.each(data, function (i, itemData) {
            collection.push(Media.create(self.client, itemData, self));
        });
        return collection;
    },
    filterData: function (data) {
        var self = this;
        if (!$.isArray(data)) {
            data = [data];
        }
        return data.filter(function (item) {
            var flag = true;
            $.each(self.filters, function (i, f) {
                if (!flag) {
                    return;
                }
                if (!item.tags) {
                    item.tags = [];
                }
                switch (f.logic) {
                case 'only':
                    if (f.type === 'user') {
                        flag = item.user.username === f.name;
                    } else if (f.type === 'tag') {
                        flag = !!~item.tags.indexOf(f.name);
                    } else if (f.type === 'specific_media_shortcode') {
                        flag = !!~item.link.indexOf(f.name);
                    } else if (f.type === 'specific_media_id') {
                        flag = item.id === f.name;
                    }
                    break;
                case 'except':
                    if (f.type === 'user') {
                        flag = item.user.username !== f.name;
                    } else if (f.type === 'tag') {
                        flag = !~item.tags.indexOf(f.name);
                    } else if (f.type === 'specific_media_shortcode') {
                        flag = !~item.link.indexOf(f.name);
                    } else if (f.type === 'specific_media_id') {
                        flag = item.id !== f.name;
                    }
                    break;
                }
            });
            if (flag && $.type(self.postFilter) === 'function') {
                flag = !!self.postFilter(item);
            }
            return flag;
        });
    },
    refund: function (model) {
        var self = this;
        Array.prototype.unshift.call(self.stack, model.original);
    },
    hasNext: function () {
        var self = this;
        return self.stack.length || self.hasNextMedia;
    }
});
module.exports = MediaFetcher;
},{"../jquery":20,"./media":13}],13:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), Model = require('./model'), u = require('../u');
var Media = function (client, fetcher) {
    var self = this;
    Model.call(self, client, fetcher);
};
$.extend(Media, Model, {
    findById: function (client, id, q) {
        q = q || $.Deferred();
        client.get('/media/' + id).done(function (result) {
            var media = Media.create(client, result.data);
            q.resolve(media);
        });
        return q.promise();
    },
    findByCode: function (client, code, q) {
        q = q || $.Deferred();
        client.get('/media/shortcode/' + code + '/').done(function (result) {
            var media = Media.create(client, result.data);
            q.resolve(media);
        });
        return q.promise();
    }
});
$.extend(Media.prototype, Model.prototype, {
    constructor: Media,
    getLikesCount: function () {
        var self = this;
        return u.formatNumber(self.likes.count);
    },
    getCommentsCount: function () {
        var self = this;
        return u.formatNumber(self.comments.count);
    },
    getImageOrientation: function () {
        var self = this;
        var ratio = self.getImageRatio();
        if (ratio > 1) {
            return 'album';
        } else if (ratio < 1) {
            return 'portrait';
        } else {
            return 'square';
        }
    },
    getImageRatio: function () {
        var self = this;
        var width = self.images.standard_resolution.width;
        var height = self.images.standard_resolution.height;
        return width / height;
    }
});
module.exports = Media;
},{"../jquery":20,"../u":27,"./model":14}],14:[function(require,module,exports){
"use strict";
var $ = require('../jquery');
var Model = function (client, fetcher) {
    var self = this;
    self.fetcher = fetcher;
    self.client = client;
};
$.extend(Model, {
    create: function (client, itemData, fetcher) {
        var item = new this(client, fetcher);
        item.fill(itemData);
        return item;
    }
});
Model.prototype = function () {
};
$.extend(Model.prototype, {
    fill: function (data) {
        var self = this;
        self.original = data;
        $.extend(self, data);
    }
});
module.exports = Model;
},{"../jquery":20}],15:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), MediaFetcher = require('./media-fetcher');
var SpecificMediaFetcher = function (client, idType, sourceName, filter, postFilter) {
    var self = this;
    self.idType = idType;
    MediaFetcher.call(self, client, sourceName, filter, postFilter);
};
$.extend(SpecificMediaFetcher, MediaFetcher);
SpecificMediaFetcher.prototype = function () {
};
$.extend(SpecificMediaFetcher.prototype, MediaFetcher.prototype, {
    initialize: function () {
        var self = this;
        if (self.idType === 'specific_media_shortcode') {
            self.basePath = '/media/shortcode/' + self.sourceName + '/';
        } else if (self.idType === 'specific_media_id') {
            self.basePath = '/media/' + self.sourceName + '/';
        }
    }
});
module.exports = SpecificMediaFetcher;
},{"../jquery":20,"./media-fetcher":12}],16:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), MediaFetcher = require('./media-fetcher');
var TagMediaFetcher = function (client, sourceName, filter, postFilter) {
    var self = this;
    MediaFetcher.call(self, client, sourceName, filter, postFilter);
};
$.extend(TagMediaFetcher, MediaFetcher);
TagMediaFetcher.prototype = function () {
};
$.extend(TagMediaFetcher.prototype, MediaFetcher.prototype, {
    initialize: function () {
        var self = this;
        self.basePath = '/tags/' + self.sourceName + '/media/recent/';
    }
});
module.exports = TagMediaFetcher;
},{"../jquery":20,"./media-fetcher":12}],17:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), MediaFetcher = require('./media-fetcher'), User = require('./user');
var UserMediaFetcher = function (client, sourceName, filter, postFilter) {
    var self = this;
    MediaFetcher.call(self, client, sourceName, filter, postFilter);
    self.userId = null;
};
$.extend(UserMediaFetcher, MediaFetcher);
UserMediaFetcher.prototype = function () {
};
$.extend(UserMediaFetcher.prototype, MediaFetcher.prototype, {
    initialize: function () {
    },
    fetch: function (count, q) {
        var self = this;
        q = q || $.Deferred();
        var findIdPromise = $.Deferred();
        if (!self.userId) {
            User.findId(self.client, self.sourceName).done(function (id) {
                self.userId = id;
                self.basePath = '/users/' + id + '/media/recent/';
                findIdPromise.resolve();
            }).fail(function () {
                self.client.instapi.core.showError('Sorry, user <strong>@' + self.sourceName + '</strong> can`t be found.');
            });
        } else {
            findIdPromise.resolve();
        }
        findIdPromise.done(function () {
            MediaFetcher.prototype.fetch.call(self, count, q);
        });
        return q.promise();
    }
});
module.exports = UserMediaFetcher;
},{"../jquery":20,"./media-fetcher":12,"./user":18}],18:[function(require,module,exports){
"use strict";
var $ = require('../jquery'), Model = require('./model');
var User = function (client) {
    var self = this;
    Model.call(self, client);
};
$.extend(User, Model, {
    constructor: User,
    findId: function (client, name) {
        var q = $.Deferred();
        if (client.isAlternativeApi() || client.instapi.isSandbox()) {
            q.resolve(name);
        } else {
            client.get('/users/search/', { q: name }, null, 604800).done(function (result) {
                var id;
                $.each(result.data, function (i, item) {
                    if (id) {
                        return;
                    }
                    if (item.username === name) {
                        id = item.id;
                    }
                });
                if (id) {
                    q.resolve(id);
                } else {
                    q.reject();
                }
            });
        }
        return q.promise();
    }
});
$.extend(User.prototype, Model.prototype, { constructor: User });
module.exports = User;
},{"../jquery":20,"./model":14}],19:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var Instashow = function () {
};
Instashow.prototype = function () {
};
$.extend(Instashow.prototype, {});
module.exports = Instashow;
},{"./jquery":20}],20:[function(require,module,exports){
"use strict";
module.exports = window.jQuery;
},{}],21:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var languages = {
        'en': {},
        'de': {
            'View in Instagram': 'Folgen',
            'w': 'Wo.',
            'd': 'Tag',
            'h': 'Std.',
            'm': 'min',
            's': 'Sek'
        },
        'es': {
            'View in Instagram': 'Seguir',
            'w': 'sem',
            'd': 'd\xeda',
            'h': 'h',
            'm': 'min',
            's': 's'
        },
        'fr': {
            'View in Instagram': 'S`abonner',
            'w': 'sem',
            'd': 'j',
            'h': 'h',
            'm': 'min',
            's': 's'
        },
        'it': {
            'View in Instagram': 'Segui',
            'w': 'sett.',
            'd': 'g',
            'h': 'h',
            'm': 'm',
            's': 's'
        },
        'nl': {
            'View in Instagram': 'Volgen',
            'w': 'w.',
            'd': 'd.',
            'h': 'u.',
            'm': 'm.',
            's': 's.'
        },
        'no': {
            'View in Instagram': 'F\xf8lg',
            'w': 'u',
            'd': 'd',
            'h': 't',
            'm': 'm',
            's': 's'
        },
        'pl': {
            'View in Instagram': 'Obserwuj',
            'w': 'w',
            'd': 'dzie\u0144',
            'h': 'godz.',
            'm': 'min',
            's': 's'
        },
        'pt-BR': {
            'View in Instagram': 'Seguir',
            'w': 'sem',
            'd': 'd',
            'h': 'h',
            'm': 'min',
            's': 's'
        },
        'sv': {
            'View in Instagram': 'F?lj',
            'w': 'v',
            'd': 'd',
            'h': 'h',
            'm': 'min',
            's': 'sek'
        },
        'tr': {
            'View in Instagram': 'Takip et',
            'w': 'h',
            'd': 'g',
            'h': 's',
            'm': 'd',
            's': 'sn'
        },
        'ru': {
            'View in Instagram': '\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432 Instagram',
            'w': '\u043d\u0435\u0434.',
            'd': '\u0434\u043d.',
            'h': '\u0447',
            'm': '\u043c\u0438\u043d',
            's': '\u0441'
        },
        'hi': {
            'View in Instagram': '\u092b\u093c\u0949\u0932\u094b \u0915\u0930\u0947\u0902',
            'w': '\u0938\u092a\u094d\u0924\u093e\u0939',
            'd': '\u0926\u093f\u0928',
            'h': '\u0918\u0902\u091f\u0947',
            'm': '\u092e\u093f\u0928\u091f',
            's': '\u0938\u0947\u0915\u0902\u0921'
        },
        'ko': {
            'View in Instagram': '\ud314\ub85c\uc6b0',
            'w': '\uc8fc',
            'd': '\uc77c',
            'h': '\uc2dc\uac04',
            'm': '\ubd84',
            's': '\ucd08'
        },
        'zh-HK': {
            'View in Instagram': '\u5929\u6ce8',
            'w': '\u5468',
            'd': '\u5929',
            'h': '\u5c0f\u65f6',
            'm': '\u5206\u949f',
            's': '\u79d2'
        },
        'ja': {
            'View in Instagram': '\u30d5\u30a9\u30ed\u30fc\u3059\u308b',
            'w': '\u9031\u9593\u524d',
            'd': '\u65e5\u524d',
            'h': '\u6642\u9593\u524d',
            'm': '\u5206\u524d',
            's': '\u79d2\u524d'
        }
    };
var Lang = function (core, id) {
    var self = this;
    self.core = core;
    self.id = id;
    self.currentLib = null;
    self.initialize();
};
Lang.prototype = function () {
};
$.extend(Lang.prototype, {
    initialize: function () {
        var self = this;
        self.currentLib = languages[self.id];
        if (!self.currentLib) {
            self.core.showError('Sorry, language "' + self.id + '" is undefined. See details in docs.');
            return;
        }
    },
    t: function (phrase) {
        var self = this;
        return self.currentLib[phrase] || phrase;
    }
});
module.exports = Lang;
},{"./jquery":20}],22:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var Loader = function ($root, $element) {
    var self = this;
    self.$root = $root;
    self.$element = $element;
    self.timer = null;
    self.initialize();
};
Loader.prototype = function () {
};
$.extend(Loader.prototype, {
    initialize: function () {
        var self = this;
        self.$element.prependTo(self.$root);
    },
    show: function (timeout) {
        var self = this;
        self.timer = setTimeout(function () {
            self.toggle(true);
        }, timeout);
    },
    hide: function () {
        var self = this;
        if (self.timer) {
            clearTimeout(self.timer);
            self.timer = null;
        }
        self.toggle(false);
    },
    toggle: function (sw) {
        var self = this;
        self.$element.toggleClass('instashow-show', sw);
    }
});
module.exports = Loader;
},{"./jquery":20}],23:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var $w = $(window);
module.exports = function (gallery) {
    var pressed = false;
    var start = 0;
    var startProgress = 0;
    var justAdded = false;
    var isTouch = function (e) {
        return /^touch/.test(e.type);
    };
    var begin = function (e) {
        var touch = isTouch(e);
        if (!touch) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (gallery.isBusy()) {
            return;
        }
        pressed = true;
        startProgress = gallery.progress;
        if (touch) {
            start = gallery.isHorizontal() ? e.originalEvent.touches[0].clientX : e.originalEvent.touches[0].clientY;
        } else {
            start = gallery.isHorizontal() ? e.originalEvent.clientX : e.originalEvent.clientY;
        }
    };
    var move = function (e) {
        if (!pressed || gallery.isBusy()) {
            pressed = false;
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (isTouch(e)) {
            cur = gallery.isHorizontal() ? e.originalEvent.changedTouches[0].clientX : e.originalEvent.changedTouches[0].clientY;
        } else {
            cur = gallery.isHorizontal() ? e.originalEvent.clientX : e.originalEvent.clientY;
        }
        var progress, movingProgress, cur;
        var hasNext = gallery.hasView(gallery.activeViewId + 1);
        var hasPrevious = gallery.hasView(gallery.activeViewId - 1);
        if (!hasNext && !justAdded && cur < start && gallery.hasNextView()) {
            gallery.addView();
            justAdded = true;
        }
        movingProgress = (start - cur) / gallery.getGlobalThreshold();
        progress = startProgress + movingProgress;
        if (movingProgress) {
            gallery.drag = true;
        }
        var id = gallery.getViewIdByProgress(progress);
        if (gallery.activeViewId !== id) {
            gallery.setActiveView(id);
        }
        movingProgress = (start - cur) / gallery.getGlobalThreshold();
        progress = startProgress + movingProgress;
        var movement = progress > 1 && !hasNext || progress < 0 && !hasPrevious ? 0.2 : 1;
        gallery.setProgress(progress);
        gallery.translate(progress, false, movement);
    };
    var end = function (e) {
        pressed = false;
        if (!gallery.drag) {
            return;
        }
        justAdded = false;
        setTimeout(function () {
            gallery.drag = false;
        }, 0);
        var progress, q;
        var end = gallery.progress > 1 | 0;
        gallery.puzzle();
        if (gallery.progress < 0 || end) {
            q = gallery.translate(end, true);
            gallery.setProgress(end);
        } else if (!gallery.isFreeMode()) {
            progress = gallery.getViewStartProgress(gallery.getActiveView());
            q = gallery.translate(progress, true);
            gallery.setProgress(progress);
        } else {
            gallery.free();
            return;
        }
        q.done(function () {
            gallery.free();
        });
    };
    return {
        watch: function () {
            gallery.$root.on('viewAdded.instaShow', function (e, id) {
                startProgress = gallery.getAdjustedProgress(id - 1, startProgress);
            });
            if (gallery.options.dragControl) {
                gallery.$root.on('mousedown', begin);
                $w.on('mousemove', move);
                $w.on('mouseup', end);
                gallery.$root.on('click', function (e) {
                    if (gallery.drag) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
            if (gallery.options.scrollControl || gallery.options.dragControl) {
                gallery.$root.on('touchstart', begin);
                $w.on('touchmove', move);
                $w.on('touchend', end);
            }
        }
    };
};
},{"./jquery":20}],24:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), views = require('./views'), u = require('./u'), Instapi = require('./instapi'), Media = require('./instapi/media'), SpecificMediaFetcher = require('./instapi/specific-media-fetcher');
var $w = $(window);
var Popup = function (core) {
    var self = this;
    self.core = core;
    self.options = self.core.options;
    self.showing = false;
    self.$body = null;
    self.$root = null;
    self.$twilight = null;
    self.$wrapper = null;
    self.$container = null;
    self.$controlClose = null;
    self.$controlPrevious = null;
    self.$controlNext = null;
    self.$media = null;
    self.video = null;
    self.currentMedia = null;
    self.optionInfo = null;
    self.optionControl = null;
    self.initialize();
    self.watch();
};
$.extend(Popup, {
    AVAILABLE_INFO: [
        'username',
        'instagramLink',
        'passedTime',
        'likesCounter',
        'commentsCounter',
        'description',
        'comments',
        'location'
    ]
});
Popup.prototype = function () {
};
$.extend(Popup.prototype, {
    initialize: function () {
        var self = this;
        self.optionInfo = u.unifyMultipleOption(self.options.popupInfo);
        self.moveDuration = parseInt(self.options.popupSpeed, 10);
        self.easing = self.options.popupEasing;
        if (self.optionInfo) {
            self.optionInfo = self.optionInfo.filter(function (item) {
                return !!~Popup.AVAILABLE_INFO.indexOf(item);
            });
        }
        self.$body = $('body');
        self.$root = $(views.popup.root());
        self.$wrapper = self.$root.find('.instashow-popup-wrapper');
        self.$container = self.$root.find('.instashow-popup-container');
        self.$twilight = $(views.popup.twilight());
        self.$controlClose = self.$container.find('.instashow-popup-control-close');
        self.$controlNext = self.$container.find('.instashow-popup-control-arrow-next');
        self.$controlPrevious = self.$container.find('.instashow-popup-control-arrow-previous');
        self.$root.attr('id', 'instaShowPopup_' + self.core.id);
        self.$twilight.prependTo(self.$root);
        self.$root.appendTo(document.body);
    },
    open: function (media) {
        var self = this;
        if (self.showing || self.busy) {
            return false;
        }
        self.$body.css('overflow', 'hidden');
        self.busy = true;
        self.findMediaId(media).done(function (id) {
            self.currentMedia = id;
            self.busy = false;
            self.$root.trigger('popupMediaOpened.instaShow');
        });
        self.$root.css('display', '');
        self.showMedia(media);
        self.showing = true;
        if (self.core.options.popupDeepLinking) {
            window.location.hash = '#!is' + self.core.id + '/$' + media.code;
        }
        setTimeout(function () {
            self.$root.addClass('instashow-show');
        });
    },
    close: function () {
        var self = this;
        self.showing = false;
        self.$root.removeClass('instashow-show');
        setTimeout(function () {
            self.$root.css('display', 'none');
        }, 500);
        self.$body.css('overflow', '');
        if (self.video) {
            self.video.pause();
        }
        if (self.core.options.popupDeepLinking) {
            window.location.hash = '!';
        }
    },
    createMedia: function (media) {
        var self = this;
        if (self.core.options.popupHrImages) {
            media.images.standard_resolution.url = media.images.standard_resolution.url.replace('s640x640', 's1080x1080');
        }
        var commentsCount = media.getCommentsCount();
        var tplData = {
                media: media,
                options: {},
                info: {
                    viewOnInstagram: self.core.lang.t('View in Instagram'),
                    likesCount: media.getLikesCount(),
                    commentsCount: commentsCount,
                    description: media.caption ? u.nl2br(Instapi.parseAnchors(media.caption.text)) : null,
                    location: media.location ? media.location.name : null,
                    passedTime: u.pretifyDate(media.created_time, self.core.lang)
                }
            };
        if (self.optionInfo) {
            $.each(self.optionInfo, function (i, item) {
                if (self.core.instapi.isSandbox() && item === 'comments') {
                    return;
                }
                tplData.options[item] = true;
            });
        }
        tplData.options.hasDescription = tplData.options.description && media.caption;
        tplData.options.hasLocation = tplData.options.location && media.location;
        tplData.options.hasComments = tplData.options.comments && media.comments.data;
        tplData.options.hasProperties = tplData.options.hasLocation || tplData.options.likesCounter || tplData.options.commentsCounter;
        tplData.options.isVideo = media.type === 'video';
        tplData.options.hasOrigin = tplData.options.username || tplData.options.instagramLink;
        tplData.options.hasMeta = tplData.options.hasProperties || tplData.options.passedTime;
        tplData.options.hasContent = tplData.options.hasDescription || tplData.options.hasComments;
        tplData.options.hasInfo = tplData.options.hasOrigin || tplData.options.hasMeta || tplData.options.hasContent;
        var commentsList = $.extend(true, [], media.comments.data || []);
        commentsList.map(function (item) {
            item.text = u.nl2br(Instapi.parseAnchors(item.text));
            return item;
        });
        if (commentsList) {
            tplData.info.comments = views.popup.mediaComments({ list: commentsList });
        }
        var $media = $(views.popup.media(tplData));
        if (tplData.options.isVideo) {
            self.video = $media.find('video').get(0);
            $media.find('.instashow-popup-media-video').click(function () {
                $media.toggleClass('instashow-playing', self.video.paused);
                if (self.video.paused) {
                    self.video.play();
                } else {
                    self.video.pause();
                }
            });
        }
        $media.addClass('instashow-popup-media-' + media.getImageOrientation());
        var img = new Image();
        img.src = media.images.standard_resolution.url;
        img.onload = function () {
            $media.find('.instashow-popup-media-picture').addClass('instashow-popup-media-picture-loaded');
            $media.css('transition-duration', '0s').toggleClass('instashow-popup-media-hr', img.width >= 1080);
            $media.width();
            $media.css('transition-duration', '');
            self.adjust();
        };
        var $content, specificMediaFetcher;
        if (self.core.instapi.client.isAlternativeApi() && !commentsList.length && commentsCount) {
            $content = $media.find('.instashow-popup-media-info-content');
            if (!$content.length) {
                $content = $('<div class="instashow-popup-media-info-content"></div>');
                $content.appendTo($media.find('.instashow-popup-media-info'));
            }
            specificMediaFetcher = new SpecificMediaFetcher(self.core.instapi.client, 'specific_media_shortcode', media.code, []);
            specificMediaFetcher.fetch().done(function (result) {
                var extMedia = result[0];
                media.comments.data = extMedia.comments.data;
                var commentsList = $.extend(true, [], media.comments.data || []);
                commentsList.map(function (item) {
                    item.text = u.nl2br(Instapi.parseAnchors(item.text));
                    return item;
                });
                var $comments = $(views.popup.mediaComments({ list: commentsList }));
                $content.append($comments);
            });
        }
        return $media;
    },
    showMedia: function (media) {
        var self = this;
        var $media = self.createMedia(media);
        if (self.$media) {
            self.$media.replaceWith($media);
        } else {
            $media.appendTo(self.$container);
        }
        self.$media = $media;
        self.adjust();
    },
    moveToMedia: function (id, immediately, q) {
        var self = this;
        q = q || $.Deferred();
        id = parseInt(id, 10) || 0;
        var $target, $both;
        var duration = !immediately ? self.moveDuration || 0 : 0;
        var isNext = id > self.currentMedia;
        var $current = self.$media;
        var targetMedia = self.getMedia(id);
        if (self.isBusy() || !targetMedia) {
            q.reject();
        } else {
            self.busy = true;
            if (self.core.options.popupDeepLinking) {
                window.location.hash = '#!is' + self.core.id + '/$' + targetMedia.code;
            }
            $target = self.createMedia(targetMedia);
            $both = $().add($current).add($target);
            $target.toggleClass('instashow-popup-media-hr', $current.hasClass('instashow-popup-media-hr'));
            $both.css({
                transitionDuration: duration + 'ms',
                transitionTimingFunction: self.easing
            });
            $target.addClass('instashow-popup-media-appearing');
            if (isNext) {
                $target.addClass('instashow-popup-media-next').appendTo(self.$container);
            } else {
                $target.addClass('instashow-popup-media-previous').prependTo(self.$container);
            }
            $both.width();
            $target.removeClass('instashow-popup-media-next instashow-popup-media-previous');
            if (isNext) {
                $current.addClass('instashow-popup-media-previous');
            } else {
                $current.addClass('instashow-popup-media-next');
            }
            self.$media = $target;
            setTimeout(function () {
                $current.detach();
                $both.removeClass('instashow-popup-media-appearing instashow-popup-media-next instashow-popup-media-previous').css({
                    transitionDuration: '',
                    transitionTimingFunction: ''
                });
                q.resolve();
            }, duration + (u.isMobileDevice() ? 300 : 0));
        }
        q.done(function () {
            self.busy = false;
            self.currentMedia = id;
            self.$root.trigger('popupMediaChanged.instaShow');
        });
        return q.promise();
    },
    followHash: function () {
        var self = this;
        var hash = window.location.hash;
        var hashMatches = hash.match(new RegExp('#!is' + self.core.id + '/\\$(.+)$'));
        if (self.isBusy() || !hashMatches || !hashMatches[1]) {
            return;
        }
        var code = hashMatches[1];
        Media.findByCode(self.core.instapi.client, code).done(function (media) {
            self.open(media);
        });
    },
    hasMedia: function (id) {
        var self = this;
        return !!self.getMedia(id);
    },
    hasNextMedia: function () {
        var self = this;
        return self.hasMedia(self.currentMedia + 1) || (!self.core.gallery.limit || self.core.gallery.mediaList.length < self.core.gallery.limit) && self.core.mediaFetcher.hasNext() || self.core.options.loop;
    },
    hasPreviousMedia: function () {
        var self = this;
        return self.hasMedia(self.currentMedia - 1) || self.core.options.loop && (self.core.gallery.limit && self.core.gallery.mediaList.length >= self.core.gallery.limit || !self.core.mediaFetcher.hasNext());
    },
    moveToNextMedia: function () {
        var self = this;
        var q = $.Deferred();
        var target = self.currentMedia + 1;
        if (!!self.getMedia(target)) {
            self.moveToMedia(target, false, q);
        } else if ((!self.core.gallery.limit || self.core.gallery.mediaList.length < self.core.gallery.limit) && self.core.mediaFetcher.hasNext()) {
            self.core.gallery.addView().done(function () {
                self.moveToMedia(target, false, q);
            });
        } else {
            if (self.core.options.loop) {
                self.moveToMedia(0, false, q);
            } else {
                q.reject();
            }
        }
        return q.promise();
    },
    moveToPreviousMedia: function () {
        var self = this;
        var target = self.currentMedia - 1;
        if (!self.hasMedia(target) && self.hasPreviousMedia()) {
            target = self.core.gallery.mediaList.length - 1;
        }
        return self.moveToMedia(target, false);
    },
    findMediaId: function (media, q) {
        var self = this;
        q = q || $.Deferred();
        var id = self.core.gallery.getMediaIdByNativeId(media.id);
        if (!!~id) {
            q.resolve(id);
        } else {
            self.core.gallery.addView().done(function () {
                self.findMediaId(media, q);
            }).fail(function () {
                q.resolve(-1);
            });
        }
        return q.promise();
    },
    getMedia: function (id) {
        var self = this;
        return self.core.gallery.mediaList[id] || null;
    },
    adjust: function () {
        var self = this;
        if (!self.$media) {
            return;
        }
        self.$container.height(self.$media.height());
        if (!u.isMobileDevice()) {
            setTimeout(function () {
                var ratio;
                var windowHeight = $w.height();
                var containerHeight = self.$media.innerHeight() + parseInt(self.$container.css('padding-top'), 10) + parseInt(self.$container.css('padding-bottom'), 10);
                self.$container.css('top', windowHeight <= containerHeight ? 0 : windowHeight / 2 - containerHeight / 2);
            });
        }
    },
    isBusy: function () {
        var self = this;
        return self.busy;
    },
    watch: function () {
        var self = this;
        self.$wrapper.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', '.instashow-popup-media, .instashow-popup-container', function () {
            setTimeout(function () {
                self.adjust();
            }, 17);
        });
        $w.resize(function () {
            self.adjust();
        });
        self.$wrapper.click(function (e) {
            if (e.target !== self.$wrapper.get(0)) {
                return;
            }
            self.close();
        });
        self.$controlClose.click(function (e) {
            e.preventDefault();
            self.close();
        });
        self.$controlNext.click(function (e) {
            e.preventDefault();
            self.moveToNextMedia();
        });
        self.$controlPrevious.click(function (e) {
            e.preventDefault();
            self.moveToPreviousMedia();
        });
        $w.keydown(function (e) {
            if (!self.showing || self.isBusy()) {
                return;
            }
            switch (e.which) {
            case 39:
                self.moveToNextMedia();
                break;
            case 37:
                self.moveToPreviousMedia();
                break;
            case 27:
                self.close();
                break;
            }
        });
        var prevX, prevY, swipe;
        if (u.isTouchDevice()) {
            self.$root.on('touchstart', function (e) {
                if (self.isBusy()) {
                    return;
                }
                prevX = e.originalEvent.touches[0].clientX;
                prevY = e.originalEvent.touches[0].clientY;
            });
            self.$root.on('touchend', function (e) {
                if (self.isBusy()) {
                    return;
                }
                var cur = e.originalEvent.changedTouches[0].clientX;
                if (swipe) {
                    if (cur > prevX) {
                        self.moveToPreviousMedia();
                    } else if (cur < prevX) {
                        self.moveToNextMedia();
                    }
                }
            });
            self.$root.on('touchmove', function (e) {
                if (self.isBusy()) {
                    return;
                }
                var curX = e.originalEvent.changedTouches[0].clientX;
                var curY = e.originalEvent.changedTouches[0].clientY;
                swipe = Math.abs(prevY - curY) < Math.abs(prevX - curX);
                if (swipe) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
        $w.on('hashchange', function () {
            self.followHash();
        });
        self.core.gallery.$root.on('initialized.instaShow', function () {
            self.followHash();
        });
        self.$root.on('popupMediaOpened.instaShow popupMediaChanged.instaShow', function () {
            self.$controlPrevious.toggleClass('instashow-disabled', !self.hasPreviousMedia());
            self.$controlNext.toggleClass('instashow-disabled', !self.hasNextMedia());
        });
    }
});
module.exports = Popup;
},{"./instapi":8,"./instapi/media":13,"./instapi/specific-media-fetcher":15,"./jquery":20,"./u":27,"./views":28}],25:[function(require,module,exports){
"use strict";
var $ = require('./jquery'), views = require('./views');
var Scrollbar = function (gallery) {
    var self = this;
    self.gallery = gallery;
    self.initialize();
    self.watch();
};
Scrollbar.prototype = function () {
};
$.extend(Scrollbar.prototype, {
    initialize: function () {
        var self = this;
        self.$element = $(views.gallery.scroll());
        self.$slider = self.$element.children().first();
        if (self.gallery.options.scrollbar) {
            self.$element.appendTo(self.gallery.$root);
        }
    },
    fit: function () {
        var self = this;
        var progress = self.gallery.progress;
        var viewsCount = self.gallery.$viewsList.length;
        if (self.gallery.viewsCastled) {
            viewsCount -= 2;
        }
        if (progress < 0) {
            progress = 0;
        } else if (progress > 1) {
            progress = 1;
        }
        var size = self.gallery.isHorizontal() ? self.$element.width() : self.$element.height();
        var sliderSize = size / viewsCount;
        var offset = (size - sliderSize) * progress;
        if (!sliderSize || !isFinite(sliderSize)) {
            return;
        }
        var sliderStyle;
        if (self.gallery.isHorizontal()) {
            sliderStyle = {
                transform: 'translate3d(' + offset + 'px, 0, 0)',
                width: sliderSize
            };
        } else {
            sliderStyle = {
                transform: 'translate3d(0, ' + offset + 'px, 0)',
                height: sliderSize
            };
        }
        self.$slider.css(sliderStyle);
    },
    watch: function () {
        var self = this;
        self.gallery.$root.on('progressChanged.instaShow', function () {
            self.fit();
        });
    }
});
module.exports = Scrollbar;
},{"./jquery":20,"./views":28}],26:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
var translateTimer;
module.exports = {
    slide: function (progress, smoothly, movement, q) {
        var self = this;
        movement = movement || 1;
        var duration = 0;
        var easing = '';
        if (smoothly) {
            duration = self.options.speed;
            easing = self.options.easing;
            translateTimer = setTimeout(function () {
                self.$container.css({
                    transitionDuration: '',
                    transitionTimingFunction: ''
                });
                q.resolve();
            }, duration);
        } else {
            q.resolve();
        }
        self.$container.css({
            transitionDuration: duration + 'ms',
            transitionTimingFunction: easing
        });
        var transform;
        var offset;
        var globalThreshold = self.getGlobalThreshold();
        if (progress <= 1) {
            offset = -progress * movement * globalThreshold;
        } else {
            offset = -globalThreshold + (1 - progress) * movement * globalThreshold;
        }
        if (self.isHorizontal()) {
            transform = 'translate3d(' + offset + 'px, 0, 0)';
        } else {
            transform = 'translate3d(0, ' + offset + 'px, 0)';
        }
        self.$container.css('transform', transform);
        self.translationPrevProgress = progress;
    },
    fade: function (progress, smoothly, movement, q) {
        var self = this;
        movement = movement || 1;
        movement *= 0.5;
        var duration = 0;
        var easing = '';
        if (smoothly) {
            duration = self.options.speed;
            easing = self.options.easing;
            translateTimer = setTimeout(function () {
                $both.css({
                    transitionDuration: '',
                    transitionTimingFunction: ''
                });
                q.resolve();
            }, duration);
        } else {
            q.resolve();
        }
        var $target, dir, end, intermediateProgress;
        var activeId = self.getViewIdByProgress(progress);
        var $active = self.$viewsList.eq(activeId);
        var start = self.getViewStartProgress($active);
        if (progress == start) {
            dir = 0;
            intermediateProgress = 0;
            if (progress > self.translationPrevProgress) {
                $target = self.$viewsList.eq(activeId - 1);
            } else if (progress < self.translationPrevProgress) {
                $target = self.$viewsList.eq(activeId + 1);
            } else {
                $target = $();
            }
        } else {
            if (progress > start) {
                dir = 1;
                $target = self.$viewsList.eq(activeId + 1);
                end = start + self.getThreshold() / self.getGlobalThreshold() / 2;
            } else {
                dir = -1;
                $target = self.$viewsList.eq(activeId - 1);
                end = start - self.getThreshold() / self.getGlobalThreshold() / 2;
            }
            intermediateProgress = (progress - start) / (end - start) * movement;
        }
        var $both = $().add($active).add($target);
        $both.css({
            transitionDuration: duration ? duration + 'ms' : '',
            transitionTimingFunction: easing
        });
        $both.width();
        $active.css('opacity', 1 - intermediateProgress);
        $target.css('opacity', intermediateProgress);
        self.translationPrevProgress = progress;
    }
};
},{"./jquery":20}],27:[function(require,module,exports){
"use strict";
var $ = require('./jquery');
module.exports = {
    MOBILE_DEVICE_REGEX: /android|webos|iphone|ipad|ipod|blackberry|windows\sphone/i,
    unifyMultipleOption: function (option) {
        var type = $.type(option);
        if (type === 'array') {
            return option;
        } else if (type === 'string') {
            return option.split(/[\s,;\|]+/).filter(function (item) {
                return !!item;
            });
        }
        return [];
    },
    parseQuery: function (path) {
        var queryMatches = path.match(/\?([^#]+)/);
        if (!queryMatches || !queryMatches[1]) {
            return null;
        }
        var params = {};
        var parser = function (str) {
            var field = str.split('=');
            params[field[0]] = field[1] || '';
        };
        queryMatches[1].split('&').map(parser);
        return params;
    },
    formatNumber: function (num, dec) {
        num = parseFloat(num);
        dec = dec || 0;
        if ($.type(num) !== 'number') {
            return NaN;
        }
        var fixed, integer, des;
        if (num >= 1000000) {
            fixed = (num / 1000000).toFixed(dec);
            des = 'm';
        } else if (num >= 1000) {
            fixed = (num / 1000).toFixed(dec);
            des = 'k';
        } else {
            fixed = num;
            des = '';
        }
        integer = parseInt(fixed, 10);
        if (fixed - integer === 0) {
            fixed = integer;
        }
        return fixed + des;
    },
    pretifyDate: function (from, lang) {
        var now = Math.round(new Date().getTime() / 1000);
        var diff = Math.abs(now - from);
        var factor, unit;
        if (diff >= 604800) {
            factor = diff / 604800;
            unit = lang.t('w');
        } else if (diff >= 86400) {
            factor = diff / 86400;
            unit = lang.t('d');
        } else if (diff >= 3600) {
            factor = diff / 3600;
            unit = lang.t('h');
        } else if (diff >= 60) {
            factor = diff / 60;
            unit = lang.t('m');
        } else {
            factor = diff;
            unit = lang.t('s');
        }
        factor = Math.round(factor);
        return factor + ' ' + unit;
    },
    isTouchDevice: function () {
        return 'ontouchstart' in document.documentElement;
    },
    isMobileDevice: function () {
        return this.MOBILE_DEVICE_REGEX.test(navigator.userAgent);
    },
    nl2br: function (str) {
        return str.replace(/\n+/, '<br>');
    },
    getProperty: function (object, path, modifiers) {
        var constructor = this;
        if (!object || !path || $.type(path) !== 'string') {
            return undefined;
        }
        var last = object;
        $.each(path.split('.'), function (i, name) {
            last = last[name];
            if (!last) {
                return false;
            }
        });
        if (last && modifiers) {
            last = constructor.applyModifier(last, modifiers);
        }
        return last;
    },
    setProperty: function (object, path, value) {
        if (!object || !path || $.type(path) !== 'string') {
            return undefined;
        }
        var last = object;
        var map = path.split('.');
        $.each(map, function (i, name) {
            if (i == map.length - 1) {
                last[name] = value;
            } else if ($.type(last[name]) === 'undefined') {
                last[name] = {};
            }
            last = last[name];
        });
        return object;
    },
    applyModifier: function (val, modifiers) {
        if ($.type(modifiers) !== 'array') {
            modifiers = [modifiers];
        }
        $.each(modifiers, function (i, mod) {
            if ($.type(mod) !== 'function') {
                return;
            }
            val = mod.call(mod, val);
        });
        return val;
    }
};
},{"./jquery":20}],28:[function(require,module,exports){
"use strict";
var views = {};
views['error'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var stack1, helper;
        return '<div class="instashow instashow-error"><div class="instashow-error-panel"><div class="instashow-error-title">Unfortunately, an error occurred</div><div class="instashow-error-caption">' + ((stack1 = (helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing, typeof helper === 'function' ? helper.call(depth0, {
            'name': 'message',
            'hash': {},
            'data': data
        }) : helper)) != null ? stack1 : '') + '</div></div></div>';
    },
    'useData': true
});
views['gallery'] = views['gallery'] || {};
views['gallery']['arrows'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-gallery-control-arrow instashow-gallery-control-arrow-previous instashow-gallery-control-arrow-disabled"></div><div class="instashow-gallery-control-arrow instashow-gallery-control-arrow-next instashow-gallery-control-arrow-disabled"></div>';
    },
    'useData': true
});
views['gallery']['counter'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var helper, alias1 = helpers.helperMissing, alias2 = 'function', alias3 = this.escapeExpression;
        return '<span class="instashow-gallery-media-counter"><span class="instashow-icon instashow-icon-' + alias3((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'icon',
            'hash': {},
            'data': data
        }) : helper)) + '"></span> <em>' + alias3((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'value',
            'hash': {},
            'data': data
        }) : helper)) + '</em></span>';
    },
    'useData': true
});
views['gallery']['cover'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<span class="instashow-gallery-media-cover"></span>';
    },
    'useData': true
});
views['gallery']['info'] = Handlebars.template({
    '1': function (depth0, helpers, partials, data) {
        return ' instashow-gallery-media-info-no-description';
    },
    '3': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-gallery-media-info-counter"><span class="instashow-icon instashow-icon-like"></span> <em>' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.likesCount : stack1, depth0)) + '</em></span> ';
    },
    '5': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-gallery-media-info-counter"><span class="instashow-icon instashow-icon-comment"></span> <em>' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.commentsCount : stack1, depth0)) + '</em></span> ';
    },
    '7': function (depth0, helpers, partials, data) {
        var stack1;
        return ' <span class="instashow-gallery-media-info-description">' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.description : stack1, depth0)) + '</span> ';
    },
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var stack1;
        return ' <span class="instashow-gallery-media-info' + ((stack1 = helpers.unless.call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.description : stack1, {
            'name': 'unless',
            'hash': {},
            'fn': this.program(1, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '">' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.likesCounter : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(3, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.commentsCounter : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(5, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasDescription : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(7, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</span>';
    },
    'useData': true
});
views['gallery']['loader'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-gallery-loader"><div class="instashow-spinner"></div></div>';
    },
    'useData': true
});
views['gallery']['media'] = Handlebars.template({
    '1': function (depth0, helpers, partials, data) {
        var stack1;
        return this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.caption : depth0) != null ? stack1.text : stack1, depth0));
    },
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var stack1, helper;
        return '<div class="instashow-gallery-media"> <a class="instashow-gallery-media-link" href="' + this.escapeExpression((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : helpers.helperMissing, typeof helper === 'function' ? helper.call(depth0, {
            'name': 'link',
            'hash': {},
            'data': data
        }) : helper)) + '" target="_blank"><span class="instashow-gallery-media-image"><img src="" alt="' + ((stack1 = helpers['if'].call(depth0, depth0 != null ? depth0.caption : depth0, {
            'name': 'if',
            'hash': {},
            'fn': this.program(1, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '"/></span></a></div>';
    },
    'useData': true
});
views['gallery']['scroll'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-gallery-control-scroll"><div class="instashow-gallery-control-scroll-slider"></div></div>';
    },
    'useData': true
});
views['gallery']['view'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-gallery-view"></div>';
    },
    'useData': true
});
views['gallery']['wrapper'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-gallery-wrapper"><div class="instashow-gallery-container"></div></div>';
    },
    'useData': true
});
views['popup'] = views['popup'] || {};
views['popup']['media'] = Handlebars.template({
    '1': function (depth0, helpers, partials, data) {
        return ' instashow-popup-media-has-comments';
    },
    '3': function (depth0, helpers, partials, data) {
        return ' instashow-popup-media-video';
    },
    '5': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-popup-media-picture-loader"><span class="instashow-spinner"></span></span> <img src="' + this.escapeExpression(this.lambda((stack1 = (stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.images : stack1) != null ? stack1.standard_resolution : stack1) != null ? stack1.url : stack1, depth0)) + '" alt=""/> ';
    },
    '7': function (depth0, helpers, partials, data) {
        var stack1, alias1 = this.lambda, alias2 = this.escapeExpression;
        return '<video poster="' + alias2(alias1((stack1 = (stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.images : stack1) != null ? stack1.standard_resolution : stack1) != null ? stack1.url : stack1, depth0)) + '" src="' + alias2(alias1((stack1 = (stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.videos : stack1) != null ? stack1.standard_resolution : stack1) != null ? stack1.url : stack1, depth0)) + '" preload="false" loop webkit-playsinline></video>';
    },
    '9': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info"> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasOrigin : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(10, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasMeta : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(15, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasContent : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(25, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div> ';
    },
    '10': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-origin"> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.username : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(11, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.instagramLink : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(13, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div> ';
    },
    '11': function (depth0, helpers, partials, data) {
        var stack1, alias1 = this.lambda, alias2 = this.escapeExpression;
        return ' <a href="https://instagram.com/' + alias2(alias1((stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.user : stack1) != null ? stack1.username : stack1, depth0)) + '" target="_blank" rel="nofollow" class="instashow-popup-media-info-author"><span class="instashow-popup-media-info-author-picture"><img src="' + alias2(alias1((stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.user : stack1) != null ? stack1.profile_picture : stack1, depth0)) + '" alt=""/></span> <span class="instashow-popup-media-info-author-name">' + alias2(alias1((stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.user : stack1) != null ? stack1.username : stack1, depth0)) + '</span></a> ';
    },
    '13': function (depth0, helpers, partials, data) {
        var stack1, alias1 = this.lambda, alias2 = this.escapeExpression;
        return ' <a href="' + alias2(alias1((stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.link : stack1, depth0)) + '" target="_blank" rel="nofollow" class="instashow-popup-media-info-original">' + alias2(alias1((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.viewOnInstagram : stack1, depth0)) + '</a> ';
    },
    '15': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-meta"> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasProperties : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(16, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.passedTime : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(23, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div> ';
    },
    '16': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-properties"> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.likesCounter : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(17, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.commentsCounter : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(19, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasLocation : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(21, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div> ';
    },
    '17': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-popup-media-info-properties-item"><span class="instashow-icon instashow-icon-like"></span> <em>' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.likesCount : stack1, depth0)) + '</em></span> ';
    },
    '19': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-popup-media-info-properties-item"><span class="instashow-icon instashow-icon-comment"></span> <em>' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.commentsCount : stack1, depth0)) + '</em></span> ';
    },
    '21': function (depth0, helpers, partials, data) {
        var stack1;
        return '<span class="instashow-popup-media-info-properties-item-location instashow-popup-media-info-properties-item"><span class="instashow-icon instashow-icon-placemark"></span> <em>' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.location : stack1, depth0)) + '</em></span> ';
    },
    '23': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-passed-time">' + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.passedTime : stack1, depth0)) + '</div> ';
    },
    '25': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-content"> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasDescription : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(26, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasComments : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(28, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div> ';
    },
    '26': function (depth0, helpers, partials, data) {
        var stack1, alias1 = this.lambda, alias2 = this.escapeExpression;
        return '<div class="instashow-popup-media-info-description"><a href="https://instagram.com/' + alias2(alias1((stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.user : stack1) != null ? stack1.username : stack1, depth0)) + '" target="_blank" rel="nofollow">' + alias2(alias1((stack1 = (stack1 = depth0 != null ? depth0.media : depth0) != null ? stack1.user : stack1) != null ? stack1.username : stack1, depth0)) + '</a> ' + ((stack1 = alias1((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.description : stack1, depth0)) != null ? stack1 : '') + '</div> ';
    },
    '28': function (depth0, helpers, partials, data) {
        var stack1;
        return ' ' + ((stack1 = this.lambda((stack1 = depth0 != null ? depth0.info : depth0) != null ? stack1.comments : stack1, depth0)) != null ? stack1 : '') + ' ';
    },
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.comments : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(1, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '"><figure class="instashow-popup-media-picture' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.isVideo : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(3, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '"> ' + ((stack1 = helpers.unless.call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.isVideo : stack1, {
            'name': 'unless',
            'hash': {},
            'fn': this.program(5, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + ' ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.isVideo : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(7, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</figure> ' + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.options : depth0) != null ? stack1.hasInfo : stack1, {
            'name': 'if',
            'hash': {},
            'fn': this.program(9, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div>';
    },
    'useData': true
});
views['popup']['mediaComments'] = Handlebars.template({
    '1': function (depth0, helpers, partials, data) {
        var stack1, helper, alias1 = this.lambda, alias2 = this.escapeExpression;
        return '<div class="instashow-popup-media-info-comments-item"> <a href="https://instagram.com/' + alias2(alias1((stack1 = depth0 != null ? depth0.from : depth0) != null ? stack1.username : stack1, depth0)) + '" target="blank" rel="nofollow">' + alias2(alias1((stack1 = depth0 != null ? depth0.from : depth0) != null ? stack1.username : stack1, depth0)) + '</a> ' + ((stack1 = (helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing, typeof helper === 'function' ? helper.call(depth0, {
            'name': 'text',
            'hash': {},
            'data': data
        }) : helper)) != null ? stack1 : '') + '</div> ';
    },
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var stack1;
        return '<div class="instashow-popup-media-info-comments"> ' + ((stack1 = helpers.each.call(depth0, depth0 != null ? depth0.list : depth0, {
            'name': 'each',
            'hash': {},
            'fn': this.program(1, data, 0),
            'inverse': this.noop,
            'data': data
        })) != null ? stack1 : '') + '</div>';
    },
    'useData': true
});
views['popup']['root'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow instashow-popup"><div class="instashow-popup-wrapper"><div class="instashow-popup-container"><div class="instashow-popup-control-close"></div><div class="instashow-popup-control-arrow instashow-popup-control-arrow-previous"><span></span></div><div class="instashow-popup-control-arrow instashow-popup-control-arrow-next"><span></span></div></div></div></div>';
    },
    'useData': true
});
views['popup']['twilight'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        return '<div class="instashow-popup-twilight"></div>';
    },
    'useData': true
});
views['style'] = Handlebars.template({
    'compiler': [
        6,
        '>= 2.0.0-beta.1'
    ],
    'main': function (depth0, helpers, partials, data) {
        var helper, alias1 = helpers.helperMissing, alias2 = 'function', alias3 = this.escapeExpression;
        return '<style type="text/css">\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryBg || (depth0 != null ? depth0.colorGalleryBg : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryBg',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-media-counter,\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-media-info-counter {\n        color: ' + alias3((helper = (helper = helpers.colorGalleryCounters || (depth0 != null ? depth0.colorGalleryCounters : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryCounters',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-media-info-description {\n        color: ' + alias3((helper = (helper = helpers.colorGalleryDescription || (depth0 != null ? depth0.colorGalleryDescription : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryDescription',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-media-cover {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryOverlay || (depth0 != null ? depth0.colorGalleryOverlay : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryOverlay',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-scroll {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryScrollbar || (depth0 != null ? depth0.colorGalleryScrollbar : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryScrollbar',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-scroll-slider {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryScrollbarSlider || (depth0 != null ? depth0.colorGalleryScrollbarSlider : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryScrollbarSlider',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryArrowsBg || (depth0 != null ? depth0.colorGalleryArrowsBg : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryArrowsBg',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow:hover {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryArrowsBgHover || (depth0 != null ? depth0.colorGalleryArrowsBgHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryArrowsBgHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow::before,\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow::after {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryArrows || (depth0 != null ? depth0.colorGalleryArrows : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryArrows',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow:hover::before,\n    #instaShowGallery_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-gallery-control-arrow:hover::after {\n        background: ' + alias3((helper = (helper = helpers.colorGalleryArrowsHover || (depth0 != null ? depth0.colorGalleryArrowsHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorGalleryArrowsHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-twilight {\n        background: ' + alias3((helper = (helper = helpers.colorPopupOverlay || (depth0 != null ? depth0.colorPopupOverlay : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupOverlay',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media {\n        background: ' + alias3((helper = (helper = helpers.colorPopupBg || (depth0 != null ? depth0.colorPopupBg : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupBg',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-author {\n        color: ' + alias3((helper = (helper = helpers.colorPopupUsername || (depth0 != null ? depth0.colorPopupUsername : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupUsername',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-author:hover {\n        color: ' + alias3((helper = (helper = helpers.colorPopupUsernameHover || (depth0 != null ? depth0.colorPopupUsernameHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupUsernameHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' a.instashow-popup-media-info-original {\n        border-color: ' + alias3((helper = (helper = helpers.colorPopupInstagramLink || (depth0 != null ? depth0.colorPopupInstagramLink : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupInstagramLink',
            'hash': {},
            'data': data
        }) : helper)) + ';\n        color: ' + alias3((helper = (helper = helpers.colorPopupInstagramLink || (depth0 != null ? depth0.colorPopupInstagramLink : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupInstagramLink',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' a.instashow-popup-media-info-original:hover {\n        border-color: ' + alias3((helper = (helper = helpers.colorPopupInstagramLinkHover || (depth0 != null ? depth0.colorPopupInstagramLinkHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupInstagramLinkHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n        color: ' + alias3((helper = (helper = helpers.colorPopupInstagramLinkHover || (depth0 != null ? depth0.colorPopupInstagramLinkHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupInstagramLinkHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-properties {\n        color: ' + alias3((helper = (helper = helpers.colorPopupCounters || (depth0 != null ? depth0.colorPopupCounters : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupCounters',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-passed-time {\n        color: ' + alias3((helper = (helper = helpers.colorPopupPassedTime || (depth0 != null ? depth0.colorPopupPassedTime : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupPassedTime',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-content {\n        color: ' + alias3((helper = (helper = helpers.colorPopupText || (depth0 != null ? depth0.colorPopupText : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupText',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-content a {\n        color: ' + alias3((helper = (helper = helpers.colorPopupAnchor || (depth0 != null ? depth0.colorPopupAnchor : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupAnchor',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-info-content a:hover {\n        color: ' + alias3((helper = (helper = helpers.colorPopupAnchorHover || (depth0 != null ? depth0.colorPopupAnchorHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupAnchorHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow span::before,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow span::after,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close::before,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close::after {\n        background: ' + alias3((helper = (helper = helpers.colorPopupControls || (depth0 != null ? depth0.colorPopupControls : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupControls',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow:hover span::before,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow:hover span::after,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close:hover::before,\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close:hover::after {\n        background: ' + alias3((helper = (helper = helpers.colorPopupControlsHover || (depth0 != null ? depth0.colorPopupControlsHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupControlsHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-video::before {\n        color: ' + alias3((helper = (helper = helpers.colorPopupControls || (depth0 != null ? depth0.colorPopupControls : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupControls',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-video:hover::before {\n        color: ' + alias3((helper = (helper = helpers.colorPopupControlsHover || (depth0 != null ? depth0.colorPopupControlsHover : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupControlsHover',
            'hash': {},
            'data': data
        }) : helper)) + ';\n    }\n\n    @media only screen and (max-width: 1024px) {\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close {\n            background: ' + alias3((helper = (helper = helpers.colorPopupMobileControlsBg || (depth0 != null ? depth0.colorPopupMobileControlsBg : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupMobileControlsBg',
            'hash': {},
            'data': data
        }) : helper)) + ';\n        }\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow span::before,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow span::after,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close::before,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close::after,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow:hover span::before,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-arrow:hover span::after,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close:hover::before,\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-control-close:hover::after {\n            background: ' + alias3((helper = (helper = helpers.colorPopupMobileControls || (depth0 != null ? depth0.colorPopupMobileControls : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupMobileControls',
            'hash': {},
            'data': data
        }) : helper)) + ';\n        }\n\n        #instaShowPopup_' + alias3((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'id',
            'hash': {},
            'data': data
        }) : helper)) + ' .instashow-popup-media-video::before {\n            color: ' + alias3((helper = (helper = helpers.colorPopupMobileControls || (depth0 != null ? depth0.colorPopupMobileControls : depth0)) != null ? helper : alias1, typeof helper === alias2 ? helper.call(depth0, {
            'name': 'colorPopupMobileControls',
            'hash': {},
            'data': data
        }) : helper)) + ';\n        }\n    }\n</style>';
    },
    'useData': true
});
module.exports = views;
},{}]},{},[5])