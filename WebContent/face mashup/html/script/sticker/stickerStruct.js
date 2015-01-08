function getStickerDiv(indexOfStickerElement) {
	
	var element = stickerElementList[indexOfStickerElement];
	
	var tmpImg = document.createElement("img");
	tmpImg.setAttribute('src', 'img/stickers/'+element.name+'.png');
	
	var widthOfImg = tmpImg.width * 0.8;
	
	
	if(element.name != 's014' && element.name != 's015')  {
		
		return (
				
				'<div onmouseover="javascript:showDelete(this)" onmouseout="javascript:deleteDelete(this)" id="sticker_div_'
				+ element.stickerId
				+ '" style="position: absolute; top:'+element.yPosition+'; left:'+element.xPosition+'">'+

				'<img style="display:none; position:absolute; top:-20px; right:5;" onclick="javascript:deleteSticker(this)" id="delete_sticker_'
				+ element.stickerId
				+ '" src="img/stickers/delete_sticker.png" width=\'30px\' height=\'auto\' draggable="false"/>'+
				
				'<img onmousedown="javascript:dragSticker(this)" id="img_sticker_'
				+ element.stickerId
				+ '" src="img/stickers/'+element.name+'.png" width=\''+widthOfImg+'\' height=\'auto\' draggable="false"/>'+

				'</div>'
		
		);
		
	} else {
		
		if(element.name == 's014') {
			
			return (
					
					'<div onmouseover="javascript:showDelete(this)" onmouseout="javascript:deleteDelete(this)" id="sticker_div_'
					+ element.stickerId
					+ '" style="position: absolute; top:'+element.yPosition+'; left:'+element.xPosition+'">'+

					'<img style="display:none; position:absolute; top:0px; left:350;" onclick="javascript:deleteSticker(this)" id="delete_sticker_'
					+ element.stickerId
					+ '" src="img/stickers/delete_sticker.png" width=\'30px\' height=\'auto\' draggable="false"/>'+
					
					'<img onmousedown="javascript:dragSticker(this)" id="img_sticker_'
					+ element.stickerId
					+ '" src="img/stickers/'+element.name+'.png" style="position:absolute; width:350;" draggable="false"/>'+
					
					'<textarea style="color: black; background-color: transparent; position:absolute; top: 12; left:12" class="text_area_sticker" onkeyup="javascript:changeValueOfStickerText(this)" id="text_area_'+element.stickerId+'" name="nome del luogo" rows="1" cols="15">'+element.value+'</textarea>' +
					

					'</div>'
			
			);
			
			
		}else {
			
			return (
					
					'<div onmouseover="javascript:showDelete(this)" onmouseout="javascript:deleteDelete(this)" id="sticker_div_'
					+ element.stickerId
					+ '" style="position: absolute; top:'+element.yPosition+'; left:'+element.xPosition+'">'+

					'<img style="display:none; position:absolute; top:0px; left:350;" onclick="javascript:deleteSticker(this)" id="delete_sticker_'
					+ element.stickerId
					+ '" src="img/stickers/delete_sticker.png" width=\'30px\' height=\'auto\' draggable="false"/>'+
					
					'<img onmousedown="javascript:dragSticker(this)" id="img_sticker_'
					+ element.stickerId
					+ '" src="img/stickers/'+element.name+'.png" style="position:absolute; width:350;" draggable="false"/>'+
					
					'<textarea style="color: black; background-color: transparent; position:absolute; top: 12; left:12" class="text_area_sticker" onkeyup="javascript:changeValueOfStickerText(this)" id="text_area_'+element.stickerId+'" name="nome del luogo" rows="5" cols="15">'+element.value+'</textarea>' +
					

					'</div>'
			
			);
			
		}
		
		
	}
	
	
	
	
}

function showDelete(element) {
	
	var stickerId = element.id;
	
	//viene creato l'id del delete
	var deleteButtonId = 'delete_sticker_' + stickerId.split('_')[2] + '_' + stickerId.split('_').pop();
	
	makeVisible(document.getElementById(deleteButtonId));

	
	
}

function deleteDelete(element) {
	
	var stickerId = element.id;
	
	//viene creato l'id del delete
	var deleteButtonId = 'delete_sticker_' + stickerId.split('_')[2] + '_' + stickerId.split('_').pop();
	
	makeInvisible(document.getElementById(deleteButtonId));
	
}

function deleteSticker(element) {
	
	var stickerId = element.id.split('_')[2] + '_' + element.id.split('_').pop();
	
	var justStickerId = element.id.split('_').pop();
	
	//viene eliminato il riferimento dalla stickerElementList
	var stickerIndex = stickerElementListMap[justStickerId];
	
	stickerElementList.splice(stickerIndex,1);
	
	//viene sistemata la stickerElementListMap
	
	stickerElementListMap[justStickerId] = -1;
	
	for(var i = parseInt(justStickerId)+1; i < stickerElementListMap.length; i++) {
		console.log('i ' +i);
		stickerElementListMap[i] = parseInt(stickerElementListMap[i]) - 1;
	}
	
	//viene eliminato graficamente
	
	document.getElementById('sticker_div_' + stickerId).parentNode.removeChild(document.getElementById('sticker_div_' + stickerId));

	addStep();
	
}

function changeValueOfStickerText(element) {
	
	//dobbiamo cambiare il value dell'elemento
	
	stickerElementList[stickerElementListMap[element.id.split('_').pop()]].value = element.value;

	
}

function shiftAllStickerX(value) {
	
	//shifta tutti gli sticker presenti nella stickerElementList di x value
	for(var i = 0; i < stickerElementList.length; i++) {
		stickerElementList[i].xPosition = stickerElementList[i].xPosition + value;
		//spostamento grafico
		document.getElementById('sticker_div_'+stickerElementList[i].stickerId).style.left = stickerElementList[i].xPosition;
	}
	
	addStep();
	
}

function stickerClass(stickerId, stickerName, xPosition, yPosition, zIndexInt, value) {
	
	this.name = stickerName;
	this.value = '';
	this.stickerId = stickerName+'_'+stickerId;
	
	this.xPosition = xPosition;
	this.yPosition = yPosition;
	this.zIndex = zIndexInt;

}

