//define(["../jquery",'../peach'], function ($,peach) {
define([], function () {
    /**
     * @fileoverview
     * 页码生成器
     * @author huangjinxiu
     * @version 1.0
     ***
     * @param sDomElement  sDomElement，父级元素
     * @param oOptions  oOptions  系统参数
     * 						sOrigElem : 可选，'作cache的div元素'，当sFormAction为'javascript:void(0);'时，这个必填,
    *				        sPagiElem : '生成页码放置的div元素',
    *				        sItemWrapper : '页码元素',
    *				        iItemsPerPage : Integer 显示页码个数＋1,
    *				        sCurrentPage :  指向当前页的元素的className， 默认值'KMPCurrent',
    *				        sFormAction : string  需要跳转的页面的pathname。 默认值'javascript:void(0);'表示使用存储分页分别展示的形式,
    *				        totalPages : Integer 总页数,
    *				        iNowPage :  Integer 当前页码
     *
     * @param oRequestParams  页码的请求链接附带的参数  例如：{channel: 'girl'}
     * @returns Object
     */

    function Paginator(sDomElement, oOptions, oRequestParams) {
        var isCacheProvide = true;
        if (this === window) {
            // Paginator Must invoked with 'new' operator
            return;
        }
        if (!sDomElement) {
            return;
        }
        if (typeof oOptions.sOrigElem === 'undefined') {
            isCacheProvide = false;
        }
        this.oRequestParams = oRequestParams;

        var defaults = {
            sOrigElem: 'KMPCache',
            sPagiElem: 'KMPagination',
            sItemWrapper: 'li',
            iItemsPerPage: 10,
            sCurrentPage: 'KMPCurrent',
            sFormAction: 'javascript:void(0);',
            totalPages: 1,
            totalNums: 0,
            iNowPage: 1
        };
        $.extend(this, defaults, oOptions || {});

        this.$DestElem = $(sDomElement);
        if (isCacheProvide) {
            this.$OrigElem = $(this.sOrigElem);
        } else {
            this.$OrigElem = $('<div class="' + this.sOrigElem + '"></div>');
            this.$OrigElem.insertAfter(this.$DestElem);
        }
        if (this.totalPages == '' || this.totalPages == 'undefined') {
            this.totalPages = 1;
        }
        if (this.iNowPage == '' || this.iNowPage == 'undefined') {
            this.iNowPage = 1;
        }
        this.totalPages = parseInt(this.totalPages);
        this.iNowPage = parseInt(this.iNowPage);
        this.isDetailPage = false;
        this.$PagiElem = $(this.sPagiElem);
        if (this.sFormAction === 'javascript:void(0);') {
            this.isDetailPage = true;
            this.items = this.$OrigElem.find(this.sItemWrapper);
            this.totalItems = this.items.length;
            if (this.totalItems === 0) {
                return;
            }
            this.totalPages = Math.ceil(this.totalItems / this.iItemsPerPage);
        }
        this.oData = {};
        $.extend(this.oData, this.oRequestParams);
        this.params = '';
        var self = this;
        $.each(this.oData, function (name, value) {
            if (value !== '' && value != undefined && value != null && value != 'undefined'&& value != 'null') {
                self.params += '&' + name + '=' + value;
            }
        });
        this.init();
    }

    Paginator.prototype.init = function () {
        if (this.$DestElem.length > 0) {
            this.showPages(this.iNowPage);
            if (this.isDetailPage) {
                this.PageEventRegister();
            }
        }
    };

    Paginator.prototype.preventFormSubmit = function (event) {
		event = (event) ? event : ((window.event) ? window.event : "");
		if (!event)
			return;
		if (event.preventDefault) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.returnValue = false;
			event.cancelBubble = true;
		}
	}

    Paginator.prototype.pageEnterPress = function (evt) {
    	evt = (evt) ? evt : ((window.event) ? window.event : "");
		if(!evt) return;
		keyCode = evt.keyCode ? evt.keyCode : (evt.which ? evt.which : evt.charCode);
		if (keyCode == 13) {
			var node = evt.currentTarget || evt.srcElement;
			if(this.pageParamsEncode(node,evt)){
				return false;
			}
			this.preventFormSubmit(evt);
			return;
		}
    }
	/**
	    * @description 表单提交
	    */
	Paginator.prototype.doPageClick = function (evt){
		var node = evt.currentTarget || evt.srcElement;
		if(this.pageParamsEncode($(node).siblings('.J_topage'),evt)){
			return true;
		}else{
			this.preventFormSubmit(evt);
			return false;
		}
	}
    /**
         * @description 内容编码
         */
    Paginator.prototype.pageParamsEncode = function (ele,evt){

    	var isEmpty = function (value) {
            return (/^\s*$/).test(value);
        },
        isInteger = function (value) {
            if (isEmpty(value))
                return true;
            if (value == '0')
                return true;
            return (/^[0-9]*[1-9][0-9]*$/).test(value);
        },
        rangeFloat = function (value, min, max) {
            if (isEmpty(value))
                return true;
            value = parseFloat(value);
            return min <= value && value <= max;
        };

    	var ipage = $(ele).val();
     	if (!isInteger(ipage)) {
     		alert("请输入数字");
     		return false;
     	}
     	if (!rangeFloat(ipage, 1, this.totalPages)) {
     		alert("请输入的数字在［1，" + this.totalPages + "］范围内！");
     		$(ele).val('1');
     		return false;
     	}
     	var sHref = this.sFormAction + '?currentPage=' + ipage + this.params;
     	window.location.href = sHref;
     	return true;
	}

    Paginator.prototype.turnPages = function (iipage) {
        if (this.isDetailPage) {
            this.gotoPage(iipage);
            this.showPages(iipage);
            this.PageEventRegister();
        }
    }

    Paginator.prototype.showPages = function (page) {
        var self = this,
			sType = 'num';

        if (this.totalPages <= 1) {
            return;
        }
        this.$PagiElem.empty();

        if (this.totalPages <= 9) {
            for (var i = 1; i <= this.totalPages; i++) {
                generateHelper(page, i, sType);
            }
            generateInlinePage(page - 1, '上一页');
            generateInlinePage(page + 1, '下一页');
            if(!!this.totalNums){
            	this.$PagiElem.append($('<span class="page-count mr05">共 ' + this.totalNums + ' 条记录</span>'));
            }
        } else {
            var aPages = this.generatePages(page);
            for (var i = 0; i < aPages.length; i++) {
                sType = (aPages[i] == '...') ? '...' : 'num';
                generateHelper(page, aPages[i], sType);
            }
            generateInlinePage(page - 1, '上一页');
            generateInlinePage(page + 1, '下一页');
            if(!!this.totalNums){
            	this.$PagiElem.append($('<span class="page-count mr05">共 ' + this.totalNums + ' 条记录</span>'));
            }
            this.$PagiElem.append($('<span class="page-count mr05">共 ' + this.totalPages + ' 页</span>'));

            this.$PagiElem.find('a').attr('hideFocus', true);

            generateSkipPage();

        }

        function generateSkipPage() {
            var sTopage = $('<span>  到 <input class="J_topage page-skip" type="text" name="currentPage" value=""/> 页 <input class="J_pageSubmit page-submit" type="submit" value="跳转" /> </span>');
            sTopage
            .find('.J_pageSubmit')
            .bind("click", function(event){
            	return self.doPageClick(event);
            })
            .end()
            .find('.J_topage')
//            .bind("keypress",peach.hitch(self, function(event){
//            	return this.pageEnterPress(event);
//            }));
//            使用hitch将this注册为想要的self，使用上面的方法，而不用hitch则使用下面的方法
            .bind("keypress",function(event){
            	return self.pageEnterPress(event);
            });
            self.$PagiElem.append(sTopage);
        }

        function generateInlinePage(ipage, text) {
            if (ipage >= 1 && ipage <= self.totalPages) {
                var appendText = $('<a class="nearpage mr05">' + text + '</a>');
                if (self.isDetailPage) {
                    appendText.bind('click', function () { self.turnPages(ipage); });
                } else {
                    var sHref = self.sFormAction + '?currentPage=' + ipage + self.params;
                    appendText.attr('href', sHref);
                }
                self.$PagiElem.append(appendText);
            }
        }

        function generateHelper(CurrentPage, iPage, type) {
            var sTag = 'a',
                sClassOfLink = '',
                oElem = '';

            sClassOfLink = (iPage == CurrentPage) ? 'mr05 ' + self.sCurrentPage : 'mr05';
            if (type === 'num') {
                sClassOfLink += ' pagination-page page' + iPage;
            } else {
                sClassOfLink += ' page-break';
                sTag = 'span';
            }
            oElem = $('<' + sTag + '/>');
            oElem.addClass(sClassOfLink).attr('hideFocus', true);
            if (!self.isDetailPage) {
                var sHref = '';
                sHref = self.sFormAction + '?currentPage=' + iPage + self.params;
                sTag === 'a' ? oElem.attr('href', sHref) : '';
            }
            oElem.text(iPage);
            self.$PagiElem.append(oElem);
        }

    };

    Paginator.prototype.generatePages = function (ipage) {
        var pages = [];
        var len = 9,
			flag = '',
			middle = Math.ceil(len / 2);

        for (var i = 0, j = 1; i < len; i++, j++) {
            flag = '' + j;
            if ((i == 1 && ipage > middle) || (i == 7 && ipage <= this.totalPages - middle)) {
                flag = '...';
            } else if (i == 2 && ipage > this.totalPages - middle) {
                j = this.totalPages - middle - 1;
                flag = '' + j;
            } else if (i == 2 && ipage <= this.totalPages - middle && ipage > middle) {
                j = ipage - 2;
                flag = '' + j;
            } else if (i == len - 1) {
                flag = '' + this.totalPages;
            }
            pages[i] = flag;
        }
        return pages;
    }

    Paginator.prototype.PageEventRegister = function () {
        var self = this;

        this.$PagiElem.find('a.pagination-page').click(function () {
            var iCursor = self.$PagiElem.find('a.pagination-page').index($(this));
            var cursorPage = 1;
            if (self.$PagiElem.find('a.pagination-page').length > 0) {
                cursorPage = parseInt(self.$PagiElem.find('a.pagination-page')[iCursor].innerHTML);
            }
            self.turnPages(cursorPage);
            return false;
        });
    }

    Paginator.prototype.gotoPage = function (i) {
        //this.getItemsFromVisible();
        this.clearVisible();
        //this.putItemsIntoCache();
        this.putItemsIntoVisible(i);
        $('html, body').animate({
            scrollTop: this.$DestElem.parent().offset().top
        }, 300);
    };

    Paginator.prototype.getItemsFromVisible = function () {
        return this.$DestElem.find(this.sItemWrapper);
    };

    Paginator.prototype.clearVisible = function () {
        this.$DestElem.find(this.sItemWrapper).detach();
    };

    Paginator.prototype.putItemsIntoCache = function () {
        var iCursor = this.$PagiElem.find('a').index($('.' + this.sCurrentPage)),
	        iIndex = iCursor * this.iItemsPerPage,
	        $visibleItems = this.getItemsFromVisible();
        if (iIndex === 0) {
            $visibleItems.prependTo(this.$OrigElem);
            return;
        }
        $visibleItems.insertAfter(this.$OrigElem[iIndex]);
    };

    Paginator.prototype.putItemsIntoVisible = function (page) {
        var iIndex = (page - 1) * this.iItemsPerPage,
	        len = iIndex + this.iItemsPerPage,
	        aItems = this.$OrigElem.find(this.sItemWrapper);
        for (; iIndex < len && iIndex < this.totalItems; iIndex++) {
            var perPage = aItems[iIndex];
            this.$DestElem.append($(perPage).clone());
        }
    };
    return Paginator;
});