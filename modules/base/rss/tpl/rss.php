<?php echo '<?xml version="1.0" encoding="UTF-8"?>';?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>RSS</title>
        <link>http://localhost</link>
        <description>최신글</description>
	<?php foreach($this->rss->result as $i): ?>
        <item>
            <title><?php echo $i['title']?></title>
            <link>http://localhost</link>
            <description><?php echo $i['content']?></description>
            <author>Exuscms</author>
            <pubDate><?php echo date('D, d M Y H:i:s O', strtotime($i['regdate']))?></pubDate>
        </item>
	<?php endforeach;?>
    </channel>
</rss>