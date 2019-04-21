"use strict";

angular.module("app")
    .factory("blockerService",
        function ($timeout) {

            let spinner = new Spinner({
                lines: 17,
                length: 7,
                width: 2,
                radius: 13,
                corners: 1,
                rotate: 0,
                direction: 1,
                color: "#000000",
                speed: 1,
                trail: 70,
                shadow: false,
                hwaccel: true,
                className: "spinner",
                zIndex: 2e9
            }).spin();

            return {
                block: function () {

                    $timeout(function () {

                        $("body").block({
                            message: spinner.el,
                            css: {
                                border: "none",
                                width: "0px",
                                height: "0px"
                            },
                            overlayCSS: {
                                borderRadius: "0px",
                                background: "#0032C8",
                                opacity: 0.2
                            }
                        });
                    }, 100);
                },
                blockPart: function (selector) {

                    $timeout(function () {

                        $(selector).block({
                            message: spinner.el,
                            css: {
                                border: "none",
                                width: "0px",
                                height: "0px"
                            },
                            overlayCSS: {
                                borderRadius: "0px",
                                background: "#0032C8",
                                opacity: 0.2
                            }
                        });
                    }, 100);
                },
                unblock: function () {

                    $timeout(function () {

                        $("body").unblock();
                    }, 100);
                },
                unblockPart: function (selector) {

                    $timeout(function () {

                        $(selector).unblock();
                    }, 100);
                }
            };
        });