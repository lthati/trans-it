#!/bin/bash
set +x

rm *.jpeg
ffmpeg -i final_data.mp4  -r  0.2  image-%d.jpeg
#ffprobe -f lavfi -i "movie=hackation-test-video.mp4,fps=fps=0.2[out0]" -show_frames -show_entries frame=pkt_pts_time -of csv=p=0 > t.txt
ffprobe -f lavfi -i "movie=hackation-test-video.mp4,fps=0.2[out0]" -show_frames -show_entries frame=pkt_pts_time -of csv=p=0 > t.txt
lines=`wc -l t.txt | awk '{print $1}'`
lines_new=$(($lines - 1))
head -$lines_new t.txt > t1.txt
#rm image-1.jpeg
ls -1 image*.jpeg  | sort > images.txt
paste -d'|' images.txt t1.txt > combined.txt


## Tesseract processing ##
# Increment word count and timestamp .json files both

for line in `cat combined.txt`
do
	file=`echo $line | cut -d'|' -f1`
	ts=`echo $line | cut -d'|' -f2`

	fname=`echo $file | cut -d'.' -f1`
	tesseract $file $fname-$ts
done

# Now we have file with timestamp in the file name and words inside the file
# Create another single file using image-ts.txt files which will have word:timestamp on each line

rm ./out2.txt	

for file in `ls image-*.txt`
do
	ts=`echo $file | cut -d'-' -f3 | sed 's/\.txt$//'`
	for line in `cat $file`
	do
		echo $line >> out2.txt
	done
done

sort out2.txt > out3.txt

