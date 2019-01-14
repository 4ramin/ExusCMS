<?php

	if (!defined("__FLOWER__")) exit();

	class image {
		
		static $gd_exist = FALSE;
		static $com_exist = FALSE;
		
		function __construct() {
			if (extension_loaded('imagick')) {
				$this->gd_exist = TRUE;
			}
			
			if (extension_loaded('COM')) {
				$this->com_exist = TRUE;
			}
		}
		
		//http://www.php.net/manual/en/function.imagecreatefromgif.php#104473
		public function is_animated_gif ($filename) {
			if ( ! ($fh = @fopen($filename, 'rb'))) {
				return false;
			}
			$count = 0;
			// an animated gif contains multiple "frames", with each frame having a
			// header made up of:
			// * a static 4-byte sequence (\x00\x21\xF9\x04)
			// * 4 variable bytes
			// * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)

			// We read through the file til we reach the end of the file, or we've found
			// at least 2 frame headers
			while (!feof($fh) && $count < 2) {
				$chunk = fread($fh, 1024 * 100); //read 100kb at a time
				$count += preg_match_all(
					'#\x00\x21\xF9\x04.{4}\x00(\x2C|\x21)#s',
					$chunk,
					$matches
				);
			}

			fclose($fh);
			return $count > 1;
		}
		
		/**
		 * hex(#ffffff) to rgb
		 *
		 * @param  string args->source
		 *
		 * return array
		 */
		public static function hex_to_rgb($args) {
			
			$src = $args->source;
			
			if (preg_match('/^#[A-Za-z0-9]{6}$/i',$src)) {
				$hex = substr($src, 2, strlen($src)-1);
				$r = hexdec(substr($hex,0,2));
				$g = hexdec(substr($hex,2,2));
				$b = hexdec(substr($hex,4,2));
				return array($r, $g, $b);
			} else {
				return FALSE;
			}
		}
		
		/**
		 * get blank image
		 *
		 * @param  int    args->width
		 * @param  int    args->height
		 * @param  int    args->red
		 * @param  int    args->green
		 * @param  int    args->blue
		 *
		 */
		public static function blank_image($args) {
			
			$width = $args->width;
			$height = $args->height;
			$red = $args->red;
			$green = $args->green;
			$blue = $args->blue;
			
			if (!isset($red)||!isset($green)||!isset($blue)) {
				$red = $green = $blue = "255";
			}
			
			$virtual_image = imagecreatetruecolor($width, $height);
			$background_color = imagecolorallocate($virtual_image, $red, $green, $blue);
			imagefilledrectangle($virtual_image,0,0,$width,$height,$background_color);
			imagecolortransparent($virtual_image, $background_color);
			$args = va::args();
			$args->source = $virtual_image;
			$virtual_image = self::virtualimage($args);
			
			return $virtual_image;
		}
		
		/**
		 * convert pdf to jpg
		 *
		 * @param  string  args->source
		 * @param  string  args->dest
		 *
		 */
		public static function pdf_to_jpg($args) {
			$src = $args->source;
			$dest = $args->dest;
			
			$imagick = new Imagick();
			$imagick->readImage($src);
			$imagick->writeImage($dest);
		}
		
		/**
		 * capture site
		 *
		 * @param  string  args->source
		 *
		 */
		public static function capture_site($args) {
			if ($this->com_exist == TRUE) {
				$src = $args->source;
				$browser = new COM("InternetExplorer.Application");
				$handle = $browser->HWND;
				$browser->Visible = true;
				$browser->Navigate($src);

				while($browser->Busy) {
					com_message_pump(4000);
				}
				
				return imagegrabwindow($handle, 0);
			}
		}
		
		public static function capture_screen() {
			return imagegrabscreen();
		}
		
		/**
		 * ignore image warning
		 */
		public static function ignore_warning() {
			ini_set('gd.jpeg_ignore_warning', true);
		}
		
		/**
		 * get exit info
		 *
		 * @param  string args->source
		 *
		 */
		public static function get_exif ($args) {
			$src = $args->source;
			return exif_read_data($src, 0, true);
		}
		
		/**
		 * get exit image
		 *
		 * @param  string args->source
		 * @param  string args->type
		 * @param  int    args->width
		 * @param  int    args->height
		 *
		 */
		public static function get_exif_thumbnail($args) {
			$src = $args->source;
			$width = $args->width;
			$height = $args->height;
			$type = $args->type;
			return exif_thumbnail($src, $width, $height, $type);
		}
		
		/**
		 * get image height
		 *
		 * @param  string args->source
		 *
		 */
		public static function get_height($args) {
			
			$src = $args->source;
			
			//make virtual image
			$args = va::args();
			$args->source = $src;
			$source_image = self::virtualimage($args);
			
			if (function_exists('exif_read_data')) {
				$exif = exif_read_data($source_image, 0, true);
				if (isset($exif['COMPUTED'])) {
					$tmp = $exif['COMPUTED'];
					return $tmp['Height'];
				}
			} else {
				return $imagesy($source_image);
			}
		}
		
		/**
		 * get image width
		 *
		 * @param  string args->source
		 *
		 */
		public static function get_width($args) {
			
			$src = $args->source;
			
			//make virtual image
			$args = va::args();
			$args->source = $src;
			$source_image = self::virtualimage($args);
			if (function_exists('exif_read_data')) {
				$exif = exif_read_data($source_image, 0, true);
				if (isset($exif['COMPUTED'])) {
					$tmp = $exif['COMPUTED'];
					return $tmp['Width'];
				}
			} else {
				return imagesx($source_image);
			}
		}
		
		public static function draw_line($args) {
			$white = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
			ImageLine($pic,$curX,$curY,$newX,$newY,$cRed); 
			imagedashedline($im, 50, 25, 50, 75, $white);
			$type = $args->type;
		}
		
		/**
		 * repeat image
		 *
		 * @param  string args->source
		 * @param  string args->image
		 * @param  int    args->width
		 * @param  int    args->height
		 *
		 */
		public static function repeat($args) {
			
			$source = $args->source;
			$image = $args->image;
			$width = $args->width;
			$height = $args->height;
			
			$args = va::args();
			$args->source = $source;
			$source = self::virtualimage($args);
			
			if (!$width) {
				$args_source = va::args();
				$args_source->source = $source;
				$width = $this->get_width($args_source);
			}
			
			if (!$height) {
				$args_source = va::args();
				$args_source->source = $source;
				$height = $this->get_height($args_source);
			}
			
			$args = va::args();
			$args->source = $image;
			$image = self::virtualimage($args);
			
			imagesettile($source, $image);
			imagefilledrectangle($source, 0, 0, $width, $height, IMG_COLOR_TILED);
		}

		/**
		 * draw inner circle
		 *
		 * @param  string args->source
		 * @param  int    args->red
		 * @param  int    args->green
		 * @param  int    args->blue
		 *
		 */
		public static function draw_ellipse($args) {
			
			$src = $args->source;
			$width = $args->width;
			$height = $args->height;
			$x = $args->x;
			$y = $args->y;
			$red = $args->red;
			$green = $args->green;
			$blue = $args->blue;
			
			//make virtual image
			$args = va::args();
			$args->source = $src;
			$source_image = self::virtualimage($args);
			
			$background_color = imagecolorallocate($source_image, $red, $green, $blue);
			$virtual_image = imagefilledellipse($source_image, $x, $y, $width, $height, $background_color);
			return $virtual_image;
		}
		
		/**
		 * rotate image
		 *
		 * @param  string args->source
		 * @param  int    args->degree
		 *
		 */
		public static function rotate($args) {

			$degrees = $args->degree;
			$src = $args->source;
			$type = $args->type;

			//make virtual image
			$args = va::args();
			$args->source = $src;
			$source_image = self::virtualimage($args);
			
			$virtual_image = imagerotate($virtual_image, $degrees, 0);
			
			return $virtual_image;
		}
		
		/**
		 * get virtual image
		 *
		 * @param  string args->source
		 *
		 */
		public static function virtualimage($args) {
			
			$src = $args->source;
			
			if (@is_array(getimagesize($src))) {
				//get virtual image
				$image_args = va::args();
				$image_args->source = $src;
				$virtual_image = self::create($image_args);
			} else {
				$finfo = getImageSize($src);
				if ($finfo === false) {
					return false;
				} else {
					//get file
					//if (file_exists($src)) {
						$virtual_image = $src;
					//} else {
					//	return FALSE;
					//}
				}
			}
			
			return $virtual_image;
		}
		
		/**
		 * flip image
		 *
		 * @param  string args->source
		 * @param  string args->type
		 *
		 */
		public static function flip($args) {
			
			$src = $args->source;
			$type = $args->type;

			$args = va::args();
			$args->source = $src;
			$virtual_image = self::virtualimage($args);
			
			switch($type) {
				case 'vertical':
					imageflip($virtual_image, IMG_FLIP_VERTICAL);
					break;
				case 'horizontal':
					imageflip($virtual_image, IMG_FLIP_HORIZONTAL);
					break;
				case 'both':
					imageflip($virtual_image, IMG_FLIP_BOTH);
					break;
			}
			
			return $virtual_image;
		}
		
		/**
		 * make image watermark
		 *
		 * @param  string args->source
		 * @param  string args->watermark
		 * @param  int    args->right
		 * @param  int    args->bottom
		 *
		 */
		public static function watermark($args) {
			
			$source = $args->source;
			$watermark = $args->watermark;
			$marge_right = $args->right;
			$marge_bottom = $args->bottom;
			
			//get origin image
			$image_args = va::args();
			$image_args->source = $source;
			$source_image = self::create($image_args);

			//get watermark image
			$image_args = va::args();
			$image_args->source = $watermark;
			$watermark = self::create($image_args);

			$watermark_x = imagesx($source_image) - imagesx($watermark) - $marge_right;
			$watermark_y = imagesy($source_image) - imagesy($watermark) - $marge_bottom;
			imagecopy($source_image, $watermark, $watermark_x, $watermark_y, 0, 0, imagesx($watermark), imagesy($watermark));

			return $source_image;
		}
		
		/**
		 * draw text in image
		 *
		 * @param  string args->source
		 * @param  string args->font
		 * @param  int    args->x
		 * @param  int    args->y
		 *
		 */
		public static function text_image($args) {
			
			$src = $args->source;
			
			$font = $args->font;
			if (!isset($font)) {
				$font = 0;
			}
			
			$red = $args->red;
			$green = $args->green;
			$blue = $args->blue;
			if (!isset($red) || !isset($green) || !isset($blue)) {
				$red = "0";
				$green = "0";
				$blue = "0";
			}
			
			$text = $args->text;
			
			$x = $args->x;
			if (!isset($x)) $x = 0;
			
			$y = $args->y;
			if (!isset($y)) $y = 0;
			
			//make virtual image
			$args = va::args();
			$args->source = $src;
			$virtual_image = self::virtualimage($args);
			
			$textcolor = imagecolorallocate($virtual_image, $red, $green, $blue);
			imagestring($virtual_image, $font, $x, $y, $text, $textcolor);
			
			return $virtual_image;
		}
		
		public static function pick($args) {
			$source = $args->source;
			$x = $args->x;
			$y = $args->y;
			
			//get origin image
			$image_args = va::args();
			$image_args->source = $source;
			$source_image = self::create($image_args);

			$rgb = imagecolorat($source_image, $x, $y);
			$r = ($rgb >> 16) & 0xFF;
			$g = ($rgb >> 8) & 0xFF;
			$b = $rgb & 0xFF;
			
			return array($r, $g, $b);
		}
		
		/**
		 * draw image
		 *
		 * @param  string args->source
		 * @param  string args->dest
		 * @param  image  args->image
		 *
		 */
		public static function draw($args) {
			
			$src = $args->source;
			$virtual_image = $args->image;

			$args_image = va::args();
			$args_image->image = $src;
			$format = self::getimgType($args_image);
			
			switch($format) {
				case 'image/jpeg':
					header("Content-Type: image/jpeg");
					imagejpeg($virtual_image);
					break;
				case 'image/png':
					header("Content-Type: image/png");
					imagepng($virtual_image);
					break;
				case 'image/bmp':
					header("Content-Type: image/bmp");
					imagebmp($virtual_image);
					break;
				case  'image/gif':
					header("Content-Type: image/gif");
					imagegif ($virtual_image);
					break;
				case  'image/wbmp':
					header("Content-Type: vnd.wap.wbmp");
					imagewbmp($virtual_image);
					break;
				case  'image/webp':
					header("Content-Type: image/webp");
					imagecreatefromwebp($virtual_image);
					break;
				case  'image/xbm':
					header("Content-Type: image/xbm");
					imagexbm($virtual_image);
					break;
				case  'image/gd':
					header("Content-Type: image/gd");
					imagegd($virtual_image);
					break;
				case  'image/gd2':
					header("Content-Type: image/gd2");
					imagegd($virtual_image);
					break;
			}
			
		}
		
		public static function getimgType($args) {
			$image = $args->image;

			$finfo = getimagesize($image);
			if ($finfo === false) {
				return false;
			}
			
			$format = $finfo['mime'];
			return $format;
		}
		
		/**
		 * make image
		 *
		 * @param  string args->source
		 * @param  string args->dest
		 * @param  image  args->image
		 *
		 */
		public static function make($args) {
			
			$src = $args->source;
			$dest = $args->dest;
			$virtual_image = $args->image;

			$args_image = va::args();
			$args_image->image = $src;
			$format = self::getimgType($args_image);
			
			switch ($format) {
				case 'image/jpeg':
					imagejpeg($virtual_image, $dest, 100); //default 75
					break;
				case  'image/png':
					imagepng($virtual_image, $dest);
					break;
				case  'image/gif':
					imagegif ($virtual_image, $dest);
					break;
				case  'image/wbmp':
					imagewbmp($virtual_image);
					break;
				case  'image/webp':
					imagecreatefromwebp($virtual_image);
					break;
				case  'image/xbm':
					imagexbm($virtual_image);
					break;
				case  'image/gd':
					imagegd($virtual_image);
					break;
				case  'image/gd2':
					imagegd2($virtual_image);
					break;
				default:
					return false;
			}
			
		}
		
		/**
		 * get virtual image
		 *
		 * @param  string args->source
		 *
		 */
		public static function create($args) {
			$src = $args->source;
			
			$args_image = va::args();
			$args_image->image = $src;
			$format = self::getimgType($args_image);
			$source_image = null;
			
			try {
				switch ($format) {
					case 'image/jpeg':
						if (extension_loaded('gd')) {
							$source_image = imagecreatefromjpeg($src);
						}
						break;
					case 'image/bmp':
						$source_image = imagecreatefrombmp($src);
						break;
					case 'image/png':
						if (extension_loaded('gd')) {
							$source_image = imagecreatefrompng($src);
						}
						break;
					case 'image/gif':
						if (extension_loaded('gd')) {
							$source_image = imagecreatefromgif ($src);
						}
						break;
					case 'image/webp':
						if (extension_loaded('gd')) {
							$source_image = imagecreatefromwebp($src);
						}
						break;
					default:
						return false;
				}
			} catch(Exception $e) {
				return false;
			}
			
			return $source_image;
		}
		
		/**
		 * filter image
		 *
		 * @param  string args->source
		 * @param  string args->type
		 *
		 */
		public static function filter($args) {
			
			$src = $args->source;
			$type = $args->type;
			$args1 = $args->args1;

			//make virtual image
			$args = va::args();
			$args->source = $src;
			$virtual_image = self::virtualimage($args);

			if (!isset($type) || $type=='reverse') {
				imagefilter($virtual_image, IMG_FILTER_NEGATE);
			} else if ($type=='gray') {
				imagefilter($virtual_image, IMG_FILTER_GRAYSCALE);
			} else if ($type=='edge') {
				imagefilter($virtual_image, IMG_FILTER_EDGEDETECT);
			} else if ($type=='emboss') {
				imagefilter($virtual_image, IMG_FILTER_EMBOSS);
			} else if ($type=='gaussian_blur') {
				imagefilter($virtual_image, IMG_FILTER_GAUSSIAN_BLUR);
			} else if ($type=='blur') {
				imagefilter($virtual_image, IMG_FILTER_SELECTIVE_BLUR);
			} else if ($type=='sketch') {
				imagefilter($virtual_image, IMG_FILTER_MEAN_REMOVAL);
			} else if ($type=='brightness') {
				//args1 = Brightness Level
				imagefilter($virtual_image, IMG_FILTER_BRIGHTNESS, $args1);
			} else if ($type=='brightness') {
				//args1 = Contrast Level
				imagefilter($virtual_image, IMG_FILTER_CONTRAST, $args1);
			} else if ($type=='brightness') {
				//args1 = Smoothness Level
				imagefilter($virtual_image, IMG_FILTER_SMOOTH, $args1);
			} else if ($type=='pixelate') {
				//arg1 = Block Size, arg2 = Pixelation Effect Mode
				imagefilter($virtual_image, IMG_FILTER_PIXELATE, $args1, $args2);
			} else if ($type=='colorize') {
				//arg1, arg2 & arg3 = red, blue, green / arg4 = alpha channel
				imagefilter($virtual_image, IMG_FILTER_COLORIZE, $args1, $args2, $args3);
			}

			return $virtual_image;
		}
		
		/**
		 * merge image
		 *
		 * @param  string args->source1
		 * @param  string args->source2
		 * @param  int    args->transparent
		 *
		 */
		public static function merge($args) {
			$src1 = $args->source1;
			$src2 = $args->source2;
			$transparent = $args->transparent;
			
			//make first image
			$image_args = va::args();
			$image_args->source = $src1;
			$source_image = self::create($image_args);
			
			//make second image
			$image_args = va::args();
			$image_args->source = $src2;
			$merge_image = self::create($image_args);
			
			imagecopymerge($merge_image, $source_image, 0, 0, 0, 0, imagesx($source_image), imagesy($source_image), $transparent);

			return $merge_image;
		}
		
		/**
		 * make resize
		 *
		 * @param  string args->from
		 * @param  int    args->width
		 * @param  int    args->height
		 *
		 */
		public static function resize($args) {
			
			$src = $args->source;
			$mode = $args->mode;
			$resize_width = $args->width;
			$resize_height = $args->height;
			
			if (!$resize_width || !$resize_height) return;
			
			if ($mode=='ratio') {
				if (file_exists($src)) {
					list($origin_width, $origin_height) = getimagesize($src);
					$ratio = $origin_width / $origin_height;
					$resize_width = $resize_height = min($resize_width, max($origin_width, $origin_height));
					
					if ($ratio < 1) {
						$resize_width = $thumbnail_height * $ratio;
					} else {
						$resize_height = $thumbnail_width / $ratio;
					}
				}
			}
			
			//make virtual image
			$args = va::args();
			$args->source = $src;
			$source_image = self::virtualimage($args);
			
			if (extension_loaded('gd')) {
				$width = imagesx($source_image);
				$height = imagesy($source_image);
			} else {
				return;
			}
			
			$virtual_image = imagecreatetruecolor($resize_width, $resize_height);

			//make image alpha
			imageAlphaBlending($virtual_image, false);
			imageSaveAlpha($virtual_image, false);

			try {
				if ($source_image) {
					imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $resize_width, $resize_height, $width, $height);
					return $virtual_image;
				} else {
					return $virtual_image;
				}
			} catch(Exception $e) {
				return $virtual_image;
			}
		}
		
	}