/**
 * @name		Parallax Background Widget for Template Creator CK
 * @copyright	Copyright (C) 2016. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 * @author		Cedric Keiflin - https://www.template-creator.com - https://www.joomlack.fr
 */

(function($) {
	var TCK_ParallaxBackground = function(container, options) {
		var defaults = {
			speed: '5'			// speed factor
		};

		if (container == '#body') container = document.body;
		var opts = $.extend(defaults, options);
		var els = $(container);
		var $window = $(window);

		els.each(function() {
			var el = $(this);
			var bgimage = el.css('background-image');

			if (bgimage == 'none' && el.find('> .inner').length) {
				new TCK_ParallaxBackground(el.find('> .inner'), opts);
				return;
			}

			el.css({
				'background-position': 'center 0px',
				'background-size': 'cover',
				'background-attachment': 'fixed'
			});

			moveElement(el);
			$window.bind('scroll load', function() { moveElement(el); });
			$window.bind('resize', function() { moveElement(el); });
		});

		function moveElement(el) {
			var winY = $window.scrollTop();
			el.top = el.offset().top;
			el.height = el.outerHeight();

			// check if totally above or totally below viewport
			if (
				el.top + el.height < winY // bottom of element is over top of screen
				|| el.top > winY + $window.height() // top of element is under bottom of screen
				) {
				return;
			}

			var bgy = - Math.round( ((winY - el.top ) ) ) - winY * opts.speed / 100;
			// move the background image
			el.css('background-position', "center " + bgy/10 + "px");
		}
	};
	window.TCK_ParallaxBackground = TCK_ParallaxBackground;
})(jQuery);