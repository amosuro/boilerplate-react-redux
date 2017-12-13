declare var require:any;
const moment = require('moment');
/*
 Convert Symphony timestamp to readable time format
 */
export function convertTime(timestamp: number): string {
    return moment.unix(timestamp / 1000).format('DD MMM YYYY, HH:mm');
}
/*
 Convert Symphony Markup into a react-style html element for dangerouslySet..
 */
export function createMarkup(html) {
    html = html.replace(/(#[^\s<]+)/g, '<a class="post-tag-link secondary-tag">$1</a>'); // secondary-tag its just a markup class to find the element
    html = html.replace(/(\$[^\s<]+)/g, '<a class="post-tag-link cashtag">$1</a>'); // secondary-tag its just a markup class to find the element
    return { __html: html }
}

export function isEmpty(string: string) {
    return (string.length === 0 || !string.trim());
}