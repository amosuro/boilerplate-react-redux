declare var require: any;
const sax = require('sax');

function StringBuffer() {
    this.buffer = [];
}

StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};

StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};

function stripTagsOut(html: string) {
    const parser = sax.parser(false);

    const sb = new StringBuffer();
    parser.ontext = function (t) {
        sb.append(t);
    };

    parser.write('<div>' + html + '</div>').close(); // we need to make sure there is a root tag otherwise this doesn't work
    return sb.toString()
}

export {StringBuffer, stripTagsOut}