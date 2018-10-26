
$(function(){
    var duration = 300;


    //
    // buttons1 ----------------------------------------
    // buttons1  1행
    $('#buttons1 button:nth-child(-n+3)')
        .on('click', function() {
            //var myvar = '<?php echo $var;?>';
            //alert(myvar);
            console.log("test");

            $(this).stop(true).animate({
                backgroundColor: '#ae5e9b',
                color: '#fff'
            }, duration);

        })
        .on('mouseout', function(){
            $(this).stop(true).animate({
                backgroundColor: '#fff',
                color: '#ebc000'
            }, duration);
        });

    // aside ----------------------------------------
    var $aside = $('.page-main > aside');
    var $asidButton = $aside.find('button')
        .on('click', function(){
            $aside.toggleClass('open');
            if($aside.hasClass('open')){
                $aside.stop(true).animate({left: '-70px'}, duration, 'easeOutBack');
                $asidButton.find('img').attr('src', 'img/btn_close.png');
            }else{
                $aside.stop(true).animate({left: '-350px'}, duration, 'easeInBack');
                $asidButton.find('img').attr('src', 'img/btn_open.png');
            };
        });
});
