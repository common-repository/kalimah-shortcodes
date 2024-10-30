<?php

/**
 * LipsumGenerator can be used to create garbeled, non repetitive "chapters" using the standard Lorem Ipsum text as a basis.
 * It'll try to generate reasonable well looking paragraphs in the chapters.
 *
 * @author A. Grandt <php@grandt.com>
 * @copyright 2014- A. Grandt
 * @license GNU LGPL 2.1
 * @link https://github.com/Grandt/PHPLipsumGenerator
 * @version 1.2
 * @ modified by Abdul Al-Hasany - Kalimah Apps
 */
class LipsumGenerator {
    const VERSION = 1.2;

	private static $lipsumText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
	
	private static $lipsumTextAr = "ان قبل وبعد الصعداء، الخاصّة استراليا، عل جُل. للحكومة بمحاولة المزيفة لكل و. فصل في فكان يتمكن، واستمر وفنلندا واشتدّت من يتم، وصل وحتّى المشترك ومطالبة بـ. مئات جسيمة بلاده تم نفس، يذكر بريطانيا، كلا لم. كما لم قادة بلاده إحتار، تجهيز مدينة جهة و. أمّا وبولندا مع كان، بـ بعد أدنى الشّعبين، أما بل فاتّبع العاصمة. في ولم ماذا محاولات الإمداد. كان أم سابق غينيا الباهضة. مشروط الفرنسي هذه تم. كلا تم بقسوة إجلاء وبعدما، في عرض وحتّى مسؤولية. الإمداد استعملت ضرب ان،  أواخر ذات أن، هذه أم قِبل الأول السفن. هذا عل أوزار عسكرياً. قد وقد هُزم أوسع، أي لمّ العاصمة والنرويج. الأرض الهادي من هذه. كما وحتى كانت عل، بعد و دارت جزيرتي. الإطلاق إستيلاء أن مكن، زهاء المارق الطرفين وفي ثم. ما أسيا أخرى بخطوط شيء، جديدة يعادل أي يكن. بل لمّ الثالث، لتقليعة، أي وفي لفرنسا الخارجية، حين وحرمان بمعارضة أن.";
	
	
	private static $lipsum = null;
	private static $lipsumcount = 0;

	private $lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ";

	/*
	 For Arabic dummy text
	*/
	public function setLanguage($lang = 'Arabic')
	{
		if(strtolower($lang) == 'arabic')
		{
			self::setLipsumText(self::$lipsumTextAr);
			
		}
	}
	/**
	 * 
	 * @param integer $minWordCount Defaults to 200.
	 * @param integer $maxWordCount Defaults to 2000.
	 * @param integer $useMultipleParagraphs Generate a text with multiple paragraphs. efaults to TRUE. 
	 * @param boolean $startWithLorem Will start each chapter with the text "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", the length of which is subtracted from the $minWordCount. Used to help identify the place holder text for what it really is. Defaults to TRUE.
	 * @param string $indent Indentation of each new paragraph in the generated text. Defaults to two spaces. 
	 * @param string $eol End of line sequence, defaults to the Windows "\r\n".
	 * @return string
	 */
	public function generate($minWordCount = 200, $maxWordCount = 2000, $maxParaCount = 1, $setWordCount = FALSE, $startWithLorem = FALSE, $indent = "  ", $eol = "\r\n") {
		if (empty(self::$lipsum)) {
			self::setLipsumText(self::$lipsumText);
		}
		
		if($setWordCount == FALSE)
			$tcount = rand($minWordCount-($startWithLorem === TRUE ? 8 : 0), $maxWordCount);
		else
			$tcount = $maxWordCount;
		
		$wcount = 0;
		$wscount = 0;
		$chapter = "";
		if ($startWithLorem === TRUE) {
			$chapter .= $this->lorem;
		}

		
		
		for ($p = 0 ; $p < $maxParaCount ; $p++) {
			for ($i = 0 ; $i < $tcount ; $i++) {
			$w = self::$lipsum[rand(0, self::$lipsumcount-1)];

			if ($wscount == 0) {
				$w = ucfirst($w);
			}
			$chapter .= $w;

			if (strpos($w, ".") === FALSE) {
				$chapter .= " ";
				$wcount++;
				$wscount++;
			} else {
				$wscount = 0;
					if((($wcount > 3 && rand(0, 5) == 1) || ($wcount > 50 && rand(0, 2) == 1)))
					{
						$chapter .= $indent;
						$wcount = 0;
						 break; 
					} else {
						$chapter .= " ";
						$wcount++;
					}
			}
		}
		}	
		return $indent . trim($chapter) . ".$eol";
	}

	/**
	 * 
	 * @param integer $minWordCount Defaults to 200.
	 * @param integer $maxWordCount Defaults to 2000.
	 * @param integer $useMultipleParagraphs Generate a text with multiple paragraphs. efaults to TRUE. 
	 * @param boolean $startWithLorem Will start each chapter with the text "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", the length of which is subtracted from the $minWordCount. Used to help identify the place holder text for what it really is. Defaults to TRUE.
	 * @return string
	 */
	public function generateHTML($minWordCount = 200, $maxWordCount = 2000, $maxParaCount = 1, $setWordCount = FALSE, $startWithLorem = FALSE) {
		return $this->generate($minWordCount, $maxWordCount, $maxParaCount, $setWordCount, $startWithLorem, "<p>", "</p>\r\n");
	}

	/**
	 * Set a new base text to be used for generation. It must be a plain text file, and it'll split it on spaces only.
	 * 
	 * @param type $lipsumText
	 */
	public static function setLipsumText($lipsumText) {
		self::$lipsumText = $lipsumText;
		self::$lipsum = explode(" ", self::$lipsumText);
		self::$lipsumcount = sizeof(self::$lipsum);
	}
}
