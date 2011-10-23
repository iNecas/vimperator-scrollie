//
// _scrollie.js
//
// LICENSE: {{{
//   Copyright (c) 2011 iNecas<necasik@gmail.com>
//
//     distributable under the terms of an MIT-style license.
//     http://www.opensource.jp/licenses/mit-license.html
// }}}
//
// PLUGIN INFO: {{{
var PLUGIN_INFO =
<VimperatorPlugin>
  <name>scrollie</name>
  <description>Hide scrollbar and show scroll indicator on scolling.</description>
  <minVersion>2.3pre</minVersion>
  <maxVersion>2.3</maxVersion>
  <author mail="necasik@gmail.com">iNecas</author>
  <license>MIT style license</license>
  <version>0.0.1</version>
  <detail><![CDATA[
    == Subject ==
    Hide original scrollbar to get most of the display and show a scrolling indicator
    to know there on the page you are.

    == ToDo ==
    >||
    set noscrollbar automaticly
    better look&feel
    use something like onScroll event
    ||<


  ]]></detail>

</VimperatorPlugin>;
// }}}

let self = liberator.plugins.scrollie = (function(){

  // Mappings  {{{
  mappings.addUserMap(
    [modes.NORMAL],
    ["j"],
    "Scroll down with scrollie",
    function(count){
      self.scrollieScrollBy(getScrollAmount() * (count || 1));
    },
    {
      count: true
    }
  );
  mappings.addUserMap(
    [modes.NORMAL],
    ["k"],
    "Scroll up with scrollie",
    function(count){
      self.scrollieScrollBy(getScrollAmount() * -(count || 1));
    },
    {
      count: true
    }
  );
  // }}}
  // PUBLIC {{{
  var PUBLICS = {
    scrollieScrollBy: function(moment) {
      win = Buffer.findScrollableWindow();
      destY =win.scrollY + moment;
      makeScrollTo(win.scrollX, destY);
      showScrollbar(destY);
    }
  }

  // }}}
  // PRIVATE {{{
  var next;
  var destY;
  var win;
  var interval;

  function getScrollAmount() { return 200; }

  function getWindowHeight() { return win.innerHeight; }

  function getPageHeight() { return content.document.documentElement.scrollHeight; }

  function showScrollbar(destY) {
      let elem = content.document.body;
      let indicator = elem.appendChild(elem.ownerDocument.createElement('div'));
      let ratio = getWindowHeight()/getPageHeight();
      let height = window.innerHeight*ratio;
      let scrollTop = Math.max(0, Math.min((destY*ratio), getWindowHeight()-height));
      let style = 'background-color: black;' +
                  'opacity: 0.5; z-index: 999;' +
                  'position: fixed;' +
                  'border: solid white 1px;'+
                  'top: '    +                   scrollTop + 'px;' +
                  'height: ' + height + 'px;' +
                  'right: '   +                   0 + 'px;' +
                  'width: '  +  5 + 'px';
      indicator.setAttribute('style', style);
      setTimeout(function() elem.removeChild(indicator), 500);
  };


  function makeScrollTo(x, y) win.scrollTo(x, y);
  // }}}
  return PUBLICS;
})();
// vim: sw=2 ts=2 et si fdm=marker:
