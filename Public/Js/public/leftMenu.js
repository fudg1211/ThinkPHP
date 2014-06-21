/**
 * Created with IntelliJ IDEA.
 * User: huangjianhua
 * Date: 14-05-27
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['../global/global'], function (g) {
	var LeftController = FishMVC.View.extend({
		init: function () {
//			var menuCurrent = {
//				extensionProduct:['listCpsTheme','toGetKeywordLink'],
//				ReportMenu:['listCpsEffectReport'],
//				PickMoneyMenu:['extractCommission']
//			};

			var menuCurrent = [
				['listCpsTheme.do', 'toGetKeywordLink.do'],
				'listCpsEffectReport.do',
				'extractCommission.do'
			];

			var select = [];

			(function (menuArray, select) {
				for (var i = 0, len = menuArray.length; i < len; i += 1) {
					var a = menuArray[i];

					if (g.isString(a)) {
						if (document.URL.indexOf(a) >= 0) {
							select.push(i);
							return true;
						}
					} else {
						if (arguments.callee(a, select)) {
							select.push(i);
							return true;
						}
					}
				}
			}(menuCurrent, select));

			select.reverse();

			var getMenu ,
				list,
                symbol;
			if (select[0] === 0 || select[0]) {
				getMenu = this['getMenu'].eq(select[0]);
				list = getMenu.next('.menu-list');
                symbol = this.getMenu.children('.symbol');

				getMenu.addClass('current');
				if (list.length) {
					list.show();
                    if (symbol.text() === '-') {
                        symbol.text('+')
                    } else {
                        symbol.text('-')
                    }
				}
			}

			if (select[1] === 0 || select[1]) {
				list.children('a').eq(select[1]).addClass('selected');
			}
		},

		elements: {
			'#left-menu>li>a': 'getMenu'
		},
		
		events: {
			'click getMenu': 'doToggleMenu'
		},

		doToggleMenu: function (target) {
			var list = target.next('.menu-list'),
				symbol = target.children('.symbol');

			if (list.length) {
				target.toggleClass('selected');
				if (symbol.text() === '-') {
					symbol.text('+')
				} else {
					symbol.text('-')
				}

				list.toggle(10);
			}
		}

	});
	var leftController = new LeftController();
});
