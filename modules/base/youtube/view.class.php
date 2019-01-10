<?php

	class youtube_view extends view_abstract implements viewInterface
	{
		
		function __construct()
		{
			parent::getHandler();
		}
		
		function init($args)
		{
			$this->youtube = $this->getProperty();
			return $this->youtube;
		}
		
		function dispViewList()
		{
			$youtubeID = "UCdCJ4c87CROwtUkLwx18mcA";
			$apiKey = "AIzaSyBiEBtzIXl4q8m9hnpfeoShCD9FSZHrpvE";
			$this->youtube->model->setAPIKey($apiKey);
			$data = $this->youtube->model->getChannelStatics($youtubeID);
			
			$this->youtube->data = new stdClass();
			$this->youtube->data->channelViewCounts = $this->youtube->model->getChannelViewCounts($youtubeID, $data);
			$this->youtube->data->channelLikeCounts = $this->youtube->model->getChannelLikeCounts($youtubeID, $data);
			$this->youtube->data->channelCommentCounts = $this->youtube->model->getChannelCommentCounts($youtubeID, $data);
			$this->youtube->data->channelSubscriberCounts = $this->youtube->model->getChannelSubscriberCounts($youtubeID, $data);
			$this->youtube->data->channelVideoCounts = $this->youtube->model->getChannelVideoCounts($youtubeID, $data);
			
			$this->youtube->data->videoList = $this->youtube->model->getChannelVideos($youtubeID, 50);
			
			$this->base->set('skin', sprintf("%s/youtubeinfo.php", $this->youtube->tpl_path));
		}
		
		
	}
?>