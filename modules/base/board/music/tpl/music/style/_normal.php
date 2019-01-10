<div class="bd_lst_wrp">
  <div class="tl_srch clear">
	 <div class="bd_faq_srch">
		<form method="get" onsubmit="return procFilter(this, search)">
		   <input type="hidden" name="act" value="">
		   <input type="hidden" name="vid" value="">
		   <input type="hidden" name="mid" value="story_free">
		   <input type="hidden" name="category" value="">
		   <table class="bd_tb">
			  <tbody>
				 <tr>
					<td>
					   <span class="select itx">
						  <select name="search_target">
							 <option value="title_content">제목+내용</option>
							 <option value="title">제목</option>
							 <option value="content">내용</option>
							 <option value="comment">댓글</option>
							 <option value="nick_name">닉네임</option>
							 <option value="tag">태그</option>
						  </select>
					   </span>
					</td>
					<td class="itx_wrp">
					   <input type="text" name="search_keyword" value="" class="itx srch_itx">
					</td>
					<td>
					   <button type="submit" onclick="jQuery(this).parents('form').submit();return false" class="bd_btn">검색</button>
					</td>
				 </tr>
			  </tbody>
		   </table>
		</form>
	 </div>
  </div>
  
  <table class="bd_lst bd_tb_lst bd_tb">
	 <caption class="blind">List of Articles</caption>
	 <thead class="bg_f_f9">
		<tr>
		   <th scope="col" class="no"><span><a href="/index.php?mid=story_free&amp;order_type=desc" title="내림차순">번호</a></span></th>
		   <th scope="col" class="title"><span><a href="/index.php?mid=story_free&amp;sort_index=title&amp;order_type=desc">제목</a></span></th>
		   <th scope="col"><span>글쓴이</span></th>
		   <th scope="col" class="m_no"><span><a href="/index.php?mid=story_free&amp;sort_index=voted_count&amp;order_type=desc">추천 수</a></span></th>
		   <th scope="col" class="m_no"><span><a href="/index.php?mid=story_free&amp;sort_index=readed_count&amp;order_type=desc">조회 수</a></span></th>
		   <th scope="col"><span><a href="/index.php?mid=story_free&amp;sort_index=regdate&amp;order_type=desc">날짜</a></span></th>
		</tr>
	 </thead>
	 <tbody>
		<?php foreach($this->board->query as $key=>$value): ?>
		<tr>
		   <td class="no">
		   
		   </td>
		   <td class="title">
			  <a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$value['srl'],'cpage','') ?>" class="hx">
				<?php echo mb_substr($value['title'],0,45); ?>
			  </a>
			  <a href="<?php echo str::getUrl(__MODULEID,$_GET[__MODULEID],'srl',$value['srl'],'cpage','') ?>" class="replyNum" title="댓글">4</a>
		   </td>
		   <td class="author"><span><a href="#popup_menu_area" class="member_360199" onclick="return false"><img src="http://madpeople.net/modules/point/icons/default_J/0.gif" alt="[레벨:0]" title="포인트:14노오력 (14%), 레벨:0/100" class="xe_point_level_icon" style="vertical-align:middle;margin-right:3px;"><?php echo $value['nick_name'];?></a></span></td>
		   <td class="m_no">0</td>
		   <td class="m_no">
			<?php echo $value['readed']; ?>
		</td>
		   <td class="time">
				<?php echo date("Y.m.d",strtotime($value['regdate'])); ?>
		   </td>
		</tr>
		<?php endforeach; ?>
	 </tbody>
  </table>
</div>