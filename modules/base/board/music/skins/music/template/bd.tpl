{#foreach $T as Row}
<li>
   <div class="tmb_wrp ribbon_v fin_load">
      <div class="tmb" style="background-image:url({$T.Row.img_url})" alt=""></div>
      <div class="genre_ech">
      </div>
      <div class="cate_ech">{#if $T.Row.category == 1}OP{#/if}{#if $T.Row.category == 2}ED{#/if}{#if $T.Row.category == 3}OST{#/if}{#if $T.Row.category == 4}캐릭터송{#/if}{#if $T.Row.category == 5}삽입곡{#/if}{#if $T.Row.category == 6}보컬{#/if}{#if $T.Row.category == 7}OP/ED{#/if}{#if $T.Row.category == 8}리믹스{#/if}{#if $T.Row.category == 9}게임{#/if}{#if $T.Row.category == 10}컬렉션{#/if}{#if $T.Row.category == 11}우타이테{#/if}{#if $T.Row.category == 12}동방프로젝트{#/if}{#if $T.Row.category == 13}보컬로이드{#/if}{#if $T.Row.category == 14}싱글{#/if}{#if $T.Row.category == 15}드라마 CD{#/if}</div>
      <div class="autor_search"><a style="color:#C7D9F9"><i class="fa fa-hashtag" aria-hidden="true"></i> </a><a href="{$T.Row.artist_href}" class="autor navi_page">{$T.Row.artist}</a></div>
      <a class="hx fixed view_bd" data-pjax="true" href="{$T.Row.href}"></a>	
   </div>
   <p>
      <a href="{$T.Row.href}">
      <b class="title_album">
      {$T.Row.title}
      </b>
      </a>
   </p>
   <div class="sm2_btn wrapper">
      <a href="{$T.Row.mp3_url}" class="sm2_button"></a>
      <div class="tooltip">재생</div>
   </div>
   <!--Download-->
   <div class="dbt3 wrapper">
      <a target_music="/hikaru/file/attach/28309/a7bac1e1a43a2e598c245a1f4ea180f0.mp3" target_srl="{$T.Row.srl}" target_origin="02. Opening.mp3.mp3" onclick="proc.playlist(this)">
      <i style="color:#fff" class="fa fa-plus"></i></a>
      <div class="tooltip">재생목록에 추가</div>
   </div>
   <div class="dbt wrapper">
      <a href="?mid=files&amp;act=FileDownload&amp;download=28309&amp;target=a7bac1e1a43a2e598c245a1f4ea180f0.mp3&amp;key=95f19a25ef9ba51b9012e5a286511645">
      <i style="color:#fff" class="fa fa-music"></i></a>
      <div class="tooltip">음악 다운로드 : 0</div>
   </div>
   <div class="dbt2 wrapper">
      <a href="?mid=files&amp;act=FileDownload&amp;download=28309&amp;target=dcbdfd74dbc950128110851f2a8689c2.jpg&amp;key=95f19a25ef9ba51b9012e5a286511645">
      <i style="color:#fff" class="fa fa-camera"></i></a>
      <div class="tooltip">커버 다운로드 : 0</div>
   </div>
</li>
{#/for}