$(function(){
	var $modal=$('#modal'),
		$modalTip=$('#modalTip');
	function closeModal(){
		$modal.stop(true).fadeOut(300,function(){
			$modalTip.html('');
		});
	}
	function openModal(sHtml,sClassName){
		if(sClassName)
			$modal.find('#modalContent').attr('class','modal-content '+sClassName);
		$modalTip.html(sHtml);
		$modal.stop(true).fadeIn(300);
	}
	$modal.find('.modal-close').on('click',closeModal);
	$modal.find('.modal-sure').on('click',closeModal);
	window.closeModal=closeModal;
	window.openModal=openModal;
});