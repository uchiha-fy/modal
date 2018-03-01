$(function () {
    var self={
        dom:{},
        api:{},
        style:{     // self.dom.ctx 的样式
            width:220
        }
    };

    // 创建dom
    self.dom.modal=$('<div></div>',{'id':'modal'}).appendTo($('body'));
    self.dom.bg=$('<div></div>',{'class':'modal-bg'}).appendTo(self.dom.modal);
    self.dom.ctx=$('<div></div>',{'class':'modal-content','id':'modalContent'}).appendTo(self.dom.modal).css(self.style);
    self.dom.close=$('<span></span>',{'class':'modal-close'}).html('x');
    self.dom.title=$('<div></div>',{'class':'modal-title'}).appendTo(self.dom.ctx).append($('<p></p>',{'id':'modalTitle'}).html('温馨提示')).append(self.dom.close);
    self.dom.tip=$('<p></p>',{'id':'modalTip','class':'modal-tip'});
    self.dom.text=$('<div></div>',{'class':'modal-text'}).appendTo(self.dom.ctx).append(self.dom.tip);
    self.dom.sure=$('<span></span>',{'class':'modal-button modal-sure'}).html('确定');
    self.dom.cancel=$('<span></span>',{'class':'modal-button modal-cancel'}).html('取消');
    self.dom.buttons=$('<div></div>',{'class':'modal-buttons'}).appendTo(self.dom.ctx).append(self.dom.cancel).append(self.dom.sure);

    // 引入css
    $('<link>').attr({rel:'stylesheet',type:'text/css',href:'modal/modal.css?v=0.0.1'}).appendTo($('head'));

    // 配置api
    self.api.closeModal=function(){
        self.dom.modal.stop(true).fadeOut(500,function(){
            self.dom.tip.html('');
        });
    }
    // 绑定事件
    // 默认隐藏取消按钮
    self.dom.close.on('click',self.api.closeModal);
    self.dom.cancel.on('click',self.api.closeModal).hide();
    self.dom.sure.on('click',self.api.closeModal);

    self.api.resetStyle=function(){
        self.dom.tip.attr({'class':'modal-tip','style':''});
        self.dom.ctx.attr({'style':''}).css(self.style);
    }
    self.api.openModal=function(sHtml, style, hasCancel, sureFn){ // style可以为类名或{width:xxx}
        self.api.resetStyle();
        switch(typeof style){
            case 'string':
                if(style.trim()!==''){
                    var iW;
                    self.dom.tip.addClass(style);
                    iW=self.dom.tip.css('width');
                    if(iW>self.style.width){
                        self.dom.ctx.width(iW);
                    }
                }
                break;
            case 'object':
                if(JSON.stringify(style)!=="{}"){
                    self.dom.tip.css(style);
                    if(style.width&&style.width>self.style.width){
                        self.dom.ctx.width(style.width);
                    }
                }
                break;
            default:
                console.log('openModal实参style输入有误！');
        }
        if(hasCancel){
            self.dom.cancel.show();
            self.dom.buttons.addClass('double');
            self.dom.sure.off('click').on('click',function(){
                sureFn&&sureFn();
                self.api.closeModal();
            });
        }else{
            self.dom.cancel.hide();
            self.dom.buttons.removeClass('double');
            self.dom.sure.off('click').on('click',self.api.closeModal);
        }
        self.dom.tip.html(sHtml);
        self.dom.modal.stop(true).fadeIn(500);
    }

    // 提供接口(全局 Modal)
    window.Modal = self;
});
