"use strict";
exports.__esModule = true;
var react_1 = require("react");
//material-ui styles
var Add_1 = require("@mui/icons-material/Add");
var material_1 = require("@mui/material");
var Home = function () {
    return (react_1["default"].createElement("div", { className: "home__page" },
        react_1["default"].createElement("div", { className: "home__header" },
            react_1["default"].createElement("div", { className: 'home__header__logo' },
                react_1["default"].createElement("img", { src: process.env.PUBLIC_URL + "/logo.png", alt: "no image" })),
            react_1["default"].createElement("div", { className: "home__header__add" },
                react_1["default"].createElement(material_1.Button, { variant: "contained", style: {
                        backgroundColor: "rgb(204 146 58)"
                    }, startIcon: react_1["default"].createElement(Add_1["default"], { style: { fontSize: "1.2em", padding: "0 0 0.1em 0.5em" } }) }, "Create"))),
        react_1["default"].createElement("div", { className: "home__main" },
            react_1["default"].createElement("h3", { className: "home-title" }, "Ask. Discuss. Vote. Agree."),
            react_1["default"].createElement("div", { className: "para-home" }, "Learn About The Decision-Making Tool"),
            react_1["default"].createElement("div", { className: "para-home" }, "How It Works And How Your Vote"),
            react_1["default"].createElement("div", { className: "para-home" }, "Can Make A Difference"),
            react_1["default"].createElement("img", { className: "home-img", src: process.env.PUBLIC_URL + "/home-image.png", width: "100%", alt: "no image" }),
            react_1["default"].createElement("div", { className: "home__learnMore" },
                react_1["default"].createElement(material_1.Button, { variant: "outlined", style: { color: "#34aef0" } }, "Learn More")))));
};
exports["default"] = Home;
