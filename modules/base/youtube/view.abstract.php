<?php

	abstract class view_abstract extends youtube
	{
		
		public function getProperty()
		{
			$this->property = new stdClass;
			$this->property->default_action = "dispViewList";
			$this->property->private_action = array("CheckDocument", "CheckPage", "ajaxCall");
			return $this->property;
		}
		
	}
?>