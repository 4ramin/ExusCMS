(function(){var e,n,s,r={}.hasOwnProperty,p=function(e,n){function s(){this.constructor=e}for(var p in n)r.call(n,p)&&(e[p]=n[p]);return s.prototype=n.prototype,e.prototype=new s,e.__super__=n.prototype,e};e=jQuery,s='<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>',n=function(n){function r(){return r.__super__.constructor.apply(this,arguments)}return p(r,n),r.prototype.template=function(n){var p;return(p=r.__super__.template.apply(this,arguments)).append(e(s)),p},r}(window.Messenger.Message),window.Messenger.themes.future={Message:n}}).call(this);