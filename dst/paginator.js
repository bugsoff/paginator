"use strict";
const GUI = {
    stub: `<span class="stub">&hellip;</span>`,
    paginator: "nav",
    class_name: "paginator",
    parent: "body",
    active_page: (num) => `<span class="active">${num}</span>`,
    page: (start, num, url) => {
        url.searchParams.set("start", `${start}`);
        return `<a href="${url.href}">${num}</a>`;
    }
};
const ERROR = {
    no_parent: "Parent element does not exists!",
};
function showPagination(arg) {
    const defaults = {
        total: 1,
        per_page: 10,
        page: 1,
        neighbor_pages: 3,
        parent: GUI.parent,
        params: {},
    };
    arg = Object.assign({}, defaults, arg);
    let listHTML = "", neighbor_items = arg.neighbor_pages * arg.per_page, last_item = Math.ceil(arg.total / arg.per_page) * arg.per_page - 1, url = new URL(document.location.href);
    for (let param in arg.params) {
        url.searchParams.set(param, `${arg.params[param]}`);
    }
    console.log(url.search);
    if (arg.start == undefined) {
        arg.start = arg.page * arg.per_page;
    }
    if (arg.start >= arg.total) {
        arg.start = last_item - arg.per_page + 1;
    }
    else {
        arg.start = Math.floor(Math.max(0, arg.start * 1));
    }
    // first page + stub
    if (arg.start > neighbor_items) {
        listHTML += makePagelink(0, arg.start, arg.per_page, url);
        if (arg.start > neighbor_items + arg.per_page) {
            listHTML += GUI.stub;
        }
    }
    // active page + neighbors
    const before = Math.max(0, arg.start - neighbor_items), after = Math.min(arg.start + neighbor_items, last_item);
    for (let i = before; i <= after; i += arg.per_page) {
        listHTML += makePagelink(i, arg.start, arg.per_page, url);
    }
    // stub + last page
    if (arg.start < last_item - neighbor_items - arg.per_page) {
        if (arg.start < last_item - neighbor_items - arg.per_page * 2) {
            listHTML += GUI.stub;
        }
        listHTML += makePagelink(last_item - arg.per_page + 1, arg.start, arg.per_page, url);
    }
    // HTML render
    const nav = document.createElement(GUI.paginator);
    nav.className = GUI.class_name;
    nav.innerHTML = `${listHTML}`;
    const parent = document.querySelector(arg.parent);
    if (parent) {
        parent.append(nav);
    }
    else {
        console.log(ERROR.no_parent);
    }
}
const makePagelink = (current, start, per_page, url) => current == start
    ? GUI.active_page(Math.floor(current / per_page) + 1)
    : GUI.page(current, Math.floor(current / per_page) + 1, url);
