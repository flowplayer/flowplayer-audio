/*jslint browser: true, node: true */
/*global window */

/*!

   Audio plugin for Flowplayer HTML5

   Copyright (c) 2016, Flowplayer Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   requires:
   - Flowplayer HTML5 version 6.x or greater
   revision: $GIT_ID$

*/
(function () {
    "use strict";
    var extension = function (flowplayer) {

        flowplayer(function (api, root) {
            var conf = flowplayer.extend(api.conf, api.conf.clip),
                common = flowplayer.common;

            if (conf.audioOnly || common.hasClass(root, "is-audio-only")) {
                var bean = flowplayer.bean,
                    audioOnlyClasses = ["fixed-controls", "is-mouseover", "is-audio-only", "play-button"];

                flowplayer.extend(api.conf, {
                    fullscreen: false,
                    tooltip: false
                });

                audioOnlyClasses.forEach(function (cls) {
                    common.addClass(root, cls);
                });
                common.removeClass(root, "is-mouseout");
                common.css(root, "margin-bottom", common.css(common.find(".fp-controls", root)[0], "height"));

                bean.on(root, "click.audioonly mouseleave.audioonly", function (e) {
                    if (e.type.indexOf("c") < 0) {
                        common.removeClass(root, "is-mouseout");
                        common.addClass(root, "is-mouseover");
                    } else if (api.splash) {
                        api.load();
                    }
                });

                api.on("unload.audioonly", function () {
                    var timeClasses = ["elapsed", "duration"];

                    timeClasses.forEach(function (cls) {
                        common.find(".fp-" + cls, root)[0].innerHTML = "00:00";
                    });
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
