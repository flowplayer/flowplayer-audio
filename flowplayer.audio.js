/*jslint browser: true, node: true */
/*global window */

/*!

   Audio plugin for Flowplayer HTML5

   Copyright (c) 2016, Flowplayer Drive Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   Requires Flowplayer HTML5 version 6.x or greater
   $GIT_DESC$

*/
(function () {
    "use strict";
    var extension = function (flowplayer) {

        flowplayer(function (api, root) {
            var conf = flowplayer.extend(api.conf, api.conf.clip),
                common = flowplayer.common;

            if (conf.audioOnly || common.hasClass(root, "is-audio-only")) {
                var bean = flowplayer.bean,
                    coreV6 = flowplayer.version.indexOf("6.") === 0,
                    controls = common.find(".fp-controls", root)[0],
                    timeline = common.find(".fp-timeline", root)[0],
                    bgcolor = "background-color",
                    removalClasses = coreV6
                        ? ["fp-embed", "fp-fullscreen", "fp-help", "fp-speed", "fp-title", "fp-waiting"]
                        : ["fp-pause", "fp-play"],
                    audioOnlyClasses = ["is-audio-only-7x", "is-audio-only", "is-mouseover"];


                if (coreV6) {
                    audioOnlyClasses = audioOnlyClasses.slice(1).concat(["fixed-controls", "play-button"]);
                }

                removalClasses.unshift("fp-ratio");
                removalClasses.forEach(function (cls) {
                    common.removeNode(common.find("." + cls, root)[0]);
                });

                bean.off(root, "mouseenter");
                bean.off(root, "mouseleave");

                flowplayer.extend(api.conf, {
                    fullscreen: false,
                    tooltip: false
                });

                audioOnlyClasses.forEach(function (cls) {
                    common.addClass(root, cls);
                });
                common.removeClass(root, "is-mouseout");
                if (coreV6) {
                    common.css(root, "margin-bottom", common.css(controls, "height"));
                } else {
                    if (/^(transparent|rgba\(0,\ 0,\ 0,\ 0\))$/.test(common.css(controls, bgcolor))) {
                        common.css(controls, bgcolor, "#bbb");
                    }
                    // make room for timestamp
                    common.css(root, "height", (common.height(controls) + 30) + "px");
                    common.css(root, "margin-top", "-30px");
                }

                if (!coreV6) {
                    bean.on(common.find(".fp-ui", root)[0], "click", function (e) {
                        if (common.hasClass(e.target, "fp-ui")) {
                            e.stopPropagation();
                        }
                    });
                    api.on("load.audioonly", function () {
                        // reveal timeline
                        common.css(timeline, bgcolor, "");
                    });
                }
                api.on("unload.audioonly", function () {
                    common.find(".fp-elapsed", root)[0].innerHTML = "00:00";
                    if (!coreV6) {
                        // do not show timeline in splash state
                        common.css(timeline, bgcolor, common.css(controls, bgcolor));
                    }
                });

            } else {
                var playerElem = common.find(".fp-player", root)[0],
                    removeAudioStyling = function () {
                        common.removeClass(root, "is-audio");
                        common.css(playerElem, "background-image", "");
                    };

                api.on("ready.audio", function (e, api, media) {
                    if (media.audio || (!media.index && conf.audio)) {
                        var coverImage = (media && media.coverImage) || (!media.index && conf.coverImage);

                        common.addClass(root, "is-audio");
                        if (coverImage) {
                            common.css(playerElem, "background-image", "url(" + coverImage + ")");
                        }
                    } else {
                        removeAudioStyling();
                    }

                }).on("unload.audio", removeAudioStyling);
            }
        });
    };
    if (typeof module === 'object' && module.exports) {
        module.exports = extension;
    } else if (window.flowplayer) {
        extension(window.flowplayer);
    }
}());
