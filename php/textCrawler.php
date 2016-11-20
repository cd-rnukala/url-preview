<?php
include_once "classes/LinkPreview.php";
SetUp::init();

$text = $_POST["text"];
$imageQuantity = $_POST["imagequantity"];
$text = " " . str_replace("\n", " ", $text);
$header = "";

$linkPreview = new LinkPreview();
$answer = $linkPreview->crawl($text, $imageQuantity, $header);

echo $answer;

SetUp::finish();

