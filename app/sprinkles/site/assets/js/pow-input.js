$(document).ready(function() {
  $('.draftBox').on('click', function() {
    
  });

  //---------------------------------------------
  //Select the champion in the modal
  //---------------------------------------------
  $('.selectChampion').on('click', function() {
    if ($(this).hasClass('used')) {
      $(this).removeClass('used');
    }
    else {
      $(this).addClass('used');
    }
  });
  //---------------------------------------------
});
