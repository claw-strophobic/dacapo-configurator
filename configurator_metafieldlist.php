<?php
?>
	<datalist id="meta-fields-list">
		<optgroup label="Standard">
			<option data-value="ARTIST" value="ARTIST">ARTIST</option>
			<option data-value="COMPOSER" value="COMPOSER">COMPOSER</option>
			<option data-value="LYRICIST" value="LYRICIST">LYRICIST</option>
			<option data-value="ORIGINALARTIST" value="ORIGINALARTIST">ORIGINALARTIST</option>
			<option data-value="PERFORMER" value="PERFORMER">PERFORMER</option>
			<option data-value="ALBUM" value="ALBUM">ALBUM</option>
			<option data-value="PUBLISHER" value="PUBLISHER">PUBLISHER</option>
			<option data-value="COPYRIGHT" value="COPYRIGHT">COPYRIGHT</option>
			<option data-value="DISCNUMBER" value="DISCNUMBER">DISCNUMBER</option>
			<option data-value="DISCTOTAL" value="DISCTOTAL">DISCTOTAL</option>
			<option data-value="ISRC" value="ISRC">ISRC</option>
			<option data-value="EAN" value="EAN">EAN</option>
			<option data-value="UPN" value="UPN">UPN</option>
			<option data-value="LABEL" value="LABEL">LABEL</option>
			<option data-value="LABELNO" value="LABELNO">LABELNO</option>
			<option data-value="LICENSE" value="LICENSE">LICENSE</option>
			<option data-value="OPUS" value="OPUS">OPUS</option>
			<option data-value="SOURCEMEDIA" value="SOURCEMEDIA">SOURCEMEDIA</option>
			<option data-value="TITLE" value="TITLE">TITLE</option>
			<option data-value="TRACKNUMBER" value="TRACKNUMBER">TRACKNUMBER</option>
			<option data-value="TRACKTOTAL" value="TRACKTOTAL">TRACKTOTAL</option>
			<option data-value="VERSION" value="VERSION">VERSION</option>
			<option data-value="ENCODED-BY" value="ENCODED-BY">ENCODED-BY</option>
			<option data-value="ENCODING" value="ENCODING">ENCODING</option>
			<option data-value="ARRANGER" value="ARRANGER">ARRANGER</option>
			<option data-value="AUTHOR" value="AUTHOR">AUTHOR</option>
			<option data-value="CONDUCTOR" value="CONDUCTOR">CONDUCTOR</option>
			<option data-value="ENSEMBLE" value="ENSEMBLE">ENSEMBLE</option>
			<option data-value="PART" value="PART">PART</option>
			<option data-value="PARTNUMBER" value="PARTNUMBER">PARTNUMBER</option>
			<option data-value="GENRE" value="GENRE">GENRE</option>
			<option data-value="DATE" value="DATE">DATE</option>
			<option data-value="LOCATION" value="LOCATION">LOCATION</option>
			<option data-value="COMMENT" value="COMMENT">COMMENT</option>
		</optgroup>
	</datalist>
<?php
/*

ALBUM
    if appropriate, an album name
ARTIST
    for information to be displayed on systems with limited display capabilities. it is not a replacement for the ENSEMBLE and PERFORMER tags, but typically will summarize them.
PUBLISHER
    who publishes the disc the track came from
COPYRIGHT
    who holds copyright to the track or disc the track is on
DISCNUMBER
    if part of a multi-disc album, put the disc number here
ISRC
    this number lets you order a CD over the phone from a record shop.
EAN/UPN
    there may be a barcode on the CD; it is most likely an EAN or UPN (Universal Product Number).
LABEL
    the record label or imprint on the disc
LABELNO
    record labels often put the catalog number of the source media somewhere on the packaging. use this tag to record it.
LICENSE
    the license, or URL for the license the track is under. for instance, the Open Audio license.
OPUS
    the number of the work; eg, Opus 10, BVW 81, K6
SOURCEMEDIA
    the recording media the track came from. eg, CD, Cassette, Radio Broadcast, LP, CD Single
TITLE
    "the work", whether a symphony, or a pop song
TRACKNUMBER
    the track number on the CD
VERSION
    Make sure you don't put DATE or LOCATION information in this tag. "live", "acoustic", "Radio Edit" "12 inch remix" might be typical values of this tag
ENCODED-BY
    The person who encoded the Ogg file. May include contact information such as email address and phone number.
ENCODING
    Put the settings you used to encode the Ogg file here. This tag is NOT expected to be stored or returned by cddb type databases. It includes information about the quality setting, bit rate, and bitrate management settings used to encode the Ogg. It also is used for information about which encoding software was used to do the encoding.

The remaining tags are multiples; if they are present more than once, all their occurances are considered significant.

COMPOSER
    composer of the work. eg, Gustav Mahler
ARRANGER
    the person who arranged the piece, eg, Ravel
LYRICIST
    the person who wrote the lyrics, eg Donizetti
AUTHOR
    for text that is spoken, or was originally meant to be spoken, the author, eg JRR Tolkien
CONDUCTOR
    conductor of the work; eg Herbert von Karajan. choir directors would also use this tag.
PERFORMER
    individual performers singled out for mention; eg, Yoyo Ma (violinist)
ENSEMBLE
    the group playing the piece, whether orchestra, singing duo, or rock and roll band.
PART
    a division within a work; eg, a movement of a symphony. Some tracks contain several parts. Use a single PART tag for each part contained in a track. ie, PART="Oh sole mio"
PARTNUMBER
    The part number goes in here. You can use any format you like, such as Roman numerals, regular numbers, or whatever. The numbers should be entered in such a way that an alphabetical sort on this tag will correctly show the proper ordering of all the oggs that contain the contain the piece of music.
GENRE
    like the genre tag from the cddb but without the limitations. You can put any genre you want in this tag. If you think "Pink Floyd" are a genre unto themselves, say so here. For crossover works, or ambiguous works, use as many GENRE tags as you think it takes to describe the styles used.
DATE
    date or date-time of relevance to the track. The date must be in ISO 8601 format, but may be followed by a space character, then any text you wish, including the same date in any other format. None of the alternate formats in ISO 8601 may be used. Only the primary format in ISO 8601 is to be used. q.v. http://www.cl.cam.ac.uk/~mgk25/iso-time.html eg, DATE="1999-08-16 (recorded)" or DATE="1999-08-16 recorded August 16, 1999"
LOCATION
    location of recording, or other location of interest
COMMENT
    additional comments of any nature.

*/