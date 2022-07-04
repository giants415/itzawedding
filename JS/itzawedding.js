$(document).ready(function(){
  weddingready();
  // closeModal();

  $('i').click(function(e){
    e.preventDefault();
    console.log('scroll');
    $('html,body').animate({
      scrollTop:  $('#nameAndDate').offset().top
    }, 250);
    // document.getElementsByClassName("name-and-date").scrollIntoView();
  });

  var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbzIEcjvfbgozwDGCDUZqt7Jm2vRkNG7pdUYmTDZI6Afh7D1rWpgE4sDD1-4oiqaGrp9/exec';

  var countDownDate = new Date("Aug 27, 2022 4:00:00").getTime();
  var countdownUpdate = setInterval(function() {
    var timeNow = new Date().getTime();
    var timeLeft = countDownDate - timeNow;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    $('.countdown .days').text(days + ' days');
    $('.countdown .hours').text(hours + ' hours');
    $('.countdown .mins').text(minutes + ' minutes');
    $('.countdown .secs').text(seconds + ' seconds');
  },1000);

  $('#submit-form').on('click', function(e) {
    var nameLength = $('#name-field').val().length;
    var name = $('#name-field').val();
    var guestCount = $('#guest-select').val();
    if ((nameLength < 1) || (guestCount == null)) {
      console.log('validation failed');
    } else if ((nameLength >= 1) && (guestCount != null))  {
      e.preventDefault();
      var jqxhr = $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: $form.serializeObject(),
        success: confirmsubmission()
      })
    }
  });

  $('#close-modal').click(function(e) {
    closeModal(e);
  });

  $('#reset-rsvp').click(function(e) {
    e.preventDefault();
    resetRSVP();
  });

});


function weddingready(){
  console.log('wedding engaged');
}

function confirmsubmission(){
  console.log('form submitted');
  // alert('your RSVP has been submitted');
  // $('#myModal').modal('show');
  $('#submit-form').addClass("inactive-btn").html('RSVP Submitted!').parent().addClass('form-submission-note');
  $('#reset-rsvp').css('display', 'inline-block');
}

function closeModal(e) {
  e.preventDefault();
  console.log('hide modal');
  $('#myModal').modal('hide');
}

function resetRSVP(){
  console.log('reset RSVP');
  $('#submit-form').removeClass("inactive-btn").html('RSVP').parent().removeClass('form-submission-note');
  $('#reset-rsvp').css('display', 'none');
}
